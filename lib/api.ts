// API URL configuration for static export
// Frontend (Hostgate) calls Backend (Render)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lataifas-beckend.onrender.com';

export function getApiUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
}

// Helper for fetch with API base URL
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const url = getApiUrl(path);
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}
