```javascript
// Frontend function for searching stays
async function searchStays() {
    const access_token = "YOUR_ACCESS_TOKEN";
    const check_in_date = document.getElementById("checkInDate").value;
    const check_out_date = document.getElementById("checkOutDate").value;
    const adults = document.getElementById("adults").value;
    const rooms = document.getElementById("rooms").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const radius = document.getElementById("radius").value;

    const url = "http://localhost:5000/search_stays";
    const headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": `Bearer ${access_token}`
    };
    const data = {
        "rooms": rooms,
        "location": {
            "radius": radius,
            "geographic_coordinates": {
                "longitude": longitude,
                "latitude": latitude
            }
        },
        "check_out_date": check_out_date,
        "check_in_date": check_in_date,
        "adults": adults
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ data })
    });

    const result = await response.json();
    displaySearchResults(result);
}

// UI Component for Search Form
const searchForm = document.createElement("form");
searchForm.id = "searchForm";
searchForm.innerHTML = `
    <label for="checkInDate">Check-in Date:</label>
    <input type="date" id="checkInDate" value="2023-01-15">
    <label for="checkOutDate">Check-out Date:</label>
    <input type="date" id="checkOutDate" value="2023-01-20">
    <label for="adults">Adults:</label>
    <input type="number" id="adults" value="2">
    <label for="rooms">Rooms:</label>
    <input type="number" id="rooms" value="1">
    <label for="latitude">Latitude:</label>
    <input type="number" id="latitude" value="37.7749">
    <label for="longitude">Longitude:</label>
    <input type="number" id="longitude" value="-122.4194">
    <label for="radius">Radius:</label>
    <input type="number" id="radius" value="10">
    <button type="button" onclick="searchStays()">Search Stays</button>
`;

// UI Component for Displaying Search Results
const searchResults = document.createElement("div");
searchResults.id = "searchResults";

// Append search form and search results to the document body
document.body.appendChild(searchForm);
document.body.appendChild(searchResults);

// Function to display search results
function displaySearchResults(results) {
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = JSON.stringify(results, null, 2);
}
```