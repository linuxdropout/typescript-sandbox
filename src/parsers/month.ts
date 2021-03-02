import parseGenericExpression from './generic'

const monthExpressions = [
  {
    regex: /^jan(uary)?$/gi,
    replace: 1,
  },
  {
    regex: /^feb(uary)?$/gi,
    replace: 2,
  },
  {
    regex: /^mar(ch)?$/gi,
    replace: 3,
  },
  {
    regex: /^apr(il)?$/gi,
    replace: 4,
  },
  {
    regex: /^may$/gi,
    replace: 5,
  },
  {
    regex: /^june?$/gi,
    replace: 6,
  },
  {
    regex: /^july?$/gi,
    replace: 7,
  },
  {
    regex: /^aug(ust)?$/gi,
    replace: 8,
  },
  {
    regex: /^sept?(ember)?$/gi,
    replace: 9,
  },
  {
    regex: /^oct(ober)?$/gi,
    replace: 10,
  },
  {
    regex: /^nov(ember)?$/gi,
    replace: 11,
  },
  {
    regex: /^dec(ember)?$/gi,
    replace: 12,
  },
]

export default function parseMonth(expression: string): number[] {
  return parseGenericExpression(expression, { min: 1, max: 12, replacements: monthExpressions })
}
