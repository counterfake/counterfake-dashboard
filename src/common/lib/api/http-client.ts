import { z } from "zod";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiResponse } from "@/common/types/api";

import { ErrorHandler } from "../utils/error-handler";

interface HttpClientBaseConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  throwOnError?: boolean;
}

type HttpClientRequestConfig = AxiosRequestConfig & {
  /**
   * Controls whether HTTP request errors should throw exceptions.
   *
   * When true, errors will be thrown as exceptions.
   *
   * When false, errors will be returned as part of the ApiResponse object.
   *
   * Defaults to the value set in the HttpClient constructor. (`true`)
   *
   */
  throwOnError?: boolean;
  /**
   * Validations for request parameters
   */
  validationSchemas?: {
    /**
     * Schema for validating URL parameters or query string parameters
     * before sending the request.
     *
     * If validation fails, the request will
     * not be sent and an error will be returned.
     */
    params?: z.ZodSchema<any>;
    /**
     * Schema for validating request body data before sending the request
     *
     * If validation fails, the request will not be sent and an error
     * will be returned.
     */
    data?: z.ZodSchema<any>;
    /**
     * Schema for validating response data after receiving the response
     *
     * If validation fails, the response will be treated as an error
     * even if the HTTP status code indicates success.
     */
    responseData?: z.ZodSchema<any>;
  };
};

export class HttpClient {
  protected client: AxiosInstance;
  protected retries: number;
  protected throwOnError: boolean;

  constructor(config: HttpClientBaseConfig) {
    const {
      retries = 3,
      throwOnError = true,
      timeout = 15000,
      baseURL,
    } = config;

    this.retries = retries;
    this.throwOnError = throwOnError;

    this.client = axios.create({
      baseURL,
      timeout,
    });
  }

  public async request<T = any>(
    config: HttpClientRequestConfig
  ): Promise<ApiResponse<T>> {
    const { throwOnError = this.throwOnError, validationSchemas } = config;

    let attempt = 0;

    while (attempt < this.retries) {
      try {
        let params = config.params;

        if (typeof params === "object") {
          // Validate URL parameters if provided
          if (validationSchemas?.params) {
            params = validationSchemas.params.parse(params);
          }

          params = {}; // Reset params to an empty object

          for (const key in config.params) {
            if (
              config.params[key] !== null &&
              config.params[key] !== "" &&
              config.params[key] !== undefined
            ) {
              params[key] = config.params[key];
            }
          }
        }

        // Validate request body data if provided
        if (validationSchemas?.data)
          config.data = validationSchemas.data.parse(config.data);

        let response: AxiosResponse<T> = await this.client({
          ...config,
          params,
        });

        // Validate response data if provided
        if (validationSchemas?.responseData) {
          response.data = validationSchemas.responseData.parse(response.data);
        }

        return HttpClient.successResult(response.data);
      } catch (error: any) {
        attempt++;

        // Don't retry on authentication errors or client errors (4xx)
        if (error.response?.status < 500 || attempt >= this.retries) {
          if (throwOnError) {
            throw error;
          }

          return HttpClient.errorResult(
            error,
            `${config.method} ${config.url}`
          );
        }

        // Wait before retry (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }

    if (throwOnError) {
      throw new Error("Max retries exceeded");
    }

    return HttpClient.errorResult(
      new Error("Max retries exceeded"),
      "HttpClient.request"
    );
  }

  public async get<T = any>(
    url: string,
    config?: HttpClientRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "GET", url, ...config });
  }

  public async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: HttpClientRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "POST", url, data, ...config });
  }

  public async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: HttpClientRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "PUT", url, data, ...config });
  }

  public async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: HttpClientRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "PATCH", url, data, ...config });
  }

  public async delete<T = any>(
    url: string,
    config?: HttpClientRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "DELETE", url, ...config });
  }

  static successResult<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      error: null,
    };
  }

  static errorResult(error: Error | unknown, context?: string) {
    return {
      success: false,
      error: ErrorHandler.handle(error, context),
      data: null,
    } satisfies ApiResponse<any>;
  }
}
