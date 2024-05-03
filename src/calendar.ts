import type { Calendar, Event, Source } from './types'

export interface CreateCalendarOptions {
  source?: Source
  year?: number
}

export function createCalendar(_options: CreateCalendarOptions = {}): Calendar {
  return {
    getIcs(): string {
      // @todo implement this method
      return ''
    },
    getEvents(): Event[] {
      // @todo implement this method
      return []
    },
    saveToFile(_path: string): Promise<void> {
      // @todo implement this method
      return Promise.resolve()
    },
  }
}
