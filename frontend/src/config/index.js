import dotenv from "dotenv";
import { process } from "ipaddr.js";
dotenv.config();

export default {
  API_HOST: process.env.API_HOST || "localhost:8080"
}