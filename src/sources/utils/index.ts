import type { Source } from '../../types'

type SourceFactory<T> = (options: T) => Source

export function defineSource<T = any>(factory: SourceFactory<T>): SourceFactory<T> {
  return factory
}

export function createError(source: string, message: string) {
  return new Error(`[production-calendar] [${source}] ${message}`)
}
