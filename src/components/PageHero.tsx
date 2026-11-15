import { Reveal } from "./fx";

/** Shared page opening: mono label, giant serif title, optional right-hand object. */
export default function PageHero({ label, title, italic, children, id = "page-title" }: { label: string; title: string; italic?: string; children?: React.ReactNode; id?: string }) {
  return (
    <section aria-labelledby={id} className="grid-lines mx-auto max-w-[1440px] px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-40">
      <p className="label text-muted">+ {label}</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-8">
        <h1 id={id} className="display text-[16vw] leading-[0.86] md:text-[11vw] xl:text-[170px]">
          <Reveal text={title} />
          {italic && (
            <>
              <br />
              <em><Reveal text={italic} delay={0.15} /></em>
            </>
          )}
        </h1>
        {children}
      </div>
    </section>
  );
}
