# Spaced repetition API!

This app helps people memorize the Italian language. The app will display words in Italian, and ask you to recall the corresponding word in English.

- [Authors](#authors)
- [Demo](#demo)
- [Technologies](#technologies)
- [Database schema](#database-schema)
- [Main Url](#main-url)
- [User](#user)
- [Word](#word)
- [Language](#language)
- [Authentication](#authentication)
- [Local dev setup](#local-dev-setup)

## Authors
[Jessica Doyle](https://github.com/jedoyle6)  
[Fabian Lema](https://github.com/fabianlema15)  

## Demo

Click on the next link: [Demo](https://easy-italian-api.herokuapp.com/)

## Technologies

>NodeJS  
Express  
Postgresql  


## Database schema

![App Image](/images/database.png)


## Main URL  
`https://easy-italian-api.herokuapp.com/api`

## User

Create users allowed to use the app.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Serial | Yes | User id generated automatically |
| username | Text | Yes | User username (nickname) |
| password | Text | Yes | User password |
| name | Text | Yes | User name |


| Resource | Method | Description |
|-------|------|----------|
| /user | POST | Save a new user and return it |

## Word

Table with information about each word to be learned.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Serial | Yes | User id generated automatically |
| original | Text | Yes | User username (nickname) |
| translation | Text | Yes | User password |
| memory_value | Smaillint | Yes | User name |
| correct_count | Smaillint | Yes | User name |
| incorrect_count | Smaillint | Yes | User name |
| language_id | Integer | Yes | Reference to language table |
| next | Integer | Yes | Reference to self table |

## Language

Get words to be learned.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Serial | Yes | User id generated automatically |
| name | Text | Yes | User username (nickname) |
| total_score | Smaillint | Yes | User password |
| user_id | Integer | Yes | Reference to user table |
| head | Integer | Yes | Reference to word table |


| Resource | Method | Description |
|-------|------|----------|
| /language | GET | Return list of word to learn |
| /language/head | GET | Return the first word on the list to learn |
| /language/guess | POST | Return the answer feedback and the next word to be learned  |

## Authentication

Used to login and return an authorization token.

| Resource | Method | Description |
|-------|------|----------|
| /auth/token | POST | If the login is successful, this returns a token to be used as an authorization token.  |
| | PUT | It creates a new token |


## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
