"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Label } from "@/components/ui/primitives/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/primitives/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/primitives/accordion";
import { Separator } from "@/components/ui/primitives/separator";

export function NavigationComponentsDemo() {
  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Navigation Components</CardTitle>
        <CardDescription>
          Tabs and accordion for organizing content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-4 block">Tabs</Label>
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="fade-in mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p>
                    Content for the first tab. This demonstrates how tabs can
                    organize information.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2" className="fade-in mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p>Content for the second tab with different information.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3" className="fade-in mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p>Content for the third tab showing more details.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Separator />

        <div>
          <Label className="mb-4 block">Accordion</Label>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent className="fade-in">
                Yes. It adheres to the WAI-ARIA design pattern and uses semantic
                HTML.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent className="fade-in">
                Yes. It comes with default styles that matches the other
                components aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent className="fade-in">
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
