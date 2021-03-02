export declare type ParseOptions = {
  min: number
  max: number
  replacements?: {
    regex: RegExp,
    replace: string | number
  }[]
}

function createRange(
  rangeStart: number,
  rangeEnd: number,
  minimumRangeValue = 1,
  maximumRangeValue = 31,
): number[] {
  const rangeValues = []

  if (rangeEnd > maximumRangeValue) {
    throw new Error(`Tried to create a range with rangeEnd:${rangeEnd} bigger than the maximumRangeValue:${maximumRangeValue}`)
  }
  if (rangeStart < minimumRangeValue) {
    throw new Error(`Tried to create a range with rangeStart:${rangeStart} smaller than the minimumRangeValue:${minimumRangeValue}`)
  }

  let currentRangeValue = rangeStart
  const rangeIsInverted = rangeStart >= rangeEnd
  const endOfFirstRange = rangeIsInverted ? maximumRangeValue : rangeEnd

  for (; currentRangeValue <= endOfFirstRange; currentRangeValue++) {
    rangeValues.push(currentRangeValue)
  }

  if (!rangeIsInverted) return rangeValues

  currentRangeValue = minimumRangeValue
  for (; currentRangeValue <= rangeEnd; currentRangeValue++) {
    rangeValues.push(currentRangeValue)
  }

  if (rangeStart === rangeEnd) {
    return rangeValues.slice(0, -1)
  }

  return rangeValues
}

function parseRangeWithStep(range: number[], subExpression: string): number[] {
  const step = parseInt(
    subExpression.split('/').pop() as string,
    10,
  )

  return range.filter(v => v % step === 0)
}

const parseExpressionValue = (options?: ParseOptions) => (expressionValue: string): number => {
  let replacedValue = expressionValue

  if (options?.replacements?.length) {
    for (const { regex, replace } of options.replacements) {
      replacedValue = replacedValue.replace(regex, String(replace))
    }
  }

  return parseInt(replacedValue, 10)
}

function parseSubExpression(subExpression: string, options?: ParseOptions): number | number[] {
  if (subExpression.includes('-')) {
    const [rangeStart, rangeEnd] = subExpression.split('-').map(parseExpressionValue(options))
    const explicitRange = createRange(rangeStart, rangeEnd, options?.min, options?.max)

    if (!subExpression.includes('/')) return explicitRange

    return parseRangeWithStep(explicitRange, subExpression)
  }

  if (subExpression.includes('*')) {
    const rangeStart = options?.min || 0
    const rangeEnd = options?.max || 60

    const wildcardRange = createRange(rangeStart, rangeEnd, options?.min, options?.max)

    if (!subExpression.includes('/')) return wildcardRange

    return parseRangeWithStep(wildcardRange, subExpression)
  }

  return parseExpressionValue(options)(subExpression)
}

export default function parseGenericExpression(
  expression: string,
  options?: ParseOptions,
): number[] {
  const subExpressions = expression.split(',')

  return subExpressions.flatMap(subExpression => parseSubExpression(subExpression, options))
}
