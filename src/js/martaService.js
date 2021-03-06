var ajax = require('ajax');

var getTrainData = function(currentStation, successCallback, errorCallback){
  if(currentStation){
    console.log('refreshing...');
    ajax(
      {
        url: 'http://developer.itsmarta.com/NextTrainService/RestServiceNextTrain.svc/GetNextTrain/' + currentStation,
        type: 'json'
      },
      function(data, status, request) {
        if(successCallback && typeof(successCallback) === "function"){
          successCallback(data);
        }
      },
      function(error, status, request) {
        if(errorCallback && typeof(errorCallback) === "function"){
          errorCallback(error, status);
        }
      }
    );
  }
};

module.exports = {
  getTrainData: getTrainData,
};