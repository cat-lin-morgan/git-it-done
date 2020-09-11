//globals
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//getting the user's repos 
var getUserRepos = function (user) {
    //format the github api url
    var apiUrl= "https://api.github.com/users/" + user + "/repos";
    //make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error User " + response.statusText);
            }   
        })
        .catch(function(error){
            //this is technically chained to the end of the fetch function
            alert("Unable to connect to GitHub.")
    });
};

//displays each repo with a loop creating a div
var displayRepos = function(repos, searchTerm) {
    //checking if api returns any repos
    if (repos.length === 0) {
        reposContainerEl.textContent = "No repositories found.";
        return;
    }
    //generates user name
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loops over Repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center"
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        //create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        //append on to another
        repoEl.appendChild(titleEl);
        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0 ) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append loop to container
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
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