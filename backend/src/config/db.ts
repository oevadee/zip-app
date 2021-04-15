import neo4j from "neo4j-driver";
import config from "./index";

const { NEO4J_HOST, NEO4J_USERNAME, NEO4J_PASSWORD } = config;

const driver = neo4j.driver(
  `bolt://${NEO4J_HOST}`,
  neo4j.auth.basic(`${NEO4J_USERNAME}`, `${NEO4J_PASSWORD}`),
  {
    maxTransactionRetryTime: 30000,
  }
);

export default driver;
