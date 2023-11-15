# blogr

> *A fullstack bloging application*

## Description

blogr is a blogging application written entirely in typescript. It serves as a means for me to write whatever crazy thought flies into my head in the middle of the night and share with family and other interested party.

I choose to write it entirely in Typescript as it is the only language I would call myself an expert in plus it has a plethora of immediately available packages to quicken the development process plus countless documentation and guides to help when I'm stuck or trying to be creative.

Like I said a million times already, the project was written purely in typescript and for the backend, same will be said.

My database of choice is mysql, This is not a decision I made entirely on my own as I recently came across [planetscale](https://planetscale.com). [Planetscale](https://planetscale.com) is a database cloud provider that is extremely affordable to use. It's super simple to set up and it is MYSQL. two wonderful gifts for the price of one.

For the frontend, I will use [Nextjs](https://nextjs.org/) not because of it's insane simplicity but because of the great community support and the abundance of surplus packages to make the process a lot easier.

I will also use a combiantion of [tailwindcss](https://tailwindcss.com/) and [Shadcn/ui](https://ui.shadcn.com/)

Backend testing was done with the all reliable [jest](https://jestjs.io/) testing framework.

For frontend testing, I will not write any test.

## Prerequisite To Local Development

Before you can proceed to testing the appliation locally, make sure you have created a database on your [planetscale](https://planetscale.com) account or a local mysql server and run the sql command found in

>server/app/database/database.sql

copy the connection string or details into your .env file.

## Local Development / Testing

To install and test locally
```bash
git clone https://github.com/neghi14/blog-ts.git

cd server / cd client

npm install

npm run dev

```

Linting

```bash
npm run lint
```

Testing

```bash
npm run test
```

Build and run prod

```bash
npm run build

npm run prod:start
```