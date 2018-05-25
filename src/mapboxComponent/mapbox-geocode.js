const https = require('https');

let mapboxglKey = 'pk.eyJ1IjoiYnZpMTk5NCIsImEiOiJjamg1anZsNzQwejQ1MndvMjB6YXY5NGlxIn0.UDg3M090DtEuTUy_s2NJ_A'

function geocode(query, callback){
  let queryURL = `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/` + query + `.json?access_token=` + mapboxglKey;
  // console.log(queryURL);
  https.get(`https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/` + query +
    `.json?access_token=` + mapboxglKey, (response) => {
      let body = ``;
      response.on('data', (d) => {
        body += d;
      });
      response.on('error', (e) => {
        callback(e);
      });
      response.on('end', () => {
        // callback(null, "success");
        // console.log(body);
        callback(null, JSON.parse(body));
      });
    }
  )
}

let callbackFunction = (err, result) => {
  if(err){
    console.log("Error: ", err);
  }
  // console.log("Result: ", JSON.stringify(result, null, 2));
  if(result && !err){
    return JSON.stringify(result, null, 2);
  }
}

console.log(geocode('San Jose', callbackFunction));
