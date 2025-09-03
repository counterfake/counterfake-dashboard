"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Lock, Check } from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { cn } from "@/common/lib/utils/ui";

import useToast from "@/common/hooks/use-toast";
import { useZodForm } from "@/common/hooks/use-zod-form";

import { Button } from "@/common/components/ui/primitives/button";
import { Input } from "@/common/components/ui/primitives/input";
import { Label } from "@/common/components/ui/primitives/label";

import {
  type SignInFormData,
  signInFormSchema,
} from "../../../validation/form.schemas";

interface UserSignInFormProps {
  onSubmit: (data: SignInFormData) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export default function UserSignInForm({
  onSubmit,
  isLoading,
  isSuccess,
}: UserSignInFormProps) {
  const toast = useToast();
  const form = useZodForm(signInFormSchema);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleComingSoon = () => {
    toast.info("Coming Soon", "This feature is coming soon...");
  };

  const isDisabled =
    isLoading || !form.watch("email") || !form.watch("password");

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl font-semibold text-foreground text-center">
            Sign in to your account
          </h2>

          <p className="text-muted-foreground text-center">
            Welcome to Your Protection Agent
          </p>
        </div>

        <div className="fade-in">
          <div className="space-y-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium text-foreground"
                >
                  Username
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="username"
                    name="email"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10 transition-all duration-200 focus:ring-primary/20 focus:border-primary"
                    required
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 transition-all duration-200 focus:ring-primary/20 focus:border-primary"
                    required
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-destructive text-xs mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  onClick={handleComingSoon}
                  className="text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isDisabled}
                className={cn(
                  "w-full h-11 text-base font-medium transition-all duration-200",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                  "hover:shadow-md focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                )}
              >
                {isSuccess && <Check className="w-4 h-4 mr-2" />}
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Sign In Buttons */}
            <div className="space-y-3">
              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="w-full h-11 flex items-center justify-center space-x-2 border-border hover:bg-accent transition-all duration-200"
                onClick={handleComingSoon}
              >
                <FcGoogle className="w-5 h-5" />
                <span>Continue with Google</span>
              </Button>

              {/* Facebook Sign In */}
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="w-full h-11 flex items-center justify-center space-x-2 border-border hover:bg-accent transition-all duration-200"
                onClick={handleComingSoon}
              >
                <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                <span>Continue with Facebook</span>
              </Button>
            </div>

            {/* Additional Links */}
            <div className="pt-4">
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  onClick={handleComingSoon}
                  className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
