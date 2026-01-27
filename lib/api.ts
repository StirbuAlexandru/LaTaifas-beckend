// API URL configuration
// When running on same server (Render), use relative URLs to avoid CORS issues
// Only use absolute URL if explicitly set and different from current origin

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function getApiUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If no base URL configured, use relative path (same origin)
  if (!API_BASE_URL) {
    return `/${cleanPath}`;
  }
  
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
