 var moment = require('moment');
//  momentjs.com

//  var date = new Date().getTime();
//  console.log(date);
 
var date = moment().locale('pl');

console.log(date.format('dddd'));
console.log(date.endOf('hour').fromNow());
