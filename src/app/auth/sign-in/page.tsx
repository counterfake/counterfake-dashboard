"use client";

import useToast from "@/common/hooks/use-toast";

import CustomerSignInForm from "@/features/authentication/components/customer-auth/sign-in/form";
import { SignInFormData } from "@/features/authentication/validation/form.schemas";

import { useCustomerLogin } from "@/features/authentication/hooks/use-customer-auth";

export default function SignInPage() {
  const toast = useToast();

  const customerLogin = useCustomerLogin();

  const onSubmit = async ({ email, password }: SignInFormData) => {
    const response = await customerLogin.mutateAsync({ email, password });

    if (response.success) return;

    toast.error(
      "Login failed",
      response.error.response.status === 400
        ? "Invalid credentials"
        : "Something went wrong. Please try again later or contact support."
    );
  };

  return (
    <CustomerSignInForm
      onSubmit={onSubmit}
      isLoading={customerLogin.isPending}
      isSuccess={customerLogin.isSuccess}
    />
  );
}
