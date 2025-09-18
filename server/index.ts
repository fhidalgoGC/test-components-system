import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = parseInt(process.env.PORT || '5000', 10);

async function startServer() {
  try {
    // Use Vite dev server directly
    const server = await createServer({
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      server: {
        host: '0.0.0.0',
        port: port,
        strictPort: true,
      }
    });
    
    await server.listen();
    server.printUrls();
    console.log(`🚀 Frontend application started successfully on port ${port}!`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();