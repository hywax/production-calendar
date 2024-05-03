# Производственный календарь

## Пример использования

```typescript
import { createCalendar } from 'production-calendar'
import xmlcalendar from 'production-calendar/sources/xmlcalendar'

const calendar = createCalendar({
  source: xmlcalendar(),  // Опционально, по умолчанию xmlcalendar
  year: 2024,             // Опционально, по умолчанию текущий год
})

calendar.saveToFile('./calendar.ics')
```
