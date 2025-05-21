
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart";

const panelContentData = [
  {
    id: 'why-choose',
    title: "Why Choose IAPES Prep?",
    description: `IAPES Prep is more than just a test simulator. We are your dedicated partner in achieving success
                  in the ICFES Saber 11 exam. Our platform is designed to provide you with the tools, insights,
                  and support you need to excel.`,
    features: [
      "Realistic ICFES Saber 11 simulations.",
      "AI-powered personalized feedback to pinpoint improvement areas.",
      "Comprehensive question bank covering all subjects.",
      "Track your progress with detailed analytics.",
      "Flexible study plans tailored to your needs.",
      "User-friendly interface accessible on all devices."
    ],
  },
  {
    id: 'statistics',
    title: "Our Impact & Results",
    description: `Discover the significant impact IAPES Prep has had on student success. Our tailored approach and advanced tools
                  lead to measurable improvements and outstanding results. The chart below highlights key performance indicators.`,
    chartData: [
      { category: "Score Improvement", value: 25, fill: "hsl(var(--chart-1))" },
      { category: "Pass Rate", value: 85, fill: "hsl(var(--chart-2))" },
      { category: "User Satisfaction", value: 92, fill: "hsl(var(--chart-3))" },
    ],
    chartConfig: {
      value: {
        label: "Percentage",
      },
      // These keys are for reference if we want to use them in tooltips or legends for categories.
      // The actual bar colors are driven by the `fill` property in `chartData`.
      "Score Improvement": { color: "hsl(var(--chart-1))" },
      "Pass Rate": { color: "hsl(var(--chart-2))" },
      "User Satisfaction": { color: "hsl(var(--chart-3))" },
    } satisfies ChartConfig,
    chartFooter: "Graph shows average percentage improvements and satisfaction rates based on user data."
  }
];

export default function WhyThisAppSection() {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const navigate = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPanelIndex((prevIndex) => Math.min(prevIndex + 1, panelContentData.length - 1));
    } else {
      setCurrentPanelIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const currentPanel = panelContentData[currentPanelIndex];

  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <Card className="shadow-xl border border-primary/30 hover:border-primary/60 transition-colors duration-300 shadow-neon-primary overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary text-shadow-neon-primary">
              {currentPanel.title}
            </CardTitle>
          </CardHeader>
          
          <div className="relative">
            {/* Left Arrow */}
            {currentPanelIndex > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('prev')}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 rounded-full border-primary/50 text-primary hover:bg-primary/10 shadow-neon-primary text-shadow-neon-primary"
                aria-label="Previous Panel"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            <CardContent className="px-4 py-8 md:px-16 min-h-[400px]"> {/* Increased horizontal padding, min-height */}
              {currentPanel.id === 'why-choose' && currentPanel.features && (
                <>
                  <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                    {currentPanel.description}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPanel.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg shadow">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1 text-shadow-neon-primary" />
                        <p className="text-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentPanel.id === 'statistics' && currentPanel.chartData && currentPanel.chartConfig && (
                <div className="flex flex-col items-center space-y-6">
                  <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
                    {currentPanel.description}
                  </p>
                  <div className="w-full max-w-2xl h-[300px] md:h-[350px]">
                    <ChartContainer config={currentPanel.chartConfig} className="w-full h-full">
                      <BarChart accessibilityLayer data={currentPanel.chartData} layout="vertical" margin={{ left: 0, right: 40, top: 5, bottom: 5 }}>
                        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="value" tickFormatter={(value) => `${value}%`} />
                        <YAxis 
                          dataKey="category" 
                          type="category" 
                          tickLine={false} 
                          axisLine={false} 
                          tickMargin={10}
                          width={140} // Adjusted for potentially longer labels
                          interval={0}
                        />
                        <ChartTooltip
                          cursor={{fill: 'hsl(var(--muted))'}}
                          content={<ChartTooltipContent indicator="dot" hideLabel />}
                        />
                        <Bar dataKey="value" radius={[0, 5, 5, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                  {currentPanel.chartFooter && (
                     <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto">
                      {currentPanel.chartFooter}
                    </p>
                  )}
                </div>
              )}
            </CardContent>

            {/* Right Arrow */}
            {currentPanelIndex < panelContentData.length - 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('next')}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 rounded-full border-primary/50 text-primary hover:bg-primary/10 shadow-neon-primary text-shadow-neon-primary"
                aria-label="Next Panel"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
