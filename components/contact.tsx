"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "tarunvaid05@gmail.com",
    href: "mailto:tarunvaid05@gmail.com",
    icon: Mail,
  },
{
    label: "LinkedIn",
    value: "tarun-vaidhyanathan",
    href: "https://linkedin.com/in/tarun-vaidhyanathan",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "tarunvaid05",
    href: "https://github.com/tarunvaid05",
    icon: Github,
  },
];

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="contact" className="py-16 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-2">
            CONTACT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl">
            Interested in fintech, distributed systems, or just want to chat?
            Feel free to reach out.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactLinks.map((link, index) => (
            <ContactCard key={link.label} link={link} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  link,
  index,
}: {
  link: (typeof contactLinks)[0];
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const Icon = link.icon;

  return (
    <a
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      ref={ref}
      className={cn(
        "group bg-card border border-border rounded-xl p-5 transition-all duration-500 hover:border-primary/50 hover:bg-card/80",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-5 h-5 text-primary" />
        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p className="text-sm text-muted-foreground mb-1">{link.label}</p>
      <p className="font-medium text-sm truncate">{link.value}</p>
    </a>
  );
}
