import { useState, useEffect } from "react";
import { fetchGithubProjects } from "../lib/github";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { timeAgo } from "../lib/time";

function ProjectCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-video bg-surface-hover" />
      <div className="p-5 sm:p-6">
        <div className="h-5 w-2/3 bg-surface-hover rounded mb-4" />
        <div className="h-3 w-full bg-surface-hover rounded mb-2" />
        <div className="h-3 w-5/6 bg-surface-hover rounded mb-5" />
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-surface-hover rounded-lg" />
          <div className="h-6 w-14 bg-surface-hover rounded-lg" />
          <div className="h-6 w-20 bg-surface-hover rounded-lg" />
        </div>
        <div className="h-4 w-24 bg-surface-hover rounded" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [generatedAt, setGeneratedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brokenScreenshots, setBrokenScreenshots] = useState(() => new Set());
  const [headerRef, headerVisible] = useScrollReveal();
  // Ticks every 30s purely to re-render the "synced Xm ago" label.
  const [, forceTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchGithubProjects()
      .then((data) => {
        if (!cancelled) {
          setProjects(data.projects);
          setGeneratedAt(data.generatedAt);
        }
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

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="projects"
      className="px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent text-center mb-3">
        Live from GitHub
      </p>
      <h2
        ref={headerRef}
        className={`font-display text-2xl sm:text-3xl font-semibold mb-3 text-center transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Featured Projects
      </h2>

      {generatedAt && (
        <p className="flex items-center justify-center gap-2 font-mono text-xs text-muted mb-8 sm:mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-live" />
          </span>
          synced {timeAgo(generatedAt)}
        </p>
      )}
      {!generatedAt && <div className="mb-8 sm:mb-10" />}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      )}

      {error && (
        <p className="text-center text-muted">
          Couldn't load projects right now. View them directly on{" "}
          <a
            href="https://github.com/lawrenceowini?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
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
              <div className="bg-surface rounded-xl border border-border overflow-hidden hover:border-accent/60 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(242,184,75,0.15)] transition-all duration-300">
                {project.screenshot && !brokenScreenshots.has(index) && (
                  <div className="aspect-video bg-surface-hover">
                    <img
                      src={project.screenshot}
                      alt={`${project.title} live site preview`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                      onError={() =>
                        setBrokenScreenshots((prev) => new Set(prev).add(index))
                      }
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                    <h3 className="font-display text-lg sm:text-xl font-semibold">
                      {project.title}
                    </h3>
                    {project.pinned && (
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/30">
                        Pinned
                      </span>
                    )}
                  </div>
                  <p className="text-muted text-sm sm:text-base mb-4 sm:mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono bg-surface-hover text-muted text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-lg"
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
                    className="text-accent hover:text-accent-hover text-sm sm:text-base"
                  >
                    {selectedProject === index ? "Show Less ↑" : "Learn More →"}
                  </button>
                </div>
              </div>

              {selectedProject === index && (
                <div
                  id={`project-details-${index}`}
                  className="mt-3 sm:mt-4 bg-surface border border-accent/30 rounded-xl p-5 sm:p-6"
                >
                  {project.caseStudy ? (
                    <div className="space-y-5 mb-5 sm:mb-6">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-accent mb-1.5">
                          The Problem
                        </p>
                        <p className="text-muted text-sm sm:text-base">
                          {project.caseStudy.problem}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-accent mb-1.5">
                          The Trade-off
                        </p>
                        <p className="text-muted text-sm sm:text-base">
                          {project.caseStudy.tradeoff}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-accent mb-1.5">
                          The Hard Part
                        </p>
                        <p className="text-muted text-sm sm:text-base">
                          {project.caseStudy.hardPart}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-accent mb-1.5">
                          What I'd Change
                        </p>
                        <p className="text-muted text-sm sm:text-base">
                          {project.caseStudy.whatIdChange}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-display text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        From the README
                      </h4>
                      {project.features.length > 0 ? (
                        <ul className="space-y-2 mb-5 sm:mb-6">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex gap-3 text-sm sm:text-base">
                              <span className="text-xl leading-none text-accent shrink-0">
                                ·
                              </span>
                              <span className="text-muted">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted text-sm sm:text-base mb-5 sm:mb-6">
                          No README found for this repo.
                        </p>
                      )}
                    </>
                  )}
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent text-bg font-medium px-4 sm:px-5 py-2 rounded-lg hover:bg-accent-hover text-sm sm:text-base"
                      >
                        GitHub Repository
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-border px-4 sm:px-5 py-2 rounded-lg hover:bg-surface-hover text-sm sm:text-base"
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
