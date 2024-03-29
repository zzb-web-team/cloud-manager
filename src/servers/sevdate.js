//时间戳转日期
export function getlocaltimes(timestamp) {
    // 如果以秒为单位
    let dateObj = new Date(timestamp * 1000);
    // 如果以毫秒为单位
    // var dateObj = new Date(timestamp);
    let Y = dateObj.getFullYear() + '-';
    let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
    let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ';
    let h = ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':';
    let m = ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':';
    let s = ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
    return h + m + s //时分秒可以根据自己的需求加上
}
export function getymdtime(timestamp) {
    // 如果以秒为单位
    let dateObj = new Date(timestamp * 1000);
    // 如果以毫秒为单位
    // var dateObj = new Date(timestamp);
    let Y = dateObj.getFullYear() + '-';
    let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
    let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ';
    let h = ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':';
    let m = ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':';
    let s = ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
    return Y + M + D + h + m + s //时分秒可以根据自己的需求加上
}
export function getymdtime1(timestamp, timeUint) {
    // 如果以秒为单位
    let dateObj = new Date(timestamp * 1000);
    // 如果以毫秒为单位
    // var dateObj = new Date(timestamp);
    if (timeUint) {
        let Y = dateObj.getFullYear() + '-';
        let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
        let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate());

        return M + D //时分秒可以根据自己的需求加上

    } else {
        let Y = dateObj.getFullYear() + '-';
        let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
        let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ';
        let h = ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':';
        let m = ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes())
        let s = ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
        return M + D + h + m //时分秒可以根据自己的需求加上

    }

}
//日期转时间戳
export function settime(nowTime) {
    nowTime = nowTime.substring(0, 19);
    nowTime = nowTime.replace(/-/g, '/');
    var time = new Date(nowTime).getTime() / 1000;
    return time
}

//标准格式转时间戳
export function setbatime(nowTime) {
    nowTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + nowTime.getDate() + ' ' + nowTime.getHours() + ':' + nowTime.getMinutes() + ':' + nowTime.getSeconds();

    var time = new Date(nowTime).getTime() / 1000;
    return time
}

export function dateToMs(date) {
    let result = new Date(date).getTime() / 1000;
    return result;
}

//时间段分割
export function splitTimes(startTime, endTime, unit) {
    let diff = endTime - startTime;
    let arr = [];
    let split = Math.ceil(diff / (unit * 60));
    for (var i = 0; i < split; i++) {
        arr.push(startTime + 60 * unit * i)
    }
    console.log(arr)
    return arr
};