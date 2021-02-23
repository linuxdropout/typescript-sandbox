import parseGenericExpression from './generic'

export default function parseDayOfMonth(expression: string): number[] {
  return parseGenericExpression(expression, { min: 1, max: 12 })
}
