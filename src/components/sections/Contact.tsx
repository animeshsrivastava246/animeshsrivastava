"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SocialMedia from "../animations/SocialMedia";
import VariableProximity from "../animations/VariableProximity";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendEmail } from "../../lib/actions";
import { toast } from "sonner";

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setStatus("loading");
    setErrorMessage("");

    // Slight artificial delay for better UX transition
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = await sendEmail(formData);

    if (result.error) {
      setErrorMessage(result.error);
      setStatus("error");
      toast.error(result.error);
    } else {
      setStatus("success");
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full rounded-4xl border-2 border-background py-24 px-4 md:px-8 flex items-center justify-center relative overflow-hidden"
      aria-labelledby="contact-heading"
      role="region"
    >
      {/* Background gradients for the final touch */}
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[4fr_3fr] gap-12 lg:gap-16 items-center z-10">

        {/* Left Side: Context & Socials */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <div>
            <h2 id="contact-heading" className="sr-only">Contact Me</h2>
            <div className="hidden lg:flex lg:flex-col lg:items-start">
              <VariableProximity
                label="Ready to "
                className="text-4xl md:text-5xl lg:text-7xl mb-2 text-foreground font-heading font-bold"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={ref as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
              <VariableProximity
                label="build the future"
                className="text-4xl md:text-5xl lg:text-7xl mb-2 text-foreground font-heading font-bold opacity-80"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={ref as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
              <VariableProximity
                label="together?"
                className="text-4xl md:text-5xl lg:text-7xl mb-8 text-primary font-heading font-bold"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={ref as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
            </div>
            {/* Mobile simplified heading */}
            <div className="lg:hidden text-center sm:text-left mb-6 flex flex-col justify-center items-center sm:items-start">
              <VariableProximity
                label="Let&apos;s innovate."
                className="text-4xl sm:text-5xl font-heading font-bold text-foreground"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={ref as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
            </div>

            <p className="text-muted-foreground text-lg md:text-xl font-body leading-relaxed max-w-lg text-center lg:text-left mb-6">
              Looking to launch your next big idea or optimize an existing platform? Drop a message and let&apos;s discuss how we can engineer success.
            </p>

            {/* Copy to clipboard block */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <span className="text-sm font-medium text-muted-foreground">Or email me directly at:</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("animeshsrivastava246246@gmail.com");
                  toast.success("Email copied to clipboard!");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border/50 rounded-full hover:bg-muted transition-colors group cursor-pointer"
                title="Click to copy email"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  animeshsrivastava246246@gmail.com
                </span>
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-center w-full pt-8 pb-4">
            <SocialMedia />
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full relative"
        >

          <VariableProximity
            label="Initiate Connection"
            className="text-3xl sm:text-5xl text-primary"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={ref as React.RefObject<HTMLElement>}
            radius={50}
            falloff="linear"
          />

          <form onSubmit={handleSubmit} className="mt-4 md:mt-12 relative z-10 flex flex-col space-y-6 [&_label]:after:content-['*']
    [&_label]:after:text-red-500
    [&_label]:after:ml-1
    [&_label]:after:font-bold">
            {/* Honeypot field for spam protection */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="John Doe"
                  className="bg-background/80 border border-border/50 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body neumorphic-inset"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="senderEmail" className="text-sm font-medium text-foreground ml-1">Your Email</label>
                <input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  required
                  maxLength={500}
                  placeholder="john@example.com"
                  className="bg-background/80 border border-border/50 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body neumorphic-inset"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                placeholder="Tell me about your project..."
                rows={5}
                className="bg-background/80 border border-border/50 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body resize-none neumorphic-inset"
              />
            </div>

            {/* Feedback & Submit Button */}
            <div className="pt-2 flex flex-col space-y-4">
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                className="group relative overflow-hidden w-full sm:w-auto px-9 py-4 rounded-full 
    bg-linear-to-r from-blue-600 to-purple-600 
    text-white font-semibold tracking-wide
    shadow-lg hover:shadow-blue-500/30 
    transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />

                {status === "idle" || status === "error" ? (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : status === "loading" ? (
                  <>
                    Sending...
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </>
                ) : (
                  <>
                    Sent Successfully
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{errorMessage}</span>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-500 text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/20"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="font-medium">Thanks for reaching out! I&apos;ll get back to you soon.</span>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
