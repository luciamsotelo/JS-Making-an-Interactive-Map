// when page loads request user location
window.onload = async () => {
    const coordinates = await getUserCoordinates();
    // ibMap.coordinates = coordinates;
    ibMap.createMap(coordinates);
};
//  building map function
const ibMap = {
    createMap: function (coordinates) {
        //    created map
        const ibMap = L.map("map", {
            center: coordinates,
            zoom: 14,
        });
        // add tile layer
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(ibMap);

        // make marker
        const markers = L.marker(coordinates);
        markers.addTo(ibMap).bindPopup("Welcome to IB").openPopup();
    },
};

// get user coordinates
async function getUserCoordinates() {
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [position.coords.latitude, position.coords.longitude];
}

// installed foursuare
let options = {method: 'GET', headers: {accept: 'application/json',Authorization: "fsq3b2t5F7tzjFsDRV8PmYMp/hrDuCRx5x/J0sW9jhlcmBE=", } };

// used fetch() to get data
async function fetchPlaces(){
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=5&ll=`, options); 
    let places = response.json();
    return places;
}

// formatted that data into a location array
function parseLocations(results){
    let locations = [];
    results.forEach(result => {
        let location = [results.geocodes.main, result.name]
        locations.push(location)
    });
    return locations;
}

// document.getElementById('submit').addEventListener('click', function (e) {
//     e.preventDefault();
//     submitButton();
// });

// function submitButton() {
//     let business = document.getElementById('business').value;
//     let fourSquareData = fetchPlaces(business);
//     parseLocations(fourSquareData);
//     fourSquareData = business;
//     ibMap.addMarkers();
// }




