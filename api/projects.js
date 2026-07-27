const GITHUB_USERNAME = "lawrenceowini";

// Repos to hide from the projects list (e.g. this portfolio site itself)
const EXCLUDED_REPOS = ["Personal"];

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> visible text only
    .replace(/^#+\s*/gm, "") // headers
    .replace(/^>\s?/gm, "") // blockquotes
    .replace(/[*_`~]/g, "") // emphasis characters
    .replace(/<[^>]+>/g, "") // stray html tags
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function excerptFromReadme(raw, maxLines = 4) {
  const lines = stripMarkdown(raw);
  const meaningful = lines.filter(
    (line) => !/shields\.io/.test(line) && !/^badge/i.test(line)
  );
  return meaningful.slice(0, maxLines);
}

function authHeaders() {
  const headers = { Accept: "application/vnd.github+json" };
  // Optional: set a GITHUB_TOKEN env var in Vercel (Settings -> Environment
  // Variables) to raise the limit from 60/hr to 5000/hr. Works fine without one.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}`);
  }
  return res.json();
}

async function fetchReadmeExcerpt(repoName) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      { headers: { ...authHeaders(), Accept: "application/vnd.github.raw" } }
    );
    if (!res.ok) return [];
    const raw = await res.text();
    return excerptFromReadme(raw);
  } catch {
    return [];
  }
}

async function fetchLanguages(repoName) {
  try {
    const langs = await fetchJSON(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`
    );
    return Object.keys(langs);
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  try {
    const repos = await fetchJSON(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    const visible = repos.filter(
      (repo) => !repo.fork && !EXCLUDED_REPOS.includes(repo.name)
    );

    const projects = await Promise.all(
      visible.map(async (repo) => {
        const [tech, features] = await Promise.all([
          fetchLanguages(repo.name),
          fetchReadmeExcerpt(repo.name),
        ]);

        return {
          title: repo.name,
          description: repo.description || "No description provided.",
          tech: tech.length ? tech : repo.language ? [repo.language] : [],
          features,
          github: repo.html_url,
          live: repo.homepage || "",
          updatedAt: repo.updated_at,
        };
      })
    );

    projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Cache at Vercel's edge for 1 hour; serve stale for up to a day while
    // revalidating in the background. This is what keeps origin calls to
    // GitHub down to roughly once/hour total, regardless of visitor count.
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
