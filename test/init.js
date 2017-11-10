import fs from 'fs'
import path from 'path'
import esdoc2 from '../src/esdoc2.js'

export function generateDocs (configPath) {
  return esdoc2.generate(require(path.resolve(configPath)))
}

export default generateDocs('./test/integration-test/esdoc2.json').then(() => {
  console.log(`== finish ==`)
  global.docs = JSON.parse(fs.readFileSync('./test/integration-test/out/index.json').toString())
}).catch((e) => {
  console.log('== init.js | esdoc2.generate | catch ==', e)
})
