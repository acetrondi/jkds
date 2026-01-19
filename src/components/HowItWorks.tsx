import { MessageSquare, Lightbulb, Box, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery & Brief",
    description: "We discuss your vision, goals, and project requirements to understand what you need.",
  },
  {
    icon: Lightbulb,
    title: "Concept & Planning",
    description: "Creating mood boards, references, and concepts to visualize the direction of your project.",
  },
  {
    icon: Box,
    title: "3D Modeling & Visualization",
    description: "Building detailed 3D models and photorealistic renders for review and refinement.",
  },
  {
    icon: CheckCircle,
    title: "Delivery & Review",
    description: "Final high-resolution images, videos, or presentations delivered for your approval.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="section-title text-foreground">HOW IT WORKS</h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card-surface card-hover p-8 text-center space-y-6"
            >
              {/* Step Icon */}
              <div className="step-icon mx-auto">
                <step.icon className="w-6 h-6" />
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= index ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
