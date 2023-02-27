function generateDates(startDate, endDate){
  let dateRange = {}
  let unixStart = startDate.getTime();
  let unixEnd = endDate.getTime();
  for (let u = unixStart; u<=unixEnd; u +=86400000) {
    // create key:value pairs with dates being the key, set 0 for all values
    dateRange[new Date(u).getTime()] = 0
    
  }
  return dateRange
}

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

let start = parseDate('2023-02-20')
let end = parseDate('2023-06-23')
let range = generateDates(start, end)
let testDate = parseDate('2023-03-13')
let Datekeys = Object.keys(range)

console.log(Datekeys)
console.log(testDate)

// console.log(range[start])
console.log(range[testDate])
// console.log(range['Thu Apr 06 2023 01:00:00 GMT-0400 (Eastern Daylight Time)'])

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
console.log(timeConverter(range[1]));