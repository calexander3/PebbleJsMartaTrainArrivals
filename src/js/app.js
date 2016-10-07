var stationWindowService = require('stationWindowService');
var alertWindowService = require('alertWindowService');
var menuService = require('menuService');
var martaService = require('martaService');

var currentStation = '';
var runner = null;

var refreshData = function(){
  martaService.getTrainData(currentStation,stationWindowService.renderData,stationWindowService.renderError);
};

menuService.menu.on('select', function(e) { 
  if(e.item.action === 'station'){
    stationWindowService.setTitle(e.item.stationName);
    currentStation = e.item.stationValue; 
    stationWindowService.stationWindow.show();
    refreshData();
    runner = setInterval(refreshData, 30000);
  }
  else if(e.item.action === 'allstations'){
    menuService.buildMenu(null,null);
  }
  else if(e.item.action === 'alert'){
    alertWindowService.renderAlerts(e.item.alertData);
    alertWindowService.alertWindow.show();
  }

});

stationWindowService.stationWindow.on('click', refreshData);

stationWindowService.stationWindow.on('hide', function() {
  if(runner){
    clearInterval(runner);
  }
});

menuService.menu.show();

