import parseGenericExpression from './generic'

export default function parseMinutes(expression: string): number[] {
  // there is no 60th minute of an hour https://crontab.guru/#60_*_*_*_*
  return parseGenericExpression(expression, { min: 0, max: 59 })
}
