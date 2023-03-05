//Functions operate with milliseconds unix time stamp

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
  const a = new Date(unixTimeStamp)
  return a
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

let start = parseDate('2023-03-06')
let end = parseDate('2023-06-23')
let range = generateDates(start, end)

//first saturday in above period
let saturdayStart = 1678078800000
let saturdayEnd = 	1686974400000

function getWeekendsRange(startSaturday, endSaturday){
  //return an array of weekend unix timestamps within range
  let weekendDate = new Date(startSaturday)
  weekendDate.setDate(weekendDate.getDate() + 7);
  console.log(weekendDate)
  const weekendArr = []

}
getWeekendsRange(1678510800000, 1686974400000)
console.log(range)
console.log(range[saturdayStart])

// Generalize adjustDayLightSavings function to all years to 2038
//see https://stackoverflow.com/questions/5741632/javascript-date-7-days 
//and https://stackoverflow.com/questions/12783685/how-to-find-out-how-many-if-any-weekends-occur-in-a-given-period
//to finish getWeekendRange function