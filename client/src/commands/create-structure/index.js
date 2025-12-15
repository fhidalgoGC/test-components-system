#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { logger } from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadCommands() {
  const commands = {};
  const commandsDir = __dirname;
  
  const entries = fs.readdirSync(commandsDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'utils') {
      const commandPath = path.join(commandsDir, entry.name);
      const indexPath = path.join(commandPath, 'index.js');
      const configPath = path.join(commandPath, 'config.json');
      
      if (fs.existsSync(indexPath) && fs.existsSync(configPath)) {
        const module = await import(indexPath);
        commands[entry.name] = module;
      }
    }
  }
  
  return commands;
}

function parseArgs(args) {
  const options = {
    command: null,
    force: false,
    path: null,
    name: null,
    help: false
  };

  for (const arg of args) {
    if (arg === '--force' || arg === '-f') {
      options.force = true;
    } else if (arg.startsWith('--path=')) {
      options.path = arg.replace('--path=', '');
    } else if (arg.startsWith('-path=')) {
      options.path = arg.replace('-path=', '');
    } else if (arg.startsWith('--name=')) {
      options.name = arg.replace('--name=', '');
    } else if (arg.startsWith('-name=')) {
      options.name = arg.replace('-name=', '');
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (!arg.startsWith('-')) {
      options.command = arg;
    }
  }

  return options;
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);
  const commands = await loadCommands();

  if (options.help || !options.command) {
    logger.help(commands);
    return;
  }

  const command = commands[options.command];

  if (!command) {
    console.log(`\n❌ Comando no encontrado: ${options.command}`);
    console.log(`\nComandos disponibles: ${Object.keys(commands).join(', ')}`);
    console.log('Usa --help para más información\n');
    process.exit(1);
  }

  try {
    await command.execute({
      force: options.force,
      targetPath: options.path,
      name: options.name
    });
  } catch (error) {
    console.error(`\n❌ Error ejecutando ${options.command}:`, error.message);
    process.exit(1);
  }
}

main();
