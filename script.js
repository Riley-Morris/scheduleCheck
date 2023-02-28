function generateDates(startDate, endDate){
  let dateRange = {}
  let unixStart = startDate.getTime();
  console.log(unixStart + ' - unix start here')
  let unixEnd = endDate.getTime();
  for (let u = unixStart; u<=unixEnd; u +=86400000) {
    // create key:value pairs with dates being the key, set 0 for all values
    dateRange[u] = 0
    
  }
  return dateRange
}

function parseDate(dateToParse) {
  var parts = dateToParse.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

let start = parseDate('2023-02-20')
let end = parseDate('2023-06-23')
let range = generateDates(start, end)
let testDate = adjustDaylightSavings(parseDate('2023-03-13').getTime())
let Datekeys = Object.keys(range)
console.log(testDate)
// console.log(Datekeys)
// console.log(range[start])
console.log(range[testDate])


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

function adjustDaylightSavings(unixTimeStamp){
  //configured for 2023 only
  if (unixTimeStamp > 1678597200000 && unixTimeStamp < 1699156800000){
    let newStamp = unixTimeStamp + 3600000
    return newStamp
  }else {
    return unixTimeStamp
  }
}

console.log(range)

// FIX TIME ZONE ERROR, OFF BY 1 Hour btw test date and generated object