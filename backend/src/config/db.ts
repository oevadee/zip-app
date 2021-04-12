import neo4j from "neo4j-driver";
import config from "./index";

const driver = neo4j.driver(
  "bolt://neo4j",
  neo4j.auth.basic("neo4j", config.neo_password),
  {
    maxTransactionRetryTime: 30000,
  }
);

export default driver;
