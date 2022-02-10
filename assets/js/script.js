// array for local storage
var storedYear = [];

// creating variables to select elements on index.html
var buttonClick = document.querySelector("#searchBtn");
var textBox = document.querySelector("#textarea");

// creating variable to random activity button
var activityButton = document.getElementById("#activity-generator")

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
    // call function to add inputed year to the array
    updateArray(input);
    firstUserInput = 1;
    
    // clearing text box for user
    textBox.value = "";
};

// function: input year output movies
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  fetch('https://imdb-api.com/en/API/MostPopularMovies/k_qe9kt9tg', requestOptions)
    .then(response => response.text())
    // .then(result => console.log(result))
    .catch(error => console.log('error', error));

// function: input year output music

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


var getActivity = function() {
  var boredApiUrl = 'https://www.boredapi.com/api/activity'
  fetch(boredApiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    currentActivityContainer.textContent = "";
    
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

boredBtn.addEventListener("click", getActivity)
// buttonClick.addEventListener("click", buttonEventHandler);

loadTasks();


