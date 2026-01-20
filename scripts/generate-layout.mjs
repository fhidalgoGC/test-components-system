#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const layoutName = args[0];

if (!layoutName) {
  console.error('❌ Error: Layout name is required');
  console.log('Usage: npm run new-layout -- <LayoutName> [options]');
  console.log('\nOptions:');
  console.log('  -all-folders            Create utils and provider folders');
  console.log('  -readme                 Generate README-IA.md');
  console.log('\nExamples:');
  console.log('  npm run new-layout -- SidebarLayout');
  console.log('  npm run new-layout -- DashboardLayout -all-folders -readme');
  process.exit(1);
}

const flags = {
  allFolders: args.includes('-all-folders'),
  readme: args.includes('-readme'),
};

const layoutsPath = path.join(process.cwd(), 'client/src/lib/ui-library/layouts');
const layoutPath = path.join(layoutsPath, layoutName);
const layoutExists = fs.existsSync(layoutPath);

if (layoutExists) {
  console.error(`❌ Error: Layout "${layoutName}" already exists.`);
  console.error(`   Path: ${layoutPath}`);
  process.exit(1);
}

console.log(`\n🚀 Creating layout: ${layoutName}\n`);

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(filePath, content) {
  fs.writeFileSync(filePath, content.trim() + '\n');
}

const layoutNameLower = layoutName.toLowerCase();

createDir(layoutPath);
createDir(path.join(layoutPath, 'css'));
createDir(path.join(layoutPath, 'hooks'));
createDir(path.join(layoutPath, 'types'));
createDir(path.join(layoutPath, 'views'));

createFile(
  path.join(layoutPath, 'css', `${layoutName}.module.scss`),
  `.container {
  display: flex;
  width: 100%;
  height: 100vh;
}
`
);

createFile(
  path.join(layoutPath, 'types', `${layoutName}.types.ts`),
  `import { ReactNode } from 'react';

export interface ${layoutName}Props {
  children: ReactNode;
  className?: string;
}

export interface ${layoutName}ContextValue {
  // Add context values here
}
`
);

createFile(
  path.join(layoutPath, 'types', 'index.ts'),
  `export * from './${layoutName}.types';`
);

createFile(
  path.join(layoutPath, 'hooks', `use${layoutName}.hook.ts`),
  `import { createContext, useContext } from 'react';
import type { ${layoutName}ContextValue } from '../types/${layoutName}.types';

export const ${layoutName}Context = createContext<${layoutName}ContextValue | null>(null);

export function use${layoutName}(): ${layoutName}ContextValue {
  const context = useContext(${layoutName}Context);
  if (!context) {
    throw new Error('use${layoutName} must be used within ${layoutName}');
  }
  return context;
}

export function useOptional${layoutName}(): ${layoutName}ContextValue | null {
  return useContext(${layoutName}Context);
}
`
);

createFile(
  path.join(layoutPath, 'hooks', 'index.ts'),
  `export * from './use${layoutName}.hook';`
);

createFile(
  path.join(layoutPath, 'views', `${layoutName}.view.tsx`),
  `import type { ${layoutName}Props } from '../types/${layoutName}.types';
import styles from '../css/${layoutName}.module.scss';

export function ${layoutName}View({
  children,
  className,
}: ${layoutName}Props) {
  return (
    <div className={\`\${styles.container} \${className || ''}\`}>
      {children}
    </div>
  );
}
`
);

createFile(
  path.join(layoutPath, 'views', 'index.ts'),
  `export * from './${layoutName}.view';`
);

createFile(
  path.join(layoutPath, 'index.tsx'),
  `export { ${layoutName}View as ${layoutName} } from './views';
export { use${layoutName}, useOptional${layoutName} } from './hooks';
export type { ${layoutName}Props, ${layoutName}ContextValue } from './types';
`
);

if (flags.allFolders) {
  createDir(path.join(layoutPath, 'utils'));
  createFile(
    path.join(layoutPath, 'utils', `${layoutNameLower}.util.ts`),
    `// ${layoutName} utility functions

export function ${layoutNameLower}Helper() {
  // Add utility functions here
}
`
  );
  createFile(
    path.join(layoutPath, 'utils', 'index.ts'),
    `export * from './${layoutNameLower}.util';`
  );

  createDir(path.join(layoutPath, 'providers'));
  createFile(
    path.join(layoutPath, 'providers', `${layoutName}.provider.tsx`),
    `import { ReactNode } from 'react';
import { ${layoutName}Context } from '../hooks/use${layoutName}.hook';
import type { ${layoutName}ContextValue } from '../types/${layoutName}.types';

interface ${layoutName}ProviderProps {
  children: ReactNode;
}

export function ${layoutName}Provider({ children }: ${layoutName}ProviderProps) {
  const value: ${layoutName}ContextValue = {
    // Add context values here
  };

  return (
    <${layoutName}Context.Provider value={value}>
      {children}
    </${layoutName}Context.Provider>
  );
}
`
  );
  createFile(
    path.join(layoutPath, 'providers', 'index.ts'),
    `export * from './${layoutName}.provider';`
  );
}

if (flags.readme) {
  console.log('📝 Creating README-IA.md...');
  createFile(
    path.join(layoutPath, 'README-IA.md'),
    `# ${layoutName}

## Overview
${layoutName} layout description.

## Usage

\`\`\`tsx
import { ${layoutName} } from '@/lib/ui-library/layouts/${layoutName}';

function Example() {
  return (
    <${layoutName}>
      Content
    </${layoutName}>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Layout content |
| className | string | - | Additional CSS classes |

## Hook

\`\`\`tsx
import { use${layoutName} } from '@/lib/ui-library/layouts/${layoutName}';

function ChildComponent() {
  const context = use${layoutName}();
  // Use context values
}
\`\`\`

## Features

- Agnostic layout (no colors, only structure)
- Context API for child communication
- Customizable via className

## Development Notes

Add development notes here...
`
  );
}

const layoutsIndexPath = path.join(layoutsPath, 'index.ts');
let layoutsIndex = '';
if (fs.existsSync(layoutsIndexPath)) {
  layoutsIndex = fs.readFileSync(layoutsIndexPath, 'utf-8');
}
const exportLine = `export * from './${layoutName}';\n`;
if (!layoutsIndex.includes(exportLine)) {
  fs.appendFileSync(layoutsIndexPath, exportLine);
  console.log('📦 Added to layouts index');
}

console.log(`\n✅ Layout "${layoutName}" created successfully!\n`);
console.log('📦 Structure:');
console.log(`   ${layoutName}/`);
console.log('   ├── css/');
console.log('   ├── hooks/');
console.log('   ├── types/');
console.log('   ├── views/');
if (flags.allFolders) {
  console.log('   ├── utils/');
  console.log('   ├── providers/');
}
if (flags.readme) {
  console.log('   ├── README-IA.md');
}
console.log('   └── index.tsx');

console.log(`\n💡 Import it with:`);
console.log(`   import { ${layoutName} } from '@/lib/ui-library/layouts/${layoutName}';\n`);
