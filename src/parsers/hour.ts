import parseGenericExpression from './generic'

export default function parseHours(expression: string): number[] {
  // there is no 24th hour of a day https://crontab.guru/#*_24_*_*_*
  return parseGenericExpression(expression, { min: 0, max: 23 })
}
