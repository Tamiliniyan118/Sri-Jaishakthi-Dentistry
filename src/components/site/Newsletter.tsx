import { useState } from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("You're on the list!", { description: "Watch your inbox for smile tips." });
    setEmail("");
  };

  const socials = [
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@hxdes11?si=kl2hkF-r2llE2z_E" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/hxdes11/" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61578090601349" },
    { icon: Twitter, label: "X", href: "https://x.com/hxdes_11" },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-primary p-8 shadow-elevated sm:p-14">
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold text-white sm:text-4xl" style={{ color: "white" }}>
                Smile smarter, monthly.
              </h3>
              <p className="mt-3 text-white/90">
                Get dental tips, exclusive offers and the latest from our clinic — straight to your inbox.
              </p>
              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30 hover:scale-110"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-full border-0 bg-white pl-12 text-base shadow-soft"
                />
              </div>
              <Button type="submit" size="xl" variant="secondary-solid" className="rounded-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
