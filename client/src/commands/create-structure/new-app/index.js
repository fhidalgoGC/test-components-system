#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createFolders, copyTemplateFiles, logger } from '../utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
);

const TEMPLATES_PATH = path.join(__dirname, 'templates');

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
    const filesCreated = copyTemplateFiles(TEMPLATES_PATH, 'pages', pagesFolder.fullPath);
    results.files.push(...filesCreated);
  }

  logger.summary(results);
  
  return results;
}

export { config };
