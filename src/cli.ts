#!/usr/bin/env node
import process from 'node:process'
import { defineCommand, runMain } from 'citty'
import { description, name, version } from '../package.json'

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  run: () => {
    // @todo implement this method
  },
})

runMain(main).catch((error) => {
  console.error(error)

  process.exit(1)
})
