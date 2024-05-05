# Производственный календарь

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

**Русский** | [English](./README.en.md)

Данный проект помогает автоматически создавать производственный календарь на основе данных о рабочих днях и праздниках.

> [!TIP]
> Для подключения в ваши календари, воспользуйтесь инструкцией у меня в блоге: [Производственный календарь в iCal](https://hywax.space/)

## 🎯 Особенности

- 🪄️ **Простота использования**: Простой и понятный API
- 📅 **Поддержка разных источников**: Поддерживает разные источники данных
- 📦 **Модульность**: Возможность создания своих источников данных
- 🚀 **Высокая производительность**: Быстрое создание календаря
- 📚 **Поддержка TypeScript**: Полная поддержка TypeScript

## ✨ Установка

```shell
# Использование pnpm
pnpm add production-calendar

# Использование yarn
yarn add production-calendar

# Использование npm
npm install production-calendar
```

## 🚀 Использование

```typescript
import { ProductionCalendar } from 'production-calendar'
import xmlcalendar from 'production-calendar/sources/xmlcalendar'

const calendar = await createCalendar({
  year: 2024,
  source: xmlcalendar(),
})

calendar.saveToFile('./calendar.ics')
```

## 🏆 Вкладчики

Огромное спасибо всем, кто помогает улучшать проект. Благодаря вам проект может развиваться!

<img src="https://raw.githubusercontent.com/hywax/production-calendar/main/.github/static/contributors.svg" alt="Производственный календарь вкладчики" width="100%"/>

## 📄 Лицензия

Основой `production-calendar` являет открытый исходный код, в соответствии [MIT](LICENSE.md).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/production-calendar/latest.svg?logo=hackthebox&color=31a350&logoColor=fff
[npm-version-href]: https://npmjs.com/package/production-calendar
[npm-downloads-src]: https://img.shields.io/npm/dm/production-calendar.svg?colorB=31a350
[npm-downloads-href]: https://npmjs.com/package/production-calendar
[license-src]: https://img.shields.io/badge/License-MIT-31a350?logo=opensourceinitiative&logoColor=fff
[license-href]: https://npmjs.com/package/production-calendar
