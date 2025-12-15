const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  cyan: '\x1b[36m'
};

const logger = {
  info(message) {
    console.log(`${colors.blue}${message}${colors.reset}`);
  },

  create(folderPath, alias) {
    const aliasText = alias ? `${colors.gray} → ${alias}${colors.reset}` : '';
    console.log(`  ${colors.green}✔${colors.reset} ${folderPath}${aliasText} ${colors.green}(creada)${colors.reset}`);
  },

  skip(folderPath, alias) {
    const aliasText = alias ? `${colors.gray} → ${alias}${colors.reset}` : '';
    console.log(`  ${colors.yellow}⚠${colors.reset} ${folderPath}${aliasText} ${colors.yellow}(ya existe, saltando)${colors.reset}`);
  },

  overwrite(folderPath, alias) {
    const aliasText = alias ? `${colors.gray} → ${alias}${colors.reset}` : '';
    console.log(`  ${colors.cyan}↻${colors.reset} ${folderPath}${aliasText} ${colors.cyan}(sobrescrita)${colors.reset}`);
  },

  error(folderPath, message) {
    console.log(`  ${colors.red}✖${colors.reset} ${folderPath} ${colors.red}(error: ${message})${colors.reset}`);
  },

  summary(results) {
    console.log('\n' + '─'.repeat(50));
    
    const total = results.created.length + results.skipped.length + results.overwritten.length;
    
    if (results.errors.length === 0) {
      console.log(`${colors.green}✅ Estructura creada exitosamente${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️  Estructura creada con algunos errores${colors.reset}`);
    }
    
    console.log(`\n📊 Resumen:`);
    console.log(`   ${colors.green}Creadas:${colors.reset}      ${results.created.length}`);
    console.log(`   ${colors.yellow}Saltadas:${colors.reset}     ${results.skipped.length}`);
    console.log(`   ${colors.cyan}Sobrescritas:${colors.reset} ${results.overwritten.length}`);
    
    if (results.errors.length > 0) {
      console.log(`   ${colors.red}Errores:${colors.reset}      ${results.errors.length}`);
    }
    
    console.log(`   ${colors.gray}Total:${colors.reset}        ${total}\n`);
  },

  help(commands) {
    console.log(`\n${colors.blue}📦 gc-ui-setup - Generador de estructuras${colors.reset}\n`);
    console.log('Uso: npx gc-ui-setup <comando> [opciones]\n');
    console.log('Comandos disponibles:');
    
    for (const [name, cmd] of Object.entries(commands)) {
      const padding = ' '.repeat(Math.max(0, 15 - name.length));
      console.log(`  ${colors.cyan}${name}${colors.reset}${padding}${cmd.config.description}`);
    }
    
    console.log('\nOpciones:');
    console.log(`  ${colors.gray}--force${colors.reset}          Sobrescribe carpetas existentes`);
    console.log(`  ${colors.gray}--path=<ruta>${colors.reset}    Define ruta base personalizada`);
    console.log(`  ${colors.gray}--help${colors.reset}           Muestra esta ayuda\n`);
  }
};

export { logger, colors };
