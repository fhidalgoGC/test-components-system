#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyTemplateFiles, logger, colors } from '../utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
);

const TEMPLATES_PATH = path.join(__dirname, 'templates');

function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function replacePlaceholders(content, featureName) {
  const pascalName = toPascalCase(featureName);
  const camelName = toCamelCase(featureName);
  
  return content
    .replace(/\{\{FEATURE_NAME_PASCAL\}\}/g, pascalName)
    .replace(/\{\{FEATURE_NAME_CAMEL\}\}/g, camelName)
    .replace(/\{\{FEATURE_NAME\}\}/g, featureName);
}

function replaceFilename(filename, featureName) {
  const pascalName = toPascalCase(featureName);
  const camelName = toCamelCase(featureName);
  
  return filename
    .replace(/\{\{FEATURE_NAME_PASCAL\}\}/g, pascalName)
    .replace(/\{\{FEATURE_NAME_CAMEL\}\}/g, camelName)
    .replace(/\{\{FEATURE_NAME\}\}/g, featureName)
    .replace(/FeaturePage/g, `${pascalName}Page`)
    .replace(/feature\.provider/g, `${featureName}.provider`);
}

function removeFeatureRoutes(basePath, featureName) {
  const featureRoutesPath = path.join(basePath, '..', 'routes', 'feature-routes.ts');
  
  if (!fs.existsSync(featureRoutesPath)) {
    return false;
  }

  const camelName = toCamelCase(featureName);

  let content = fs.readFileSync(featureRoutesPath, 'utf-8');

  if (!content.includes(`${camelName}Routes`)) {
    return false;
  }

  const importRegex = new RegExp(`import\\s*\\{\\s*${camelName}Routes\\s*\\}\\s*from\\s*['"]@/features/${featureName}['"];?\\n?`, 'g');
  content = content.replace(importRegex, '');

  const spreadRegex = new RegExp(`\\s*\\.\\.\\.${camelName}Routes,?\\n?`, 'g');
  content = content.replace(spreadRegex, '\n');

  content = content.replace(/,(\s*\n\s*\])/g, '$1');

  fs.writeFileSync(featureRoutesPath, content);
  console.log(`  ${colors.green}✔ Rutas eliminadas de feature-routes.ts${colors.reset}`);
  return true;
}

function updateFeatureRoutes(basePath, featureName) {
  const featureRoutesPath = path.join(basePath, '..', 'routes', 'feature-routes.ts');
  
  if (!fs.existsSync(featureRoutesPath)) {
    console.log(`  ${colors.yellow}⚠ feature-routes.ts no encontrado en routes/${colors.reset}`);
    return false;
  }

  const camelName = toCamelCase(featureName);
  const importLine = `import { ${camelName}Routes } from '@/features/${featureName}';`;
  const routeSpread = `...${camelName}Routes,`;

  let content = fs.readFileSync(featureRoutesPath, 'utf-8');

  if (content.includes(`${camelName}Routes`)) {
    console.log(`  ${colors.yellow}⚠ Rutas de ${featureName} ya existen en feature-routes.ts${colors.reset}`);
    return false;
  }

  if (content.includes('// {{FEATURE_IMPORTS}}')) {
    content = content.replace(
      '// {{FEATURE_IMPORTS}}',
      `${importLine}\n// {{FEATURE_IMPORTS}}`
    );
  } else {
    const importMatch = content.match(/^(import .+;\n)+/m);
    if (importMatch) {
      content = content.replace(importMatch[0], `${importMatch[0]}${importLine}\n`);
    } else {
      content = `${importLine}\n${content}`;
    }
  }

  if (content.includes('featureRoutes = []')) {
    content = content.replace(
      'featureRoutes = []',
      `featureRoutes = [\n  ${routeSpread}\n]`
    );
  } else if (content.includes('featureRoutes = [];')) {
    content = content.replace(
      'featureRoutes = [];',
      `featureRoutes = [\n  ${routeSpread}\n];`
    );
  } else if (content.includes('// {{FEATURE_ROUTES}}')) {
    content = content.replace(
      '// {{FEATURE_ROUTES}}',
      `${routeSpread}\n  // {{FEATURE_ROUTES}}`
    );
  } else {
    content = content.replace(
      /(\s*)\];(\s*)$/m,
      `\n  ${routeSpread}\n];$2`
    );
  }

  fs.writeFileSync(featureRoutesPath, content);
  console.log(`  ${colors.green}✔ feature-routes.ts actualizado${colors.reset}`);
  return true;
}

function copyAllTemplates(templatesDir, targetDir, results, force = false, featureName = '') {
  if (!fs.existsSync(templatesDir)) return;
  
  const items = fs.readdirSync(templatesDir);
  
  for (const item of items) {
    const sourcePath = path.join(templatesDir, item);
    const stat = fs.statSync(sourcePath);
    
    const destFileName = replaceFilename(item, featureName);
    const destPath = path.join(targetDir, destFileName);
    
    if (stat.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyAllTemplates(sourcePath, destPath, results, force, featureName);
    } else {
      try {
        if (fs.existsSync(destPath) && !force) {
          logger.fileSkip(destFileName);
          results.filesSkipped = (results.filesSkipped || 0) + 1;
        } else {
          let content = fs.readFileSync(sourcePath, 'utf-8');
          content = replacePlaceholders(content, featureName);
          fs.writeFileSync(destPath, content);
          logger.file(destFileName);
          results.files.push({ name: destFileName, path: destPath });
        }
      } catch (error) {
        logger.error(destFileName, error.message);
      }
    }
  }
}

async function createFeatureFolders({ basePath, featureName, folders, force }) {
  const results = {
    created: [],
    skipped: [],
    overwritten: [],
    alias: null
  };

  const featurePath = path.join(basePath, featureName);
  const aliasName = `@/features/${featureName}`;

  if (fs.existsSync(featurePath)) {
    if (force) {
      fs.rmSync(featurePath, { recursive: true, force: true });
      results.overwritten.push({ path: featureName, fullPath: featurePath });
    } else {
      console.log(`  ${colors.yellow}⚠ ${featureName} (ya existe, usa --force para sobrescribir)${colors.reset}`);
      results.skipped.push({ path: featureName, fullPath: featurePath });
      return results;
    }
  }

  fs.mkdirSync(featurePath, { recursive: true });
  results.created.push({ path: featureName, fullPath: featurePath });
  results.alias = { path: featurePath, alias: aliasName };

  console.log(`  ${colors.green}✔ ${featureName}${colors.reset} → ${colors.cyan}${aliasName}${colors.reset} (creada)`);

  for (const folder of folders) {
    const folderPath = path.join(featurePath, folder.path);
    
    fs.mkdirSync(folderPath, { recursive: true });
    
    const gitkeepPath = path.join(folderPath, '.gitkeep');
    fs.writeFileSync(gitkeepPath, '');
    
    console.log(`    └─ ${folder.path}`);
    results.created.push({ path: folder.path, fullPath: folderPath, isSubfolder: true });
  }

  return results;
}

async function deleteFeature(basePath, featureName) {
  const featurePath = path.join(basePath, featureName);

  if (!fs.existsSync(featurePath)) {
    console.log(`  ${colors.red}✖ Feature "${featureName}" no existe${colors.reset}`);
    return { error: true };
  }

  fs.rmSync(featurePath, { recursive: true, force: true });
  console.log(`  ${colors.green}✔ Carpeta ${featureName} eliminada${colors.reset}`);

  removeFeatureRoutes(basePath, featureName);

  return { deleted: true };
}

export async function execute(options = {}) {
  const { force = false, targetPath = null, name = null, delete: deleteFlag = false } = options;
  
  if (!name) {
    logger.error('features', 'El flag --name es requerido. Ejemplo: features --name=login');
    return { error: true };
  }

  const basePath = targetPath || config.defaultPath;

  if (deleteFlag) {
    logger.info(`\n🗑️  Eliminando feature: ${name}\n`);
    const result = await deleteFeature(basePath, name);
    if (!result.error) {
      console.log(`\n${colors.green}✅ Feature "${name}" eliminado exitosamente${colors.reset}`);
    }
    return result;
  }
  
  logger.info(`\n📁 Ejecutando: ${config.name}`);
  logger.info(`📝 ${config.description}`);
  logger.info(`📍 Ruta base: ${basePath}`);
  logger.info(`🏷️  Feature: ${name}\n`);

  const results = await createFeatureFolders({
    basePath,
    featureName: name,
    folders: config.folders,
    force
  });

  results.files = [];

  const featureFolder = [...results.created, ...results.overwritten].find(
    folder => folder.path === name && !folder.isSubfolder
  );
  
  if (featureFolder && fs.existsSync(TEMPLATES_PATH)) {
    copyAllTemplates(TEMPLATES_PATH, featureFolder.fullPath, results, force, name);
  }

  updateFeatureRoutes(basePath, name);

  const subfolders = results.created.filter(f => f.isSubfolder).length;
  const mainCreated = results.created.filter(f => !f.isSubfolder).length;

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`${colors.green}✅ Feature "${name}" creado exitosamente${colors.reset}\n`);
  console.log(`${colors.cyan}📊 Resumen:${colors.reset}`);
  console.log(`   Feature:       ${mainCreated}`);
  console.log(`   Subcarpetas:   ${subfolders}`);
  console.log(`   Saltadas:      ${results.skipped.length}`);
  console.log(`   Sobrescritas:  ${results.overwritten.length}`);
  if (results.files.length > 0) {
    console.log(`   Archivos:      ${results.files.length}`);
  }
  
  if (results.alias) {
    console.log(`\n${colors.cyan}🔗 Alias sugerido:${colors.reset}`);
    console.log(`   "${results.alias.alias}": "${results.alias.path}"`);
  }

  return results;
}

export { config };
