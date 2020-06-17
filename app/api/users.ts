import nextConnect from 'next-connect';
import { middleware, Request } from '../middleware/database';
import { NowResponse } from '@vercel/node';

const userHandler = nextConnect();

userHandler.use(middleware);

userHandler.get(async (req: Request, res: NowResponse) => {
  // Select the "users" collection from the database
  const collection = req.db.collection('users');

  // Select the users collection from the database
  const users = await collection.find().limit(5).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ users });
});

export default userHandler;
