
const express = require("express");
const router = express.Router();

//require the admin
var admin = require("firebase-admin");


//init sdk


var serviceAccount = require("./persmissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://apiexamples-a8c04.firebaseio.com"
});


//init an instance of cloud firestore
const db = admin.firestore();

//reference to the database collection
const userCollection = db.collection('Users');


//get method
router.get('/oneuser', (req, res, next) => {
  //get the collection from the database
  db.collection("Users")
    // By adding the "where" clause we have control over what data comes back
    .where('email', '==', 'amjadpanjeeri@gmail.com')
    .onSnapshot((snap) => {
      snap.forEach((doc) => {
        res.json({
          "statuscode": "200",
          "email": doc.data().email,
          "password":doc.data().password
        })
      });
    });
});



//get method
router.get("/users", (req, res, next) => {
  //get the collection from the database
  let allUsers = [];
  // listen to the collection 
  db.collection("Users")
    .onSnapshot((snap) => {
      // comes back in a way that is iterable with a forEach() loop
      snap.forEach((doc) => {
        // doc.data() is each document coming from the collection
        allUsers.push({
          "docID": doc.id,
          "userData": doc.data()
        });

      });
      res.json({
        "statuscode": "200",
        "data": allUsers
      })
    });
});



//post method
const email = "amjad@gmail.com";
const password = "123";
router.post('/users', (req, res, next) => {
  let newUser = {
    "email": email,
    "password": password
  }
  let setNewUser = userCollection.doc().set(newUser);

  res.json({
    "message": "successfull"
  })

});


module.exports = router;



