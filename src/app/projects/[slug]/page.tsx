import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

interface ProjectParams {
  slug: string;
}

export function generateStaticParams(): ProjectParams[] {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-tech text-warm-white">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-secondary-gray">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<ProjectParams>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6">
      <p className="font-tech text-signal">
        PROJECT {project.number} — {project.category.toUpperCase()}
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight text-warm-white sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary-gray">
        {project.summary}
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-6 sm:grid-cols-4">
        <div>
          <dt className="font-tech">ROLE</dt>
          <dd className="mt-1 text-sm text-warm-white">{project.role}</dd>
        </div>
        <div>
          <dt className="font-tech">YEAR</dt>
          <dd className="mt-1 text-sm text-warm-white">{project.year}</dd>
        </div>
        <div>
          <dt className="font-tech">STATUS</dt>
          <dd className="mt-1 text-sm capitalize text-warm-white">{project.status}</dd>
        </div>
        <div>
          <dt className="font-tech">VERIFICATION</dt>
          <dd className="mt-1 text-sm text-warm-white">
            {project.verified ? "Verified against live source" : "Pending live verification"}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-6">
        <a href={project.repository} rel="noopener" className="font-tech text-signal hover:underline">
          GITHUB REPOSITORY ↗
        </a>
        {project.demo ? (
          <a href={project.demo} rel="noopener" className="font-tech text-warm-white hover:text-signal">
            LIVE DEMO ↗
          </a>
        ) : null}
        <Link href="/#work" className="font-tech text-warm-white hover:text-signal">
          ← ALL WORK
        </Link>
      </div>

      <Section title="OVERVIEW">
        <p>{project.summary}</p>
      </Section>

      {project.highlights?.length ? (
        <Section title="VERIFIED CAPABILITIES">
          <ul className="list-disc space-y-1.5 pl-4">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-secondary-gray">
            Facts verified against the live repository — not marketing copy.
          </p>
        </Section>
      ) : (
        <Section title="SYSTEM AT A GLANCE">
          <ul className="list-disc space-y-1 pl-4">
            {project.focusLayers.map((layer) => (
              <li key={layer}>{layer}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="STACK">
        <p>{project.stack.join(" · ")}</p>
      </Section>

      <Section title="VERIFICATION">
        {project.verificationNotes ? (
          <p className="border-l-2 border-signal/60 pl-4 text-warm-white">
            {project.verificationNotes}
          </p>
        ) : (
          <p>
            Verification pass pending. Claims shown are limited to what the
            source data supports today (Phase 11 truth rules).
          </p>
        )}
      </Section>

      <Section title="CREATIVE TREATMENT">
        <p>
          Represented through a {project.metaphor.toLowerCase()} — the visual
          language of this portfolio, applied to what the project actually is.
        </p>
      </Section>

      <Section title="EVIDENCE">
        <p>
          The repository above is the primary evidence. Engineering decisions,
          architecture notes, and results are added to this case study only
          when they can be verified in the code or a measured source — never
          as claims.
        </p>
      </Section>

      <Section title="CONTACT">
        <p>
          Questions about how this was built?{" "}
          <a href={`mailto:${site.email}`} className="text-signal hover:underline">
            {site.email}
          </a>
        </p>
      </Section>
    </article>
  );
}
