const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require ('path');

const db = require("./db");
const collection = "notifications";

app.get('/', (req,res) => {
  res.sendFile(path.join(_dirname, 'index.html'));
});

app.get('/getNotifications', (req,res) =>{
  db.getDB().collection(collection).find({}).toArray((err,documents) =>{
    if(err) //Update to send a proper error message
      console.log(err);
    else{
      console.log(documents);
      res.json(documents);
    }
  })
});
//Serverside Update
app.put('/:id', (req,res) =>{
  const notificationID = req.params.id;
  const userInput = req.body;
  console.log("you did a command")
  db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(notificationID)}, {$set : {notification : userInput.notification}}, {returnOriginal: false}, (err,result) =>{
    if(err)
      console.log(err); //send a user-friendly err

    else
      res.json(result);
      console.log(req);
      console.log(res);

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
