import Hero from "@/components/home/Hero";
import { Approach, Channels, Crafts, Statement } from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Crafts />
      <Channels />
      <Approach />
    </>
  );
}
