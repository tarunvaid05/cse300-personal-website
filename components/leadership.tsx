"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const leadership = [
  {
    organization: "Website Development Club",
    role: "President",
    period: "Jan 2024 – Present",
    description:
      "Scaled membership from 60 to 140+ via hackathons and industry-speaker professional development events. Led biweekly workshops on LLM wrappers, ML visualization, and webapp development.",
    logo: "/webdev.png",
    link: "https://www.instagram.com/sbuwebdev/",
  },
  {
    organization: "Fourier Fund",
    role: "Financial Data Scientist",
    period: "Aug 2024 – Present",
    description:
      "Stony Brook Student Led Investment Fund. Developed the Portfolio Optimizer and participated in stock voting and market recaps. Presented the Optimizer's usage, projected asset allocation, and analyst tool suite to 40+ fund members.",
    logo: "/fourierfund.jpeg",
    link: "https://www.linkedin.com/company/fourier-fund-of-stony-brook-university/posts/?feedView=all",
  },
];

export function Leadership() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="leadership" className="py-24 px-6 lg:px-16 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-2">
            LEADERSHIP
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Beyond the Code
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {leadership.map((item, index) => (
            <LeadershipCard key={item.organization} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({
  item,
  index,
}: {
  item: (typeof leadership)[0];
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={cn(
        "group block bg-background border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/30",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="relative w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src={item.logo}
              alt={`${item.organization} logo`}
              width={40}
              height={40}
              className="object-cover scale-125"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{item.organization}</h3>
            <p className="text-muted-foreground text-sm">{item.role}</p>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>
      <p className="text-sm text-muted-foreground mb-2">{item.period}</p>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </a>
  );
}
