# Adonis URL Shortener

Adonis.js application to shorten URLs with Node.js and SQLite

## Requirements

- npm >= 3.0.0
- Node.js >= 8.0.0
- SQLite3

## Setup

Install npm dependencies

```bash
npm i
```

Install Adonis CLI to help with installation/migrations

```bash
npm i -g @adonisjs/cli
```

Create env file

```bash
mv .env.example .env
# HOST, PORT, APP_NAME, and DB_DATABASE should be changed here as needed
```

### APP Key

Run the following command to generate a new app key.

```js
adonis key:generate
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
