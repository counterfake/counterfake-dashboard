import React from "react";

interface CasesErrorStateProps {
  error: Error;
}

export function CasesErrorState({ error }: CasesErrorStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-destructive">An error occurred: {error.message}</p>
    </div>
  );
}
