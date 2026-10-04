"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SnakeGame } from "./snake-game";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 lg:px-16">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1">
          <div
            className={`transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-primary font-mono text-sm tracking-wider mb-4">
              SOFTWARE ENGINEER
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
              Tarun Vaidhyanathan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
              CS & Economics at Stony Brook — building at the intersection of{" "}
              <span className="text-foreground font-medium">finance</span> and{" "}
              <span className="text-foreground font-medium">technology</span>.
            </p>
          </div>

          <div
            className={`flex flex-wrap gap-4 mb-12 lg:mb-0 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="https://github.com/tarunvaid05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tarun-vaidhyanathan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="mailto:tarunvaid05@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        {/* Headshot */}
        <div
          className={`transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-md" />
            <Image
              src="/headshot.jpg"
              alt="Tarun Vaidhyanathan"
              width={384}
              height={384}
              priority
              className="relative rounded-2xl object-cover w-full h-full border border-border"
            />
          </div>
        </div>
      </div>

      {/* Snake game + Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="hidden lg:block">
          <SnakeGame
            onWin={() => {
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
        <button
          onClick={() => {
            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs tracking-wider">SCROLL</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
