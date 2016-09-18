var UI = require('ui');


var alertWindow = new UI.Card({
  title:"Rider Alerts",
  bodyColor:"white",
  titleColor:"white",
  backgroundColor:"black",
  scrollable: true,
  status: {
    separator: 'none',
    backgroundColor:"black",
    color: 'white'
  }
});

var renderAlerts = function(alertData){
  var outputText = "";
  
  for(var i = 0; i < alertData.length; i++){
    outputText += alertData[i].alertText + "\nExpires: " + alertData[i].endDate.toLocaleDateString() + " " + alertData[i].endDate.toLocaleTimeString() + "\n\n";
  }
  
  alertWindow.body(outputText);
};


module.exports = {
  alertWindow: alertWindow,
  renderAlerts: renderAlerts
};