export declare type ParseOptions = {
  min: number
  max: number
}

function createRange(rangeStart: number, rangeEnd: number): number[] {
  const rangeValues = new Array(rangeEnd + 1 - rangeStart)

  let currentRangeValue = rangeStart
  for (let index = 0; index < rangeValues.length; index++) {
    rangeValues[index] = currentRangeValue++
  }

  return rangeValues
}

function parseSubExpression(subExpression: string, options?: ParseOptions): number | number[] {
  if (subExpression.includes('-')) {
    const [rangeStart, rangeEnd] = subExpression.split('-').map(v => parseInt(v, 10))
    return createRange(rangeStart, rangeEnd)
  }

  if (subExpression.includes('*')) {
    const rangeStart = options?.min || 0
    const rangeEnd = options?.max || 60

    return createRange(rangeStart, rangeEnd)
  }

  return parseInt(subExpression, 10)
}

export default function parseGenericExpression(
  expression: string,
  options?: ParseOptions,
): number[] {
  const subExpressions = expression.split(',')

  return subExpressions.flatMap(subExpression => parseSubExpression(subExpression, options))
}
