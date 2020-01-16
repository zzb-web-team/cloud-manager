<template>
<section class="myself-container content">
    <div class="top_title">统计分析</div>
    <!-- <div class="user-title" style="display: flex;flex-flow: column;width: 1240px;margin: auto;"> -->
    <div class="user-title">
        <div class="statisics_con">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="PV/UV" name="first">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
                        <el-select v-model="value1Active" placeholder="渠道ID" style="width: 10%;margin-right: 10px;" @change="getdata()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in options1Active" :key="index" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="value_a1" placeholder="视频名称" style="width: 10%;margin-right: 10px;" @change="getdata()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsa1" :key="index + '_a'" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="value_a2" placeholder="区域" style="width: 10%;margin-right: 10px;" @change="getdata()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsa2" :key="index + '_b'" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="value_a3" placeholder="运营商" style="width: 10%;margin-right: 10px;" @change="getdata()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsa3" :key="index + '_c'" :label="item.label" :value="item.label"></el-option>
                        </el-select>

                        <el-button-group>
                            <el-button v-show="!shoudzy" @click="today(0)">今天</el-button>
                            <el-button v-show="!shoudzy" @click="yesterday(0)">昨天</el-button>
                            <el-button v-show="!shoudzy" @click="sevendat(0)">近7天</el-button>
                            <el-button v-show="!shoudzy" @click="thirtyday(0)">近30天</el-button>
                            <el-button @click="showzdy">自定义<i class="el-icon-date"></i></el-button>
                        </el-button-group>
                        <el-date-picker v-show="shoudzy" style="margin-left:10px;" v-model="val2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="seachtu(0)">查询</el-button>
                    </div>

                    <div class="user_item">
                        <div class="item_left">
                            <div class="item_text">总访问次数(pv)</div>
                            <div class="item_count">
                                <span>{{ totalPV }}</span>GB
                            </div>
                        </div>
                        <div class="item_right">
                            <div class="item_text">独立IP访问数(pv)</div>
                            <div class="item_count">
                                <span>{{ totalUV }}</span>MB/s
                            </div>
                        </div>
                    </div>
                    <div class="device_form">
                        <div id="myChart" :style="{ height: '607px' }"></div>
                    </div>
                    <!-- <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24" style="text-align:left;    font-weight: bold;">IP流量平均利用率表</el-col>
              </el-row>
            </div>-->
                </el-tab-pane>

                <el-tab-pane label="地区和运营商" name="second">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
                        <el-select v-model="value1Active" placeholder="渠道ID" style="width: 10%;margin-right: 10px;" @change="getdata1()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in options1Active" :key="index" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="value_b2" placeholder="视频名称" style="width: 10%;margin-right: 10px;" @change="getdata1()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsb2" :key="'1' + index" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-show="activeDq" v-model="value_b3" placeholder="运营商" style="width: 10%;margin-right: 10px;" @change="getdata1()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsb3" :key="'2' + index" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                          <el-select v-show="activeGys" v-model="value_b3" placeholder="地区" style="width: 10%;margin-right: 10px;" @change="getdata1()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsb3" :key="'2' + index" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-button-group>
                            <el-button v-show="!shoudzyx" @click="today(1)">今天</el-button>
                            <el-button v-show="!shoudzyx" @click="yesterday(1)">昨天</el-button>
                            <el-button v-show="!shoudzyx" @click="sevendat(1)">近7天</el-button>
                            <el-button v-show="!shoudzyx" @click="thirtyday(1)">近30天</el-button>
                            <el-button @click="showzdyx">自定义<i class="el-icon-date"></i></el-button>
                        </el-button-group>
                        <el-date-picker v-show="shoudzyx" style="margin-left:10px;" v-model="val2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="seachtu(1)">确定</el-button>
                    </div>
                    <div class="device_form" style>
                        <el-button-group>
                            <el-button @click="goarea()">地区</el-button>
                            <el-button @click="gosupplier()">供应商</el-button>
                        </el-button-group>
                        <div id="myChart1" :style="{ height: '607px' }"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;    font-weight: bold;padding-left:10px;">IP流量平均利用率表</el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tablecdn" border stripe style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column label="区域/运营商"><template slot-scope="scope">
                                            <div v-if="scope.row.region">
                                                {{ scope.row.region }}
                                            </div>
                                            <div v-else>{{ scope.row.isp }}</div>
                                        </template></el-table-column>
                                    <el-table-column label="访问次数">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.accessCnt }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="占比">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.accessPercent }}</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="播放统计" name="there">
                    <div style="display: flex;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
                        <el-select v-model="value1Active" placeholder="渠道ID" style="width: 10%;margin-right: 10px;" @change="getdata()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in options1Active" :key="index" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="value_c1" placeholder="视频名称" style="width: 10%;margin-right: 10px;" @change="getdata2()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsc1" :key="index + 'a'" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="value_c2" placeholder="区域" style="width: 10%;margin-right: 10px;" @change="getdata2()">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsc2" :key="index + 'label'" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-select v-model="value_c3" placeholder="运营商" style="width: 10%;margin-right: 10px;">
                            <el-option label="全部" value="*"></el-option>
                            <el-option v-for="(item, index) in optionsc3" :key="index + '_label'" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                        <el-button-group>
                            <el-button v-show="!shoudzyz" @click="today(2)">今天</el-button>
                            <el-button v-show="!shoudzyz" @click="yesterday(2)">昨天</el-button>
                            <el-button v-show="!shoudzyz" @click="sevendat(2)">近7天</el-button>
                            <el-button v-show="!shoudzyz" @click="thirtyday(2)">近30天</el-button>
                            <el-button @click="showzdyz">自定义<i class="el-icon-date"></i></el-button>
                        </el-button-group>
                        <el-date-picker v-show="shoudzyz" style="margin-left:10px;" v-model="val2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
                        <el-button style="margin-left:10px;" type="primary" @click="seachtu(2)">确定</el-button>
                    </div>
                    <div class="device_form" style>
                        <div id="myChart2" :style="{ height: '607px' }"></div>
                    </div>
                    <div class="devide_table">
                        <el-row type="flex" class="row_active">
                            <el-col :span="24" style="text-align:left;font-weight: bold;padding-left:10px;">IP流量平均利用率表</el-col>
                        </el-row>
                        <el-row type="flex" class="row_active">
                            <el-col :span="24">
                                <el-table :data="tablecdn2" border stripe style="width: 100%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                                    <el-table-column label="视频ID"><template slot-scope="scope">
                                            <div>{{ scope.row.fileId }}</div>
                                        </template></el-table-column>
                                    <el-table-column label="视频名称">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.fileName }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="文件大小">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.fileSize | aaa }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="访问流量">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.accessDataFlow | aaa }}</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <fenye style="float:right;margin:10px 0 20px 0;" @fatherMethod="getpage" @fathernum="gettol" :pagesa="total_cnt"></fenye>
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
import {
    dateToMs,
    getymdtime
} from "../../servers/sevdate";
import fenye from "@/components/fenye";
import {
    pv_uv_query_conditions,
    pv_uv_curve,
    region_query_conditions,
    query_topregion_accesscnt_curve,
    isp_query_conditions,
    query_topisp_accesscnt_curve,
    query_playtimes_conditions,
    query_playtimes_curve,
    query_playdata_table
} from "../../servers/api";
import echarts from "echarts";
import common from '../../comm/js/util'

export default {
    data() {
        return {
          activeDq:true,
          activeGys:false,
            shoudzy: false,
            shoudzyx: false,
            shoudzyz: false,
            value1Active: "",
            options1Active: [],
            optionsa1: [],
            optionsa2: [],
            optionsa3: [],
            optionsb1: [],
            optionsb2: [],
            optionsb3: [],
            optionsc1: [],
            optionsc2: [],
            optionsc3: [],
            value_a1: "",
            value_a2: "",
            value_a3: "",
            value_b1: "",
            value_b2: "",
            value_b3: "",
            value_c1: "",
            value_c2: "",
            value_c3: "",
            pageSize: 10, //煤业
            pageNo: 1, //页码
            total_cnt: 1, //数据总量
            tablecdn: [],
            tablecdn2: [],
            activeName: "first",
            totalPV: 0,
            totalUV: 0,
            twob: false,
            pickerOptions: {
                shortcuts: [{
                        text: "昨天",
                        onClick(picker) {
                            const end = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            const start =
                                new Date(new Date(new Date().toLocaleDateString()).getTime()) -
                                3600 * 1000 * 24 * 1;
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "今天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ],
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            val2: [],
            starttime: "",
            endtime: "",
            timeUnit: 60,
            chanid: "",
            uvArray: [], //图一y1
            pvArray: [], //图一y2
            timeArray: [], //图一x
            playTimesArray1: [], //图二y
            timeArray1: [], //图二x
            playTimesArray2: [], //图三y
            timeArray2: [] //图三x
        };
    },
    filters: {
        setthtim(data) {
            var stat = getymdtime(data);
            return stat;
        },
        aaa(data) {
            var liu = (data / 1024 / 1024 / 1024).toFixed(4);
            return liu;
        }
    },
    components: {
        fenye
    },
    mounted() {
        // if (this.$cookies.get("id")) {
        //   this.chanid = this.$cookies.get("id") * 1;
        // } else {
        //   this.$router.push({ path: "/" });
        // }
        this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = Date.parse(new Date()) / 1000;

        this.getseach(0);
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
        getpage(pages) {
            this.pageNo = pages;
            this.gettable();
        },
        //获取每页数量
        gettol(pagetol) {
            this.pagesize = pagetol;
            // this.getuserlist();
        },
        getdata() {
            this.getseach(0);
        },
        getdata1() {
            this.getseach(1);
        },
        getdata2() {
            this.getseach(3);
        },
        //请求数据--查询条件
        getseach(data) {
            this.val2 = [];
            let params = new Object();
            params.chanId = "*";
            if (data == 0) {
                //pv/uv
                this.optionsa1 = [];
                this.optionsa2 = [];
                this.optionsa3 = [];
                pv_uv_query_conditions(params)
                    .then(res => {
                        res.data.fileNameSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsa1.push(obj);
                        });
                        res.data.regionSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsa2.push(obj);
                        });
                        res.data.ispSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsa3.push(obj);
                        });
                        res.data.chanIdSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.options1Active.push(obj);
                        });
                        this.getcure(0);
                    })
                    .catch(err => {});
            } else if (data == 1) {
                //地区
                // this.optionsb1 = [];
                this.activeDq=true
                this.activeGys=false
                this.optionsb2 = [];
                this.optionsb3 = [];
                region_query_conditions(params)
                    .then(res => {
                        if (res.data.ispSet.length == 0 || res.data.fileNameSet == 0) {
                            return false;
                        }
                        res.data.fileNameSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsb2.push(obj);
                        });
                        res.data.ispSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsb3.push(obj);
                        });
                        this.getcure(1);
                    })
                    .catch(err => {});
            } else if (data == 2) {
                //运营商
                    //    alert("运营商")
                          this.activeDq=false
                this.activeGys=true
                // this.optionsb1 = [];
                this.optionsb2 = [];
                this.optionsb3 = [];
                isp_query_conditions(params)
                    .then(res => {
                        if (res.data.regionSet.length == 0 || res.data.fileNameSet == 0) {
                            return false;
                        }
                        res.data.regionSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsb3.push(obj);
                        });
                        res.data.fileNameSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsb2.push(obj);
                        });

                        this.getcure(2);
                    })
                    .catch(err => {});
            } else {
                //播放统计
                this.optionsc1 = [];
                this.optionsc2 = [];
                this.optionsc3 = [];
                query_playtimes_conditions(params)
                    .then(res => {
                        res.data.fileNameSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsc1.push(obj);
                        });
                        res.data.regionSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsc2.push(obj);
                        });
                        res.data.ispSet.forEach((item, index) => {
                            let obj = {};
                            obj.label = item;
                            obj.value = index;
                            this.optionsc3.push(obj);
                        });
                        this.getcure(3);
                    })
                    .catch(err => {});
            }
        },
        //请求数据--曲线图
        getcure(data) {
            let params = new Object();
            params.chanId = this.chanid + "";
            params.start_ts = this.starttime;
            params.end_ts = this.endtime;
            params.time_unit = this.timeUnit;
            if (data == 0) {
                if (this.value_a1) {
                    params.fileName = this.value_a1;
                } else {
                    params.fileName = "*";
                }
                if (this.value_a2) {
                    params.region = this.value_a2;
                } else {
                    params.region = "*";
                }
                if (this.value_a3) {
                    params.isp = this.value_a3;
                } else {
                    params.isp = "*";
                }

                if (this.value1Active !== "") {
                    params.chanId = this.value1Active;
                } else {
                    params.chanId = "*";
                }
                this.uvArray = [];
                this.pvArray = [];
                this.timeArray = [];
                // params.time_unit = this.common.timeUnit(this.starttime, this.endtime),
                            params.time_unit=Math.ceil((this.endtime-this.starttime)/60/12)

                    pv_uv_curve(params)
                    .then(res => {
                        if (res.data.uvArray) {
                            res.data.uvArray.forEach((item, index) => {
                                this.uvArray.push(Math.floor(item));
                            });
                        }
                        if (res.data.pvArray) {
                            res.data.pvArray.forEach((item, index) => {
                                this.pvArray.push(Math.floor(item));
                            });
                        }
                        res.data.timeArray.forEach((item, index) => {
                            this.timeArray.push(getymdtime(item));
                        });
                        this.drawLine();
                    })
                    .catch(err => {});
            } else if (data == 1 || data == 2) {
                this.tablecdn = [];
                if (this.value_b1) {
                    params.fileName = this.value_b1;
                } else {
                    params.fileName = "*";
                }
                if (this.value_b2) {
                    params.region = this.value_b2;
                } else {
                    params.region = "*";
                }
                if (this.value_b3) {
                    params.isp = this.value_b3;
                } else {
                    params.isp = "*";
                }
                if (this.value1Active !== "") {
                    params.chanId = this.value1Active;
                } else {
                    params.chanId = "*";
                }
                params.top = 10;
                // params.time_unit = this.common.timeUnit(this.starttime, this.endtime)
                            params.time_unit=Math.ceil((this.endtime-this.starttime)/60/12)


                if (data == 1) {
                    this.playTimesArray1 = [];
                    this.timeArray1 = [];
                    query_topregion_accesscnt_curve(params)
                        .then(res => {
                            this.playTimesArray1 = res.data.accessCntArray;
                            this.timeArray1 = res.data.regionArray;
                            this.drawLine1();
                            this.tablecdn = res.data.accessCntTable;
                            this.totalPV = res.data.totalPV;
                            this.totalUV = res.data.totalUV;
                        })
                        .catch(err => {});
                } else {
                    this.playTimesArray1 = [];
                    this.timeArray1 = [];
                    query_topisp_accesscnt_curve(params)
                        .then(res => {
                            this.playTimesArray1 = res.data.accessCntArray;
                            this.timeArray1 = res.data.ispArray;
                            this.drawLine1();
                            this.tablecdn = res.data.accessCntTable;
                        })
                        .catch(err => {});
                }
            } else {
                if (this.value_c1) {
                    params.fileName = this.value_c1;
                } else {
                    params.fileName = "*";
                }
                if (this.value_c2) {
                    params.region = this.value_c2;
                } else {
                    params.region = "*";
                }
                if (this.value_c3) {
                    params.isp = this.value_c3;
                } else {
                    params.isp = "*";
                }
                if (this.value1Active !== "") {
                    params.chanId = this.value1Active;
                } else {
                    params.chanId = "*";
                }
                this.playTimesArray2 = [];
                this.timeArray2 = [];
                // params.time_unit = this.common.timeUnit(this.starttime, this.endtime)
                            params.time_unit=Math.ceil((this.endtime-this.starttime)/60/12)


                query_playtimes_curve(params)
                    .then(res => {
                        this.playTimesArray2 = res.data.playTimesArray;
                        res.data.timeArray.forEach((item, index) => {
                            this.timeArray2.push(getymdtime(item));
                        });
                        this.gettable();
                        this.drawLine2();
                    })
                    .catch(err => {});
            }
        },
        //请求数据--表格
        gettable() {
            this.tablecdn2 = [];
            let params = new Object();
            // params.chanId = this.chanid + "";
            params.start_ts = this.starttime;
            params.end_ts = this.endtime;
            params.pageNo = this.pageNo - 1;
            params.pageSize = this.pageSize;
            if (this.value_c1) {
                params.fileName = this.value_c1;
            } else {
                params.fileName = "*";
            }
            if (this.value_c2) {
                params.region = this.value_c2;
            } else {
                params.region = "*";
            }
            if (this.value_c3) {
                params.isp = this.value_c3;
            } else {
                params.isp = "*";
            }
            if (this.value1Active !== "") {
                params.chanId = this.value1Active;
            } else {
                params.chanId = "*";
            }
            query_playdata_table(params)
                .then(res => {
                    if (res.status == 0) {
                        this.tablecdn2 = res.data.fileList;
                        this.total_cnt = res.data.totalCnt;
                    }
                })
                .catch(err => {});
        },
        //自定义时间确定按钮
        seachtu(data) {
            if (data == 0) {
                this.getseach(0);
            } else if (data == 1) {
                this.getseach(1);
            } else {
                this.getseach(3);
            }
        },
        //自定义时间显示
        showzdy() {
            this.shoudzy = !this.shoudzy;
        },
        showzdyx() {
            this.shoudzyx = !this.shoudzyx;
        },
        showzdyz() {
            this.shoudzyz = !this.shoudzyz;
        },
        //今天
        today(data) {
            let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
            this.starttime = times;
            this.endtime = Date.parse(new Date()) / 1000;
            this.timeUnit = 60;
            if (data == 0) {
                this.getseach(0);
            } else if (data == 1) {
                this.getseach(1);
            } else {
                this.getseach(3);
            }
        },
        //昨天
        yesterday(data) {
            let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
            this.starttime = times - 24 * 60 * 60 * 1;
            this.endtime = times;
            this.timeUnit = 60;
            if (data == 0) {
                this.getseach(0);
            } else if (data == 1) {
                this.getseach(1);
            } else {
                this.getseach(3);
            }
        },
        //七天
        sevendat(data) {
            let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
            this.starttime = times - 24 * 60 * 60 * 7;
            this.endtime = times;
            this.timeUnit = 60 * 24;
            if (data == 0) {
                this.getseach(0);
            } else if (data == 1) {
                this.getseach(1);
            } else {
                this.getseach(3);
            }
        },
        //三十天
        thirtyday(data) {
            let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
            this.starttime = times - 24 * 60 * 60 * 30;
            this.endtime = times;
            this.timeUnit = 60 * 24;
            if (data == 0) {
                this.getseach(0);
            } else if (data == 1) {
                this.getseach(1);
            } else {
                this.getseach(3);
            }
        },
        //自定义时间-确定
        gettimes(cal) {
            this.starttime = dateToMs(this.val2[0]);
            this.endtime = dateToMs(this.val2[1]);
            if (this.endtime - this.starttime < 21600) {
                this.timeUnit = 60;
            } else if (
                this.endtime - this.starttime >= 21600 &&
                this.endtime - this.starttime < 86400
            ) {
                this.timeUnit = 60;
            } else if (this.endtime - this.starttime >= 86400) {
                this.timeUnit = 60 * 24;
            }
        },
        //切换到地区
        goarea() {
            this.twob = false;
            this.getseach(1);
        },
        //切换到运营商
        gosupplier() {
            this.twob = true;
            this.getseach(2);
        },

        // 表头样式设置
        headClass() {
            return "text-align: center;background:#F3F6FB;";
        },
        // 表格样式设置
        rowClass() {
            return "text-align: center;";
        },
        //选项卡
        handleClick(tab, event) {
            //切换时重置时间为当前时间
            this.starttime =
                new Date(new Date().toLocaleDateString()).getTime() / 1000;
            this.endtime = Date.parse(new Date()) / 1000;
            if (tab.index == 0) {
                this.value_a1 = "";
                this.value_a2 = "";
                this.value_a3 = "";
                this.getseach(0);
            } else if (tab.index == 1) {
                this.value_b1 = "";
                this.value_b2 = "";
                this.value_b3 = "";
                this.twob = false;
                this.getseach(1);
            } else if (tab.index == 2) {
                this.value_c1 = "";
                this.value_c2 = "";
                this.value_c3 = "";
                this.getseach(3);
            }
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
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                legend: {
                    left: "left",
                    data: ["pv", "uv"]
                },
                color: ["#A7D5FF", "#BEA7FF"],
                xAxis: {
                    type: "category",
                    name: "日期",
                    splitLine: {
                        show: false
                    },
                    data: this.timeArray
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
                    min: 0
                },
                series: [{
                        name: "pv",
                        type: "line",
                        smooth: true,
                        lineStyle: {
                            color: "#A7D5FF"
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#A7D5FF"
                                    },
                                    {
                                        offset: 0.5,
                                        color: "#D0E8FF"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffffff"
                                    }
                                ])
                            }
                        }, //填充区域样式
                        data: this.uvArray
                    },
                    {
                        name: "uv",
                        type: "line",
                        smooth: true,
                        lineStyle: {
                            color: "#BEA7FF"
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#BEA7FF"
                                    },
                                    {
                                        offset: 0.5,
                                        color: "#D2D0FF"
                                    },
                                    {
                                        offset: 1,
                                        color: "#ffffff"
                                    }
                                ])
                            }
                        }, //填充区域样式
                        data: this.pvArray
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
                grid: {
                    // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
                    left: "3%", // 默认10%，给24就挺合适的。
                    top: 60, // 默认60
                    right: 35, // 默认10%
                    bottom: 60 // 默认60
                    // width: "100%", // grid 组件的宽度。默认自适应。
                    // height: "100%",
                    // containLabel:true, // grid 区域是否包含坐标轴的刻度标签。(如果true的时候，上下左右可以为0了)
                    // show:true, // 是否显示直角坐标系网格。是否显示grid，grid:show后，下面的一些参数生效。
                    // backgroundColor:'#ccac62',
                    // borderColor:"#000",
                },
                toolbox: {
                    //show: true,
                    itemSize: 20,
                    itemGap: 30,
                    right: 50,
                    feature: {
                        // dataView: { show: true },
                        saveAsImage: {
                            //excludeComponents :['toolbox'],
                            pixelRatio: 2
                        }
                    }
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
                    data: this.timeArray1
                },
                yAxis: {},
                series: [{
                    name: "流量",
                    type: "bar",
                    barWidth: 30, //柱图宽度
                    data: this.playTimesArray1
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
                title: {
                    text: "访问TOP10"
                },
                grid: {
                    // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
                    left: "3%", // 默认10%，给24就挺合适的。
                    top: 60, // 默认60
                    right: 35, // 默认10%
                    bottom: 60 // 默认60
                    // width: "100%", // grid 组件的宽度。默认自适应。
                    // height: "100%",
                    // containLabel:true, // grid 区域是否包含坐标轴的刻度标签。(如果true的时候，上下左右可以为0了)
                    // show:true, // 是否显示直角坐标系网格。是否显示grid，grid:show后，下面的一些参数生效。
                    // backgroundColor:'#ccac62',
                    // borderColor:"#000",
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
                    type: "category",
                    data: this.timeArray2
                },
                yAxis: {
                    type: "value"
                },
                series: [{
                    data: this.playTimesArray2,
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
        width: auto;
        height: auto;

        overflow: hidden;
        margin-top: 20px;
        background: #ffffff;
        padding: 15px 30px;
        box-sizing: border-box;
        box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
        border-radius: 2px;

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
        width: auto;

        height: auto;
        overflow: hidden;
        margin-top: 20px;
        background: #ffffff;
        padding: 37px;
        box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
        border-radius: 2px;

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

.user_item {
    width: auto;
    height: 130px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
    border-radius: 2px;
    margin-top: 20px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    padding: 36px 71px;

    .item_left {
        width: 49%;
        height: 58px;
        border-right: 1px solid #e6e9ed;

        .item_text {
            font-size: 14px;
            color: #333333;
        }

        .item_count {
            line-height: 55px;

            span {
                font-size: 34px;
            }
        }
    }

    .item_right {
        height: 48px;
        width: 49%;
        padding-left: 40px;

        .item_text {
            font-size: 14px;
            color: #333333;
        }

        .item_count {
            line-height: 55px;

            span {
                font-size: 34px;
            }
        }
    }
}
</style>
