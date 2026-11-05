import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
const source = await readFile('src/imageAssets.ts', 'utf8')
const assets = JSON.parse(source.slice(source.indexOf('=') + 1))
for (const [url, image] of Object.entries(assets)) {
  assert(image.width > 0 && image.height > 0, `Missing intrinsic size: ${url}`)
  for (const candidate of image.srcSet.split(', ')) await access(`public${candidate.split(' ')[0]}`)
}
for (const file of ['public/fonts/manrope-latin.woff2', 'public/fonts/manrope-vietnamese.woff2', 'public/favicon.svg', 'public/robots.txt']) await access(file)
const home = await readFile('dist/index.html', 'utf8')
const page = await readFile('dist/bee-honey-spa.html', 'utf8')
assert(home.includes('lang="vi"'))
assert(!home.includes('Figma Make App') && !home.includes('noindex'))
assert(page.includes('<title>Bee Honey Spa — Dự án | Hospitality Growth</title>'))
assert(!page.includes('content="Kết nối website'), 'Case-study metadata not replaced')
const hashedFiles = await readdir('dist/assets')
assert(hashedFiles.some(file => file.startsWith('BeeHoneyCase-')), 'Case study should be split from landing bundle')
const config = JSON.parse(await readFile('vercel.json','utf8'))
assert(config.outputDirectory === 'dist')
assert(config.rewrites[0].destination === '/bee-honey-spa.html')
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'))
assert(lock.packages['node_modules/@rolldown/binding-linux-x64-gnu'], 'Linux build dependency missing from lockfile')
for (const name of ['@emnapi/core', '@emnapi/runtime', '@emnapi/wasi-threads', 'tslib']) {
  assert(lock.packages[`node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/${name}`], `Bundled Tailwind dependency missing from lockfile: ${name}`)
}
const artworkSource = await readFile('src/artworkAssets.ts', 'utf8')
const artworkUrls = [...artworkSource.matchAll(/"(?:src|preview)": "([^"]+)"/g)].map(match => match[1])
assert(artworkUrls.length === 24, 'Expected eight device artworks and four logos with previews')
for (const url of artworkUrls) await access(`public${url}`)
console.log(`Verified ${artworkUrls.length} supplied artwork files;  ${Object.keys(assets).length} image sources + responsive variants, fonts, metadata, Linux lockfile and Vercel config.`)
