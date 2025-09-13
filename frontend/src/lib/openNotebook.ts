// Open Notebook API client for frontend integration
export interface OpenNotebookConfig {
  baseUrl: string;
  prefix: string;
}

export interface NotebookCreate {
  name: string;
  description?: string;
}

export interface NotebookResponse {
  id: string;
  name: string;
  description?: string;
  archived: boolean;
  created: string;
  updated: string;
}

export interface SourceCreate {
  notebook_id: string;
  title: string;
  content: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface SourceResponse {
  id: string;
  notebook_id: string;
  title: string;
  content: string;
  type?: string;
  metadata?: Record<string, any>;
  created: string;
  updated: string;
}

export interface ChunkAskRequest {
  question: string;
  model_id: string;
  limit?: number;
  search_sources?: boolean;
  search_notes?: boolean;
  minimum_score?: number;
}

export interface SearchChunk {
  id: string;
  text: string;
}

export interface VectorSearchResult {
  id: string;
  content: string[];
  title?: string;
  source_id?: string;
  score?: number;
}

export interface ChunkAskResponse {
  answer: string;
  question: string;
  chunks_used: SearchChunk[];
  vector_search_results: VectorSearchResult[];
  search_count: number;
  formatted_search_results: string;
  raw_search_results: any[];
  prompt_sent_to_llm: string;
}

export interface ModelResponse {
  id: string;
  name: string;
  provider: string;
  model_type: string;
  api_key?: string;
  base_url?: string;
  is_default_chat: boolean;
  is_default_embedding: boolean;
}

export class OpenNotebookClient {
  private config: OpenNotebookConfig;

  constructor(config: OpenNotebookConfig) {
    this.config = config;
  }

  private getUrl(endpoint: string): string {
    return `${this.config.baseUrl}${this.config.prefix}${endpoint}`;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<T> {
    const url = this.getUrl(endpoint);
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Open Notebook API error: ${response.status} ${errorText}`);
    }

    return response.json();
  }

  // Notebook operations
  async createNotebook(notebook: NotebookCreate): Promise<NotebookResponse> {
    return this.request<NotebookResponse>('POST', '/notebooks', notebook);
  }

  async getNotebook(notebookId: string): Promise<NotebookResponse> {
    return this.request<NotebookResponse>('GET', `/notebooks/${notebookId}`);
  }

  async getNotebooks(): Promise<NotebookResponse[]> {
    return this.request<NotebookResponse[]>('GET', '/notebooks');
  }

  async deleteNotebook(notebookId: string): Promise<void> {
    return this.request<void>('DELETE', `/notebooks/${notebookId}`);
  }

  // Source operations
  async createSource(source: SourceCreate): Promise<SourceResponse> {
    return this.request<SourceResponse>('POST', '/sources', source);
  }

  async getSources(notebookId: string): Promise<SourceResponse[]> {
    return this.request<SourceResponse[]>('GET', `/sources?notebook_id=${notebookId}`);
  }

  async deleteSource(sourceId: string): Promise<void> {
    return this.request<void>('DELETE', `/sources/${sourceId}`);
  }

  // Q&A operations
  async askQuestion(request: ChunkAskRequest): Promise<ChunkAskResponse> {
    return this.request<ChunkAskResponse>('POST', '/search/ask/chunk', request);
  }

  // Model operations
  async getModels(): Promise<ModelResponse[]> {
    return this.request<ModelResponse[]>('GET', '/models');
  }

  async getDefaultChatModel(): Promise<ModelResponse | null> {
    const models = await this.getModels();
    return models.find(m => m.is_default_chat) || null;
  }

  async getDefaultEmbeddingModel(): Promise<ModelResponse | null> {
    const models = await this.getModels();
    return models.find(m => m.is_default_embedding) || null;
  }

  // Health check
  async checkHealth(): Promise<{ status: string }> {
    const url = `${this.config.baseUrl}/health`; // Direct URL without prefix
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Open Notebook API error: ${response.status}`);
    }

    return response.json();
  }
}

// Default configuration from environment variables
const defaultConfig: OpenNotebookConfig = {
  baseUrl: process.env.NEXT_PUBLIC_OPEN_NOTEBOOK_API_URL || 'http://localhost:5055',
  prefix: process.env.NEXT_PUBLIC_OPEN_NOTEBOOK_API_PREFIX || '/api',
};

// Default client instance
export const openNotebookClient = new OpenNotebookClient(defaultConfig);

// Helper function to check if Open Notebook is available
export async function checkOpenNotebookConnection(): Promise<boolean> {
  try {
    await openNotebookClient.checkHealth();
    return true;
  } catch (error) {
    console.error('Open Notebook connection failed:', error);
    return false;
  }
}

// Helper function to ensure models are configured
export async function ensureModelsConfigured(): Promise<{
  chatModel: ModelResponse | null;
  embeddingModel: ModelResponse | null;
  ready: boolean;
}> {
  try {
    const chatModel = await openNotebookClient.getDefaultChatModel();
    const embeddingModel = await openNotebookClient.getDefaultEmbeddingModel();

    return {
      chatModel,
      embeddingModel,
      ready: chatModel !== null && embeddingModel !== null,
    };
  } catch (error) {
    console.error('Error checking model configuration:', error);
    return {
      chatModel: null,
      embeddingModel: null,
      ready: false,
    };
  }
}