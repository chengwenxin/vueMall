let formatDate = function(date){
    let year = date.getUTCFullYear(date)
    let month = date.getUTCMonth(date) + 1
    let day = date.getUTCDate(date)
    let hour = date.getUTCHours(date)
    let minutes = date.getUTCMinutes(date)
    let seconds = date.getUTCSeconds(date)
    return  ''+year + '-' +  (month < 10?'0'+month:month) + '-' + (day < 10?'0'+day:day) + ' ' + (hour < 10?'0'+hour:hour) + ':'+ (minutes < 10?'0'+minutes:minutes) + ':'+ (seconds < 10?'0'+seconds:seconds)
 }

 export default formatDate