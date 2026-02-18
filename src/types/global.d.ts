import mongoose from 'mongoose';

type MongooseConnection = typeof mongoose;

declare global {
  var mongoose: {
    conn: MongooseConnection | null;
    promise: Promise<MongooseConnection> | null;
  };
}

export {};
