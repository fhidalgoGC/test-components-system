import fs from 'fs';
import path from 'path';
import { logger } from './logger.js';

export async function createFolders({ basePath, folders, force = false }) {
  const results = {
    created: [],
    skipped: [],
    overwritten: [],
    errors: [],
    files: []
  };

  for (const folder of folders) {
    const folderPath = typeof folder === 'string' 
      ? folder 
      : folder.path;
    
    const alias = typeof folder === 'object' ? folder.alias : null;
    const files = typeof folder === 'object' ? folder.files : null;
    const fullPath = path.join(process.cwd(), basePath, folderPath);

    try {
      const exists = fs.existsSync(fullPath);

      if (exists && !force) {
        logger.skip(folderPath, alias);
        results.skipped.push({ path: folderPath, alias });
      } else if (exists && force) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        fs.mkdirSync(fullPath, { recursive: true });
        logger.overwrite(folderPath, alias);
        results.overwritten.push({ path: folderPath, alias });
        
        if (files && Array.isArray(files)) {
          await createFiles(fullPath, files, results);
        }
      } else {
        fs.mkdirSync(fullPath, { recursive: true });
        logger.create(folderPath, alias);
        results.created.push({ path: folderPath, alias });
        
        if (files && Array.isArray(files)) {
          await createFiles(fullPath, files, results);
        }
      }

      const gitkeepPath = path.join(fullPath, '.gitkeep');
      const hasFiles = files && Array.isArray(files) && files.length > 0;
      if (!fs.existsSync(gitkeepPath) && !hasFiles) {
        fs.writeFileSync(gitkeepPath, '');
      }

    } catch (error) {
      logger.error(folderPath, error.message);
      results.errors.push({ path: folderPath, error: error.message });
    }
  }

  return results;
}

async function createFiles(folderPath, files, results) {
  for (const file of files) {
    try {
      const filePath = path.join(folderPath, file.name);
      fs.writeFileSync(filePath, file.content);
      logger.file(file.name);
      results.files.push({ name: file.name, path: filePath });
    } catch (error) {
      logger.error(file.name, error.message);
      results.errors.push({ path: file.name, error: error.message });
    }
  }
}

export function generateAliasConfig(folders, basePath) {
  const aliases = {};
  
  for (const folder of folders) {
    if (typeof folder === 'object' && folder.alias) {
      const aliasKey = folder.alias.replace('@/', '@/');
      aliases[aliasKey] = path.join(basePath, folder.path);
    }
  }
  
  return aliases;
}
