import neo4j from "neo4j-driver";
import config from "./index";

export const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", config.neo_password),
  {
    maxTransactionRetryTime: 30000,
  }
);
const session = driver.session();

export default session;
