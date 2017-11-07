import fs from 'fs'
import path from 'path'
import ESDoc from '../src/ESDoc.js'

export function generateDocs (configPath) {
  return ESDoc.generate(require(path.resolve(configPath)))
}

export default generateDocs('./test/integration-test/esdoc.json').then(() => {
  console.log(`== finish ==`)
  global.docs = JSON.parse(fs.readFileSync('./test/integration-test/out/index.json').toString())
}).catch((e) => {
  console.log('== init.js | ESDoc.generate | catch ==', e)
})
