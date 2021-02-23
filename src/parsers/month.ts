import parseGenericExpression from './generic'

export default function parseMonth(expression: string): number[] {
  return parseGenericExpression(expression, { min: 1, max: 12 })
}
