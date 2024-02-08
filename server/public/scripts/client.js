console.log('client.js is sourced!');

onReady();

function onReady(){
    getCalculations ();  //We want to show the past calculations as soon as the site loads

}

let operator;

function getCalculations (){
    // get calculations from the server using Axios
    axios ({
        method: 'GET',
        url: '/calculations'
    })

    .then(function (response) { 
        console.log("Request to GET /calculations succeeded with status:", response.status);  
        console.log("Response payload:", response.data); // <- The content of the response (what the server sent) is in the .data field of the response object
        // Always console log it, so you can see what kind of data you are working with

        let calculationsFromServer = response.data
        // append calculations to the DOM
        renderToDOM(calculationsFromServer);  // <- Don't forget to actually do stuff with the data!
    })
    .catch(function (error) { 
      
        alert('Request to GET /calcuations failed.');
       
        console.error('Request to GET /calculations failed:', error);
    });
}

function renderToDOM (calculations){
        // Select the element from the DOM, that we want to use as a container for our data
        let outputElement = document.getElementById('resultHistory');
        // Empty the output element, so we don't keep the old results.
        // We want to start fresh each time we add the list, since we always add the whole list.
        outputElement.innerHTML = '';
    
        let outputTelement2 = document.querySelector('h2');
        outputTelement2.innerHTML = '';

        // Add the calculation to the DOM.
        for (let calculation of calculations) {
            // Create a <li> for each calculation and append it to outputElement
            outputElement.innerHTML += `
                <li>
                  ${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}
                </li>
              `;
              outputTelement2.innerHTML = `${Number(calculation.result)}`;
              
              //console.log('calculations.result',calculation.result)
        }
        

        }
    



function onAddClick(event){
    event.preventDefault();
    operator = "+";
}   


function onMinusClick(event){
    event.preventDefault();
    operator = "-";
}
    
function onMultiplicationClick(event){
    event.preventDefault();
    operator = "*";
}

function onDivisionClick(event){
    event.preventDefault();
    operator = "/";
}


    

function onFormSubmit(event){
    //to stop the page from refreshing:
    event.preventDefault();

    //Grab the input from the DOM
    let newFirstNumber = document.getElementById('first_number').value;
    let newSecondNumber = document.getElementById('second_number').value;
    let newOperator = operator;
    
    axios({
        method: 'POST',
        url: '/calculations',
        data: {
            numOne: newFirstNumber,
            numTwo: newSecondNumber,
            operator: newOperator
            }
        }
    )

        .then(function (response) {
            console.log ("Request to POST /calculations succeeded with status:", response.status);
            getCalculations()
        
        })
        .catch(function (error){
            alert('Request to POST /calculations failed.');
            console.error('Request to POST /calculations failed:', error);
        });

}

function onClearClick(event){
    event.preventDefault();
    document.getElementById('first_number').value = '';
    document.getElementById('second_number').value = '';
}