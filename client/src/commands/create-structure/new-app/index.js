#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import { createFolders } from '../utils/create-folders.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
  await import('fs').then(fs => 
    fs.default.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
  )
);

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

  logger.summary(results);
  
  return results;
}

export { config };
