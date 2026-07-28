import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fetchGithubStats } from "../lib/githubStats";

function StatCard({ label, value }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 text-center">
      <p className="font-display text-2xl sm:text-3xl font-semibold text-accent mb-1">
        {value}
      </p>
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </p>
    </div>
  );
}

function memberSinceYear(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).getFullYear();
}

export default function GithubStats() {
  const [ref, isVisible] = useScrollReveal();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchGithubStats()
      .then((data) => {
        if (!cancelled) setStats(data);
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
      ref={ref}
      className={`px-4 sm:px-6 md:px-8 py-14 sm:py-16 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent text-center mb-3">
        Activity
      </p>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10 text-center">
        GitHub Activity
      </h2>

      {loading && (
        <p className="text-center text-muted font-mono text-sm">Loading…</p>
      )}

      {error && (
        <p className="text-center text-muted">
          Couldn't load GitHub stats right now. View the profile directly on{" "}
          <a
            href="https://github.com/lawrenceowini"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            GitHub
          </a>
          .
        </p>
      )}

      {!loading && !error && stats && (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard label="Public Repos" value={stats.publicRepos} />
            <StatCard label="Followers" value={stats.followers} />
            <StatCard label="Total Stars" value={stats.totalStars} />
            <StatCard
              label="On GitHub Since"
              value={memberSinceYear(stats.memberSince)}
            />
          </div>

          {stats.topLanguages.length > 0 && (
            <div className="bg-surface border border-border rounded-xl p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
                Top Languages
              </p>
              <div className="space-y-3">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lang.name}</span>
                      <span className="text-muted font-mono text-xs">
                        {lang.percent}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
