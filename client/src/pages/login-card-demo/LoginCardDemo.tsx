import {
  LoginCard,
  type LoginProvider,
} from "@/lib/ui-library/components/LoginCard";
import {
  SiGoogle,
  SiGithub,
  SiApple,
  SiFacebook,
  SiLinkedin,
  SiMiro,
  SiSlack,
  SiNotion,
} from "react-icons/si";
import { Lock, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

const LoginCardDemoPage = () => {
  const [selectedProvider, setSelectedProvider] =
    useState<LoginProvider | null>(null);
  const [loginData, setLoginData] = useState<any>(null);

  const twoProviders: LoginProvider[] = [
    { 
      provider: "Google", 
      icon: <SiGoogle className="text-2xl" />,
      data: { scope: "email profile", clientId: "google-client-123" }
    },
    { 
      provider: "GitHub", 
      icon: <SiGithub className="text-2xl" />,
      data: { scope: "user:email", allowSignup: true }
    },
  ];

  const threeProviders: LoginProvider[] = [
    { 
      provider: "Google", 
      icon: <SiGoogle className="text-2xl" />,
      data: { scope: "email profile", clientId: "google-client-123" }
    },
    { 
      provider: "GitHub", 
      icon: <SiGithub className="text-2xl" />,
      data: { scope: "user:email", allowSignup: true }
    },
    { 
      provider: "Apple", 
      icon: <SiApple className="text-2xl" />,
      data: { type: "oauth2" }
    },
  ];

  const fourProviders: LoginProvider[] = [
    { 
      provider: "Google", 
      icon: <SiGoogle className="text-2xl" />,
      data: { scope: "email profile" }
    },
    { 
      provider: "GitHub", 
      icon: <SiGithub className="text-2xl" />,
      data: { scope: "user:email" }
    },
    { 
      provider: "Apple", 
      icon: <SiApple className="text-2xl" />,
      data: { type: "oauth2" }
    },
    { 
      provider: "Facebook", 
      icon: <SiFacebook className="text-2xl" />,
      data: { type: "oauth2" }
    },
  ];

  const fiveProviders: LoginProvider[] = [
    { 
      provider: "Google", 
      icon: <SiGoogle className="text-2xl" />,
      data: { scope: "email profile", clientId: "google-client-123" }
    },
    { 
      provider: "GitHub", 
      icon: <SiGithub className="text-2xl" />,
      data: { scope: "user:email", allowSignup: true }
    },
    { 
      provider: "Apple", 
      icon: <SiApple className="text-2xl" />,
      data: { type: "oauth2" }
    },
    { 
      provider: "Facebook", 
      icon: <SiFacebook className="text-2xl" />,
      data: { type: "oauth2" }
    },
    { 
      provider: "LinkedIn", 
      icon: <SiLinkedin className="text-2xl" />,
      data: { type: "oauth2" }
    },
  ];

  const providersOnly: LoginProvider[] = [
    {
      provider: "Google",
      label: {
        en: "Continue with Google",
        es: "Continuar con Google",
        default: "Continue with Google",
      },
      icon: <SiGoogle className="text-xl" />,
      data: { scope: "email profile", prompt: "consent" }
    },
    {
      provider: "GitHub",
      label: {
        en: "Continue with GitHub",
        es: "Continuar con GitHub",
        default: "Continue with GitHub",
      },
      icon: <SiGithub className="text-xl" />,
      data: { scope: "user:email", allowSignup: true }
    },
  ];

  const manyProviders: LoginProvider[] = [
    { 
      provider: "Google", 
      icon: <SiGoogle className="text-xl" />,
      data: { type: "oauth2", priority: 1 }
    },
    { 
      provider: "Microsoft", 
      icon: <span className="text-xl">Ⓜ️</span>,
      data: { type: "oauth2", priority: 2 }
    },
    { 
      provider: "GitHub", 
      icon: <SiGithub className="text-xl" />,
      data: { type: "oauth2", priority: 3 }
    },
    { 
      provider: "Apple", 
      icon: <SiApple className="text-xl" />,
      data: { type: "oauth2", priority: 4 }
    },
    { 
      provider: "Facebook", 
      icon: <SiFacebook className="text-xl" />,
      data: { type: "oauth2", priority: 5 }
    },
    { 
      provider: "LinkedIn", 
      icon: <SiLinkedin className="text-xl" />,
      data: { type: "oauth2", priority: 6 }
    },
  ];

  // Providers with custom components and redirects
  const customComponentProviders: LoginProvider[] = [
    {
      provider: "Slack",
      component: (
        <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
          <SiSlack className="text-3xl text-purple-600" />
          <span className="text-xs font-medium">Slack</span>
          <span className="absolute top-1 right-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            New
          </span>
        </div>
      ),
      redirect: {
        external: true,
        url: "https://slack.com/oauth/authorize",
        newTab: true,
      },
      data: { type: "oauth2", hasCustomComponent: true }
    },
    {
      provider: "Notion",
      component: (
        <div className="flex flex-col items-center justify-center gap-1 w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-lg">
          <SiNotion className="text-3xl" />
          <span className="text-xs font-semibold">Notion</span>
        </div>
      ),
      redirect: {
        external: true,
        url: "https://api.notion.com/v1/oauth/authorize",
        newTab: false,
      },
      data: { type: "oauth2", hasCustomComponent: true }
    },
    {
      provider: "Premium",
      component: (
        <div className="flex flex-col items-center justify-center gap-1 w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-lg relative overflow-hidden">
          <Sparkles className="text-2xl absolute top-1 left-1 animate-pulse" />
          <Zap className="text-3xl" />
          <span className="text-xs font-bold">Premium</span>
        </div>
      ),
      data: { type: "premium", hasCustomComponent: true }
    },
  ];

  const handleProviderSelect = (provider: LoginProvider) => {
    setSelectedProvider(provider);
    console.log("Provider selected:", provider);
  };

  const handleEmailLogin = (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    setLoginData({ email, password, rememberMe });
    console.log("Email login:", { email, password, rememberMe });
  };

  const handleShowAllProviders = () => {
    console.log("Show all providers clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto p-6 space-y-8">
        {selectedProvider && (
          <div
            className="bg-green-100 dark:bg-green-900 p-4 rounded-lg"
            data-testid="alert-provider-selected"
          >
            <p className="font-semibold">
              Proveedor seleccionado: {selectedProvider.provider}
            </p>
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
          <div
            className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg"
            data-testid="alert-login-data"
          >
            <p className="font-semibold">Login con credenciales:</p>
            <p className="text-sm">Email: {loginData.email}</p>
            <p className="text-sm">
              Remember me: {loginData.rememberMe ? "Yes" : "No"}
            </p>
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
          <h2 className="text-2xl font-semibold">
            1. Con 2 Proveedores + Email (Vertical)
          </h2>
          <p className="text-muted-foreground">
            2 botones verticales grandes con email/password
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={twoProviders}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log("Forgot password")}
              title={{
                en: "Sign in to App",
                es: "Iniciar sesión en App",
                default: "Sign in to App",
              }}
              icon={<Lock className="w-12 h-12" />}
              dataTestId="logincard-two-providers"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. Con 3 Proveedores + Email (Grid)
          </h2>
          <p className="text-muted-foreground">
            Grid de 3 cuadrados con email/password
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={threeProviders}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log("Forgot password")}
              title={{
                en: "Sign in to App",
                es: "Iniciar sesión en App",
                default: "Sign in to App",
              }}
              icon={<Lock className="w-12 h-12" />}
              dataTestId="logincard-three-providers"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Con 4 Proveedores + Email (Grid)
          </h2>
          <p className="text-muted-foreground">
            Grid de 4 cuadrados con email/password
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={fourProviders}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log("Forgot password")}
              title={{
                en: "Sign in to Miro",
                es: "Iniciar sesión en Miro",
                default: "Sign in to Miro",
              }}
              icon={
                <div className="w-20 h-20 bg-white rounded-2xl border-2 border-gray-200 flex items-center justify-center">
                  <SiMiro className="text-5xl text-blue-500" />
                </div>
              }
              dataTestId="logincard-four-providers"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Con 5 Proveedores + Email (Grid + More)
          </h2>
          <p className="text-muted-foreground">
            3 cuadrados + botón "more providers" + email/password
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={fiveProviders}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log("Forgot password")}
              title={{
                en: "Sign in to App",
                es: "Iniciar sesión en App",
                default: "Sign in to App",
              }}
              icon={<Lock className="w-12 h-12" />}
              dataTestId="logincard-five-providers"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Componentes Custom con Redirect
          </h2>
          <p className="text-muted-foreground">
            Grid con componentes personalizados que usan el atributo <code>component</code> y <code>redirect</code>
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={customComponentProviders}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log("Forgot password")}
              title={{
                en: "Sign in with Custom Providers",
                es: "Iniciar sesión con Proveedores Personalizados",
                default: "Sign in with Custom Providers",
              }}
              subtitle={{
                en: "Try custom components with redirect",
                es: "Prueba componentes personalizados con redirección",
                default: "Try custom components with redirect",
              }}
              icon={<Sparkles className="w-12 h-12 text-purple-600" />}
              dataTestId="logincard-custom-components"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Solo Proveedores (Sin Email)
          </h2>
          <p className="text-muted-foreground">
            Configuración "providers-only" con botones horizontales grandes
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="providers-only"
              providers={providersOnly}
              onProviderSelect={handleProviderSelect}
              title={{
                en: "Sign in to App",
                es: "Iniciar sesión en App",
                default: "Sign in to App",
              }}
              subtitle={{
                en: "Choose your preferred login method",
                es: "Elige tu método de inicio de sesión",
                default: "Choose your preferred login method",
              }}
              icon={<Lock className="w-12 h-12" />}
              dataTestId="logincard-providers-only"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            7. Solo Email (Sin Proveedores)
          </h2>
          <p className="text-muted-foreground">
            Solo email/password sin proveedores externos
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={[]}
              onProviderSelect={handleProviderSelect}
              onEmailLogin={handleEmailLogin}
              onForgotPassword={() => console.log("Forgot password")}
              title={{
                en: "Sign in with Email",
                es: "Iniciar sesión con Email",
                default: "Sign in with Email",
              }}
              subtitle={{
                en: "Enter your credentials",
                es: "Ingresa tus credenciales",
                default: "Enter your credentials",
              }}
              icon={<Lock className="w-12 h-12" />}
              dataTestId="logincard-email-only"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginCardDemoPage;
