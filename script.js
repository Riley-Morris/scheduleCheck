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

  //return an array of weekend unix timestamps within range
function getWeekendsRange(startSaturday, endSaturday){
  const weekendArr = []
  let startSunday = new Date(startSaturday)
  let endSunday = new Date(endSaturday)
  startSunday.setDate(startSunday.getDate() + 1)
  //seven days of unix timestamp
  const sevenDays = 86400000 * 7;
  //time interval between start and end dates in unix timestamp
  const timeInterval = endSaturday - startSaturday
  //amount of saturdays in time interval
  const numberOfSaturdays = timeInterval/sevenDays
  console.log(Math.round(numberOfSaturdays))
  for (let i = 1; i <= numberOfSaturdays; i++){
    let satDate = new Date(startSaturday);
    satDate.setDate(satDate.getDate() + (i*7));
    weekendArr.push(satDate)
    let sunDate = new Date(startSunday);
    sunDate.setDate(sunDate.getDate() + (i*7));
    weekendArr.push(sunDate)
  }
  return weekendArr
}
let weekendsInInterval = getWeekendsRange(1678510800000, 1686974400000)
console.log(weekendsInInterval)
console.log(range[saturdayStart])

// Generalize adjustDayLightSavings function to all years to 2038
