import { XMLParser } from 'fast-xml-parser'
import type { Event } from '../types'
import { defineSource } from './utils'

export interface XmlCalendarOptions {
  lang?: 'ru' | 'by' | 'kz' | 'uz'
  dateFormatLocale?: Intl.UnicodeBCP47LocaleIdentifier
}

export interface SchemaCalendarData {
  calendar: {
    holidays: {
      holiday: {
        id: string
        title: string
      }[]
    }
    days: {
      day: {
        d: string
        t: string
        h?: string
        f?: string
      }[]
    }
  }
}

async function fetchCalendarData(lang: string, year: number): Promise<SchemaCalendarData> {
  const response = await fetch(`https://xmlcalendar.ru/data/${lang}/${year}/calendar.xml`)

  if (!response.ok) {
    throw new Error(`Calendar ${lang}, ${year}: ${response.statusText}`)
  }

  const xml: string = await response.text()
  const parser = new XMLParser({
    attributeNamePrefix: '',
    ignoreAttributes: false,
  })

  return parser.parse(xml)
}

export default defineSource((options: XmlCalendarOptions) => {
  const {
    lang = 'ru',
    dateFormatLocale = 'ru-RU',
  } = options

  return {
    name: 'xmlcalendar',
    options,
    async getEvents(year: number) {
      const data = await fetchCalendarData(lang, year)
      const holidayMap = new Map(data.calendar.holidays.holiday.map((h) => [h.id, h.title]))
      const typeMap = new Map([
        ['1', 'Выходной день'],
        ['2', 'Сокращенный день'],
        ['3', 'Рабочий день'],
      ])

      return data.calendar.days.day.map<Event>((day) => {
        const date = new Date(`${year}.${day.d}`)
        const rescheduledDate = day.f ? new Date(`${year}.${day.f}`) : null
        const description = day.h ? `${holidayMap.get(day.h)}` : null

        return {
          title: typeMap.get(day.t) || 'Неизвестный тип дня',
          date,
          description: description || (rescheduledDate && `Перенесен с ${rescheduledDate.toLocaleDateString(dateFormatLocale)}`) || '',
        }
      })
    },
  }
})
