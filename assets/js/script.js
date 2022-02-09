// array for local storage
var storedYear = [];

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
            console.log(arrayOfImages[i]);
            generalDiv.lastElementChild.setAttribute("src", arrayOfImages[i]);
            console.log(generalDiv.lastElementChild);
    }
}

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

buttonClick.addEventListener("click", buttonEventHandler);

loadTasks();

// Kiri's key: k_qe9kt9tg
// Chris's key: k_nxso5xxe