import tape from 'tape'

import parseDayOfWeek from './dayOfWeek'

const validTestCases = [
  { input: 'MON', expectedOutput: [1] },
  { input: 'THU-MON', expectedOutput: [4, 5, 6, 0, 1] },
  { input: 'FRI-FRI', expectedOutput: [5, 6, 0, 1, 2, 3, 4] },
]

tape('parseDayOfWeek', t => {
  for (const { input, expectedOutput } of validTestCases) {
    const output = parseDayOfWeek(input)
    t.deepEqual(output, expectedOutput, `Parses ${input} as ${expectedOutput}`)
  }

  t.end()
})
