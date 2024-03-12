const { MongoClient } = require('mongodb');
require('dotenv').config();

const databaseName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_TRANSACTIONS;

async function transfer(senderAcc, receiverAcc, amount, remark) {

  const client = new MongoClient(process.env.MONGODB_URL);

  try {

    await client.connect();
    console.log('Connected to MongoDB');

    const collection = client.db(databaseName).collection(collectionName);

    // finding accounts
    const sender = await collection.findOne({ account_number: senderAcc });
    const receiver = await collection.findOne({ account_number: receiverAcc });

    if (!sender || !receiver) {
      console.log('Invalid account number');
      return;
    }

    // checks for enough balance
    if (sender.balance < amount) {
      console.log('Insufficient funds');
      return;
    }

    // updating balances and logging changes
    const senderChangeNumber = sender.account_changes.length > 0 ? sender.account_changes[sender.account_changes.length - 1].change_number + 1 : 1;
    const receiverChangeNumber = receiver.account_changes.length > 0 ? receiver.account_changes[receiver.account_changes.length - 1].change_number + 1 : 1;
    
    // updates sender's account
    await collection.updateOne(
      { account_number: senderAcc },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            changeNumber: senderChangeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    // updates receiver's account
    await collection.updateOne(
      { account_number: receiverAcc },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            changeNumber: receiverChangeNumber,
            amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    console.log(`A total amount of ${amount} from ${senderAcc} to ${receiverAcc} has been transferred successfully!`);

  } catch (error) {
    console.error(error);    

  } finally {
    await client.close();
    console.log('Connection terminated');
  };
};

module.exports = transfer;
