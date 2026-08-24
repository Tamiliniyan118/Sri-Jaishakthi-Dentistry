import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { API_BASE_URL } from "@/lib/api-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — SJS Dental Clinic" },
      { name: "description", content: "Request a dental appointment at SJS Dental Clinic. We'll confirm your booking via WhatsApp." },
    ],
  }),
  component: BookPage,
});

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

const treatments = [
  "Teeth Cleaning", "Root Canal Treatment", "Tooth Extraction",
  "Dental Implants", "Teeth Whitening", "Braces & Aligners",
  "Pediatric Dentistry", "General Consultation",
];
const times = ["09:30 AM","10:30 AM","11:30 AM","02:00 PM","03:30 PM","05:00 PM","06:30 PM"];

function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [treatment, setTreatment] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("Unavailable");
  const [appointmentStatus, setAppointmentStatus] = useState("Pending Approval");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const mobile = String(fd.get("mobile") || ""|| "+").trim();
    const age = Number(fd.get("age") || 0);
    const notes = String(fd.get("notes") || "").trim();

    if (!name || !mobile || !treatment || !date || !time || !age) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: name,
          mobile,
          age,
          treatment,
          preferred_date: date.toISOString().split("T")[0],
          preferred_time: time,
          notes: notes || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const detail = data?.detail;
        const message = typeof detail === "string"
          ? detail
          : detail?.map?.((item: { msg?: string }) => item.msg).join(", ") || "Unable to create appointment.";
        throw new Error(message);
      }

      const nextReferenceNumber = typeof data?.reference_number === "string" && data.reference_number.trim()
        ? data.reference_number
        : "Unavailable";
      const nextAppointmentStatus = typeof data?.status === "string" && data.status.trim()
        ? data.status
        : "Pending Approval";

      const appointmentSummary: StoredAppointment = {
        reference_number: nextReferenceNumber,
        patient_name: name,
        treatment,
        preferred_date: date.toISOString().split("T")[0],
        preferred_time: time,
        status: nextAppointmentStatus,
        created_at: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        const existing = window.localStorage.getItem(STORAGE_KEY);
        const parsed = existing ? JSON.parse(existing) : [];
        const list = Array.isArray(parsed) ? parsed : [];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([appointmentSummary, ...list]));
      }

      setReferenceNumber(nextReferenceNumber);
      setAppointmentStatus(nextAppointmentStatus);
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen referenceNumber={referenceNumber} status={appointmentStatus} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header strip */}
      <header className="border-b bg-card/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl gradient-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display font-bold text-heading">SJS<span className="text-primary">Dental</span></span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </header>

      <main className="relative py-12 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_oklch(0.94_0.06_185)_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Book online</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
              Request your <span className="text-gradient">appointment</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Share a few details and our team will confirm your visit on WhatsApp within the hour.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-10 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-elevated sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Patient name" required>
                <Input name="name" required placeholder="Your Name" className="h-12 rounded-xl" />
              </Field>
              <Field label="Mobile number" required>
                <Input name="mobile" required type="tel" placeholder="Your Number" className="h-12 rounded-xl" />
              </Field>
              <Field label="Age" required>
                <Input name="age" required type="number" min={1} max={120} placeholder="Your Age" className="h-12 rounded-xl" />
              </Field>
              <Field label="Treatment type" required>
                <Select value={treatment} onValueChange={setTreatment}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select a treatment" /></SelectTrigger>
                  <SelectContent>
                    {treatments.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Preferred date" required>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn("h-12 w-full justify-start rounded-xl text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <p className="mt-1 text-xs text-muted-foreground"></p>
              </Field>

              <Field label="Preferred time" required>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <Clock className="h-4 w-4" />
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {times.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="Additional notes">
              <Textarea name="notes" rows={4} placeholder="Anything we should know before your visit?" className="rounded-xl" />
            </Field>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request Appointment"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Status will be <span className="font-semibold text-primary">Pending Approval</span> until our team confirms.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-heading">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function SuccessScreen({ referenceNumber, status }: { referenceNumber: string; status: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 py-16">
      <div className="w-full max-w-lg rounded-[2rem] border border-border bg-card p-8 text-center shadow-elevated sm:p-12">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-primary shadow-elevated animate-pulse-glow">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold text-heading sm:text-4xl">Request received!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for booking with SJS Dental. Your appointment status is{" "}
          <span className="font-semibold text-primary">{status}</span>. Our team will confirm your visit shortly via{" "}
          <span className="font-semibold text-heading">WhatsApp</span>.
          You can also check your appointment status anytime in the <Link to="/my-appointments" className="font-semibold text-primary hover:underline">My Appointments</Link> section.
        </p>
        <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-4 text-left sm:p-5">
          <div className="grid gap-3 sm:grid-cols-[max-content_1fr] sm:gap-x-6">
            <p className="text-sm font-medium text-muted-foreground">Reference Number</p>
            <p className="font-semibold text-heading">{referenceNumber}</p>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="font-semibold text-primary">{status}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline-soft" size="lg">
            <a href="https://wa.me/9841425117" target="_blank" rel="noopener noreferrer">Open WhatsApp</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
