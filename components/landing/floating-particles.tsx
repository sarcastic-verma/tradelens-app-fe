"use client";

import { useParallax } from "@/hooks/use-parallax";

const particles = [
  { size: 4, left: "10%", top: "20%", delay: 0, speed: 0.3 },
  { size: 6, left: "20%", top: "60%", delay: 1, speed: 0.2 },
  { size: 3, left: "35%", top: "30%", delay: 2, speed: 0.4 },
  { size: 5, left: "50%", top: "70%", delay: 0.5, speed: 0.25 },
  { size: 4, left: "65%", top: "25%", delay: 1.5, speed: 0.35 },
  { size: 7, left: "80%", top: "50%", delay: 2.5, speed: 0.15 },
  { size: 3, left: "90%", top: "15%", delay: 3, speed: 0.3 },
  { size: 5, left: "15%", top: "80%", delay: 1.2, speed: 0.2 },
  { size: 4, left: "75%", top: "85%", delay: 0.8, speed: 0.4 },
  { size: 6, left: "45%", top: "10%", delay: 2.2, speed: 0.25 },
];

export const FloatingParticles = () => {
  const parallaxOffset = useParallax(0.3);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-primary/20 animate-pulse"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
            transform: `translateY(${parallaxOffset * particle.speed}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );
};
