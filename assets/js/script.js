// array for local storage
var storedYear = [];
var firstSelection = 0;

// creating variables to select elements on index.html
var buttonClick = document.querySelector("#search-btn");
var textBox = document.querySelector(".textarea");

// variable for the current year for long term usability
var currentYear = new Date().getFullYear();


// function: gather user input from search button
var buttonEventHandler = function(event) {
    event.preventDefault();
    var input = textBox.value;
    
    // check to ensure input is a year value
    if (isNaN(input)) {
        // display text to ask user for a year input
        document.querySelector("#warning-paragraph").textContent = "Please enter a year in the input box";
        return;
    } else if (1950 <= input && input <= currentYear) {
        // call the next function
        document.querySelector("#warning-paragraph").textContent = "";
        // retrieveMovies(input);
    } else {
        // display text to tell user year is out of range for website use
        document.querySelector("#warning-paragraph").textContent = "Please enter a year between 1950 and " + currentYear;
        return;
    }
    firstSelection = 1;
    // call function to add inputed year to the array
    updateArray(input);
    
    // call function to fetch the api
    fetchApi(input);
    
    // clearing text box for user
    textBox.value = "";
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
                    var k = i+1;
                    // collect title to display
                    var dataTitle = data.results[i].title;
                    // collect image to display
                    var dataImage = data.results[i].image;
                    // add to object and place object in array
                    titleArray.push(dataTitle);
                    imageArray.push(dataImage);
                    displayData(dataTitle, dataImage, year, k);
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
}

// function to display movie data
var displayData = function(title, image, year, index) {
    
    // updates year displayed to be user input year
    document.querySelector(".year-header").textContent = year;
    // console.log(title);
    // console.log(image);
    
    var movieClass = document.querySelector(".movie-"+index);

        movieClass.innerHTML = "<p class='m-title' id='glow'>"+index+": "+title+"</p> </br> <img src="+image+" width='160px'>"
}

// function: add input year to the array
var updateArray = function(year) {
    storedYear.push(year);
    // need to display on page for user to see (possibly interact with)
    saveContent();
};

// function: save local data (saving the year that was gathered from user input)
var saveContent = function() {
    localStorage.setItem("year", JSON.stringify(storedYear));
};

// function: persist local data (reload page each refresh to display the saved data on screen)
var loadTasks = function() {
    var storedTasks = localStorage.getItem("year");
    if (storedTasks) {
        storedYear = JSON.parse(storedTasks);
    }
    // updateArray();
};

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
      buttonClick.addEventListener("click", buttonEventHandler);

fetchApi(currentYear);
loadTasks();

// Kiri's key: k_qe9kt9tg
// Chris's key: k_nxso5xxe