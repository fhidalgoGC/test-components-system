#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createFolders, logger, updateComponentsJson, updateViteConfig } from '../utils/index.js';

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

  updateViteConfig('.');

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

export { config };
