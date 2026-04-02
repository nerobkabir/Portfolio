"use client";
import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // ✅ ctx is guaranteed non‑null from here on

    let rafId: number;

    const STREAMS  = 12;
    const HISTORY  = 55;
    const BASE_HUE = 210;

    const springs = Array.from({ length: STREAMS }, (_, i) => ({
      x: -999, y: -999,
      speed: 0.38 - i * 0.022,
    }));

    const streams: { x: number; y: number }[][] = Array.from(
      { length: STREAMS },
      () => [],
    );

    let mouse = { x: -999, y: -999 };
    let active = false;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse  = { x: e.clientX, y: e.clientY };
      active = true;
    };
    window.addEventListener("mousemove", onMove);

    // ✅ Safe drawSpline – ctx is already known to be non‑null
    function drawSpline(pts: { x: number; y: number }[]) {
      if (pts.length < 4) return;
      // No need to check ctx again, but TypeScript still complains.
      // We can assert or add a runtime guard. Let's add a guard:
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < pts.length - 3; i++) {
        const p0 = pts[Math.max(i - 1, 0)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(i + 2, pts.length - 1)];
        const tension = 0.5;
        const cp1x = p1.x + (p2.x - p0.x) * tension / 3;
        const cp1y = p1.y + (p2.y - p0.y) * tension / 3;
        const cp2x = p2.x - (p3.x - p1.x) * tension / 3;
        const cp2y = p2.y - (p3.y - p1.y) * tension / 3;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    }

    const draw = () => {
      // ctx is already non‑null, but TypeScript may still think it's possible.
      // We'll add a guard at the top of draw as well (though it's redundant after the outer check).
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (active) {
        for (let s = 0; s < STREAMS; s++) {
          const target = s === 0 ? mouse : springs[s - 1];
          const sp = springs[s];
          if (sp.x === -999) { sp.x = target.x; sp.y = target.y; }
          sp.x += (target.x - sp.x) * sp.speed;
          sp.y += (target.y - sp.y) * sp.speed;
          streams[s].unshift({ x: sp.x, y: sp.y });
          if (streams[s].length > HISTORY) streams[s].length = HISTORY;
        }

        for (let s = 0; s < STREAMS; s++) {
          const pts = streams[s];
          if (pts.length < 4) continue;

          const t     = s / (STREAMS - 1);
          const alpha = 0.65 - t * 0.50;
          const width = 0.45 - t * 0.28;
          const hue   = BASE_HUE + t * 40;

          // Glow pass
          ctx.save();
          ctx.lineWidth   = width + 1.2;
          ctx.lineCap     = "round";
          ctx.lineJoin    = "round";
          ctx.shadowBlur  = 6;
          ctx.shadowColor = `hsla(${hue}, 100%, 68%, ${alpha * 0.35})`;

          const grad = ctx.createLinearGradient(
            pts[0].x, pts[0].y,
            pts[pts.length - 1].x, pts[pts.length - 1].y,
          );
          grad.addColorStop(0,    `hsla(${hue}, 90%, 78%, ${alpha})`);
          grad.addColorStop(0.45, `hsla(${hue}, 85%, 65%, ${alpha * 0.4})`);
          grad.addColorStop(1,    `hsla(${hue}, 80%, 55%, 0)`);
          ctx.strokeStyle = grad;
          drawSpline(pts);
          ctx.stroke();
          ctx.restore();

          // Core line
          ctx.save();
          ctx.lineWidth   = width;
          ctx.lineCap     = "round";
          ctx.lineJoin    = "round";
          ctx.globalAlpha = alpha * 0.85;
          ctx.strokeStyle = `hsla(${hue}, 70%, 92%, 0.9)`;
          drawSpline(pts);
          ctx.stroke();
          ctx.restore();
        }

        const cx = springs[0].x;
        const cy = springs[0].y;
        if (cx > 0 && cy > 0) {
          const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
          rg.addColorStop(0,   `hsla(${BASE_HUE}, 100%, 95%, 0.9)`);
          rg.addColorStop(0.5, `hsla(${BASE_HUE}, 95%,  72%, 0.4)`);
          rg.addColorStop(1,   `hsla(${BASE_HUE}, 90%,  60%, 0)`);
          ctx.beginPath();
          ctx.arc(cx, cy, 8, 0, Math.PI * 2);
          ctx.fillStyle   = rg;
          ctx.shadowBlur  = 10;
          ctx.shadowColor = `hsla(${BASE_HUE}, 100%, 75%, 0.7)`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(cx, cy, 1.4, 0, Math.PI * 2);
          ctx.fillStyle  = "#fff";
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, mixBlendMode: "screen" }}
    />
  );
}