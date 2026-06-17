/**
 * Global ambient backdrop for the landing page: a soft, slowly drifting color
 * mesh on a bright canvas. No particles, no animated grid — calm and premium.
 * Fixed behind all content.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base canvas */}
      <div className="absolute inset-0 bg-background" />

      {/* soft mesh blobs — gentle drift, barely-there color */}
      <div className="absolute -top-[20%] left-1/2 h-[55vh] w-[80vw] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px] animate-mesh-drift" />
      <div
        className="absolute top-[10%] -left-[15%] h-[45vh] w-[45vw] rounded-full bg-accent-blue/10 blur-[160px] animate-mesh-drift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[45vh] w-[45vw] rounded-full bg-accent-soft/10 blur-[160px] animate-mesh-drift"
        style={{ animationDelay: "-12s" }}
      />

      {/* whisper-thin grid that fades into the page */}
      <div className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
    </div>
  );
}
