import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI 

const client = new MongoClient(uri);
let db;

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    db = client.db('marketplace_db'); 
    return db;
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database belum terhubung! Panggil connectToMongoDB dulu.");
  }
  return db;
}

export async function disconnectFromMongoDB() {
  await client.close();
}