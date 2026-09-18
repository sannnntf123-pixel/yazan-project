'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface Orbit {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  angle: number;
  speed: number;
  color: string;
}

interface PhysicsFormula {
  x: number;
  y: number;
  text: string;
  speed: number;
  alpha: number;
  fontSize: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Formulas drifting in background
    const formulasList = [
      'p = m · v',
      'F = dp / dt',
      'Δp = F · Δt',
      'E = mc²',
      'F = G · (m₁m₂)/r²',
      'KE = ½mv²',
      'p_initial = p_final',
      'λ = h / p',
    ];

    let particles: Particle[] = [];
    let orbits: Orbit[] = [];
    let formulas: PhysicsFormula[] = [];

    const initElements = (w: number, h: number) => {
      particles = [];
      orbits = [];
      formulas = [];

      // Create floating particles
      const count = Math.min(Math.floor((w * h) / 15000), 60);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? '#1E90FF' : '#42B7FF',
          alpha: Math.random() * 0.5 + 0.15,
        });
      }

      // Create orbiting paths representing electron shells/orbit fields
      const orbitCount = Math.min(Math.floor(w / 400), 5);
      for (let i = 0; i < orbitCount; i++) {
        orbits.push({
          centerX: Math.random() * w,
          centerY: Math.random() * h,
          radiusX: Math.random() * 150 + 80,
          radiusY: Math.random() * 80 + 40,
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() * 0.002 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
          color: Math.random() > 0.5 ? 'rgba(30, 144, 255, 0.08)' : 'rgba(66, 183, 255, 0.08)',
        });
      }

      // Create drifting physics formulas
      const formulaCount = Math.min(Math.floor(w / 350), 6);
      for (let i = 0; i < formulaCount; i++) {
        formulas.push({
          x: Math.random() * w,
          y: Math.random() * h,
          text: formulasList[Math.floor(Math.random() * formulasList.length)],
          speed: Math.random() * 0.1 + 0.05,
          alpha: Math.random() * 0.12 + 0.03,
          fontSize: Math.floor(Math.random() * 4) + 12,
        });
      }
    };

    // Use ResizeObserver for container bounds
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth;
        height = entryHeight;
        canvas.width = entryWidth;
        canvas.height = entryHeight;
        initElements(entryWidth, entryHeight);
      }
    });

    resizeObserver.observe(container);

    // Mouse movement listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw elegant subtle grid lines (Technical blueprint effect)
      ctx.strokeStyle = 'rgba(30, 144, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render and animate orbits
      orbits.forEach((orbit) => {
        orbit.angle += orbit.speed;
        ctx.save();
        ctx.translate(orbit.centerX, orbit.centerY);
        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Draw an ellipse
        ctx.ellipse(0, 0, orbit.radiusX, orbit.radiusY, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();

        // Draw an orbiting particle on this ellipse
        const ellipseX = orbit.radiusX * Math.cos(orbit.angle);
        const ellipseY = orbit.radiusY * Math.sin(orbit.angle);
        
        ctx.fillStyle = 'rgba(66, 183, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(ellipseX, ellipseY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw orbital glowing halo
        const gradient = ctx.createRadialGradient(ellipseX, ellipseY, 1, ellipseX, ellipseY, 8);
        gradient.addColorStop(0, 'rgba(66, 183, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(66, 183, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ellipseX, ellipseY, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 3. Render and animate formulas
      ctx.font = '500 12px "JetBrains Mono", monospace';
      formulas.forEach((formula) => {
        formula.y -= formula.speed;
        if (formula.y < -30) {
          formula.y = height + 20;
          formula.x = Math.random() * width;
          formula.text = formulasList[Math.floor(Math.random() * formulasList.length)];
        }

        ctx.fillStyle = `rgba(163, 179, 194, ${formula.alpha})`;
        ctx.font = `500 ${formula.fontSize}px "JetBrains Mono", monospace`;
        ctx.fillText(formula.text, formula.x, formula.y);
      });

      // 4. Draw links between near particles (Molecular or stellar network)
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(30, 144, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 5. Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary rebound
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction with mouse (Field attraction)
        if (mouseRef.current.active) {
          const mdx = mouseRef.current.x - p.x;
          const mdy = mouseRef.current.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 180) {
            // Apply subtle force
            const force = (180 - mdist) * 0.00015;
            p.x += mdx * force;
            p.y += mdy * force;
          }
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset
      });

      // 6. Mouse glow effect
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const radGrad = ctx.createRadialGradient(mx, my, 10, mx, my, 120);
        radGrad.addColorStop(0, 'rgba(30, 144, 255, 0.07)');
        radGrad.addColorStop(1, 'rgba(30, 144, 255, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div id="particle-container" ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
    </div>
  );
}
