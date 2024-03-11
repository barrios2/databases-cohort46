async function setup(client, collection) {

  try {

    await client.connect();
    console.log('Connected to MongoDB');

    // delete all docs in coll
    await collection.deleteMany({});

    const accountInfo = [
      { account_number: 101, balance: 5000, account_changes: [ { change_number, amount, changed_date, remark } ] },
      { account_number: 102, balance: 10000, account_changes: [ { change_number, amount, changed_date, remark } ] },
      { account_number: 103, balance: 70500, account_changes: [ { change_number, amount, changed_date, remark } ] }
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
