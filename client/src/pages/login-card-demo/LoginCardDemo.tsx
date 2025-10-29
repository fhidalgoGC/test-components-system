import { LoginCard, type LoginProvider } from '@/lib/ui-library/components/LoginCard';
import { SiGoogle, SiGithub, SiApple, SiFacebook, SiLinkedin, SiMiro } from 'react-icons/si';
import { Lock } from 'lucide-react';
import { useState } from 'react';

const LoginCardDemoPage = () => {
  const [selectedProvider, setSelectedProvider] = useState<LoginProvider | null>(null);
  const [loginData, setLoginData] = useState<any>(null);

  const providersWithCredentials: LoginProvider[] = [
    { provider: 'SSO', icon: <span className="text-2xl">🔐</span> },
    { provider: 'Google', icon: <SiGoogle className="text-2xl" /> },
    { provider: 'Microsoft', icon: <span className="text-2xl">Ⓜ️</span> },
  ];

  const providersOnly: LoginProvider[] = [
    { 
      provider: 'Google', 
      label: { en: 'Continue with Google', es: 'Continuar con Google', default: 'Continue with Google' }, 
      icon: <SiGoogle className="text-xl" /> 
    },
    { 
      provider: 'GitHub', 
      label: { en: 'Continue with GitHub', es: 'Continuar con GitHub', default: 'Continue with GitHub' }, 
      icon: <SiGithub className="text-xl" /> 
    },
  ];

  const manyProviders: LoginProvider[] = [
    { provider: 'Google', icon: <SiGoogle className="text-xl" /> },
    { provider: 'Microsoft', icon: <span className="text-xl">Ⓜ️</span> },
    { provider: 'GitHub', icon: <SiGithub className="text-xl" /> },
    { provider: 'Apple', icon: <SiApple className="text-xl" /> },
    { provider: 'Facebook', icon: <SiFacebook className="text-xl" /> },
    { provider: 'LinkedIn', icon: <SiLinkedin className="text-xl" /> },
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
              onResetPassword={() => console.log('Reset password')}
              title={{ en: 'Sign in to Miro', es: 'Iniciar sesión en Miro', default: 'Sign in to Miro' }}
              icon={
                <div className="w-20 h-20 bg-white rounded-2xl border-2 border-gray-200 flex items-center justify-center">
                  <SiMiro className="text-5xl text-blue-500" />
                </div>
              }
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
              title={{ en: 'Welcome', es: 'Bienvenido', default: 'Welcome' }}
              subtitle={{ en: 'Sign in to access your account', es: 'Inicia sesión para acceder a tu cuenta', default: 'Sign in to access your account' }}
              icon={<Lock className="w-14 h-14 text-primary" />}
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
              title={{ en: 'Sign in to App', es: 'Iniciar sesión en App', default: 'Sign in to App' }}
              icon={
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              }
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
                  label: { en: 'Google Workspace', es: 'Google Workspace', default: 'Google Workspace' }, 
                  icon: <SiGoogle className="text-xl" />,
                  data: { domain: 'company.com', type: 'workspace' }
                },
                { 
                  provider: 'GitHub', 
                  label: { en: 'GitHub Enterprise', es: 'GitHub Enterprise', default: 'GitHub Enterprise' }, 
                  icon: <SiGithub className="text-xl" />,
                  data: { org: 'my-company', type: 'enterprise' }
                },
              ]}
              onProviderSelect={(provider) => {
                console.log('Provider with data:', provider);
                setSelectedProvider(provider);
              }}
              title={{ en: 'Enterprise Login', es: 'Inicio de Sesión Empresarial', default: 'Enterprise Login' }}
              subtitle={{ en: 'Select your organization provider', es: 'Selecciona el proveedor de tu organización', default: 'Select your organization provider' }}
              icon={
                <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center">
                  <SiGithub className="text-3xl text-white dark:text-gray-900" />
                </div>
              }
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
