// array for local storage
var storedYear = [];

// creating variables to select elements on index.html
var buttonClick = document.querySelector("#search-btn");
var textBox = document.querySelector("#textarea");

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

// function: input year output music

// function: add input year to the array


var updateArray = function(year) {
    // var updatedStoredYear = [];
    // if (!storedYear && updatedStoredYear) {
        //     storedYear = updatedStoredYear;
        // }
        // updatedStoredYear = storedYear;
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

buttonClick.addEventListener("click", buttonEventHandler);

loadTasks();