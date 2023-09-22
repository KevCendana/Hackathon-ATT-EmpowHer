//--------------------------------------------------------------------------------------//
//                     Section5: Find Stores Near Me w/ Google Maps                     //
//--------------------------------------------------------------------------------------//

var map;
var infowindow;

// function to initialize the Google Map
function initMap() {
    // default location is Sac State's coordinates
    var sacState = {lat: 38.5582, lng: -121.4246};

    // create a new Google Map centered on Sac State with a zoom level of 10
    map = new google.maps.Map(document.getElementById('map'), {
        center: sacState,
        zoom: 10
    });

    // initialize the information window for displaying place details
    infowindow = new google.maps.InfoWindow();

    // perform an initial search for AT&T stores around Sac State when the page loads
    findATTStores(sacState, map);
}

// function to find AT&T stores near a given location
function findATTStores(location, map) {
    // create a new PlacesService object to interact with the Google Places API
    const service = new google.maps.places.PlacesService(map);

    // search for AT&T stores near the specified location within a 50km radius
    service.nearbySearch({
        location: location,
        radius: 50000,
        keyword: 'AT&T store'
    }, (results, status) => {
        // if the search is successful and results are found, create markers for each store
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i], map);
            }
        }
    });
}

// function to create a marker on the map for a given place
function createMarker(place, map) {
    new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
}

// function to get the user's current location
function getUserLocation() {
    return new Promise((resolve, reject) => {
        // check if geolocation is supported by the browser
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
        } else {
            // get the user's current position
            navigator.geolocation.getCurrentPosition(
                (position) => resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }),
                (error) => reject(error)
            );
        }
    });
}

// display the custom confirmation popup when the "Find Stores Near Me" button is clicked
document.getElementById('locateMe').addEventListener('click', function() {
    document.getElementById('customConfirm').style.display = 'block';
});

// if the user confirms, fetch their location and display nearby AT&T stores on the map
document.getElementById('confirmBtn').addEventListener('click', async function() {
    document.getElementById('customConfirm').style.display = 'none';

    // start the fade-out effect on the map placeholder
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    mapPlaceholder.classList.add('fadeOut');

    // after the fade-out transition completes, switch display properties
    setTimeout(() => {
        mapPlaceholder.style.display = 'none';

        // display the Google Map and start the pretty fade-in effect
        const mapElement = document.getElementById('map');
        mapElement.style.display = 'block';
        setTimeout(() => {
            mapElement.style.opacity = '1';
        }, 50);

    }, 500);

    // try to get the user's location and update the map accordingly
    try {
        const userLocation = await getUserLocation();
        map.setCenter(userLocation);
        map.setZoom(12);
        findATTStores(userLocation, map);
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

// if the user cancels, close the custom confirmation popup
document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('customConfirm').style.display = 'none';
});
