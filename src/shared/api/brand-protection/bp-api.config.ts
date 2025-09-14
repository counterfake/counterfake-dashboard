export const BP_API_BASE_URL = process.env.NEXT_PUBLIC_BRAND_API_URL!;

export const BP_API_ENDPOINTS = {
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
} as const satisfies Record<string, string>;
