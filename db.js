const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "crud_mongodb";
const url =  "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology : true};
const useUnifiedTopology = true;
const state = {
  db: null
};

const connect = (cb) => {
  if(state.db) //if there is a connection
    cb(); //callback
  else{
    MongoClient.connect(url, mongoOptions, {useUnifiedTopology: true, useNewUrlParser: true}, (err,client) => {
      if(err)
        cb(err);
      else{
        state.db = client.db(dbname);
        cb();
      }
    })
  }
}

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}

const getDB = () =>{
  return state.db;
}

//if on mac, use brew services start mongodb-community@4.2 to start mongo before running node
module.exports = {getDB, connect, getPrimaryKey};
