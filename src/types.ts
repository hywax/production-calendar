export interface Event {
  title: string
  date: Date
  description?: string
}

export type SourceName = 'xmlcalendar' | string

export interface Source {
  name: SourceName
  options?: any
  getEvents: (year: number) => Promise<Event[]>
}

export interface Calendar {
  getEvents: () => Event[]
  getIcs: () => string
  saveToFile: (path: string) => Promise<void>
}
