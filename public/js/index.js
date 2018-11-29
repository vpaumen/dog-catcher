/* require("dotenv").config(); */

/* var keys = require("./keys"); */

// Spotify and Twitter requires
/* var Spotify = require("node-spotify-api"); */

// Request package import
/* var request = require("request"); */

// fs Node package import
/* var fs = require("fs"); */

/* var queryUrl = "http://api.petfinder.com/pet.find?key=183129c808bcae5ded4b21a86b0a1ddc&format=json&animal=dog";

request(queryUrl, function(error, response, body) {

    console.log(response);
}); */

var dogs = [];

var sizes = ['S', 'M', 'L', 'XL'];

var sexes = ['M', 'F'];

var ages = ['Baby', 'Young', 'Adult', 'Senior'];

var breed = '';

var size = '';

var sex = '';

var age = '';

var apiKey = '183129c808bcae5ded4b21a86b0a1ddc'; // assign our key to a variable, easier to read

// Petfinder API - breed.list call to populate Breeds dropdown
document.addEventListener('DOMContentLoaded', getBreeds);

// the next line and function set up the button in our html to be clickable and reactive 
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('SubmitZip').addEventListener('click', function(event){
		event.preventDefault();
		var zip = document.getElementById('InputZip').value; // this line gets the zip code from the form entry
        /* var url = 'https://api.petfinder.com/pet.getRandom'; */
        var url = 'https://api.petfinder.com/pet.find';
        /* var url = 'https://api.petfinder.com/breed.list'; */

		
		// Within $.ajax{...} is where we fill out our query 
		$.ajax({
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: apiKey,
				animal: 'dog',
				breed: breed,
				size: size,
				sex: sex,
				'location': zip,
				age: age,
        count: 3,
				output: 'basic',
				format: 'json'
			},
			// Here is where we handle the response we got back from Petfinder
			success: function( response ) {
				console.log(response); // debugging

				var offset = "";

				/* var dog = {

					"id": "",
					"shelterId": "",
					"zip": "",
					"image": "",
					"name": "",
					"breed": [],
					"size": "",
					"sex": "",
					"age": "",
					"location": "",
					"description": "",
					"email": "",
				}; */

				for (var i = 0; i < response.petfinder.pets.pet.length; i++) {

					var dog = {

						"id": "",
						"shelterId": "",
						"zip": "",
						"photo": "",
						"name": "",
						"breed": [],
						"size": "",
						"sex": "",
						"age": "",
						"location": "",
						"description": "",
						"email": "",
					};

					dog.id = response.petfinder.pets.pet[i].id.$t;
					dog.shelterId = response.petfinder.pets.pet[i].shelterId.$t;
					dog.zip = response.petfinder.pets.pet[i].contact.zip.$t;

					// Try...Catch for dogs without photos inside media, gracefully handling > Uncaught TypeError: Cannot read property 'photo' of undefined
					try {

						dog.photo = response.petfinder.pets.pet[i].media.photos.photo[2].$t;
					}
					catch (error) {

						console.log(error.message);
						console.log("Dog ID: " + response.petfinder.pets.pet[i].id.$t + " does not have photos in the Petfinder API");
					}

					dog.name = response.petfinder.pets.pet[i].name.$t;
					
					

					// Check for dog with multiple breeds
					if (response.petfinder.pets.pet[i].breeds.breed.length == null) {

						dog.breed.push(response.petfinder.pets.pet[i].breeds.breed.$t);						
					}
					else {
						
						for (var j = 0; j < response.petfinder.pets.pet[i].breeds.breed.length; j++) {

							dog.breed.push(response.petfinder.pets.pet[i].breeds.breed[j].$t);
						}
					}
					
					// Check for dog with multiple breeds
					/* if (Array.isArray(response.petfinder.pets.pet[i].breeds.breed)) {

						for (var j = 0; j < response.petfinder.pets.pet[i].breeds.breed.length; j++) {

							dog.breed.push(response.petfinder.pets.pet[i].breeds.breed[j].$t);
						}
					}
					else {

						dog.breed.push(response.petfinder.pets.pet[i].breeds.breed.$t);
					} */

					dog.size = response.petfinder.pets.pet[i].size.$t;
					dog.sex = response.petfinder.pets.pet[i].sex.$t;
					dog.age = response.petfinder.pets.pet[i].age.$t;
					dog.location = response.petfinder.pets.pet[i].contact.city.$t + ", " + response.petfinder.pets.pet[i].contact.state.$t;
					dog.description = response.petfinder.pets.pet[i].description.$t;
					dog.email = response.petfinder.pets.pet[i].contact.email.$t;
					
          dogs.push(dog);
          
				}

        console.log(dogs);
        
        displayResults();
                
				/* var catName = response.petfinder.pet.name.$t;
				var img = response.petfinder.pet.media.photos.photo[0].$t;
				var id = response.petfinder.pet.id.$t;

				var newName = document.createElement('a');
				var newDiv = document.createElement('div');
				newName.textContent = catName;
				newName.href = 'https://www.petfinder.com/petdetail/' + id;

				var newImg = document.createElement('img');
				newImg.src = img;
				
				var list = document.createElement("div");
				list.setAttribute("id", "List");
				document.body.appendChild(list);

				newDiv.appendChild(newName);
				list.appendChild(newDiv);
				list.appendChild(newImg); */
			}
		});
		})

}

function getBreeds() {

	var url = 'https://api.petfinder.com/breed.list'

	$.ajax({
		url: url,
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			key: apiKey,
			animal: 'dog',
			format: 'json'
		},
		// Here is where we handle the response we got back from Petfinder
		success: function( response ) {
			console.log(response); // debugging

			console.log(response.petfinder.breeds.breed.length);

			for (var i = 0; i < response.petfinder.breeds.breed.length; i++) { 

				var newBreed = $("<option>");
				newBreed.attr("value", response.petfinder.breeds.breed[i].$t);
				newBreed.text(response.petfinder.breeds.breed[i].$t);
				$("#breeds-drop").append(newBreed);
			}
	
		}
	});

	getSizes();
	getSexes();
	getAges();
}

function getSizes() {

	for (var i = 0; i < sizes.length; i++) { 

		var newSize = $("<option>");
		newSize.attr("value", sizes[i]);
		newSize.text(sizes[i]);
		$("#sizes-drop").append(newSize);
	}
}

function getSexes() {

	for (var i = 0; i < sexes.length; i++) { 

		var newSex = $("<option>");
		newSex.attr("value", sexes[i]);
		newSex.text(sexes[i]);
		$("#sexes-drop").append(newSex);
	}
}

function getAges() {

	for (var i = 0; i < ages.length; i++) { 

		var newAge = $("<option>");
		newAge.attr("value", ages[i]);
		newAge.text(ages[i]);
		$("#ages-drop").append(newAge);
	}
}

/////////////////////
/* Populating results list div */

function displayResults() {

  for (var i = 0; i < dogs.length; i++) {

    console.log("i");
    var resultTile = `<div class="tile">
  
    <a href="https://www.petfinder.com/petdetail/${dogs[i].id}" target="_blank"><img src="${dogs[i].photo}"/></a>
  
    <h3 class="centerImage">${dogs[i].name}</h3>
  
    </div>`;
         
    $("#resultsList").append(resultTile);
  
  
  }
}





/* KIRSTEN: THIS IS TO TEST API. Changed var names, not sure what we need or will overlap - Kirsten
The next line and function set up the button in our html to be
clickable and reactive*/


    
// Please check the code, particularly variables! - Kirsten
/* var apiKey = 'api_key'; */ // FIND JAMES' KEY VARIABLE AND INSERT

// the next line and function set up the button in our html to be clickable and reactive -Kirsten
/* document.addEventListener('DOMContentLoaded', bindButtons); */

/* function bindButtons(){
	document.getElementById('submitZip').addEventListener('click', function(event){
		event.preventDefault();
		var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
		var url = 'http://api.petfinder.com/pet.find'; */
		
    // Within $.ajax{...} is where we fill out our query
    //please check, also how many results shown? 3 to test? I am manually adding info - Kirsten
		/* $.ajax({
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: api_key,
        animal: 'dog',
        breed: 'breed.list',
        size: 'S', // S,M,L,XL
        sex:  'M', // M or F - character not string
        age:  'Young', //Baby, Young, Adult, Senior
				'location': zip,
        output: 'basic',
        count:  3,
        offset: 'lastOffset', //Do we want this, check arguments
				format: 'json',
			}, */
			// Here is where we handle the response we got back from Petfinder
			/* success: function( response ) {
				console.log(response); // debugging
				var dogName = response.petfinder.pet.name.$t;
				var img = response.petfinder.pet.media.photos.photo[0].$t;
				var id = response.petfinder.pet.id.$t;

				var newName = document.createElement('a');
				var newDiv = document.createElement('div');
				newName.textContent = dogName;
				newName.href = 'https://www.petfinder.com/petdetail/' + id;

				var newImg = document.createElement('img');
				newImg.src = img;
				
				var list = document.createElement("div");
				list.setAttribute("id", "List");
				document.body.appendChild(list);

				newDiv.appendChild(newName);
				list.appendChild(newDiv);
				list.appendChild(newImg);
			}
		});
		})

} */
//End of test code for API request



/* COMMETING OUT TO TEST - ALL BELOW IS ORIGINAL
Get references to page elements */
/* var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list"); */

// The API object contains methods for each kind of request we'll make
/* var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
}; */

// refreshExamples gets new examples from the db and repopulates the list
/* var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
}; */

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
/* var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
}; */

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
/* var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick); */
