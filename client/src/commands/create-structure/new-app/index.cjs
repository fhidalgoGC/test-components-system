#!/usr/bin/env node

const path = require('path');
const config = require('./config.json');
const { createFolders } = require('../utils/create-folders.cjs');
const { logger } = require('../utils/logger.cjs');

async function execute(options = {}) {
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

module.exports = { execute, config };
