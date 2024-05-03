export interface Event {
  title: string
  date: Date
  description?: string
}

export interface Source {
  name: string
  getEvents: (year: number) => Event[]
}

export interface Calendar {
  getEvents: () => Event[]
  getIcs: () => string
  saveToFile: (path: string) => void
}
