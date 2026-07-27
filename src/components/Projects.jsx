import { useState, useEffect } from "react";
import { fetchGithubProjects } from "../lib/github";
import { useScrollReveal } from "../hooks/useScrollReveal";

function ProjectCardSkeleton() {
  return (
    <div className="bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-800 animate-pulse">
      <div className="h-5 w-2/3 bg-gray-800 rounded mb-4" />
      <div className="h-3 w-full bg-gray-800 rounded mb-2" />
      <div className="h-3 w-5/6 bg-gray-800 rounded mb-5" />
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-16 bg-gray-800 rounded-lg" />
        <div className="h-6 w-14 bg-gray-800 rounded-lg" />
        <div className="h-6 w-20 bg-gray-800 rounded-lg" />
      </div>
      <div className="h-4 w-24 bg-gray-800 rounded" />
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerRef, headerVisible] = useScrollReveal();

  useEffect(() => {
    let cancelled = false;

    fetchGithubProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="projects"
      className="px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20"
    >
      <h2
        ref={headerRef}
        className={`text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Featured Projects
      </h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      )}

      {error && (
        <p className="text-center text-gray-300">
          Couldn't load projects right now. View them directly on{" "}
          <a
            href="https://github.com/lawrenceowini?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            GitHub
          </a>
          .
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div key={project.github || index}>
              <div className="bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-800 hover:border-blue-600 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all duration-300">
                <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {project.title}
                  </h3>
                  {project.pinned && (
                    <span className="shrink-0 text-xs bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full border border-blue-700">
                      Pinned
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-5">
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
                  aria-expanded={selectedProject === index}
                  aria-controls={`project-details-${index}`}
                  className="text-blue-400 hover:text-blue-300 text-sm sm:text-base"
                >
                  {selectedProject === index ? "Show Less ↑" : "Learn More →"}
                </button>
              </div>

              {selectedProject === index && (
                <div
                  id={`project-details-${index}`}
                  className="mt-3 sm:mt-4 bg-gray-900 border border-blue-700 rounded-xl p-5 sm:p-6 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    From the README
                  </h4>
                  {project.features.length > 0 ? (
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
                  ) : (
                    <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">
                      No README found for this repo.
                    </p>
                  )}
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
      )}
    </section>
  );
}
