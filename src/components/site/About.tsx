import { Award, Clock, HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import doctorImg from "@/assets/doctor.jpeg";

const reasons = [
  { icon: ShieldCheck, title: "Sterile & Safe", desc: "Hospital-grade sterilization on every tool, every time." },
  { icon: Sparkles, title: "Modern Technology", desc: "Digital X-rays, intra-oral scans and painless techniques." },
  { icon: HeartHandshake, title: "Gentle Care", desc: "A calm, judgment-free experience for anxious patients." },
  { icon: Users, title: "Family Friendly", desc: "From toddlers to grandparents — one trusted clinic." },
  { icon: Award, title: "Award-winning Team", desc: "Certified specialists with international training." },
  { icon: Clock, title: "On-time Always", desc: "We respect your schedule with punctual appointments." },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-elevated">
              <div className="absolute inset-0 gradient-primary opacity-10" />
              <img
                src={doctorImg}
                alt="Dr. K.U. Nallasivam — Lead Dentist"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-card p-5 shadow-elevated sm:-right-6">
              <p className="font-display text-3xl font-bold text-primary">19+</p>
              <p className="text-xs text-muted-foreground">Years of experience</p>
            </div>
            <div className="absolute -top-6 -left-2 rounded-2xl bg-card p-4 shadow-elevated sm:-left-6">
              <p className="font-display text-sm font-bold text-heading">B.D.S., M.D.S.,</p>
              <p className="text-xs text-muted-foreground">Pediatric & Preventive Dentist</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">About the clinic</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
              Meet <span className="text-gradient">Dr. K.U. Nallasivam</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              With over a decade of experience in cosmetic and restorative dentistry, Dr. Nallasivam
              leads SJS Dental Clinic with a philosophy rooted in comfort, precision and lasting results.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/90 sm:text-base">
              <li><strong className="text-heading">Qualifications:</strong> B.D.S., M.D.S.,</li>
              <li><strong className="text-heading">Experience:</strong> 19+ years, 2,000+ patients treated</li>
              <li><strong className="text-heading">Specializations:</strong> Pediatric & Preventive Dentist</li>
            </ul>
          </div>
        </div>

        {/* Why choose us */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="font-display text-3xl font-bold text-heading sm:text-4xl">Why choose us</h3>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Everything you'd expect from a premium clinic — and a few things you wouldn't.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-accent/40 text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                  <r.icon className="h-6 w-6" />
                </span>
                <h4 className="font-display text-lg font-bold text-heading">{r.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
