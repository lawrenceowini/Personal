import { useScrollReveal } from "../hooks/useScrollReveal";

const GITHUB_USERNAME = "lawrenceowini";

const THEME_PARAMS = new URLSearchParams({
  bg_color: "00000000",
  title_color: "F2B84B",
  text_color: "8A93A8",
  icon_color: "F2B84B",
  hide_border: "true",
});

const statsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&count_private=false&${THEME_PARAMS.toString()}`;

const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&langs_count=8&${THEME_PARAMS.toString()}`;

export default function GithubStats() {
  const [ref, isVisible] = useScrollReveal();

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
        <div className="bg-surface border border-border rounded-xl p-2 sm:p-3 flex items-center justify-center">
          <img
            src={statsUrl}
            alt="Lawrence Owino's GitHub stats"
            loading="lazy"
            className="w-full"
          />
        </div>
        <div className="bg-surface border border-border rounded-xl p-2 sm:p-3 flex items-center justify-center">
          <img
            src={langsUrl}
            alt="Lawrence Owino's most-used languages"
            loading="lazy"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
