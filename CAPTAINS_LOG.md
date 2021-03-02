# Captain's Log

Present to document design and architectural decisions as well as any "gotcha" moments in the code base

A new entry should be added whenever a key architectural decision is made

---

## Stardate: 2020-01-27
### Opening Thoughts

Most cron expressions can generically parsed with the generic [parser](src/parsers/generic.ts)

The extra parsers are arguably unneccesary due to how simple they are - but they are laid out as such to make it easy to add extra edge cases (such as validation - only allow months between 1 and 12 etc) with a clear easy place to add the code.

Used [crontab](https://crontab.guru/) as the "source-of-truth" for decisions on which features to support and which ones to ignore for now. Also ignored all the non-standard options.

You can read more about all the possible characters commonly in use [here](https://help.symantec.com/cs/SCWP/STORAGE/v123769576_v123767411/About-special-characters-in-CRON-expressions?locale=EN_US)

---
