import React, { useEffect, useRef } from 'react';
import { FlowerTheme } from '../config/flowerThemes';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  petalType: 'petal' | 'heart' | 'sparkle' | 'flower';
  color: string;
}

interface FallingPetalsProps {
  flowerTheme: FlowerTheme;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({ flowerTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<FlowerTheme>(flowerTheme);

  // Keep themeRef updated
  useEffect(() => {
    themeRef.current = flowerTheme;
  }, [flowerTheme]);

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

    const particleCount = Math.min(38, Math.floor(window.innerWidth / 24));
    const petals: Petal[] = [];

    const createPetal = (startY?: number): Petal => {
      const current = themeRef.current;
      const rand = Math.random();
      const petalType: 'petal' | 'heart' | 'sparkle' | 'flower' =
        rand < 0.62 ? 'petal' : rand < 0.82 ? 'heart' : rand < 0.94 ? 'sparkle' : 'flower';

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size:
          petalType === 'sparkle'
            ? 4 + Math.random() * 4
            : petalType === 'flower'
            ? 12 + Math.random() * 6
            : 8 + Math.random() * 10,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: -0.4 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.4 + Math.random() * 0.5,
        petalType,
        color:
          petalType === 'petal'
            ? current.petalColors[Math.floor(Math.random() * current.petalColors.length)]
            : petalType === 'heart'
            ? current.heartColors[Math.floor(Math.random() * current.heartColors.length)]
            : current.sparkleColor,
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
      context.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
      context.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Helper to draw realistic petal shapes based on active flower
    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number,
      flowerId: string
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = alpha;
      context.fillStyle = color;
      context.beginPath();

      if (flowerId === 'rose') {
        // Broad, rounded velvety rose petal
        context.moveTo(0, -size * 0.8);
        context.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.7, size * 0.6, 0, size * 0.9);
        context.bezierCurveTo(-size * 0.7, size * 0.6, -size * 0.8, -size * 0.6, 0, -size * 0.8);
      } else if (flowerId === 'sunflower') {
        // Elongated golden sunflower petal
        context.moveTo(0, -size * 1.2);
        context.quadraticCurveTo(size * 0.45, 0, 0, size * 1.1);
        context.quadraticCurveTo(-size * 0.45, 0, 0, -size * 1.2);
      } else if (flowerId === 'lavender') {
        // Delicate teardrop lilac/lavender floret
        context.moveTo(0, -size);
        context.quadraticCurveTo(size * 0.35, -size * 0.2, 0, size * 0.7);
        context.quadraticCurveTo(-size * 0.35, -size * 0.2, 0, -size);
      } else if (flowerId === 'lotus') {
        // Elegant pointed boat-shaped lotus petal
        context.moveTo(0, -size * 1.1);
        context.bezierCurveTo(size * 0.6, -size * 0.2, size * 0.5, size * 0.5, 0, size * 0.8);
        context.bezierCurveTo(-size * 0.5, size * 0.5, -size * 0.6, -size * 0.2, 0, -size * 1.1);
      } else {
        // Sakura / Tulip curved notched petal
        context.moveTo(0, -size);
        context.quadraticCurveTo(size * 0.7, -size * 0.4, size * 0.4, size * 0.6);
        context.quadraticCurveTo(0, size, 0, size);
        context.quadraticCurveTo(0, size, -size * 0.4, size * 0.6);
        context.quadraticCurveTo(-size * 0.7, -size * 0.4, 0, -size);
      }

      context.closePath();
      context.fill();
      context.restore();
    };

    // Helper to draw flower emoji drifting down
    const drawFlowerEmoji = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      emoji: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = alpha * 0.85;
      context.font = `${Math.round(size)}px sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(emoji, 0, 0);
      context.restore();
    };

    // Helper to draw a 4-point sparkle star
    const drawSparkle = (
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
      const current = themeRef.current;

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
          color: current.heartColors[Math.floor(Math.random() * current.heartColors.length)],
        });
      }
    };

    window.addEventListener('click', handleWindowClick);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const current = themeRef.current;

      // Render falling petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          // Refresh color to match active theme
          if (p.petalType === 'petal') {
            p.color = current.petalColors[Math.floor(Math.random() * current.petalColors.length)];
          } else if (p.petalType === 'heart') {
            p.color = current.heartColors[Math.floor(Math.random() * current.heartColors.length)];
          } else {
            p.color = current.sparkleColor;
          }
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.petalType === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.petalType === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity, current.id);
        } else if (p.petalType === 'flower') {
          drawFlowerEmoji(ctx, p.x, p.y, p.size, p.rotation, current.emoji, p.opacity);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, current.sparkleColor, p.opacity);
        }
      });

      // Render click-spawned floating hearts
      for (let i = clickHearts.length - 1; i >= 0; i--) {
        const ch = clickHearts[i];
        ch.x += ch.vx;
        ch.y += ch.vy;
        ch.vy += 0.04;
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
