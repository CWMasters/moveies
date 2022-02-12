var movieApi = 'https://api.themoviedb.org/3/movie/popular?&api_key=595a81aaf7fd3fbfb9c04c8e9014c265'
var upcomingMovieApi = 'https://api.themoviedb.org/3/movie/upcoming?&api_key=595a81aaf7fd3fbfb9c04c8e9014c265'
var input = "";
function currentMovies() {
    fetch(movieApi)
    .then(repsonse => repsonse.json())
    .then(data => {
        console.log(data)
        var currentHtml = ""
        for (i=0; i < 5; i++){
            currentHtml += 
            `<div class="card-body w-100">
            <p>${data.results[i].release_date}</p>
            <h4 class="m-title" id="glow">${data.results[i].title}</h4>
            <img src="http://image.tmdb.org/t/p/w185/${data.results[i].poster_path}">
            <h6>${data.results[i].overview}</h6>
            </div>`
        }
        document.getElementById("current-movies").innerHTML = currentHtml
    })  
}

function getUpcomingMovies() {
    fetch(upcomingMovieApi)
    .then(repsonse => repsonse.json())
    .then(data => {
        console.log(data)

        var upcomingHtml = ""
        for (i=0; i < 5; i++){
            upcomingHtml += 
            `<div class="card-body w-100">
            <p>${data.results[i].release_date}</p>
            <h4 class="m-title" id="glow">${data.results[i].title}</h4>
            <img src="http://image.tmdb.org/t/p/w185/${data.results[i].poster_path}">
            <h6>${data.results[i].overview}</h6>
            </div>`
        }
      document.getElementById("upcoming-movies").innerHTML = upcomingHtml
})
}


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

currentMovies();
getUpcomingMovies();