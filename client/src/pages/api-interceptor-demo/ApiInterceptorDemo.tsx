import { useState, useCallback } from 'react';
import { createApiInterceptor } from '@/lib/ui-library/utils/interceptors';
import type { InterceptedResponse, InterceptedError } from '@/lib/ui-library/utils/interceptors';

interface User {
  id: number;
  name: string;
  email: string;
  fullName?: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface LogEntry {
  id: number;
  type: 'request' | 'response' | 'error' | 'info';
  message: string;
  data?: unknown;
  timestamp: Date;
}

const api = createApiInterceptor({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  defaultVisibility: 'public',
  endpoints: [
    { 
      pattern: '/users', 
      visibility: 'public',
      transform: (data) => {
        if (Array.isArray(data)) {
          return data.map((u: any) => ({ ...u, fullName: `${u.name} (transformed)` }));
        }
        const obj = data as Record<string, unknown>;
        return { ...obj, fullName: `${obj.name} (transformed)` };
      }
    },
    { pattern: '/posts', visibility: 'public' },
    { pattern: '/admin', visibility: 'private', requiresAuth: true },
  ],
  requestInterceptors: [
    {
      name: 'log-requests',
      handler: (request) => {
        console.log('[Interceptor] Request:', request.method, request.url);
        return request;
      },
    },
    {
      name: 'admin-header',
      pathPattern: '/admin',
      handler: (request) => ({
        ...request,
        headers: { ...request.headers, 'X-Admin-Mode': 'true' },
      }),
    },
  ],
  responseInterceptors: [
    {
      name: 'log-responses',
      handler: (response) => {
        console.log('[Interceptor] Response:', response.status, response.request.url);
        return response;
      },
    },
  ],
  errorInterceptors: [
    {
      name: 'log-errors',
      handler: (error) => {
        console.error('[Interceptor] Error:', error.status, error.message);
        return error;
      },
    },
  ],
  logging: {
    enabled: true,
    level: 'debug',
  },
});

export function ApiInterceptorDemo() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>('');
  const [dynamicHeaderValue, setDynamicHeaderValue] = useState<string>('');

  const addLog = useCallback((type: LogEntry['type'], message: string, data?: unknown) => {
    setLogs(prev => [...prev, { 
      id: Date.now(), 
      type, 
      message, 
      data,
      timestamp: new Date() 
    }]);
  }, []);

  const clearLogs = () => setLogs([]);

  const handleGetUsers = async () => {
    setLoading(true);
    addLog('info', 'Fetching users with config transform...');
    try {
      const response = await api.get<User[]>('/users');
      addLog('response', `Got ${response.data.length} users`, response.data.slice(0, 2));
    } catch (error) {
      addLog('error', 'Failed to fetch users', error);
    }
    setLoading(false);
  };

  const handleGetUsersWithInlineTransform = async () => {
    setLoading(true);
    addLog('info', 'Fetching users with INLINE transform (overrides config)...');
    try {
      const response = await api.get<User[]>('/users', undefined, {
        transform: (data) => (data as any[]).map(u => ({ 
          ...u, 
          fullName: `INLINE: ${u.name}` 
        }))
      });
      addLog('response', `Got ${response.data.length} users with inline transform`, response.data.slice(0, 2));
    } catch (error) {
      addLog('error', 'Failed to fetch users', error);
    }
    setLoading(false);
  };

  const handleGetPosts = async () => {
    setLoading(true);
    addLog('info', 'Fetching posts (no transform)...');
    try {
      const response = await api.get<Post[]>('/posts');
      addLog('response', `Got ${response.data.length} posts`, response.data.slice(0, 2));
    } catch (error) {
      addLog('error', 'Failed to fetch posts', error);
    }
    setLoading(false);
  };

  const handlePostWithParams = async () => {
    setLoading(true);
    addLog('info', 'Creating post with body...');
    try {
      const response = await api.post<Post>('/posts', {
        title: 'Test Post',
        body: 'This is a test post body',
        userId: 1
      });
      addLog('response', 'Post created', response.data);
    } catch (error) {
      addLog('error', 'Failed to create post', error);
    }
    setLoading(false);
  };

  const handleSetAuth = () => {
    if (!token) {
      addLog('error', 'Please enter a token first');
      return;
    }
    api.setAuth({
      type: 'bearer',
      getToken: () => token,
      onAuthError: (error) => {
        addLog('error', `Auth error on ${error.endpoint}: ${error.message}`);
      },
    });
    addLog('info', `Auth configured with Bearer token: ${token.substring(0, 10)}...`);
  };

  const handleClearAuth = () => {
    api.clearAuth();
    setToken('');
    addLog('info', 'Auth cleared');
  };

  const handleAddDynamicHeader = () => {
    if (!dynamicHeaderValue) {
      addLog('error', 'Please enter a header value first');
      return;
    }
    api.addDynamicHeader('X-Custom-Header', () => dynamicHeaderValue);
    addLog('info', `Dynamic header added: X-Custom-Header = ${dynamicHeaderValue}`);
  };

  const handleRemoveDynamicHeader = () => {
    api.removeDynamicHeader('X-Custom-Header');
    setDynamicHeaderValue('');
    addLog('info', 'Dynamic header removed: X-Custom-Header');
  };

  const handleAddDynamicTransformer = () => {
    api.addResponseTransformer('/comments', (data) => {
      return (data as any[]).map(c => ({ ...c, _dynamicTransform: true }));
    });
    addLog('info', 'Dynamic transformer added for /comments');
  };

  const handleTestDynamicTransformer = async () => {
    setLoading(true);
    addLog('info', 'Fetching comments (with dynamic transformer)...');
    try {
      const response = await api.get<any[]>('/comments');
      addLog('response', `Got ${response.data.length} comments`, response.data.slice(0, 2));
    } catch (error) {
      addLog('error', 'Failed to fetch comments', error);
    }
    setLoading(false);
  };

  const handleTestError = async () => {
    setLoading(true);
    addLog('info', 'Testing error handling (404)...');
    try {
      await api.get('/nonexistent-endpoint-12345');
      addLog('response', 'Unexpected success');
    } catch (error) {
      const e = error as InterceptedError;
      addLog('error', `Error caught: ${e.status} - ${e.message}`, e);
    }
    setLoading(false);
  };

  const handleAddPathInterceptor = () => {
    api.addRequestInterceptor({
      name: 'posts-only-header',
      pathPattern: '/posts',
      handler: (request) => {
        addLog('info', '[PathInterceptor] Adding header for /posts path');
        return {
          ...request,
          headers: { ...request.headers, 'X-Posts-Only': 'true' },
        };
      },
    });
    addLog('info', 'Path-specific interceptor added for /posts');
  };

  const handleRemovePathInterceptor = () => {
    api.removeInterceptor('posts-only-header', 'request');
    addLog('info', 'Path-specific interceptor removed');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2" data-testid="title-api-interceptor">ApiInterceptor Demo</h1>
      <p className="text-gray-600 mb-6">
        Prueba las diferentes funcionalidades del ApiInterceptor. 
        Revisa la consola del navegador para ver los logs detallados.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Section title="Basic Requests">
            <div className="space-y-2">
              <Button onClick={handleGetUsers} disabled={loading} testId="btn-get-users">
                GET /users (with config transform)
              </Button>
              <Button onClick={handleGetUsersWithInlineTransform} disabled={loading} testId="btn-get-users-inline">
                GET /users (with inline transform)
              </Button>
              <Button onClick={handleGetPosts} disabled={loading} testId="btn-get-posts">
                GET /posts (no transform)
              </Button>
              <Button onClick={handlePostWithParams} disabled={loading} testId="btn-post-create">
                POST /posts (create)
              </Button>
              <Button onClick={handleTestError} disabled={loading} testId="btn-test-error">
                Test Error (404)
              </Button>
            </div>
          </Section>

          <Section title="Authentication">
            <div className="space-y-2">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter Bearer token..."
                className="w-full px-3 py-2 border rounded-lg"
                data-testid="input-token"
              />
              <div className="flex gap-2">
                <Button onClick={handleSetAuth} disabled={!token} testId="btn-set-auth">
                  Set Auth
                </Button>
                <Button onClick={handleClearAuth} variant="secondary" testId="btn-clear-auth">
                  Clear Auth
                </Button>
              </div>
            </div>
          </Section>

          <Section title="Dynamic Headers">
            <div className="space-y-2">
              <input
                type="text"
                value={dynamicHeaderValue}
                onChange={(e) => setDynamicHeaderValue(e.target.value)}
                placeholder="Header value..."
                className="w-full px-3 py-2 border rounded-lg"
                data-testid="input-dynamic-header"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddDynamicHeader} disabled={!dynamicHeaderValue} testId="btn-add-header">
                  Add Dynamic Header
                </Button>
                <Button onClick={handleRemoveDynamicHeader} variant="secondary" testId="btn-remove-header">
                  Remove Header
                </Button>
              </div>
            </div>
          </Section>

          <Section title="Dynamic Transformers">
            <div className="space-y-2">
              <Button onClick={handleAddDynamicTransformer} testId="btn-add-transformer">
                Add Transformer for /comments
              </Button>
              <Button onClick={handleTestDynamicTransformer} disabled={loading} testId="btn-test-transformer">
                Test GET /comments
              </Button>
            </div>
          </Section>

          <Section title="Path-specific Interceptors">
            <div className="space-y-2">
              <Button onClick={handleAddPathInterceptor} testId="btn-add-path-interceptor">
                Add Interceptor for /posts
              </Button>
              <Button onClick={handleRemovePathInterceptor} variant="secondary" testId="btn-remove-path-interceptor">
                Remove Interceptor
              </Button>
            </div>
          </Section>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Activity Log</h2>
            <Button onClick={clearLogs} variant="secondary" size="sm" testId="btn-clear-logs">
              Clear
            </Button>
          </div>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 h-[600px] overflow-y-auto font-mono text-sm" data-testid="logs-container">
            {logs.length === 0 ? (
              <p className="text-gray-500">No activity yet. Try some actions!</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="mb-2 border-b border-gray-700 pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${getLogTypeColor(log.type)}`}>
                      {log.type.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1">{log.message}</p>
                  {log.data !== undefined && (
                    <pre className="mt-1 text-xs text-gray-400 overflow-x-auto">
                      {String(JSON.stringify(log.data, null, 2))}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getLogTypeColor(type: LogEntry['type']): string {
  switch (type) {
    case 'request': return 'bg-blue-600';
    case 'response': return 'bg-green-600';
    case 'error': return 'bg-red-600';
    case 'info': return 'bg-gray-600';
    default: return 'bg-gray-600';
  }
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  testId?: string;
}

type ReactNode = React.ReactNode;

function Button({ onClick, disabled, children, variant = 'primary', size = 'md', testId }: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeClasses = size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2';
  const variantClasses = variant === 'primary' 
    ? 'bg-blue-600 text-white hover:bg-blue-700' 
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} w-full`}
      data-testid={testId}
    >
      {children}
    </button>
  );
}
