import url from 'url';
import { MongoClient, Db } from 'mongodb';
import nextConnect, { NextHandler } from 'next-connect';
import { NowRequest, NowResponse } from '@vercel/node';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export interface Request extends NowRequest {
  dbClient: MongoClient;
  db: Db;
}

async function database(req: Request, _res: NowResponse, next: NextHandler) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(url.parse(process.env.MONGODB_URI).pathname.substr(1));
  return next();
}

export const middleware = nextConnect();

middleware.use(database);
