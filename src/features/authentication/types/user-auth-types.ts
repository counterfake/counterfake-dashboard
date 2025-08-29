/**
 * Multi-step signup form types and interfaces
 */

export interface SignUpFormData {
  // Step 1: Brand Information
  brandName: string;
  brandLogo: File | null;
  brandWebsite: string;

  // Step 2: Protection Preferences
  operatingCountry: string;
  protectionPlatforms: {
    ecommerce: boolean;
    socialMedia: boolean;
  };
}

export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<StepProps>;
}

export interface StepProps {
  formData: SignUpFormData;
  onUpdateData: (data: Partial<SignUpFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
  errors?: Record<string, string>;
}

export interface SignUpState {
  currentStep: number;
  formData: SignUpFormData;
  isLoading: boolean;
  errors: Record<string, string>;
  isCompleted: boolean;
}

export const INITIAL_FORM_DATA: SignUpFormData = {
  brandName: "",
  brandLogo: null,
  brandWebsite: "",
  operatingCountry: "",
  protectionPlatforms: {
    ecommerce: false,
    socialMedia: false,
  },
};

export const COUNTRIES = [
  { value: "tr", label: "Turkey" },
  { value: "us", label: "United States" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "uk", label: "United Kingdom" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "nl", label: "Netherlands" },
  { value: "other", label: "Other" },
] as const;
