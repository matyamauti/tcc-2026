const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

function buildWebSocketUrl(path) {
  const url = new URL(buildUrl(path));
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  return url.toString();
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar ${path}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  baseUrl: API_BASE_URL,
  detectionsWebSocketUrl: buildWebSocketUrl('/ws/detections'),
  getStatus: () => request('/api/status'),
  getLatestDetection: () => request('/api/detections/latest'),
  getDetections: (limit = 50) => request(`/api/detections?limit=${limit}`),
  getSummary: () => request('/api/summary'),
};
