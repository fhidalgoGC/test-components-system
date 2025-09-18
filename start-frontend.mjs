#!/usr/bin/env node
import { createServer } from 'vite'

const server = await createServer({
  // Use the existing vite.config.ts configuration
  configFile: './vite.config.ts',
  server: {
    host: '0.0.0.0',
    port: 5000
  }
})

await server.listen()

server.printUrls()
console.log('🚀 Frontend application started successfully!')