import fs from 'node:fs/promises'
import type { DateTime, EventAttributes } from 'ics'
import { createEvents } from 'ics'
import type { Calendar, Source } from './types'

export interface CreateCalendarOptions {
  source: Source
  year: number
}

function transformDate(date: Date): DateTime {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
}

function nextDay(date: Date): Date {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay
}

function dateHash(str: string): string {
  const slice = str.split('')
  const code = slice.reduce((hashCode: number, currentVal: string) => {
    hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode

    return hashCode
  }, 0)

  return code.toString(16).replace('-', '')
}

export async function createCalendar(options: CreateCalendarOptions): Promise<Calendar> {
  const { source, year } = options
  const events = await source.getEvents(year)

  const prepareEvents = events.map<EventAttributes>((event) => {
    return {
      uid: dateHash(`${event.title}${event.date}`),
      title: event.title,
      description: event.description,
      start: transformDate(event.date),
      end: transformDate(nextDay(event.date)),
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

  const { value: icsValue, error: icsError } = createEvents(prepareEvents, {
    productId: 'production-calendar/ics',
  })

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
