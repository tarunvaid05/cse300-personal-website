"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    company: "Amazon",
    role: "Software Development Engineer Intern",
    location: "New York, NY",
    period: "Sep 2025 – Nov 2025",
    logo: "/AMZN.png",
    highlights: [
      "Engineered automated keyword-generation pipeline using AWS Step Functions, S3, Lambda, and Claude 3.7 to map 250,000+ high-intent queries",
      "Architected asynchronous validation pipeline to batch-validate 300K+ generated keywords via rule-based filtering",
      "Built large-scale Scala data pipelines achieving 99.65% revenue coverage from 100M+ search queries",
      "Drove 105% revenue increase by expanding keyword coverage for Shopping Guides",
    ],
    tags: ["AWS", "TypeScript", "Python", "Scala", "Claude 3.7"],
  },
  {
    company: "Piper Sandler",
    role: "Equities Trading Technology Intern",
    location: "Greenwich, CT",
    period: "June 2025 – Aug 2025",
    logo: "/pipersandler.png",
    highlights: [
      "Developed .NET automation scripts with Ivanti for patch management, reducing developer on-call time by 16%",
      "Designed latency-testing algorithm to optimize GigaSpaces in-memory performance for no-touch trading",
      "Enhanced monitoring by integrating Datadog APIs, reducing system latency by 20% and improving metrics accuracy by 12%",
    ],
    tags: [".NET", "Datadog", "PowerShell", "GigaSpaces"],
  },
  {
    company: "Stony Brook University",
    role: "Teaching Assistant - Programming Abstractions",
    location: "Stony Brook, NY",
    period: "Jan 2025 - May 2025",
    logo: "/sbu.png",
    highlights: [
      "Led weekly recitations for 120+ students on functional programming, polymorphism and parallel programming",
      "Conducted office hours and graded assignments/exams, providing feedback that improved student performance",
    ],
    tags: ["OCaml", "Teaching", "Functional Programming"],
  },
];

function useStockLine(isHovered: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pointsRef = useRef<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Generate points once
    const pts: number[] = [];
    const count = 80;
    let val = 0.5;
    for (let i = 0; i < count; i++) {
      val += (Math.random() - 0.48) * 0.06;
      val = Math.max(0.15, Math.min(0.85, val));
      pts.push(val);
    }
    pointsRef.current = pts;
    setReady(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let progress = isHovered ? 0 : 1;
    const speed = 0.03;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const target = isHovered ? 1 : 0;
      progress += (target - progress) * speed * 3;

      if (Math.abs(progress - target) < 0.001) {
        progress = target;
      }

      if (progress <= 0.001) {
        animationRef.current = 0;
        return;
      }

      const pts = pointsRef.current;
      const drawCount = Math.floor(pts.length * progress);
      if (drawCount < 2) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const stepX = width / (pts.length - 1);

      // Draw the line
      ctx.beginPath();
      ctx.moveTo(0, height - pts[0] * height);
      for (let i = 1; i < drawCount; i++) {
        const x = i * stepX;
        const y = height - pts[i] * height;
        const prevX = (i - 1) * stepX;
        const prevY = height - pts[i - 1] * height;
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
      ctx.strokeStyle = `rgba(45, 212, 191, ${0.15 * progress})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Fill area under the line
      const lastX = (drawCount - 1) * stepX;
      ctx.lineTo(lastX, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `rgba(45, 212, 191, ${0.06 * progress})`);
      gradient.addColorStop(1, `rgba(45, 212, 191, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();

      if (progress !== target) {
        animationRef.current = requestAnimationFrame(draw);
      } else {
        animationRef.current = 0;
      }
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, ready]);

  return canvasRef;
}

export function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-2">
            EXPERIENCE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Where I&apos;ve Worked
          </h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useStockLine(isHovered);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-500 hover:border-primary/30 overflow-hidden",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Stock line canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div className="relative w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className="object-contain p-1.5"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{experience.company}</h3>
              </div>
              <p className="text-muted-foreground">{experience.role}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground">{experience.period}</p>
            <p className="text-sm text-muted-foreground">{experience.location}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="text-muted-foreground text-sm flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
