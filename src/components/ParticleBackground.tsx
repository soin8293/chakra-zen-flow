import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate initial particles with more variety
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 3 + 0.3,
      });
    }
    setParticles(newParticles);

    // Enhanced particle animation with parallax
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed * 0.08,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.15,
        opacity: particle.opacity + Math.sin(Date.now() * 0.002 + particle.id) * 0.1,
        // Reset particle when it goes off screen with staggered entry
        ...(particle.y < -5 ? {
          y: 105 + Math.random() * 10,
          x: Math.random() * 100,
          opacity: Math.random() * 0.7 + 0.1,
        } : {})
      })));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: Math.max(0.1, Math.min(0.8, particle.opacity)),
            background: `radial-gradient(circle, hsl(var(--primary)) ${particle.size > 2 ? '60%' : '40%'}, transparent 70%)`,
            animationDelay: `${particle.id * 0.2}s`,
            filter: `blur(${particle.size > 3 ? '0.5px' : '0px'})`,
          }}
        />
      ))}
      
      {/* Ambient breathing aura */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent animate-pulse-gentle"
        style={{ 
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.05) 20%, transparent 70%)',
        }}
      />
    </div>
  );
}