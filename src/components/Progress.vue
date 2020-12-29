<template>
  <div>
    <canvas class="progress-graph-canvas" width="108" height="108"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    // 底部圆的颜色
    bgcolor: {
      type: String,
      default: '#eee'
    },
    // 进度圆的颜色
    forecolor: {
      type: String,
      default: '#61B6FF'
    },
    // 进度圆的百分比
    percent: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0 && value <= 100
      }
    },
    texts: {
      type: String,
      default: '--'
    },
  },
  data () {
    return {
    }
  },
  mounted() {
    this.drawMain(this.bgcolor, this.forecolor, this.percent, this.texts);
  },
  methods: {
    drawMain(bgcolor, forecolor, percent, texts) {
      /*
      @drawing_elem: 绘制对象
      @percent：绘制圆环百分比, 范围[0, 100]
      @forecolor: 绘制圆环的前景色，颜色代码
      @bgcolor: 绘制圆环的背景色，颜色代码
      */
      var drawing_elem = document.getElementsByClassName("progress-graph-canvas")[0];
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
        // foregroundCircle1(speed)
        if(speed >= percent) return;
            speed += 1;
        }()
      )
    }
  }
}
</script>

<style>
#time-graph-canvas {
  width: 108px;
  height: 108px;
}
</style>