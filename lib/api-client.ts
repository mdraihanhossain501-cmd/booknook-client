const API = process.env.NEXT_PUBLIC_API_URL;

export async function authFetch(path: string, options: RequestInit = {}) {
  const tokenRes = await fetch("/api/token", { cache: "no-store" });
  if (!tokenRes.ok) {
    throw new Error("Please log in again");
  }
  const { token } = await tokenRes.json();

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(`${API}${path}`, { ...options, headers });
}