import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-heading text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl gradient-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-bold text-white">SJS Dental Clinic</span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Premium, gentle dental care for the whole family — because every smile deserves the very best.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">Quick links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {["Home","About","Treatments","Blog","Contact"].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-accent">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">Treatments</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {["Teeth Cleaning","Root Canal","Dental Implants","Teeth Whitening","Braces"].map(l => (
                <li key={l}><a href="#treatments" className="hover:text-accent">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>76/1, KVK complex,Sri Krishna sweets upstairs, Mettur Road, Erode, Tamil Nadu-638001</li>
              <li>+91 9841425117</li>
              <li>+91 8124186063</li>
              <li>srijaishakthi@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} SJS Dental Clinic. All rights reserved.</p>
          <a href="#" className="text-xs text-white/60 hover:text-accent">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
