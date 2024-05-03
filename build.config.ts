import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  entries: [
    'src/index',
    'src/cli',
    {
      input: 'src/sources/',
      outDir: 'sources',
      format: 'esm',
    },
    {
      input: 'src/sources/',
      outDir: 'sources',
      format: 'cjs',
      ext: 'cjs',
      declaration: false,
    },
  ],
})
