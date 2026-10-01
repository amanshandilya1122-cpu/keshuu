import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  petalType: 'petal' | 'heart' | 'sparkle';
  color: string;
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color choices: soft rose pinks, blush, gold sparkle
    const petalColors = [
      'rgba(251, 113, 133, 0.65)', // rose-400
      'rgba(244, 63, 94, 0.55)',  // rose-500
      'rgba(253, 164, 175, 0.7)',  // rose-300
      'rgba(254, 205, 211, 0.8)',  // rose-200
      'rgba(244, 114, 182, 0.6)',  // pink-400
    ];

    const heartColors = [
      'rgba(225, 29, 72, 0.6)',   // rose-600
      'rgba(244, 63, 94, 0.65)',  // rose-500
      'rgba(251, 113, 133, 0.7)', // rose-400
    ];

    // Maintain around 30 lightweight particles for smooth 60fps
    const particleCount = Math.min(36, Math.floor(window.innerWidth / 25));
    const petals: Petal[] = [];

    const createPetal = (startY?: number): Petal => {
      const rand = Math.random();
      const petalType: 'petal' | 'heart' | 'sparkle' =
        rand < 0.6 ? 'petal' : rand < 0.88 ? 'heart' : 'sparkle';

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: petalType === 'sparkle' ? 4 + Math.random() * 4 : 8 + Math.random() * 10,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: -0.4 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.4 + Math.random() * 0.5,
        petalType,
        color:
          petalType === 'petal'
            ? petalColors[Math.floor(Math.random() * petalColors.length)]
            : petalType === 'heart'
            ? heartColors[Math.floor(Math.random() * heartColors.length)]
            : 'rgba(253, 224, 71, 0.75)',
      };
    };

    for (let i = 0; i < particleCount; i++) {
      petals.push(createPetal());
    }

    // Helper to draw a heart
    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.globalAlpha = alpha;
      context.fillStyle = color;
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(
        -size / 2,
        -topCurveHeight,
        -size,
        topCurveHeight / 3,
        0,
        size
      );
      // top right curve
      context.bezierCurveTo(
        size,
        topCurveHeight / 3,
        size / 2,
        -topCurveHeight,
        0,
        topCurveHeight
      );
      context.closePath();
      context.fill();
      context.restore();
    };

    // Helper to draw a delicate sakura petal
    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = alpha;
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(0, -size);
      context.quadraticCurveTo(size * 0.7, -size * 0.4, size * 0.4, size * 0.6);
      context.quadraticCurveTo(0, size, 0, size);
      context.quadraticCurveTo(0, size, -size * 0.4, size * 0.6);
      context.quadraticCurveTo(-size * 0.7, -size * 0.4, 0, -size);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Helper to draw a 4-point sparkle star
    const drawSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.globalAlpha = alpha;
      context.fillStyle = 'rgba(254, 240, 138, 0.9)';
      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        context.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.28),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.28)
        );
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    // Interactive heart burst on click/tap
    const clickHearts: { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }[] = [];

    const handleWindowClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        clickHearts.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          life: 1.0,
          size: 8 + Math.random() * 8,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
        });
      }
    };

    window.addEventListener('click', handleWindowClick);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render falling petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.petalType === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.petalType === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.opacity);
        }
      });

      // Render click-spawned floating hearts
      for (let i = clickHearts.length - 1; i >= 0; i--) {
        const ch = clickHearts[i];
        ch.x += ch.vx;
        ch.y += ch.vy;
        ch.vy += 0.04; // gentle gravity
        ch.life -= 0.02;

        if (ch.life <= 0) {
          clickHearts.splice(i, 1);
        } else {
          drawHeart(ctx, ch.x, ch.y, ch.size, ch.color, ch.life);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleWindowClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
