import neo4j from 'neo4j-driver';

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'juice2018sz'), {
  maxTransactionRetryTime: 30000
});
export const session = driver.session();

export default session;