var stationWindowService = require('stationWindowService');
var menuService = require('menuService');
var martaService = require('martaService');
//var backLight = require('ui/light');

var currentStation = '';
var runner = null;

var refreshData = function(){
  martaService.getTrainData(currentStation,stationWindowService.renderData,stationWindowService.renderError);
};

menuService.menu.on('select', function(e) { 
  stationWindowService.setTitle(e.item.stationName);
  currentStation = e.item.stationValue; 
  stationWindowService.stationWindow.show();
  //backLight.on();
  refreshData();
  runner = setInterval(refreshData, 30000);
});

stationWindowService.stationWindow.on('click', refreshData);
//stationWindowService.stationWindow.on('accelTap', refreshData);

stationWindowService.stationWindow.on('hide', function() {
  //backLight.auto();
  if(runner){
    clearInterval(runner);
  }
});

menuService.menu.show();

