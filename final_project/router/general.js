const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
  
//use the obj below to wrap the Books data that we get from promise if we use it.
let wrapBooks = {};

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      username.isValid
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "Customer already exists!"});    
    }
  } 
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
   res.send(JSON.stringify({books},null ,'\xa0 \xa0'))

   //using promise
//   let myPromise1 = new Promise((resolve,reject) => {
//     setTimeout(() => {
//       resolve(JSON.stringify({books},null ,'\xa0 \xa0'))
//     },200)})
//   myPromise1.then((successMessage) => {
//     wrapBooks = successMessage
//   })
//   res.send(wrapBooks);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // let myPromise2 = new Promise((resolve,reject) => {
  //   setTimeout(() => {
  //     resolve(JSON.stringify(books[isbn], null, '\xa0 \xa0'))
  //   },200)});
  
  // const isbn = req.params.isbn;
  // myPromise2.then((successMessage) => {
  //   wrapBooks = successMessage
  // });
  // res.send(wrapBooks);

  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn], null, '\xa0 \xa0'));
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  
  // let myPromise2 = new Promise((resolve,reject) => {
  //   setTimeout(() => {
  //     for(let i=0; i<Object.keys(books).length; i++){
  //       if(books[i+1].author === author ){
  //         let x = books[i+1].title;
  //         let y = books[i+1].reviews;
  //         let isbn = i+1;
    
  //         let booksAuthor = {"booksbyauthor":{
  //           "isbn" : isbn, "title" : x, "reviews" : y
  //         }}
  //         resolve(JSON.stringify(booksAuthor, null, '\xa0 \xa0'));
  //       }   
  //     }
  //   },200)})
  // myPromise2.then((successMessage) => {
  //   wrapBooks = successMessage
  // });
  // res.send(wrapBooks);

  for(let i=0; i<Object.keys(books).length; i++){
    if(books[i+1].author === author ){
      let x = books[i+1].title;
      let y = books[i+1].reviews;
      let isbn = i+1;

      let booksAuthor = {"booksbyauthor":{
        "isbn" : isbn, "title" : x, "reviews" : y
      }}
      res.send(JSON.stringify(booksAuthor, null, '\xa0 \xa0'));
    }

    
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  
  // let myPromise2 = new Promise((resolve,reject) => {
  //   setTimeout(() => {
  //     for(let i=0; i<Object.keys(books).length; i++){
  //       if(books[i+1].title === title ){
  //         let x = books[i+1].author;
  //         let y = books[i+1].reviews;
  //         let isbn = i+1;
    
  //         let booksTitle = {"booksbytitle":{
  //           "isbn" : isbn, "author" : x, "reviews" : y
  //         }}
  //         resolve(JSON.stringify(booksTitle, null, '\xa0 \xa0'));
  //       }
    
        
  //     }
  //   },200)});
  
  // const isbn = req.params.isbn;
  // myPromise2.then((successMessage) => {
  //   wrapBooks = successMessage
  // });
  // res.send(wrapBooks);

  for(let i=0; i<Object.keys(books).length; i++){
    if(books[i+1].title === title ){
      let x = books[i+1].author;
      let y = books[i+1].reviews;
      let isbn = i+1;

      let booksTitle = {"booksbytitle":{
        "isbn" : isbn, "author" : x, "reviews" : y
      }}
      res.send(JSON.stringify(booksTitle, null, '\xa0 \xa0'));
    }

    
  }

  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const review = req.params.isbn;
  
  res.send(books[review].reviews);
  
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
