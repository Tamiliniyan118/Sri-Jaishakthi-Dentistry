import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl gradient-primary shadow-soft">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold text-heading sm:text-xl">
            SJS<span className="text-primary">Dental</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <Link to="/my-appointments" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
            My Appointments
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="hero" size="lg">
            <Link to="/book">Book Appointment</Link>
          </Button>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/60 text-heading lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile slide-in */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-card shadow-elevated transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="font-display font-bold text-heading">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-lg hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-heading hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 px-4 space-y-2">
          <Button asChild variant="hero" size="lg" className="w-full">
            <Link to="/book" onClick={() => setOpen(false)}>Book Appointment</Link>
          </Button>
          <Button asChild variant="outline-soft" size="lg" className="w-full">
            <Link to="/my-appointments" onClick={() => setOpen(false)}>My Appointments</Link>
          </Button>
        </div>
      </div>

      {open && (
        <button
          aria-label="Close overlay"
          className="fixed inset-0 z-[-1] bg-heading/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
