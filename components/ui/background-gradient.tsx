export function BackgroundGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-[40%] left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-500/20 via-fuchsia-500/10 to-transparent blur-3xl dark:from-violet-500/15 dark:via-fuchsia-500/8" />
      <div className="absolute top-[20%] -right-[10%] h-[50%] w-[40%] rounded-full bg-gradient-to-bl from-blue-500/15 to-transparent blur-3xl dark:from-blue-500/10" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-gradient-to-tr from-rose-500/10 to-transparent blur-3xl dark:from-rose-500/8" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_70%)]" />
    </div>
  );
}
