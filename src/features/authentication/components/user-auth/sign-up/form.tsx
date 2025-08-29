"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/primitives/card";

// Step components
import { StepProgress } from "../sign-up/step-progress";
import { StepOne } from "../sign-up/step-one";
import { StepTwo } from "../sign-up/step-two";
import { SuccessScreen } from "../sign-up/success-screen";

// Types and initial data
import {
  INITIAL_FORM_DATA,
  type SignUpFormData,
  type SignUpState,
} from "../../../types/user-auth-types";

export default function UserSignUpForm() {
  const [state, setState] = useState<SignUpState>({
    currentStep: 1,
    formData: INITIAL_FORM_DATA,
    isLoading: false,
    errors: {},
    isCompleted: false,
  });

  const stepTitles = ["Brand Introduction", "Protection Preferences"];
  const totalSteps = stepTitles.length;

  const updateFormData = (data: Partial<SignUpFormData>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...data },
      errors: {}, // Clear errors when user makes changes
    }));
  };

  const goToNextStep = async () => {
    if (state.currentStep === totalSteps) {
      // Final step - submit form
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        // Simulate API submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setState((prev) => ({
          ...prev,
          isLoading: false,
          isCompleted: true,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          errors: { submit: "Bir hata oluştu. Lütfen tekrar deneyin." },
        }));
      }
    } else {
      // Go to next step
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  const goToPreviousStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1),
    }));
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData: state.formData,
      onUpdateData: updateFormData,
      onNext: goToNextStep,
      onPrevious: goToPreviousStep,
      isLoading: state.isLoading,
      errors: state.errors,
    };

    switch (state.currentStep) {
      case 1:
        return <StepOne {...stepProps} />;
      case 2:
        return <StepTwo {...stepProps} />;
      default:
        return <StepOne {...stepProps} />;
    }
  };

  // Show success screen if completed
  if (state.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 border-border/30 shadow-2xl backdrop-blur-sm bg-card/95">
            <CardContent className="p-8">
              <SuccessScreen brandName={state.formData.brandName} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="fade-in">
          <div className="p-8">
            {/* Progress Indicator */}
            <StepProgress
              currentStep={state.currentStep}
              totalSteps={totalSteps}
              stepTitles={stepTitles}
            />

            {/* Current Step Content */}
            <div className="mt-8">{renderCurrentStep()}</div>

            {/* Loading Overlay */}
            {state.isLoading && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div className="text-center space-y-4">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Hesabınız oluşturuluyor...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
