console.log('client.js is sourced!');

function onReady(){
    getCalculations ();  //We want to show the past calculations as soon as the site loads

}

function getCalculations (){
    // get calculations from the server using Axios
    axios ({
        method: 'GET',
        url: '/calculations'
    })

    .then(function (response) { 
        console.log("Request to GET /quotes succeeded with status:", response.status);  
        console.log("Response payload:", response.data); // <- The content of the response (what the server sent) is in the .data field of the response object
        // Always console log it, so you can see what kind of data you are working with

        let calculationsFromServer = response.data
        // append calculations to the DOM
        renderToDOM(calculationsFromServer);  // <- Don't forget to actually do stuff with the data!
    })
    .catch(function (error) { // <- This function runs if we get a status code in the range of 400-599 from the server
        // Always have a .catch  It's easy to forget, but things go wrong sometimes.
        // Notify the user when it happens.
        alert('Request to GET /calcuations failed.');
        // It can be handy to see info about what went wrong:
        console.error('Request to GET /calculations failed:', error);
    });
}

function renderToDOM (calcuations){
        // Select the element from the DOM, that we want to use as a container for our data
        let outputElement = document.getElementById('output');
        // Empty the output element, so we don't keep the old results.
        // We want to start fresh each time we add the list, since we always add the whole list.
        //outputElement.innerHTML = '';
    
        // Add the quotes to the DOM.
        for (let calculation of calcuations) {
            // Create a <li> for each calculation and append it to outputElement
            outputElement.innerHTML += `
                <li>
                  ${calcuations.numOne} ${calcuations.operator} ${calcuations.numTwo} '=' ${calcuations.result}
                </li>
              `;
        }
    }

