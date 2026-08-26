import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleApiChatRequest } from './api/chat.js'

function apiChatPlugin() {
  return {
    name: 'api-chat-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const reqData = body ? JSON.parse(body) : {};
              const result = await handleApiChatRequest(reqData);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiChatPlugin()],
  server: {
    port: 5173,
    host: true
  }
})
