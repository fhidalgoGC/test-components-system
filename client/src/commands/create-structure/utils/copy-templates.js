import fs from 'fs';
import path from 'path';
import { logger } from './logger.js';

export function copyTemplateFiles(templatesBasePath, templateFolder, targetFolder) {
  const filesCreated = [];
  const templatePath = path.join(templatesBasePath, templateFolder);
  
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
