#!/usr/bin/env node
import { existsSync, cpSync, readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';

function run(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))));
  });
}

function runConcurrent(cmd, args = [], opts = {}) {
  const p = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
  return p;
}

function ensureEnv() {
  // Check for main app env
  if (!existsSync('apps/main/.env') && existsSync('apps/main/.env.example')) {
    cpSync('apps/main/.env.example', 'apps/main/.env');
    console.log('Created .env from .env.example for main app');
  }
  // Check for landing page env
  if (!existsSync('apps/landing/.env') && existsSync('apps/landing/.env.example')) {
    cpSync('apps/landing/.env.example', 'apps/landing/.env');
    console.log('Created .env from .env.example for landing page');
  }
}

function parseEnv() {
  try {
    const raw = readFileSync('apps/main/.env', 'utf8');
    const obj = Object.fromEntries(
      raw
        .split(/\r?\n/)
        .filter((l) => l && !l.trim().startsWith('#') && l.includes('='))
        .map((l) => {
          const i = l.indexOf('=');
          const k = l.slice(0, i).trim();
          let v = l.slice(i + 1).trim();
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
          return [k, v];
        })
    );
    return obj;
  } catch {
    return {};
  }
}

async function checkOllama(baseUrl) {
  try {
    const url = new URL(baseUrl || 'http://localhost:11434/v1');
    const root = `${url.origin}/v1/models`;
    const res = await fetch(root, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log('✓ Ollama API reachable:', root);
  } catch (e) {
    console.warn('! Ollama API not reachable. Ensure `ollama serve` is running.');
  }
}

async function ensureDeps() {
  if (!existsSync('node_modules')) {
    console.log('Installing root dependencies...');
    await run('npm', ['i']);
  }
  if (!existsSync('apps/main/node_modules')) {
    console.log('Installing main app dependencies...');
    await run('npm', ['i'], { cwd: 'apps/main' });
  }
  if (!existsSync('apps/landing/node_modules')) {
    console.log('Installing landing page dependencies...');
    await run('npm', ['i'], { cwd: 'apps/landing' });
  }
}

async function prismaSetup() {
  await run('npx', ['prisma', 'generate'], { cwd: 'apps/main' });
  const hasMigrations = existsSync('apps/main/prisma/migrations') && readdirSync('apps/main/prisma/migrations').length > 0;
  if (hasMigrations) {
    await run('npx', ['prisma', 'migrate', 'dev'], { cwd: 'apps/main' });
  } else {
    await run('npx', ['prisma', 'migrate', 'dev', '--name', 'init'], { cwd: 'apps/main' });
  }
}

async function main() {
  ensureEnv();
  const env = parseEnv();
  await ensureDeps();
  await prismaSetup();
  await checkOllama(env.OPENAI_BASE_URL || 'http://localhost:11434/v1');

  console.log('Starting both applications...');
  console.log('Main app: http://localhost:3000');
  console.log('Landing page: http://localhost:3001');

  // Start main app on port 3000
  const mainApp = runConcurrent('npm', ['run', 'dev'], { cwd: 'apps/main' });

  // Start landing page on port 3001
  const landingApp = runConcurrent('npm', ['run', 'dev', '--', '--port', '3001'], { cwd: 'apps/landing' });

  // Keep both processes running
  await Promise.all([
    new Promise((resolve, reject) => {
      mainApp.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Main app exited with code ${code}`));
        else resolve();
      });
    }),
    new Promise((resolve, reject) => {
      landingApp.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Landing app exited with code ${code}`));
        else resolve();
      });
    })
  ]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

