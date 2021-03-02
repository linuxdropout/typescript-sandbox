import tape from 'tape'
import { formatCronExpression, parseCronExpression } from './index'

const exampleValidTestCases = [
  {
    input: '*/15 0 10-20/2 * 1-5 /usr/bin/find',
    expectedOutput: {
      minute: [0, 15, 30, 45],
      hour: [0],
      dayOfMonth: [10, 12, 14, 16, 18, 20],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayOfWeek: [1, 2, 3, 4, 5],
      command: '/usr/bin/find',
    },
    expectedFormat: `minute\t\t0 15 30 45
hour\t\t0
day of month\t10 12 14 16 18 20
month\t\t1 2 3 4 5 6 7 8 9 10 11 12
day of week\t1 2 3 4 5
command\t\t/usr/bin/find
`,
  },
  {
    input: '*/15 0 1,15 * 1-5 /usr/bin/find',
    expectedOutput: {
      minute: [0, 15, 30, 45],
      hour: [0],
      dayOfMonth: [1, 15],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayOfWeek: [1, 2, 3, 4, 5],
      command: '/usr/bin/find',
    },
    expectedFormat: `minute\t\t0 15 30 45
hour\t\t0
day of month\t1 15
month\t\t1 2 3 4 5 6 7 8 9 10 11 12
day of week\t1 2 3 4 5
command\t\t/usr/bin/find
`,
  },
  {
    input: '* * * * * /usr/bin/cat',
    expectedOutput: {
      minute: [...new Array(60).keys()],
      hour: [...new Array(24).keys()],
      dayOfMonth: [...new Array(32).keys()].slice(1),
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayOfWeek: [0, 1, 2, 3, 4, 5, 6],
      command: '/usr/bin/cat',
    },
  },
]
tape('Expression outputs correct types', t => {
  for (const { input } of exampleValidTestCases) {
    t.test(`${input} is formatted correctly`, t => {
      const output = parseCronExpression(input)

      t.ok(Array.isArray(output.minute), 'minute is an array')
      t.equal(typeof output.minute[0], 'number', 'first minute item is a number')

      t.ok(Array.isArray(output.hour), 'hour is an array')
      t.equal(typeof output.hour[0], 'number', 'first hour item is a number')

      t.ok(Array.isArray(output.dayOfMonth), 'dayOfMonth is an array')
      t.equal(typeof output.dayOfMonth[0], 'number', 'first dayOfMonth item is a number')

      t.ok(Array.isArray(output.month), 'month is an array')
      t.equal(typeof output.month[0], 'number', 'first month item is a number')

      t.ok(Array.isArray(output.dayOfWeek), 'dayOfWeek is an array')
      t.equal(typeof output.dayOfWeek[0], 'number', 'first dayOfWeek item is a number')

      t.equal(typeof output.command, 'string', 'command is a string')

      t.end()
    })
  }
})

tape('Expression output is as expected', t => {
  for (const { input, expectedOutput } of exampleValidTestCases) {
    const output = parseCronExpression(input)

    t.deepEqual(output, expectedOutput, `Parses ${input} as ${JSON.stringify(output)}`)
  }
  t.end()
})

tape('Expression format is as expected', t => {
  for (const { input, expectedFormat } of exampleValidTestCases) {
    if (!expectedFormat) continue
    const output = parseCronExpression(input)
    const formattedOutput = formatCronExpression(output)

    t.equal(
      formattedOutput,
      expectedFormat,
      `Formats ${input} as ${formattedOutput}`,
    )
  }
  t.end()
})
