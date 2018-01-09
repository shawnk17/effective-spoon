$(document).ready(function(){
    var inputMovie = document.getElementById("input-movie-text"),
        getMovieButton = document.getElementById("fetch-movie-button"),
      
        movieList = document.getElementById("movie-list"),
        clearButton = document.getElementById("clear-button"),
        searchUri = "https://itunes.apple.com/search?term={{title}}&entity=movie&limit=5&callback=?",

        movieInfo = document.getElementById("movie-info"),
        newSearchUri;
        
    var renderList = function(eventData){
        movieList.innerHTML = "";
        if(!eventData){
            console.log("Error: No data passed to renderList method.");
            alert("Didn't find any movies.");
            return false;
        }

        eventData.forEach(function(event){
            var newItem = document.createElement("li"),
                newAnchor = document.createElement("a"),
                newImage = document.createElement("img");
                               
                newImage.src = event.artworkUrl100;
                newItem.classList.add("list-group-item");
                newImage.classList.add("img-thumbnail");
                
                newAnchor.innerText = event.trackName;
                newAnchor.href = "#";

                newAnchor.addEventListener("click", function(){ 
                                  
                    var iTunesAnchor = document.createElement("a"),
                        newDiv = document.createElement("div");
                        newDiv.innerHTML = event.longDescription;
                    iTunesAnchor.innerText = "view on iTunes";
                    iTunesAnchor.classList.add("btn");
                    iTunesAnchor.classList.add("btn-primary");

                    
                    iTunesAnchor.href = event.trackViewUrl;
                    movieInfo.appendChild(newDiv);
                    movieInfo.appendChild(iTunesAnchor);
                });
                                            
                newItem.appendChild(newImage);
                newItem.appendChild(newAnchor);
                movieList.appendChild(newItem);
            });
        };    

    getMovieButton.addEventListener("click", function(){
        newSearchUri = searchUri.replace("{{title}}", inputMovie.value);
        $.getJSON(newSearchUri, function(returnData){
            renderList(returnData.results);
        });
    });

    clearButton.addEventListener("click", function(){
        movieList.innerHTML = "";
        inputMovie.value = "";
        movieInfo.innerHTML = "";
    });

});