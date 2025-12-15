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

const TEMPLATE_MAPPINGS = [
  { template: 'pages', target: 'pages' },
  { template: 'hooks', target: 'hooks' },
  { template: 'lib', target: 'lib' },
  { template: 'components/ui', target: 'components/ui', createSubfolder: true }
];

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

  const allFolders = [...results.created, ...results.overwritten];

  // Copy root-level template files (like App.tsx) directly to basePath
  const rootFiles = fs.readdirSync(TEMPLATES_PATH).filter(item => {
    const itemPath = path.join(TEMPLATES_PATH, item);
    return fs.statSync(itemPath).isFile();
  });
  
  for (const file of rootFiles) {
    try {
      const sourcePath = path.join(TEMPLATES_PATH, file);
      const destPath = path.join(basePath, file);
      fs.copyFileSync(sourcePath, destPath);
      logger.file(file);
      results.files.push({ name: file, path: destPath });
    } catch (error) {
      logger.error(file, error.message);
    }
  }

  for (const mapping of TEMPLATE_MAPPINGS) {
    const templatePath = path.join(TEMPLATES_PATH, mapping.template);
    
    if (!fs.existsSync(templatePath)) {
      continue;
    }

    let targetFolder;
    
    if (mapping.createSubfolder) {
      const parentPath = mapping.target.split('/')[0];
      const parentFolder = allFolders.find(folder => folder.path === parentPath);
      
      if (parentFolder) {
        targetFolder = path.join(parentFolder.fullPath, ...mapping.target.split('/').slice(1));
        fs.mkdirSync(targetFolder, { recursive: true });
      }
    } else {
      const folder = allFolders.find(folder => folder.path === mapping.target);
      if (folder) {
        targetFolder = folder.fullPath;
      }
    }

    if (targetFolder) {
      const filesCreated = copyTemplateFiles(TEMPLATES_PATH, mapping.template, targetFolder);
      results.files.push(...filesCreated);
    }
  }

  logger.summary(results);
  
  return results;
}

export { config };
