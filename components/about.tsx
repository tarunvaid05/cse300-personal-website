"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { GraduationCap, MapPin, BookOpen, Utensils, Dumbbell, Shirt } from "lucide-react";

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="py-16 px-6 lg:px-16 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-primary font-mono text-sm tracking-wider mb-2">
            ABOUT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">A Bit About Me</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div
            className={cn(
              "lg:col-span-3 transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I&apos;m currently a senior at{" "}
              <span className="text-foreground font-medium">
                Stony Brook University
              </span>
              , majoring in{" "}
              <span className="text-foreground font-medium">
                Computer Science
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">Economics</span>.
              I want to learn and experience as much as I can, both in{" "}
              <span className="text-foreground font-medium">tech</span> and
              in the{" "}
              <span className="text-foreground font-medium">financial world</span>.
              Those two fields feed off each other in ways that keep me
              genuinely excited to show up every day.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              What I enjoy most is building{" "}
              <span className="text-foreground font-medium">large systems</span>.
              My strength has always been in the logic of constructing them,
              understanding how pieces fit together and being able to
              implement what feels intuitive. I love working with{" "}
              <span className="text-foreground font-medium">cutting-edge technology</span>,
              whether that&apos;s building an{" "}
              <span className="text-foreground font-medium">ML compiler</span>{" "}
              that lowers PyTorch models into hardware-optimized executables
              at the COMPAS Lab,{" "}
              <span className="text-foreground font-medium">
                LLM-powered and large-scale data pipelines
              </span>{" "}
              at Amazon, or optimizing{" "}
              <span className="text-foreground font-medium">no-touch trading</span>{" "}
              on in-memory frameworks at Piper Sandler.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I&apos;m not building, I&apos;m usually cooking
              and eating, working out, or hanging out with my friends!
            </p>
          </div>

          <div
            className={cn(
              "lg:col-span-2 space-y-4 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="bg-background border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Stony Brook University</p>
                  <p className="text-sm text-muted-foreground">
                    B.S. Computer Science (Honors)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    B.A. Economics
                  </p>
                  <p className="text-sm text-primary">Expected May 2027</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">New York Area</p>
                  <p className="text-sm text-muted-foreground">
                    NYC preferred · Open to relocation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Relevant Coursework</p>
                  <p className="text-sm text-muted-foreground">
                    Operating Systems, Cloud Computing, Networks, Machine
                    Learning, Data Science
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <p className="font-medium mb-3">Hobbies</p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm text-secondary-foreground">
                  <Utensils className="w-3.5 h-3.5 text-primary" />
                  Cooking
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm text-secondary-foreground">
                  <Dumbbell className="w-3.5 h-3.5 text-primary" />
                  Gym
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm text-secondary-foreground">
                  <Shirt className="w-3.5 h-3.5 text-primary" />
                  Fashion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
