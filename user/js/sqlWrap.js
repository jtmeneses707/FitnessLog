'use strict'

const sql = require('sqlite3');
const util = require('util');


// old-fashioned database creation code 

// creates a new database object, not a 
// new database. 
const db = new sql.Database("activities.db");

// check if activity table exists
let cmdAct = " SELECT name FROM sqlite_master WHERE type='table' AND name='ActivityTable' ";
db.get(cmdAct, function (err, val) {
  if (val == undefined) {
        console.log("No activity table - creating one");
        createActivityTable();
  } else {
        console.log("Activity table found");
  }
});

// check if user table exists
let cmdUser = "SELECT name FROM sqlite_master WHERE type='table' AND name='UserTable'";
db.get(cmdUser, function (err, val) {
  if (val == undefined) {
        console.log("No user profile table - creating one");
        createUserTable();
  } else {
        console.log("User profile table found");
  }
});

// called to create activity table if needed
function createActivityTable() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE ActivityTable (rowIdNum INTEGER PRIMARY KEY, userID TEXT,  activity TEXT, date INTEGER, amount FLOAT)';
  db.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}

// called to create user profile table if needed
function createUserTable() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE UserTable (rowIdNum INTEGER PRIMARY KEY, userID TEXT,  firstName TEXT)';
  db.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}

// wrap all database commands in promises
db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

// empty all data from db
db.deleteEverything = async function() {
  await db.run("delete from ActivityTable");
  db.run("vacuum");
}

// allow code in index.js to use the db object
module.exports = db;
