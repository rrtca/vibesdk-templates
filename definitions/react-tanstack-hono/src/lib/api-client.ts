const BASE_URL = "/api";

async function fetchJSON<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  items: {
    list: () => fetchJSON<unknown[]>("/items"),
    get: (id: string) => fetchJSON<unknown>(`/items/${id}`),
    create: (data: { title: string }) =>
      fetchJSON<unknown>("/items", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
