var ajax = require('ajax');

var getRiderAlertData = function(callback){
  console.log('loading rider alerts...');
  ajax(
    {
      url: 'http://developer.itsmarta.com/service_alerts.xml',
      type: 'xml'
    },
    function(data, status, request) {
      var alerts = [];
      var descriptions = [];
      var startDates = [];
      var endDates = [];
      
      var dataParts = data.replace(/(?:\r\n|\r|\n)/g,"").split(/(<\/?[a-zA-Z]+>)/);
      
      for(var i = 0; i < dataParts.length; i++){
        if(dataParts[i] === '<desc>'){
          descriptions.push(dataParts[i+1]);
        }
        if(dataParts[i] === '<start>'){
          startDates.push(new Date(dataParts[i+1]));
        }
        if(dataParts[i] === '<expire>'){
          endDates.push(new Date(dataParts[i+1]));
        }
      }
      
      if(descriptions.length === startDates.length && descriptions.length === endDates.length )
      {
        var now = new Date().getTime();
        for(i = 0; i < descriptions.length; i++){
          if(now >= startDates[i].getTime() && now < endDates[i].getTime() ){
            alerts.push({
              alertText: descriptions[i],
              startDate: startDates[i],
              endDate: endDates[i]
            });
          }
        }
      }
      
      callback(alerts);
    },
    function(error, status, request) {
      callback([]);
    }
  );
};

module.exports = {
  getRiderAlertData: getRiderAlertData,
};