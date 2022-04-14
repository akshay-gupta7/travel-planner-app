const geo_base_url = 'http://api.geonames.org/searchJSON?q';
const weather_base_url = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const pix_base_url = 'https://pixabay.com/api/?key='

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
    const dateoftrip = new Date(date);
    console.log("City and date is", city, dateoftrip);
    if(checkisempty(city)==1){
        alert("Please enter a city before clicking on button");
        return false;//function will stop here if City is empty
    }
    const apiurl = '/key';
    //Fetching api keys from a get call defined in server.js
    const key = async(url='',data={})=>{
        //const res = await fetch(apiurl)
        console.log("Reached here", url);
        const res = await fetch(url);
        try{
            const data = await res.json();
            console.log(data);
            /*
            
            */
            return data;
        }
        catch(error){
            console.log("error",error)
        }
    }
    const keys=key(apiurl,{});
    const resfromgeoapi=keys.then((value)=>
    {
        keyobject=value;
        console.log("key is: ", keyobject);
        const final_geo_url = geo_base_url + '=' + city + "&maxRows=1&username=" + value.geo_key;
        console.log("Final Geo URL is :", final_geo_url);
        const resfromgeo = async(url='', data={})=>{
            //console.log("reaching here",data);
            const res = await fetch(url)
            try{
                const data = await res.json();
                const coord={'lat':data.geonames[0].lat,'long' :data.geonames[0].lng};
                console.log("Data is:", coord );
                return coord;
            }
            catch(error){
                console.log("Error", error);
            }
        };
        const response = resfromgeo(final_geo_url,{});
        return response;
    });
    const resfromweather = resfromgeoapi.then((value)=>{
        //https://api.weatherbit.io/v2.0/forecast/daily?lat=38.123&lon=-78.543&key=135cc7a96fd6416cbe531c18beccfaca
        const final_weather_url = weather_base_url + value.lat + "&lon=" + value.long + "&key=" + keyobject.weather_key;
        console.log("Weatherfinal URL is ", final_weather_url );
        const resfromweather = async(url='', data={})=>{
            //console.log("reaching here",data);
            const res = await fetch(url)
            try{
                const data = await res.json();
                console.log("Data is:", data );
                const country = data.country_code;
                const line_one = "The forecast for next 3 days(Date, Min Max Temp and conditions) for " + city + ", " + country + " is:";
                const forecast = document.getElementsByClassName('forecast');
                const creatediv = document.createElement("div");
                const textnode = document.createTextNode(line_one);
                creatediv.appendChild(textnode);
                forecast[0].appendChild(creatediv);
                console.log(forecast);
                for(let i=1; i<=3; i++){
                    //const node = document.createElement("li");
                    const today_date = data.data[i].datetime;
                    const min_temp = data.data[i].min_temp;
                    const max_temp = data.data[i].max_temp;
                    const weather = data.data[i].weather.description;
                    const texttodisplay = "" + today_date + " " + min_temp + " " + max_temp + " " + weather;
                    const createdivweather = document.createElement("div");
                    const textnodetodisplay = document.createTextNode(texttodisplay);
                    createdivweather.appendChild(textnodetodisplay);
                    forecast[0].appendChild(createdivweather);
                    //console.log("Min temp is ", weather);
                }
                return data;
            }
            catch(error){
                console.log("Error", error);
            }
        };
        const response = resfromweather(final_weather_url,{});
        return response;
    });
    const resfrompixar = resfromweather.then((value)=>{
        const final_pixar_url = pix_base_url + keyobject.pixa_key + "&q=" + city + "&image_type=photo&pretty=true";
        console.log("I am here ", final_pixar_url );
        const resfrompixars = async(url='', data={})=>{
            //console.log("reaching here",data);
            const res = await fetch(url)
            try{
                const data = await res.json();
                console.log("Data is:", data.hits[0].webformatURL);
                const image = document.getElementsByClassName('image');
                const img = document.createElement("img");
                img.src = data.hits[0].webformatURL;
                img.width="100";
                img.height="100";
                image[0].appendChild(img);
            }
            catch(error){
                console.log("error", error);
            }
        }
        const response = resfrompixars(final_pixar_url,{});
        return response;
    });
}

export {runProcess}