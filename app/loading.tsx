export default function Loading() {
  return (
    <div
      aria-busy="true"
      className="fixed inset-x-0 top-0 z-[var(--z-toast)] h-px overflow-hidden"
    >
      <div className="h-full w-1/3 animate-[shimmer_1.4s_linear_infinite] bg-gradient-to-r from-transparent via-glow-cyan to-transparent" />
    </div>
  );
}
