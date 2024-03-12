const { MongoClient } = require('mongodb');
require('dotenv').config();

const databaseName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_TRANSACTIONS;

async function setup() {
  
  const client = new MongoClient(process.env.MONGODB_URL);

  try {

    const collection = client.db(databaseName).collection(collectionName);

    await client.connect();
    console.log('Connected to MongoDB');

    // delete all docs in coll
    await collection.deleteMany({});

    const accountInfo = [
      { account_number: 101, balance: 5000, account_changes: [] },
      { account_number: 102, balance: 10000, account_changes: [] },
      { account_number: 103, balance: 70500, account_changes: [] }
    ];

    await collection.insertMany(accountInfo);
    console.log('Account information has been added!');

  } catch (error) {
    console.error(error); 

  } finally {
    await client.close();
    console.log('Connection terminated');
  };
};

module.exports = setup;
