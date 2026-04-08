"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { ArrowUpRight, TrendingUp, Shield, Plane, Accessibility } from "lucide-react";

const projects = [
  {
    title: "Fourier Fund Portfolio Optimizer",
    description:
      "Account-based tool suite for 45+ analysts providing efficient frontier, correlation matrix, backtesting, volatility, and interactive visualizations for informed stock picks.",
    impact: "Outperformed S&P 500 by 6.65% over 8 months",
    tech: ["Python", "Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    icon: TrendingUp,
    featured: true,
    link: "https://sbuinvestmentclub.vercel.app/",
  },
  {
    title: "CPA Client Portal",
    description:
      "Secure, full-stack client portal for a CPA firm serving 40+ clients with role and invite-based access. Implements AES-256-GCM encryption with integrity verification for 800+ documents.",
    impact: "Serving 40+ active clients",
    tech: ["ASP.NET Core MVC", "C#", "Azure SQL", "Azure Blob Storage"],
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
    <section id="projects" className="py-24 px-6 lg:px-16 bg-card/50">
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
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={cn(
        "group relative bg-background border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 block",
        project.featured && "md:col-span-1",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
