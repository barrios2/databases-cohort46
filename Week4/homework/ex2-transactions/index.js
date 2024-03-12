const setup = require('./setup');
const transfer = require('./transfer');

async function testingTransaction(){
  await setup();
  await transfer(101, 102, 1000, 'transaction');
};

testingTransaction();
