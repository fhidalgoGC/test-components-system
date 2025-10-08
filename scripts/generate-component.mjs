#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const componentName = args[0];

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('Usage: npm run new-component -- <ComponentName> [options]');
  console.log('\nOptions:');
  console.log('  -all-folders    Create i18n, utils, and provider folders');
  console.log('  -readme         Generate README-IA.md in component');
  console.log('  -mobile         Create mobile version (default)');
  console.log('  -web            Create web version');
  console.log('\nExamples:');
  console.log('  npm run new-component -- Modal');
  console.log('  npm run new-component -- Modal -all-folders -readme');
  console.log('  npm run new-component -- Dialog -mobile -web');
  process.exit(1);
}

const flags = {
  allFolders: args.includes('-all-folders'),
  readme: args.includes('-readme'),
  mobile: args.includes('-mobile') || !args.includes('-web'),
  web: args.includes('-web'),
};

// Paths
const componentsPath = path.join(process.cwd(), 'client/src/lib/ui-library/components');
const componentPath = path.join(componentsPath, componentName);

// Check if component already exists
if (fs.existsSync(componentPath)) {
  console.error(`❌ Error: Component "${componentName}" already exists`);
  process.exit(1);
}

// Helper to create directory
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper to create file
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content.trim() + '\n');
}

// Templates
const templates = {
  // Types
  types: (name) => `export interface ${name}Props {
  children?: React.ReactNode;
  className?: string;
}`,

  // Hook
  hook: (name) => `import { useState } from 'react';
import type { ${name}Props } from '../types';

export const use${name} = (props: ${name}Props) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};`,

  // View
  view: (name) => `import type { ${name}Props } from '../types';

export const ${name}View = (props: ${name}Props) => {
  const { children, className } = props;

  return (
    <div className={className} data-testid="${name.toLowerCase()}">
      {children || '${name}'}
    </div>
  );
};`,

  // CSS Module
  cssModule: (name) => `.${name.toLowerCase()} {
  /* Add your styles here */
}`,

  // CSS TS
  cssTS: (name) => `import styles from './${name}.module.css';

export const containerClasses = (className?: string) => {
  return [styles.${name.toLowerCase()}, className].filter(Boolean).join(' ');
};`,

  // Index files
  indexTypes: () => `export * from './${componentName}.type';`,
  indexHooks: (name) => `export * from './use${name}.hook';`,
  indexViews: (name) => `export * from './${name}.view';`,
  indexCss: () => `export * from './${componentName}.module';`,

  // Main index
  mainIndex: (name, variant) => `export { ${name}View as ${name} } from './${variant}/views';
export type { ${name}Props } from './${variant}/types';`,

  // Root index
  rootIndex: (name) => `export { ${name} } from './mobile';
export type { ${name}Props } from './mobile/types';`,

  // Provider
  provider: (name) => `import { createContext, useContext, useState } from 'react';

interface ${name}ContextValue {
  // Add context values here
}

const ${name}Context = createContext<${name}ContextValue | undefined>(undefined);

export const ${name}Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({});

  return (
    <${name}Context.Provider value={{ }}>
      {children}
    </${name}Context.Provider>
  );
};

export const use${name}Context = () => {
  const context = useContext(${name}Context);
  if (!context) {
    throw new Error('use${name}Context must be used within ${name}Provider');
  }
  return context;
};`,

  // i18n EN
  i18nEN: (name) => `{
  "${name.toLowerCase()}": {
    "title": "${name}",
    "description": "${name} description"
  }
}`,

  // i18n ES
  i18nES: (name) => `{
  "${name.toLowerCase()}": {
    "title": "${name}",
    "description": "Descripción de ${name}"
  }
}`,

  // i18n index
  i18nIndex: () => `import en from './en.json';
import es from './es.json';

export const i18n = {
  en,
  es,
};

export default i18n;`,

  // Utils
  utils: (name) => `export const ${name.toLowerCase()}Utils = {
  // Add utility functions here
};`,

  // README
  readme: (name) => `# ${name} Component

## Overview
${name} component description.

## Usage

\`\`\`tsx
import { ${name} } from '@/lib/ui-library/components/${name}';

function Example() {
  return (
    <${name}>
      Content
    </${name}>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Component content |
| className | string | - | Additional CSS classes |

## Features

- Feature 1
- Feature 2

## Development Notes

Add development notes here...`,
};

// Create component structure
function createComponent(variant) {
  const variantPath = path.join(componentPath, variant);
  
  console.log(`📁 Creating ${variant} structure...`);

  // Create directories
  createDir(path.join(variantPath, 'css'));
  createDir(path.join(variantPath, 'hooks'));
  createDir(path.join(variantPath, 'types'));
  createDir(path.join(variantPath, 'views'));

  // Create CSS files
  createFile(
    path.join(variantPath, 'css', `${componentName}.module.css`),
    templates.cssModule(componentName)
  );
  createFile(
    path.join(variantPath, 'css', `${componentName}.module.ts`),
    templates.cssTS(componentName)
  );
  createFile(
    path.join(variantPath, 'css', 'index.ts'),
    templates.indexCss()
  );

  // Create types
  createFile(
    path.join(variantPath, 'types', `${componentName}.type.ts`),
    templates.types(componentName)
  );
  createFile(
    path.join(variantPath, 'types', 'index.ts'),
    templates.indexTypes()
  );

  // Create hook
  createFile(
    path.join(variantPath, 'hooks', `use${componentName}.hook.ts`),
    templates.hook(componentName)
  );
  createFile(
    path.join(variantPath, 'hooks', 'index.ts'),
    templates.indexHooks(componentName)
  );

  // Create view
  createFile(
    path.join(variantPath, 'views', `${componentName}.view.tsx`),
    templates.view(componentName)
  );
  createFile(
    path.join(variantPath, 'views', 'index.ts'),
    templates.indexViews(componentName)
  );

  // Create variant index
  createFile(
    path.join(variantPath, 'index.tsx'),
    templates.mainIndex(componentName, variant)
  );

  // Optional folders
  if (flags.allFolders) {
    // Utils
    createDir(path.join(variantPath, 'utils'));
    createFile(
      path.join(variantPath, 'utils', `${componentName.toLowerCase()}.util.ts`),
      templates.utils(componentName)
    );
    createFile(
      path.join(variantPath, 'utils', 'index.ts'),
      `export * from './${componentName.toLowerCase()}.util';`
    );

    // Provider
    createDir(path.join(variantPath, 'providers'));
    createFile(
      path.join(variantPath, 'providers', `${componentName}.provider.tsx`),
      templates.provider(componentName)
    );
    createFile(
      path.join(variantPath, 'providers', 'index.ts'),
      `export * from './${componentName}.provider';`
    );

    // i18n
    createDir(path.join(variantPath, 'i18n'));
    createFile(
      path.join(variantPath, 'i18n', 'en.json'),
      templates.i18nEN(componentName)
    );
    createFile(
      path.join(variantPath, 'i18n', 'es.json'),
      templates.i18nES(componentName)
    );
    createFile(
      path.join(variantPath, 'i18n', 'index.ts'),
      templates.i18nIndex()
    );
  }
}

// Main execution
console.log(`\n🚀 Generating component: ${componentName}\n`);

if (flags.mobile) {
  createComponent('mobile');
}

if (flags.web) {
  createComponent('web');
}

// Create root index
createFile(
  path.join(componentPath, 'index.tsx'),
  templates.rootIndex(componentName)
);

// Create README if requested
if (flags.readme) {
  console.log('📝 Creating README-IA.md...');
  createFile(
    path.join(componentPath, 'README-IA.md'),
    templates.readme(componentName)
  );
}

// Update components index
const componentsIndexPath = path.join(componentsPath, 'index.ts');
let componentsIndex = '';
if (fs.existsSync(componentsIndexPath)) {
  componentsIndex = fs.readFileSync(componentsIndexPath, 'utf-8');
}
const exportLine = `export * from './${componentName}';\n`;
if (!componentsIndex.includes(exportLine)) {
  fs.appendFileSync(componentsIndexPath, exportLine);
}

console.log(`\n✅ Component "${componentName}" created successfully!\n`);
console.log('📦 Structure created:');
console.log(`   ${componentPath}/`);
if (flags.mobile) console.log('   ├── mobile/');
if (flags.web) console.log('   ├── web/');
if (flags.readme) console.log('   ├── README-IA.md');
console.log('   └── index.tsx');

console.log(`\n💡 Import it with:`);
console.log(`   import { ${componentName} } from '@/lib/ui-library/components/${componentName}';\n`);
