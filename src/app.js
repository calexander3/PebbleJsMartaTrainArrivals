var ajax = require('ajax');
var stationWindowBuilder = require('stationWindowBuilder');
var menuBuilder = require('menuBuilder');

var currentStation = '';
var runner = null;

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
  runner = setInterval(getTrainData(), 30000);
});

stationWindowBuilder.stationWindow.on('click', 'select', getTrainData);

stationWindowBuilder.stationWindow.on('hide', function() {
  if(runner !== null){
    clearInterval(runner);
  }
});

menuBuilder.menu.show();

