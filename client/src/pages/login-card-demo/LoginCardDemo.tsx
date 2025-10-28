import { LoginCard, type LoginProvider } from '@/lib/ui-library/components/LoginCard';
import { SiGoogle, SiGithub, SiApple, SiFacebook, SiLinkedin } from 'react-icons/si';
import { useState } from 'react';

const LoginCardDemoPage = () => {
  const [selectedProvider, setSelectedProvider] = useState<LoginProvider | null>(null);
  const [loginData, setLoginData] = useState<any>(null);

  const providersWithCredentials: LoginProvider[] = [
    { provider: 'SSO', label: 'SSO', icon: <span className="text-2xl">🔐</span> },
    { provider: 'Google', label: '', icon: <SiGoogle className="text-2xl" /> },
    { provider: 'Microsoft', label: '', icon: <span className="text-2xl">Ⓜ️</span> },
  ];

  const providersOnly: LoginProvider[] = [
    { provider: 'Google', label: 'Continuar con Google', icon: <SiGoogle className="text-xl" /> },
    { provider: 'GitHub', label: 'Continuar con GitHub', icon: <SiGithub className="text-xl" /> },
  ];

  const manyProviders: LoginProvider[] = [
    { provider: 'Google', label: 'Google', icon: <SiGoogle className="text-xl" /> },
    { provider: 'Microsoft', label: 'Microsoft', icon: <span className="text-xl">Ⓜ️</span> },
    { provider: 'GitHub', label: 'GitHub', icon: <SiGithub className="text-xl" /> },
    { provider: 'Apple', label: 'Apple', icon: <SiApple className="text-xl" /> },
    { provider: 'Facebook', label: 'Facebook', icon: <SiFacebook className="text-xl" /> },
    { provider: 'LinkedIn', label: 'LinkedIn', icon: <SiLinkedin className="text-xl" /> },
  ];

  const handleProviderSelect = (provider: LoginProvider) => {
    setSelectedProvider(provider);
    console.log('Provider selected:', provider);
  };

  const handleEmailLogin = (email: string, password: string, rememberMe: boolean) => {
    setLoginData({ email, password, rememberMe });
    console.log('Email login:', { email, password, rememberMe });
  };

  const handleShowAllProviders = () => {
    console.log('Show all providers clicked');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold" data-testid="text-title">LoginCard Demo</h1>
          <p className="text-muted-foreground" data-testid="text-description">
            Ejemplos del componente LoginCard con diferentes configuraciones
          </p>
        </div>

        {selectedProvider && (
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg" data-testid="alert-provider-selected">
            <p className="font-semibold">Proveedor seleccionado: {selectedProvider.provider}</p>
            <button
              onClick={() => setSelectedProvider(null)}
              className="text-sm underline mt-2"
              data-testid="button-clear-selection"
            >
              Limpiar
            </button>
          </div>
        )}

        {loginData && (
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg" data-testid="alert-login-data">
            <p className="font-semibold">Login con credenciales:</p>
            <p className="text-sm">Email: {loginData.email}</p>
            <p className="text-sm">Remember me: {loginData.rememberMe ? 'Yes' : 'No'}</p>
            <button
              onClick={() => setLoginData(null)}
              className="text-sm underline mt-2"
              data-testid="button-clear-login"
            >
              Limpiar
            </button>
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" data-testid="text-section-with-credentials">
            1. Login con Proveedores + Credenciales
          </h2>
          <p className="text-muted-foreground" data-testid="text-description-with-credentials">
            Configuración con proveedores externos (máximo 4 visibles) y campos de email/password.
            Basado en el diseño de Miro.
          </p>
          
          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={providersWithCredentials}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log('Forgot password')}
              onSignInDifferentRegion={() => console.log('Different region')}
              onResetPassword={() => console.log('Reset password')}
              title="Sign in to Miro"
              dataTestId="logincard-with-credentials"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" data-testid="text-section-providers-only">
            2. Login Solo con Proveedores
          </h2>
          <p className="text-muted-foreground" data-testid="text-description-providers-only">
            Configuración con solo proveedores externos, sin campos de credenciales.
          </p>
          
          <div className="flex justify-center">
            <LoginCard
              config="providers-only"
              providers={providersOnly}
              onProviderSelect={handleProviderSelect}
              title="Bienvenido"
              subtitle="Inicia sesión para acceder a tu cuenta"
              dataTestId="logincard-providers-only"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" data-testid="text-section-many-providers">
            3. Múltiples Proveedores (con botón "más")
          </h2>
          <p className="text-muted-foreground" data-testid="text-description-many-providers">
            Cuando hay más de 4 proveedores, se muestra un botón "+" que permite ver todos.
          </p>
          
          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={manyProviders}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log('Forgot password')}
              onShowAllProviders={handleShowAllProviders}
              title="Sign in to App"
              dataTestId="logincard-many-providers"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold" data-testid="text-section-custom-data">
            4. Proveedores con Data Custom
          </h2>
          <p className="text-muted-foreground" data-testid="text-description-custom-data">
            Los proveedores pueden incluir data adicional que se puede usar en el callback.
          </p>
          
          <div className="flex justify-center">
            <LoginCard
              config="providers-only"
              providers={[
                { 
                  provider: 'Google', 
                  label: 'Google Workspace', 
                  icon: <SiGoogle className="text-xl" />,
                  data: { domain: 'company.com', type: 'workspace' }
                },
                { 
                  provider: 'GitHub', 
                  label: 'GitHub Enterprise', 
                  icon: <SiGithub className="text-xl" />,
                  data: { org: 'my-company', type: 'enterprise' }
                },
              ]}
              onProviderSelect={(provider) => {
                console.log('Provider with data:', provider);
                setSelectedProvider(provider);
              }}
              title="Enterprise Login"
              subtitle="Select your organization provider"
              dataTestId="logincard-custom-data"
            />
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 p-6 rounded-lg border space-y-4">
          <h2 className="text-xl font-semibold">Características</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Dos configuraciones: <code>with-credentials</code> y <code>providers-only</code></li>
            <li>Máximo 4 proveedores visibles, botón "+" para ver todos</li>
            <li>Soporte para iconos y labels personalizados</li>
            <li>Data custom en cada proveedor</li>
            <li>Callbacks para todas las acciones</li>
            <li>Soporte para i18n (inglés y español)</li>
            <li>Diseño responsive (mobile y web)</li>
            <li>Dark mode support</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LoginCardDemoPage;
