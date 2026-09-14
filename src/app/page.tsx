import Link from "next/link";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { Experience } from "@/components/Experience";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { experience, leadership, skills } from "@/content/experience";
import { site } from "@/content/site";

function ProjectCard({
  number,
  title,
  summary,
  stack,
  role,
  year,
  slug,
  repository,
  demo,
  verified,
}: {
  number: string;
  title: string;
  summary: string;
  stack: string[];
  role: string;
  year: string;
  slug: string;
  repository: string;
  demo?: string;
  verified: boolean;
}) {
  return (
    <article className="group relative border border-white/10 bg-surface/60 p-6 transition-colors duration-300 hover:border-signal/40 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-tech text-signal">{number}</span>
        <span className="font-tech">
          {role} · {year}
          {verified ? " · VERIFIED" : ""}
        </span>
      </div>
      <h3 className="type-project activate-shift mt-4 text-warm-white">
        <Link href={`/${slug}`} className="hover:text-signal">
          {title}
        </Link>
      </h3>
      <div className="signal-line mt-3" aria-hidden="true" />
      <p className="mt-3 text-sm leading-relaxed text-secondary-gray">
        {summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
        {stack.map((tech) => (
          <li key={tech} className="border border-white/10 px-2 py-1 font-tech">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <Link href={`/${slug}`} className="font-tech text-warm-white hover:text-signal">
          CASE STUDY →
        </Link>
        {demo ? (
          <a
            href={demo}
            rel="noopener"
            className="font-tech text-warm-white hover:text-signal"
          >
            LIVE DEMO ↗
          </a>
        ) : null}
        <a
          href={repository}
          rel="noopener"
          className="font-tech text-warm-white hover:text-signal"
        >
          GITHUB ↗
        </a>
      </div>
    </article>
  );
}

function SectionHeading({
  id,
  kicker,
  title,
}: {
  id: string;
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="font-tech text-signal">{kicker}</p>
      <h2
        id={id}
        className="type-chapter mt-3 text-warm-white"
      >
        {title}
      </h2>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <CanvasErrorBoundary>
        <Experience />
      </CanvasErrorBoundary>

      <div className="relative z-10">
        {/* 00 — PROLOGUE / IDENTITY */}
        <section
          aria-labelledby="hero-heading"
          className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-4 pt-14 sm:px-6"
        >
          <p className="font-tech text-signal">BUILD / BREAK / REBUILD</p>
          <h1
            id="hero-heading"
            className="type-hero mt-6 max-w-4xl text-warm-white"
          >
            Everything begins with an idea.
            <span className="block text-secondary-gray">
              Then it becomes a system.
            </span>
          </h1>
          <Reveal>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-secondary-gray sm:text-lg">
              {site.name} — {site.role}. I build scalable web applications with
              React, Node.js, TypeScript, and modern backend architectures — and
              I built Vizquo, the local-first web design system inspector.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="#work"
                className="border border-signal px-5 py-3 font-tech text-signal transition-colors hover:bg-signal hover:text-void"
              >
                VIEW THE WORK
              </Link>
              <Link
                href="#contact"
                className="border border-white/20 px-5 py-3 font-tech text-warm-white transition-colors hover:border-signal hover:text-signal"
              >
                GET IN TOUCH
              </Link>
            </div>
          </Reveal>
        </section>

        {/* 05–10 — WORK */}
        <section
          id="work"
          aria-labelledby="work-heading"
          className="mx-auto max-w-7xl scroll-mt-14 px-4 py-24 sm:px-6"
        >
          <SectionHeading
            id="work-heading"
            kicker="SELECTED WORK — VERIFIED ONLY"
            title="Six systems, built end to end."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                number={project.number}
                title={project.title}
                summary={project.summary}
                stack={project.stack}
                role={project.role}
                year={project.year}
                slug={project.slug}
                repository={project.repository}
                demo={project.demo}
                verified={project.verified}
              />
            ))}
          </div>
        </section>

        {/* 04 — EXPERIENCE */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="mx-auto max-w-7xl scroll-mt-14 px-4 py-24 sm:px-6"
        >
          <SectionHeading
            id="experience-heading"
            kicker="EXPERIENCE — THE PATH SO FAR"
            title="Where the systems were built."
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-tech text-warm-white">EXPERIENCE</h3>
              <ol className="mt-6 space-y-8 border-l border-white/10 pl-6">
                {experience.map((entry) => (
                  <li key={`${entry.org}-${entry.period}`}>
                    <p className="font-tech text-signal">{entry.period}</p>
                    <h4 className="mt-1 text-lg text-warm-white">
                      {entry.title} — {entry.org}
                    </h4>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-secondary-gray">
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="font-tech text-warm-white">LEADERSHIP</h3>
              <ol className="mt-6 space-y-8 border-l border-white/10 pl-6">
                {leadership.map((entry) => (
                  <li key={`${entry.org}-${entry.period}`}>
                    <p className="font-tech text-signal">{entry.period}</p>
                    <h4 className="mt-1 text-lg text-warm-white">
                      {entry.title} — {entry.org}
                    </h4>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-secondary-gray">
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 11 — SYSTEMS */}
        <section
          aria-labelledby="systems-heading"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6"
        >
          <SectionHeading
            id="systems-heading"
            kicker="SYSTEMS — HOW I ENGINEER"
            title="Frontend, backend, data — one discipline."
          />
          <ul className="mt-12 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li
                key={skill}
                className="border border-white/10 bg-surface/60 px-4 py-2 font-tech text-warm-white"
              >
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm text-secondary-gray">
            Secure APIs with JWT-based authentication, relational and document
            data modeling, and accessible, responsive interfaces.
          </p>
        </section>

        {/* 12 — LAB */}
        <section
          id="lab"
          aria-labelledby="lab-heading"
          className="mx-auto max-w-7xl scroll-mt-14 px-4 py-24 sm:px-6"
        >
          <SectionHeading
            id="lab-heading"
            kicker="LAB — EXPERIMENTS"
            title="Nothing staged. Nothing yet."
          />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-secondary-gray">
            Experimental creative-technology work (shaders, WebGPU/TSL, data
            visualization) lands here once it is real and runnable — never as
            placeholders.
          </p>
        </section>

        {/* 13/14 — ABOUT / NOW */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="mx-auto max-w-7xl scroll-mt-14 px-4 py-24 sm:px-6"
        >
          <SectionHeading
            id="about-heading"
            kicker="ABOUT"
            title="Ideas into real products."
          />
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-secondary-gray">
            <p>
              I turn ideas into real products — secure payment systems, social
              platforms, publishing engines, and developer tools.
            </p>
            <p>
              Currently: building and maintaining Vizquo, and serving as
              Secretary of HexClan, the programming club at LIET.
            </p>
          </div>
        </section>

        {/* 15 — FINALE / CONTACT */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="mx-auto flex min-h-[70svh] max-w-7xl scroll-mt-14 flex-col justify-center px-4 py-24 sm:px-6"
        >
          <p className="font-tech text-signal">BUILD / BREAK / REBUILD</p>
          <h2
            id="contact-heading"
            className="type-chapter mt-6 max-w-4xl text-warm-white"
          >
            Then do it again — better.
          </h2>
          <Reveal>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            <a
              href={`mailto:${site.email}`}
              className="border border-signal px-5 py-3 font-tech text-signal transition-colors hover:bg-signal hover:text-void"
            >
              EMAIL ME
            </a>
            <a
              href={site.resume}
              rel="noopener"
              className="border border-white/20 px-5 py-3 font-tech text-warm-white transition-colors hover:border-signal hover:text-signal"
            >
              RESUME ↗
            </a>
            <a
              href={site.linkedin}
              rel="me noopener"
              className="border border-white/20 px-5 py-3 font-tech text-warm-white transition-colors hover:border-signal hover:text-signal"
            >
              LINKEDIN ↗
            </a>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
