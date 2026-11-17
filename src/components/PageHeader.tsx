import Reveal from './Reveal';

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="px-6 pb-14 pt-36 text-center lg:pb-20 lg:pt-48">
      <Reveal>
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="font-display mx-auto mt-5 max-w-4xl text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div className="mx-auto mt-8 h-px w-14 bg-accent/70" />
        {intro && <p className="mx-auto mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-foreground/65">{intro}</p>}
      </Reveal>
    </section>
  );
}
