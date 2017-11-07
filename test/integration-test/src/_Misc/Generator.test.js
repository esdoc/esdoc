import assert from 'assert'
import fs from 'fs'
import path from 'path'

describe('Generator', () => {
  it('creates the required AST files', () => {
    const dirs = fs.readdirSync(path.resolve(__dirname, '../../out/ast/source'))
    const expected = [ 'Abstract',
    'Access',
    'Async',
    'Deprecated',
    'Desc',
    'Emits',
    'Example',
    'Experimental',
    'Export',
    'Extends',
    'External',
    'Generator',
    'Ignore',
    'Implements',
    'Interface',
    'Kind',
    'Link',
    'Listens',
    'Name',
    'Param',
    'Property',
    'Return',
    'See',
    'Since',
    'Throws',
    'Todo',
    'Type',
    'Undocument',
    'Unknown',
    'Version',
    '_Misc' ]
    assert.deepEqual(dirs, expected)
  })
})