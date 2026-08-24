import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Treatments } from "@/components/site/Treatments";
import { Parallax } from "@/components/site/Parallax";
import { Gallery } from "@/components/site/Gallery";
import { PromoCarousel } from "@/components/site/PromoCarousel";
import { BlogPreview } from "@/components/site/BlogPreview";
import { Contact } from "@/components/site/Contact";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Treatments />
        <Parallax />
        <Gallery />
        <PromoCarousel />
        <BlogPreview />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
