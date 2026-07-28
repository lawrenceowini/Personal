import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Skills() {
  const [ref, isVisible] = useScrollReveal();

  const skills = [
    "Python",
    "JavaScript",
    "React",
    "Flask",
    "Streamlit",
    "Supabase",
    "Git",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className={`px-4 sm:px-6 md:px-8 py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent text-center mb-3">
        Toolbox
      </p>
      <h2 className="font-display text-3xl font-semibold mb-10 text-center">
        Skills
      </h2>

      <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="font-mono text-sm bg-surface border border-border px-4 py-2 rounded-lg hover:border-accent/50 hover:text-accent transition-colors"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
