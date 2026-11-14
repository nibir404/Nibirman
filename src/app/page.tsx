import Preloader from "@/components/Preloader";
import Hero from "@/components/home/Hero";
import ChapterIndex from "@/components/home/ChapterIndex";
import Journey from "@/components/home/Journey";
import Capabilities from "@/components/home/Capabilities";
import Works from "@/components/home/Works";
import Commission from "@/components/home/Commission";
import SheetStack from "@/components/home/SheetStack";

export default function Home() {
  return (
    <>
      <Preloader />
      <ChapterIndex />
      <main>
        <Hero />
        <Journey />
        <Capabilities />
        <Works />
        <Commission />
      </main>
      <SheetStack />
    </>
  );
}
