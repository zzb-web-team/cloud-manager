<template>
<section class="myself-container content content-active">
    <div class="user-title" style="display: flex;flex-flow: column;margin-top:0px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>节点数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a>节点应用统计</a>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div style="margin-top:35px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="PV/UV" name="first">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;">
                        <el-select v-model="value1" placeholder="区域" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value2" placeholder="渠道ID" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options2" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value3" placeholder="运营商" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options3" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value4" placeholder="文件名称" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options4" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="valueActive" placeholder="时间粒度" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in optionsActive" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-date-picker style="margin-left:10px;" v-model="valueTime1" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="onsubmitPv">确定</el-button>
                    </div>
                    <el-row style="margin-top:20px;">
                        <el-col :span="5">
                            <div class="user-item" style="text-align:center;background: #ffffff; ">
                                <div class="item-count">访问总数（PV）</div>
                                <div class="item-text">{{totalPV}}次</div>
                            </div>
                        </el-col>
                        <el-col :span="5" style="margin-left:30px;">
                            <div class="user-item" style="text-align:center;background: #ffffff;">
                                <div class="item-count">独立IP访问数（UV）</div>
                                <div class="item-text">{{totalUV}}次</div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="device_form" >
                        <div id="myChart" style="margin: 0 auto;" :style="{width: '1900px', height: '300px'}"></div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="地区" name="second">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;">
                        <el-select v-model="value6" placeholder="渠道ID" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options6" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value7" placeholder="运营商" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options7" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value8" placeholder="文件名称" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options8" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-date-picker style="margin-left:10px;" v-model="valueTime2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="onsubmitReg">确定</el-button>
                    </div>
                    <div class="device_form" style>
                        <div id="myChart1" style="margin: 0 auto;" :style="{width: '1900px', height: '300px'}"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;">用户访问区域分布</el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tablecdn" border style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column prop="region" label="区域"></el-table-column>
                                    <el-table-column prop="accessCnt" label="总流量"></el-table-column>
                                    <el-table-column prop="accessPercent" label="流量占比"></el-table-column>
                                    <el-table-column prop="timessa" label="访问次数"></el-table-column>
                                    <el-table-column prop="timessa" label="访问占比"></el-table-column>
                                    <el-table-column prop="timessa" label="平均响应时间"></el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="运营商" name="there">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;">
                        <el-select v-model="value9" placeholder="区域" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options9" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value10" placeholder="渠道ID" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options10" :key="item" :label="item" :value="item"></el-option>
                        </el-select>

                        <el-select v-model="value12" placeholder="文件名称" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options12" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-date-picker style="margin-left:10px;" v-model="valueTime3" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="onsubmitIsp">确定</el-button>
                    </div>
                    <div class="device_form" style>
                        <div id="myChart3" style="margin: 0 auto;" :style="{width: '1900px', height: '300px'}"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;">访问数量运营商对比</el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tablecdn1" border style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column prop="isp" label="运营商"></el-table-column>
                                    <el-table-column prop="accessCnt" label="总流量"></el-table-column>
                                    <el-table-column prop="accessPercent" label="流量占比"></el-table-column>
                                    <el-table-column prop="timessa" label="访问次数"></el-table-column>
                                    <el-table-column prop="timessa" label="访问占比"></el-table-column>
                                    <el-table-column prop="timessa" label="平均响应时间"></el-table-column>

                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="播放统计" name="four">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;">
                        <el-select v-model="value13" placeholder="区域" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options13" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value14" placeholder="渠道ID" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options14" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value15" placeholder="运营商" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options15" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="value16" placeholder="文件名称" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in options16" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-select v-model="valueActive" placeholder="时间粒度" style="width: 10%;margin-right: 10px;">
                            <el-option v-for="item in optionsActive" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        <el-date-picker style="margin-left:10px;" v-model="valueTime4" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="onsubmitPlay">确定</el-button>
                    </div>
                    <div class="device_form" style>
                        <div id="myChart2" style="margin: 0 auto;" :style="{width: '1900px', height: '300px'}"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;">播放次数</el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tablecdn3" border style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column prop="fileId" label="视频ID"></el-table-column>
                                    <el-table-column prop="fileName" label="视频名称"></el-table-column>
                                    <el-table-column prop="fileSize" label="文件大小"></el-table-column>
                                    <el-table-column prop="accessDataFlow" label="播放流量"></el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                        <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :currentPage="currentPage" :pagesa="total_cnt"></fenye>

                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</section>
</template>

<script>
import echarts from "echarts";
import {
    pv_uv_query_conditions,
    region_query_conditions,
    isp_query_conditions,
    query_playtimes_conditions,
    pv_uv_curve,
    query_topregion_accesscnt_curve,
    query_topisp_accesscnt_curve,
    query_playtimes_curve,
    query_playdata_table

} from '../../servers/api'
import common from '../../comm/js/util'
import fenye from "@/components/fenye";

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
            options9: [],
            options10: [],
            options11: [],
            options12: [],
            options13: [],
            options14: [],
            options15: [],
            options16: [],
            optionsActive: ["120", "5", "10"],
            valueActive: "",
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
            value11: "",
            value12: "",
            value13: "",
            value14: "",
            value15: "",
            value16: "",
            totalPV: 0,
            totalUV: 0,
            regionX: [],
            regionY: [],
            ispX: [],
            ispY: [],
            playX: [],
            playY: [],
            valueTime1: "",
            valueTime2: "",
            valueTime3: "",
            valueTime4: "",
            tablecdn: [],
            tablecd1: [],
            tablecd2: [],
            tablecdn1: [],
            tablecdn3: [],
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
            }],
            pvX: [],
            pvY: [],
            uvX: [],
            currentPage: 1,
            pagesize: 10,
            total_cnt: 0,
        };
    },
    mounted() {
        this.queryPvInfo()
        // this.queryRegion()

        //
        this.queryPvEchars()
        // this.queryTopregionEchars()

        // this.drawLine();
        // this.drawLine1();
        // this.drawLine2();
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
            this.queryPlayTable()
            //this.getdata();
        },
        //获取每页数量
        handleSizeChange(pagetol) {
            this.currentPage = pagetol;
            //this.getdata();
        },

        //PV条件查询
        queryPvInfo() {
            let param = {
                chanId: "*"
            }
            pv_uv_query_conditions(param).then(res => {
                if (res.status == 0) {
                    this.options1 = res.data.regionSet
                    this.options2 = res.data.chanIdSet
                    this.options3 = res.data.ispSet
                    this.options4 = res.data.fileNameSet

                }
            }).catch(error => {

            })
        },
        //搜索确认按钮
        onsubmitPv() {
            this.queryPvEchars()

        },
        onsubmitPlay() {
            this.queryPlayEchars()
            this.queryPlayTable()
        },
        onsubmitReg() {
            this.queryTopregionEchars()
        },
        onsubmitIsp() {
            this.queryTopispEchars()

        },
        //PV曲线图
        queryPvEchars() {
            let startTime = 0
            let endTime = 0
            if (this.valueTime1) {
                if (this.valueTime1 == "") {
                    startTime = 1575879164
                    endTime = 1575879364
                } else {
                    endTime = Math.floor(this.valueTime1[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime1[0].getTime() / 1000)
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
                time_unit: this.common.timeUnit(startTime, endTime),
            }
            pv_uv_curve(param).then(res => {

                if (res.status == 0) {
                    this.pvX = res.data.pvArray
                    this.uvX = res.data.uvArray
                    this.totalPV = res.data.totalPV
                    this.totalUV = res.data.totalUV
                    let temp = []
                    temp = res.data.timeArray
                    for (var i = 0; i < temp.length; i++) {
                        temp[i] = this.common.getTimess(temp[i] * 1000)
                    }
                    this.pvY = temp
                    setTimeout(this.drawLine(this.pvX, this.pvY, this.uvX), 0)
                    // this.drawLine(this.AccelerateX,this.AccelerateY);
                }

            }).catch(error => {
            })

        },
        //地区条件查询
        queryRegion() {
            let param = {
                chanId: "*"
            }
            region_query_conditions(param).then(res => {
                if (res.status == 0) {
                    this.options5 = res.data.regionSet
                    this.options6 = res.data.chanIdSet
                    this.options7 = res.data.ispSet
                    this.options8 = res.data.fileNameSet

                }
            }).catch(error => {

            })
        },
        //地区曲线图和表格
        queryTopregionEchars() {
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
                isp: this.value7 == "" ? "*" : this.value7,
                top: 10
            }
            query_topregion_accesscnt_curve(param).then(res => {

                if (res.status == 0) {
                    this.tablecdn = res.data.accessCntTable
                    this.regionX = res.data.regionArray
                    this.regionY = res.data.accessCntArray
                    setTimeout(this.drawLine1(this.regionY, this.regionX), 0)
                    // this.drawLine(this.AccelerateX,this.AccelerateY);
                }

            }).catch(error => {
            })

        },
        //运营商条件查询
        queryIsp() {
            let param = {
                chanId: "*"
            }
            isp_query_conditions(param).then(res => {
                if (res.status == 0) {
                    this.options9 = res.data.regionSet
                    this.options10 = res.data.chanIdSet
                    this.options11 = res.data.ispSet
                    this.options12 = res.data.fileNameSet

                }
            }).catch(error => {

            })
        },
        //运营商曲线图和表格
        queryTopispEchars() {
            let startTime = 0
            let endTime = 0
            if (this.valueTime3) {
                if (this.valueTime3 == "") {
                    startTime = 1575879164
                    endTime = 1575879364
                } else {
                    endTime = Math.floor(this.valueTime3[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime3[0].getTime() / 1000)
                }

            } else {
                startTime = 1575879164
                endTime = 1575879364
            }
            let param = {
                start_ts: startTime,
                end_ts: endTime,
                chanId: this.value10 == "" ? "*" : this.value10,
                fileName: this.value12 == "" ? "*" : this.value12,
                region: this.value9 == "" ? "*" : this.value9,
                top: 10
            }
            query_topisp_accesscnt_curve(param).then(res => {

                if (res.status == 0) {
                    this.tablecdn1 = res.data.accessCntTable
                    this.ispX = res.data.accessCntArray
                    this.ispY = res.data.ispArray
                    setTimeout(this.drawLine3(this.ispX, this.ispY), 0)
                    // this.drawLine(this.AccelerateX,this.AccelerateY);
                }

            }).catch(error => {
            })

        },
        //
        //播放次数条件查询
        queryPlayTimes() {
            let param = {
                chanId: "*"
            }
            query_playtimes_conditions(param).then(res => {
                if (res.status == 0) {
                    this.options13 = res.data.regionSet
                    this.options14 = res.data.chanIdSet
                    this.options15 = res.data.ispSet
                    this.options16 = res.data.fileNameSet
                }
            }).catch(error => {

            })
        },
        //播放次数曲线
        queryPlayEchars() {
            let startTime = 0
            let endTime = 0
            if (this.valueTime4) {
                if (this.valueTime4 == "") {
                    startTime = 1575879164
                    endTime = 1575879364
                } else {
                    endTime = Math.floor(this.valueTime4[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime4[0].getTime() / 1000)
                }
            } else {
                startTime = 1575879164
                endTime = 1575879364
            }
            let param = {
                start_ts: startTime,
                end_ts: endTime,
                chanId: this.value14 == "" ? "*" : this.value14,
                fileName: this.value16 == "" ? "*" : this.value16,
                isp: this.value15 == "" ? "*" : this.value15,
                region: this.value13 == "" ? "*" : this.value13,
                time_unit: this.common.timeUnit(startTime, endTime),

            }
            query_playtimes_curve(param).then(res => {
                if (res.status == 0) {
                    this.playX = res.data.playTimesArray
                    let temp = []
                    temp = res.data.timeArray
                    for (var i = 0; i < temp.length; i++) {
                        temp[i] = this.common.getTimess(temp[i] * 1000)
                    }
                    this.playY = temp

                    setTimeout(this.drawLine2(this.playX, this.playY), 0)
                    // this.drawLine(this.AccelerateX,this.AccelerateY);
                }

            }).catch(error => {
            })

        },
        //播放次数表格
        queryPlayTable() {
            let startTime = 0
            let endTime = 0
            if (this.valueTime4) {
                if (this.valueTime4 == "") {
                    startTime = 1575879164
                    endTime = 1575879364
                } else {
                    endTime = Math.floor(this.valueTime4[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime4[0].getTime() / 1000)
                }
            } else {
                startTime = 1575879164
                endTime = 1575879364
            }
            let param = {
                start_ts: startTime,
                end_ts: endTime,
                chanId: this.value14 == "" ? "*" : this.value14,
                fileName: this.value16 == "" ? "*" : this.value16,
                isp: this.value15 == "" ? "*" : this.value15,
                region: this.value13 == "" ? "*" : this.value13,
                // time_unit: this.valueActive == "" ? 120 : parseInt(this.valueActive)
                pageNo: this.currentPage - 1,
                pageSize: 10,

            }
            query_playdata_table(param).then(res => {
                if (res.status == 0) {
                    this.tablecdn3 = res.data.fileList

                }

            }).catch(error => {
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
        handleClick(tab, index) {
            if (tab.index == 0) {
                this.queryPvInfo()
                this.queryPvEchars()
            } else if (tab.index == 1) {
                this.queryRegion()
                this.queryTopregionEchars()
            } else if (tab.index == 2) {

                this.queryIsp()
                this.queryTopispEchars()
            } else if (tab.index == 3) {
                this.queryPlayEchars()
                this.queryPlayTable()
                this.queryPlayTimes()
            }
        },
        drawLine(x, y, z) {
        
            var arra = [];
            var arrb = [];
            var arrz = [];
            for (let i in x) {
                arra.push(x[i] / 1024); //属性
                //arr.push(obj[i]); //值
            }
            for (let i in z) {
                arrb.push(z[i] / 1024); //属性
                //arr.push(obj[i]); //值
            }
            for (let i in y) {
                arrz.push(y[i]); //属性
                //arr.push(obj[i]); //值
            }
         

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            window.onresize = myChart.resize;
            // 绘制图表
            let options = {
                title: {
                    text: "PV/UV",
                    left: "center"
                },
                // tooltip: {
                //     trigger: "item",
                //     formatter: "{a} <br/>{b} : {c}"
                // },
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
                    data: arrz
                },

                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                yAxis: {
                    type: "value",
                    name: "pv/uv",
                },
                series: [{
                        name: "uv",
                        type: "line",
                        smooth: true,
                        data: arrb
                    },
                    {
                        name: "pv",
                        type: "line",
                        smooth: true,
                        data: arra
                    }
                ]
            };
            myChart.setOption(options);
        },
        drawLine1(aaa, bbb) {
            var arra = [];
            var arrb = [];
            for (let i in aaa) {
                arra.push(aaa[i]); //属性
                //arr.push(obj[i]); //值
            }
            for (let i in bbb) {
                arrb.push(bbb[i]); //属性
                //arr.push(obj[i]); //值
            }
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart1"));
            window.onresize = myChart.resize;
            // 绘制图表
            let options = {
                title: {
                    text: "地区和运营商"
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
                    data: arrb
                },
                color: "#297AFF",
                yAxis: {},
                series: [{
                    name: "次",
                    type: "bar",
                    barWidth: 30,
                    data: arra
                }]
            };
            myChart.setOption(options);
        },

        drawLine3(aaa, bbb) {
            var arra = [];
            var arrb = [];
            for (let i in aaa) {
                arra.push(aaa[i]); //属性
                //arr.push(obj[i]); //值
            }
            for (let i in bbb) {
                arrb.push(bbb[i]); //属性
                //arr.push(obj[i]); //值
            }
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart3"));
            window.onresize = myChart.resize;
            // 绘制图表
            let options = {
                title: {
                    text: "地区和运营商"
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
                    data: arrb
                },
                color: "#297AFF",
                yAxis: {},
                series: [{
                    name: "次",
                    type: "bar",
                    barWidth: 30,
                    data: arra
                }]
            };
            myChart.setOption(options);
        },

        drawLine2(x, y) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("myChart2"));
            window.onresize = myChart.resize;
            // 绘制图表
            let option = {
                xAxis: {
                    type: "category",
                    data: y
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
                yAxis: {
                    type: "value"
                },
                series: [{
                    data: x,
                    type: "line",
                    name: "次",
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
.content-active{
.el-tabs__nav-wrap{
    background: #ffffff;
}
}

</style>
