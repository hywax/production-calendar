import fs from 'node:fs/promises'
import { type EventAttributes, createEvents } from 'ics'
import type { Calendar, Source } from './types'

export interface CreateCalendarOptions {
  source: Source
  year: number
}

function transformDate(date: Date): [number, number, number] {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
}

function nextDay(date: Date): Date {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay
}

export async function createCalendar(options: CreateCalendarOptions): Promise<Calendar> {
  const { source, year } = options
  const events = await source.getEvents(year)

  const prepareEvents = events.map<EventAttributes>((event) => {
    const createdDate = transformDate(new Date())

    return {
      title: event.title,
      description: event.description,
      start: transformDate(event.date),
      end: transformDate(nextDay(event.date)),
      lastModified: createdDate,
      created: createdDate,
      transp: 'TRANSPARENT',
      sequence: 1,
      alarms: [
        {
          action: 'display',
          trigger: { hours: 9 },
        },
      ],
    }
  })

  const { value: icsValue, error: icsError } = createEvents(prepareEvents)

  if (icsError) {
    throw new Error(`Failed to create ICS: ${icsError.message}`)
  }

  return {
    getIcs(): string {
      return icsValue || ''
    },
    getEvents() {
      return events
    },
    saveToFile(path: string): Promise<void> {
      return fs.writeFile(path, icsValue || '')
    },
  }
}
