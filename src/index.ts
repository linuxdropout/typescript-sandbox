import path from 'path'

import parseMinutes from './parsers/minute'
import parseHours from './parsers/hour'
import parseDayOfMonth from './parsers/dayOfMonth'
import parseMonth from './parsers/month'
import parseDayOfWeek from './parsers/dayOfWeek'

export declare type ExpressionOptions = {
  format?: 'text' | 'json'
}

export declare type ParsedExpression = {
  minute: number[]
  hour: number[]
  dayOfMonth: number[]
  month: number[]
  dayOfWeek: number[]
  command: string
}

export function parseCronExpression(expression: string): ParsedExpression {
  const expressionParts = expression.split(' ')

  const minute = parseMinutes(expressionParts[0])
  const hour = parseHours(expressionParts[1])
  const dayOfMonth = parseDayOfMonth(expressionParts[2])
  const month = parseMonth(expressionParts[3])
  const dayOfWeek = parseDayOfWeek(expressionParts[4])
  const command = expressionParts.slice(5).join(' ')

  return {
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
    command,
  }
}

export function formatCronExpression(parsedExpression: ParsedExpression): string {
  return `minute\t\t${parsedExpression.minute.join(' ')}
hour\t\t${parsedExpression.hour.join(' ')}
day of month\t${parsedExpression.dayOfMonth.join(' ')}
month\t\t${parsedExpression.month.join(' ')}
day of week\t${parsedExpression.dayOfWeek.join(' ')}
command\t\t${parsedExpression.command}
`
}

export function writeUsageAndExitWithCode(
  executablePath: string,
  filePath: string,
  exitCode: number,
) {
  const executableName = path.basename(executablePath)
  const fileName = path.basename(filePath)
  process.stderr.write(`\nUsage: ${executableName} ${fileName} [expression]\n`)
  process.exit(exitCode)
}

export function validateCLIArguments(executablePath: string, filePath: string, commands: string[]) {
  if (typeof commands[0] !== 'string') {
    process.stderr.write('An argument for [expression] is required\n')
    writeUsageAndExitWithCode(executablePath, filePath, 1)
  }
  if (!commands[0].trim()) {
    process.stderr.write('An argument for [expression] is required\n')
    writeUsageAndExitWithCode(executablePath, filePath, 1)
  }
  if (commands.length !== 1) {
    process.stderr.write('Only a single string for [expression] is supported, try wrapping your command in quotes?\n')
    writeUsageAndExitWithCode(executablePath, filePath, 1)
  }
}

if (require.main === module) {
  const [executablePath, filePath, ...commands] = process.argv

  validateCLIArguments(executablePath, filePath, commands)

  const parsedExpression = parseCronExpression(commands[0])
  const formattedExpression = formatCronExpression(parsedExpression)

  process.stdout.write(formattedExpression)
  process.exit(0)
}
