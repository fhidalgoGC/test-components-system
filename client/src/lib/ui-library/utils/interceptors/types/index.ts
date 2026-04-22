export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export type EndpointVisibility = 'public' | 'private';

/**
 * Generic query parameters - the interceptor is agnostic to the structure.
 * Consumer defines their own param format, interceptor just serializes it.
 */
export type QueryParams = Record<string, unknown>;

/**
 * Full endpoint configuration (reserved for future use with endpoint registry)
 * Currently, use EndpointMatch for pattern-based endpoint matching
 */
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

/**
 * Response transformer function - transforms the raw response data
 */
export type ResponseTransformer<TInput = unknown, TOutput = unknown> = (data: TInput) => TOutput;

/**
 * Dynamic header getter - called on each request to get the current header value
 * Return null/undefined to skip the header
 */
export type DynamicHeaderGetter = () => string | null | undefined | Promise<string | null | undefined>;

export interface DynamicHeaderConfig {
  name: string;
  getValue: DynamicHeaderGetter;
  condition?: (request: InterceptedRequest) => boolean;
}

export interface EndpointMatch {
  pattern: string | RegExp;
  methods?: HttpMethod[];
  visibility: EndpointVisibility;
  requiresAuth?: boolean;
  headers?: Record<string, string>;
  transform?: ResponseTransformer;
}

export type AuthType = 'bearer' | 'basic' | 'api-key' | 'custom';

export interface AuthConfig {
  type: AuthType;
  headerName?: string;
  getToken: () => string | null | Promise<string | null>;
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
  pathPattern?: string | RegExp;
  condition?: (request: InterceptedRequest) => boolean;
  handler: (request: InterceptedRequest) => InterceptedRequest | Promise<InterceptedRequest>;
}

export interface ResponseInterceptor {
  name: string;
  order?: number;
  enabled?: boolean;
  pathPattern?: string | RegExp;
  condition?: (response: InterceptedResponse) => boolean;
  handler: (response: InterceptedResponse) => InterceptedResponse | Promise<InterceptedResponse>;
}

export interface ErrorInterceptor {
  name: string;
  order?: number;
  enabled?: boolean;
  pathPattern?: string | RegExp;
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
  get: <T = unknown>(endpoint: string, params?: QueryParams, options?: RequestWithTransformOptions) => Promise<InterceptedResponse<T>>;
  post: <T = unknown>(endpoint: string, body?: unknown, options?: RequestWithTransformOptions) => Promise<InterceptedResponse<T>>;
  put: <T = unknown>(endpoint: string, body?: unknown, options?: RequestWithTransformOptions) => Promise<InterceptedResponse<T>>;
  patch: <T = unknown>(endpoint: string, body?: unknown, options?: RequestWithTransformOptions) => Promise<InterceptedResponse<T>>;
  delete: <T = unknown>(endpoint: string, params?: QueryParams, options?: RequestWithTransformOptions) => Promise<InterceptedResponse<T>>;
  addRequestInterceptor: (interceptor: RequestInterceptor) => void;
  addResponseInterceptor: (interceptor: ResponseInterceptor) => void;
  addErrorInterceptor: (interceptor: ErrorInterceptor) => void;
  addResponseTransformer: (
    pattern: string | RegExp,
    transformer: ResponseTransformer,
    methods?: HttpMethod[]
  ) => void;
  addDynamicHeader: (
    name: string,
    getValue: DynamicHeaderGetter,
    condition?: (request: InterceptedRequest) => boolean
  ) => void;
  removeDynamicHeader: (name: string) => void;
  removeInterceptor: (name: string, type: 'request' | 'response' | 'error') => void;
  removeResponseTransformer: (pattern: string | RegExp) => void;
  setAuth: (auth: AuthConfig) => void;
  clearAuth: () => void;
  getConfig: () => ApiInterceptorConfig;
}

/**
 * Response parsing type. When omitted, the interceptor auto-detects based on Content-Type
 * (application/json → json, otherwise → text). Pass explicitly to force a specific parser,
 * required for binary responses like Excel, PDF, ZIP, images.
 */
export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer';

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
  transform?: ResponseTransformer;
  responseType?: ResponseType;
}

export interface RequestWithTransformOptions {
  params?: QueryParams;
  transform?: ResponseTransformer;
  responseType?: ResponseType;
}
