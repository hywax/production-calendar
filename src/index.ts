export * from './types'
export * from './calendar'
export { defineSource } from './sources/utils'

export const builtinSources = {
  xmlcalendar: 'production-calendar/sources/xmlcalendar',
} as const

type ExtractOptions<T> = T extends (options: infer Options) => any ? Options : never

export interface BuiltinSourceOptions {
  xmlcalendar: ExtractOptions<
    (typeof import('./sources/xmlcalendar'))['default']
  >
}

export type BuiltinSourceName = keyof typeof builtinSources
