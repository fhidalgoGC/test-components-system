export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export type EndpointVisibility = 'public' | 'private';

export type FilterOperator = 
  | 'equals' 
  | 'not_equals' 
  | 'contains' 
  | 'starts_with' 
  | 'ends_with' 
  | 'greater_than' 
  | 'less_than' 
  | 'in' 
  | 'not_in'
  | 'between'
  | 'is_null'
  | 'is_not_null';

export type SortDirection = 'asc' | 'desc';

export interface FilterRule {
  field: string;
  operator: FilterOperator;
  value: unknown;
  caseSensitive?: boolean;
}

export interface SortRule {
  field: string;
  direction: SortDirection;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  pageSizeOptions?: number[];
}

export interface QueryParams {
  filters?: FilterRule[];
  sort?: SortRule[];
  pagination?: PaginationConfig;
  search?: string;
  searchFields?: string[];
}

export interface EndpointConfig {
  path: string;
  method?: HttpMethod;
  visibility: EndpointVisibility;
  requiresAuth?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTTL?: number;
}

export interface EndpointMatch {
  pattern: string | RegExp;
  methods?: HttpMethod[];
  visibility: EndpointVisibility;
  requiresAuth?: boolean;
  headers?: Record<string, string>;
}

export interface AuthConfig {
  type: 'bearer' | 'basic' | 'api-key' | 'custom';
  tokenKey?: string;
  headerName?: string;
  getToken?: () => string | null | Promise<string | null>;
  refreshToken?: () => Promise<string | null>;
  onAuthError?: (error: AuthError) => void;
  onTokenExpired?: () => void;
}

export interface AuthError {
  status: number;
  message: string;
  endpoint: string;
}

export interface RequestInterceptor {
  name: string;
  order?: number;
  enabled?: boolean;
  condition?: (request: InterceptedRequest) => boolean;
  handler: (request: InterceptedRequest) => InterceptedRequest | Promise<InterceptedRequest>;
}

export interface ResponseInterceptor {
  name: string;
  order?: number;
  enabled?: boolean;
  condition?: (response: InterceptedResponse) => boolean;
  handler: (response: InterceptedResponse) => InterceptedResponse | Promise<InterceptedResponse>;
}

export interface ErrorInterceptor {
  name: string;
  order?: number;
  enabled?: boolean;
  statusCodes?: number[];
  handler: (error: InterceptedError) => InterceptedError | Promise<InterceptedError>;
}

export interface InterceptedRequest {
  url: string;
  method: HttpMethod;
  headers: Record<string, string>;
  body?: unknown;
  params?: QueryParams;
  metadata?: Record<string, unknown>;
  visibility: EndpointVisibility;
  requiresAuth: boolean;
}

export interface InterceptedResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  request: InterceptedRequest;
  timing?: {
    start: number;
    end: number;
    duration: number;
  };
}

export interface InterceptedError {
  status: number;
  statusText: string;
  message: string;
  request: InterceptedRequest;
  response?: InterceptedResponse;
  retryCount?: number;
}

export interface ApiInterceptorConfig {
  baseUrl: string;
  defaultTimeout?: number;
  defaultHeaders?: Record<string, string>;
  auth?: AuthConfig;
  endpoints?: EndpointMatch[];
  defaultVisibility?: EndpointVisibility;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
  errorInterceptors?: ErrorInterceptor[];
  logging?: {
    enabled: boolean;
    level?: 'debug' | 'info' | 'warn' | 'error';
    onLog?: (entry: LogEntry) => void;
  };
  retry?: {
    enabled: boolean;
    maxRetries: number;
    retryDelay: number;
    retryOn?: number[];
  };
}

export interface LogEntry {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  request?: InterceptedRequest;
  response?: InterceptedResponse;
  error?: InterceptedError;
}

export interface ApiInterceptorInstance {
  request: <T = unknown>(endpoint: string, options?: RequestOptions) => Promise<InterceptedResponse<T>>;
  get: <T = unknown>(endpoint: string, params?: QueryParams) => Promise<InterceptedResponse<T>>;
  post: <T = unknown>(endpoint: string, body?: unknown, params?: QueryParams) => Promise<InterceptedResponse<T>>;
  put: <T = unknown>(endpoint: string, body?: unknown, params?: QueryParams) => Promise<InterceptedResponse<T>>;
  patch: <T = unknown>(endpoint: string, body?: unknown, params?: QueryParams) => Promise<InterceptedResponse<T>>;
  delete: <T = unknown>(endpoint: string, params?: QueryParams) => Promise<InterceptedResponse<T>>;
  addRequestInterceptor: (interceptor: RequestInterceptor) => void;
  addResponseInterceptor: (interceptor: ResponseInterceptor) => void;
  addErrorInterceptor: (interceptor: ErrorInterceptor) => void;
  removeInterceptor: (name: string, type: 'request' | 'response' | 'error') => void;
  setAuth: (auth: AuthConfig) => void;
  clearAuth: () => void;
  getConfig: () => ApiInterceptorConfig;
}

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: QueryParams;
  headers?: Record<string, string>;
  timeout?: number;
  visibility?: EndpointVisibility;
  requiresAuth?: boolean;
  cache?: boolean;
  signal?: AbortSignal;
}
