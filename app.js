//Rob Klock
//Arist Microservice to handle notifications
//I tested this out using Postman, which is available here: https://www.postman.com/
//I also made a somewhat-working static HTML file that can be used to view how the database changes.

//Import all our libraries
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require ('path');
const db = require("./db");
const collection = "notifications";

//Begin API, this app focuses on serverside updates

//Route API Endpoint
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Read
//Gives all the notifications, figured this would be most handy
app.get('/getNotifications', (req,res) =>{
  //Take all notifications in the database, format them into an array, and send back as a result
  db.getDB().collection(collection).find({}).toArray((err,documents) =>{
    //If theres an error, send an error message back, log it on console, and send a status code of 400 (failure)
    if(err) {
      console.log(err);
      res.status(400).send({'error':err});
    }
    //Otherwise, send documents back in json format
    else{
      res.json(documents);
    }
  })
});

//Tried to write an individual get function. Not working! I'll work on this later this week
//Basically, how this would work is sending a getNotifications request with a specific id parameter
app.get('/getNotifications/:id', (req,res, next) => {
  const notificationID = req.params.id;
  console.log(notificationID);
  db.getDB().collection(collection).findOne({'_id': notificationID}, (err,result) =>{
    if(err)
      res.status(400).send({'error' : err})
    if (result === undefined) {
      res.status(400).send({'error' : 'No matching notification was found'});
    }
    else{
      res.json(result);

      console.log(result);
    }
  })
});


//Update
//Oterwise known as a put function, this updates an existing notification with new parameters
app.put('/:id', (req,res) =>{
  //Establish notifcation and input variables

  const notificationID = req.params.id;
  const userInput = req.body;

  //Update Serverside
  db.getDB().collection(collection).findOneAndUpdate({
    //Search the database and see if an object with matching ID exists
    _id: db.getPrimaryKey(notificationID)}, {
      //Set new object values
      $set : {
        //If you need to add new objects to the dataset, do so here
        Subject : userInput.Subject,
        Text : userInput.Text,
        URL : userInput.URL,
        User : userInput.User,
        Classroom : userInput.Classroom,
        Acknowledged : userInput.Acknowledged
      }}, {returnOriginal: false}, (err,result) =>{
    //If theres an error, send a status code of 400 to indicate a failure and log it on console
    if(err){
      res.status(400).send({'error': err});
      console.log(err);
    }
    //Otherwise, result is the json value of the updates variables
    else
      res.json(result);
  });
});


//Create
//Otherwise known as a post function, this is responsible for creating new objects in our database
app.post('/', (req,res) => {
  //Get user input
  const userInput = req.body; //client-side: user gives json

  db.getDB().collection(collection).insertOne(userInput, (err,result) => {
    if (err){
      //If theres an error, send a status code of 400 to indicate a failure and log it on console
      res.status(400).send({'error': err});
      console.log(err);
    }
    else
      //Otherwise, result is the information relating to the object being posted in the database
      //Document is the new object that was just inserted in the database
      res.json({result: result, document : result.ops[0]});
    });
});

//Delete - Deletes an object from our database
app.delete('/:id', (req,res) => {
  //Get the ID of our object from the request parameters
  const notificationID = req.params.id;
  //Find the Object in the db and delete it
  db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(notificationID)}, (err,result) => {
    if(err){
      //If theres an error, send a status code of 400 to indicate a failure and log it on console
      res.status(400).send({'error': err});
      console.log(err);
    }
    else
      res.json(result);

  });
});

//Establishes a connection to our MongoDB database
db.connect((err) =>{
  //If theres an issue, exit and tell the user via console
  if (err){
    console.log('unable to connect to database');
    process.exit(1);
  }
  else {
    //Otherwise, note the successful connection and indicate port
    //If you want to change the port, do so here
    app.listen(3000, () =>{
      console.log('connected to database, app listening on port 3000')
    });
  }
})
