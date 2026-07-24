import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Cpu, HeartHandshake, Sofa, Zap } from "lucide-react";

const promos = [
  { icon: Cpu, title: "Advanced Dental Equipment", desc: "State-of-the-art tools for precise, comfortable treatment.", tint: "from-teal-500 to-cyan-500" },
  { icon: Sofa, title: "Comfortable Experience", desc: "Spa-inspired treatment rooms designed to relax you.", tint: "from-emerald-500 to-teal-500" },
  { icon: HeartHandshake, title: "Personalized Care", desc: "Every treatment plan is tailored to your unique smile.", tint: "from-cyan-500 to-sky-500" },
  { icon: Zap, title: "Modern Technology", desc: "3D imaging, laser dentistry and digital impressions.", tint: "from-teal-600 to-emerald-500" },
];

export function PromoCarousel() {
  return (
    <section className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">The Magical difference</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
            A clinic built <span className="text-gradient">around you</span>
          </h2>
        </div>

        <Carousel opts={{ loop: true, align: "start" }} className="mt-12">
          <CarouselContent>
            {promos.map((p) => (
              <CarouselItem key={p.title} className="md:basis-1/2 lg:basis-1/3">
                <div className={`relative h-72 overflow-hidden rounded-3xl bg-gradient-to-br ${p.tint} p-8 text-white shadow-elevated`}>
                  <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                    <p.icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-8 font-display text-2xl font-bold" style={{ color: "white" }}>{p.title}</h3>
                  <p className="relative mt-2 text-sm text-white/90">{p.desc}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
