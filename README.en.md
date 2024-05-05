# Production calendar

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

[Русский](./README.md) | **English**

This project helps to automatically create a production calendar based on working days and holidays.

> [!TIP]
> To connect to your calendars, use the instructions on my blog: [Production Calendar in iCal](https://hywax.space/)

## 🎯 Features

- 🪄️ **Ease of Use**: Simple and easy to understand API
- 📅 **Supports multiple sources**: Supports different data sources
- 📦 **Modularity**: Ability to create your own data sources
- 🚀 **High Performance**: Fast calendar creation
- 📚 **Support for TypeScript**: Full TypeScript support

## ✨ Installation

```shell
# Using pnpm
pnpm add production-calendar

# Using yarn
yarn add production-calendar

# Using npm
npm install production-calendar
```

## 🚀 Using

```typescript
import { ProductionCalendar } from 'production-calendar'
import xmlcalendar from 'production-calendar/sources/xmlcalendar'

const calendar = await createCalendar({
  year: 2024,
  source: xmlcalendar(),
})

calendar.saveToFile('./calendar.ics')
```

## 🏆 Contributors

A huge thank you to everyone who is helping to improve. Thanks to you, the project can evolve!

<img src="https://raw.githubusercontent.com/hywax/production-calendar/main/.github/static/contributors.svg" alt="Производственный календарь вкладчики" width="100%"/>

## 📄 License

The basis of `production-calendar` is open source, according to [MIT](LICENSE.md).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/production-calendar/latest.svg?logo=hackthebox&color=31a350&logoColor=fff
[npm-version-href]: https://npmjs.com/package/production-calendar
[npm-downloads-src]: https://img.shields.io/npm/dm/production-calendar.svg?colorB=31a350
[npm-downloads-href]: https://npmjs.com/package/production-calendar
[license-src]: https://img.shields.io/badge/License-MIT-31a350?logo=opensourceinitiative&logoColor=fff
[license-href]: https://npmjs.com/package/production-calendar
