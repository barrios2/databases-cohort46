const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'author_info',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

connection.query('SELECT a.author_name AS author, m.author_name AS mentor FROM authors a JOIN authors m ON m.author_id = a.mentor', (err, results) => {
  if (err) throw err;
  console.log('Name of all authors and the name of their mentors', results);
});

connection.query('SELECT a.*, p.paper_title FROM authors a JOIN author_papers ap ON a.author_id = ap.author_id JOIN research_papers p ON ap.paper_id = p.paper_id', (err, results) => {
  if (err) throw err;
  console.log('All columns from authors table and their published papers', results);
});


connection.end();