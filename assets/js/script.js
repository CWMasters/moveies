// array for local storage
var storedYear = [];

// creating variables to select elements on index.html
var buttonClick = document.querySelector("#search-btn");
var textBox = document.querySelector("#textarea");

// variable for the current year for long term usability
var currentYear = new Date().getFullYear();

// function: gather user input from search button
var buttonEventHandler = function(event) {
    var input = textBox.value;

    // check to ensure input is a year value
    if (isNaN(input)) {
        // display text to ask user for a year input
        document.querySelector("#warning-paragraph").textContent = "Please enter a year in the input box";
        return;
    } else if (1950 <= input && input <= currentYear) {
        // call the next function
        document.querySelector("#warning-paragraph").textContent = "";
        retrieveMovies(input);
    } else {
        // display text to tell user year is out of range for website use
        document.querySelector("#warning-paragraph").textContent = "Please enter a year between 1950 and " + currentYear;
    }
};

// function: input year output movies

// function: input year output music

// function: save local data (saving the year that was gathered from user input)

// function: persist local data (reload page each refresh to display the saved data on screen)


buttonClick.addEventListener("click", buttonEventHandler);