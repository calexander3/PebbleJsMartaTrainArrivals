var ajax = require('ajax');

var getTrainData = function(currentStation, callback){
  if(currentStation.length > 0){
    console.log('refreshing...');
    ajax(
      {
        url: 'http://developer.itsmarta.com/NextTrainService/RestServiceNextTrain.svc/GetNextTrain/' + currentStation,
        type: 'json'
      },
      function(data, status, request) {
        callback(data);
      },
      function(error, status, request) {
        console.log('The ajax request failed: ' + error);
      }
    );
  }
};

module.exports = {
  getTrainData: getTrainData,
};