const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'author_info',
});

// connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('f','m','non-binary', 'prefer not to say')
  )`;

connection.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log('Authors table created');      
});

// query to add mentor column with foreign key constraint
connection.query('ALTER TABLE authors ADD COLUMN mentor INT, ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)', (err, result) => {
  if (err) throw err;
  console.log('Mentor column added with foreign key constraint');
});  

connection.end();
