import { Hero } from "app/components/home/Hero";
import { ParallaxBlock } from "app/components/home/ParallaxBlock";
import { Details } from "app/components/home/Details";
import { Timeline } from "app/components/home/Timeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <ParallaxBlock />
      <Details />
      <Timeline />
    </main>
  );
}
