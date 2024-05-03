import { defineSource } from './utils'

export interface XmlCalendarOptions {
  lang: 'ru' | 'by' | 'kz' | 'uz'
}

export default defineSource((options: XmlCalendarOptions = { lang: 'ru' }) => {
  return {
    name: 'xmlcalendar',
    options,
    getEvents() {
      // @todo implement this method
      return []
    },
  }
})
