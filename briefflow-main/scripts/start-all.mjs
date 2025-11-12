#!/usr/bin/env node
import { existsSync, cpSync } from 'node:fs';
import { spawn } from 'node:child_process';

function run(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))));
  });
}

function ensureEnv() {
  if (!existsSync('.env') && existsSync('.env.example')) {
    cpSync('.env.example', '.env');
    console.log('Created .env from .env.example');
  }
}

async function ensureDeps() {
  if (!existsSync('node_modules/next')) {
    console.log('Installing dependencies...');
    await run('npm', ['i']);
  }
}

async function main() {
  ensureEnv();
  await ensureDeps();
  await run('npx', ['prisma', 'generate']);
  await run('npx', ['prisma', 'migrate', 'deploy']);
  await run('npm', ['run', 'build']);
  await run('npm', ['run', 'start']);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

