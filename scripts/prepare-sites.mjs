import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'

await cp('docs/.vitepress/dist', 'dist/assets', { recursive: true })
await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })
await cp('.openai/hosting.json', 'dist/.openai/hosting.json')
const worker = `export default { async fetch(request, env) { const url = new URL(request.url); let path = url.pathname; if (path.endsWith('/')) path += 'index.html'; const response = await env.ASSETS.fetch(new Request(new URL(path, url), request)); if (response.status !== 404) return response; return env.ASSETS.fetch(new Request(new URL('/404.html', url), request)); } }\n`
await writeFile('dist/server/index.js', worker)
const manifest = JSON.parse(await readFile('dist/.openai/hosting.json', 'utf8'))
await writeFile('dist/.openai/hosting.json', JSON.stringify(manifest, null, 2) + '\n')
