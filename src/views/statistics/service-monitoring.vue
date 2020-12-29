<template>
    <div>
        <div class="top_title">服务监控</div>
        <div class="itemsWrap">
            <div class="itemStyle">
                <canvas id="progress-canvas1" width="108" height="108"></canvas>
                <div class="itemRightStyle">
                    <p class="titleStyle">健康度</p>
                    <p class="dataStyle">75.68%</p>
                    <p class="actionStyle">
                        <span>历史</span>
                        <span>详情</span>
                    </p>
                </div>
            </div>
            <div class="itemStyle">
                <canvas id="progress-canvas2" width="108" height="108"></canvas>
                <div class="itemRightStyle">
                    <p class="titleStyle">缓存命中率</p>
                    <p class="dataStyle">75.68%</p>
                    <p class="actionStyle">
                        <span>历史</span>
                    </p>
                </div>
            </div>
            <div class="itemStyle" style="padding: 30px 0 30px 40px;">
                <canvas id="progress-canvas3" width="108" height="108"></canvas>
                <div class="itemRightStyle">
                    <p class="titleStyle">缓存率</p>
                    <p class="dataStyle" style="font-size: 24px;">45.37%<span style="font-size: 16px;font-weight: normal;">回源(cache)</span></p>
                    <p class="dataStyle" style="font-size: 24px;">65.63%<span style="font-size: 16px;font-weight: normal;">扩散(cache)</span></p>
                    <p class="actionStyle">
                        <span>历史</span>
                    </p>
                </div>
            </div>
            <div class="itemStyle">
                <canvas id="progress-canvas4" width="108" height="108"></canvas>
                <div class="itemRightStyle">
                    <p class="titleStyle">平均下载速度</p>
                    <p class="dataStyle">300<span style="font-size: 16px;">kb/s</span></p>
                    <p class="actionStyle">
                        <span>历史</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="content">
            <!-- 主体内容 -->
            <div class="content_middle">
                <div class="content_middle_title">
                    <p style="font-size: 18px; color: #333;">服务状况历史数据</p>
                </div>
                <div class="tabWrapStyle">
                    <div 
                        class="tabStyle" 
                        :class="{ isSelected: type == 0 }"
                        @click="handleClick(0)">
                        <div class="circleStyle" :style="{background: type == 0 ? '#644CF7': '#999'}"></div>
                        <p>健康度</p>
                    </div>
                    <div 
                        class="tabStyle" 
                        :class="{ isSelected: type == 1 }"
                        @click="handleClick(1)">
                        <div class="circleStyle" :style="{background: type == 1 ? '#644CF7': '#999'}"></div>
                        <p>缓存命中率</p>
                    </div>
                    <div 
                        class="tabStyle" 
                        :class="{ isSelected: type == 2 }"
                        @click="handleClick(2)">
                        <div class="circleStyle" :style="{background: type == 2 ? '#644CF7': '#999'}"></div>
                        <p>缓存率</p>
                    </div>
                    <div 
                        class="tabStyle" 
                        :class="{ isSelected: type == 3 }"
                        @click="handleClick(3)">
                        <div class="circleStyle" :style="{background: type == 3 ? '#644CF7': '#999'}"></div>
                        <p>平均下载速度</p>
                    </div>
                </div>
                <div class="seach">
                    <el-input
                        v-model="valueDomain"
                        placeholder="请输入域名"
                        style="width: 10%; margin-right: 10px"
                        @keyup.enter.native="onChanges"
                    >
                        <i
                            slot="suffix"
                            class="el-input__icon el-icon-search"
                            @click="onChanges()"
                        ></i>
                    </el-input>
                    <el-input
                        v-model="valueContent"
                        placeholder="请输入加速内容名称"
                        style="width: 10%; margin-right: 10px"
                        @keyup.enter.native="onChanges"
                    >
                        <i
                            slot="suffix"
                            class="el-input__icon el-icon-search"
                            @click="onChanges()"
                        ></i>
                    </el-input>
                    <el-select
                        v-model="valueChanel"
                        placeholder="全部节点渠道"
                        style="width: 10%; margin-right: 10px"
                        @change="onChanges"
                        >
                        <el-option label="全部" value="*"></el-option>
                        <el-option
                            v-for="(item, index) in hashidSets"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="times"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="left"
                        @change="getTimes"
                    >
                    </el-date-picker>
                </div>
                <div v-show="type==0" id="myChart1" :style="{ height: '450px', width: '100%' }"></div>
                <div v-show="type==1" id="myChart2" :style="{ height: '450px', width: '100%' }"></div>
                <div v-show="type==2" id="myChart3" :style="{ height: '450px', width: '100%' }"></div>
                <div v-show="type==3" id="myChart4" :style="{ height: '450px', width: '100%' }"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
var _this;
import {get_nodetype_enum} from '../../servers/api';
import {
    drawMain, dateToMs
} from '../../servers/sevdate';
import echarts from 'echarts';
import Progress from '@/components/Progress';
export default {
	data() {
		return {
            type: 0,
            valueDomain: '',
            valueContent: '',
            valueChanel: '',
            hashidSets: [],
            starttime: '',
            endtime: '',
            times: ''
		};
    },
    components: {
        Progress,
    },
	mounted() {
        this.getNodeType();
        this.drawLine();
        console.log(document.getElementById('progress-canvas1'))
        drawMain(document.getElementById('progress-canvas1'), '#eee', '#61B6FF',  75.68, 'Health');
        drawMain(document.getElementById('progress-canvas2'), '#eee', '#F99070',  75.68, 'Hits');
        drawMain(document.getElementById('progress-canvas3'), '#eee', '#70F9AD',  45.37, '', 65.63);
	},
	methods: {
        //获取节点渠道
        getNodeType() {
            let param = {};
            get_nodetype_enum(param)
                .then((res) => {
                let data = res.data.firstchan;
                let list = data.map((item) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.value;
                    return obj;
                });
                this.hashidSets = list;
                })
                .catch((err) => {
                console.log(err);
                });
        },
        handleClick(val){
            this.type = val;
            if(val==0){

            }else if(val==1){

            }else if(val==2){

            }else{

            }
        },
        getTimes() {
            this.starttime = this.times ? dateToMs(this.times[0]) : new Date(new Date().toLocaleDateString()).getTime() / 1000;
            this.endtime = this.times ? dateToMs(this.times[1]) : Date.parse(new Date()) / 1000;
        },
        onChanges() {
            
        },
		drawLine(){
            let myChart = this.$echarts.init(
				document.getElementById('myChart1')
			);
            window.onresize = myChart.resize;
            let options =  {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['健康度(回源访问)', '健康度(边缘访问)'],
                    bottom: '2%',
                },
                xAxis: {
                    type: 'category',
                    data: ['2020-11-01', '2020-11-02', '2020-11-03', '2020-11-04', '2020-11-05', '2020-11-06', '2020-11-07']
                },
                yAxis: [
                    {
                        type: 'value',
                        splitLine: {
							show: false, //去掉网格线
						},
						axisLabel: {
							show: true,
							interval: 'auto',
							formatter: '{value} %',
						},
						show: true,
					},
                ],
                grid: {
					x: 70,
					y: 50,
					x2: 50,
					y2: 60,
					borderWidth: 10,
				},
                series: [{
                    data: [80, 93, 30, 50, 60, 80, 9],
                    type: 'line',
                    smooth: 0.6,
                    name: '健康度(回源访问)',
                    symbol: 'none',
                    lineStyle: {
                        color: '#FBD9A9',
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: '#FBD9A9' },
                                    { offset: 1, color: '#ffffff' },
                                ]
                            ),
                        },
                    }
                },{
                    data: [50, 40, 10, 30, 60, 75, 98],
                    type: 'line',
                    smooth: 0.6,
                    name: '健康度(边缘访问)',
                    symbol: 'none',
                    lineStyle: {
                        color: '#644CF7',
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: '#644CF7' },
                                    { offset: 1, color: '#ffffff' },
                                ]
                            ),
                        },
                    }
                }
                ]
            };
            myChart.setOption(options)
        },
	},
};
</script>

<style lang="scss" scoped>
.top_title{
  text-align: left;
  font-size: 18px;
  color: #333;
  margin-top: 48px;
  .wrapperStyle{
      display: inline;
      margin-left: 54px;
      .itemStyle {
          font-weight: 500;
          display: inline;
          font-size: 16px;
          color: #666;
          margin-right: 48px;
          cursor: pointer;
          height: 212px;
      }
      .isSelected{
          color: #644CF7;
          border-bottom: 4px solid  #644CF7;
      }
  }
}
.itemsWrap{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .itemStyle{
        background: #fff;
        width: 24%;
        height: 212px;
        border-radius: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 52px 0px 52px 40px;
        .itemRightStyle{
            height: 100%;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            align-items:  flex-start;
            justify-content: space-between;
            .titleStyle{
                color: #333;
                font-size: 16px;
            }
            .dataStyle{
                color: #333;
                font-size: 30px;
                font-weight: bold;
            }
            .actionStyle{
                span{
                    display: inline-block;
                    font-size: 16px;
                    width: 56px;
                    height: 28px;
                    border-radius: 14px;
                    line-height: 28px;
                    text-align: center;
                }
                span:nth-child(1){
                    color: #F99070;
                    background: #FEEFEA;
                }
                span:nth-child(2){
                    margin-left: 16px;
                    color: #567BFD;
                    background: #F1F4FE;
                }

            }
        }
    }
}
.content {
    padding: 48px;
    .content_middle {
        width: 100%;
        height: 672px;
        background: #fff;
        border-radius: 32px;
        .content_middle_title{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .tabWrapStyle{
            margin: 35px 0 49px;
            width: 100%;
            height: 64px;
            background: #FDFBFB;
            border: 1px solid #EEEEEE;
            border-radius: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            .tabStyle{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                padding: 0 47px;
                cursor: pointer;
                .circleStyle{
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    margin-right: 12px;
                }
            }
            .isSelected{
                // width: 160px;
                height: 48px;
                background: #F8F7FF;
                border: 1px solid #644CF7;
                border-radius: 24px;
            }
        }
    }
}
</style>
