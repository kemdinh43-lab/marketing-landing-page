import { readFile, writeFile } from 'node:fs/promises'
const home = await readFile('dist/index.html', 'utf8')
const title = 'Bee Honey Spa — Dự án | Hospitality Growth'
const description = 'Dự án Bee Honey Spa: kết nối website, Google, Instagram và Klook, cùng ảnh giao diện và số liệu thực tế.'
const page = home.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*("\s*\/>)/g, `$1${description}$2`)
  .replace(/(<meta property="og:title" content=")[^"]*("\s*\/>)/, `$1${title}$2`)
await writeFile('dist/bee-honey-spa.html', page)
console.log('Created route-specific HTML metadata for Bee Honey Spa.')
