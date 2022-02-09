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

var boredApiUrl = 'https://www.boredapi.com/api/activity'
var boredBtn = document.querySelector("#next-activity")

fetch(boredApiUrl)
.then(response => response.json())
.then(data => {
  console.log(data)
  document.getElementById("activity-type").innerHTML = "Type: " + data.type;
  document.getElementById("random-activity").innerHTML = "Activity: " + data.activity;
  document.getElementById("participants").innerHTML = "Participants: " + data.participants;
  document.getElementById("price").innerHTML = "Price: " + "$" + data.price;
});

buttonClick.addEventListener("click", buttonEventHandler);

loadTasks();


