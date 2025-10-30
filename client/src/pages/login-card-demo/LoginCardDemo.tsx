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
} from "react-icons/si";
import { Lock } from "lucide-react";
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
      provider: "SSO", 
      icon: <span className="text-2xl">🔐</span>,
      data: { authType: "saml", domain: "company.com" },
      component: (
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔐</span>
          <div className="flex flex-col items-start">
            <span className="font-semibold">SSO Login</span>
            <span className="text-xs text-gray-500">company.com</span>
          </div>
        </div>
      )
    },
    { 
      provider: "Google", 
      icon: <SiGoogle className="text-2xl" />,
      data: { scope: "email profile", clientId: "google-client-123" }
    },
    { 
      provider: "Microsoft", 
      icon: <span className="text-2xl">Ⓜ️</span>,
      data: { tenant: "common", redirectUri: "/auth/callback" }
    },
  ];

  const fiveProviders: LoginProvider[] = [
    { 
      provider: "SSO", 
      icon: <span className="text-2xl">🔐</span>,
      data: { authType: "saml", domain: "company.com" }
    },
    { 
      provider: "Google", 
      icon: <SiGoogle className="text-2xl" />,
      data: { scope: "email profile", clientId: "google-client-123" }
    },
    { 
      provider: "Microsoft", 
      icon: <span className="text-2xl">Ⓜ️</span>,
      data: { tenant: "common", redirectUri: "/auth/callback" }
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
            1. Con 2 Proveedores (Vertical)
          </h2>
          <p className="text-muted-foreground">
            Con 2 o menos proveedores, se muestran en botones verticales completos.
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
            2. Con 3 Proveedores (Grid)
          </h2>
          <p className="text-muted-foreground">
            Con 3-4 proveedores, se muestran en grid de cuadrados.
          </p>

          <div className="flex justify-center">
            <LoginCard
              config="with-credentials"
              providers={threeProviders}
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
              dataTestId="logincard-three-providers"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Con 5 Proveedores (Grid + More)
          </h2>
          <p className="text-muted-foreground">
            Con 5+ proveedores, se muestran 3 en grid + botón "more providers".
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
      </div>
    </div>
  );
};

export default LoginCardDemoPage;
