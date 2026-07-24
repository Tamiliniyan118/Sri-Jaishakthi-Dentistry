import cleaning from "@/assets/treatments/cleaning.jpg";
import rootCanal from "@/assets/treatments/root-canal.jpg";
import extraction from "@/assets/treatments/extraction.jpg";
import implants from "@/assets/treatments/implants.webp";
import whitening from "@/assets/treatments/whitening.jpg";
import braces from "@/assets/treatments/braces.jpg";
import pediatric from "@/assets/treatments/pediatric.jpg";

const treatments = [
  { image: cleaning, title: "Teeth Cleaning", desc: "Professional scaling & polishing for a fresh, healthy smile."},
  { image: rootCanal, title: "Root Canal Treatment", desc: "Pain-free endodontics that saves your natural tooth."},
  { image: extraction, title: "Tooth Extraction", desc: "Safe, gentle removal with minimal discomfort." },
  { image: implants, title: "Dental Implants", desc: "Permanent tooth replacement that looks and feels real." },
  { image: whitening, title: "Teeth Whitening", desc: "Brighten your smile up to 8 shades in a single visit." },
  { image: braces, title: "Braces & Aligners", desc: "Modern orthodontics — traditional and clear options." },
  { image: pediatric, title: "Pediatric Dentistry", desc: "A calm, playful space for our youngest patients." },
];

export function Treatments() {
  return (
    <section id="treatments" className="relative py-20 sm:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our treatments</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
            Complete care for <span className="text-gradient">every smile</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From routine cleanings to full smile makeovers — we do it all under one roof.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => (
            <article
              key={t.title}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
 <div className="relative h-52 overflow-hidden">

    <img
        src={t.image}
        alt={t.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

</div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-heading">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-4 h-1 w-10 rounded-full gradient-primary transition-all group-hover:w-20" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
