
// const express = require('express');
// const bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.json());
// const path = require ('path');
// const Joi = require('@hapi/joi');
// const db = require("./db");
// const collection = "notifications";
//
// //serves static html
//
// //schema is a blueprint that an object has to follow
// //In this instance, schema should have:
//   // Subject
//   // Text
//   // Url
//   // User
//   // Classroom
//   // Acknowledged (Boolean)
//
//  const schema = Joi.object().keys({
//    notification : Joi.string().required()
//    //add the other objects later on
//  });
//
//
//
// //fix
// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });
//
//
//
// //gives all the notifications
// app.get('/getNotifications', (req,res) =>{
//   db.getDB().collection(collection).find({}).toArray((err,documents) =>{
//     if(err) //Update to send a proper error message
//       console.log(err);
//     else{
//       res.json(documents);
//     }
//   })
// });
// //Serverside Update
//
// app.put('/:id', (req,res) =>{
//   const notificationID = req.params.id;
//   const userInput = req.body;
//
//   db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(notificationID)}, {$set : {notification : userInput.notification}}, {returnOriginal: false}, (err,result) =>{
//     if(err)
//       console.log(err); //send a user-friendly err
//
//     else
//       res.json(result);
//       console.log(req);
//       console.log(res);
//
//   });
// });
//
// //create
// app.post('/', (req,res, next) => {
//   //get user input
//   const userInput = req.body; //client-side: user gives json
//
//   schema.validate(userInput, schema, (err,result) => {
//     if(err){
//       const error = new Error("Invalid Input");
//       error.status = 400;
//       next(error);
//       console.log(error);
//     }
//     else{
//       db.getDB().collection(collection).insertOne(userInput, (err,result) => {
//         if (err) {//log console on errors
//           const error = new Error("Failed to insert notification document");
//           error.status = 400;
//           next(error);
//           console.log(error);
//         }
//         else
//           res.json({result: result, document : result.ops[0], msg: "Success!", error : null});
//         });
//     }
//   })
//
//
//   // db.getDB().collection(collection).insertOne(userInput, (err,result) => {
//   //   if (err) //log console on errors
//   //     console.log(err); //fix to make more human-friendly
//   //   else
//   //     res.json({result: result, document : result.ops[0]});
//   //   });
// });
//
// //delete
// //use the primary key of the notification to delete
// app.delete('/:id', (req,res) => {
//   const notificationID = req.params.id;
//
//   db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(notificationID)}, (err,result) => {
//     if(err)
//       console.log(err);
//     else
//       res.json(result);
//
//   });
// });
//
// //Sends error response
// // app.use((err, req, res, next) => {
// //   res.status(err.status).json({
// //     error : {
// //       message : err.message
// //     }
// //   });
// // })
//
//
// db.connect((err) =>{
//   if (err){
//     console.log('unable to connect to database');
//     process.exit(1);
//   }
//   else {
//     app.listen(3000, () =>{
//       console.log('connected to database, app listening on port 3000')
//       console.log("hi rob!")
//     });
//   }
// })
