import path from 'node:path'
import process from 'node:process'
import xmlcalendar from './sources/xmlcalendar'
import type { Source } from './types'
import { createCalendar } from './calendar'

const yearStart = 2024
const sources = [
  {
    file: 'ru.ics',
    lang: 'Русский',
    executor: xmlcalendar({}),
  },
  {
    file: 'by.ics',
    lang: 'Белорусский',
    executor: xmlcalendar({ lang: 'by' }),
  },
  {
    file: 'kz.ics',
    lang: 'Казахский',
    executor: xmlcalendar({ lang: 'kz' }),
  },
  {
    file: 'uz.ics',
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
  for (const source of sources) {
    const calendar = await createCalendar({
      source: rangeSource(source.executor, getYearsRange(yearStart, new Date().getFullYear())),
      year: yearStart,
    })

    await calendar.saveToFile(path.join(__dirname, '../data/', source.file))
  }
}

main().catch((error) => {
  console.error(error)

  process.exit(1)
})
