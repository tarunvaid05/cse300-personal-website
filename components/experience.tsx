"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    company: "Amazon",
    location: "New York, NY",
    logo: "/AMZN.png",
    roles: [
      {
        title: "Software Development Engineer Intern – Percolate",
        period: "Jun 2026 – Aug 2026",
        highlights: [
          "Built reusable Airflow/EMR/Spark pipelines populating a separate Glue/Athena analytics layer, enabling observability and conversational analytics while reducing projected storage costs by $35.6K/month",
          "Automated dataset onboarding with AWS CDK, reducing provisioning to schema/config/DAG changes",
          "Developed a Spring Boot MCP server with 17 Scala-based tools automating end-to-end regression testing for Spark/Hadoop changes on jobs processing 100s of TB/day, projected to save $36K/year in developer time",
        ],
      },
      {
        title: "Software Development Engineer Intern – Shopping Guides",
        period: "Sep 2025 – Nov 2025",
        highlights: [
          "Built LLM keyword-generation and validation pipelines with Step Functions, S3, Lambda, Claude 3.7 on Bedrock, and GPT-OSS for 300K+ Shopping Guide keywords from high-intent queries",
          "Built large-scale Scala pipelines over 100M+ search queries, measuring 99.65% revenue coverage and supporting changes that drove a 105% revenue increase",
        ],
      },
    ],
    tags: ["AWS", "Spark", "Airflow", "Scala", "Spring Boot", "MCP", "Bedrock"],
  },
  {
    company: "COMPAS Lab, Stony Brook University",
    location: "Stony Brook, NY",
    logo: "/compas.png",
    logoWide: true,
    link: "https://compas.cs.stonybrook.edu/",
    roles: [
      {
        title: "Undergraduate Researcher",
        period: "May 2026 – Present",
        highlights: [
          "Building a model-agnostic second-gen MLISA compiler that captures PyTorch graphs and lowers them through a multipass graph-to-C pipeline into hardware-optimized executables while preserving loop/function hierarchy",
          "Porting the optimized first-gen MLISA operator/runtime stack, whose measured GPU inference matched TorchInductor across four NVIDIA GPUs, into the new compiler",
        ],
      },
    ],
    tags: ["PyTorch", "C", "ML Compilers", "GPU Inference"],
  },
  {
    company: "Piper Sandler",
    location: "Greenwich, CT",
    logo: "/pipersandler.png",
    roles: [
      {
        title: "Equities Trading Technology Intern",
        period: "Jun 2025 – Aug 2025",
        highlights: [
          "Designed latency-testing infrastructure for GigaSpaces in-memory data grids, benchmarking no-touch equities workflows and reducing on-call investigation time by ~20%",
          "Integrated Datadog APIs and migrated legacy Perl scripts to PowerShell, reducing system latency by 20% and improving metrics accuracy by 12%",
        ],
      },
    ],
    tags: [".NET", "Datadog", "PowerShell", "GigaSpaces"],
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
    <section id="experience" className="py-16 px-6 lg:px-16">
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
  experience: {
    company: string;
    location: string;
    logo: string;
    logoWide?: boolean;
    link?: string;
    roles: { title: string; period: string; highlights: string[] }[];
    tags: string[];
  };
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
        <div className="flex items-start gap-4 mb-4">
          <div
            className={cn(
              "relative h-10 rounded-lg bg-white/90 flex items-center justify-center overflow-hidden shrink-0",
              experience.logoWide ? "w-24" : "w-10"
            )}
          >
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={experience.logoWide ? 96 : 40}
              height={40}
              className="object-contain p-1.5 w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-1">
            {experience.link ? (
              <a
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1 text-xl font-bold hover:text-primary transition-colors"
              >
                {experience.company}
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-colors" />
              </a>
            ) : (
              <h3 className="text-xl font-bold">{experience.company}</h3>
            )}
            <p className="text-sm text-muted-foreground md:text-right">{experience.location}</p>
          </div>
        </div>

        <div className="space-y-5 mb-6">
          {experience.roles.map((role) => (
            <div key={role.title}>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                <p className="text-foreground font-medium">{role.title}</p>
                <p className="text-sm text-foreground shrink-0">{role.period}</p>
              </div>
              <ul className="space-y-2">
                {role.highlights.map((highlight, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
