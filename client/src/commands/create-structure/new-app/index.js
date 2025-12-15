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

const PAGE_FILES = [
  {
    name: 'home.tsx',
    content: `export default function Home() {
  return <p data-testid="text-greeting">Hola Mundo</p>;
}
`
  },
  {
    name: 'not-found.tsx',
    content: `export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p data-testid="text-not-found">Página no encontrada</p>
    </div>
  );
}
`
  }
];

function createPageFiles(pagesFullPath) {
  const filesCreated = [];
  
  for (const file of PAGE_FILES) {
    try {
      const filePath = path.join(pagesFullPath, file.name);
      fs.writeFileSync(filePath, file.content);
      logger.file(file.name);
      filesCreated.push({ name: file.name, path: filePath });
    } catch (error) {
      logger.error(file.name, error.message);
    }
  }
  
  const gitkeepPath = path.join(pagesFullPath, '.gitkeep');
  if (fs.existsSync(gitkeepPath)) {
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
    const filesCreated = createPageFiles(pagesFolder.fullPath);
    results.files.push(...filesCreated);
  }

  logger.summary(results);
  
  return results;
}

export { config };
