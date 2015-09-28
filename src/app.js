var stationWindowService = require('stationWindowService');
var menuService = require('menuService');
var martaService = require('martaService');
var backLight = require('ui/light');

var currentStation = '';
var runner = null;

menuService.menu.on('select', function(e) { 
  stationWindowService.setTitle(e.item.stationName);
  currentStation = e.item.stationValue; 
  stationWindowService.stationWindow.show();
  martaService.getTrainData(currentStation,stationWindowService.loadData);
  runner = setInterval(function(){martaService.getTrainData(currentStation,stationWindowService.loadData);}, 30000);
});

stationWindowService.stationWindow.on('click', function(){martaService.getTrainData(currentStation,stationWindowService.loadData);});
stationWindowService.stationWindow.on('accelTap', function(){martaService.getTrainData(currentStation,stationWindowService.loadData);});

stationWindowService.stationWindow.on('hide', function() {
  if(runner !== null){
    clearInterval(runner);
  }
});

backLight.on();
menuService.menu.show();

