import parseGenericExpression from './generic'

export default function parseDayOfMonth(expression: string): number[] {
  // if crontab does not set a per-month max, maybe we shouldn't either https://crontab.guru/#*_*_31_2_*
  return parseGenericExpression(expression, { min: 1, max: 31 })
}
