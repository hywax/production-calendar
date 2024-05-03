#!/usr/bin/env node
import process from 'node:process'
import { defineCommand, runMain } from 'citty'
import consola from 'consola'
import { description, name, version } from '../package.json'
import { createCalendar } from './calendar'
import type { Source, SourceName } from './types'
import xmlcalendar from './sources/xmlcalendar'

function createSource(source: SourceName, options?: any): Source {
  switch (source) {
    case 'xmlcalendar':
      return xmlcalendar(options)
    default:
      throw new Error(`Source "${source}" not found`)
  }
}

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    source: {
      type: 'string',
      alias: 's',
      description: 'Source name to fetch events from (e.g. xmlcalendar)',
      default: 'xmlcalendar',
    },
    year: {
      type: 'boolean',
      alias: 'y',
      description: 'Year to fetch events for. Defaults to the current year',
      required: false,
    },
    file: {
      type: 'string',
      alias: 'f',
      description: 'Calendar file name to create or update',
      default: 'calendar.ics',
    },
    params: {
      type: 'string',
      alias: 'p',
      description: 'Source specific parameters. Should be a JSON string',
      default: '{}',
    },
    output: {
      type: 'boolean',
      alias: 'o',
      description: 'Set to true to output the calendar file to stdout without saving it to a file',
      default: false,
    },
  },
  run: async ({ args }) => {
    const source = createSource(args.source, JSON.parse(args.params))
    const calendar = await createCalendar({
      source,
      year: Number(args.year) || new Date().getFullYear(),
    })

    if (args.output) {
      consola.log(calendar.getIcs())
      process.exit(0)
    }

    await calendar.saveToFile(args.file)
    consola.success('Calendar saved to `%s`', args.path)
  },
})

runMain(main).catch((error) => {
  console.error(error)

  process.exit(1)
})
