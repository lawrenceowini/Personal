import { useState } from "react";
import { projects } from "../data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="px-8 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Featured Projects
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index}>
            {/* Card */}
            <div
              className="
                bg-gray-900
                p-6
                rounded-xl
                border
                border-gray-800
                hover:border-blue-600
                hover:-translate-y-2
                hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]
                transition-all
                duration-300
              "
            >
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>

              <p className="text-gray-400 mb-5">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-sm px-3 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() =>
                  setSelectedProject(selectedProject === index ? null : index)
                }
                className="text-blue-500 hover:text-blue-400"
              >
                {selectedProject === index ? "Show Less ↑" : "Learn More →"}
              </button>
            </div>

            {/* Expanded section */}
            {selectedProject === index && (
              <div className="mt-4 bg-gray-900 border border-blue-700 rounded-xl p-6 shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                <h4 className="text-xl font-semibold mb-4">Key Features</h4>

                <ul className="space-y-2 mb-6">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-xl leading-none text-blue-500">
                        ·
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 px-5 py-2 rounded-lg hover:bg-blue-600"
                    >
                      GitHub Repository
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-700 px-5 py-2 rounded-lg hover:bg-green-600"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
