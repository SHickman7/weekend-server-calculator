const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [
  {
    numOne: 3,
    numTwo: 5,
    operator: '+',
    result: 8
  }
];

let latestEquation;

let latestResult;

// Here's a wonderful place to make some routes:

// GET /calculations

app.get('/calculations', function (req, res){
  console.log ('Request for GET /calculations was made');
  
  //set status
  res.status(200);
  //sendco
  res.send(calculations)
});

// POST /calculations



app.post('/calculations', function (req, res) {
  // The data, (the object we put in the body field of our POST in axios) is sent to us.
  // It shows up in `req.body`
  // Note that without express.json() or bodyParser setup above, req.body will be empty or undefined!

  // let newNumbersToCalculate = req.body;
  // console.log(`We got some POST data to /calculations:`, newNumbersToCalculate);

  // Grab the info we want from the request body
  // This is different every time, so that's why we like to console log the data, so we can see what we are working with.
  let calculationToAdd = req.body.calculationToAdd;
  console.log(`Adding new calculation: `, calculationToAdd);

  function newCalculationResult(){
    if (calculationToAdd.operator === "+"){
      latestResult = calculationToAdd.numOne + calculationToAdd.numTwo
    } else if (calculationToAdd.operator === "-"){
      latestResult = calculationToAdd.numOne - calculationToAdd.numTwo
    } else if (calculationToAdd.operator === "*"){
      latestResult = calculationToAdd.numOne * calculationToAdd.numTwo
    } else if (calculationToAdd.operator === "/"){
      latestResult = calculationToAdd.numOne / calculationToAdd.numTwo
    } 
  }
newCalculationResult();
console.log ('The latest result is: ', latestResult)

  // // Push the new calculation into our array
  // calculations.push(calculationToAdd);

  // Send back a status code of 201
  res.sendStatus(201);
});


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
