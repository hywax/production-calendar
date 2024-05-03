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
  args: {
    source: {
      type: 'string',
      description: 'Source name to fetch events from (e.g. xmlcalendar)',
      default: 'xmlcalendar',
    },
    year: {
      type: 'string', // @todo change "year" to number type. Now citty does not support the number type. Support is expected in ^0.2.0 version.
      description: 'Year to fetch events for',
      default: new Date().getFullYear().toString(),
    },
    path: {
      type: 'string',
      description: 'Calendar file name to create or update',
      default: 'calendar.ics',
    },
    output: {
      type: 'boolean',
      description: 'Set to true to output the calendar file to stdout without saving it to a file',
      default: false,
    },
  },
  run: () => {
    // @todo implement this method
  },
})

runMain(main).catch((error) => {
  console.error(error)

  process.exit(1)
})
