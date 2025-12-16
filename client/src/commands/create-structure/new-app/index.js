#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createFolders, logger } from '../utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
);

const TEMPLATES_PATH = path.join(__dirname, 'templates');

function copyAllTemplates(templatesDir, targetDir, results, force = false) {
  if (!fs.existsSync(templatesDir)) return;
  
  const items = fs.readdirSync(templatesDir);
  
  for (const item of items) {
    const sourcePath = path.join(templatesDir, item);
    const destPath = path.join(targetDir, item);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyAllTemplates(sourcePath, destPath, results, force);
    } else {
      try {
        if (fs.existsSync(destPath) && !force) {
          logger.fileSkip(item);
          results.filesSkipped = (results.filesSkipped || 0) + 1;
        } else {
          fs.copyFileSync(sourcePath, destPath);
          logger.file(item);
          results.files.push({ name: item, path: destPath });
        }
      } catch (error) {
        logger.error(item, error.message);
      }
    }
  }
}

export async function execute(options = {}) {
  const { force = false, targetPath = null } = options;
  
  const basePath = targetPath || config.defaultPath;
  
  logger.info(`\n📁 Ejecutando: ${config.name}`);
  logger.info(`📝 ${config.description}`);
  logger.info(`📍 Ruta base: ${basePath}\n`);

  const results = await createFolders({
    basePath,
    folders: config.folders,
    force
  });

  results.files = [];

  copyAllTemplates(TEMPLATES_PATH, basePath, results, force);

  // Update components.json with aliases
  updateComponentsJson(basePath, config.folders);

  logger.summary(results);
  
  return results;
}

function updateComponentsJson(basePath, folders) {
  // Look for components.json in parent directories
  let searchPath = basePath;
  let componentsJsonPath = null;
  
  for (let i = 0; i < 5; i++) {
    const candidate = path.join(searchPath, 'components.json');
    if (fs.existsSync(candidate)) {
      componentsJsonPath = candidate;
      break;
    }
    const parent = path.dirname(searchPath);
    if (parent === searchPath) break;
    searchPath = parent;
  }
  
  if (!componentsJsonPath) {
    // Try project root (process.cwd())
    const rootCandidate = path.join(process.cwd(), 'components.json');
    if (fs.existsSync(rootCandidate)) {
      componentsJsonPath = rootCandidate;
    }
  }
  
  if (!componentsJsonPath) {
    logger.info('\n📋 components.json no encontrado, saltando actualización de aliases');
    return;
  }
  
  try {
    const componentsJson = JSON.parse(fs.readFileSync(componentsJsonPath, 'utf-8'));
    
    if (!componentsJson.aliases) {
      componentsJson.aliases = {};
    }
    
    // Build aliases from folders config
    for (const folder of folders) {
      if (folder.alias) {
        const aliasKey = folder.path;
        componentsJson.aliases[aliasKey] = folder.alias;
      }
    }
    
    // Add special aliases
    componentsJson.aliases['utils'] = '@/lib/utils';
    componentsJson.aliases['ui'] = '@/components/ui';
    
    fs.writeFileSync(componentsJsonPath, JSON.stringify(componentsJson, null, 2));
    logger.info(`\n📋 Aliases actualizados en ${componentsJsonPath}`);
  } catch (error) {
    logger.error('components.json', error.message);
  }
}

export { config };
