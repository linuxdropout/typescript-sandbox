export default function parseGenericExpression(expression: string): number[] {
  const subExpressions = expression.split(',')

  return subExpressions.map(
    v => parseInt(v, 10),
  )
}
