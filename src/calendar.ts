import fs from 'node:fs/promises'
import type { Calendar, Source } from './types'

export interface CreateCalendarOptions {
  source: Source
  year: number
}

export async function createCalendar(options: CreateCalendarOptions): Promise<Calendar> {
  const { source, year } = options
  const events = await source.getEvents(year)

  return {
    getIcs(): string {
      // @todo implement this method
      return ''
    },
    getEvents() {
      return events
    },
    saveToFile(path: string): Promise<void> {
      // @todo implement this method
      return fs.writeFile(path, '')
    },
  }
}
