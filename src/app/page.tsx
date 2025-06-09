import { Navbar } from "@/components/home/navbar";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Features } from "@/components/home/features";
import { Demo } from "@/components/home/demo";
import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";

export default function Home(): React.JSX.Element {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Demo />
      <CTA />
      <Footer />
    </div>
  );
}
