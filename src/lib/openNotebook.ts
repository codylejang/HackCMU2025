/**
 * Open Notebook API client utilities
 */

const OPEN_NOTEBOOK_API_URL = process.env.OPEN_NOTEBOOK_API_URL || process.env.NEXT_PUBLIC_OPEN_NOTEBOOK_API_URL || 'http://localhost:5055';
const API_PREFIX = process.env.OPEN_NOTEBOOK_API_PREFIX || process.env.NEXT_PUBLIC_OPEN_NOTEBOOK_API_PREFIX || '/api';

interface NotebookCreateRequest {
  name: string;
  description: string;
}

interface NotebookResponse {
  id: string;
  name: string;
  description: string;
  archived: boolean;
  created: string;
  updated: string;
}

interface SourceCreateRequest {
  notebook_id: string;
  type: 'text' | 'upload' | 'link';
  content?: string;
  file_path?: string;
  url?: string;
  embed?: boolean;
  transformations?: string[];
  delete_source?: boolean;
}

interface SourceResponse {
  id: string;
  title: string;
  topics: string[];
  asset?: {
    file_path?: string;
    url?: string;
  };
  full_text: string;
  embedded_chunks: number;
  created: string;
  updated: string;
}

interface AskRequest {
  question: string;
  strategy_model: string;
  answer_model: string;
  final_answer_model: string;
}

interface AskResponse {
  answer: string;
  question: string;
}

interface SearchRequest {
  query: string;
  type: 'text' | 'vector';
  limit?: number;
  search_sources?: boolean;
  search_notes?: boolean;
  minimum_score?: number;
}

interface SearchResponse {
  results: Record<string, unknown>[];
  total_count: number;
  search_type: string;
}

class OpenNotebookClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${OPEN_NOTEBOOK_API_URL}${API_PREFIX}`;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Open Notebook API Error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    const url = `${OPEN_NOTEBOOK_API_URL}/health`;
    const response = await fetch(url);
    return response.json();
  }

  // Notebook operations
  async createNotebook(data: NotebookCreateRequest): Promise<NotebookResponse> {
    return this.request('/notebooks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getNotebooks(): Promise<NotebookResponse[]> {
    return this.request('/notebooks');
  }

  async getNotebook(id: string): Promise<NotebookResponse> {
    return this.request(`/notebooks/${id}`);
  }

  // Source operations
  async createSource(data: SourceCreateRequest): Promise<SourceResponse> {
    return this.request('/sources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSources(notebookId?: string): Promise<SourceResponse[]> {
    const params = notebookId ? `?notebook_id=${notebookId}` : '';
    return this.request(`/sources${params}`);
  }

  async getSource(id: string): Promise<SourceResponse> {
    return this.request(`/sources/${id}`);
  }

  // Search and Ask operations
  async search(data: SearchRequest): Promise<SearchResponse> {
    return this.request('/search', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async ask(data: AskRequest): Promise<AskResponse> {
    return this.request('/search/ask/simple', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Models operations
  async getModels(): Promise<Record<string, unknown>[]> {
    return this.request('/models');
  }

  async getDefaultModels(): Promise<Record<string, unknown>> {
    return this.request('/models/defaults');
  }
}

// Export singleton instance
export const openNotebookClient = new OpenNotebookClient();
export type { NotebookResponse, SourceResponse, AskResponse, SearchResponse };