import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Newsletter() {
  const socials = [
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
    { icon: Twitter, label: "X", href: "https://x.com/" },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-primary p-10 shadow-elevated sm:p-14">
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <h3
              className="font-display text-3xl font-bold text-white sm:text-4xl"
              style={{ color: "white" }}
            >
              Connect With Us
            </h3>

            <p className="mt-3 max-w-2xl text-white/90">
              Follow our social media pages for oral health tips, clinic updates,
              and the latest announcements.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white transition-all duration-300 hover:scale-110 hover:bg-white/30"
                >
                  <s.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}