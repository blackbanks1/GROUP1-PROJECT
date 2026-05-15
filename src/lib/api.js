const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  getUsers: () => fetchApi('/users'),
  getInternships: () => fetchApi('/internships'),
  generateAIRoadmap: (prompt) => fetchApi('/ai/generate-roadmap', {
    method: 'POST',
    body.stringify({ prompt }),
  }),
};
