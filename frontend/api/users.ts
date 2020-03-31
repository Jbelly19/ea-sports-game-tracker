// Import Dependencies
import url from 'url';
import { MongoClient, Db } from 'mongodb';
import { NowRequest, NowResponse } from '@now/node';

// Create cached connection variable
let cachedDb: Db = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri: string) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client: MongoClient = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = client.db(url.parse(uri).pathname.substr(1));

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req: NowRequest, res: NowResponse) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db: Db = await connectToDatabase(process.env.MONGODB_URI);

  // console.log(db);

  // Select the "users" collection from the database
  const collection = await db.collection('data');

  // Select the users collection from the database
  const users = await collection.find().limit(5).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ users });
};
