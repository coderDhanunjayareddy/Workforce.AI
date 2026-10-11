import type { Session } from "@/types";

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
export const backendEnabled = Boolean(apiUrl);

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  let session: Session | null = null;
  try {
    session = JSON.parse(localStorage.getItem("workforce-ai-session") ?? "null") as Session | null;
  } catch {
    localStorage.removeItem("workforce-ai-session");
  }
  try {
    const response = await fetch(`${apiUrl}/api/v1${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(session ? { Authorization: `Bearer ${session.token}` } : {}),
        ...options.headers
      },
      signal: AbortSignal.timeout(20000)
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error("Your session expired. Please sign in again.");
      if (response.status === 409) throw new Error("A record with that email or phone already exists.");
      if (response.status === 422) throw new Error("Check the required fields and try again.");
      if (response.status === 404) throw new Error("The requested record was not found.");
      throw new Error("The workspace could not save this change. Please try again.");
    }
    return await response.json() as T;
  } catch (error) {
    if (error instanceof TypeError || (error instanceof DOMException && error.name === "TimeoutError")) {
      throw new Error("The workspace service is unavailable. Please try again shortly.");
    }
    throw error;
  }
}
