function parseSubExpression(subExpression: string): number | number[] {
  if (subExpression.includes('-')) {
    const [rangeStart, rangeEnd] = subExpression.split('-').map(v => parseInt(v, 10))

    const rangeValues = new Array(rangeEnd + 1 - rangeStart)

    let currentRangeValue = rangeStart
    for (let index = 0; index < rangeValues.length; index++) {
      rangeValues[index] = currentRangeValue++
    }

    return rangeValues
  }

  return parseInt(subExpression, 10)
}

export default function parseGenericExpression(expression: string): number[] {
  const subExpressions = expression.split(',')

  return subExpressions.flatMap(parseSubExpression)
}
