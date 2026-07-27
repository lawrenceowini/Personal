/**
 * Fetches the project list from our own /api/projects serverless function,
 * which does the actual GitHub API calls server-side and is cached at
 * Vercel's edge. Keeping this server-side avoids burning through GitHub's
 * 60 requests/hour *per visitor IP* unauthenticated rate limit, which is
 * trivial to hit if the client calls GitHub directly.
 */
export async function fetchGithubProjects() {
  const res = await fetch("/api/projects");

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  return res.json();
}
