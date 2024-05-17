import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: {
      rejectUnauthorized: false,  // Set to true if you have a CA certificate to verify the server's certificate
  },
};
const db = new Pool(configDatabase);

export default db;