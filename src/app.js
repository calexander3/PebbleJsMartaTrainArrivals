var UI = require('ui');
var ajax = require('ajax');
var stationWindowBuilder = require('stationWindowBuilder');

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

var menu = new UI.Menu({
  backgroundColor: 'black',
  textColor: 'white',
  highlightBackgroundColor: 'black',
  highlightTextColor: 'yellow',
  sections: [{
    title: 'Marta',
    items: [{
      title: 'Avondale',
      stationValue: 'avondale'
    }, {
      title: 'Five Points',
      stationValue: 'five%20points'
    }, {
      title: 'North Avenue',
      stationValue: 'North%20Avenue'
    }]
  }]
});

menu.on('select', function(e) { 
  stationWindowBuilder.setTitle(e.item.title);
  currentStation = e.item.stationValue; 
  //getTrainData();
  stationWindowBuilder.stationWindow.show();
  runner = setInterval(getTrainData(), 30000);
});

stationWindowBuilder.stationWindow.on('click', 'select', getTrainData);

stationWindowBuilder.stationWindow.on('hide', function() {
  if(runner !== null){
    clearInterval(runner);
  }
});

menu.show();

