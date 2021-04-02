import dotenv from "dotenv";
const envConfig = dotenv.config();

if (envConfig.error) {
  throw new Error(`Couldn't find .env file`);
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  neo_password: process.env.NEO4J_PASSWORD,
  port: process.env.PORT
}