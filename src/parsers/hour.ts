import parseGenericExpression from './generic'

export default function parseHours(expression: string): number[] {
  return parseGenericExpression(expression, { min: 1, max: 24 })
}
