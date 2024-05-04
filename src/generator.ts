import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs/promises'
import xmlcalendar from './sources/xmlcalendar'
import type { Source } from './types'
import { createCalendar } from './calendar'

const yearStart = 2024
const sources = [
  {
    file: 'russia.ics',
    lang: 'Русский',
    executor: xmlcalendar({}),
  },
  {
    file: 'belarus.ics',
    lang: 'Белорусский',
    executor: xmlcalendar({ lang: 'by' }),
  },
  {
    file: 'kazakhstan.ics',
    lang: 'Казахский',
    executor: xmlcalendar({ lang: 'kz' }),
  },
  {
    file: 'uzbekistan.ics',
    lang: 'Узбекский',
    executor: xmlcalendar({ lang: 'uz' }),
  },
]

function getYearsRange(from: number, to: number): number[] {
  const years = []

  for (let year = from; year <= to; year++) {
    years.push(year)
  }

  return years
}

function rangeSource(source: Source, years: number[]): Source {
  return {
    name: `${source.name}-range`,
    async getEvents() {
      const events = []

      for (const year of years) {
        events.push(...await source.getEvents(year))
      }

      return events
    },
  }
}

async function main() {
  const dataPath = path.join(__dirname, '../data')
  const meta = []

  for (const source of sources) {
    const calendar = await createCalendar({
      source: rangeSource(source.executor, getYearsRange(yearStart, new Date().getFullYear())),
      year: yearStart,
    })

    await calendar.saveToFile(path.join(dataPath, source.file))

    meta.push({
      file: source.file,
      lang: source.lang,
      source: source.executor.name,
    })

    await fs.writeFile(path.join(dataPath, '_meta.json'), JSON.stringify(meta, null, 2))
  }
}

main().catch((error) => {
  console.error(error)

  process.exit(1)
})
