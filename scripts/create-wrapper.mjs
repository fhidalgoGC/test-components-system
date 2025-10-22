#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const wrapperName = args[0];

if (!wrapperName) {
  console.error('❌ Error: Wrapper name is required');
  console.log('Usage: npm run create-wrapper -- <WrapperName>');
  console.log('\nExamples:');
  console.log('  npm run create-wrapper -- WrapperAuth');
  console.log('  npm run create-wrapper -- WrapperSelection');
  console.log('\nNote: Wrappers are purely logical components without styles (no CSS folder).');
  process.exit(1);
}

// Paths
const componentsPath = path.join(process.cwd(), 'client/src/lib/ui-library/components');
const wrapperPath = path.join(componentsPath, wrapperName);
const templatesPath = path.join(process.cwd(), 'client/src/lib/ui-library/command-templates/wrappers');

// Check if wrapper already exists
if (fs.existsSync(wrapperPath)) {
  console.error(`❌ Error: Wrapper "${wrapperName}" already exists`);
  console.log(`   Path: ${wrapperPath}`);
  process.exit(1);
}

console.log(`\n🚀 Creating wrapper: ${wrapperName} (logical component, no styles)\n`);

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

// Helper to read template
function readTemplate(templatePath) {
  const fullPath = path.join(templatesPath, templatePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  return fs.readFileSync(fullPath, 'utf-8');
}

// Helper to replace variables in template
function processTemplate(template, replacements) {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

// Prepare replacements
const wrapperNameLower = wrapperName.toLowerCase();
const replacements = {
  WrapperName: wrapperName,
  wrappername: wrapperNameLower,
};

console.log(`📁 Creating ${wrapperName}/ structure...`);

// Create directories (NO CSS folder for wrappers)
createDir(path.join(wrapperPath, 'hooks'));
createDir(path.join(wrapperPath, 'types'));
createDir(path.join(wrapperPath, 'views'));

// Create types
createFile(
  path.join(wrapperPath, 'types', `${wrapperName}.type.ts`),
  processTemplate(readTemplate('types/WrapperName.type.ts.template'), replacements)
);
createFile(
  path.join(wrapperPath, 'types', 'index.ts'),
  processTemplate(readTemplate('types/index.ts.template'), replacements)
);

// Create hooks
createFile(
  path.join(wrapperPath, 'hooks', `use${wrapperName}.hook.ts`),
  processTemplate(readTemplate('hooks/useWrapperName.hook.ts.template'), replacements)
);
createFile(
  path.join(wrapperPath, 'hooks', 'index.ts'),
  processTemplate(readTemplate('hooks/index.ts.template'), replacements)
);

// Create view
createFile(
  path.join(wrapperPath, 'views', `${wrapperName}.view.tsx`),
  processTemplate(readTemplate('views/WrapperName.view.tsx.template'), replacements)
);
createFile(
  path.join(wrapperPath, 'views', 'index.ts'),
  processTemplate(readTemplate('views/index.ts.template'), replacements)
);

// Create main index
createFile(
  path.join(wrapperPath, 'index.tsx'),
  processTemplate(readTemplate('index.tsx.template'), replacements)
);

// Create README
const readmeContent = `# ${wrapperName} Component

## Overview

${wrapperName} is a logical wrapper component that manages state and provides context without applying visual styles.

## Features

- ✅ **Pure Logic**: No visual styling, only state management
- ✅ **Context Provider**: Children can access wrapper state via custom hook
- ✅ **Flexible**: Works with any child components

## Usage

\`\`\`tsx
import { ${wrapperName} } from '@/lib/ui-library/components/${wrapperName}';

function Example() {
  return (
    <${wrapperName}>
      <YourContent />
    </${wrapperName}>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Child components to wrap |
| className | string | - | Optional CSS class (passed to wrapper div) |

## Architecture

This wrapper follows a minimal structure without CSS files:

\`\`\`
${wrapperName}/
├── types/          # TypeScript types
├── hooks/          # Custom hooks for logic
├── views/          # View component
└── index.tsx       # Main export
\`\`\`

## Development Notes

Add your specific wrapper logic in the \`use${wrapperName}\` hook.
Children can access wrapper state by creating a context provider pattern.`;

createFile(
  path.join(wrapperPath, 'README-IA.md'),
  readmeContent
);

// Update components index
const componentsIndexPath = path.join(componentsPath, 'index.ts');
let componentsIndex = '';
if (fs.existsSync(componentsIndexPath)) {
  componentsIndex = fs.readFileSync(componentsIndexPath, 'utf-8');
}
const exportLine = `export * from './${wrapperName}';\n`;
if (!componentsIndex.includes(exportLine)) {
  fs.appendFileSync(componentsIndexPath, exportLine);
  console.log('📦 Added to components index');
}

console.log(`\n✅ Wrapper "${wrapperName}" created successfully!\n`);
console.log('📦 Structure:');
console.log(`   ${wrapperName}/`);
console.log('   ├── types/');
console.log('   ├── hooks/');
console.log('   ├── views/');
console.log('   ├── index.tsx');
console.log('   └── README-IA.md');

console.log(`\n💡 Import it with:`);
console.log(`   import { ${wrapperName} } from '@/lib/ui-library/components/${wrapperName}';\n`);

console.log(`⚠️  Note: This is a logical wrapper without CSS styling.`);
console.log(`   Add your wrapper logic in hooks/use${wrapperName}.hook.ts\n`);
