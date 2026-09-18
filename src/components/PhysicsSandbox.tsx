'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, ArrowRight, Info } from 'lucide-react';

interface Puck {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  shadowColor: string;
  label: string;
}

export default function PhysicsSandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [massA, setMassA] = useState(3); // Relative scale
  const [massB, setMassB] = useState(5); // Relative scale
  const [collisionCount, setCollisionCount] = useState(0);

  // Keep physics variables in ref to prevent re-render lags
  const physicsRef = useRef<{
    puckA: Puck;
    puckB: Puck;
    totalMomentumX: number;
    totalMomentumY: number;
    elasticity: number;
  }>({
    puckA: {
      x: 80,
      y: 110,
      vx: 2.5,
      vy: 0.2,
      radius: 20,
      mass: 3,
      color: '#1E90FF',
      shadowColor: 'rgba(30, 144, 255, 0.6)',
      label: 'A',
    },
    puckB: {
      x: 320,
      y: 110,
      vx: -1.8,
      vy: -0.1,
      radius: 28,
      mass: 5,
      color: '#42B7FF',
      shadowColor: 'rgba(66, 183, 255, 0.6)',
      label: 'B',
    },
    totalMomentumX: 0,
    totalMomentumY: 0,
    elasticity: 1.0, // Fully elastic
  });

  // Telemetry state for UI
  const [telemetry, setTelemetry] = useState({
    pA: { vx: 2.5, vy: 0.2, p: 7.5 },
    pB: { vx: -1.8, vy: -0.1, p: -9.0 },
    pTotal: -1.5,
  });

  const calculateTelemetry = () => {
    const state = physicsRef.current;
    const pxA = state.puckA.mass * state.puckA.vx;
    const pyA = state.puckA.mass * state.puckA.vy;
    const pValA = Math.sqrt(pxA * pxA + pyA * pyA);

    const pxB = state.puckB.mass * state.puckB.vx;
    const pyB = state.puckB.mass * state.puckB.vy;
    const pValB = Math.sqrt(pxB * pxB + pyB * pyB);

    // Dynamic 1D approximation indicator for sign (Left/Right vector)
    const signA = state.puckA.vx >= 0 ? 1 : -1;
    const signB = state.puckB.vx >= 0 ? 1 : -1;

    setTelemetry({
      pA: {
        vx: parseFloat(state.puckA.vx.toFixed(2)),
        vy: parseFloat(state.puckA.vy.toFixed(2)),
        p: parseFloat((pValA * signA).toFixed(2)),
      },
      pB: {
        vx: parseFloat(state.puckB.vx.toFixed(2)),
        vy: parseFloat(state.puckB.vy.toFixed(2)),
        p: parseFloat((pValB * signB).toFixed(2)),
      },
      pTotal: parseFloat((pValA * signA + pValB * signB).toFixed(2)),
    });
  };

  // Sync masses when sliders change
  useEffect(() => {
    const state = physicsRef.current;
    state.puckA.mass = massA;
    state.puckA.radius = 14 + massA * 2; // Radius proportional to mass

    state.puckB.mass = massB;
    state.puckB.radius = 14 + massB * 2;

    calculateTelemetry();
  }, [massA, massB]);

  const handleReset = () => {
    const state = physicsRef.current;
    const canvas = canvasRef.current;
    const w = canvas?.width || 400;
    const h = canvas?.height || 220;

    state.puckA.x = w * 0.2;
    state.puckA.y = h * 0.5 + (Math.random() - 0.5) * 20;
    state.puckA.vx = 2.5 + Math.random() * 0.5;
    state.puckA.vy = (Math.random() - 0.5) * 0.6;

    state.puckB.x = w * 0.8;
    state.puckB.y = h * 0.5 + (Math.random() - 0.5) * 20;
    state.puckB.vx = -2.0 - Math.random() * 0.5;
    state.puckB.vy = (Math.random() - 0.5) * 0.6;

    setCollisionCount(0);
    calculateTelemetry();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const updatePhysicsAndRender = () => {
      const state = physicsRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Clean canvas with very faint futuristic blueprint look
      ctx.fillStyle = '#060d19';
      ctx.fillRect(0, 0, w, h);

      // Subtle center lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.setLineDash([]);

      if (isPlaying) {
        // Move pucks
        const p1 = state.puckA;
        const p2 = state.puckB;

        p1.x += p1.vx;
        p1.y += p1.vy;
        p2.x += p2.vx;
        p2.y += p2.vy;

        // Wall collisions puck A
        if (p1.x - p1.radius < 0) {
          p1.x = p1.radius;
          p1.vx *= -1;
        } else if (p1.x + p1.radius > w) {
          p1.x = w - p1.radius;
          p1.vx *= -1;
        }

        if (p1.y - p1.radius < 0) {
          p1.y = p1.radius;
          p1.vy *= -1;
        } else if (p1.y + p1.radius > h) {
          p1.y = h - p1.radius;
          p1.vy *= -1;
        }

        // Wall collisions puck B
        if (p2.x - p2.radius < 0) {
          p2.x = p2.radius;
          p2.vx *= -1;
        } else if (p2.x + p2.radius > w) {
          p2.x = w - p2.radius;
          p2.vx *= -1;
        }

        if (p2.y - p2.radius < 0) {
          p2.y = p2.radius;
          p2.vy *= -1;
        } else if (p2.y + p2.radius > h) {
          p2.y = h - p2.radius;
          p2.vy *= -1;
        }

        // Puck to Puck collision
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = p1.radius + p2.radius;

        if (dist < minDist) {
          // Resolve overlap
          const overlap = minDist - dist;
          const nx = dx / dist; // normal vector
          const ny = dy / dist;

          p1.x -= nx * overlap * 0.5;
          p1.y -= ny * overlap * 0.5;
          p2.x += nx * overlap * 0.5;
          p2.y += ny * overlap * 0.5;

          // Elastic collision math in 2D
          const kx = p1.vx - p2.vx;
          const ky = p1.vy - p2.vy;
          const p = 2 * (nx * kx + ny * ky) / (p1.mass + p2.mass);

          p1.vx -= p * p2.mass * nx;
          p1.vy -= p * p2.mass * ny;
          p2.vx += p * p1.mass * nx;
          p2.vy += p * p1.mass * ny;

          setCollisionCount((prev) => prev + 1);
          calculateTelemetry();
        }
      }

      // Draw Puck A
      const p1 = state.puckA;
      ctx.save();
      ctx.shadowColor = p1.shadowColor;
      ctx.shadowBlur = 15;
      ctx.fillStyle = p1.color;
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
      ctx.fill();

      // Light center highlight
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(p1.x - p1.radius * 0.2, p1.y - p1.radius * 0.2, p1.radius * 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Velocity vector A arrow
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p1.x + p1.vx * 15, p1.y + p1.vy * 15);
      ctx.stroke();
      ctx.restore();

      // Puck A Text label inside puck
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${p1.label}`, p1.x, p1.y + 1);

      // Draw Puck B
      const p2 = state.puckB;
      ctx.save();
      ctx.shadowColor = p2.shadowColor;
      ctx.shadowBlur = 15;
      ctx.fillStyle = p2.color;
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, p2.radius, 0, Math.PI * 2);
      ctx.fill();

      // Light center highlight B
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(p2.x - p2.radius * 0.2, p2.y - p2.radius * 0.2, p2.radius * 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Velocity vector B arrow
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(p2.x + p2.vx * 15, p2.y + p2.vy * 15);
      ctx.stroke();
      ctx.restore();

      // Puck B Text label inside puck
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${p2.label}`, p2.x, p2.y + 1);

      animationFrameId = requestAnimationFrame(updatePhysicsAndRender);
    };

    updatePhysicsAndRender();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <div ref={containerRef} className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col h-full justify-between shadow-2xl relative overflow-hidden">
      {/* Absolute faint background glow */}
      <div className="absolute -right-24 -top-24 w-48 h-48 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Title block */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-accent animate-pulse" />
          <h4 className="font-display font-medium text-sm tracking-wide text-white uppercase flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-accent" />
            Momentum Vector Sandbox
          </h4>
        </div>
        <span className="font-mono text-[10px] bg-white/5 text-brand-silver px-2 py-0.5 rounded border border-white/10 uppercase">
          Collisions: {collisionCount}
        </span>
      </div>

      <p className="text-xs text-brand-silver mb-3">
        Adjust masses to simulate momentum exchange. Press reset to trigger a clean head-on elastic collision!
      </p>

      {/* Arena Canvas */}
      <div className="relative rounded-lg overflow-hidden border border-white/10 mb-4 h-[180px] bg-brand-black">
        <canvas
          ref={canvasRef}
          width={380}
          height={180}
          className="w-full h-full block cursor-crosshair"
        />
        {/* Interactive Overlay Indicator */}
        <div className="absolute top-2 left-2 flex gap-1.5 pointer-events-none">
          <span className="text-[9px] font-mono bg-navy-dark/80 px-1.5 py-0.5 rounded text-electric-blue border border-white/5">
            Puck A: m = {massA}
          </span>
          <span className="text-[9px] font-mono bg-navy-dark/80 px-1.5 py-0.5 rounded text-cyan-accent border border-white/5">
            Puck B: m = {massB}
          </span>
        </div>
      </div>

      {/* Lab Controls (Sliders & Action Buttons) */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Slider Puck A */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-brand-silver">
            <span className="text-electric-blue">Mass A (m_A):</span>
            <span className="text-white font-bold">{massA} kg</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={massA}
            onChange={(e) => setMassA(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-electric-blue"
          />
        </div>

        {/* Slider Puck B */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono text-brand-silver">
            <span className="text-cyan-accent">Mass B (m_B):</span>
            <span className="text-white font-bold">{massB} kg</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={massB}
            onChange={(e) => setMassB(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-accent"
          />
        </div>
      </div>

      {/* Live Physics Calculations Console */}
      <div className="bg-navy-dark/80 border border-white/5 rounded-xl p-3.5 font-mono text-xs space-y-2 mb-4">
        <div className="grid grid-cols-2 gap-2 border-b border-white/5 pb-2 text-[10px] text-brand-silver tracking-wider uppercase">
          <div>Puck A Telemetry</div>
          <div>Puck B Telemetry</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-[11px]">
          {/* Puck A calculations */}
          <div className="space-y-1 text-electric-blue">
            <div>v_x: {telemetry.pA.vx} m/s</div>
            <div>p_A: {telemetry.pA.p} kg·m/s</div>
          </div>

          {/* Puck B calculations */}
          <div className="space-y-1 text-cyan-accent">
            <div>v_x: {telemetry.pB.vx} m/s</div>
            <div>p_B: {telemetry.pB.p} kg·m/s</div>
          </div>
        </div>

        {/* System Conservation Output */}
        <div className="border-t border-white/5 pt-2 flex items-center justify-between text-xs">
          <span className="text-brand-silver flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-cyan-accent" />
            Total Momentum (P):
          </span>
          <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
            {telemetry.pTotal} kg·m/s (Constant)
          </span>
        </div>
      </div>

      {/* Simulator Actions */}
      <div className="flex gap-2.5">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          id="play-pause-btn"
          className="flex-1 py-2 px-3.5 text-xs font-display font-medium rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-cyan-accent" />
              Pause Lab
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-green-400" />
              Resume Lab
            </>
          )}
        </button>
        
        <button
          onClick={handleReset}
          id="reset-sandbox-btn"
          className="flex-1 py-2 px-3.5 text-xs font-display font-medium rounded-lg border border-electric-blue/20 bg-electric-blue/10 text-electric-blue hover:bg-electric-blue/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Collide
        </button>
      </div>
    </div>
  );
}
