// One command for every pre-commit check, with compact output: a ✓ line per passing step and
// only the tail of the output of a failing one. Run with `npm run check`.
//
//   --fix     run prettier --write and eslint --fix first
//   --quick   skip the tests and the builds

import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = new Set(process.argv.slice(2))
const bin = (name) =>
  join(root, 'node_modules', '.bin', process.platform === 'win32' ? `${name}.cmd` : name)
const FORMATTED = ['src', 'gallery', 'scripts', 'README.md', 'CHANGELOG.md']

const steps = [
  ...(args.has('--fix')
    ? [
        ['format (write)', bin('prettier'), ['--write', '--log-level=warn', ...FORMATTED]],
        ['lint (fix)', bin('eslint'), ['.', '--fix']]
      ]
    : []),
  ['icons', process.execPath, ['scripts/build-icons.mjs', '--check']],
  ['format', bin('prettier'), ['--check', '--log-level=warn', ...FORMATTED]],
  ['typecheck', bin('tsc'), ['--noEmit', '-p', 'tsconfig.json']],
  ['lint', bin('eslint'), ['.', '--max-warnings=0']],
  ...(args.has('--quick')
    ? []
    : [
        ['tests', bin('vitest'), ['run', '--reporter=dot']],
        ['build', bin('vite'), ['build', '--logLevel', 'warn']],
        ['types', bin('tsc'), ['-p', 'tsconfig.build.json']],
        [
          'gallery build',
          bin('vite'),
          ['build', '--config', 'vite.gallery.config.ts', '--logLevel', 'warn']
        ]
      ])
]

const TAIL_LINES = 40
let failed = 0
for (const [name, command, commandArgs] of steps) {
  const start = Date.now()
  // shell: true is needed to run .cmd shims on Windows; the path is quoted (it may contain spaces).
  const result = spawnSync(`"${command}" ${commandArgs.join(' ')}`, {
    cwd: root,
    encoding: 'utf8',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' }
  })
  const seconds = ((Date.now() - start) / 1000).toFixed(1)
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`
  if (result.status === 0) {
    const summary = name === 'tests' ? (output.match(/Tests\s+(\d+ passed[^\n]*)/)?.[1] ?? '') : ''
    console.log(`✓ ${name} (${seconds}s)${summary ? ` — ${summary.trim()}` : ''}`)
    continue
  }
  failed++
  console.log(`✗ ${name} (${seconds}s)`)
  const lines = output
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '' && !line.startsWith('npm warn'))
  console.log(lines.slice(-TAIL_LINES).join('\n'))
}
console.log(failed === 0 ? 'ALL CHECKS PASSED' : `${failed} CHECK(S) FAILED`)
process.exit(failed === 0 ? 0 : 1)
