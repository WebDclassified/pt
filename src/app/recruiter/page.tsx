import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { experience, leadership, skills } from "@/content/experience";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Recruiter View",
  description: `Fast facts about ${site.name}: role, experience, strongest projects, resume, and contact.`,
};

export default function RecruiterView() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6">
      <p className="font-tech text-signal">RECRUITER VIEW — NO CINEMATICS</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight text-warm-white sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-2 text-lg text-secondary-gray">{site.role}</p>

      <section aria-labelledby="r-summary" className="mt-10">
        <h2 id="r-summary" className="font-tech text-warm-white">
          SUMMARY
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-secondary-gray">
          Full-stack developer building scalable web applications with React,
          Node.js, TypeScript, and modern backend architectures. Creator of
          Vizquo, an open-source local-first web design system inspector.
          Interested in secure payment systems, social platforms, and
          AI-powered tools.
        </p>
      </section>

      <section aria-labelledby="r-experience" className="mt-12">
        <h2 id="r-experience" className="font-tech text-warm-white">
          EXPERIENCE &amp; LEADERSHIP
        </h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <ul className="space-y-4">
            {experience.map((entry) => (
              <li key={`${entry.org}-${entry.period}`} className="border border-white/10 bg-surface/60 p-4">
                <p className="font-tech text-signal">{entry.period}</p>
                <p className="mt-1 text-warm-white">
                  {entry.title} — {entry.org}
                </p>
              </li>
            ))}
          </ul>
          <ul className="space-y-4">
            {leadership.map((entry) => (
              <li key={`${entry.org}-${entry.period}`} className="border border-white/10 bg-surface/60 p-4">
                <p className="font-tech text-signal">{entry.period}</p>
                <p className="mt-1 text-warm-white">
                  {entry.title} — {entry.org}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="r-work" className="mt-12">
        <h2 id="r-work" className="font-tech text-warm-white">
          STRONGEST WORK
        </h2>
        <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {projects.map((project) => (
            <li key={project.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
              <span>
                <Link href={`/${project.slug}`} className="text-warm-white hover:text-signal">
                  {project.title}
                </Link>
                <span className="ml-3 text-sm text-secondary-gray">
                  {project.category}
                </span>
              </span>
              <span className="font-tech">
                {project.year} · {project.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="r-skills" className="mt-12">
        <h2 id="r-skills" className="font-tech text-warm-white">
          CORE TECHNOLOGIES
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary-gray">
          {skills.join(" · ")}
        </p>
      </section>

      <section aria-labelledby="r-contact" className="mt-12">
        <h2 id="r-contact" className="font-tech text-warm-white">
          CONTACT
        </h2>
        <div className="mt-4 flex flex-wrap gap-6">
          <a href={`mailto:${site.email}`} className="font-tech text-signal hover:underline">
            {site.email}
          </a>
          <a href={site.resume} rel="noopener" className="font-tech text-warm-white hover:text-signal">
            RESUME (GOOGLE DRIVE) ↗
          </a>
          <a href={site.linkedin} rel="me noopener" className="font-tech text-warm-white hover:text-signal">
            LINKEDIN ↗
          </a>
        </div>
      </section>
    </div>
  );
}
