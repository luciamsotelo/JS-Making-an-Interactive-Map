// when page loads request user location
window.onload = async () => {
    const coordinates = await getUserCoordinates();
    ibMap.coordinates = coordinates;
    ibMap.createMap(coordinates);
};

// get user coordinates
async function getUserCoordinates() {
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [position.coords.latitude, position.coords.longitude];
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
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(Map);

        // make marker
        const markers = L.marker(coordinates);
        markers.addTo(Map).bindPopup("<p1>Welcome to IB</p1>").openPopup();
        ibMap.map = map;
    },

//long way to create markers -- changed to a loop
        // const marker2 = L.marker([ibMap.markers[1][0].latitude, ibMap.markers[1][0].longitude]).bindPopup(`${ibMap.markers[1][1]}`);
        // const marker3 = L.marker([ibMap.markers[2][0].latitude, ibMap.markers[2][0].longitude]).bindPopup(`${ibMap.markers[2][1]}`);
        // const marker4 = L.marker([ibMap.markers[3][0].latitude, ibMap.markers[3][0].longitude]).bindPopup(`${ibMap.markers[3][1]}`);
        // const marker5 = L.marker([ibMap.markers[4][0].latitude, ibMap.markers[4][0].longitude]).bindPopup(`${ibMap.markers[4][1]}`);

        // const markerGroup = L.layerGroup([marker1, marker2, marker3, marker4, marker5]);
        // markerGroup.addTo(ibMap.map);

// using for loop to refactor old code when creating markers. 5 markers
    
addMarkers: function () {
    for (let i = 0; i < 5; i++) {
        L.marker([ibMap.markers[i][0].latitude, ibMap.markers[i][0].longitude]).bindPopup(`${ibMap.markers[i][1]}`).addTo(ibMap.map);
        }
    },
};

// installed foursuare
let options = {method: 'GET', headers: {Accept: 'application/json',Authorization: "fsq3b2t5F7tzjFsDRV8PmYMp/hrDuCRx5x/J0sW9jhlcmBE=", } };

// used fetch() to get data
async function fetchPlaces(){
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=5&ll=${ibMap.coordinates}`, options); 
    let places = await response.json();
    return places.results;
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

// need to add event listener for the submit button
document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    submitButton();
});

async function submitButton() {
    let selection = document.getElementById('business').value;
    let fourSquareData = await fetchPlaces(selection);
    let parsedData = parseLocations(fourSquareData);
    myMap.markers = parsedData;
    myMap.addMarkers();
}




