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
  console.log('  --mobile                Create/add mobile version only');
  console.log('  --web                   Create/add web version only');
  console.log('  (no flag)               Create in root (no responsive wrapper)');
  console.log('  -all-folders            Create i18n, utils, and provider folders');
  console.log('  -readme                 Generate README-IA.md in component');
  console.log('  --languages <langs>     i18n languages (comma-separated, e.g., en,es,fr)');
  console.log('\nExamples:');
  console.log('  npm run new-component -- Modal                    # Root structure');
  console.log('  npm run new-component -- Modal --mobile           # Mobile only');
  console.log('  npm run new-component -- Modal --web              # Web only (if mobile exists)');
  console.log('  npm run new-component -- Modal --mobile --web     # Both with wrapper');
  console.log('  npm run new-component -- Dialog -all-folders --languages en,es,fr');
  process.exit(1);
}

const flags = {
  allFolders: args.includes('-all-folders'),
  readme: args.includes('-readme'),
  mobile: args.includes('--mobile'),
  web: args.includes('--web'),
};

// Parse languages (default: en,es)
const languagesArg = getArgValue('--languages') || 'en,es';
const languages = languagesArg.split(',').map(lang => lang.trim());

// Paths
const componentsPath = path.join(process.cwd(), 'client/src/lib/ui-library/components');
const componentPath = path.join(componentsPath, componentName);
const templatesPath = path.join(process.cwd(), 'client/src/command-templates/components');

// Detect mode: root, mobile, web, or both
const isRootMode = !flags.mobile && !flags.web;
const componentExists = fs.existsSync(componentPath);

// Check existing variants
let existingMobile = false;
let existingWeb = false;
let existingRoot = false;

if (componentExists) {
  existingMobile = fs.existsSync(path.join(componentPath, 'mobile'));
  existingWeb = fs.existsSync(path.join(componentPath, 'web'));
  // Check if it's a root structure (has views/ directly in root)
  existingRoot = fs.existsSync(path.join(componentPath, 'views'));
}

// Validation: prevent mixing root with variants
if (componentExists && existingRoot && (flags.mobile || flags.web)) {
  console.error(`❌ Error: Component "${componentName}" exists with root structure.`);
  console.error('   Cannot add mobile/web variants to a root-structure component.');
  console.error('   Delete the component first or create a new one.');
  process.exit(1);
}

if (componentExists && (existingMobile || existingWeb) && isRootMode) {
  console.error(`❌ Error: Component "${componentName}" exists with variant structure.`);
  console.error('   Cannot create root structure for a component with variants.');
  console.error('   Use --mobile or --web flags instead.');
  process.exit(1);
}

// Validation: if creating new component, root mode cannot have both flags
if (!componentExists && isRootMode) {
  console.log(`\n🚀 Creating component: ${componentName} (root structure)\n`);
} else if (!componentExists && (flags.mobile || flags.web)) {
  console.log(`\n🚀 Creating component: ${componentName}\n`);
} else if (componentExists) {
  console.log(`\n🔄 Updating component: ${componentName}\n`);
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
  const variantPath = variant ? path.join(componentPath, variant) : componentPath;
  const componentNameLower = componentName.toLowerCase();
  
  const displayPath = variant ? `${componentName}/${variant}/` : `${componentName}/`;
  console.log(`📁 Creating ${displayPath} structure...`);

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

  // Create variant index (only if it's a variant, not root)
  if (variant) {
    createFile(
      path.join(variantPath, 'index.tsx'),
      `export { ${componentName}View as ${componentName} } from './views';\nexport type { ${componentName}Props } from './types';`
    );
  }

  // Optional folders
  if (flags.allFolders) {
    // Environment
    createDir(path.join(variantPath, 'environment'));
    const envReplacements = {
      ...replacements,
      COMPONENT_NAME: componentNameLower.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase(),
    };
    createFile(
      path.join(variantPath, 'environment', 'enviroment.ts'),
      processTemplate(readTemplate('environment/enviroment.ts.template'), envReplacements)
    );
    createFile(
      path.join(variantPath, 'environment', 'index.ts'),
      processTemplate(readTemplate('environment/index.ts.template'), envReplacements)
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
      processTemplate(readTemplate('providers/ComponentName.provider.tsx.template'), envReplacements)
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

// Create or update wrapper
function createOrUpdateWrapper() {
  const wrapperPath = path.join(componentPath, 'index.tsx');
  const replacements = {
    ComponentName: componentName,
    componentname: componentName.toLowerCase(),
  };

  // Determine what variants exist now
  const hasMobile = fs.existsSync(path.join(componentPath, 'mobile'));
  const hasWeb = fs.existsSync(path.join(componentPath, 'web'));
  const hasRoot = fs.existsSync(path.join(componentPath, 'views'));

  if (hasRoot) {
    // Root structure: simple export from root
    createFile(
      wrapperPath,
      `export { ${componentName}View as ${componentName} } from './views';\nexport type { ${componentName}Props } from './types';`
    );
  } else if (hasMobile && hasWeb) {
    // Both variants: create responsive wrapper with both active
    const wrapperContent = `import { useIsMobile } from '../../hooks';
import { ${componentName} as ${componentName}Mobile } from './mobile';
import { ${componentName} as ${componentName}Web } from './web';
import type { ${componentName}Props } from './mobile/types';

export const ${componentName} = (props: ${componentName}Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <${componentName}Mobile {...props} />;
  }

  return <${componentName}Web {...props} />;
};

export type { ${componentName}Props };`;
    
    createFile(wrapperPath, wrapperContent);
    console.log('📱💻 Created responsive wrapper (mobile + web)');
  } else if (hasMobile) {
    // Only mobile: export from mobile with placeholder for web
    const wrapperContent = `import { useIsMobile } from '../../hooks';
import { ${componentName} as ${componentName}Mobile } from './mobile';
import { NotImplemented } from '../NotImplemented';
import type { ${componentName}Props } from './mobile/types';

// Web version placeholder (uncomment when implemented)
// import { ${componentName} as ${componentName}Web } from './web';

export const ${componentName} = (props: ${componentName}Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <${componentName}Mobile {...props} />;
  }

  // Return web version when implemented
  // return <${componentName}Web {...props} />;
  
  // Fallback: web version not implemented
  return <NotImplemented platform="Web" componentName="${componentName}" />;
};

export type { ${componentName}Props };`;
    
    createFile(wrapperPath, wrapperContent);
  } else if (hasWeb) {
    // Only web: export from web with placeholder for mobile
    const wrapperContent = `import { useIsMobile } from '../../hooks';
import { ${componentName} as ${componentName}Web } from './web';
import { NotImplemented } from '../NotImplemented';
import type { ${componentName}Props } from './web/types';

// Mobile version placeholder (uncomment when implemented)
// import { ${componentName} as ${componentName}Mobile } from './mobile';

export const ${componentName} = (props: ${componentName}Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Return mobile version when implemented
    // return <${componentName}Mobile {...props} />;
    
    // Fallback: mobile version not implemented
    return <NotImplemented platform="Mobile" componentName="${componentName}" />;
  }

  return <${componentName}Web {...props} />;
};

export type { ${componentName}Props };`;
    
    createFile(wrapperPath, wrapperContent);
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
createDir(componentPath);

// Determine what to create
if (isRootMode) {
  // Root mode: create structure in root
  createComponent(null);
  createOrUpdateWrapper();
} else {
  // Variant mode
  if (flags.mobile && !existingMobile) {
    createComponent('mobile');
  } else if (flags.mobile && existingMobile) {
    console.log('⏭️  Mobile variant already exists, skipping...');
  }

  if (flags.web && !existingWeb) {
    createComponent('web');
  } else if (flags.web && existingWeb) {
    console.log('⏭️  Web variant already exists, skipping...');
  }

  // Update wrapper
  createOrUpdateWrapper();
}

// Create README if requested
if (flags.readme && !fs.existsSync(path.join(componentPath, 'README-IA.md'))) {
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
  console.log('📦 Added to components index');
}

console.log(`\n✅ Component "${componentName}" ${componentExists ? 'updated' : 'created'} successfully!\n`);
console.log('📦 Structure:');
console.log(`   ${componentName}/`);

if (fs.existsSync(path.join(componentPath, 'mobile'))) {
  console.log('   ├── mobile/');
}
if (fs.existsSync(path.join(componentPath, 'web'))) {
  console.log('   ├── web/');
}
if (fs.existsSync(path.join(componentPath, 'views'))) {
  console.log('   ├── views/ (root)');
}
if (flags.readme) {
  console.log('   ├── README-IA.md');
}
console.log('   └── index.tsx');

if (flags.allFolders) {
  console.log(`\n🌐 i18n enabled with languages: ${languages.join(', ')}`);
  console.log('   Component is now reactive to language changes!');
}

console.log(`\n💡 Import it with:`);
console.log(`   import { ${componentName} } from '@/lib/ui-library/components/${componentName}';\n`);
