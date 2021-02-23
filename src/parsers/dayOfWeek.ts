import parseGenericExpression from './generic'

export default function parseDayOfWeek(expression: string): number[] {
  // sunday is 0 - saturday is 6 https://crontab.guru/#*_*_*_*_6
  return parseGenericExpression(expression, { min: 0, max: 6 })
}
