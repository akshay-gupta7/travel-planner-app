const geo_base_url = 'http://api.geonames.org/searchJSON?q';
const weather_base_url = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const pix_base_url = 'https://pixabay.com/api/?'

let keyobject={};

function checkisempty(city) {
    if(city){
        //alert("Its not empty");
        return 0;
    }
    return 1;
}

function runProcess(event){
    event.preventDefault();
    const city = document.getElementById('city').value;
    const date = document.getElementById('dates').value;
    console.log("City and date is", city, date);
    if(checkisempty(city)==1){
        alert("Please enter a city before clicking on button");
        return false;
    }
}

export {runProcess}