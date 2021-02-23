import tape from 'tape'
import { parseCronExpression } from './index'

const exampleValidInputs = [
  '*/15 0 1,15 * 1-5 /usr/bin/find',
]

tape('Expression outputs correct types', t => {
  for (const input of exampleValidInputs) {
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
