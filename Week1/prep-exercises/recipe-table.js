var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'recipes',
  port : 3306,
  socketPath: '/tmp/mysql.sock'
});

connection.connect();

const createTableQueries = [
  `CREATE TABLE Recipes (
      recipe_id INT PRIMARY KEY NOT NULL,
      recipe_name VARCHAR(100) NOT NULL,
      category VARCHAR(100) NOT NULL
  );`,
  `CREATE TABLE Ingredients (
      ingredient_id INT PRIMARY KEY NOT NULL,
      ingredient_name VARCHAR(100) NOT NULL,
      quantity VARCHAR(100)
  );`,
  `CREATE TABLE Steps (
      step_id INT PRIMARY KEY NOT NULL,
      step_description TEXT NOT NULL
  );`,
  `CREATE TABLE Recipe_ingredients (
      recipe_id INT,
      ingredient_id INT,
      FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
      FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
      PRIMARY KEY (recipe_id, ingredient_id)
  );`,
  `CREATE TABLE Recipe_steps (
      recipe_id INT,
      step_id INT,
      FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id),
      FOREIGN KEY (step_id) REFERENCES Steps(step_id),
      PRIMARY KEY (recipe_id, step_id)
  );`
];

createTableQueries.forEach(query => {
  connection.query(query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log("the reply is ", results[0]);
  });
});

connection.end();