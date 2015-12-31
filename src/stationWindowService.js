var UI = require('ui');
var Vector2 = require('vector2');

var lastUpdatedText = null;
var oldTrainData = null;
var lastUpdatedDate = new Date();

var stationWindow = new UI.Window({
  scrollable: true
});

var titleText = new UI.Text({
  position: new Vector2(5, 0),
  size: new Vector2(134, 30),
  font: 'gothic-28-bold',
  color: 'white',
  textAlign: 'left',
  textOverflow: 'ellipsis',
});
stationWindow.add(titleText);

var setTitle = function(title){
  oldTrainData = null;
  titleText.text(title);
};

var clearDataElements = function(){
  var elementsToRemove = [];
  stationWindow.each(function(element) {
    if(element !== titleText){
      elementsToRemove.push(element);
    }
  });
  for(var i=0; i < elementsToRemove.length; i ++){
    stationWindow.remove(elementsToRemove[i]);
  }
};

var getColor = function(color){
  switch(color) {
    case 'blue':
        return 'vividCerulean';
    case 'gold':
        return 'yellow';
    default:
        return color;
  }
};

var shortenString = function(str){
  return str.replace('Hamilton', 'H')
            .replace('Boarding', 'Brding')
            .replace('Arriving', 'Arriv')
            .replace('Creek', 'Crk')
            .replace('Memorial','M')
            .replace('North', 'N');
};

var renderData = function(trainData){
  oldTrainData = trainData;
  lastUpdatedDate =   new Date();
  clearDataElements();
  var rowPosition = 0;
  var rowSize = 25;
  for(var i = 0; i < trainData.length; i ++){
    
    rowPosition = ((i + 1) * rowSize);
    var waitTime = trainData[i].WAITING_TIME + ((isNaN(trainData[i].WAITING_TIME)) ? '' : ' Min');
    
    var trainLineText = new UI.Text({
      position: new Vector2(5, rowPosition),
      size: new Vector2(15, 25),
      font: 'gothic-24-bold',
      color: getColor(trainData[i].ROUTE.toLowerCase()),
      text: trainData[i].DIRECTION,
      textAlign: 'left',
    });
    stationWindow.add(trainLineText);
    
    var headingText = new UI.Text({
      position: new Vector2(20, rowPosition),
      size: new Vector2(80, 25),
      font: 'gothic-24',
      color: 'white',
      text: shortenString(trainData[i].HEAD_SIGN),
      textAlign: 'left',
      textOverflow: 'ellipsis',
    });
    stationWindow.add(headingText);
    
      var waitingText = new UI.Text({
      position: new Vector2(100, rowPosition),
      size: new Vector2(44, 25),
      font: 'gothic-24',
      color: 'white',
      text: shortenString(waitTime),
      textAlign: 'right',
      textOverflow: 'ellipsis',
    });
    stationWindow.add(waitingText);
  }
  
  lastUpdatedText = new UI.Text({
      position: new Vector2(0, rowPosition + rowSize + 2),
      size: new Vector2(141, 15),
      font: 'gothic-14',
      color: 'white',
      text: 'Last Updated ' + lastUpdatedDate.toLocaleTimeString(),
      textAlign: 'right',
      textOverflow: 'ellipsis',
    });
    stationWindow.add(lastUpdatedText);
};

var renderError = function(error, status){
  if(oldTrainData){
    var timeDiffMinutes = Math.trunc(((new Date()).getTime() - lastUpdatedDate.getTime()) / 60000);
    if(timeDiffMinutes > 0){
      for(var i = 0; i < oldTrainData.length; i ++){
        if(!isNaN(oldTrainData[i].WAITING_TIME) && (oldTrainData[i].WAITING_TIME - timeDiffMinutes >= 0)){
          oldTrainData[i].WAITING_TIME -= timeDiffMinutes;
        }
      }
      renderData(oldTrainData);
    }
  }
  
  if(lastUpdatedText && stationWindow.index(lastUpdatedText) > 1){
    lastUpdatedText.text('Refresh Failed');
  }
  else if(!lastUpdatedText || stationWindow.index(lastUpdatedText) == -1){
      lastUpdatedText = new UI.Text({
      position: new Vector2(5, 27),
      size: new Vector2(134, 120),
      font: 'gothic-24',
      color: 'white',
      textAlign: 'left',
      textOverflow: 'wrap',
      text: 'Unable to contact Marta'
    });
  }
  stationWindow.add(lastUpdatedText);
};

module.exports = {
  stationWindow: stationWindow,
  setTitle: setTitle,
  renderData: renderData,
  renderError: renderError
};