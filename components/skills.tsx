"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      "Python",
      "C/C++",
      "C#",
      "TypeScript",
      "Java",
      "Scala",
      "SQL",
      "JavaScript",
      "Bash",
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "PyTorch",
      "scikit-learn",
      "Spring Boot",
      "FastAPI",
      "ASP.NET Core",
      "SQLAlchemy",
      "React",
      "Next.js",
    ],
  },
  {
    title: "Cloud & Data",
    skills: [
      "AWS",
      "Azure",
      "Spark",
      "Hadoop",
      "Airflow",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "OpenSearch",
      "Docker",
      "Linux",
      "Git",
    ],
  },
  {
    title: "Focus Areas",
    skills: [
      "ML Compilers",
      "Distributed Data Pipelines",
      "LLM Systems & MCP",
      "Algorithmic Trading",
      "Low-Latency Systems",
    ],
  },
];

export function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="py-16 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-2">
            SKILLS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Technical Expertise
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <span
            key={skill}
            className="group relative px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm transition-all duration-300 cursor-default hover:bg-primary/20 hover:text-primary hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/30 transition-colors duration-300" />
            <span className="relative">{skill}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
