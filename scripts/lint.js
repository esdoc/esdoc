#!/usr/bin/env node

require('./sh')(
  'yarn lint:yaml', 
  'yarn lint:json', 
  process.env.CI 
    ? 'yarn lint:es:ci' 
    : 'yarn lint:es')
