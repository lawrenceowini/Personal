import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className={`px-4 sm:px-6 md:px-8 py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent text-center mb-3">
        Who I am
      </p>
      <h2 className="font-display text-3xl font-semibold mb-8 text-center">
        About Me
      </h2>

      <div className="max-w-3xl mx-auto text-muted text-lg leading-8">
        <p>
          I'm Lawrence Owino, a software developer and software engineering
          student passionate about building secure, intelligent, and
          user-friendly applications. I enjoy developing web applications, APIs,
          and systems that solve real-world problems.
        </p>
      </div>
    </section>
  );
}
