
var config = {
    apiKey: "AIzaSyCUxw5F2vPXHBwRmknC_q05CDh9Qb-I8a4",
    authDomain: "project-1-e7d63.firebaseapp.com",
    databaseURL: "https://project-1-e7d63.firebaseio.com",
    projectId: "project-1-e7d63",
    storageBucket: "project-1-e7d63.appspot.com",
    messagingSenderId: "787374610005"
  };
  firebase.initializeApp(config);
  
  var concertData = firebase.database();
  var storage = firebase.storage();
  var storageRef = storage.ref();
  
// variables needed - show results, lyrics result,

// FUNCTIONS NEEDED - 
// object array in Firebase listing 10 concert dates & details, database.set()
// display list of concerts for each band according to search button click

// on click function to sign up/log in (see below)
// on click save specific concert dates to My Planner, push to (new?) database
// database on value to update My Planner page
// on click to exit or cancel search & render on load view

// MAIN PROCESSES
// Retrieve user inputs & convert into variables
// Use those variables to run an AJAX call to MusixMatch
// Break down the Musixmatch object into usable fields
// Dynamically generate html content
// Dealing with "edge cases" - bugs or situations that are not intuitive

// Search parameters
var apiKey = "4b6522589665f293fc0f11f7c4411805";
var queryURLBase1 = "https://crossorigin.me/https://api.musixmatch.com/ws/1.1/track.search?s_track_rating=desc&f_has_lyrics&f_lyrics_language=en&page_size=5&apikey=" + apiKey;

// function for on click event searching songs

$(document).on("click", "#songSearchBtn", function(event) {
	event.preventDefault();

	songQuery(queryURLBase1);
	//console.log(newURL);

	return false;
});

//Creating an ajax call to MusixMatch API, display results on page including link to lyrics on MusixMatch

function songQuery(queryURL) {
	var artistSearch = $("#artist-input").val().trim();
	console.log(artistSearch);

	var songSearch = $("#song-input").val().trim();
	console.log(songSearch);


		$.ajax({
		      url: queryURL,
		      method: "GET",
		      data: {
		      	q_artist: artistSearch,
		      	q: songSearch
		      }
		    }).done(function(mmData) {

	    	var results = JSON.parse(mmData).message.body.track_list;
	    	console.log(results);

	    	var table = $("<table class='results-table'>");
	    	
	    	$(".results").append(table);

	    	$(".results-table > thead").append(
	    		"<tr><th>" + "Artist" + "</th><th>" + "Song" + "</th><th>" + "Album" + "</th><th>" + "Link to Lyrics" + "</th><th><i class='fa fa-window-close exitBtn' aria-hidden='true'></i></th></tr>");

	    	// loop through array to display 5 results in a table with checkboxes	
    	for (var i = 0; i < results.length; i++) {
    		var artistRes = results[i].track.artist_name;
    		console.log(artistRes);

    		var songRes = results[i].track.track_name;
    		console.log(songRes);

    		var albumRes = results[i].track.album_name;
    		console.log(albumRes);

    		var lyricsLink = results[i].track.track_share_url;

    		// append to our table of trains, inside the tbody, with a new row of the train data
  			$(".results-table > tbody").append(
  				"<tr><td>" + artistRes + "</td><td>" + songRes + "</td><td>" + albumRes + "</td><td><a href=" + lyricsLink + " target='_blank'>Sing it!</a></td></tr>");

  	
    	};	// end of for loop
    });	 // ajax call
};  // end of songQuery function

function addConcertData() {

  var concerts = [{
      artist: "coldplay",
      date: "Aug 25, 2017", 
      venue: "NRG Stadium",   
      city: "Houston, TX", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/event/3A005146D02447BF?_ga=2.257307144.2076414535.1498080261-2032985159.1498080261#efeat4212" 
  }, {
      artist: "coldplay",
      date: "Aug 28, 2017", 
      venue: "Hard Rock Stadium",   
      city: "Miami, FL", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/event/0D00514764A66CC5?_ga=2.265215500.2076414535.1498080261-2032985159.1498080261#efeat4212" 
  }, {
      artist: "coldplay",
      date: "Sep 23, 2017", 
      venue: "CenturyLink Field",   
      city: "Seattle, WA", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/event/0F005145DEFF54F9?_ga=2.51304874.2076414535.1498080261-2032985159.1498080261#efeat4212" 
  }, {
      artist: "coldplay",
      date: "Oct 4, 2017", 
      venue: "Levi's Stadium",   
      city: "Santa Clara, CA", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/event/1C005146A7F94470?_ga=2.101113346.2076414535.1498080261-2032985159.1498080261#efeat4212" 
  }, {
      artist: "coldplay",
      date: "Oct 06, 2017", 
      venue: "Rose Bowl",   
      city: "Pasadena, CA", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/event/0B00526DB74C48E0?_ga=2.92615070.2076414535.1498080261-2032985159.1498080261#efeat4212" 
  }, {
      artist: "kendrick lamar",
      date: "Aug 08-09, 2017", 
      venue: "Staples Center",   
      city: "Los Angeles, CA", 
      onSale: "Now",
      buyTickets: "https://www.axs.com/events/335414/kendrick-lamar-tickets?skin=staples" 
  }, {
      artist: "kendrick lamar",
      date: "Aug 11, 2017", 
      venue: "Honda Center",   
      city: "Anaheim, CA", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/kendrick-lamar-the-damn-tour-with-anaheim-california-08-11-2017/event/090052ACE6F24018?artistid=1480454&majorcatid=10001&minorcatid=3&tm_link=search_msg-0_090052ACE6F24018#efeat4212" 
  }, {
      artist: "kendrick lamar",
      date: "Aug 13, 2017", 
      venue: "Golden 1 Center",   
      city: "Sacramento, CA", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/kendrick-lamar-the-damn-tour-with-sacramento-california-08-13-2017/event/1C0052A5BD3C41E6?artistid=1480454&majorcatid=10001&minorcatid=3&tm_link=search_msg-0_1C0052A5BD3C41E6#efeat4212" 
  }, {
      artist: "kendrick lamar",
      date: "Aug 16, 2017", 
      venue: "Sprint Center",   
      city: "Kansas City, MO", 
      onSale: "Now",
      buyTickets: "https://www.axs.com/events/336041/kendrick-lamar-tickets?skin=sprintcenter" 
  }, {
      artist: "kendrick lamar",
      date: "Aug 18, 2017", 
      venue: "Pinnacle Bank Arena",   
      city: "Lincoln, NE", 
      onSale: "Now",
      buyTickets: "https://www1.ticketmaster.com/kendrick-lamar-the-damn-tour-with-lincoln-nebraska-08-18-2017/event/060052A3E17437A2?artistid=1480454&majorcatid=10001&minorcatid=3&tm_link=search_msg-0_060052A3E17437A2#efeat4212" 
  }]; 
  for (var i = 0; i < concerts.length; i++) {
    
    //console.log(newConcert[i].artist); 
    //console.log(newConcert[i].date); 
    //console.log(newConcert[i].venue); 
    //console.log(newConcert[i].city); 
    //console.log(newConcert[i].onSale); 
    //console.log(newConcert[i].buyTickets); 

    concertData.ref("concerts").set(concerts);

    };
};  

$(document).on("click", "#showSearchBtn", function(event) {
  event.preventDefault();

  var table = $("<table class='results-table'>");
        
        $(".results").append(table);

        $(".results-table > thead").append(
          "<tr><th>" + "Artist" + "</th><th>" + "Date" + "</th><th>" + "Venue" + "</th><th>" + "City" + "</th><th>" + "On Sale" +
          "</th><th>" + "Buy Tickets" + "</th><th><i class='fa fa-window-close exitBtn' aria-hidden='true'></i></th></tr>");

   var findTour = $("#tour-input").val().trim();
    //console.log(findTour);

   concertData.ref("concerts").orderByChild("artist").equalTo(findTour).on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val().artist);

     var artistName = childSnapshot.val().artist;
     var venueName = childSnapshot.val().venue;
     var venueCity = childSnapshot.val().city;
     var showDate = childSnapshot.val().date;
     var onSaleDate = childSnapshot.val().onSale;
     var ticketURL = childSnapshot.val().buyTickets;

        console.log(artistName);
        console.log(venueName);
        console.log(venueCity);
        console.log(showDate);
        console.log(onSaleDate);
        console.log(ticketURL);

  // append to our results table, inside the tbody
        $(".results-table > tbody").append(
          "<tr><td class = 'artistCap'>" + artistName + "</td><td>" + venueName + "</td><td>" + venueCity + "</td><td>" + showDate + "</td><td>" + onSaleDate +
          "</td><td><a href=" + ticketURL + " target='_blank'>Purchase</a></td><td><button class='addConcertB'>Save</button></td></tr>");

    }); // end childsnapshot function

});


// on click save specific concert dates to My Planner, push to separate node in Firebase

$(document).on("click", ".addConcertB", function(event) {
	event.preventDefault();
// collect the data from the table data, create variables to hold the data

	var currentRow = $(this).closest("tr"); 
         
        var artistName = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
        var venueName = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
        var venueCity = currentRow.find("td:eq(2)").text(); // get current row 3rd TD
        var showDate = currentRow.find("td:eq(3)").text(); // get current row 4th TD
        var onSaleDate = currentRow.find("td:eq(4)").text(); // get current row 5th TD
        var ticketURL = currentRow.find("td:eq(5)").html(); // get current row 6th TD
          console.log(ticketURL);
          
	var newConcert = {
		artist: artistName,
		venue: venueName,
		city: venueCity,
		date: showDate,
		onSale: onSaleDate,
		buy: ticketURL
	};
    console.log("saved concert: " + newConcert);
	// "push" that data into firebase (assume that the child_added listener updates HTML)
	concertData.ref("planner").push(newConcert);
});

// database on value to update My Planner page

concertData.ref("planner").orderByChild("date").on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // create local variables to store the data from firebase

  var artistName = childSnapshot.val().artist;
  var venueName = childSnapshot.val().venue;
  var venueCity = childSnapshot.val().city;
  var showDate = childSnapshot.val().date;
  var onSaleDate = childSnapshot.val().onSale;
  var ticketURL = childSnapshot.val().buy;

  console.log(artistName);
  console.log(venueName);
  console.log(venueCity);
  console.log(showDate);
  console.log(onSaleDate);
  console.log(ticketURL);

  // append to our planner table, inside the tbody, with a new row of the concert data
  			$(".planner > tbody").append(
  				"<tr><td class = 'artistCap'>" + artistName + "</td><td>" + venueName + "</td><td>" + venueCity + "</td><td>" + showDate + "</td><td>" + onSaleDate +
  				"</td><td>" + ticketURL + "</td><td><button class='btnDelete'>Remove</button></td></tr>");

}); // end childsnapshot function

$(document).on("click", ".exitBtn", function(event) {
  event.preventDefault();

  $(".results").empty();
    
  $("#artist-input").val("");
  $("#song-input").val("");
  $("#tour-input").val("");
});  

$(document).on("click", ".btnDelete", function(event) {
  var plannerRef = $(this).firebase.database().ref('planner');
    console.log(plannerRef);

  /*var query = plannerRef.orderByChild('date').equalTo(eventContactId);
  query.on('child_added', function(snapshot) {
    snapshot.ref.remove();
})
  var removedRef = storageRef.child(removedConcert);
    removedRef.delete().then(function() {
    }).catch(function(error) {
  // Uh-oh, an error occurred!
    });*/
});

$(document).ready(function() {

  addConcertData();
});



