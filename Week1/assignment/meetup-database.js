const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function coreDatabase() {
  const CREATE_INVITEE_TABLE = `
    CREATE TABLE IF NOT EXISTS invitee (
      invitee_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(100)
  );`
  const ALTER_INVITEE_TABLE = `
    ALTER TABLE invitee
    ADD COLUMN invited_by INT,
    ADD CONSTRAINT fk_invited_by FOREIGN KEY (invited_by)
    REFERENCES invitee(invitee_no)
  `
  const CREATE_ROOM_TABLE = `
    CREATE TABLE IF NOT EXISTS room (
      room_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(100),
      floor_number TINYINT NOT NULL 
  );`
  const CREATE_MEETING_TABLE = `
    CREATE TABLE IF NOT EXISTS meeting (
      meeting_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      meeting_title TEXT NOT NULL,
      starting_time DATETIME NOT NULL,
      ending_time DATETIME NOT NULL,
      room_no INT NOT NULL,
      FOREIGN KEY (room_no) REFERENCES room(room_no)
  );`

  const invitee = [
    {
      invitee_name: 'Fressia', 
      invited_by: 2,
    },
    {
      invitee_name: 'Martin', 
      invited_by: 4,
    },
    {
      invitee_name: 'Gaby', 
      invited_by: 1,
    },
    {
      invitee_name: 'Mildred', 
      invited_by: 3,
    },
    {
      invitee_name: 'Michelle', 
      invited_by: 5,
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
  ];

  const meeting = [
    {
      meeting_title: 'Budget Planning',
      starting_time: '2024-01-23 10:00:00', 
      ending_time: '2024-01-23 11:00:00', 
      room_no: 3,
    },
    {
      meeting_title: 'Catch up', 
      starting_time: '2024-01-22 9:00:00', 
      ending_time: '2024-01-22 10:00:00', 
      room_no: 2,
    },
    {
      meeting_title: 'Monthly stand-up', 
      starting_time: '2024-01-26 08:30:00', 
      ending_time: '2024-01-26 09:00:00',
      room_no: 1,
    },
    {
      meeting_title: 'Demo',
      starting_time: '2024-02-20 11:30:00', 
      ending_time: '2024-02-20 12:00:00', 
      room_no: 2,
    },
    {
      meeting_title: 'Onboarding', 
      starting_time: '2024-02-22 14:00:00', 
      ending_time: '2024-02-22 15:30:00',
      room_no: 3,
    },
  ];
  
  connection.connect();

  try {
    execQuery('DROP DATABASE IF EXISTS meetup');
    execQuery('CREATE DATABASE IF NOT EXISTS meetup');
    execQuery('USE meetup');
    execQuery(CREATE_INVITEE_TABLE);
    execQuery(ALTER_INVITEE_TABLE);
    execQuery(CREATE_ROOM_TABLE);
    execQuery(CREATE_MEETING_TABLE);

    // temporarily disabling checking for foreign keys in the database - https://www.sqlines.com/mysql/set_foreign_key_checks
    execQuery('SET FOREIGN_KEY_CHECKS=0');

    await Promise.all(
      invitee.map(inv => {
        execQuery('INSERT INTO invitee SET ?', inv)
      })
    );

    // enabling foreign key constraints check
    execQuery('SET FOREIGN_KEY_CHECKS=1');

    await Promise.all(room.map(rm => {
      execQuery('INSERT INTO room SET ?', rm)
      })
    );

    await Promise.all(meeting.map(mt => {
      execQuery('INSERT INTO meeting SET ?', mt)
      })
    );

  } catch (error) {
    console.error(error);
  };

  connection.end();
};

coreDatabase();
