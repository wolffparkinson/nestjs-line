# Contributing

If you wish to contribute to the nestjs-line codebase or documentation, feel free to fork the repository and submit a
pull request. We use ESLint to enforce a consistent coding style, so having that set up in your editor of choice
is a great boon to your development process.

## Setup

You will need [Node.js](http://nodejs.org) **version 16+**, and [pnpm](https://pnpm.io).

To get ready to work on the codebase, please do the following:

1. Fork & clone the repository, and make sure you're on the **main** branch
2. Run `pnpm install --frozen-lockfile`
3. Code your heart out!
4. Run `pnpm lint <project>` to run ESLint ensures changes are valid
5. [Submit a pull request](https://github.com/wolffparkinson/nestjs-line/compare) (Make sure you follow the [conventional commit format](https://github.com/wolffparkinson/nestjs-line/blob/main/.github/COMMIT_CONVENTION.md))

A high level overview of tools used:

- [TypeScript](https://www.typescriptlang.org/) as the development language
- [Eslint](https://eslint.org/) for code-style
- [Prettier](https://prettier.io/) for code formatting
