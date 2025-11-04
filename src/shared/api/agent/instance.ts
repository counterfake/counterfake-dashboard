import { getSession } from "../brand-protection/bp-api.auth";
import { HttpClient } from "../http-client";

export const agentApi = new HttpClient({
  baseURL: "https://apigw.counterfake.ai/counterfake-agent",
  timeout: 25000,
});

agentApi.client.interceptors.request.use(
  (config) => {
    // TODO (IMPORTANT): Once the project is fully transitioned to feature-sliced ​​design, remove this logic from here.
    // ! This logic has been added here temporarily.
    const oldVersionAuthStorage = localStorage.getItem(
      "auth-storage" // This is the auth storage key in /src/common/lib/stores/auth-store.ts
    ) as string;

    const session = getSession();

    let token;

    if (session.accessToken) {
      token = session.accessToken;
    } else if (oldVersionAuthStorage) {
      const oldVersionTokens = JSON.parse(oldVersionAuthStorage) as {
        state: {
          tokens: {
            accessToken: string;
          };
        };
      };

      token = oldVersionTokens.state.tokens.accessToken;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
