#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const componentName = args[0];

// Helper to get argument value
function getArgValue(flag) {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('Usage: npm run new-component -- <ComponentName> [options]');
  console.log('\nOptions:');
  console.log('  -all-folders            Create i18n, utils, and provider folders');
  console.log('  -readme                 Generate README-IA.md in component');
  console.log('  -mobile                 Create mobile version (default)');
  console.log('  -web                    Create web version');
  console.log('  --languages <langs>     i18n languages (comma-separated, e.g., en,es,fr)');
  console.log('\nExamples:');
  console.log('  npm run new-component -- Modal');
  console.log('  npm run new-component -- Modal -all-folders -readme');
  console.log('  npm run new-component -- Dialog -all-folders --languages en,es,fr');
  process.exit(1);
}

const flags = {
  allFolders: args.includes('-all-folders'),
  readme: args.includes('-readme'),
  mobile: args.includes('-mobile') || !args.includes('-web'),
  web: args.includes('-web'),
};

// Parse languages (default: en,es)
const languagesArg = getArgValue('--languages') || 'en,es';
const languages = languagesArg.split(',').map(lang => lang.trim());

// Paths
const componentsPath = path.join(process.cwd(), 'client/src/lib/ui-library/components');
const componentPath = path.join(componentsPath, componentName);
const templatesPath = path.join(process.cwd(), 'client/src/lib/ui-library/command-templates');

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

// Generate language selection logic
function generateLanguageSelectionLogic(languages) {
  if (languages.length === 1) {
    return `  return localDictionaries['${languages[0]}'];`;
  }
  
  const defaultLang = languages[0];
  const langLower = '(lang || \'' + defaultLang + '\').toLowerCase()';
  
  // Build ternary chain: lang.startsWith('es') ? 'es' : lang.startsWith('fr') ? 'fr' : 'en'
  const conditions = languages.slice(1).reverse().reduce((acc, lang) => {
    return `${langLower}.startsWith('${lang}') ? '${lang}' : ${acc}`;
  }, `'${defaultLang}'`);
  
  return `  const pick = ${conditions};\n  return localDictionaries[pick];`;
}

// Create component structure
function createComponent(variant) {
  const variantPath = path.join(componentPath, variant);
  const componentNameLower = componentName.toLowerCase();
  
  console.log(`📁 Creating ${variant} structure...`);

  // Prepare replacements
  const replacements = {
    ComponentName: componentName,
    componentname: componentNameLower,
    COMPONENT_NAME_UPPER: componentNameLower.toUpperCase(),
  };

  // Create directories
  createDir(path.join(variantPath, 'css'));
  createDir(path.join(variantPath, 'hooks'));
  createDir(path.join(variantPath, 'types'));
  createDir(path.join(variantPath, 'views'));

  // Create CSS files
  createFile(
    path.join(variantPath, 'css', `${componentName}.module.css`),
    processTemplate(readTemplate('css/ComponentName.module.css.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'css', `${componentName}.module.ts`),
    processTemplate(readTemplate('css/ComponentName.module.ts.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'css', 'index.ts'),
    `export * from './${componentName}.module';`
  );

  // Create types
  createFile(
    path.join(variantPath, 'types', `${componentName}.type.ts`),
    processTemplate(readTemplate('types/ComponentName.type.ts.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'types', 'index.ts'),
    `export * from './${componentName}.type';`
  );

  // Create hooks
  createFile(
    path.join(variantPath, 'hooks', `use${componentName}.hook.ts`),
    processTemplate(readTemplate('hooks/useComponentName.hook.ts.template'), replacements)
  );
  
  // Create useI18nMerge hook (always, for i18n support)
  createFile(
    path.join(variantPath, 'hooks', 'useI18nMerge.hook.ts'),
    readTemplate('hooks/useI18nMerge.hook.ts.template')
  );
  
  createFile(
    path.join(variantPath, 'hooks', 'index.ts'),
    `export * from './use${componentName}.hook';\nexport * from './useI18nMerge.hook';`
  );

  // Create view
  createFile(
    path.join(variantPath, 'views', `${componentName}.view.tsx`),
    processTemplate(readTemplate('views/ComponentName.view.tsx.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'views', 'index.ts'),
    `export * from './${componentName}.view';`
  );

  // Create variant index
  createFile(
    path.join(variantPath, 'index.tsx'),
    `export { ${componentName}View as ${componentName} } from './${variant}/views';\nexport type { ${componentName}Props } from './${variant}/types';`
  );

  // Optional folders
  if (flags.allFolders) {
    // Environment
    createDir(path.join(variantPath, 'environment'));
    const envReplacements = {
      ...replacements,
      COMPONENT_NAME: componentNameLower.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase(),
    };
    createFile(
      path.join(variantPath, 'environment', 'config.ts'),
      processTemplate(readTemplate('environment/config.ts.template'), envReplacements)
    );
    createFile(
      path.join(variantPath, 'environment', 'index.ts'),
      readTemplate('environment/index.ts.template')
    );

    // Utils
    createDir(path.join(variantPath, 'utils'));
    createFile(
      path.join(variantPath, 'utils', `${componentNameLower}.util.ts`),
      processTemplate(readTemplate('utils/componentname.util.ts.template'), replacements)
    );
    createFile(
      path.join(variantPath, 'utils', 'index.ts'),
      `export * from './${componentNameLower}.util';`
    );

    // Provider
    createDir(path.join(variantPath, 'providers'));
    createFile(
      path.join(variantPath, 'providers', `${componentName}.provider.tsx`),
      processTemplate(readTemplate('providers/ComponentName.provider.tsx.template'), replacements)
    );
    createFile(
      path.join(variantPath, 'providers', 'index.ts'),
      `export * from './${componentName}.provider';`
    );

    // i18n
    createDir(path.join(variantPath, 'i18n'));
    
    // Create JSON files for each language
    languages.forEach(lang => {
      // Try to use language-specific template first, fallback to generic
      let templatePath = `i18n/${lang}.json.template`;
      const specificTemplatePath = path.join(templatesPath, templatePath);
      
      if (!fs.existsSync(specificTemplatePath)) {
        templatePath = 'i18n/lang.json.template';
      }
      
      createFile(
        path.join(variantPath, 'i18n', `${lang}.json`),
        processTemplate(readTemplate(templatePath), replacements)
      );
    });
    
    // Create i18n index with dynamic imports
    const languagesImports = languages.map(lang => `import ${lang} from './${lang}.json';`).join('\n');
    const languagesKeys = languages.join(', ');
    const languageSelectionLogic = generateLanguageSelectionLogic(languages);
    
    const i18nIndexReplacements = {
      LANGUAGES_IMPORTS: languagesImports,
      LANGUAGES_KEYS: languagesKeys,
      LANGUAGE_SELECTION_LOGIC: languageSelectionLogic,
    };
    
    createFile(
      path.join(variantPath, 'i18n', 'index.ts'),
      processTemplate(readTemplate('i18n/index.ts.template'), i18nIndexReplacements)
    );
  }
}

// README template
const readmeTemplate = (name) => `# ${name} Component

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
| langOverride | string | - | Override language (e.g., 'en', 'es') |
| i18nOrder | 'global-first' \\| 'local-first' | 'local-first' | Translation priority order |

## Features

- Reactive to language changes
- Supports i18n with local and global translations
- Customizable with CSS classes

## Development Notes

Add development notes here...`;

// Main execution
console.log(`\n🚀 Generating component: ${componentName}\n`);

if (flags.mobile) {
  createComponent('mobile');
}

if (flags.web) {
  createComponent('web');
}

// Create root index
const defaultVariant = flags.mobile ? 'mobile' : 'web';
createFile(
  path.join(componentPath, 'index.tsx'),
  `export { ${componentName} } from './${defaultVariant}';\nexport type { ${componentName}Props } from './${defaultVariant}/types';`
);

// Create README if requested
if (flags.readme) {
  console.log('📝 Creating README-IA.md...');
  createFile(
    path.join(componentPath, 'README-IA.md'),
    readmeTemplate(componentName)
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

if (flags.allFolders) {
  console.log(`\n🌐 i18n enabled with languages: ${languages.join(', ')}`);
  console.log('   Component is now reactive to language changes!');
}

console.log(`\n💡 Import it with:`);
console.log(`   import { ${componentName} } from '@/lib/ui-library/components/${componentName}';\n`);
