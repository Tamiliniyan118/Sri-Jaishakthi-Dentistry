import { Link } from "@tanstack/react-router";
import { ArrowRight, PhoneCall, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import toothFloat from "@/assets/tooth-float.png";
import clinicHero from "@/assets/clinic-hero.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_oklch(0.94_0.06_185)_0%,_var(--color-background)_60%)]" />

      {/* Floating decorative tooth images */}
      <img
        src={toothFloat}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-24 left-[6%] w-16 opacity-70 animate-float-slow sm:w-24"
      />
      <img
        src={toothFloat}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-24 right-[8%] w-20 opacity-60 animate-float-med sm:w-28"
      />
      <img
        src={toothFloat}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-[20%] hidden w-12 opacity-50 animate-float-slow md:block"
      />
      <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 px-4 py-1.5 text-xs font-semibold text-primary shadow-soft backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-primary" /> Trusted by 2,000+ smiles
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl lg:text-7xl">
            Where every smile finds{" "}
            <span className="text-gradient">its shine</span>
          </h1>
          <p className="mt-4 font-display text-lg italic text-primary sm:text-xl">
            "A smile is the prettiest thing you can wear."
          </p>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0 mx-auto">
            At SJS Dental Clinic, we blend modern technology with gentle, personalized
            care — so every visit feels calm, welcoming, and truly premium.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
            <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
              <Link to="/book">
                Book Appointment <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline-soft" size="xl" className="w-full sm:w-auto">
              <a href="#contact">
                <PhoneCall className="mr-1 h-4 w-4" /> Contact Us
              </a>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 text-center lg:text-left">
            {[
              ["19+", "Years"],
              ["2k+", "Patients"],
              ["4.9★", "Rated"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-bold text-heading sm:text-3xl">{n}</dt>
                <dd className="text-xs text-muted-foreground sm:text-sm">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero visual */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <div className="absolute inset-0 rounded-[3rem] gradient-primary shadow-elevated" />
            <div className="absolute inset-3 rounded-[2.5rem] bg-card shadow-soft overflow-hidden">
              <img
                src={clinicHero}
                alt="Modern dental clinic"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -left-6 top-10 rounded-2xl bg-card p-4 shadow-elevated animate-float-med">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full gradient-primary">
                  <Star className="h-5 w-5 text-primary-foreground fill-current" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-heading">4.9 / 5</p>
                  <p className="text-xs text-muted-foreground">300+ reviews</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-8 rounded-2xl bg-card p-4 shadow-elevated animate-float-slow">
              <p className="text-xs text-muted-foreground">Next available</p>
              <p className="font-display font-bold text-heading">Today · 3:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
