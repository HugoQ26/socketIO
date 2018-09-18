 var moment = require('moment');
//  momentjs.com

//  var date = new Date().getTime();
//  console.log(date);
 
var date = moment();
console.log(date.format('hh:mm a, YYYY'));
