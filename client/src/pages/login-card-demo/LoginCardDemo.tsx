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

const LoginCardDemoPage = () => {
  const providersWithCredentials: LoginProvider[] = [
    { provider: "SSO", icon: <span className="text-2xl">🔐</span> },
    { provider: "Google", icon: <SiGoogle className="text-2xl" /> },
    { provider: "Microsoft", icon: <span className="text-2xl">Ⓜ️</span> },
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
    },
    {
      provider: "GitHub",
      label: {
        en: "Continue with GitHub",
        es: "Continuar con GitHub",
        default: "Continue with GitHub",
      },
      icon: <SiGithub className="text-xl" />,
    },
  ];

  const manyProviders: LoginProvider[] = [
    { provider: "Google", icon: <SiGoogle className="text-xl" /> },
    { provider: "Microsoft", icon: <span className="text-xl">Ⓜ️</span> },
    { provider: "GitHub", icon: <SiGithub className="text-xl" /> },
    { provider: "Apple", icon: <SiApple className="text-xl" /> },
    { provider: "Facebook", icon: <SiFacebook className="text-xl" /> },
    { provider: "LinkedIn", icon: <SiLinkedin className="text-xl" /> },
  ];

  const handleProviderSelect = (provider: LoginProvider) => {
    console.log("Provider selected:", provider);
  };

  const handleEmailLogin = (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    console.log("Email login:", { email, password, rememberMe });
  };

  const handleShowAllProviders = () => {
    console.log("Show all providers clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="space-y-8 max-w-md w-full">
        <LoginCard
          config="with-credentials"
          providers={providersWithCredentials}
          onProviderSelect={handleProviderSelect}
          onEmailLogin={handleEmailLogin}
          onForgotPassword={() => console.log("Forgot password")}
          onResetPassword={() => console.log("Reset password")}
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
          dataTestId="logincard-with-credentials"
        />
      </div>
    </div>
  );
};

export default LoginCardDemoPage;
