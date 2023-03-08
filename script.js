

//Functions operate with milliseconds unix time stamp

//generate an array of dates of the school year
function generateDates(startDate, endDate){
  let dateRange = []
  let unixStart = startDate.getTime();
  let unixEnd = endDate.getTime();
  for (let u = unixStart; u<=unixEnd; u +=86400000) {
    // create key:value pairs with dates being the key, set 0 for all values
    dateRange.push(adjustDaylightSavings(u))
    
  }
  return dateRange
}

//for easy manual conversion of date -> unix
function parseDate(dateToParse) {
  var parts = dateToParse.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

function adjustDaylightSavings(unixTimeStamp){
  //configured for 2023/24 only
  //btw mar 12 -= nov 5 2023
  if (unixTimeStamp > 1678597200000 && unixTimeStamp < 1699156800000 
    //btw mar 10-nov 3 2024
    || unixTimeStamp > 17100468009000 && unixTimeStamp < 1730606400000
    //btw mar 9-nov 2 2025
    || unixTimeStamp > 1741496400000 && unixTimeStamp < 1762056000000){
      //increment by 1 hour
    let newStamp = unixTimeStamp - 3600000
    return newStamp
  }else {
    return unixTimeStamp
  }
}

  //return an array of weekend unix timestamps within range
function getWeekendsRange(startSaturday, endSaturday){
  const weekendArr = []
  let startSunday = new Date(startSaturday)
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
    const satUnixTimeStamp = Math.floor(satDate.getTime()/1000)
    let sunDate = new Date(startSunday);
    sunDate.setDate(sunDate.getDate() + (i*7));
    const sunUnixTimeStamp = Math.floor(sunDate.getTime()/1000)
    weekendArr.push(parseInt(satUnixTimeStamp + '000'))
    weekendArr.push(parseInt(sunUnixTimeStamp + '000'))
  }
  return weekendArr
}
//function to help testing by translating unix time into indexed date/time strings

function showFullTime(unixArray){
  for(let i = 0;i<unixArray.length;i++){
    let dateTimeFull = new Date(unixArray[i])
    console.log(i + ': ' + dateTimeFull)
  };
}

//remove PED and holidays from array
function deleteArrayItems(arrayToStart, ...indexesToDelete){
  for (let i of indexesToDelete){
    delete arrayToStart[i] 
  }
    //remove undefined values within array
  let arrayAtEnd = arrayToStart.filter(item=>item)
  return arrayAtEnd
}
//check current day and remove any that have passed
function updateArrayDays(dateArray){
  let now = new Date()
  now.setHours(0, 0, 0, 0)
  unixNow = Date.parse(now)
  let currentDateIndex = dateArray.indexOf(unixNow)
  if(currentDateIndex !== -1) {
    return dateArray.splice(currentDateIndex, dateArray.length - 1);
}return dateArray
}
//set up for loop to create and add 1-6 values to date objects in array to correspond to cycle days 
//array must start on cycle day 1
function createObjectAndValues(dateArray){
  counter = 0
  dateObject = {}
  for (const key of dateArray){
    if (counter === 6){
      counter = 1
    }else {
      counter++
    }dateObject[key] = counter
  }
  return dateObject
}


let start = parseDate('2023-03-06')
let end = parseDate('2023-06-23')
let range = generateDates(start, end)

//first saturday in above period
let saturdayStart = 1678078800000
let saturdayEnd = 	1686974400000

let weekendsInInterval = getWeekendsRange(1678510800000, 1686974400000)

// Combine weekends range function with generate dates to remove weekends
let filteredRange = range.filter((timeStamp)=>!weekendsInInterval.includes(timeStamp))
//filter out PED and holidays, then pass through function to remove old dates
let secondFilter = updateArrayDays(deleteArrayItems(filteredRange, 7, 16, 17, 26, 27, 42, 43, 44, 45, 46, 47,
  48, 49, 50, 51, 57, 82))


//create date object with correct cycle days
let cycleDaysObject = createObjectAndValues(secondFilter)
console.log(cycleDaysObject)
//get length of object
let daysLeft = Object.keys(cycleDaysObject).length
console.log(daysLeft)


//THIS DOESNT WORK, node list returns 0
function addCycleBorders(cycleDayClass){
  const cycleElements = document.querySelectorAll('.' + cycleDayClass)
  console.log(cycleElements.length)
  for (const element of cycleElements){
    element.style.border = "thick solid #0000FF"
  } 
}

addCycleBorders('day3')


//TODO
//make a countdown function to end of year - run a function that checks if current day 
//is greater than previous list items and remove list items and return length of array
//combine js with css to highlight current cycle day
// allow drop down selection for other days



