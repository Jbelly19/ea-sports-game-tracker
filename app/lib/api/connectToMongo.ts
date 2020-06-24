import mongoose from 'mongoose';
import { UserSchema } from '../../models/User';

export const connectToMongo = async () => {
  const connection = await mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
  });
  const User = connection.model('User', UserSchema, 'users');

  return {
    connection,
    models: {
      User,
    },
  };
};
