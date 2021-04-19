import dotenv from "dotenv";
import createServer from "./app";
import { connectDB } from "./database/connection";

async function main(): Promise<void> {
  try {
    dotenv.config();
    createServer();
    await connectDB();
  } catch (error) {
    throw error;
  }
}

main();
