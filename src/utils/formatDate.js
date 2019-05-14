let formatDate = function(date){
    let year = date.getFullYear(date)
    let month = date.getMonth(date) + 1
    let day = date.getDate(date)
    let hour = date.getHours(date)
    let minutes = date.getMinutes(date)
    let seconds = date.getSeconds(date)
    return  ''+year + '-' +  (month < 10?'0'+month:month) + '-' + (day < 10?'0'+day:day) + ' ' + (hour < 10?'0'+hour:hour) + ':'+ (minutes < 10?'0'+minutes:minutes) + ':'+ (seconds < 10?'0'+seconds:seconds)
 }

 export default formatDate