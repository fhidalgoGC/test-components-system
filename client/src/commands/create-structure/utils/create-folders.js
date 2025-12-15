import fs from 'fs';
import path from 'path';
import { logger } from './logger.js';

export async function createFolders({ basePath, folders, force = false }) {
  const results = {
    created: [],
    skipped: [],
    overwritten: [],
    errors: []
  };

  for (const folder of folders) {
    const folderPath = typeof folder === 'string' 
      ? folder 
      : folder.path;
    
    const alias = typeof folder === 'object' ? folder.alias : null;
    const resolvedBasePath = path.isAbsolute(basePath) ? basePath : path.join(process.cwd(), basePath);
    const fullPath = path.join(resolvedBasePath, folderPath);

    try {
      const exists = fs.existsSync(fullPath);

      if (exists && !force) {
        logger.skip(folderPath, alias);
        results.skipped.push({ path: folderPath, alias, fullPath });
      } else if (exists && force) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        fs.mkdirSync(fullPath, { recursive: true });
        logger.overwrite(folderPath, alias);
        results.overwritten.push({ path: folderPath, alias, fullPath });
      } else {
        fs.mkdirSync(fullPath, { recursive: true });
        logger.create(folderPath, alias);
        results.created.push({ path: folderPath, alias, fullPath });
      }

      const gitkeepPath = path.join(fullPath, '.gitkeep');
      if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, '');
      }

    } catch (error) {
      logger.error(folderPath, error.message);
      results.errors.push({ path: folderPath, error: error.message });
    }
  }

  return results;
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
