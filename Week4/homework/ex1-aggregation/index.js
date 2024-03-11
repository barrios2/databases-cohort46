const { MongoClient } = require('mongodb');
require('dotenv').config();

const databaseName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;

const client = new MongoClient(process.env.MONGODB_URL);

const database = client.db(databaseName);
const collection = database.collection(collectionName);

async function totalPopulationPerYear(country) {

  if (!process.env.MONGODB_URL) {
    throw Error(
      `MongoDB URL is not provided in the environment variables.`
    );
  }

  try {

    await client.connect();
    console.log('Connected to MongoDB');

    const query = [
      {
        $match: {Country: `${country}`}
      },
      {
        $group: {
          _id: {
            Year: '$Year',
          },
          totalPopulation: {
            $sum: {
              $add: ['$M', '$F'],
            },
          },
        }
      },
      {
        $sort: { _id: -1} // get more recent results first
      }
    ];

    const results = await collection.aggregate(query).toArray();
    console.log(`Total population for ${country}`);
    return results;
    
  } catch (error) {
    console.error(error);

  } finally{
    await client.close();
    console.log('Connection terminated');
  }
}

async function totalPopulationPerContinent(year, age) {

  const continents = [
    'AFRICA', 
    'ASIA',
    'EUROPE',
    'LATIN AMERICA AND THE CARIBBEAN',
    'NORTHERN AMERICA',
    'OCEANIA'
  ];

  try {

    await client.connect();
    console.log('Connected to MongoDB');

    const results = [];

    for (let index = 0; index < continents.length; index++) {
      const continent = continents[index];
      const query = [
        {
          $match: { Country: continent, Year: year, Age: age },
        },
        {
          $group: {
            _id: '$_id',
            Country: { $first: '$Country' },
            Year: { $first: '$Year' },
            Age: { $first: '$Age' },
            M: { $sum: '$M' },
            F: { $sum: '$F' },
            totalPopulation: { $sum: { $add: ['$M', '$F'] } }
          },
        }
      ];

      const continentData = await collection.aggregate(query).toArray();
      results.push(...continentData);
    }

    console.log(`The total population for all continents by year: ${year} and age: ${age}`);
    return results;

  } catch (error) {
    console.error(error);

  } finally{
    await client.close();
    console.log('Connection terminated');
  }
};

async function main() {

  try {
    const countryResults = await totalPopulationPerYear('Nicaragua');
    console.log(countryResults);

    const continentResults = await totalPopulationPerContinent(2022, '65-69');
    console.log(continentResults);

  } catch (error) {
    console.error(error);
  }
}

main();
