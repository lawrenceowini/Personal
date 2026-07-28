import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const [ref, isVisible] = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`px-4 sm:px-6 md:px-8 py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent text-center mb-3">
        Let's build something
      </p>
      <h2 className="font-display text-3xl font-semibold mb-10 text-center">
        Contact
      </h2>

      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-white placeholder-muted/60 focus:outline-none focus:border-accent transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-white placeholder-muted/60 focus:outline-none focus:border-accent transition-colors"
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-white placeholder-muted/60 focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed transition text-bg font-semibold px-6 py-2.5 rounded-lg"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-live text-sm text-center">
              Thanks — your message has been sent!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          )}
        </form>

        <div className="space-y-2 text-muted text-center text-sm">
          <p>
            Or reach out directly:{" "}
            <a href="mailto:lawrenceowini17@gmail.com" className="text-accent">
              lawrenceowini17@gmail.com
            </a>
          </p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/lawrenceowini"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              github.com/lawrenceowini
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
