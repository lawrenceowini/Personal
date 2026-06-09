export default function Skills() {
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
    <section id="skills" className="px-4 sm:px-6 md:px-8 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Skills</h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 px-5 py-3 rounded-lg"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
