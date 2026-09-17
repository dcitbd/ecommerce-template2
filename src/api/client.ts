// Unified API client for Supabase or direct REST requests
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options
      });
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.warn("API request fallback to offline/mock:", endpoint, err);
      throw err;
    }
  }
}
export const apiClient = new ApiClient();
