#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createFolders } from '../utils/create-folders.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
);

function copyTemplateFiles(templateFolder, targetFolder) {
  const filesCreated = [];
  const templatePath = path.join(__dirname, 'templates', templateFolder);
  
  if (!fs.existsSync(templatePath)) {
    return filesCreated;
  }

  const files = fs.readdirSync(templatePath);
  
  for (const file of files) {
    try {
      const sourcePath = path.join(templatePath, file);
      const destPath = path.join(targetFolder, file);
      
      fs.copyFileSync(sourcePath, destPath);
      logger.file(file);
      filesCreated.push({ name: file, path: destPath });
    } catch (error) {
      logger.error(file, error.message);
    }
  }

  const gitkeepPath = path.join(targetFolder, '.gitkeep');
  if (fs.existsSync(gitkeepPath) && filesCreated.length > 0) {
    fs.unlinkSync(gitkeepPath);
  }
  
  return filesCreated;
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

  const pagesFolder = [...results.created, ...results.overwritten].find(
    folder => folder.path === 'pages'
  );
  
  if (pagesFolder) {
    const filesCreated = copyTemplateFiles('pages', pagesFolder.fullPath);
    results.files.push(...filesCreated);
  }

  logger.summary(results);
  
  return results;
}

export { config };
