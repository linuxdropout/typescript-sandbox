import parseGenericExpression from './generic'

const weekdayExpressions = [
  {
    regex: /^sun(day)?$/gi,
    replace: 0,
  },
  {
    regex: /^mon(day)?$/gi,
    replace: 1,
  },
  {
    regex: /^tues?(day)?$/gi,
    replace: 2,
  },
  {
    regex: /^wed(nesday)?$/gi,
    replace: 3,
  },
  {
    regex: /^thur?s?(day)?$/gi,
    replace: 4,
  },
  {
    regex: /^fri(day)?$/gi,
    replace: 5,
  },
  {
    regex: /^satu?r?(day)?$/gi,
    replace: 6,
  },
]

export default function parseDayOfWeek(expression: string): number[] {
  // sunday is 0 - saturday is 6 https://crontab.guru/#*_*_*_*_6
  return parseGenericExpression(expression, { min: 0, max: 6, replacements: weekdayExpressions })
}
