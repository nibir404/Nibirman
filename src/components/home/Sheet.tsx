import TornEdge from "@/components/TornEdge";

/**
 * A sheet of paper that slides up over the previous one on a torn edge.
 * The stacking pin is wired once in <SheetStack/>.
 */
export default function Sheet({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`sheet relative -mt-10 md:-mt-12 ${className}`}>
      <TornEdge />
      <div className="relative bg-paper shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.25)]">{children}</div>
    </section>
  );
}
