const GITHUB_USERNAME = "lawrenceowini";

// Repos to hide from the projects list (e.g. this portfolio site itself)
const EXCLUDED_REPOS = ["Personal"];

const CACHE_KEY = "github_projects_cache_v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

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

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}`);
  }
  return res.json();
}

async function fetchReadmeExcerpt(repoName) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      { headers: { Accept: "application/vnd.github.raw" } }
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

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  } catch {
    // corrupted or unavailable cache, ignore
  }
  return null;
}

function writeCache(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // storage full or unavailable, safe to ignore
  }
}

/**
 * Fetches the user's public, non-fork GitHub repos and enriches each with
 * its language breakdown and a short excerpt from its README. Results are
 * cached in localStorage for CACHE_TTL_MS to stay well under GitHub's
 * unauthenticated rate limit (60 requests/hour per visitor IP).
 */
export async function fetchGithubProjects() {
  const cached = readCache();
  if (cached) return cached;

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

  writeCache(projects);
  return projects;
}
