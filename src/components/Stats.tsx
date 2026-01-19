import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  showPlus?: boolean;
}

const StatItem = ({ label, value, suffix, showPlus }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center py-8 md:py-0">
      <span className="text-[13px] md:text-[14px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
        {label}
      </span>
      <div className="flex items-start ml-2">
        <span className="text-[56px] md:text-[72px] lg:text-[80px] font-bold leading-none text-foreground">
          {count}
        </span>
        {showPlus && (
          <span className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-none text-primary ml-1 transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">
            +
          </span>
        )}
        {suffix && (
          <span className="text-[56px] md:text-[72px] lg:text-[80px] font-bold leading-none text-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { label: "COUNTRIES", value: 44 },
    { label: "EXPERIENCE", value: 40, showPlus: true },
    { label: "PROJECTS", value: 950 },
    { label: "AWARDS", value: 50, showPlus: true },
  ];

  return (
    <section className="w-full bg-background py-20 md:py-[120px]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center justify-center">
              <StatItem
                label={stat.label}
                value={stat.value}
                showPlus={stat.showPlus}
              />
              {index < stats.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="hidden lg:block h-24 ml-auto bg-border"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
