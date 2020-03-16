<template>
<section class="myself-container content">
    <div class="user-title" style="display: flex;flex-flow: column;margin-top:0px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>数据中心</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a>资源监控</a>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div style="margin-top:35px;background: #fff;padding:20px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="资源监控" name="first">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;background: #fff;padding:20px;">
                        <el-select v-model="value1" placeholder="全部区域" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value2" placeholder="渠道ID" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options2" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value3" placeholder="运营商" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options3" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value4" placeholder="视频名称" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options4" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value9" placeholder="时间粒度" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options9" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-date-picker style="margin-left:10px;" v-model="valueTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="onClickAccelerate">确定</el-button>
                    </div>
                    <div class="device_form" style>
                        <div id="myChart" style="margin: 0 auto;" :style="{width: '1900px', height: '300px'}"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;"></el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tableData" border style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column prop="timeStamp" label="日期"></el-table-column>
                                    <el-table-column prop="dataFlow" label="流量值"></el-table-column>
                                    <el-table-column prop="acc_peek_bw" label="带宽峰值"></el-table-column>
                                    <el-table-column prop="acc_peek_bw_ts" label="峰值时间点"></el-table-column>
                                    <el-table-column prop="bs_peek_bw" label="回源带宽峰值"></el-table-column>
                                    <el-table-column prop="bs_peek_bw_ts" label="回源峰值时间点"></el-table-column>
                                    <el-table-column prop="access_cnt" label="访问次数"></el-table-column>

                                </el-table>
                            </el-col>
                        </el-row>
                        <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>

                    </div>
                </el-tab-pane>

                <el-tab-pane label="回源统计" name="second">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;background: #fff;padding:20px;">
                        <el-select v-model="value5" placeholder="全部区域" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options5" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value6" placeholder="渠道ID" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options6" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value7" placeholder="运营商" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options7" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value8" placeholder="视频名称" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options8" :key="item" :label="item" :value="item"></el-option>
                        </el-select>

                        <el-select v-model="value10" placeholder="时间粒度" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options10" :key="item" :label="item" :value="item"></el-option>
                        </el-select>

                        <el-date-picker style="margin-left:10px;" v-model="valueTime2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="onClickBacksource">确定</el-button>
                    </div>
                    <div class="device_form" style>
                        <div id="myChart1" style="margin: 0 auto;" :style="{width: '1900px', height: '300px'}"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;"></el-col>
                        </el-row>

                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</section>
</template>

<script>
import fenye from "@/components/fenye";

import echarts from "echarts";
import {
    accelerate_flow_query_conditions,
    backsource_flow_query_conditions,
    accelerate_flow,
    backsource_flow,
    accelerate_flow_table
} from '../../servers/api'
import {
    setTimeout
} from 'timers';
import common from '../../comm/js/util'

export default {
    data() {
        return {

            options1: [],
            options2: [],
            options3: [],
            options4: [],
            options5: [],
            options6: [],
            options7: [],
            options8: [],
            options9: ["120", "10", "20"],
            options10: ["120", "10", "20"],
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            value6: "",
            value7: "",
            value8: "",
            value9: "",
            value10: "",
            valueTime: "",
            valueTime2: "",
            AccelerateX: [],
            AccelerateY: [],
            BacksourceX: [],
            BacksourceY: [],

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
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
                },
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
                            const start = new Date();
                            start.setTime(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
                            picker.$emit('pick', [start, end]);
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
                    prop: "timeStamp",
                    label: "日期"
                },
                {
                    prop: "time",
                    label: "流量值"
                },
                {
                    prop: "totals",
                    label: "宽带峰值"
                },
                {
                    prop: "online_devices",
                    label: "峰值时间点"
                },
                {
                    prop: "online_devices",
                    label: "回源带宽峰值"
                },
                {
                    prop: "online_devices",
                    label: "回源峰值时间点"
                },
                {
                    prop: "online_devices",
                    label: "访问次数"
                },

            ],
            tableData: [{
                time: "测试数据1",
                totals: "测试数据1",
                online_devices: "测试数据1",
                average_online: "测试数据1",
                new_percent: "测试数据1"
            }],
            currentPage: 1,
            pagesize: 10,
            total_cnt: 0,
        };
    },
    mounted() {
        this.querySelectAccelerate()
        //this.querySelectBacksource()
        this.queryAccelerate()
        // this.queryBacksource()
        this.queryAccelerateTable()

        //this.drawLine1();
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
        //获取页码
        handleCurrentChange(pages) {
            this.currentPage = pages;
            this.queryAccelerateTable()
            //this.getdata();
        },
        //获取每页数量
        handleSizeChange(pagetol) {
            this.currentPage = pagetol;
            //this.getdata();
        },
        //加速流量条件查询
        querySelectAccelerate() {
            let param = {
                "chanId": "*"
            }
            accelerate_flow_query_conditions(param).then(res => {
                if (res.status == 0) {
                    this.options1 = res.data.regionSet
                    this.options2 = res.data.chanIdSet
                    this.options3 = res.data.ispSet
                    this.options4 = res.data.fileNameSet
                }

            }).catch(error => {

            })

        },
        //回源条件查询
        querySelectBacksource() {
            let param = {
                "chanId": "*"
            }
            backsource_flow_query_conditions(param).then(res => {
                if (res.status == 0) {
                    this.options5 = res.data.regionSet
                    this.options6 = res.data.chanIdSet
                    this.options7 = res.data.ispSet
                    this.options8 = res.data.fileNameSet
                }

            }).catch(error => {

            })

        },
        //加速流量查询
        onClickAccelerate() {
            this.queryAccelerate()
            this.queryAccelerateTable()

        },
        //
        onClickBacksource() {
            this.queryBacksource()
        },
        //加速流量表格
        queryAccelerateTable() {
            let startTime = 0
            let endTime = 0
            if (this.valueTime) {
                if (this.valueTime == "") {
                    startTime = 1576400000
                    endTime = 1576499999
                } else {
                    endTime = Math.floor(this.valueTime[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime[0].getTime() / 1000)
                }

            } else {
                startTime = 1576400000
                endTime = 1576499999
            }
            let param = {
                start_ts: startTime,
                end_ts: endTime,
                chanId: this.value2 == "" ? "*" : this.value2,
                fileName: this.value4 == "" ? "*" : this.value4,
                region: this.value1 == "" ? "*" : this.value1,
                isp: this.value3 == "" ? "*" : this.value3,
                time_unit: this.common.timeUnit(startTime, endTime),
                pageNo: this.currentPage - 1,
                pageSize: 10
            }
            accelerate_flow_table(param).then(res => {

                if (res.status == 0) {
                    this.total_cnt = res.data.totalCnt
                    let temp = []
                    temp = res.data.tableList
                    for (var i = 0; i < temp.length; i++) {
                        temp[i].timeStamp = this.common.getTimess(temp[i].timeStamp * 1000)
                    }
                    this.tableData = temp

                }

            }).catch(error => {
                console.log(error)
            })

        },

        //加速流量柱状体
        queryAccelerate() {
            let startTime = 0
            let endTime = 0
            if (this.valueTime) {
                if (this.valueTime == "") {
                    startTime = 1575879164
                    endTime = 1575879364
                } else {
                    endTime = Math.floor(this.valueTime[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime[0].getTime() / 1000)
                }

            } else {
                startTime = 1575879164
                endTime = 1575879364
            }
            let param = {
                start_ts: startTime,
                end_ts: endTime,
                chanId: this.value2 == "" ? "*" : this.value2,
                fileName: this.value4 == "" ? "*" : this.value4,
                region: this.value1 == "" ? "*" : this.value1,
                isp: this.value3 == "" ? "*" : this.value3,
                time_unit: this.common.timeUnit(startTime, endTime)
            }
            accelerate_flow(param).then(res => {

                if (res.status == 0) {
                    this.AccelerateX = res.data.streamArray
                    let temp = []
                    temp = res.data.timeArray
                    for (var i = 0; i < temp.length; i++) {
                        temp[i] = this.common.getTimes(temp[i] * 1000)
                    }

                    this.AccelerateY = temp

                    setTimeout(this.drawLine(this.AccelerateX, this.AccelerateY), 0)
                    // this.drawLine(this.AccelerateX,this.AccelerateY);
                }

            }).catch(error => {
                console.log(error)
            })

        },
        //回源统计柱状图
        queryBacksource() {
            let startTime = 0
            let endTime = 0
            if (this.valueTime2) {
                if (this.valueTime2 == "") {
                    startTime = 1575879164
                    endTime = 1575879364
                } else {
                    endTime = Math.floor(this.valueTime2[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime2[0].getTime() / 1000)
                }

            } else {
                startTime = 1575879164
                endTime = 1575879364
            }
            let param = {
                start_ts: startTime,
                end_ts: endTime,
                chanId: this.value6 == "" ? "*" : this.value6,
                fileName: this.value8 == "" ? "*" : this.value8,
                region: this.value5 == "" ? "*" : this.value5,
                isp: this.value7 == "" ? "*" : this.value7,
                time_unit: this.common.timeUnit(startTime, endTime),
            }
            backsource_flow(param).then(res => {

                if (res.status == 0) {
                    this.BacksourceX = res.data.streamArray
                    let temp = []
                    temp = res.data.timeArray
                    for (var i = 0; i < temp.length; i++) {
                        temp[i] = this.common.getTimes(temp[i] * 1000)
                    }
                    this.BacksourceY = temp

                    setTimeout(this.drawLine1(this.BacksourceX, this.BacksourceY), 0)
                    // this.drawLine(this.AccelerateX,this.AccelerateY);
                }

            }).catch(error => {
                console.log(error)
            })

        },
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
            if (tab.index == 0) {
                this.queryAccelerate()
                this.querySelectAccelerate()
                this.queryAccelerateTable()

            } else {
                this.queryBacksource()
                this.querySelectBacksource()

            }
        },
        drawLine(x, y) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            window.onresize = myChart.resize;
            // 绘制图表
            let options = {
                title: {
                    text: "资源监控"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                xAxis: {
                    data: y,
                    
                },
                color: "#297AFF",
                yAxis: {},
                series: [{
                    name: "流量",
                    type: "bar",
                    data: x,
                    barWidth: 30
                }]
            };
            myChart.setOption(options);
        },
        drawLine1(x, y) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart1"));
            window.onresize = myChart.resize;
            // 绘制图表
            let options = {
                title: {
                    text: "回源统计"
                },
                color: "#297AFF",
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                xAxis: {
                    data: y
                },
                yAxis: {},
                series: [{
                    name: "流量",
                    type: "bar",
                    data: x,
                    barWidth: 30
                }]
            };
            myChart.setOption(options);
        }
    },
    components: {
        fenye
    }
};
</script>

<style lang="scss">
.myself-container {
    width: 100%;
    //min-width: 1600px;

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
