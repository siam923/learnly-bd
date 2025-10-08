import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, Beaker, Calculator, Video, CheckCircle2, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Beaker className="w-6 h-6" />,
      title: "Interactive Simulations",
      description: "Physics and chemistry simulators for hands-on learning"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Math Visualizers",
      description: "Angle visualizers and interactive math puzzles"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Lessons",
      description: "High-quality video content embedded in lessons"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "MDX Content",
      description: "Rich, interactive lesson content with LaTeX support"
    }
  ];

  const benefits = [
    "Access to all interactive simulations",
    "Video lessons and tutorials",
    "Progress tracking",
    "AI-powered learning assistant",
    "Mobile-friendly platform",
    "Regular content updates"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-6 animate-fade-in">
            <Badge variant="secondary" className="px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Interactive Learning Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              Learn with{" "}
              <span className="text-primary">
                Interactive
              </span>{" "}
              Content
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master SSC & HSC subjects with our engaging simulations, visualizers, and comprehensive lessons.
              Start your journey today!
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <Button size="lg" onClick={() => navigate("/auth")} className="shadow-glow">
                Start Learning <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground text-lg">
              Experience learning like never before with our cutting-edge tools
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-2 hover:shadow-elegant transition-all duration-300 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simple, Affordable Pricing</h2>
            <p className="text-muted-foreground text-lg">
              Get unlimited access to all content
            </p>
          </div>
          <Card className="border-2 border-primary shadow-glow max-w-md mx-auto">
            <CardContent className="p-8 space-y-6">
              <div className="text-center">
                <Badge className="mb-4">Most Popular</Badge>
                <h3 className="text-2xl font-bold mb-2">Monthly Access</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold">৳299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" size="lg" onClick={() => navigate("/auth")}>
                Start 7-Day Free Trial
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                No credit card required. Cancel anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <BookOpen className="w-16 h-16 mx-auto text-primary animate-float" />
          <h2 className="text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of students already mastering their subjects with our interactive platform
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="shadow-glow">
            Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
