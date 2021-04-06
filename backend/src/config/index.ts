import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  neo_password: process.env.NEO4J_PASSWORD,
  port: process.env.PORT
}