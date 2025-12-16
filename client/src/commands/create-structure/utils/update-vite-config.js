import fs from 'fs';
import path from 'path';

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

export function updateViteConfig(targetPath = '.') {
  const viteConfigPath = path.join(targetPath, 'vite.config.ts');
  
  if (!fs.existsSync(viteConfigPath)) {
    console.log(`  ${colors.yellow}⚠ vite.config.ts no encontrado${colors.reset}`);
    return false;
  }

  let content = fs.readFileSync(viteConfigPath, 'utf-8');

  const aliasToAdd = `"@/lib/ui-library": path.resolve(
        import.meta.dirname,
        "node_modules/GC-UI-COMPONENTS/client/src/lib/ui-library",
      )`;

  if (content.includes('@/lib/ui-library')) {
    console.log(`  ${colors.yellow}⚠ Alias @/lib/ui-library ya existe en vite.config.ts${colors.reset}`);
    return false;
  }

  const aliasBlockRegex = /(alias:\s*\{)([\s\S]*?)(\s*\},)/;
  const match = content.match(aliasBlockRegex);

  if (match) {
    const aliasContent = match[2].trimEnd();
    const needsComma = !aliasContent.endsWith(',');
    
    content = content.replace(
      aliasBlockRegex,
      `$1${aliasContent}${needsComma ? ',' : ''}\n      ${aliasToAdd},\n    },`
    );
    
    fs.writeFileSync(viteConfigPath, content);
    console.log(`  ${colors.green}✔ Alias @/lib/ui-library agregado a vite.config.ts${colors.reset}`);
    return true;
  } else {
    console.log(`  ${colors.yellow}⚠ No se encontró la sección alias en vite.config.ts${colors.reset}`);
    return false;
  }
}
