const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function coreDatabase() {
  const CREATE_INVITEE_TABLE = `
    CREATE TABLE IF NOT EXISTS invitee (
      invitee_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(100),
      invited_by VARCHAR(100) NOT NULL
  );`
  const CREATE_ROOM_TABLE = `
    CREATE TABLE IF NOT EXISTS room (
      room_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(100),
      floor_number INT NOT NULL
  );`
  const CREATE_MEETING_TABLE = `
    CREATE TABLE IF NOT EXISTS meeting (
      meeting_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      meeting_title TEXT NOT NULL,
      starting_time TIME,
      ending_time TIME,
      room_no INT NOT NULL,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
  );`

  const invitee = [
    {
      invitee_name: 'Fressia', 
      invited_by: 'Yos',
    },
    {
      invitee_name: 'Martin', 
      invited_by: 'Carlos',
    },
    {
      invitee_name: 'Gaby', 
      invited_by: 'Emma',
    },
    {
      invitee_name: 'Mildred', 
      invited_by: 'Antonio',
    },
    {
      invitee_name: 'Michelle', 
      invited_by: 'Jose',
    }
  ];

  const room = [
    {
      room_name: 'Oasis',
      floor_number: 2,
    },
    {
      room_name: 'Madagascar',
      floor_number: 1,
    },
    {
      room_name: 'Paradise',
      floor_number: 3,
    },
    {
      room_name: 'Managua',
      floor_number: 3,
    },
    {
      room_name: 'Ivory',
      floor_number: 2,
    },
  ]

  const meeting = [
    {
      meeting_title: 'Budget Planning',
      starting_time: '10:00:00', 
      ending_time: '11:00:00', 
      room_no: 3,
    },
    {
      meeting_title: 'Catch up', 
      starting_time: '9:00:00', 
      ending_time: '10:00:00', 
      room_no: 2,
    },
    {
      meeting_title: 'Monthly stand-up', 
      starting_time: '08:30:00', 
      ending_time: '09:00:00',
      room_no: 1,
    },
    {
      meeting_title: 'Demo',
      starting_time: '11:30:00', 
      ending_time: '12:00:00', 
      room_no: 2,
    },
    {
      meeting_title: 'Onboarding', 
      starting_time: '14:00:00', 
      ending_time: '15:30:00',
      room_no: 3,
    },
  ];
  
  connection.connect();

  try {
    await Promise.all([
      execQuery(CREATE_INVITEE_TABLE), 
      execQuery(CREATE_ROOM_TABLE), 
      execQuery(CREATE_MEETING_TABLE)
    ]);
    
    await Promise.all(invitee.map(inv => execQuery('INSERT INTO invitee SET ?', inv)));
    await Promise.all(room.map(rm => execQuery('INSERT INTO room SET ?', rm)));
    await Promise.all(meeting.map(mt => execQuery('INSERT INTO meeting SET ?', mt)));
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

coreDatabase();