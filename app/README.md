This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser

## Deployed on ZEIT Now

To deploy to production, commit to master.

## Test locally with ZEIT Now

From the project root (one level up unfortunately) run:

```bash
now dev
```

This will include the API. For the connection to the db to work, you need a `.env` file in this directory (`./app`) with the mongodb connection string from the mongodb atlas console. **Be carful not to check this file into github**

Example `.env`:

```
MONGODB_URI=mongodb+srv://<user>:<password>@my-cluster-uf345.mongodb.net/<database-name>?retryWrites=true
```
