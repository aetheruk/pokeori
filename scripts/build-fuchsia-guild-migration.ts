const result = await Bun.build({
  entrypoints: ['./scripts/migrate-fuchsia-guild.ts'],
  outdir: '/tmp',
  naming: 'migrate-fuchsia-guild.js',
  target: 'bun',
  plugins: [
    {
      name: 'server-only-marker',
      setup(build) {
        build.onResolve({ filter: /^server-only$/ }, () => ({
          path: 'server-only',
          namespace: 'server-only-marker',
        }))
        build.onLoad(
          { filter: /.*/, namespace: 'server-only-marker' },
          () => ({ contents: 'export {}', loader: 'js' }),
        )
      },
    },
  ],
})

if (!result.success) {
  for (const log of result.logs) console.error(log)
  process.exit(1)
}
