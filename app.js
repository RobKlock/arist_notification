//Rob Klock
//Arist Microservice to handle notifications

//Import all our libraries
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require ('path');
const db = require("./db");
const collection = "notifications";

//Begin API
//Serverside Updates

//Route API Endpoint
app.get('/', (req,res) => {
  //res.send("hi");
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Read
//gives all the notifications
app.get('/getNotifications', (req,res) =>{
  db.getDB().collection(collection).find({}).toArray((err,documents) =>{
    if(err) {        //Update to send a proper error message
      console.log(err);
      res.status(400).send({'error':err});
    }

    else{
      res.json(documents);
    }
  })
});

//Tried to write an individual get function. Not working
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
// Old in
// db.getDB().collection(collection).find({'_id': notificationID}, (err,result) =>{
//   if(err)
//     res.status(400).send({'error' : err})
//   if (result === undefined) {
//     res.status(400).send({'error' : 'No matching notification was found'});
//   }
//   else{
//   //  res.json(getNotifications);
//     res.status(200).send(result);
//     console.log(result);
//
//   }
// })
//
// });


//Update
app.put('/:id', (req,res) =>{
  const notificationID = req.params.id;
  const userInput = req.body;
  console.log(userInput);
  //Update Serverside
  db.getDB().collection(collection).findOneAndUpdate({
    _id: db.getPrimaryKey(notificationID)}, {
      $set : {
        //notification : userInput.notification,
        Subject : userInput.Subject,
        Text : userInput.Text,
        URL : userInput.URL,
        User : userInput.User,
        Classroom : userInput.Classroom,
        Acknowledged : userInput.Acknowledged
      }}, {returnOriginal: false}, (err,result) =>{
    if(err)
      //TODO: send a user-friendly err
      console.log(err);

    else
      res.json(result);

  });



});


//Create
app.post('/', (req,res) => {
  //get user input
  const userInput = req.body; //client-side: user gives json
  console.log(userInput);
  db.getDB().collection(collection).insertOne(userInput, (err,result) => {
    if (err) //log console on errors
      console.log(err); //fix to make more human-friendly
    else
      res.json({result: result, document : result.ops[0]});
    });
});

//Delete
//use the primary key of the notification to delete
app.delete('/:id', (req,res) => {
  const notificationID = req.params.id;

  db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(notificationID)}, (err,result) => {
    if(err)
      console.log(err);
    else
      res.json(result);

  });
});


db.connect((err) =>{
  if (err){
    console.log('unable to connect to database');
    process.exit(1);
  }
  else {
    app.listen(3000, () =>{
      console.log('connected to database, app listening on port 3000')
      console.log("hi rob!")
    });
  }
})
