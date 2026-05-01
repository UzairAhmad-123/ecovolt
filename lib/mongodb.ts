import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI is missing in environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;