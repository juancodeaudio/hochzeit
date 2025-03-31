import { Hero } from "app/components/home/Hero";
import { ParallaxBlock } from "app/components/home/ParallaxBlock";
import { Details } from "app/components/home/Details";

export default function Home() {
  return (
    <main>
      <Hero />
      <ParallaxBlock />
      <Details />
    </main>
  );
}
