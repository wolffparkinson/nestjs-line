<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
    A module for creating LINE bots using  <a href="https://nestjs.com/" target="_blank">NestJS</a>, based on <a href="https://developers.line.biz/en/docs/messaging-api/" target="_blank">LINE Messaging API</a>.
</p>

<p align="center">
    <a href='https://img.shields.io/npm/v/@nestjs-line/messaging'><img src="https://img.shields.io/npm/v/@nestjs-line/messaging" alt="NPM Version" /></a> 
    <a href='https://img.shields.io/npm/l/@nestjs-line/messaging'><img src="https://img.shields.io/npm/l/@nestjs-line/messaging" alt="NPM License" /></a> 
    <a href='https://img.shields.io/npm/dm/@nestjs-line/messaging'><img src="https://img.shields.io/npm/dm/@nestjs-line/messaging" alt="NPM Downloads" /></a>
    <a href='https://img.shields.io/github/last-commit/wolffparkinson/nestjs-line'><img src="https://img.shields.io/github/last-commit/wolffparkinson/nestjs-line" alt="Last commit" /></a>
</p>

## About

This package uses the best of the NodeJS world under the hood. [Nest.js](https://github.com/nestjs) is a progressive framework for creating well-architectured applications.
This module provides fast and easy way for creating LINE bots and deep integration with your NestJS application.

**Features**

- Simple. Flexible. Easy to use.
- Ability to create custom decorators.
- Full support of NestJS guards, interceptors, filters and pipes!

For questions and support please use
the [Issues](https://github.com/wolffparkinson/nestjs-line/issues/new?assignees=&labels=question&template=question.yml).

## Installation

**Node.js 16.6.0 or newer is required.**

```bash npm2yarn
$ npm install @nestjs-line/messaging @line/bot-sdk
```

## Usage

Once the installation process is complete, we can import the `LineMessagingModule` into the root `AppModule`:

```typescript title="src/app.module.ts"
import { Module } from '@nestjs/common';
import { LineMessagingModule } from '@nestjs-line/messaging';
@Module({
  imports: [
    LineMessagingModule.forRoot({
      channelSecret: 'secret',
      channelAccessToken: 'access_token',
    }),
  ],
  providers: [],
})
export class AppModule {}
```
