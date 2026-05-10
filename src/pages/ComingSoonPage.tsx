type ComingSoonPageProps = {
  title: string;
};

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-card border border-gamify-card-border bg-white/90 px-8 py-16 text-center shadow-card md:py-24">
      <p className="font-sora text-xs font-semibold uppercase tracking-[0.12em] text-gamify-accent">
        Coming soon
      </p>
      <h2 className="mt-3 font-sora text-2xl font-semibold text-gamify-heading md:text-3xl">
        {title}
      </h2>
      <p className="mt-4 max-w-md font-dm text-base leading-[150%] text-gray-600">
        This area is not available yet. We are working on it; check back later.
      </p>
    </section>
  );
}
