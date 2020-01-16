<template>
<section class="myself-container content">
    <div class="user-title" style="display: flex;flex-flow: column;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>节点数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a>节点应用统计</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div style="display: flex;flex-flow: row;margin-top: 20px;">
            <el-select v-model="value1" placeholder="域名" style="width: 10%;margin-right: 10px;">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="value2" placeholder="区域" style="width: 10%;margin-right: 10px;">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="value3" placeholder="运营商" style="width: 10%;margin-right: 10px;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button>今天</el-button>
            <el-button>昨天</el-button>
            <el-button>近7天</el-button>
            <el-button>近30天</el-button>
            <el-date-picker style="margin-left:10px;" v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker>
            <el-button style="margin-left:10px;" type="primary">确定</el-button>
        </div>
        <div style="margin-top:10px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="PV/UV" name="first">
                    <el-row style="margin-top:20px;">
                        <el-col :span="5">
                            <div class="user-item">
                                <div class="item-count">1000GB</div>
                                <div class="item-text">使用流量</div>
                            </div>
                        </el-col>

                        <el-col :span="5" style="margin-left:30px;">
                            <div class="user-item">
                                <div class="item-count">21.66MB/s</div>
                                <div class="item-text">带宽峰值</div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="device_form" style>
                        <div id="myChart" :style="{width: '1200px', height: '300px'}"></div>
                    </div>
                    <!-- <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24" style="text-align:left;    font-weight: bold;">IP流量平均利用率表</el-col>
              </el-row>
            </div>-->
                </el-tab-pane>

                <el-tab-pane label="地区和运营商" name="second">
                    <div class="device_form" style>
                        <div id="myChart1" :style="{width: '1200px', height: '300px'}"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;">IP流量平均利用率表</el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tablecdn" border style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column prop="timessa" label="时间"></el-table-column>
                                    <el-table-column label="总流量">
                                        <template slot-scope="scope">
                                            <div>{{scope.row.alliu}}</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="播放统计" name="there">
                    <div class="device_form" style>
                        <div id="myChart2" :style="{width: '1200px', height: '300px'}"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;">IP流量平均利用率表</el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tablecdn" border style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column prop="timessa" label="时间"></el-table-column>
                                    <el-table-column label="总流量">
                                        <template slot-scope="scope">
                                            <div>{{scope.row.alliu}}</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</section>
</template>

<script>
import echarts from "echarts";
export default {
    data() {
        return {
            options1: [{
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                }
            ],
            options2: [{
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                }
            ],
            options3: [{
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                }
            ],
            value1: "",
            value2: "",
            value3: "",
            tablecdn: [{
                    timessa: "2018/05/01",
                    alliu: "13585"
                },
                {
                    timessa: "2018/05/02",
                    alliu: "2898915641"
                },
                {
                    timessa: "2018/05/03",
                    alliu: "26846513"
                }
            ],
            activeName: "first",
            pickerOptions: {
                shortcuts: [{
                        text: "昨天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "今天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date().setHours(0, 0, 0, 0);

                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: "",
            rowHeader: [{
                    prop: "time",
                    label: "节点ID"
                },
                {
                    prop: "totals",
                    label: "使用流量"
                },
                {
                    prop: "online_devices",
                    label: "传输次数"
                },
                {
                    prop: "average_online",
                    label: "日期"
                }
            ],
            rowHeader1: [{
                    prop: "time",
                    label: "节点ID"
                },
                {
                    prop: "totals",
                    label: "存储容量"
                },
                {
                    prop: "online_devices",
                    label: "存储次数"
                },
                {
                    prop: "average_online",
                    label: "日期"
                }
            ],
            tableData: [{
                time: "测试数据1",
                totals: "测试数据1",
                online_devices: "测试数据1",
                average_online: "测试数据1",
                new_percent: "测试数据1"
            }]
        };
    },
    mounted() {
        this.drawLine();
        this.drawLine1();
        this.drawLine2();
        // this.configure()
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        // 表头样式设置
        headClass() {
            return "text-align: center;background:#eef1f6;";
        },
        // 表格样式设置
        rowClass() {
            return "text-align: center;";
        },
        //选项卡
        handleClick(tab, event) {
            console.log(tab, event);
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            window.onresize = myChart.resize;
            // 绘制图表
            let options = {
                title: {
                    text: "PV/UV",
                    left: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    left: "left",
                    data: ["pv", "uv"]
                },
                xAxis: {
                    type: "category",
                    name: "日期",
                    splitLine: {
                        show: false
                    },
                    data: [
                        "2018-19-11",
                        "2018-19-12",
                        "2018-19-13",
                        "2018-19-14",
                        "2018-19-15",
                        "2018-19-16",
                        "2018-19-17"
                    ]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                yAxis: {
                    type: "log",
                    name: "pv/uv"
                },
                series: [{
                        name: "pv",
                        type: "line",
                        smooth: true,
                        data: [26, 365, 239, 247, 81, 247, 741, 2223, 6669]
                    },
                    {
                        name: "uv",
                        type: "line",
                        smooth: true,
                        data: [176, 245, 435, 854, 416, 332, 164, 128, 256]
                    }
                ]
            };
            myChart.setOption(options);
        },
        drawLine1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart1"));
            window.onresize = myChart.resize;
            // 绘制图表
            let options = {
                title: {
                    text: "地区和运营商"
                },
                tooltip: {},
                xAxis: {
                    data: [
                        "2018-19-11",
                        "2018-19-12",
                        "2018-19-13",
                        "2018-19-14",
                        "2018-19-15",
                        "2018-19-16"
                    ]
                },
                yAxis: {},
                series: [{
                    name: "销量",
                    type: "bar",
                    data: [11, 200, 36, 100, 10, 200]
                }]
            };
            myChart.setOption(options);
        },
        drawLine2() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart2"));
            window.onresize = myChart.resize;
            // 绘制图表
            let option = {
                xAxis: {
                    type: "category",
                    data: [
                        "2018-19-11",
                        "2018-19-12",
                        "2018-19-13",
                        "2018-19-14",
                        "2018-19-15",
                        "2018-19-16",
                        "2018-19-17"
                    ]
                },
                yAxis: {
                    type: "value"
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: "#8cd5c2", //改变折线点的颜色
                            lineStyle: {
                                color: "#409EFF" //改变折线颜色
                            }
                        }
                    }
                }]
            };
            myChart.setOption(option);
        }
    }
};
</script>

<style lang="scss">
.myself-container {
    width: 100%;
    min-width: 1600px;

    .device_form {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;
        background: #ffffff;
        padding: 15px 30px;
        box-sizing: border-box;

        .bottom {
            margin-top: 20px;
        }

        .el-form-item__label {
            white-space: nowrap;
        }

        .el-form-item {
            margin-bottom: 0px;
            margin-left: 10px;
        }

        .row_activess {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
        }

        .div_show {
            width: auto;
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            color: #409eff;
            cursor: pointer;
            margin-left: 20px;
        }
    }

    .devide_table {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .el-table td,
        .el-table th {
            padding: 6px 0px;
        }

        .row_active {
            margin-top: 10px;
        }
    }

    .devide_pageNation {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .devide_pageNation_active {
            float: right;
        }
    }
}

.addaccout {
    .el-form--label-left .el-form-item__label {
        text-align: right;
        width: 90px;
    }

    .el-form-item__error {
        margin-left: 80px;
    }
}

.user-title .user-item {
    background: #f2f2f2;
    padding: 25px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>
