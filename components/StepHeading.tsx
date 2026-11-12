export default function StepHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2
        id={id}
        className="font-display text-[13px] font-bold tracking-[0.1em] text-tiffany sm:text-base sm:tracking-[0.14em]"
      >
        {children}
      </h2>
      <span aria-hidden className="mt-3 block h-1 w-16 rounded-full bg-indigo shadow-[0_0_18px_rgb(98_101_255/0.7)]" />
    </div>
  );
}
