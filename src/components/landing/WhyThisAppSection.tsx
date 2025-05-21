
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function WhyThisAppSection() {
  const features = [
    "Realistic ICFES Saber 11 simulations.",
    "AI-powered personalized feedback to pinpoint improvement areas.",
    "Comprehensive question bank covering all subjects.",
    "Track your progress with detailed analytics.",
    "Flexible study plans tailored to your needs.",
    "User-friendly interface accessible on all devices."
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <Card className="shadow-xl border border-primary/30 hover:border-primary/60 transition-colors duration-300 shadow-neon-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary text-shadow-neon-primary">Why Choose IAPES Prep?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
              IAPES Prep is more than just a test simulator. We are your dedicated partner in achieving success
              in the ICFES Saber 11 exam. Our platform is designed to provide you with the tools, insights,
              and support you need to excel.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg shadow">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1 text-shadow-neon-primary" />
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
