import tape from 'tape'

import parseMonth from './month'

const validTestCases = [
  { input: 'JAN', expectedOutput: [1] },
  { input: 'FEB-MAR', expectedOutput: [2, 3] },
  { input: 'DEC-APR', expectedOutput: [12, 1, 2, 3, 4] },
]

tape('parseMonth', t => {
  for (const { input, expectedOutput } of validTestCases) {
    const output = parseMonth(input)
    t.deepEqual(output, expectedOutput, `Parses ${input} as ${expectedOutput}`)
  }

  t.end()
})
