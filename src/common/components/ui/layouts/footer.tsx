import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Contact Us:{" "}
              <a
                href="mailto:info@counterfake.com"
                className="text-primary font-medium"
              >
                info@counterfake.com
              </a>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Counterfake. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
