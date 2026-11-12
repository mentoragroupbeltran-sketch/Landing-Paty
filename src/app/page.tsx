import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Benefits />
        <Services />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
