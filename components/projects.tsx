"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { ArrowUpRight, TrendingUp, Shield, Plane, Accessibility, CloudSun } from "lucide-react";

const projects: {
  title: string;
  description: string;
  impact: string;
  tech: string[];
  icon: typeof TrendingUp;
  featured: boolean;
  wide?: boolean;
  link?: string;
}[] = [
  // Weather Derivatives Trading System: hidden for now, uncomment to restore.
  // {
  //   title: "Weather Derivatives Trading System",
  //   description:
  //     "Streaming LightGBM probabilistic model that combines live weather observations with NBM forecasts to predict daily-high temperature outcomes. Powers automated trading bots for Polymarket US and Kalshi with an automated order management system. Services are deployed with Docker and backed by a persistent SQLite store.",
  //   impact: "~15% avg daily profit live · 6 annualized Sharpe in backtests",
  //   tech: ["Python", "LightGBM", "WebSockets", "SQLite", "Docker"],
  //   icon: CloudSun,
  //   featured: true,
  //   wide: true,
  // },
  {
    title: "Fourier Fund Analytics Suite",
    description:
      "Portfolio analytics suite for 45+ analysts spanning efficient-frontier optimization, correlation analysis, backtesting, volatility, and asset allocation, with a backtested Markowitz mean-variance optimizer.",
    impact: "Outperformed S&P 500 by 6.65% over 8 months",
    tech: ["Python", "Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    icon: TrendingUp,
    featured: true,
    link: "https://sbuinvestmentclub.vercel.app/",
  },
  {
    title: "CPA Client Portal",
    description:
      "Secure ASP.NET Core client portal for a CPA firm with role-based access, AES-256-GCM encryption, Azure Blob Storage, and document-integrity checks.",
    impact: "Serving 40+ active users",
    tech: ["ASP.NET Core", "C#", "Azure SQL", "Azure Blob Storage"],
    icon: Shield,
    featured: true,
    link: "https://github.com/tarunvaid05/CPAClientPortal",
  },
  {
    title: "Seawolf Accessibility",
    description:
      "Next.js/Python app for accessible campus routing with C-based OpenStreetMap parsing, Dijkstra's algorithm, and indoor mapping. Improved routing with scikit-learn regression and KNN, raising accuracy by 23% and creating alternative routes.",
    impact: "23% routing accuracy improvement",
    tech: ["Next.js", "Python", "C", "scikit-learn", "NumPy", "Google Maps API"],
    icon: Accessibility,
    featured: true,
    link: "https://github.com/tarunvaid05/Seawolf-Accessibility",
  },
  {
    title: "Reactive Collision UAV",
    description:
      "Authored SDF/XML PX4 Gazebo simulations to automate 20+ flight and collision tests. Developed UAV stress-testing tools with OpenCV/MATLAB to measure deformations under 9.8N loads.",
    impact: "Improved load capacity by ~30%",
    tech: ["C++", "PX4", "OpenCV", "MATLAB", "Gazebo"],
    icon: Plane,
    featured: false,
    link: "https://www.stonybrook.edu/commcms/vertically-integrated-projects/teams/_team_page/team_page.php?team=Damage%20resistance%20and%20mitigation%20in%20aerial%20robotics",
  },
];

export function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="projects" className="py-16 px-6 lg:px-16 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-2">
            PROJECTS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What I&apos;ve Built
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const Icon = project.icon;

  return (
    <a
      href={project.link}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noopener noreferrer" : undefined}
      ref={ref}
      className={cn(
        "group relative bg-background border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 block",
        project.wide && "md:col-span-2",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {project.link && (
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>

      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

      <div className="flex items-center gap-2 mb-4 text-primary text-sm font-medium">
        <TrendingUp className="w-4 h-4" />
        {project.impact}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}
