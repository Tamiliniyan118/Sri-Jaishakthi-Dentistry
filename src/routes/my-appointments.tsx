import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3, Copy, Sparkles, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "sjs_appointments";

type StoredAppointment = {
  reference_number: string;
  patient_name: string;
  treatment: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/my-appointments")({
  head: () => ({
    meta: [
      { title: "My Appointments — SJS Dental Clinic" },
      { name: "description", content: "View and track your appointments at SJS Dental Clinic." },
    ],
  }),
  component: MyAppointmentsPage,
});

function readStoredAppointments(): StoredAppointment[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);
  const [referenceInput, setReferenceInput] = useState("");
  const [trackedAppointment, setTrackedAppointment] = useState<StoredAppointment | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    setAppointments(readStoredAppointments());
  }, []);

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [appointments]);

  const handleCopy = async (reference: string) => {
    if (!reference) return;

    try {
      await navigator.clipboard.writeText(reference);
      toast.success("Reference copied to clipboard");
    } catch {
      toast.error("Unable to copy reference number");
    }
  };

  const handleTrack = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reference = referenceInput.trim();

    if (!reference) {
      toast.error("Please enter a reference number");
      return;
    }

    setIsTracking(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"}/appointments`);
      const data = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error("Unable to load appointment details");
      }

      const match = Array.isArray(data)
        ? data.find((item: Partial<StoredAppointment>) => item.reference_number?.toLowerCase() === reference.toLowerCase())
        : null;

      if (!match) {
        setTrackedAppointment(null);
        toast.error("No appointment found for that reference number");
        return;
      }

      setTrackedAppointment({
        reference_number: match.reference_number ?? "Unavailable",
        patient_name: match.patient_name ?? "Unknown",
        treatment: match.treatment ?? "Unavailable",
        preferred_date: match.preferred_date ?? "Unavailable",
        preferred_time: match.preferred_time ?? "Unavailable",
        status: match.status ?? "Pending Approval",
        created_at: match.created_at ?? new Date().toISOString(),
      });
      toast.success("Appointment status loaded");
    } catch {
      toast.error("Unable to load appointment details");
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl gradient-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display font-bold text-heading">SJS<span className="text-primary">Dental</span></span>
          </Link>
          <Link to="/book" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to booking
          </Link>
        </div>
      </header>

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">My appointments</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-heading sm:text-4xl">
              Keep track of your <span className="text-gradient">booking</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Your recent bookings are saved locally so you can review them anytime.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="space-y-4">
              {sortedAppointments.length === 0 ? (
                <div className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-elevated sm:p-10">
                  <p className="text-lg font-semibold text-heading">No appointments yet</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Book your first visit and your appointment summary will appear here.
                  </p>
                  <Button asChild variant="hero" size="lg" className="mt-6">
                    <Link to="/book">Book appointment</Link>
                  </Button>
                </div>
              ) : (
                sortedAppointments.map((appointment) => (
                  <article key={appointment.reference_number} className="rounded-[1.5rem] border border-border bg-card p-5 shadow-elevated sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                          {appointment.reference_number}
                        </p>
                        <h2 className="mt-2 font-display text-xl font-semibold text-heading">{appointment.treatment}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Booked for {appointment.patient_name}</p>
                      </div>
                      <Button variant="outline-soft" size="sm" onClick={() => handleCopy(appointment.reference_number)}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Reference
                      </Button>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                      <div className="rounded-2xl border border-border/70 bg-background/70 p-3">
                        <div className="flex items-center gap-2 font-medium text-heading">
                          <CalendarDays className="h-4 w-4 text-primary" /> Preferred Date
                        </div>
                        <p className="mt-2">{appointment.preferred_date}</p>
                      </div>
                      <div className="rounded-2xl border border-border/70 bg-background/70 p-3">
                        <div className="flex items-center gap-2 font-medium text-heading">
                          <Clock3 className="h-4 w-4 text-primary" /> Preferred Time
                        </div>
                        <p className="mt-2">{appointment.preferred_time}</p>
                      </div>
                      <div className="rounded-2xl border border-border/70 bg-background/70 p-3">
                        <div className="flex items-center gap-2 font-medium text-heading">
                          <Search className="h-4 w-4 text-primary" /> Current Status
                        </div>
                        <p className="mt-2 font-semibold text-primary">{appointment.status}</p>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>

            <section className="rounded-[2rem] border border-border bg-card p-6 shadow-elevated sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-heading">Track appointment</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter a reference number to fetch the latest status from the backend.
              </p>

              <form onSubmit={handleTrack} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference number</Label>
                  <Input
                    id="reference"
                    value={referenceInput}
                    onChange={(e) => setReferenceInput(e.target.value)}
                    placeholder="SJS-2026-00025"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isTracking}>
                  {isTracking ? "Checking..." : "Track Appointment"}
                </Button>
              </form>

              <div className="mt-6 rounded-2xl border border-border/70 bg-background/70 p-4">
                {trackedAppointment ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Reference Number</p>
                      <p className="font-semibold text-heading">{trackedAppointment.reference_number}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Treatment</p>
                      <p className="font-semibold text-heading">{trackedAppointment.treatment}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current Status</p>
                      <p className="font-semibold text-primary">{trackedAppointment.status}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Track a booking to see the latest status here.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
