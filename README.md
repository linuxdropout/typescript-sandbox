# Documentation

TLDR version:

```sh
yarn
parse-cron-expression "*/15 0 1,15 * 1-5 /usr/bin/find"
```

## Dependencies

Requires [`node`](https://nodejs.org/en/) and [`yarn`](https://www.npmjs.com/package/yarn)

I recommened installing `node` using [`nvm`](https://github.com/nvm-sh/nvm) to manage node versions

TLDR to install all dependencies:

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
source ~/.bashrc
nvm install --lts
npm i -g yarn
```

---

## Installation

```sh
yarn
```

If you encounter an error, make sure yarn and node are installed, (see [Dependencies](##Dependencies))

The executable will also be added to your path (so you can run `parse-cron-expression` from anywhere) with the command:
```
. postinstall/add-to-path.sh
```

---

## Usage [CLI]

```
parse-cron-expression "[minutes] [hours] [day_of_month] [day of week] [month] [command]"
```
Alternatively
```
node dist/index.js "[minutes] [hours] [day_of_month] [day of week] [month] [command]"
```

Outputs in text format by default:
```
minute
hour
day of month
month
day of week
command
```
Lines are seperated by newlines, the key and values are seperated by tabs (ie: `day of month [TAB] [...values]`)

---

## Usage [node]

```ts
import { parseCronExpression } from './path/to/root/folder/dist'

const expression = "[minutes] [hours] [day_of_month] [day of week] [month] [command]"
const parsedExpression = parseCronExpression(expression, { format: 'json' })

console.log(parsedExpression)

...

{
  "minute": string[]
  "hour": string[]
  "day of month": string[]
  "month": string[]
  "day of week": string[]
  "command": string
}
```

---

## Tests

```
yarn test
```

You can run tests with `yarn test` or `npm t`

Coverage reports are saved to `./nyc_output`

You can generate a pretty html coverage report with `yarn test:coverage:html`, which can be opened in your browser from `./coverage/index.html` 
