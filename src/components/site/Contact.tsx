import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Get in touch</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
            Visit our <span className="text-gradient">clinic</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Address", value: "76/1, KVK complex,Sri Krishna sweets upstairs, Mettur Road, Erode, Tamil Nadu-638001" },
              { icon: Phone, label: "Phone", value: "+91 9841425117, +91 8124186063" },
              { icon: Mail, label: "Email", value: "info@sjsdentalclinic.com" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-3xl bg-card p-5 shadow-soft">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.label}</p>
                  <p className="font-display text-base font-bold text-heading break-words">{c.value}</p>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/40 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <p className="font-display text-base font-bold text-heading">Working Hours</p>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Monday – Saturday</dt><dd className="font-medium text-heading">10:00 AM – 8:15 PM</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Sunday</dt><dd className="font-medium text-heading">9:30 AM – 1:00 PM</dd></div>
              </dl>
            </div>
          </div>

          {/* Map section */}
          {/*
          <div className="relative overflow-hidden rounded-3xl bg-card shadow-elevated min-h-80">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_oklch(0.94_0.06_185),_oklch(0.98_0.02_190))]" />
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 400" aria-hidden>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.51 0.10 185)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" />
              <path d="M0 220 Q100 180 200 220 T400 200" stroke="oklch(0.51 0.10 185)" strokeWidth="3" fill="none" />
              <path d="M180 0 L220 400" stroke="oklch(0.72 0.15 185)" strokeWidth="2" fill="none" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elevated animate-pulse-glow mx-auto">
                <MapPin className="h-8 w-8" />
              </span>
              <p className="mt-3 font-display font-bold text-heading">SJS Dental Clinic</p>
              <p className="text-xs text-muted-foreground">https://maps.app.goo.gl/xKArrmHxg2bXkbnY8</p>
            </div>
          </div>
          */}
          <div className="relative overflow-hidden rounded-3xl shadow-elevated min-h-[500px]">

      <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d232.39167115665617!2d77.7186293!3d11.347829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f370fef36f9%3A0x4035b74d05c64bc6!2sChildren%20Dentistry%2C%20Exclusive%20Dental%20Centre%20for%20infants%2C%20children!5e1!3m2!1sen!2sin!4v1784614080010!5m2!1sen!2sin"
          width="100%"
          height="100%"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
      
          <div className="text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elevated animate-pulse-glow mx-auto">
                  <MapPin className="h-6 w-6" />
              </span>

              <a
                  href="https://maps.app.goo.gl/xKArrmHxg2bXkbnY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto mt-4 inline-block rounded-full bg-white px-5 py-2 font-semibold text-primary shadow-lg hover:scale-105 transition"
              >
                  Get Directions
              </a>
          </div>
      </div>

  </div>
        </div>
      </div>
    </section>
  );
}
