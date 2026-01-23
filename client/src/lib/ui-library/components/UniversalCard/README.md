# UniversalCard Component

A flexible, reusable card component that can wrap and render any React component with customizable sizing and styling options. Supports selection integration, header/footer content, and works across Web, Mobile Responsive, and Native platforms.

## Features

- Dynamic Component Rendering
- Flexible Sizing (px, %, Tailwind classes)
- Customizable Styles
- Header & Footer Support
- Selection Integration (WrapperItemsSelected)
- Multi-platform Support (Web, Mobile, Native)

## Platform Documentation

| Platform | File | Description |
|----------|------|-------------|
| Web | [README-WEB-IA.md](./README-WEB-IA.md) | Vite + Tailwind CSS + Radix UI |
| Mobile Responsive | [README-MOBILE-IA.md](./README-MOBILE-IA.md) | Web responsive for small screens |
| Native (iOS/Android) | [README-MOBILE-NATIVE.md](./README-MOBILE-NATIVE.md) | Expo + React Native + StyleSheet |

## Folder Structure

```
UniversalCard/
├── token.shared/       # Shared design tokens (Tailwind-style)
├── web/                # Web implementation
├── mobile/             # Mobile responsive implementation
├── native/             # Native (iOS/Android) implementation
├── index.tsx           # Web/Mobile dispatch (useIsMobile)
└── index.native.tsx    # Native export (Metro bundler)
```
