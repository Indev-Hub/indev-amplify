// THIS IS JUST A TEST TO SEE ONE POSSIBLE WAY TO RUN THROUGH AN ARRAY AND DELETE ALL
// THE SHOWCASES IN THAT ARRAY. DO NOT USE THIS FOR ANYTHING OTHER THAN REFERENCE.

const bearerToken = "Bearer " + process.env.BEARER_TOKEN;  //Storing Bearer token


async function returnShowcases(pages) { //GET request to vimeo API for allAlbumsObject (albums=showcases)
  let myHeaders = new Headers();
  let bigResponse;
  myHeaders.append("Authorization", bearerToken); //Adding the bearer token to API call (from Postman)

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  // Below we specify that we want 100 showcases per page because 100 is the most that vimeo allows at a time
  await fetch(`https://api.vimeo.com/users/111828492/albums/?per_page=100&page=${pages}`, requestOptions)
    .then(function(response){
      bigResponse = response.json();
    } )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return bigResponse;

}
let idList = []; // Array of extracted showcaseID's (All current showcases)

// We give this function our huge response object and it gets the data.uri for each showcase.  Then we split that uri string by the "/" and push all the showcase ID's to a new array (idList)
function parseUris(response){  

  Object.values(response.data).forEach((showcase) => {
    // console.log(showcase.uri);
    let splitVariable = showcase.uri.split('/');
    idList.push(splitVariable[splitVariable.length-1]); //Grabs only the showcaseID from each 'uri'
  });
  return idList;
}

//Now the async deleteCall will receive each singular showcaseID to run the DELETE call to vimeo API
async function makeDeleteCall(showcaseId) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", bearerToken);

  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  await fetch(`https://api.vimeo.com/users/111828492/albums/${showcaseId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

//Function where the idList is passed in and a forEach loop will run the delete call above for each showcaseID
function deleteAll(idList) {
  let success;
  idList.forEach((id) => {
    success = makeDeleteCall(id);
    console.log(success);

  });
}

let bigResponse;
let button = document.getElementById("go-button")
button.addEventListener("click", async function (e) { //e => event
  if (!confirm("Do you really want to do this?")) {
    e.preventDefault(); // ! => don't want to do this
  } else {

  // button.addEventListener('click', async function(event){
  //   event.preventDefault();
    let pages = 1;

    bigResponse = await returnShowcases(pages);
    parseUris(bigResponse);
    let totalPages = Math.ceil(bigResponse.total/100);
    //function above and the If--While loop below will calculate how many times it needs to run the delete command because it goes through 100 at a time.  so 270 showcases would round up to 3 times to account for the remaining 70 showcases.
    if (totalPages>pages){
      pages = 2;
      while(pages<=totalPages){
        
        bigResponse = await returnShowcases(pages);
        parseUris(bigResponse);
        pages++;
      }
    }

    console.log(idList);

    deleteAll(idList); // This command will pass in the array of showcaseID's to the delete function that runs as many times as needed to delete all showcaseID's in the idList array.
  }
});


