import { useEffect, useRef, useState } from "react";

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
    <div ref={ref} className="flex flex-col justify-between h-full p-8 md:p-12 transition-colors duration-300 hover:bg-primary/5">
      <span className="text-sm md:text-base font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="font-mono-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
          {count}
        </span>
        {showPlus && (
          <span className="font-mono-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            +
          </span>
        )}
        {suffix && (
          <span className="font-mono-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { label: "Countries", value: 44 },
    { label: "Years of experience", value: 40, showPlus: true },
    { label: "Projects", value: 950 },
    { label: "Awards", value: 50, showPlus: true },
  ];

  return (
    <section className="w-full bg-background py-20 md:py-[120px]">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border bg-card/50 backdrop-blur-sm rounded-none overflow-hidden">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                border-b border-border last:border-b-0 
                lg:border-b-0 lg:border-r lg:last:border-r-0
                ${index % 2 === 0 ? 'md:border-r' : 'md:border-r-0'}
              `}
            >
              <StatItem
                label={stat.label}
                value={stat.value}
                showPlus={stat.showPlus}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
