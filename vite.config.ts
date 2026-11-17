import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH || '/';
  const rootDir = import.meta.dirname;

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." still resolve in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(rootDir, 'dist');
          const srcAssets = path.resolve(rootDir, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }
        },
      },
      {
        name: 'dev-source-zip-export',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use('/download-source.zip', (_req, res) => {
            try {
              const zipOut = '/tmp/gaming-deals-source.zip';
              const script = [
                'import os, sys, zipfile',
                'root, out = sys.argv[1], sys.argv[2]',
                "skip_dirs = {'node_modules', 'dist', '.git', '.vite', 'build', 'coverage'}",
                'with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:',
                '    for cur, dirs, files in os.walk(root):',
                '        dirs[:] = [d for d in dirs if d not in skip_dirs]',
                '        for f in files:',
                '            if f.startswith(".env") and f != ".env.example": continue',
                '            if f == ".DS_Store" or f.endswith(".log"): continue',
                '            full = os.path.join(cur, f)',
                '            rel = os.path.relpath(full, root)',
                '            zf.write(full, rel)',
              ].join('\n');
              execFileSync('python3', ['-c', script, rootDir, zipOut]);
              const data = fs.readFileSync(zipOut);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/zip');
              res.setHeader(
                'Content-Disposition',
                'attachment; filename="gaming-deals-source.zip"'
              );
              res.setHeader('Content-Length', String(data.length));
              res.end(data);
            } catch (err) {
              res.statusCode = 500;
              res.end(`Failed to export zip: ${err instanceof Error ? err.message : String(err)}`);
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'src'),
      },
    },
    build: {
      target: 'es2020',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/motion')) {
              return 'motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router')
            ) {
              return 'react';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
