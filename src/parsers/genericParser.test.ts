import tape from 'tape'
import parseGenericExpression from './generic'

tape('parseGenericExpression :: simple number', t => {
  const testCases = [
    { input: '0', expectedOutput: [0] },
    { input: '1', expectedOutput: [1] },
    { input: '10', expectedOutput: [10] },
    { input: '60', expectedOutput: [60] },
    { input: '1000', expectedOutput: [1000] },
  ]

  for (const { input, expectedOutput } of testCases) {
    const output = parseGenericExpression(input)
    t.deepEqual(output, expectedOutput, `Parses ${input} as ${expectedOutput}`)
  }

  t.end()
})

tape('parseGenericExpression :: comma seperated numbers', t => {
  const testCases = [
    { input: '0,15,25', expectedOutput: [0, 15, 25] },
    { input: '1,100,1000', expectedOutput: [1, 100, 1000] },
  ]

  for (const { input, expectedOutput } of testCases) {
    const output = parseGenericExpression(input)
    t.deepEqual(output, expectedOutput, `Parses ${input} as ${expectedOutput}`)
  }

  t.end()
})
