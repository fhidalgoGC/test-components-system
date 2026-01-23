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
  console.log('  --native                Create/add native version (iOS/Android)');
  console.log('  (no flag)               Create in root (no responsive wrapper)');
  console.log('  -all-folders            Create i18n, utils, and provider folders');
  console.log('  -readme                 Generate README files (main + per platform)');
  console.log('  -tokens                 Create token.shared folder with design tokens');
  console.log('  --languages <langs>     i18n languages (comma-separated, e.g., en,es,fr)');
  console.log('\nExamples:');
  console.log('  npm run new-component -- Modal                    # Root structure');
  console.log('  npm run new-component -- Modal --mobile           # Mobile only');
  console.log('  npm run new-component -- Modal --web              # Web only');
  console.log('  npm run new-component -- Modal --native           # Native only');
  console.log('  npm run new-component -- Modal --mobile --web --native  # All platforms');
  console.log('  npm run new-component -- Modal --web --native -tokens -readme');
  process.exit(1);
}

const flags = {
  allFolders: args.includes('-all-folders'),
  readme: args.includes('-readme'),
  tokens: args.includes('-tokens'),
  mobile: args.includes('--mobile'),
  web: args.includes('--web'),
  native: args.includes('--native'),
};

// Parse languages (default: en,es)
const languagesArg = getArgValue('--languages') || 'en,es';
const languages = languagesArg.split(',').map(lang => lang.trim());

// Paths
const componentsPath = path.join(process.cwd(), 'client/src/lib/ui-library/components');
const componentPath = path.join(componentsPath, componentName);
const templatesPath = path.join(process.cwd(), 'client/src/command-templates/components');

// Detect mode: root or variants
const isRootMode = !flags.mobile && !flags.web && !flags.native;
const componentExists = fs.existsSync(componentPath);

// Check existing variants
let existingMobile = false;
let existingWeb = false;
let existingNative = false;
let existingRoot = false;

if (componentExists) {
  existingMobile = fs.existsSync(path.join(componentPath, 'mobile'));
  existingWeb = fs.existsSync(path.join(componentPath, 'web'));
  existingNative = fs.existsSync(path.join(componentPath, 'native'));
  existingRoot = fs.existsSync(path.join(componentPath, 'views'));
}

// Validation: prevent mixing root with variants
if (componentExists && existingRoot && (flags.mobile || flags.web || flags.native)) {
  console.error(`❌ Error: Component "${componentName}" exists with root structure.`);
  console.error('   Cannot add mobile/web/native variants to a root-structure component.');
  console.error('   Delete the component first or create a new one.');
  process.exit(1);
}

if (componentExists && (existingMobile || existingWeb || existingNative) && isRootMode) {
  console.error(`❌ Error: Component "${componentName}" exists with variant structure.`);
  console.error('   Cannot create root structure for a component with variants.');
  console.error('   Use --mobile, --web, or --native flags instead.');
  process.exit(1);
}

// Log what we're doing
if (!componentExists && isRootMode) {
  console.log(`\n🚀 Creating component: ${componentName} (root structure)\n`);
} else if (!componentExists && (flags.mobile || flags.web || flags.native)) {
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
  
  const conditions = languages.slice(1).reverse().reduce((acc, lang) => {
    return `${langLower}.startsWith('${lang}') ? '${lang}' : ${acc}`;
  }, `'${defaultLang}'`);
  
  return `  const pick = ${conditions};\n  return localDictionaries[pick];`;
}

// Create token.shared folder
function createTokenShared() {
  const tokenPath = path.join(componentPath, 'token.shared');
  
  if (fs.existsSync(tokenPath)) {
    console.log('⏭️  token.shared already exists, skipping...');
    return;
  }
  
  console.log('🎨 Creating token.shared/ with design tokens...');
  createDir(tokenPath);
  
  const replacements = { ComponentName: componentName };
  
  createFile(path.join(tokenPath, 'colors.ts'), readTemplate('token.shared/colors.ts.template'));
  createFile(path.join(tokenPath, 'spacing.ts'), readTemplate('token.shared/spacing.ts.template'));
  createFile(path.join(tokenPath, 'borders.ts'), readTemplate('token.shared/borders.ts.template'));
  createFile(path.join(tokenPath, 'shadows.ts'), readTemplate('token.shared/shadows.ts.template'));
  createFile(path.join(tokenPath, 'index.ts'), readTemplate('token.shared/index.ts.template'));
}

// Create native component structure
function createNativeComponent() {
  const nativePath = path.join(componentPath, 'native');
  const componentNameLower = componentName.toLowerCase();
  
  console.log(`📱 Creating ${componentName}/native/ structure...`);
  
  const replacements = {
    ComponentName: componentName,
    componentname: componentNameLower,
  };
  
  // Create directories
  createDir(path.join(nativePath, 'styles'));
  createDir(path.join(nativePath, 'types'));
  createDir(path.join(nativePath, 'views'));
  
  // Create styles
  createFile(
    path.join(nativePath, 'styles', `${componentName}.module.ts`),
    processTemplate(readTemplate('native/styles/ComponentName.module.ts.template'), replacements)
  );
  createFile(
    path.join(nativePath, 'styles', 'index.ts'),
    processTemplate(readTemplate('native/styles/index.ts.template'), replacements)
  );
  
  // Create types
  createFile(
    path.join(nativePath, 'types', `${componentName}.type.ts`),
    processTemplate(readTemplate('native/types/ComponentName.type.ts.template'), replacements)
  );
  createFile(
    path.join(nativePath, 'types', 'index.ts'),
    processTemplate(readTemplate('native/types/index.ts.template'), replacements)
  );
  
  // Create views
  createFile(
    path.join(nativePath, 'views', `${componentName}.view.tsx`),
    processTemplate(readTemplate('native/views/ComponentName.view.tsx.template'), replacements)
  );
  createFile(
    path.join(nativePath, 'views', 'index.ts'),
    processTemplate(readTemplate('native/views/index.ts.template'), replacements)
  );
  
  // Create native index
  createFile(
    path.join(nativePath, 'index.tsx'),
    processTemplate(readTemplate('native/index.native.tsx.template'), replacements)
  );
}

// Create web/mobile component structure (existing logic)
function createComponent(variant) {
  const variantPath = variant ? path.join(componentPath, variant) : componentPath;
  const componentNameLower = componentName.toLowerCase();
  
  const displayPath = variant ? `${componentName}/${variant}/` : `${componentName}/`;
  console.log(`📁 Creating ${displayPath} structure...`);

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
    processTemplate(readTemplate('web-mobile/css/ComponentName.module.css.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'css', `${componentName}.module.ts`),
    processTemplate(readTemplate('web-mobile/css/ComponentName.module.ts.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'css', 'index.ts'),
    `export * from './${componentName}.module';`
  );

  // Create types
  createFile(
    path.join(variantPath, 'types', `${componentName}.type.ts`),
    processTemplate(readTemplate('web-mobile/types/ComponentName.type.ts.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'types', 'index.ts'),
    `export * from './${componentName}.type';`
  );

  // Create hooks
  createFile(
    path.join(variantPath, 'hooks', `use${componentName}.hook.ts`),
    processTemplate(readTemplate('web-mobile/hooks/useComponentName.hook.ts.template'), replacements)
  );
  createFile(
    path.join(variantPath, 'hooks', 'useI18nMerge.hook.ts'),
    readTemplate('web-mobile/hooks/useI18nMerge.hook.ts.template')
  );
  createFile(
    path.join(variantPath, 'hooks', 'index.ts'),
    `export * from './use${componentName}.hook';\nexport * from './useI18nMerge.hook';`
  );

  // Create view
  createFile(
    path.join(variantPath, 'views', `${componentName}.view.tsx`),
    processTemplate(readTemplate('web-mobile/views/ComponentName.view.tsx.template'), replacements)
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
      processTemplate(readTemplate('web-mobile/environment/enviroment.ts.template'), envReplacements)
    );
    createFile(
      path.join(variantPath, 'environment', 'index.ts'),
      processTemplate(readTemplate('web-mobile/environment/index.ts.template'), envReplacements)
    );

    // Utils
    createDir(path.join(variantPath, 'utils'));
    createFile(
      path.join(variantPath, 'utils', `${componentNameLower}.util.ts`),
      processTemplate(readTemplate('web-mobile/utils/componentname.util.ts.template'), replacements)
    );
    createFile(
      path.join(variantPath, 'utils', 'index.ts'),
      `export * from './${componentNameLower}.util';`
    );

    // Provider
    createDir(path.join(variantPath, 'providers'));
    createFile(
      path.join(variantPath, 'providers', `${componentName}.provider.tsx`),
      processTemplate(readTemplate('web-mobile/providers/ComponentName.provider.tsx.template'), envReplacements)
    );
    createFile(
      path.join(variantPath, 'providers', 'index.ts'),
      `export * from './${componentName}.provider';`
    );

    // i18n
    createDir(path.join(variantPath, 'i18n'));
    languages.forEach(lang => {
      let templatePath = `web-mobile/i18n/${lang}.json.template`;
      const specificTemplatePath = path.join(templatesPath, templatePath);
      if (!fs.existsSync(specificTemplatePath)) {
        templatePath = 'web-mobile/i18n/lang.json.template';
      }
      createFile(
        path.join(variantPath, 'i18n', `${lang}.json`),
        processTemplate(readTemplate(templatePath), replacements)
      );
    });
    
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
      processTemplate(readTemplate('web-mobile/i18n/index.ts.template'), i18nIndexReplacements)
    );
  }
}

// Create or update wrapper index.tsx
function createOrUpdateWrapper() {
  const wrapperPath = path.join(componentPath, 'index.tsx');
  
  const hasMobile = fs.existsSync(path.join(componentPath, 'mobile'));
  const hasWeb = fs.existsSync(path.join(componentPath, 'web'));
  const hasNative = fs.existsSync(path.join(componentPath, 'native'));
  const hasRoot = fs.existsSync(path.join(componentPath, 'views'));

  if (hasRoot) {
    createFile(
      wrapperPath,
      `export { ${componentName}View as ${componentName} } from './views';\nexport type { ${componentName}Props } from './types';`
    );
  } else if (hasMobile && hasWeb) {
    const wrapperContent = `import { useIsMobile } from '../../hooks';
import { ${componentName} as ${componentName}Mobile } from './mobile';
import { ${componentName} as ${componentName}Web } from './web';
import type { ${componentName}Props } from './web/types';

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
    const wrapperContent = `import { useIsMobile } from '../../hooks';
import { ${componentName} as ${componentName}Mobile } from './mobile';
import { NotImplemented } from '../NotImplemented';
import type { ${componentName}Props } from './mobile/types';

export const ${componentName} = (props: ${componentName}Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <${componentName}Mobile {...props} />;
  }

  return <NotImplemented platform="Web" componentName="${componentName}" />;
};

export type { ${componentName}Props };`;
    createFile(wrapperPath, wrapperContent);
  } else if (hasWeb) {
    const wrapperContent = `import { useIsMobile } from '../../hooks';
import { ${componentName} as ${componentName}Web } from './web';
import { NotImplemented } from '../NotImplemented';
import type { ${componentName}Props } from './web/types';

export const ${componentName} = (props: ${componentName}Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotImplemented platform="Mobile" componentName="${componentName}" />;
  }

  return <${componentName}Web {...props} />;
};

export type { ${componentName}Props };`;
    createFile(wrapperPath, wrapperContent);
  }

  // Create index.native.tsx if native exists
  if (hasNative) {
    const nativeWrapperPath = path.join(componentPath, 'index.native.tsx');
    createFile(
      nativeWrapperPath,
      `export { ${componentName} } from './native';\nexport type { ${componentName}NativeProps } from './native/types';`
    );
    console.log('📱 Created index.native.tsx for Metro bundler');
  }
}

// Create README files
function createReadmes() {
  const replacements = { ComponentName: componentName };
  
  const hasMobile = fs.existsSync(path.join(componentPath, 'mobile'));
  const hasWeb = fs.existsSync(path.join(componentPath, 'web'));
  const hasNative = fs.existsSync(path.join(componentPath, 'native'));
  
  // Main README
  console.log('📝 Creating README.md...');
  createFile(
    path.join(componentPath, 'README.md'),
    processTemplate(readTemplate('readme/README.md.template'), replacements)
  );
  
  // Platform-specific READMEs
  if (hasWeb) {
    console.log('📝 Creating README-WEB-IA.md...');
    createFile(
      path.join(componentPath, 'README-WEB-IA.md'),
      processTemplate(readTemplate('readme/README-WEB-IA.md.template'), replacements)
    );
  }
  
  if (hasMobile) {
    console.log('📝 Creating README-MOBILE-IA.md...');
    createFile(
      path.join(componentPath, 'README-MOBILE-IA.md'),
      processTemplate(readTemplate('readme/README-MOBILE-IA.md.template'), replacements)
    );
  }
  
  if (hasNative) {
    console.log('📝 Creating README-MOBILE-NATIVE.md...');
    createFile(
      path.join(componentPath, 'README-MOBILE-NATIVE.md'),
      processTemplate(readTemplate('readme/README-MOBILE-NATIVE.md.template'), replacements)
    );
  }
}

// Main execution
createDir(componentPath);

// Determine what to create
if (isRootMode) {
  createComponent(null);
  createOrUpdateWrapper();
} else {
  // Create token.shared if -tokens flag or if creating native
  if (flags.tokens || flags.native) {
    createTokenShared();
  }
  
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

  if (flags.native && !existingNative) {
    createNativeComponent();
  } else if (flags.native && existingNative) {
    console.log('⏭️  Native variant already exists, skipping...');
  }

  createOrUpdateWrapper();
}

// Create READMEs if requested
if (flags.readme) {
  createReadmes();
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

// Summary
console.log(`\n✅ Component "${componentName}" ${componentExists ? 'updated' : 'created'} successfully!\n`);
console.log('📦 Structure:');
console.log(`   ${componentName}/`);

if (fs.existsSync(path.join(componentPath, 'token.shared'))) {
  console.log('   ├── token.shared/');
}
if (fs.existsSync(path.join(componentPath, 'web'))) {
  console.log('   ├── web/');
}
if (fs.existsSync(path.join(componentPath, 'mobile'))) {
  console.log('   ├── mobile/');
}
if (fs.existsSync(path.join(componentPath, 'native'))) {
  console.log('   ├── native/');
}
if (fs.existsSync(path.join(componentPath, 'views'))) {
  console.log('   ├── views/ (root)');
}
if (flags.readme) {
  console.log('   ├── README.md');
  if (fs.existsSync(path.join(componentPath, 'web'))) console.log('   ├── README-WEB-IA.md');
  if (fs.existsSync(path.join(componentPath, 'mobile'))) console.log('   ├── README-MOBILE-IA.md');
  if (fs.existsSync(path.join(componentPath, 'native'))) console.log('   ├── README-MOBILE-NATIVE.md');
}
console.log('   ├── index.tsx');
if (fs.existsSync(path.join(componentPath, 'native'))) {
  console.log('   └── index.native.tsx');
}

if (flags.allFolders) {
  console.log(`\n🌐 i18n enabled with languages: ${languages.join(', ')}`);
}

console.log(`\n💡 Import it with:`);
console.log(`   import { ${componentName} } from '@/lib/ui-library/components/${componentName}';\n`);
