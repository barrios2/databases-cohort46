/* 
Here I am rewriting the function so that it's no longer vulnerable to SQL injection, for that I used placeholders like (?) for the parts of the query that change, like the country name and code. Then, I passed the real values separately. This stops SQL injection because I don't mix user input directly into the query. This way is more difficult for someone to inject harmful SQL commands. 
More info here: https://portswigger.net/web-security/sql-injection#how-to-prevent-sql-injection 
*/

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ?? WHERE Name = ? and code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) return cb(err);
      if (result.length == 0) return cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
};

// Example of an SQL attack

getPopulation('Countries', "'; UPDATE Countries SET Population = 0 WHERE 1 = 1; --", "SomeHackersCode", function(err, result) {
  if (err) console.error(err);
  else console.log(result);
});

/*
This is a scenario where someone could inject an additional SQL statement, in which updates all rows in the Countries table and then sets the population of all countries to 0. The "--"" comments out the rest of the original SQL query to ensure that it doesn't interfere with the injected code. More info here: https://portswigger.net/web-security/sql-injection
*/
