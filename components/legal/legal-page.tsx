import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { GlassCard } from "@/components/ui/glass-card";
import type { LegalPageContent } from "@/lib/legal/content";
import { getWebPageJsonLd } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";

interface LegalPageProps {
  page: LegalPageContent;
  className?: string;
}

export function LegalPage({ page, className }: LegalPageProps) {
  const formattedDate = new Date(page.lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={getWebPageJsonLd(
          page.key,
          page.title,
          page.description,
          page.path,
        )}
      />
      <section
        className={cn(
          "container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16",
          className,
        )}
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: page.title, href: page.path },
          ]}
          className="mb-8"
        />

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {page.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {formattedDate}
          </p>
        </header>

        <GlassCard className="space-y-10 p-6 sm:p-8">
          {page.sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </GlassCard>
      </section>
    </>
  );
}
