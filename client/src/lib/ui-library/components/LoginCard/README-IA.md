# LoginCard Component

## Overview

`LoginCard` is a versatile authentication component that supports multiple login configurations, including email/password credentials and third-party authentication providers (OAuth, SSO, etc.). It features adaptive layouts based on provider count, custom component rendering, automatic redirects, and comprehensive internationalization support.

## Features

- **Dual Configuration Modes**
  - `with-credentials`: Email/password + external providers
  - `providers-only`: External providers only
  
- **Adaptive Provider Layouts**
  - 1-2 providers: Vertical layout with full-width buttons
  - 3-4 providers: Horizontal grid with equal-width square buttons
  - 5+ providers: 3 buttons + "more providers" button in single row
  
- **Custom Component Rendering**
  - Use the `component` attribute to render custom React components inside provider buttons
  - Components automatically adapt to button container size
  
- **Automatic Redirects**
  - Support for both internal and external redirects via `redirect` attribute
  - Control new tab behavior
  - Automatic navigation when clicking providers
  
- **Internationalization (i18n)**
  - Built-in support for English (en) and Spanish (es)
  - All labels use `MultiLanguageLabel` interface for reactive language switching
  - Hierarchical i18n system with global and component-specific translations
  
- **Responsive Design**
  - Web version only (mobile version eliminated)
  - Buttons dynamically sized based on card width using `flex: 1` and `aspect-ratio: 1`
  
- **Modular Layout System**
  - Separate `WithCredentialsLayout` and `ProvidersOnlyLayout` components
  - Clean separation of concerns

## Installation

```typescript
import { LoginCard } from "@/lib/ui-library/components/LoginCard";
```

## Props

### LoginCardProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `config` | `'with-credentials' \| 'providers-only'` | ✓ | - | Login configuration mode |
| `providers` | `LoginProvider[]` | ✓ | - | Array of authentication providers |
| `onProviderSelect` | `(provider: LoginProvider) => void` | - | - | Callback when provider is selected (not called if redirect exists) |
| `onEmailLogin` | `(email: string, password: string, rememberMe: boolean) => void` | - | - | Callback for email/password login |
| `onForgotPassword` | `() => void` | - | - | Callback for forgot password action |
| `onShowAllProviders` | `() => void` | - | - | Callback when "more providers" is clicked |
| `title` | `MultiLanguageLabel` | - | - | Card title (supports i18n) |
| `subtitle` | `MultiLanguageLabel` | - | - | Card subtitle (supports i18n) |
| `icon` | `React.ReactNode` | - | - | Icon displayed at the top of the card |
| `className` | `string` | - | - | Additional CSS classes |
| `langOverride` | `string` | - | - | Override current language |
| `i18nOrder` | `'global-first' \| 'local-first'` | - | `'global-first'` | i18n resolution order |
| `dataTestId` | `string` | - | - | Test ID for automation |

### LoginProvider

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `provider` | `string` | ✓ | Provider name (e.g., "GitHub", "Google") |
| `icon` | `React.ReactNode` | - | Icon to display (ignored if `component` is provided) |
| `label` | `MultiLanguageLabel` | - | Custom label (supports i18n) |
| `component` | `React.ReactNode` | - | Custom component to render inside button |
| `redirect` | `RedirectConfig` | - | Automatic redirect configuration |
| `data` | `Record<string, any>` | - | Custom metadata (e.g., authType, scope, clientId) |

### RedirectConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `external` | `boolean` | ✓ | Whether redirect is external (http/https) or internal route |
| `url` | `string` | ✓ | URL or route path |
| `newTab` | `boolean` | ✓ | Open in new tab (only for external) |

## Usage Examples

### Basic Email/Password Only

```typescript
<LoginCard
  config="with-credentials"
  providers={[]}
  onEmailLogin={(email, password, rememberMe) => {
    console.log('Login:', { email, password, rememberMe });
  }}
  onForgotPassword={() => console.log('Forgot password')}
  title={{
    en: "Sign in to App",
    es: "Iniciar sesión en App",
    default: "Sign in to App"
  }}
/>
```

### With 2 Providers (Vertical Layout)

```typescript
import { SiGoogle, SiGithub } from "react-icons/si";

const providers: LoginProvider[] = [
  { 
    provider: "Google", 
    icon: <SiGoogle className="text-2xl" />,
    data: { scope: "email profile" }
  },
  { 
    provider: "GitHub", 
    icon: <SiGithub className="text-2xl" />,
    data: { scope: "user:email" }
  }
];

<LoginCard
  config="with-credentials"
  providers={providers}
  onProviderSelect={(provider) => console.log('Selected:', provider)}
  onEmailLogin={(email, password, rememberMe) => {
    console.log('Email login:', { email, password, rememberMe });
  }}
/>
```

### With 4 Providers (Grid Layout)

```typescript
const providers: LoginProvider[] = [
  { provider: "Google", icon: <SiGoogle className="text-2xl" /> },
  { provider: "GitHub", icon: <SiGithub className="text-2xl" /> },
  { provider: "Apple", icon: <SiApple className="text-2xl" /> },
  { provider: "Facebook", icon: <SiFacebook className="text-2xl" /> }
];

<LoginCard
  config="with-credentials"
  providers={providers}
  onProviderSelect={(provider) => console.log('Selected:', provider)}
  onEmailLogin={(email, password, rememberMe) => {
    console.log('Email login:', { email, password, rememberMe });
  }}
/>
```

### Providers Only (No Email/Password)

```typescript
const providers: LoginProvider[] = [
  {
    provider: "Google",
    label: {
      en: "Continue with Google",
      es: "Continuar con Google",
      default: "Continue with Google"
    },
    icon: <SiGoogle className="text-xl" />
  },
  {
    provider: "GitHub",
    label: {
      en: "Continue with GitHub",
      es: "Continuar con GitHub",
      default: "Continue with GitHub"
    },
    icon: <SiGithub className="text-xl" />
  }
];

<LoginCard
  config="providers-only"
  providers={providers}
  onProviderSelect={(provider) => console.log('Selected:', provider)}
  title={{
    en: "Sign in to App",
    es: "Iniciar sesión en App",
    default: "Sign in to App"
  }}
  subtitle={{
    en: "Choose your preferred login method",
    es: "Elige tu método de inicio de sesión",
    default: "Choose your preferred login method"
  }}
/>
```

### Custom Components with Redirects

```typescript
import { SiSlack, SiNotion } from "react-icons/si";
import { Sparkles } from "lucide-react";

const providers: LoginProvider[] = [
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
      newTab: true
    }
  },
  {
    provider: "Notion",
    component: (
      <div className="flex flex-col items-center justify-center gap-1 w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg">
        <SiNotion className="text-3xl" />
        <span className="text-xs font-semibold">Notion</span>
      </div>
    ),
    redirect: {
      external: true,
      url: "https://api.notion.com/v1/oauth/authorize",
      newTab: false
    }
  },
  {
    provider: "Premium",
    component: (
      <div className="flex flex-col items-center justify-center gap-1 w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-lg">
        <Sparkles className="text-3xl" />
        <span className="text-xs font-bold">Premium</span>
      </div>
    ),
    data: { type: "premium" }
  }
];

<LoginCard
  config="with-credentials"
  providers={providers}
  onProviderSelect={(provider) => console.log('Selected:', provider)}
  onEmailLogin={(email, password, rememberMe) => {
    console.log('Email login:', { email, password, rememberMe });
  }}
/>
```

### Internal Redirect Example

```typescript
import { SiGithub } from "react-icons/si";

const providers: LoginProvider[] = [
  {
    provider: "GitHub",
    component: (
      <div className="flex items-center justify-center gap-3 w-full h-full">
        <SiGithub className="text-2xl" />
        <span className="text-base font-medium">Continue with GitHub</span>
      </div>
    ),
    redirect: {
      external: false,
      url: "auth/github",
      newTab: false
    }
  }
];

<LoginCard
  config="providers-only"
  providers={providers}
  title={{
    en: "Sign in to App",
    es: "Iniciar sesión en App",
    default: "Sign in to App"
  }}
/>
```

## Layout Behavior

### With Credentials Layout

The `with-credentials` configuration displays components in this order:

1. **Icon + Title + Subtitle** (optional)
2. **Email Input**
3. **Password Input**
4. **Remember Me Checkbox** + **Forgot Password Link** (horizontal layout with `space-between`)
5. **Continue Button**
6. **Sign Up Prompt** ("Don't have an account? Sign Up")
7. **OR Divider** (only appears when providers exist)
   - Horizontal lines with "or" text centered
   - Line style: `1.5px solid #e2e8f0`
8. **Providers Section**
   - 1-2 providers: Vertical full-width buttons
   - 3-4 providers: Single row with equal-width square buttons
   - 5+ providers: 3 buttons + "more providers" button

### Providers Only Layout

The `providers-only` configuration displays:

1. **Icon + Title + Subtitle** (optional)
2. **Providers as Large Horizontal Buttons**
   - Left-aligned icon + text
   - Solid blue background (`#4353FF`) with hover state (`#3646E6`)

## Internationalization

### Supported Languages

- English (`en`)
- Spanish (`es`)

### Translation Keys

```json
{
  "logincard": {
    "title": "Sign in to {{appName}}",
    "subtitle": "Sign in to access your account",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot password?",
    "rememberMe": "Remember me",
    "continueWithEmail": "Continue with email",
    "moreProviders": "More providers",
    "selectProvider": "Select a provider to continue",
    "continueWith": "Continue with {{provider}}",
    "back": "Back",
    "or": "or",
    "noAccount": "Don't have an account? ",
    "signUp": "Sign Up"
  }
}
```

### Using MultiLanguageLabel

```typescript
const title: MultiLanguageLabel = {
  en: "Sign in to MyApp",
  es: "Iniciar sesión en MyApp",
  default: "Sign in to MyApp"
};

<LoginCard
  title={title}
  subtitle={{
    en: "Welcome back!",
    es: "¡Bienvenido de nuevo!",
    default: "Welcome back!"
  }}
  // ... other props
/>
```

## Styling

### CSS Module

The component uses CSS Modules for scoped styling. Styles are defined in:
- `client/src/lib/ui-library/components/LoginCard/web/css/LoginCard.module.css`

### Customization

You can pass custom classes via the `className` prop:

```typescript
<LoginCard
  className="shadow-2xl border-2 border-gray-300"
  // ... other props
/>
```

### Provider Button Sizing

All provider buttons in grid layouts use:
- `flex: 1` for equal width distribution
- `aspect-ratio: 1` for square buttons
- Dynamic sizing based on card width

## File Structure

```
LoginCard/
├── web/
│   ├── css/
│   │   ├── LoginCard.module.css    # Component styles
│   │   ├── LoginCard.module.ts     # Style exports
│   │   └── index.ts
│   ├── environment/
│   │   ├── enviroment.ts           # Environment config
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useI18nMerge.hook.ts    # i18n merge logic
│   │   ├── useLoginCard.hook.ts    # Main component hook
│   │   └── index.ts
│   ├── i18n/
│   │   ├── en.json                 # English translations
│   │   ├── es.json                 # Spanish translations
│   │   └── index.ts
│   ├── layouts/
│   │   ├── WithCredentialsLayout.tsx   # Email + providers layout
│   │   ├── ProvidersOnlyLayout.tsx     # Providers only layout
│   │   └── index.ts
│   ├── providers/
│   │   ├── LoginCard.provider.tsx  # Context provider
│   │   └── index.ts
│   ├── types/
│   │   ├── LoginCard.type.ts       # TypeScript types
│   │   └── index.ts
│   ├── utils/
│   │   ├── logincard.util.ts       # Utility functions
│   │   └── index.ts
│   ├── views/
│   │   ├── LoginCard.view.tsx      # Main view component
│   │   └── index.ts
│   └── index.tsx                   # Web entry point
├── index.tsx                       # Main export
└── README-IA.md                    # This file
```

## Architecture

### Provider + Context + Hook Pattern

The component follows a modular architecture:

1. **Provider** (`LoginCard.provider.tsx`): Manages global state and i18n
2. **Context**: Shares state across child components
3. **Hook** (`useLoginCard.hook.ts`): Encapsulates business logic
4. **View** (`LoginCard.view.tsx`): Presentation layer

### Layout System

Two specialized layout components handle different configurations:

- **WithCredentialsLayout**: Email/password fields + providers
- **ProvidersOnlyLayout**: External providers only

## Testing

The component includes `data-testid` attributes for automation:

```typescript
// Card container
data-testid="logincard-custom"

// Interactive elements
data-testid="input-email"
data-testid="input-password"
data-testid="checkbox-remember-me"
data-testid="button-forgot-password"
data-testid="button-continue-email"
data-testid="button-sign-up"
data-testid="button-provider-{index}"
data-testid="button-more-providers"

// Display elements
data-testid="text-title"
data-testid="text-subtitle"
data-testid="container-icon"
data-testid="text-signup-prompt"
```

## Best Practices

1. **Use the `redirect` attribute** for automatic navigation instead of handling it in `onProviderSelect`
2. **Provide meaningful `data` attributes** for tracking and analytics
3. **Use `component` attribute** for complex custom provider buttons
4. **Always provide `default` in MultiLanguageLabel** as fallback
5. **Keep provider count reasonable** (1-6 providers recommended)
6. **Use consistent icon sizes** across providers
7. **Test with different card widths** to ensure responsive behavior

## Common Patterns

### OAuth Provider with Redirect

```typescript
{
  provider: "Google",
  icon: <SiGoogle className="text-2xl" />,
  redirect: {
    external: true,
    url: "https://accounts.google.com/o/oauth2/v2/auth?client_id=...",
    newTab: false
  },
  data: {
    authType: "oauth2",
    scope: "email profile"
  }
}
```

### Internal Route Navigation

```typescript
{
  provider: "SAML",
  icon: <Lock className="text-2xl" />,
  redirect: {
    external: false,
    url: "/auth/saml",
    newTab: false
  },
  data: {
    authType: "saml",
    protocol: "saml2.0"
  }
}
```

### Manual Handling (No Redirect)

```typescript
{
  provider: "Custom",
  icon: <Sparkles className="text-2xl" />,
  data: {
    authType: "custom",
    requiresVerification: true
  }
}

// Handle in callback
onProviderSelect={(provider) => {
  if (provider.data?.requiresVerification) {
    // Show verification modal
  }
}}
```

## Troubleshooting

### Providers Not Showing

- Ensure `providers` array is not empty
- Check that each provider has either `icon` or `component`
- Verify `config` matches your intent

### Redirect Not Working

- Check `redirect.url` is correct
- For internal routes, ensure path starts without `/` (e.g., `auth/github` not `/auth/github`)
- Verify `redirect.external` matches your URL type

### Translations Not Updating

- Ensure language is properly set in `AppLanguageProvider`
- Check `langOverride` prop if forcing a specific language
- Verify translation keys exist in both `en.json` and `es.json`

### Styling Issues

- Check for CSS specificity conflicts
- Use `className` prop for additional styling
- Verify dark mode classes if using theme switching

## Future Enhancements

- Support for additional languages
- Biometric authentication options
- Social login analytics
- A11y improvements
- Animation options

## Related Components

- `AppAuthProvider`: Authentication state management
- `AppLanguageProvider`: Language switching
- `SessionValidator`: Session validation and expiration

## License

Part of the UI Component Library. Internal use only.
