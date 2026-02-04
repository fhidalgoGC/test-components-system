import type {
  ApiInterceptorConfig,
  ApiInterceptorInstance,
  RequestOptions,
  InterceptedRequest,
  InterceptedResponse,
  InterceptedError,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
  HttpMethod,
  EndpointVisibility,
  QueryParams,
  AuthConfig,
  ResponseTransformer,
  DynamicHeaderGetter,
  DynamicHeaderConfig,
} from './types';

interface DynamicTransformer {
  pattern: string | RegExp;
  methods?: HttpMethod[];
  transformer: ResponseTransformer;
}

const DEFAULT_CONFIG: Partial<ApiInterceptorConfig> = {
  defaultTimeout: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  defaultVisibility: 'public',
  logging: {
    enabled: false,
    level: 'info',
  },
  retry: {
    enabled: false,
    maxRetries: 3,
    retryDelay: 1000,
    retryOn: [408, 429, 500, 502, 503, 504],
  },
};

function buildQueryString(params: QueryParams): string {
  const queryParts: string[] = [];

  const serialize = (key: string, value: unknown): void => {
    if (value === undefined || value === null) return;
    
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([subKey, subValue]) => {
            serialize(`${key}[${index}][${subKey}]`, subValue);
          });
        } else {
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
        }
      });
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        serialize(`${key}[${subKey}]`, subValue);
      });
    } else {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  };

  Object.entries(params).forEach(([key, value]) => {
    serialize(key, value);
  });

  return queryParts.length ? `?${queryParts.join('&')}` : '';
}

interface EndpointMatchResult {
  visibility: EndpointVisibility;
  requiresAuth: boolean;
  headers?: Record<string, string>;
  transform?: ResponseTransformer;
}

function matchEndpoint(
  url: string, 
  method: HttpMethod, 
  config: ApiInterceptorConfig,
  dynamicTransformers: DynamicTransformer[] = []
): EndpointMatchResult {
  const endpoint = config.endpoints?.find((ep) => {
    const pathMatches = typeof ep.pattern === 'string'
      ? url.includes(ep.pattern)
      : ep.pattern.test(url);
    
    const methodMatches = !ep.methods || ep.methods.includes(method);
    
    return pathMatches && methodMatches;
  });

  const dynamicTransformer = dynamicTransformers.find((dt) => {
    const pathMatches = typeof dt.pattern === 'string'
      ? url.includes(dt.pattern)
      : dt.pattern.test(url);
    
    const methodMatches = !dt.methods || dt.methods.includes(method);
    
    return pathMatches && methodMatches;
  });

  return {
    visibility: endpoint?.visibility ?? config.defaultVisibility ?? 'public',
    requiresAuth: endpoint?.requiresAuth ?? (endpoint?.visibility === 'private'),
    headers: endpoint?.headers,
    transform: dynamicTransformer?.transformer ?? endpoint?.transform,
  };
}

async function applyAuthHeaders(
  headers: Record<string, string>,
  auth: AuthConfig
): Promise<Record<string, string>> {
  const newHeaders = { ...headers };
  
  let token: string | null = null;
  
  if (auth.getToken) {
    token = await auth.getToken();
  } else if (auth.tokenKey) {
    token = typeof window !== 'undefined' 
      ? localStorage.getItem(auth.tokenKey) 
      : null;
  }

  if (!token) return newHeaders;

  switch (auth.type) {
    case 'bearer':
      newHeaders['Authorization'] = `Bearer ${token}`;
      break;
    case 'basic':
      newHeaders['Authorization'] = `Basic ${token}`;
      break;
    case 'api-key':
      newHeaders[auth.headerName || 'X-API-Key'] = token;
      break;
    case 'custom':
      if (auth.headerName) {
        newHeaders[auth.headerName] = token;
      }
      break;
  }

  return newHeaders;
}

export function createApiInterceptor(
  userConfig: ApiInterceptorConfig
): ApiInterceptorInstance {
  const config: ApiInterceptorConfig = {
    ...DEFAULT_CONFIG,
    ...userConfig,
    defaultHeaders: {
      ...DEFAULT_CONFIG.defaultHeaders,
      ...userConfig.defaultHeaders,
    },
    logging: {
      enabled: userConfig.logging?.enabled ?? DEFAULT_CONFIG.logging?.enabled ?? false,
      level: userConfig.logging?.level ?? DEFAULT_CONFIG.logging?.level ?? 'info',
      onLog: userConfig.logging?.onLog ?? DEFAULT_CONFIG.logging?.onLog,
    },
    retry: {
      enabled: userConfig.retry?.enabled ?? DEFAULT_CONFIG.retry?.enabled ?? false,
      maxRetries: userConfig.retry?.maxRetries ?? DEFAULT_CONFIG.retry?.maxRetries ?? 3,
      retryDelay: userConfig.retry?.retryDelay ?? DEFAULT_CONFIG.retry?.retryDelay ?? 1000,
      retryOn: userConfig.retry?.retryOn ?? DEFAULT_CONFIG.retry?.retryOn,
    },
  };

  const requestInterceptors: RequestInterceptor[] = [
    ...(config.requestInterceptors || []),
  ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const responseInterceptors: ResponseInterceptor[] = [
    ...(config.responseInterceptors || []),
  ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const errorInterceptors: ErrorInterceptor[] = [
    ...(config.errorInterceptors || []),
  ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const dynamicTransformers: DynamicTransformer[] = [];
  const dynamicHeaders: DynamicHeaderConfig[] = [];

  let currentAuth = config.auth;

  function log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    data?: Record<string, unknown>
  ) {
    if (!config.logging?.enabled) return;
    
    const levels = ['debug', 'info', 'warn', 'error'];
    const configLevel = config.logging.level || 'info';
    
    if (levels.indexOf(level) < levels.indexOf(configLevel)) return;

    const entry = {
      timestamp: new Date(),
      level,
      message,
      ...data,
    };

    if (config.logging.onLog) {
      config.logging.onLog(entry as any);
    } else {
      console[level](`[ApiInterceptor] ${message}`, data);
    }
  }

  async function executeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<InterceptedResponse<T>> {
    const method = options.method || 'GET';
    const fullUrl = `${config.baseUrl}${endpoint}${options.params ? buildQueryString(options.params) : ''}`;
    
    const endpointMatch = matchEndpoint(endpoint, method, config, dynamicTransformers);
    const visibility = options.visibility ?? endpointMatch.visibility;
    const requiresAuth = options.requiresAuth ?? endpointMatch.requiresAuth;

    let headers: Record<string, string> = {
      ...config.defaultHeaders,
      ...endpointMatch.headers,
      ...options.headers,
    };

    if (requiresAuth && currentAuth) {
      headers = await applyAuthHeaders(headers, currentAuth);
    }

    let request: InterceptedRequest = {
      url: fullUrl,
      method,
      headers,
      body: options.body,
      params: options.params,
      visibility,
      requiresAuth,
      metadata: {},
    };

    for (const dynamicHeader of dynamicHeaders) {
      if (dynamicHeader.condition && !dynamicHeader.condition(request)) continue;
      const value = await dynamicHeader.getValue();
      if (value != null) {
        request.headers[dynamicHeader.name] = value;
      }
    }

    for (const interceptor of requestInterceptors) {
      if (interceptor.enabled === false) continue;
      if (interceptor.condition && !interceptor.condition(request)) continue;
      
      request = await interceptor.handler(request);
    }

    log('debug', `Request: ${method} ${fullUrl}`, { request });

    const startTime = Date.now();
    let retryCount = 0;
    const maxRetries = config.retry?.enabled ? (config.retry.maxRetries || 3) : 0;
    const retryOnStatusCodes = config.retry?.retryOn || [408, 429, 500, 502, 503, 504];

    const executeWithRetry = async (): Promise<Response> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          options.timeout || config.defaultTimeout || 30000
        );

        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
          signal: options.signal || controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok && retryCount < maxRetries && retryOnStatusCodes.includes(response.status)) {
          retryCount++;
          log('warn', `Retrying request due to status ${response.status} (${retryCount}/${maxRetries})`, { endpoint });
          await new Promise(resolve => 
            setTimeout(resolve, config.retry?.retryDelay || 1000)
          );
          return executeWithRetry();
        }

        return response;
      } catch (error) {
        if (retryCount < maxRetries) {
          retryCount++;
          log('warn', `Retrying request due to network error (${retryCount}/${maxRetries})`, { endpoint });
          await new Promise(resolve => 
            setTimeout(resolve, config.retry?.retryDelay || 1000)
          );
          return executeWithRetry();
        }
        throw error;
      }
    };

    try {
      const response = await executeWithRetry();
      const endTime = Date.now();

      let data: T;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as unknown as T;
      }

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value: string, key: string) => {
        responseHeaders[key] = value;
      });

      let interceptedResponse: InterceptedResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        request,
        timing: {
          start: startTime,
          end: endTime,
          duration: endTime - startTime,
        },
      };

      if (!response.ok) {
        let error: InterceptedError = {
          status: response.status,
          statusText: response.statusText,
          message: typeof data === 'object' && data && 'message' in data 
            ? String((data as any).message) 
            : response.statusText,
          request,
          response: interceptedResponse,
          retryCount,
        };

        for (const interceptor of errorInterceptors) {
          if (interceptor.enabled === false) continue;
          if (interceptor.statusCodes && !interceptor.statusCodes.includes(error.status)) continue;
          
          error = await interceptor.handler(error);
        }

        if (error.status === 401 && currentAuth?.onAuthError) {
          currentAuth.onAuthError({
            status: error.status,
            message: error.message,
            endpoint,
          });
        }

        log('error', `Request failed: ${method} ${fullUrl}`, { error });
        throw error;
      }

      for (const interceptor of responseInterceptors) {
        if (interceptor.enabled === false) continue;
        if (interceptor.condition && !interceptor.condition(interceptedResponse)) continue;
        
        interceptedResponse = await interceptor.handler(interceptedResponse) as InterceptedResponse<T>;
      }

      if (endpointMatch.transform) {
        interceptedResponse = {
          ...interceptedResponse,
          data: endpointMatch.transform(interceptedResponse.data) as T,
        };
      }

      log('info', `Response: ${method} ${fullUrl}`, { 
        status: response.status, 
        duration: endTime - startTime 
      });

      return interceptedResponse;

    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }

      const interceptedError: InterceptedError = {
        status: 0,
        statusText: 'Network Error',
        message: error instanceof Error ? error.message : 'Unknown error',
        request,
        retryCount,
      };

      log('error', `Network error: ${method} ${fullUrl}`, { error: interceptedError });
      throw interceptedError;
    }
  }

  return {
    request: executeRequest,
    
    get: <T>(endpoint: string, params?: QueryParams) => 
      executeRequest<T>(endpoint, { method: 'GET', params }),
    
    post: <T>(endpoint: string, body?: unknown, params?: QueryParams) => 
      executeRequest<T>(endpoint, { method: 'POST', body, params }),
    
    put: <T>(endpoint: string, body?: unknown, params?: QueryParams) => 
      executeRequest<T>(endpoint, { method: 'PUT', body, params }),
    
    patch: <T>(endpoint: string, body?: unknown, params?: QueryParams) => 
      executeRequest<T>(endpoint, { method: 'PATCH', body, params }),
    
    delete: <T>(endpoint: string, params?: QueryParams) => 
      executeRequest<T>(endpoint, { method: 'DELETE', params }),

    addRequestInterceptor: (interceptor: RequestInterceptor) => {
      requestInterceptors.push(interceptor);
      requestInterceptors.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },

    addResponseInterceptor: (interceptor: ResponseInterceptor) => {
      responseInterceptors.push(interceptor);
      responseInterceptors.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },

    addErrorInterceptor: (interceptor: ErrorInterceptor) => {
      errorInterceptors.push(interceptor);
      errorInterceptors.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },

    addResponseTransformer: (
      pattern: string | RegExp,
      transformer: ResponseTransformer,
      methods?: HttpMethod[]
    ) => {
      const existingIndex = dynamicTransformers.findIndex(dt => {
        if (typeof dt.pattern === 'string' && typeof pattern === 'string') {
          return dt.pattern === pattern;
        }
        if (dt.pattern instanceof RegExp && pattern instanceof RegExp) {
          return dt.pattern.source === pattern.source;
        }
        return false;
      });
      if (existingIndex !== -1) {
        dynamicTransformers[existingIndex] = { pattern, transformer, methods };
      } else {
        dynamicTransformers.push({ pattern, transformer, methods });
      }
    },

    removeResponseTransformer: (pattern: string | RegExp) => {
      const index = dynamicTransformers.findIndex(dt => {
        if (typeof dt.pattern === 'string' && typeof pattern === 'string') {
          return dt.pattern === pattern;
        }
        if (dt.pattern instanceof RegExp && pattern instanceof RegExp) {
          return dt.pattern.source === pattern.source;
        }
        return false;
      });
      if (index !== -1) {
        dynamicTransformers.splice(index, 1);
      }
    },

    addDynamicHeader: (
      name: string,
      getValue: DynamicHeaderGetter,
      condition?: (request: InterceptedRequest) => boolean
    ) => {
      const existingIndex = dynamicHeaders.findIndex(h => h.name === name);
      if (existingIndex !== -1) {
        dynamicHeaders[existingIndex] = { name, getValue, condition };
      } else {
        dynamicHeaders.push({ name, getValue, condition });
      }
    },

    removeDynamicHeader: (name: string) => {
      const index = dynamicHeaders.findIndex(h => h.name === name);
      if (index !== -1) {
        dynamicHeaders.splice(index, 1);
      }
    },

    removeInterceptor: (name: string, type: 'request' | 'response' | 'error') => {
      const list = type === 'request' 
        ? requestInterceptors 
        : type === 'response' 
          ? responseInterceptors 
          : errorInterceptors;
      
      const index = list.findIndex(i => i.name === name);
      if (index !== -1) {
        list.splice(index, 1);
      }
    },

    setAuth: (auth: AuthConfig) => {
      currentAuth = auth;
    },

    clearAuth: () => {
      currentAuth = undefined;
    },

    getConfig: () => ({ ...config }),
  };
}
