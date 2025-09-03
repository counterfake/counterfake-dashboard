"use client";

import { useState } from "react";
import { User, Shield, Globe } from "lucide-react";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";
import { Input } from "@/common/components/ui/primitives/input";

import DashboardPageWrapper from "@/features/user-dashboard/components/layout/dashboard-page-wrapper";

export default function Settings() {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    brandName: user?.brand.name || "",
    userName: user?.username || "",
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving settings:", formData);
  };

  return (
    <DashboardPageWrapper
      title="Settings"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", current: true },
      ]}
    >
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Account Settings */}
          <Card className="fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Brand Name
                </label>
                <Input
                  value={formData.brandName}
                  onChange={(e) =>
                    setFormData({ ...formData, brandName: e.target.value })
                  }
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Username
                </label>
                <Input
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  disabled
                />
              </div>
              <Button onClick={handleSave} className="w-full" disabled>
                Save
              </Button>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Interface Language
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="language"
                      value="en"
                      checked={true}
                      onChange={(e) => {}}
                      className="w-4 h-4"
                    />
                    <span>English</span>
                  </label>

                  <p className="text-xs text-muted-foreground">
                    Coming soon other languages...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full" disabled>
                Change Password
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Third Party Integrations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}
