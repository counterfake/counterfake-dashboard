"use client";

import { useRouter } from "next/navigation";

import useToast from "@/common/hooks/use-toast";
import { ROUTES } from "@/common/lib/config/routes";

import UserSignInForm from "@/features/authentication/components/user-auth/sign-in/form";
import { SignInFormData } from "@/features/authentication/validation/form.schemas";

import { useUserLogin } from "@/features/user-dashboard/hooks/use-user-auth";

export default function SignInPage() {
  const router = useRouter();

  const toast = useToast();

  const userLogin = useUserLogin();

  const onSubmit = async ({ email, password }: SignInFormData) => {
    const response = await userLogin.mutateAsync({ username: email, password });

    if (response.success) {
      router.push(ROUTES.USER_DASHBOARD);
      return;
    }

    toast.error(
      "Login failed",
      response.error.response.status === 400
        ? "Invalid credentials"
        : "Something went wrong. Please try again later or contact support."
    );
  };

  return (
    <UserSignInForm
      onSubmit={onSubmit}
      isLoading={userLogin.isPending}
      isSuccess={userLogin.isSuccess}
    />
  );
}
