//globals
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

//getting the user's repos 
var getUserRepos = function (user) {
    //format the github api url
    var apiUrl= "https://api.github.com/users/" + user + "/repos";
    //make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            displayRepos(data, user)
        });
    });
};

//
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
}

//getiing the value of the input and wating for the event submit button
var formSubmitHandler = function(event) {
    event.preventDefault();//get value from element
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHun username");
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);

//josh demo
// var doIt = function( doFunc ){
//     var a = 'bbbb';
//     console.log('doing it!');
//     var doSecond = doFunc();
//     setTimeout(doSecond, 1000);
//     console.log('dit it!!???');
// }

// var doThis = function(){
//     var a= 'aaaa';
//     var evenDeeper = function(){
//         console.log('even deeper ' + a);
//     }
//     console.log('no, really doing it now.');
//     return evenDeeper;
// };

// doIt( doThis );