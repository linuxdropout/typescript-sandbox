import parseGenericExpression from './generic'

export default function parseHours(expression: string): number[] {
  // there is no 24th hour of a day
  return parseGenericExpression(expression, { min: 0, max: 23 })
}
