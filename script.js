// Create Header Layout
var container = document.createElement("div");
container.className = "container";
container.innerHTML = `
    <h1 id="main-heading" class="text-center">Open Brewery</h1><br/><br/><br/>
    <div class="col-6 offset-3">
        <input class="col-6 form-control" type="search" onkeyup="searchFilter(this.value)" placeholder="Search" aria-label="Search">
    </div>
    <div class="row" id="content">
    </div>
    <div class="row">
        <div class="col-12">
        <h1 id="noDataTxt" class="not-found-text">Data not Found.... Try other Search</h1><br>
        <img id="noData" src="data-not-found.jpg">
        <div>
    </div>
`;

// Breweries API's
const url = "https://api.openbrewerydb.org/breweries";
const searchUrl = "https://api.openbrewerydb.org/breweries/search?query=";
let breweriesData;

// Retrieve Breweries Data
async function getBreweriesData() {
    try{
        var result = await fetch(url);
        breweriesData = await result.json();
        content.innerHTML = "";
        breweriesData.forEach((dataValue) => {
            displayData(dataValue);
        });

    } catch(error) {
        console.log(error);
    }
}

// Callback
getBreweriesData();

// Function for displaying data
const displayData = (obj) => {
    let content = document.getElementById("content");
    var breweryType = obj.brewery_type.charAt(0).toUpperCase() + obj.brewery_type.slice(1);

    // Bootstrap Card Layout
    content.innerHTML += `
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 g-4">
        <div class="card h-100">
            <div class="card-header">${obj.name}</div>
            <div class="card-body">
                <p class="card-text">Brewery Type: ${breweryType}</p>
                <p class="card-text">Address: ${obj.street == null ? "" : obj.street} ${obj.city}, ${obj.state}, ${obj.country}, ${obj.postal_code}</p>
                <p class="card-text">Website: ${obj.website_url == null? "N/A" : obj.website_url}</p>
                <p class="card-text">Phone Number: ${obj.phone == null ? "N/A" : obj.phone}</p>
            </div>
        </div>
    </div>
    `;
}

// Search Filter on Keypress & Display Data
async function searchFilter(value) {
    try{
        if(value !== "") {
            content.innerHTML = ``;
            var searchResult = breweriesData.filter((searchStr) => {
                return searchStr.name.toLowerCase().includes(value.toLowerCase());
            })
            if(searchResult.length <= 0) {
                document.getElementById("noData").style.display ="block";
                document.getElementById("noDataTxt").style.display ="block";
            }
            else {
                document.getElementById("noData").style.display ="none";
                document.getElementById("noDataTxt").style.display ="none";
                content.innerHTML = "";
                searchResult.forEach((dataValues) => {
                    displayData(dataValues);
                });
            }
        }
        else getBreweriesData(); // Callback for without search filter data
    } catch(error) {
        console.log(error);
    }
}

// Append Created Elements to HTML
document.body.appendChild(container);