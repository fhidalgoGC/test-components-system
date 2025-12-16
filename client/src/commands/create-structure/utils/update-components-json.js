import fs from 'fs';
import path from 'path';
import { logger } from './logger.js';

export function updateComponentsJson(basePath, folders) {
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
    return null;
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
    
    return componentsJsonPath;
  } catch (error) {
    logger.error('components.json', error.message);
    return null;
  }
}
