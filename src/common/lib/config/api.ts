import { ApiConfig } from "@/common/types/api";

// API Configuration
export const API_CONFIG = {
  // Brand Protection API Config
  bpApi: {
    baseURL: process.env.NEXT_PUBLIC_BRAND_API_URL!,
  },
  // Platform Protection API Config
  ppApi: {
    baseURL: process.env.NEXT_PUBLIC_PP_API_URL!,
  },
  // Product Analysis API Config
  productAnalysisApi: {
    baseURL: process.env.NEXT_PUBLIC_PRODUCT_ANALYSIS_API_URL!,
  },
} as const satisfies Record<string, ApiConfig>;

export const API_ENDPOINTS = {
  // Brand Protection API Endpoints
  bpApi: {
    // Auth
    login: "/auth/login",
    whoami: "/auth/whoami",
    refresh: "/auth/refresh",
    setPassword: "/auth/set_password",
    resetPassword: "/auth/reset_password",
    selectedCompany: "/auth/selected_company",
    logout: "/auth/logout",
    authenticated: "/auth/authenticated",

    // Brand
    brands: "/brands",

    // Group Brand
    groupBrands: "/group-brand",

    // Category Reasons
    categoryReasons: "/category-reasons",

    // Classifications
    classes: "/classes",

    // Parent Classes
    parentClasses: "/parent-classes",

    // Platform Report Mail
    platformReportMail: "/platform_report_mail",
    platformReportMailReportCounts: "/platform_report_mail/report_counts",
    platformReportMailExport: "/platform_report_mail/export",

    // Platforms
    platforms: "/platforms",

    // Prediction Results
    predictionResults: "/prediction_results",
    predictionResultsDispersion: "/prediction_results/dispersion",
    predictionResultsDispersion_export: "/prediction_results/dispersion_export",

    // Products
    products: "/products",
    productsUpload: "/products/upload_products",

    // Profiles
    profiles: "/profiles",
    profilesMerge: "/profiles/merge",

    // Results
    resultsShow: "/results/show",
    resultsShowAnalysis: "/results/show-analysis",
    resultsShowMonthly: "/results/show-monthly",
    resultsExport: "/results/export",

    // Sellers
    sellersTopFake: "/sellers/top-fakes",
  },

  // Platform Protection API Endpoints
  ppApi: {
    // Auth
    authLogin: "/auth/login",
    authMe: "/auth/me",
    authRefresh: "/auth/refresh",
    authLogout: "/auth/logout",

    // Brands
    brands: "/brands",

    // Export Results
    exportResults: "/export/results",

    // Products
    products: "/products",
    productsSetControlled: "/products/set-controlled",
    productsCopyBrand: "/products/copy-brand",
    productsUpdateStatus: "/products/update_status",

    // Sellers
    sellers: "/sellers",

    // Analysis
    analysis: "/analysis",
  },

  // Product Analysis API Endpoints
  productAnalysisApi: {
    // Analysis
    analyze: "/analyze",
  },
} as const satisfies Record<keyof typeof API_CONFIG, Record<string, string>>;
