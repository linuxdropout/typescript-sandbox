import parseGenericExpression from './generic'

export default function parseDayOfWeek(expression: string): number[] {
  return parseGenericExpression(expression, { min: 1, max: 7 })
}
