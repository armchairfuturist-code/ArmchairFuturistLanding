"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/components/ui/blur-fade";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useLeadCapture } from "@/lib/hooks/useLeadCapture";
import { isValidEmail } from "@/lib/email-utils";
import { WHATSAPP_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
type ConnectFields = {
  name: string;
  email: string;
  message: string;
};

function validateConnect(
  data: ConnectFields,
): Partial<Record<keyof ConnectFields, string>> | null {
  const errs: Partial<Record<keyof ConnectFields, string>> = {};
  if (!data.name.trim()) errs.name = "Please enter your name.";
  if (!data.email.trim()) errs.email = "Please enter your email.";
  else if (!isValidEmail(data.email))
    errs.email = "That doesn't look like a valid email address.";
  if (!data.message.trim())
    errs.message = "Please tell me a little about what you're working on.";
  return Object.keys(errs).length > 0 ? errs : null;
}

export default function ConnectSection() {
  const {
    values: formData,
    errors: fieldErrors,
    setField,
    isLoading: loading,
    isSuccess: success,
    serverError: error,
    handleSubmit,
  } = useLeadCapture<ConnectFields>({
    endpoint: "/api/contact",
    initialValues: { name: "", email: "", message: "" },
    validate: validateConnect,
    buildBody: (v) => v,
  });

  const handleChange =
    (field: keyof ConnectFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setField(field, e.target.value);
    };


  return (
    <section
      className="py-20 md:py-24 bg-hp-electric text-primary-foreground scroll-mt-20"
    >
      <motion.div
        className="container mx-auto px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BlurFade inView>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight leading-[1.05] mb-6">
            You have time, but not unlimited time.
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/90 mb-10 font-sans">
            You don&apos;t need to have it all figured out. You need one
            honest conversation about your next step, with someone who&apos;s
            been here before.
          </p>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3"
          >
            <BookCallButton
              location="connect_book_call"
              size="lg"
              icon="calendar-days"
              iconClassName="mr-2 h-5 w-5"
              className="bg-white text-primary hover:bg-white/90 shadow-lg transition-transform duration-200 whitespace-normal sm:whitespace-nowrap"
            >
              Book a Call
            </BookCallButton>
          </motion.div>
          <p className="mt-4 text-sm text-primary-foreground/85">
            15 minutes. No pitch.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/75">
            Not sure if it&apos;s a fit?{" "}
            <Link
              href="/assessment"
              onClick={() => trackEvent("connect_assessment_link")}
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              Take the 3-minute assessment
            </Link>{" "}
            · or{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("connect_whatsapp_link")}
              className="inline-flex items-center min-h-[44px] py-2 underline underline-offset-4 hover:text-white transition-colors"
            >
              <MessageCircle className="mr-1 h-4 w-4" aria-hidden="true" />
              text me on WhatsApp
            </a>
            .
          </p>
        </BlurFade>
        {/* Contact Form */}
        <motion.div
          className="mt-10 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {success ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
            >
              <CheckCircle2 className="mx-auto h-8 w-8 text-white mb-3" aria-hidden="true" />
              <p className="text-white font-semibold text-lg">
                Message received.
              </p>
<p className="mt-1.5 text-sm text-white/80">No pitch attached, just a reply.</p>
<p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Received · I reply to every note</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <p className="text-primary-foreground/80 text-sm text-center mb-4">
                Or tell me what&apos;s on your mind and I&apos;ll write back
              </p>
              <div>
                <label htmlFor="connect-name" className="block text-sm font-medium text-white/90 mb-1">Your name</label>
                <Input
                  id="connect-name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  required
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "connect-name-error" : undefined}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${fieldErrors.name ? "border-bloom-rose focus-visible:ring-bloom-rose/50" : ""}`}
                />
                {fieldErrors.name && (
                  <p id="connect-name-error" role="alert" className="mt-1.5 text-xs text-bloom-rose">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="connect-email" className="block text-sm font-medium text-white/90 mb-1">Your email</label>
                <Input
                  id="connect-email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "connect-email-error" : undefined}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${fieldErrors.email ? "border-bloom-rose focus-visible:ring-bloom-rose/50" : ""}`}
                />
                {fieldErrors.email && (
                  <p id="connect-email-error" role="alert" className="mt-1.5 text-xs text-bloom-rose">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="connect-message" className="block text-sm font-medium text-white/90 mb-1">What's on your mind?</label>
                <Textarea
                  id="connect-message"
                  name="message"
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={handleChange("message")}
                  required
                  rows={3}
                  maxLength={2000}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "connect-message-error" : undefined}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 resize-none ${fieldErrors.message ? "border-bloom-rose focus-visible:ring-bloom-rose/50" : ""}`}
                />
                {fieldErrors.message && (
                  <p id="connect-message-error" role="alert" className="mt-1.5 text-xs text-bloom-rose">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              {error && (
                <p role="alert" className="text-bloom-rose text-sm">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                variant="outline"
                className="w-full bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
