const GITHUB_USERNAME = "lawrenceowini";
const EXCLUDED_REPOS = ["Personal"];

function authHeaders() {
  const headers = { Accept: "application/vnd.github+json" };
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

async function fetchLanguageBytes(repoName) {
  try {
    return await fetchJSON(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`
    );
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  try {
    const [user, repos] = await Promise.all([
      fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetchJSON(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
      ),
    ]);

    const visible = repos.filter(
      (repo) => !repo.fork && !EXCLUDED_REPOS.includes(repo.name)
    );

    const totalStars = visible.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0
    );

    // Aggregate language bytes across every repo to build a real top-languages
    // breakdown, reusing data we're already allowed to fetch (no external
    // service involved at all).
    const languageBytesByRepo = await Promise.all(
      visible.map((repo) => fetchLanguageBytes(repo.name))
    );

    const languageTotals = {};
    for (const langs of languageBytesByRepo) {
      for (const [name, bytes] of Object.entries(langs)) {
        languageTotals[name] = (languageTotals[name] || 0) + bytes;
      }
    }

    const totalBytes = Object.values(languageTotals).reduce(
      (a, b) => a + b,
      0
    );

    const topLanguages = Object.entries(languageTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, bytes]) => ({
        name,
        percent: totalBytes ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
      }));

    const stats = {
      publicRepos: visible.length,
      followers: user.followers,
      totalStars,
      memberSince: user.created_at,
      topLanguages,
    };

    // Stats change slowly -- cache for an hour, serve stale for up to a day
    // while revalidating.
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
