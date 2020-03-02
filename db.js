//Import MongoDB driver
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Establish database
const dbname = "crud_mongodb";

//Default DB location on LOCAL MACHINE
const url =  "mongodb://localhost:27017";

//Options for our Mongo Database
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology : true};

//Signify the defualt state of our database
const state = {
  db: null
};

//Method to connect to the database
const connect = (cb) => {
  //If there is a connection
  if(state.db)
  //Callback
    cb();
  //Otherwise, establish a connection to the database
  else{
    MongoClient.connect(url, mongoOptions, {useUnifiedTopology: true, useNewUrlParser: true}, (err,client) => {
      if(err)
        cb(err);
      else{
        //If theres no error, change state to relect a connection
        state.db = client.db(dbname);
        cb();
      }
    })
  }
}

//Function to rturn an object ID object to query the database by the primary key
const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}

//Function to get the database
const getDB = () =>{
  return state.db;
}

//if on mac, use brew services start mongodb-community@4.2 to start mongo before running node
module.exports = {getDB, connect, getPrimaryKey};
