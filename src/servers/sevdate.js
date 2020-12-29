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
export function getymdtime1(timestamp,timeUint) {
    // 如果以秒为单位
    let dateObj = new Date(timestamp * 1000);
    // 如果以毫秒为单位
    // var dateObj = new Date(timestamp);
    if(timeUint){
        let Y = dateObj.getFullYear() + '-';
        let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
        let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate());

        return M + D //时分秒可以根据自己的需求加上

    }else{
        let Y = dateObj.getFullYear() + '-';
        let M = (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-';
        let D = ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ';
        let h = ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':';
        let m = ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) 
        let s = ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
        return M + D + h + m  //时分秒可以根据自己的需求加上

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
export function splitTimes(startTime, endTime, unit){
    let diff = endTime - startTime;
    let arr = [];
    let split = Math.ceil(diff / (unit*60));
    for(var i = 0; i < split; i++){
        arr.push(startTime + 60 * unit * i)
    }
    console.log(arr)
    return arr
};

export function drawMain(drawing_elem, bgcolor, forecolor, percent, texts, percents) {
    /*
    @drawing_elem: 绘制对象
    @percent：绘制圆环百分比, 范围[0, 100]
    @forecolor: 绘制圆环的前景色，颜色代码
    @bgcolor: 绘制圆环的背景色，颜色代码
    */
   console.log(context)
    var context = drawing_elem.getContext("2d");
    var center_x = drawing_elem.width / 2;
    var center_y = drawing_elem.height / 2;
    var rad = Math.PI*2/100;
    var speed = 0;

    // 绘制背景圆圈
    function backgroundCircle(){
        context.save();
        context.beginPath();
        context.lineWidth = 10; //设置线宽
        var radius = center_x - context.lineWidth - 10;
        context.lineCap = "round";
        context.strokeStyle = bgcolor;
        context.arc(center_x, center_y, radius, 0, Math.PI*2, true);
        context.stroke();
        context.closePath();
        context.restore();
    }

    //绘制运动圆环
    function foregroundCircle(n){
        context.save();
        context.strokeStyle = forecolor;
        context.lineWidth = 20;
        context.lineCap = "round";
        var radius = center_x - context.lineWidth + 5;
        context.beginPath();
        context.arc(center_x, center_y, radius , -Math.PI/2, -Math.PI/2 - n*rad, true); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
    }

    function foregroundCircle1(n){
        context.save();
        context.strokeStyle = '#707DF9';
        context.lineWidth = 20;
        context.lineCap = "round";
        var radius = center_x - context.lineWidth + 5;
        context.beginPath();
        context.arc(center_x, center_y, radius , -Math.PI/2 - n*rad, -Math.PI/2, true); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
    }

    //绘制文字
    function text(n){
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = "#333";
        var font_size = 18;
        context.font = font_size + "px Helvetica";
        var text_width = context.measureText(texts).width;
        context.fillText(texts, center_x - text_width/2, center_y + font_size/2);
        context.restore();
    }


    //执行动画
    (function drawFrame(){
      window.requestAnimationFrame(drawFrame);
      context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
      backgroundCircle();
      text(speed);
      foregroundCircle(speed);
      if(percents){
        foregroundCircle1(speed);
      }
      // foregroundCircle1(speed)
      if(speed >= percent) return;
          speed += 1;
      }()
    )
  }