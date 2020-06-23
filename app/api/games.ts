import nextConnect from 'next-connect';
import { middleware, Request } from '../middleware/database';
import { NowResponse } from '@vercel/node';

const gamesHandler = nextConnect();

gamesHandler.use(middleware);

gamesHandler.get(async (req: Request, res: NowResponse) => {
  // Select the "games" collection from the database
  const collection = req.db.collection('games');

  // Get all the games from the database
  const games = await collection.find().limit(5).toArray();

  // Respond with a JSON string of all games in the collection
  res.status(200).json({ games });
});

export default gamesHandler;
