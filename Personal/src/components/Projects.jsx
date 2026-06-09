import { useState } from "react";
import { projects } from "../data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-800 hover:border-blue-600 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button
                onClick={() =>
                  setSelectedProject(selectedProject === index ? null : index)
                }
                className="text-blue-500 hover:text-blue-400 text-sm sm:text-base"
              >
                {selectedProject === index ? "Show Less ↑" : "Learn More →"}
              </button>
            </div>
            {selectedProject === index && (
              <div className="mt-3 sm:mt-4 bg-gray-900 border border-blue-700 rounded-xl p-5 sm:p-6 shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Key Features
                </h4>
                <ul className="space-y-2 mb-5 sm:mb-6">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm sm:text-base">
                      <span className="text-xl leading-none text-blue-500 shrink-0">
                        ·
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                    >
                      GitHub Repository
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-700 px-4 sm:px-5 py-2 rounded-lg hover:bg-green-600 text-sm sm:text-base"
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
