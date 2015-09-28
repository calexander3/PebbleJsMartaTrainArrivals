var ajax = require('ajax');
var stationWindowBuilder = require('stationWindowBuilder');
var menuBuilder = require('menuBuilder');
var light = require('ui/light');

var currentStation = '';
//var runner = null;

var getTrainData = function(){
  if(currentStation.length > 0){
    console.log('refreshing...');
    ajax(
      {
        url: 'http://developer.itsmarta.com/NextTrainService/RestServiceNextTrain.svc/GetNextTrain/' + currentStation,
        type: 'json'
      },
      function(data, status, request) {
        stationWindowBuilder.loadData(data);
      },
      function(error, status, request) {
        console.log('The ajax request failed: ' + error);
      }
    );
  }
};

menuBuilder.menu.on('select', function(e) { 
  stationWindowBuilder.setTitle(e.item.stationName);
  currentStation = e.item.stationValue; 
  stationWindowBuilder.stationWindow.show();
  getTrainData();
  //runner = setInterval(getTrainData(), 30000);
});

menuBuilder.menu.on('up', function(e) { 
  console.log('up');
});

menuBuilder.menu.on('down', function(e) { 
  console.log('down');
});

stationWindowBuilder.stationWindow.on('click', getTrainData);
stationWindowBuilder.stationWindow.on('accelTap', getTrainData);

/*stationWindowBuilder.stationWindow.on('hide', function() {
  if(runner !== null){
    clearInterval(runner);
  }
});*/

light.on();
menuBuilder.menu.show();

