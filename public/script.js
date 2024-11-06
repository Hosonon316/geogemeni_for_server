// script.js
let map;
let geocoder;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.6762, lng: 139.6503 },  // Tokyo as a default center
        zoom: 10
    });
    
    geocoder = new google.maps.Geocoder();
    
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('change', function() {
        geocodeAddress(searchBox.value);
    });
}

function geocodeAddress(address) {
    fetch(`/api/geocode?location=${address}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                const location = data;
                map.setCenter(location);
                if (marker) marker.setMap(null);
                marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            }
        })
        .catch(error => console.error('Error:', error));
}
