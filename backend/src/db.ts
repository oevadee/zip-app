import neo4j from 'neo4j-driver';

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'juice2018sz'));
const session = driver.session();
const txc = session.beginTransaction();

export default txc;