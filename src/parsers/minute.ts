import parseGenericExpression from './generic'

export default function parseMinutes(expression: string): number[] {
  // there is no 60th minute of an hour
  return parseGenericExpression(expression, { min: 0, max: 59 })
}
