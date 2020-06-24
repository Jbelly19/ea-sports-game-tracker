import nextConnect from 'next-connect';
import { middleware, Request } from '../middleware/database';
import { NowResponse } from '@vercel/node';
import { type } from 'os';

const usersHandler = nextConnect();

usersHandler.use(middleware);

usersHandler.get(async (req: Request, res: NowResponse) => {
  // Select the "users" collection from the database
  const collection = req.db.collection('users');

  // Get all the users from the database
  const users = await collection.find().limit(5).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ users });
});

usersHandler.post(async (req: Request, res: NowResponse) => {
  // Select the "users" collection from the database
  const collection = req.db.collection('users');

  const { username, name } = req.body;
  if (
    username &&
    name &&
    typeof username === 'string' &&
    typeof name === 'string'
  ) {
    console.log('here');
    // create the user in the database
    try {
      const result = await collection.insertOne({ username, name });

      console.log(result);

      // Respond with a JSON string of all users in the collection
      res.status(200).json({ username, name });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    res.status(500);
  }
});

export default usersHandler;
