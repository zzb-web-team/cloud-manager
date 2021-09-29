<template>
  <div>
    <div :id="echarts" :style="{width: '100px', height: '100px',}"></div>
  </div>
</template>

<script>
import "echarts-liquidfill/src/liquidFill.js"; //在这里引入
import echarts from "echarts";
export default {
  name: "yuanqiu",
  data() {
    return {};
  },
  mounted() {
    this.echartsMit();
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
    }
  },
  methods: {
    // 绘制指标图
    echartsMit() {
      var dom = document.getElementById(this.echarts);
      console.log(dom);
      var myChart = echarts.init(dom);
      myChart.setOption({
        series: [
          {
            type: "liquidFill",
            data: [0.6],
            itemStyle: {
              shadowBlur: 0
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 3,
                borderColor: "#929292",
                shadowBlur: 20
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: "red",
                  insideColor: "yellow",
                  fontSize: 20
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>