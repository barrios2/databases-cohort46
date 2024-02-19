const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup',
});

connection.connect();

const createTableQueries = [
  `CREATE TABLE Invitee (
      invitee_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(100),
      invited_by VARCHAR(100) NOT NULL
  );`,
  `CREATE TABLE Room (
      room_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(100),
      floor_number INT NOT NULL
  );`,
  `CREATE TABLE Meeting (
    meeting_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    meeting_title TEXT NOT NULL,
    starting_time TIME,
    ending_time TIME,
    room_no INT NOT NULL,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  );`
];

const insertInviteeTableValues = [
  "insert into Invitee values (invitee_name, invited_by) values ('Fressia', 'Yos')",
  "insert into Invitee values (invitee_name, invited_by) values ('Martin', 'Carlos')",
  "insert into Invitee values (invitee_name, invited_by) values ('Gaby', 'Emma')",
  "insert into Invitee values (invitee_name, invited_by) values ('Mildred', 'Antonio')",
  "insert into Invitee values (invitee_name, invited_by) values ('Michelle', 'Jose')",
]

const insertRoomTableValues = [
  "insert into Room (room_name, floor_number) values ('Oasis', 2)",
  "insert into Room (room_name, floor_number) values ('Madagascar', 1)",
  "insert into Room (room_name, floor_number) values ('Paradise', 4)",
  "insert into Room (room_name, floor_number) values ('Sydney', 3)",
  "insert into Room (room_name, floor_number) values ('Ivory', 6)",
]

const insertMeetingTableValues = [ 
  "insert into Meeting (meeting_title, starting_time, ending_time, room_no) values ('Budget Planning', '10:00:00', '11:00:00', 7)",
  "insert into Meeting (meeting_title, starting_time, ending_time, room_no) values ('Catch up', '9:00:00', '10:00:00', 6)",
  "insert into Meeting (meeting_title, starting_time, ending_time, room_no) values ('Monthly stand-up', '08:30:00', '09:00:00', 10)",
  "insert into Meeting (meeting_title, starting_time, ending_time, room_no) values ('Demo', '11:30:00', '12:00:00', 9)",
  "insert into Meeting (meeting_title, starting_time, ending_time, room_no) values ('Onboarding', '14:00:00', '15:30:00', 8)",
]

createTableQueries.forEach(query => {
  connection.query(query, function (error, results) {
    if (error) {
      throw error;
    }
  });
});

function insertData(dataArray) {
  dataArray.forEach(query => {
    connection.query(query, function (error, results) {
      if (error) {
        throw error;
      }
    });
  })  
}

insertData(insertInviteeTableValues);
insertData(insertRoomTableValues);
insertData(insertMeetingTableValues);

connection.end();