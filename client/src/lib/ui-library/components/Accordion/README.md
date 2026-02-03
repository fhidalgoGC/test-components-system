# Accordion Component

A flexible, reusable component that works across Web, Mobile Responsive, and Native platforms.

## Features

- Dynamic Component Rendering
- Flexible Sizing (px, %, Tailwind classes)
- Customizable Styles
- Multi-platform Support (Web, Mobile, Native)

## Platform Documentation

| Platform | File | Description |
|----------|------|-------------|
| Web | [README-WEB-IA.md](https://github.com/fhidalgoGC/test-components-system/blob/main/client/src/lib/ui-library/components/Accordion/README-WEB-IA.md) | Vite + Tailwind CSS + Radix UI |
| Mobile Responsive | [README-MOBILE-IA.md](https://github.com/fhidalgoGC/test-components-system/blob/main/client/src/lib/ui-library/components/Accordion/README-MOBILE-IA.md) | Web responsive for small screens |
| Native (iOS/Android) | [README-MOBILE-NATIVE.md](https://github.com/fhidalgoGC/test-components-system/blob/main/client/src/lib/ui-library/components/Accordion/README-MOBILE-NATIVE.md) | Expo + React Native + StyleSheet |

## Folder Structure

```
Accordion/
├── token.shared/       # Shared design tokens (Tailwind-style)
├── web/                # Web implementation
├── mobile/             # Mobile responsive implementation
├── native/             # Native (iOS/Android) implementation
├── index.tsx           # Web/Mobile dispatch (useIsMobile)
└── index.native.tsx    # Native export (Metro bundler)
```
