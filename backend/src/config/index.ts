import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  NEO4J_HOST: process.env.NEO4J_HOST || "localhost",
  NEO4J_USERNAME: process.env.NEO4J_USERNAME || "neo4j",
  NEO4J_PASSWORD: process.env.NEO4J_PASSWORD || "s3cr3t",
  PORT: process.env.PORT || "8080",
  CLIENT: process.env.CLIENT || "localhost:3000",
  STATIC: "/uploads"
};
