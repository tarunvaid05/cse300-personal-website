"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const COLS = 32;
const ROWS = 4;
const CELL = 14;
const GAP = 2;
const TICK_MS = 120;

type Point = { x: number; y: number };

function randomFood(snake: Point[]): Point {
  let pos: Point;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

export function SnakeGame({ onWin }: { onWin: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }] as Point[],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 10, y: 2 } as Point,
    score: 0,
    gameOver: false,
    won: false,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const WIN_SCORE = 5;

  const width = COLS * (CELL + GAP) - GAP;
  const height = ROWS * (CELL + GAP) - GAP;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;
    ctx.clearRect(0, 0, width, height);

    // Draw grid dots
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const px = x * (CELL + GAP);
        const py = y * (CELL + GAP);
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        ctx.roundRect(px, py, CELL, CELL, 2);
        ctx.fill();
      }
    }

    // Draw food
    const fx = s.food.x * (CELL + GAP);
    const fy = s.food.y * (CELL + GAP);
    ctx.fillStyle = "rgba(45, 212, 191, 0.6)";
    ctx.beginPath();
    ctx.roundRect(fx, fy, CELL, CELL, 2);
    ctx.fill();

    // Draw snake
    s.snake.forEach((seg, i) => {
      const sx = seg.x * (CELL + GAP);
      const sy = seg.y * (CELL + GAP);
      const alpha = i === 0 ? 0.9 : 0.5 - (i / s.snake.length) * 0.25;
      ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`;
      ctx.beginPath();
      ctx.roundRect(sx, sy, CELL, CELL, 3);
      ctx.fill();
    });
  }, [width, height]);

  const reset = useCallback(() => {
    stateRef.current = {
      snake: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 10, y: 2 },
      score: 0,
      gameOver: false,
      won: false,
    };
    setScore(0);
    setGameOver(false);
    setWon(false);
    setPaused(false);
    setStarted(true);
    draw();
  }, [draw]);

  // Game loop
  useEffect(() => {
    if (!started || gameOver || won || paused) return;

    const interval = setInterval(() => {
      const s = stateRef.current;
      s.dir = s.nextDir;

      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      // Wall wrap
      if (head.x >= COLS) head.x = 0;
      if (head.x < 0) head.x = COLS - 1;
      if (head.y >= ROWS) head.y = 0;
      if (head.y < 0) head.y = ROWS - 1;

      // Self collision
      if (s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        s.gameOver = true;
        setGameOver(true);
        draw();
        return;
      }

      s.snake.unshift(head);

      // Eat food
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score++;
        setScore(s.score);
        if (s.score >= WIN_SCORE) {
          s.won = true;
          setWon(true);
          draw();
          setTimeout(onWin, 600);
          return;
        }
        s.food = randomFood(s.snake);
      } else {
        s.snake.pop();
      }

      draw();
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [started, gameOver, won, paused, draw, onWin]);

  // Key handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isWASD = key === "w" || key === "a" || key === "s" || key === "d";

      // Space to pause/unpause
      if (e.key === " " && started && !gameOver && !won) {
        e.preventDefault();
        setPaused((p) => !p);
        return;
      }

      // Start game
      if (!started && isWASD) {
        setStarted(true);
        return;
      }

      // Retry after game over or play again after win
      if ((gameOver || won) && isWASD) {
        reset();
        return;
      }

      // Unpause on movement
      if (paused && isWASD) {
        setPaused(false);
      }

      const s = stateRef.current;
      switch (key) {
        case "w":
          if (s.dir.y !== 1) s.nextDir = { x: 0, y: -1 };
          break;
        case "s":
          if (s.dir.y !== -1) s.nextDir = { x: 0, y: 1 };
          break;
        case "a":
          if (s.dir.x !== 1) s.nextDir = { x: -1, y: 0 };
          break;
        case "d":
          if (s.dir.x !== -1) s.nextDir = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [started, gameOver, won, paused, reset]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="rounded-lg"
        />
        {!started && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted-foreground font-mono animate-pulse">
              wasd to play &middot; space to pause
            </span>
          </div>
        )}
        {paused && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg">
            <span className="text-xs text-muted-foreground font-mono">
              paused &middot; space to resume
            </span>
          </div>
        )}
        {gameOver && !won && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg">
            <span className="text-xs text-muted-foreground font-mono">
              press wasd to retry
            </span>
          </div>
        )}
        {won && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg">
            <span className="text-xs text-primary font-mono font-medium">
              nice! wasd to play again
            </span>
          </div>
        )}
      </div>
      {started && (
        <span className="text-xs text-muted-foreground font-mono">
          {score}/{WIN_SCORE}
        </span>
      )}
    </div>
  );
}
