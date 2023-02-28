function generateDates(startDate, endDate){
  let dateRange = {}
  let unixStart = startDate.getTime();
  console.log(unixStart + ' - unix start here')
  console.log(timeConverter(unixStart) + ' readable format here for time start')
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

let testDate = adjustDaylightSavings(parseDate('2023-03-13').getTime())


function timeConverter(unixTimeStamp){
  let a = new Date(unixTimeStamp)
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  console.log(year)
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
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

let start = parseDate('2023-02-20')
let end = parseDate('2023-06-23')
let range = generateDates(start, end)


// Generalize adjustDayLightSavings function to all years to 2038