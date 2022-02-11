// array for local storage
var year = [];

//console.log(document.querySelector(".movie-2").getElementsByClassName(".m-title"));


// creating variables to select elements on index.html
var buttonClick = document.querySelector("#search-btn");
var textBox = document.querySelector(".textarea");

// variable for the current year for long term usability
var currentYear = new Date().getFullYear();


// function: gather user input from search button
var buttonEventHandler = function(event) {
    event.preventDefault();
    var input = textBox.value;

    if (input) {
      fetchApi(input);
      var pastSearches = JSON.parse(localStorage.getItem("year")) || []
      if (pastSearches.indexOf(input) === -1){
          pastSearches.push(input)
          localStorage.setItem("year", JSON.stringify(pastSearches))
          displayData();
        }
      textBox.value = "";
    }
  };


// function: input year output movies
var fetchApi = function(year) {
    var titleArray = [];
    var imageArray = [];
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    var movieApi = 'https://imdb-api.com/API/AdvancedSearch/k_nxso5xxe?title_type=feature,tv_movie&release_date=' + year + '-01-01,&countries=us&sort=moviemeter,desc';
    fetch(movieApi, requestOptions).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                // console.log(data);
                for (var i = 0; i < 5; i++) {
                    // collect title to display
                    var dataTitle = data.results[i].title
                    // collect image to display
                    var dataImage = data.results[i].image;
                    // add to object and place object in array
                    titleArray.push(dataTitle);
                    imageArray.push(dataImage);
                }
            });
        } else {
            // switch from alert to display on page
            alert("Error: Year unable to be searched");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to IMDb");
    });
    console.log(titleArray);
    console.log(imageArray);
    displayData(titleArray, imageArray, year);
}

// function to display movie data
var displayData = function(arrayOfTitles, arrayOfImages, year) {

    // updates year displayed to be user input year
    document.querySelector(".year-header").textContent = year;

    console.log(arrayOfTitles);
    console.log(arrayOfImages);
    // display movie images and titles on page
    for (var i = 0; i<arrayOfImages.length; i++) {
        var k = i+1;
            var generalDiv = document.querySelector(".movie-"+k);
            // changing the title
            console.log(arrayOfTitles[i]);
            generalDiv.firstElementChild.textContent = k + ": " + arrayOfTitles[i];
            console.log(generalDiv.firstElementChild);
            // changing the image
            // console.log(arrayOfImages[i]);
            // generalDiv.lastElementChild.setAttribute("src", arrayOfImages[i]);
            // console.log(generalDiv.lastElementChild);
    }
}

function displayPreviousSearches() {
  var pastHTML = ""
  var pastSearches = JSON.parse(localStorage.getItem("year")) || []
  for (i = 0; i< pastSearches.length; i++) {
    pastHTML = pastSearches
  } 
  document.getElementById("past-searches").innerHTML = pastHTML;
}


// function: input year output music

// function: add input year to the array
var updateArray = function(year) {
      storedYear.push(year);
      // need to display on page for user to see (possibly interact with)
      saveContent();
  };
  
  // // function: save local data (saving the year that was gathered from user input)
  // var saveContent = function() {
  //       localStorage.setItem("year", JSON.stringify(storedYear));
  //   };
    
    // function: persist local data (reload page each refresh to display the saved data on screen)
    var loadTasks = function() {
      var storedTasks = localStorage.getItem("year");
      if (storedTasks) {
        storedYear = JSON.parse(storedTasks);
      }
    }
      //     // updateArray();
      // };
      
      buttonClick.addEventListener("click", buttonEventHandler);
      
      
      var boredBtn = document.querySelector("#generate-activity")
      var currentActivityContainer = document.getElementById("current-activity-container")
      
      // shows the activity function
      var getActivity = function() {
        var boredApiUrl = 'https://www.boredapi.com/api/activity'
        // calling the api
        fetch(boredApiUrl)
        .then(response => response.json())
        .then(data => {
          // log data in console
          console.log(data)
          
          // resets container element
          currentActivityContainer.textContent = "";
          
          // creating variable for each element pulled from api
          var activityType = document.createElement("p");
          activityType.textContent = "Type: " + data.type
          activityType.classList = "text-capitalize";
          currentActivityContainer.appendChild(activityType);
          
          var activity = document.createElement("p");
          activity.textContent = "Activity: " + data.activity
          activity.classList = "text-capitalize";
          currentActivityContainer.appendChild(activity);
          
          var activityParticipants = document.createElement("p");
          activityParticipants.textContent = "Participants: " + data.participants
          activityParticipants.classList = "text-capitalize";
          currentActivityContainer.appendChild(activityParticipants);
          
          var activityPrice = document.createElement("p");
          activityPrice.textContent = "Price: " + "$ " + data.price
          activityPrice.classList = "text-capitalize";
          currentActivityContainer.appendChild(activityPrice);
        });
      }
      
      // once boredBtn is clicked then activity is shown
      boredBtn.addEventListener("click", getActivity)
      displayPreviousSearches();
      loadTasks();