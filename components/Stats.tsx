import React, { useState, useEffect, useRef } from 'react';
import type { SiteContent } from '../siteData';

// Helper component for animating numbers
const AnimatedStat: React.FC<{ finalValue: number; isVisible: boolean }> = ({ finalValue, isVisible }) => {
    const [count, setCount] = useState(0);
    const duration = 2000; // Animation duration in ms

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        let startTime: number | null = null;

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const progress = currentTime - startTime;
            // Calculate value based on progress, ensuring it doesn't exceed finalValue
            const value = Math.min(Math.floor((progress / duration) * finalValue), finalValue);
            
            setCount(value);

            if (progress < duration) {
                requestAnimationFrame(animation);
            } else {
                setCount(finalValue); // Ensure it ends on the exact value
            }
        };

        requestAnimationFrame(animation);

    }, [isVisible, finalValue]);

    return <p className="text-4xl lg:text-6xl font-bold">{count.toLocaleString('fa-IR')}</p>;
};


interface StatsProps {
  content: SiteContent['stats'];
}

interface StatItemProps {
  value: string;
  label: string;
  isVisible: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, isVisible }) => {
    // Extract numeric part from the value string (e.g., '100+' -> 100)
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    return (
        <div className="text-center">
            <AnimatedStat finalValue={numericValue} isVisible={isVisible} />
            <p className="text-base md:text-lg mt-1 opacity-90">{label}</p>
        </div>
    );
};

const CircleSeparator: React.FC<{ position: string }> = ({ position }) => (
    <div className={`absolute ${position} hidden lg:block`}>
        <div className="w-48 h-48 border-4 border-white/10 rounded-full"></div>
    </div>
);


const Stats: React.FC<StatsProps> = ({ content }) => {
  const stats = [
    { value: content.experience.value, label: content.experience.label },
    { value: content.customers.value, label: content.customers.label },
    { value: content.team.value, label: content.team.label },
    { value: content.satisfaction.value, label: content.satisfaction.label },
  ];
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
      const element = sectionRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
          ([entry]) => {
              if (entry.isIntersecting) {
                  setIsVisible(true);
                  observer.unobserve(element);
              }
          },
          {
              root: null, // relative to document viewport
              rootMargin: '0px',
              threshold: 0.5 // 50% of item has to be visible
          }
      );

      observer.observe(element);

      return () => {
          observer.disconnect();
      };
  }, []);

  return (
    <section 
        ref={sectionRef} 
        className={`text-[var(--color-text-on-primary)] py-16 sm:py-20 relative overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
        style={{ backgroundColor: 'var(--color-secondary)' }}
    >
        <CircleSeparator position="-top-24 -right-24" />
        <CircleSeparator position="-bottom-20 -left-20" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(stat => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;