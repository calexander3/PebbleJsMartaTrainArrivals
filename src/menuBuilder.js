var UI = require('ui');

var distanceThreashold = 1.8;
var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 3000
};

var stations = [
  {name: "Airport", apiKey: "airport", lat: "33.640758", lon: "-84.446341" },
  {name: "Arts Center", apiKey: "arts%20center", lat: "33.789705", lon: "-84.387789" },
  {name: "Ashby", apiKey: "ashby", lat: "33.756346", lon: "-84.417556" },
  {name: "Avondale", apiKey: "avondale", lat: "33.775277", lon: "-84.281903" },
  {name: "Bankhead", apiKey: "bankhead", lat: "33.77189", lon: "-84.42884" },
  {name: "Brookhaven", apiKey: "brookhaven", lat: "33.860705", lon: "-84.340003" },
  {name: "Buckhead", apiKey: "buckhead", lat: "33.84841", lon: "-84.367018" },
  {name: "Chamblee", apiKey: "chamblee", lat: "33.886191", lon: "-84.306957" },
  {name: "Civic Center", apiKey: "civic%20center", lat: "33.766305", lon: "-84.387209" },
  {name: "College Park", apiKey: "college%20park", lat: "33.651673", lon: "-84.448793" },
  {name: "Decatur", apiKey: "decatur", lat: "33.774717", lon: "-84.295588" },
  {name: "Dome", apiKey: "dome", lat: "33.756293", lon: "-84.397759" },
  {name: "Doraville", apiKey: "doraville", lat: "33.902079", lon: "-84.280389" },
  {name: "Dunwoody", apiKey: "dunwoody", lat: "33.9212", lon: "-84.3444" },
  {name: "East Lake", apiKey: "east%20lake", lat: "33.765166", lon: "-84.312665" },
  {name: "East Point", apiKey: "east%20point", lat: "33.677814", lon: "-84.440344" },
  {name: "Edgewood", apiKey: "edgewood", lat: "33.762001", lon: "-84.339579" },
  {name: "Five Points", apiKey: "five%20points", lat: "33.753826", lon: "-84.391571" },
  {name: "Garnett", apiKey: "garnett", lat: "33.747845", lon: "-84.396415" },
  {name: "Georgia State", apiKey: "georgia%20state", lat: "33.750539", lon: "-84.386464" },
  {name: "H. E. Holmes", apiKey: "hamilton", lat: "33.754638", lon: "-84.46794" },
  {name: "Indian Creek", apiKey: "indian%20creek", lat: "33.769794", lon: "-84.229656" },
  {name: "Inman Park", apiKey: "inman%20park", lat: "33.757497", lon: "-84.352797" },
  {name: "Kensington", apiKey: "kensington", lat: "33.772664", lon: "-84.251937" },
  {name: "King Memorial", apiKey: "king%20memorial", lat: "33.749959", lon: "-84.37544" },
  {name: "Lakewood", apiKey: "lakewood", lat: "33.700457", lon: "-84.428859" },
  {name: "Lenox", apiKey: "lenox", lat: "33.847144", lon: "-84.35631" },
  {name: "Lindbergh", apiKey: "lindbergh", lat: "33.821995", lon: "-84.367447" },
  {name: "Medical Center", apiKey: "medical%20center", lat: "33.910689", lon: "-84.352684" },
  {name: "Midtown", apiKey: "midtown", lat: "33.781121", lon: "-84.386345" },
  {name: "North Avenue", apiKey: "North%20Avenue", lat: "33.771712", lon: "-84.386699" },
  {name: "North Springs", apiKey: "north%20springs", lat: "33.944552", lon: "-84.356206" },
  {name: "Oakland City", apiKey: "oakland%20city", lat: "33.716848", lon: "-84.4252" },
  {name: "Peachtree Center", apiKey: "peachtree%20center", lat: "33.759677", lon: "-84.387548" },
  {name: "Sandy Springs", apiKey: "sandy%20springs", lat: "33.933035", lon: "-84.352019" },
  {name: "Vine City", apiKey: "vine%20city", lat: "33.75687", lon: "-84.40391" },
  {name: "West End", apiKey: "west%20end", lat: "33.73581", lon: "-84.41296" },
  {name: "West Lake", apiKey: "west%20lake", lat: "33.75314", lon: "-84.44658" },
];
  
  
var menu = new UI.Menu({
  /*backgroundColor: 'black',
  textColor: 'white',
  highlightBackgroundColor: 'black',
  highlightTextColor: 'yellow',*/
  sections: [{
    title: 'Marta Stations',
  items: []
  }]
});

var radions = function(number){
    return number * Math.PI / 180;
};

var calcDistanceKilometers = function(lat1, lon1, lat2, lon2){
  
  if(lat1 === undefined || lat1 === null ||
     lat2 === undefined || lat2 === null ||
     lon1 === undefined || lon1 === null ||
     lon2 === undefined || lon2 === null)
  {
    return -1;
  }
  
  var φ1 = radions(lat1), φ2 = radions(lat2), Δλ = radions((lon2-lon1)), R = 6371000;
  var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
  return Math.abs(d/1000) * 0.62137;
};

var buildMenu = function(lat, lon){
  var newItems = [];
  for(var i = 0; i < stations.length; i ++){
    var distance = calcDistanceKilometers(lat, lon, stations[i].lat, stations[i].lon);
    console.log(stations[i].name + ': ' + distance);
    if(distance < distanceThreashold){
      newItems.push({
        title: stations[i].name + ((distance > -1) ? (' (' + distance.toFixed(1) + ' m)') : ''),
        stationName: stations[i].name,
        stationValue: stations[i].apiKey,
        stationDistance: distance,
      });
    }   
  }
  if(lat !== null && lon !== null){
    menu.items(0, newItems.sort(function(a,b){return (a.stationDistance - b.stationDistance);}));
  }
  else{
    menu.items(0, newItems);
  }
};

function locationSuccess(pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  //buildMenu(pos.coords.latitude,pos.coords.longitude);
  buildMenu(33.776827,-84.259188);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
  buildMenu(null,null);
}

navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);

module.exports = {
  menu: menu,
};


