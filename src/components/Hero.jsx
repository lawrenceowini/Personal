import profile from "../assets/profile.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Update this whenever you replace public/resume.pdf with a new version.
const RESUME_LAST_UPDATED = "July 2026";

export default function Hero() {
  return (
    <section className="animate-fade-in-up flex flex-col items-center text-center px-4 sm:px-6 md:px-8 py-14 sm:py-20 md:py-24">
      <img
        src={profile}
        alt="Lawrence Owino"
        width={176}
        height={176}
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full object-cover border-2 border-accent/40 shadow-lg mb-6 sm:mb-8"
      />

      <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">
        Software Developer · Nairobi, KE
      </p>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-3 sm:mb-4 leading-tight">
        Lawrence Owino
      </h1>

      <p className="text-muted text-base sm:text-lg md:text-xl max-w-xs sm:max-w-xl md:max-w-2xl mb-6 sm:mb-8 leading-relaxed">
        Software engineering student building secure, intelligent systems —
        from real-time messaging to portfolio management platforms.
      </p>

      <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
        <a
          href="https://github.com/lawrenceowini"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-surface border border-border px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-surface-hover hover:border-accent/50 transition text-sm sm:text-base"
        >
          <FaGithub /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/lawrence-owino-3b46b0267/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-surface border border-border px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-surface-hover hover:border-accent/50 transition text-sm sm:text-base"
        >
          <FaLinkedin /> LinkedIn
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:w-auto">
        <a
          href="#projects"
          className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition text-center"
        >
          View Projects
        </a>
        <a
          href="/resume.pdf"
          download
          className="border border-border px-6 py-3 rounded-lg hover:bg-surface transition text-center"
        >
          Download Résumé
        </a>
      </div>

      <p className="text-muted/70 text-xs sm:text-sm mt-3 font-mono">
        Résumé last updated: {RESUME_LAST_UPDATED}
      </p>
    </section>
  );
}
