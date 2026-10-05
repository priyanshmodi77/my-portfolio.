import GlassHero from "@/components/glass-hero";
import About from "@/components/about";
import Capabilities from "@/components/capabilities";
import Work from "@/components/work";
import Process from "@/components/process";
import Contact from "@/components/contact";
import ScrollReveal from "@/components/scroll-reveal";
import SocialDock from "@/components/social-dock";

export default function Home() {
  return (
    <main>
      <GlassHero />
      <About />
      <Capabilities />
      <Work />
      <Process />
      <Contact />
      <SocialDock />
      <ScrollReveal />
    </main>
  );
}
