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

// Metro station markers
const rS = L.marker([48.866200610611926, 2.352236247419453], {icon: redIcon}).bindPopup('RÃ©aumur-SÃ©bastopol')
const sSD = L.marker([48.869531786321566, 2.3528590208055196]).bindPopup('Strasbourg-Saint-Denis')
const sentier = L.marker([48.8673721067762, 2.347107922912739]).bindPopup('Sentier')
const bourse = L.marker([48.86868503971672, 2.3412285142058167]).bindPopup('Bourse')
const qS = L.marker([48.869560129483226, 2.3358638645569543]).bindPopup('Quatre Septembre')
const gB = L.marker([48.871282159004856, 2.3434818588892714]).bindPopup('Grands Boulevards')

const stations = L.layerGroup([rS, sSD, sentier, bourse, qS, gB]).addTo(myMap)


