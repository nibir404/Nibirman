import Experience from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Experience />
      {/* Crawlers and no-JS readers get the plain list */}
      <noscript>
        <a href="/list">Read all chapters as a plain list</a>
      </noscript>
    </>
  );
}
