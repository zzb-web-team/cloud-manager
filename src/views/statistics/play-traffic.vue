<template>
  <section class="myself-container content">
    <div class="top_title">播放流量</div>
    <div class="user-title" style="display: flex;flex-flow: column;">
      <div class="resources_con">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="P2P加速流量" name="first" :lazy="true">
            <div style="display: flex;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="value1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-select v-model="valueacce" placeholder="终端" style="width: 10%;margin-right: 10px;" @change="getdata2(1)">
                <el-option label="全部终端" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-cascader style="width: 10%;margin-right: 10px;line-height: 36px;" placeholder="区域" :options="options2" ref="cascaderAddr" :show-all-levels="false" v-model="value2" @change="getdata"></el-cascader>
              <el-select v-model="value3" placeholder="运营商" style="width: 10%;margin-right: 10px;" @change="getdata()">
                <el-option label="全部运营商" value="*"></el-option>
                <el-option v-for="(item, index) in options3" :key="item + index" :label="item.label" :value="item.label"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!shoudzyx" @click="today(1)">今天</el-button>
                <el-button v-show="!shoudzyx" @click="yesterday(1)">昨天</el-button>
                <el-button v-show="!shoudzyx" @click="sevendat(1)">近7天</el-button>
                <el-button v-show="!shoudzyx" @click="thirtyday(1)">近30天</el-button>
                <el-button @click="showzdyx">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="shoudzyx" style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;" type="primary" @click="seachtu(1)">确定</el-button>
            </div>
            <div class="device_form">
              <div id="myChartMap" :style="{ height: '607px' }"></div>
            </div>
            <div class="devide_table">
              <el-row type="flex" class="row_active">
                <el-col :span="24" style="text-align:left;font-weight: bold;padding-left: 10px;">加速流量</el-col>
              </el-row>
              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tablecdn" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="渠道ID">
                      <template slot-scope="scope">
                        <div>{{ scope.row.chanelId }}</div>
                      </template>
                    </el-table-column>

                    <el-table-column label="总流量">
                      <template slot-scope="scope">
                        <div>{{ scope.row.streamAalue |setbytes }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="时间">
                      <template slot-scope="scope">
                        <div>{{ scope.row.timeValue | settimes }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :pagesa="total_cnt"></fenye>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <el-tab-pane label="回源统计" name="second" :lazy="true">
            <div style="display: flex;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="valuea1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-select v-model="value1acce" placeholder="终端" style="width: 10%;margin-right: 10px;" @change="getdata2(2)">
                <el-option label="全部终端" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-cascader style="width: 10%;margin-right: 10px;line-height: 36px;" placeholder="区域" :options="options2" ref="cascaderAddr" :show-all-levels="false" v-model="valuea2" @change="getdata1"></el-cascader>
              <el-select v-model="valuea3" placeholder="运营商" style="width: 10%;margin-right: 10px;" @change="getdata1()">
                <el-option label="全部运营商" value="*"></el-option>
                <el-option v-for="(item, index) in options3" :key="item + index" :label="item.label" :value="item.label"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!showzdyz" @click="today(2)">今天</el-button>
                <el-button v-show="!showzdyz" @click="yesterday(2)">昨天</el-button>
                <el-button v-show="!showzdyz" @click="sevendat(2)">近7天</el-button>
                <el-button v-show="!showzdyz" @click="thirtyday(2)">近30天</el-button>
                <el-button @click="showzdyzs">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="showzdyz" style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;" type="primary" @click="seachtu(2)">确定</el-button>
            </div>
            <div class="device_form" style>
              <div id="myChartMap1" :style="{ height: '607px' }"></div>
            </div>
          </el-tab-pane> -->
          <el-tab-pane label="播放流量占比" name="threed" :lazy="true">
            <div style="display: flex;align-items: center; flex-flow: row; margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="valuea1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="value1Activechanidactive" placeholder="请输入域名" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-select v-model="value1acce1" placeholder="终端" style="width: 10%;margin-right: 10px;">
                <el-option label="全部终端" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="valueChanel" placeholder="全部节点渠道" style="width: 10%;margin-right: 10px;">
                <el-option label="全部" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets1" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!showzdyz" @click="today(3)">今天</el-button>
                <el-button v-show="!showzdyz" @click="yesterday(3)">昨天</el-button>
                <el-button v-show="!showzdyz" @click="sevendat(3)">近7天</el-button>
                <el-button v-show="!showzdyz" @click="thirtyday(3)">近30天</el-button>
                <el-button @click="showzdyzs">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="showzdyz" style="margin-left:10px;" v-model="val2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;" type="primary" @click="seachtu(3)">确定</el-button>
            </div>
            <div class="user_item">
              <div class="item_left">
                <div class="item_count" style="text-align:center;">
                  <span>{{totalp2p |setbytes}}</span>
                </div>
                <div class="item_text" style="text-align:center;">P2P流量</div>
              </div>
              <div class="item_right">
                <div class="item_count" style="text-align:center;">
                  <span>{{totalcdn |setbytes}}</span>
                </div>
                <div class="item_text" style="text-align:center;">CDN流量</div>

              </div>
            </div>
            <div class="device_form" style>
              <div id="myChartMap2" :style="{ height: '607px' }"></div>
            </div>
            <div class="devide_table">

              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tableZb" border style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="加速内容名称">
                      <template slot-scope="scope">
                        <div>{{ scope.row.urlname }}</div>
                      </template>
                    </el-table-column>

                    <el-table-column label="播放URL"  width="400">
                      <template slot-scope="scope">
                        <div>{{ scope.row.playurl }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="P2P加速流量（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.p2pflow | setbytes }}</div>
                          <div>({{ scope.row.p2ppercent | percentss }})</div>
                        </div>

                      </template>
                    </el-table-column>
                    <el-table-column label="CDN加速流量（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.cdnflow | setbytes }}</div>
                          <div>({{ scope.row.cdnpercent | percentss }})</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :render-header="renderHeader" label="节点有资源时CDN加速流量（%）" >
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">

                          <div>{{ scope.row.cdnactiveflow | setbytes }}</div>
                          <div>({{ scope.row.cdnactivepercent | percentss }})</div>

                        </div>

                      </template>
                    </el-table-column>
                    <el-table-column :render-header="renderHeader" label="节点无资源时CDN加速流量（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">

                          <div>{{ scope.row.cdnpassiveflow | setbytes }}</div>
                          <div>({{ scope.row.cdnpassivepercent | percentss }})</div>

                        </div>

                      </template>
                    </el-table-column>

                    <el-table-column label="统计时间">
                      <template slot-scope="scope">
                        <div>{{ scope.row.stime | settimes }}</div>
                        <div>{{ scope.row.etime | settimes }}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt1"></fenye>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="播放流量终端" name="four" :lazy="true">
            <div style="display: flex;align-items: center; flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;">
              <el-input v-model="value1Activechanid" placeholder="请输入渠道ID" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-input v-model="valuea1" placeholder="请输入加速内容名称" @change="onchanidChange" style="width:160px;margin-right: 10px;"></el-input>
              <el-select v-model="value1acce1" placeholder="终端" style="width: 10%;margin-right: 10px;">
                <el-option label="全部终端" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="valueChanel1" placeholder="全部节点渠道" style="width: 10%;margin-right: 10px;">
                <el-option label="全部" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets1" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button-group>
                <el-button v-show="!showzdyz" @click="today(4)">今天</el-button>
                <el-button v-show="!showzdyz" @click="yesterday(4)">昨天</el-button>
                <el-button v-show="!showzdyz" @click="sevendat(4)">近7天</el-button>
                <el-button v-show="!showzdyz" @click="thirtyday(4)">近30天</el-button>
                <el-button @click="showzdyzs">自定义
                  <i class="el-icon-date"></i>
                </el-button>
              </el-button-group>
              <el-date-picker v-show="showzdyz" style="margin-left:10px;" v-model="val2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
              <el-button style="margin-left:10px;" type="primary" @click="seachtu(4)">确定</el-button>
            </div>
            <div class="device_form" style>
              <div id="myChartMap3" :style="{ height: '607px' }"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1 } from "../../servers/sevdate";
import fenye from "@/components/fenye";
import {
  accelerate_flow_query_conditions,
  accelerate_flow,
  accelerate_flow_table,
  backsource_flow_query_conditions,
  backsource_flow,
  getvideo,
  export_pv_uv_curve_file,
  export_backsource_flow_file,
  export_accelerate_flow_file,
  getterminal,
  sdk_flow,
  sdk_flow_table,
  sdk_flow_control,
  export_sdk_flow_table_file,
  export_sdk_flow_control_file,
} from "../../servers/api";
import echarts from "echarts";
import common from "../../comm/js/util";

export default {
  data() {
    return {
      dataAry: [],
      dataAry1: [],
      dataAry2: [],
      value1acce: "-1",
      value1acce1: "-1",
      valueacce: "-1",
      valueChanel: "",
      valueChanel1: "",
      hashidSet: [],
      hashidSets: [
        {
          value: "1",
          label: "iOS",
        },
        {
          value: "0",
          label: "android",
        },
        {
          value: "2",
          label: "其他",
        },
      ],
      hashidSets1: [
        {
          value: "1",
          label: "云链",
        },
        {
          value: "2",
          label: "西柚机",
        },
        {
          value: "3",
          label: "其他",
        },
      ],
      value1Activechanidactive: "",
      options2: [
        {
          value: "*",
          label: "全部地区",
        },
        {
          value: "华北",
          label: "华北",
          children: [
            {
              value: "北京",
              label: "北京",
            },
            {
              value: "内蒙古",
              label: "内蒙古",
            },
            {
              value: "山西",
              label: "山西",
            },
            {
              value: "河北",
              label: "河北",
            },
            {
              value: "天津",
              label: "天津",
            },
          ],
        },
        {
          value: "西北",
          label: "西北",
          children: [
            {
              value: "宁夏",
              label: "宁夏",
            },
            {
              value: "陕西",
              label: "陕西",
            },
            {
              value: "甘肃",
              label: "甘肃",
            },
            {
              value: "青海",
              label: "青海",
            },
            {
              value: "新疆",
              label: "新疆",
            },
          ],
        },
        {
          value: "东北",
          label: "东北",
          children: [
            {
              value: "黑龙江",
              label: "黑龙江",
            },
            {
              value: "吉林",
              label: "吉林",
            },
            {
              value: "辽宁",
              label: "辽宁",
            },
          ],
        },
        {
          value: "华东",
          label: "华东",
          children: [
            {
              value: "福建",
              label: "福建",
            },
            {
              value: "江苏",
              label: "江苏",
            },
            {
              value: "安徽",
              label: "安徽",
            },
            {
              value: "山东",
              label: "山东",
            },
            {
              value: "上海",
              label: "上海",
            },
            {
              value: "浙江",
              label: "浙江",
            },
          ],
        },
        {
          value: "华中",
          label: "华中",
          children: [
            {
              value: "河南",
              label: "河南",
            },
            {
              value: "湖北",
              label: "湖北",
            },
            {
              value: "江西",
              label: "江西",
            },
            {
              value: "湖南",
              label: "湖南",
            },
          ],
        },
        {
          value: "西南",
          label: "西南",
          children: [
            {
              value: "贵州",
              label: "贵州",
            },
            {
              value: "云南",
              label: "云南",
            },
            {
              value: "重庆",
              label: "重庆",
            },
            {
              value: "四川",
              label: "四川",
            },
            {
              value: "西藏",
              label: "西藏",
            },
          ],
        },
        {
          value: "华南",
          label: "华南",
          children: [
            {
              value: "广东",
              label: "广东",
            },
            {
              value: "广西",
              label: "广西",
            },
            {
              value: "海南",
              label: "海南",
            },
          ],
        },
        {
          value: "其他",
          label: "其他",
          children: [
            {
              value: "香港",
              label: "香港",
            },
            {
              value: "澳门",
              label: "澳门",
            },
            {
              value: "台湾",
              label: "台湾",
            },
          ],
        },
      ],
      value1Activechanid: "",
      value1Activechanid1: "",
      value1Active: "",
      options1Active: [],
      shoudzyx: false,
      showzdyz: false,
      options1: [],
      options1chanid: [],

      options3: [
        // {
        //   label: "电信",
        // },
        // {
        //   label: "移动",
        // },
        // {
        //   label: "联通",
        // },
        // {
        //   label: "其他",
        // },
      ],
      options4: [],
      optionsa1: [],
      optionsa2: [],
      valuea2chanid: "",
      optionsa2chanid: [],
      optionsa3: [],
      optionsa4: [],
      value1: "",
      value2: "*",
      value3: "*",
      value4: "",
      valuea1: "",
      valuea2: "*",
      valuea3: "*",
      valuea4: "",
      tablecdn: [],
      tableZb: [],
      activeName: "threed",
      pickerOptions: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              const start =
                new Date(new Date(new Date().toLocaleDateString()).getTime()) -
                3600 * 1000 * 24 * 1;
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              picker.$emit("pick", [start, end]);
            },
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
            },
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
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      val2: [],
      rowHeader: [
        {
          prop: "time",
          label: "节点ID",
        },
        {
          prop: "totals",
          label: "使用流量",
        },
        {
          prop: "online_devices",
          label: "传输次数",
        },
        {
          prop: "average_online",
          label: "日期",
        },
      ],
      rowHeader1: [
        {
          prop: "time",
          label: "节点ID",
        },
        {
          prop: "totals",
          label: "存储容量",
        },
        {
          prop: "online_devices",
          label: "存储次数",
        },
        {
          prop: "average_online",
          label: "日期",
        },
      ],
      tableData: [
        {
          time: "测试数据1",
          totals: "测试数据1",
          online_devices: "测试数据1",
          average_online: "测试数据1",
          new_percent: "测试数据1",
        },
      ],
      timeUnit: 60,
      starttime: "",
      endtime: "",
      dataFlowArray: [], //图1
      timeArray: [], //图1
      dataFlowArray2: [], //图2
      timeArray2: [], //图2
      pageSize: 10, //每页数量
      pageNo: 1, //当前页码
      pageSize1: 10, //每页数量
      pageNo1: 1, //当前页码
      total_cnt: 1, //数据总量
      total_cnt1: 1, //数据总量
      chanid: "",
      pageActive: 0,
      dataFlownum: 0,
      dataFlownum1: 0,
      flowunit: "",
      timeArrayZb: [],
      timeArrayZb1: [],
      dataZb1: [],
      dataZb3: [],
      dataZb2: [],
      totalp2p: 0,
      totalcdn: 0,
      timeArrayJk: [],
      dataJk1: [],
      dataJk2: [],
      dataJk3: [],
      dataJk4: [],
    };
  },
  filters: {
    settimes(data) {
      var stat = getymdtime(data);
      return stat;
    },
    setbytes(data) {
      return common.formatByteActive(data);
    },
    percentss(data) {
      if (data == 0) {
        return 0 + "%";
      }
      return (data * 100).toFixed(2) + "%";
    },
  },
  components: {
    fenye,
  },
  mounted() {
    //this.today()
    //注释
    // this.querySdkflow()
    //this.querySdkflowTable()
    // if (this.$cookies.get("id")) {
    //     this.chanid = this.$cookies.get("id") * 1;
    // } else {
    //     this.$router.push({
    //         path: "/"
    //     });
    // }
    // if (this.$route.query.urldata) {
    //   console.log(this.$route.query.urldata);
    // }
    let monitorUrlname = this.$route.query.monitorUrlname;
    if (monitorUrlname) {
      this.value1 = monitorUrlname;
    } else {
      this.value1 = "";
    }
    let monitorChanId = this.$route.query.monitorChanId;
    if (monitorChanId) {
      this.value1Activechanid = monitorChanId;
    } else {
      this.value1Activechanid = "";
    }

    this.starttime = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    this.endtime = Date.parse(new Date()) / 1000;

    this.getseachlabel1();
    // this.configure()
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
    this.drawLine();
    this.drawLine1();
  },
  methods: {
    renderHeader(h, { column }) {
      const serviceContent = [
        h(
          "div",
          {
            slot: "content",
            style: "margin-bottom:5px",
          },
          "节点有资源缓存时，切换至CDN加速通道所产生的CDN加速流量"
        ),
      ];
      const paymentContent = h(
        "div",
        {
          slot: "content",
        },
        "节点无资源缓存时，切换至CDN加速通道所产生的的CDN加速流量"
      );
      return h("div", [
        h("span", column.label),
        h(
          "el-tooltip",
          {
            props: {
              placement: "top",
            },
          },
          [
            column.label == "节点有资源时CDN加速流量（%）"
              ? serviceContent
              : paymentContent,
            h("i", {
              class: "el-icon-warning-outline",
              style: "color:orange;margin-left:5px;",
            }),
          ]
        ),
      ]);
    },
    handleCurrentChange1(pages) {
      this.pageNo1 = pages;
      this.querySdkflowTable();
    },
    //获取页码
    handleCurrentChange(pages) {
      this.pageNo = pages;
      this.getbot();
    },
    handleSizeChange1(pagetol) {
      //this.pagesize = pagetol;
      // this.getuserlist();
    },

    //获取每页数量
    handleSizeChange(pagetol) {
      //this.pagesize = pagetol;
      // this.getuserlist();
    },
    //流量占比图标
    querySdkflow() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.urlName = this.valuea1;
      } else {
        params.urlName = "*";
      }
      if (this.value1Activechanid !== "") {
        params.channelId = this.value1Activechanid;
      } else {
        params.channelId = "*";
      }
      if (this.value1acce1 !== "-1") {
        params.terminalName = parseInt(this.value1acce1);
      } else {
        params.terminalName = -1;
      }
      if (this.valueChanel !== "") {
        params.ipfschanel = parseInt(this.valueChanel);
      } else {
        params.ipfschanel = -1;
      }

      if (this.value1Activechanidactive !== "") {
        params.domain = this.value1Activechanidactive;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      sdk_flow(params)
        .then(res => {
          if (res.status == 0) {
            var num = res.data.pdataArray;
            var num1 = res.data.cdataArray;
            if (num !== 0) {
              var max = Math.max.apply(null, num);
            } else if (num1 !== 0) {
              var max = Math.max.apply(null, num);
            }
            //  max = Math.max.apply(null, num);
            this.flowunit = this.common.formatByteActiveunit(max);
            this.totalp2p = res.data.totalp2p;
            this.totalcdn = res.data.totalcdn;
            this.timeArrayZb = [];
            this.timeArrayZb1 = [];
            this.dataZb1 = [];
            this.dataZb2 = [];
            if(params.timeUnit==60){
                    res.data.timearray.forEach((item, index) => {
              this.timeArrayZb.push(getymdtime1(item));
            });
            }else{
                     res.data.timearray.forEach((item, index) => {
              this.timeArrayZb.push(getymdtime1(item,11));
            });
            }
          
            this.dataZb1 = res.data.cdnaactivepercent;
            this.dataZb2 = res.data.cdnpassivepercent;
            this.dataZb3 = res.data.p2parray;
            this.dataAry = res.data.cdnaactivearray;
            this.dataAry1 = res.data.cdnpassivearray;
             this.dataAry2 = res.data.pdataArray;
            this.drawLine2(this.timeArrayZb, this.dataZb1, this.dataZb2,this.dataZb3);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //流量占比表
    querySdkflowTable() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.urlName = this.valuea1;
      } else {
        params.urlName = "*";
      }
      if (this.value1Activechanid !== "") {
        params.channelId = this.value1Activechanid;
      } else {
        params.channelId = "*";
      }
      if (this.value1acce1 !== "-1") {
        params.terminalName = parseInt(this.value1acce1);
      } else {
        params.terminalName = -1;
      }
      if (this.valueChanel !== "") {
        params.ipfschanel = parseInt(this.valueChanel);
      } else {
        params.ipfschanel = -1;
      }
      if (this.value1Activechanidactive !== "") {
        params.domain = this.value1Activechanidactive;
      } else {
        params.domain = "*";
      }

      (params.pageNo = this.pageNo1 - 1),
        (params.pageSize = this.pageSize1),
        // params.domain="*"
        (params.timeUnit = this.common.timeUnitActive(
          this.starttime,
          this.endtime
        ));

      sdk_flow_table(params)
        .then(res => {
          if (res.status == 0) {
            this.tableZb = [];
            this.tableZb = res.data.list;
            this.total_cnt1 = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //流量监控图表
    querySdkflowControl() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.urlName = this.valuea1;
      } else {
        params.urlName = "*";
      }
      if (this.value1Activechanid !== "") {
        params.channelId = this.value1Activechanid;
      } else {
        params.channelId = "*";
      }
      if (this.value1acce1 !== "-1") {
        params.terminalName = parseInt(this.value1acce1);
      } else {
        params.terminalName = -1;
      }
      if (this.valueChanel1 !== "") {
        params.ipfschanel1 = parseInt(this.valueChanel1);
      } else {
        params.ipfschanel = -1;
      }
      if (this.value1Activechanidactive !== "") {
        params.domain = this.value1Activechanidactive;
      } else {
        params.domain = "*";
      }

      // params.pageNo= 0,
      // params.pageSize= 10,
      // params.domain="*"
      params.timeUnit = this.common.timeUnitActive1(
        this.starttime,
        this.endtime
      );

      sdk_flow_control(params)
        .then(res => {
          if (res.status == 0) {
            this.totalp2p = res.data.totalp2p;
            this.totalcdn = res.data.totalcdn;

            var num = res.data.iospstreamarray;
            var num1 = res.data.ioscstreamarray;
            var num2 = res.data.andriodpstreamarray;
            var num3 = res.data.andriodcstreamarray;
            // console.log(num);
            // console.log(num1);
            // console.log(num2);
            // console.log(num3);

            let max = "";
            if (num != 0) {
              max = Math.max.apply(null, num);
            } else if (num1 != 0) {
              max = Math.max.apply(null, num);
            } else if (num2 != 0) {
              max = Math.max.apply(null, num);
            } else if (num3 != 0) {
              max = Math.max.apply(null, num);
            } else {
              max = 0;
            }
           // console.log(max);
            // var max = Math.max.apply(null, num);
            
            this.flowunit = this.common.formatByteActiveunit(max);
          console.log(this.flowunit )

            //   res.data.streamArray.forEach((item, index) => {
            //     this.dataFlowArray.push(
            //       this.common.formatByteNum(item, this.flowunit)
            //     );
            //   });
            this.timeArrayJk = [];
            this.dataJk1 = [];
            this.dataJk2 = [];
            this.dataJk3 = [];
            this.dataJk4 = [];

            res.data.iospstreamarray.forEach((item, index) => {
              this.dataJk1.push(this.common.formatByteNum(item*1, this.flowunit));
            });
            res.data.ioscstreamarray.forEach((item, index) => {
              this.dataJk2.push(this.common.formatByteNum(item*1, this.flowunit));
            });
            res.data.andriodpstreamarray.forEach((item, index) => {
              this.dataJk3.push(this.common.formatByteNum(item*1, this.flowunit));
            });
            res.data.andriodcstreamarray.forEach((item, index) => {
              this.dataJk4.push(this.common.formatByteNum(item*1, this.flowunit));
            });

            res.data.timeArray.forEach((item, index) => {
              this.timeArrayJk.push(getymdtime1(item));
            });
            // this.dataJk1 = res.data.iospstreamarray;
            // this.dataJk2 = res.data.ioscstreamarray;
            // this.dataJk3 = res.data.andriodpstreamarray;
            // this.dataJk4 = res.data.andriodcstreamarray;
            this.drawLine3(
              this.timeArrayJk,
              this.dataJk1,
              this.dataJk2,
              this.dataJk3,
              this.dataJk4
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //流量监控导出

    exoprtant_Ll() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.urlName = this.valuea1;
      } else {
        params.urlName = "*";
      }
      if (this.value1Activechanid !== "") {
        params.channelId = this.value1Activechanid;
      } else {
        params.channelId = "*";
      }
      if (this.value1acce1 !== "-1") {
        params.terminalName = parseInt(this.value1acce1);
      } else {
        params.terminalName = -1;
      }

      if (this.valueChanel1 !== "") {
        params.ipfschanel1 = parseInt(this.valueChanel1);
      } else {
        params.ipfschanel = -1;
      }

      if (this.value1Activechanidactive !== "") {
        params.domain = this.value1Activechanidactive;
      } else {
        params.domain = "*";
      }

      // params.pageNo= 0,
      // params.pageSize= 10,
      // params.domain="*"
      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      export_sdk_flow_control_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },

    //流量占比导出
    exoprtant_Zb() {
      let params = new Object();
      params.startTs = this.starttime;
      params.endTs = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.urlName = this.valuea1;
      } else {
        params.urlName = "*";
      }
      if (this.value1Activechanid !== "") {
        params.channelId = this.value1Activechanid;
      } else {
        params.channelId = "*";
      }
      if (this.value1acce1 !== "-1") {
        params.terminalName = parseInt(this.value1acce1);
      } else {
        params.terminalName = -1;
      }
      if (this.valueChanel !== "") {
        params.ipfschanel = parseInt(this.valueChanel);
      } else {
        params.ipfschanel = -1;
      }
      if (this.value1Activechanidactive !== "") {
        params.domain = this.value1Activechanidactive;
      } else {
        params.domain = "*";
      }

      params.timeUnit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_sdk_flow_table_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //加速流量图标导出
    exoprtant_pupv() {
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.value1) {
        params.fileName = this.value1;
      } else {
        params.fileName = "*";
      }
      if (this.value2[1]) {
        params.region = this.value2[1];
      } else {
        params.region = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }

      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.valueacce !== "") {
        params.acce = this.valueacce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_accelerate_flow_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //回源统计图表导出
    exoprtant_backsource() {
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      //params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.fileName = this.valuea1;
      } else {
        params.fileName = "*";
      }
      if (this.valuea2[1]) {
        params.region = this.valuea2[1];
      } else {
        params.region = "*";
      }

      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.value1acce !== "") {
        params.acce = this.value1acce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_backsource_flow_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {});
    },
    //加速流量图标导出
    exoprtant_pupv() {
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.value1) {
        params.fileName = this.value1;
      } else {
        params.fileName = "*";
      }
      if (this.value2[1]) {
        params.region = this.value2[1];
      } else {
        params.region = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }

      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.valueacce !== "") {
        params.acce = this.valueacce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      export_accelerate_flow_file(params)
        .then(res => {
          if (res.status == 0) {
            window.open(res.msg, "_blank");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //输入渠道ID查询
    onchanidChange() {
      this.options1chanid = [];
      this.pageActive = 0;
      if (this.value1Activechanid.length != 12) {
        return false;
      }
      this.pageNo = 1;
      this.queryInfoVideo();
    },
    //查询视频名称
    queryInfoVideo() {
      let param = new Object();

      param.chanid = this.value1Activechanid;

      param.page = this.pageActive;
      getterminal(param)
        .then(res => {
          if (res.status == 0) {
            this.hashidSet = [];
            res.result.cols.forEach((item, index) => {
              let obj = {};
              obj.value = item.name;
              obj.label = item.name;
              this.hashidSet.push(obj);
            });
            this.options1chanid = this.options1chanid.concat(this.labelData);
            if (res.result.les_count == 0) {
              return false;
            } else {
              this.pageActive++;
              this.queryInfoVideo();
            }
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getdataActive() {},
    showzdyzs() {
      this.showzdyz = !this.showzdyz;
    },
    showzdyx() {
      this.shoudzyx = !this.shoudzyx;
    },
    //获取页码
    getpage(pages) {
      this.pageNo = pages;
      this.getbot();
    },
    //获取每页数量
    gettol(pagetol) {
      this.pagesize = pagetol;
      // this.getuserlist();
    },
    getdata() {
      this.pageNo = 1;
      this.gettable1();
    },
    getdata1() {
      this.gettable2();
    },
    getdata2(val) {
      if (val == 1) {
        this.gettable1();
        this.getbot();
      } else if (val == 2) {
        this.getseachlabel2();
      } else if (val == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      }
    },
    getdata3() {
      this.querySdkflowControl();
    },

    /** 请求数据 */
    //加速流量加载查询条件
    getseachlabel1() {
      this.options1 = [];
      this.options1chanid = [];
      //this.options2 = [];
      this.options3 = [];
      let params = new Object();
      params.chanId = "*";
      accelerate_flow_query_conditions(params)
        .then(res => {
          res.data.ispSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = index;
            this.options3.push(obj);
          });
          res.data.terminalSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = item;
            this.hashidSet.push(obj);
          });

          this.gettable1();
        })
        .catch(Error => {
          console.log(Error);
        });
    },
    //请求数据--加速流量条形图
    gettable1() {
      this.dataFlowArray = [];
      this.timeArray = [];
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      // params.chanId = this.chanid + "";
      if (this.value1) {
        params.fileName = this.value1;
      } else {
        params.fileName = "*";
      }
      if (this.value2[1]) {
        params.region = this.value2[1];
      } else {
        params.region = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }

      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.valueacce !== "") {
        params.acce = this.valueacce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );
      accelerate_flow(params)
        .then(res => {
          var num = res.data.streamArray;
          var max = Math.max.apply(null, num);
          this.flowunit = this.common.formatByteActiveunit(max);

          res.data.streamArray.forEach((item, index) => {
            this.dataFlowArray.push(
              this.common.formatByteNum(item, this.flowunit)
            );
          });
          res.data.timeArray.forEach((item, index) => {
            this.timeArray.push(getymdtime1(item));
          });
          this.getbot();
          this.drawLine(this.dataFlowArray, this.timeArray);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //请求数据--加速流量表格
    getbot() {
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      params.chanId = this.chanid + "";
      if (this.value1) {
        params.fileName = this.value1;
      } else {
        params.fileName = "*";
      }
      if (this.value2[1]) {
        params.region = this.value2[1];
      } else {
        params.region = "*";
      }
      if (this.value3) {
        params.isp = this.value3;
      } else {
        params.isp = "*";
      }
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.valueacce !== "") {
        params.acce = this.valueacce;
      } else {
        params.acce = "*";
      }
      params.pageNo = this.pageNo - 1;
      params.pageSize = this.pageSize;

      accelerate_flow_table(params)
        .then(res => {
          if (res.status == 0) {
            //this.tablecdn2 = res.data.fileList;
            this.total_cnt = res.data.totalCnt;
            let chanelIdArr = res.data.chanelIdArray;
            let timeArr = res.data.timeArray;
            let streamArr = res.data.streamArray;
            this.tablecdn = [];
            for (var i = 0; i < timeArr.length; i++) {
              let obj = {
                chanelId: chanelIdArr[i],
                timeValue: timeArr[i],
                streamAalue: streamArr[i],
              };
              this.tablecdn.push(obj);
            }
          } else {
          }

          // this.tablecdn = res.data.tableList;
          // this.total_cnt = res.data.totalCnt;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //请求数据--回源查询条件
    getseachlabel2() {
      this.options3 = [];
      this.optionsa1 = [];
      this.optionsa2 = [];
      this.optionsa3 = [];
      this.options1Active = [];
      let params = new Object();
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }

      backsource_flow_query_conditions(params)
        .then(res => {
          res.data.ispSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = index;
            this.options3.push(obj);
          });
          res.data.terminalSet.forEach((item, index) => {
            let obj = {};
            obj.label = item;
            obj.value = item;
            this.hashidSet.push(obj);
          });
          this.gettable2();
        })
        .catch(err => {});
    },
    gettable2() {
      let _this = this;
      this.dataFlowArray2 = [];
      this.timeArray2 = [];
      let params = new Object();
      params.start_ts = this.starttime;
      params.end_ts = this.endtime;
      //params.chanId = this.chanid + "";
      if (this.valuea1) {
        params.fileName = this.valuea1;
      } else {
        params.fileName = "*";
      }
      if (this.valuea2[1]) {
        params.region = this.valuea2[1];
      } else {
        params.region = "*";
      }

      if (this.valuea3) {
        params.isp = this.valuea3;
      } else {
        params.isp = "*";
      }
      if (this.value1Activechanid !== "") {
        params.chanId = this.value1Activechanid;
      } else {
        params.chanId = "*";
      }
      if (this.value1acce !== "") {
        params.acce = this.value1acce;
      } else {
        params.acce = "*";
      }
      params.time_unit = this.common.timeUnitActive(
        this.starttime,
        this.endtime
      );

      backsource_flow(params)
        .then(res => {
          var num = res.data.streamArray;
          var max = Math.max.apply(null, num);
          this.flowunit = this.common.formatByteActiveunit(max);

          res.data.streamArray.forEach((item, index) => {
            this.dataFlowArray2.push(
              this.common.formatByteNum(item, this.flowunit)
            );
          });
          // this.timeArray = res.data.timeArray;
          res.data.timeArray.forEach((item, index) => {
            this.timeArray2.push(getymdtime1(item));
          });

          this.drawLine1(this.dataFlowArray2, this.timeArray2);
        })
        .catch(err => {});
    },
    seachtu(data) {
      if (this.endtime - this.starttime > 7776000) {
        this.$message({
          message: "起始时间和结束时间最大跨度不能超过三个月",
          type: "error",
        });
        return false;
      }
      this.pageNo = 1;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
    },
    //今天
    today(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.timeUnit = 60;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
    },
    //昨天
    yesterday(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 1;
      this.endtime = times;
      this.timeUnit = 60;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
    },
    //七天
    sevendat(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 6;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
    },
    //三十天
    thirtyday(data) {
      let times = parseInt(new Date(new Date()).getTime() / 1000);
      this.starttime = times - 24 * 60 * 60 * 29;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (data == 1) {
        this.getseachlabel1();
      } else if (data == 2) {
        this.getseachlabel2();
      } else if (data == 3) {
        this.querySdkflow();
        this.querySdkflowTable();
      } else if (data == 4) {
        this.querySdkflowControl();
      }
      // if (!data) {
      //   this.getseachlabel1();
      // } else {
      //   this.getseachlabel2();
      // }
    },
    //自定义时间
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
      this.val2 = [];
      this.hashidSet = [];
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;

      this.endtime = Date.parse(new Date()) / 1000;
      this.options3 = [];
      // if (tab.index == 0) {
      //   // this.value1 = "";
      //   this.value2 = "*";
      //   this.value3 = "*";
      //   (this.valueacce = "-1"),
      //     // this.value1Activechanid = "";
      //     (this.options1chanid = []);
      //   let monitorUrlname = this.$route.query.monitorUrlname;
      //   if (monitorUrlname) {
      //     this.value1 = monitorUrlname;
      //   } else {
      //     this.value1 = "";
      //   }
      //   let monitorChanId = this.$route.query.monitorChanId;
      //   if (monitorChanId) {
      //     this.value1Activechanid = monitorChanId;
      //   } else {
      //     this.value1Activechanid = "";
      //   }

      //   this.timeUnit = 60;
      //   this.getseachlabel1();
      // } else if (tab.index == 1) {
      //   this.valuea1 = "";
      //   //this.value1 = "";
      //   this.valuea2 = "*";
      //   this.valuea3 = "*";
      //   (this.value1acce = "-1"), (this.options1chanid = []);
      //   //this.value1Activechanid = "";
      //   let monitorUrlname = this.$route.query.monitorUrlname;
      //   if (monitorUrlname) {
      //     this.value1 = monitorUrlname;
      //   } else {
      //     this.value1 = "";
      //   }
      //   let monitorChanId = this.$route.query.monitorChanId;
      //   if (monitorChanId) {
      //     this.value1Activechanid = monitorChanId;
      //   } else {
      //     this.value1Activechanid = "";
      //   }

      //   this.timeUnit = 60;
      //   this.getseachlabel2();
      // }
      if (tab.index == 0) {
        (this.value1acce1 = "-1"), this.getseachlabel1();
        this.querySdkflow();
        let _this = this;
        this.$nextTick(() => {
          _this.querySdkflow();
          _this.querySdkflowTable();
          // console.log(this.$refs['hello']);
        });
      } else if (tab.index == 1) {
        // this.getseachlabel1();
        let _this = this;
        _this.querySdkflowControl();
        //   this.$nextTick(() => {
        //    _this.drawLine3(x,y,z)
        //   // console.log(this.$refs['hello']);
        // });
      }
    },
    // destroyed: function() {
    //   this.drawLine();
    //   this.drawLine1();
    // },
    drawLine(x, y) {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChartMap = this.$echarts.init(
        document.getElementById("myChartMap")
      );
      window.onresize = myChartMap.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量",
        },
        toolbox: {
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.exoprtant_pupv();
              },
            },
          },
        },
        grid: {
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 60, // 默认60
        },
        color: "#297AFF",
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            //   _this.common.formatByteActive(params[0].data)

            return (
              params[0].name +
              "<br>" +
              params[0].seriesName +
              ":" +
              params[0].data +
              _this.flowunit
            );
          },
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: y,
        },
        yAxis: {
          name: _this.flowunit,
        },

        series: [
          {
            name: "流量",
            data: x,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      };
      myChartMap.clear();
      myChartMap.setOption(options);
    },
    drawLine1(x, y) {
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChartMap1 = this.$echarts.init(
        document.getElementById("myChartMap1")
      );
      window.onresize = myChartMap1.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量",
        },
        toolbox: {
          //show: true,
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.exoprtant_backsource();
              },
            },
          },
        },
        grid: {
          // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 60, // 默认60
        },
        color: "#297AFF",
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].name +
              "<br>" +
              params[0].seriesName +
              ":" +
              params[0].data +
              _this.flowunit
            );
          },
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: y,
        },
        yAxis: {
          name: this.flowunit,
        },
        series: [
          {
            name: "流量",
            data: x,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      };
      myChartMap1.clear();
      myChartMap1.setOption(options);
      pop0p;
    },

    drawLine2(x, y, z,a) {
      for (var i = 0; i < y.length; i++) {
        y[i] = (y[i] * 100).toFixed(2);
      }
      for (var i = 0; i < z.length; i++) {
        z[i] = (z[i] * 100).toFixed(2);
      }
       for (var i = 0; i < a.length; i++) {
        a[i] = (a[i] * 100).toFixed(2);
      }
      
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartMap2"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量占比",
          left: "12px",
          textStyle: {
            color: "#333333",
            fontSize: 16,
          },
        },
        toolbox: {
          //show: true,
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.exoprtant_Zb();
              },
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ['P2P加速流量', 'CDN无源流量','CDN有源流量'],
          

        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            //  console.log(_this.flowunit)
            //  console.log(_this.dataAry)
            //  for(var i=0;i<_this.dataAry.length;i++){
            return (
              params[0].axisValue +
              "</br>" +
              "CND有源流量:" +
              _this.common.formatByteActive(
                _this.dataAry[params[0].dataIndex]
              ) +"("+(_this.dataZb1[params[0].dataIndex])+"%"+")"+
              "</br>" +
              "CDN无源流量:" +
              _this.common.formatByteActive(_this.dataAry1[params[0].dataIndex])+
             
              "("+(_this.dataZb2[params[0].dataIndex])+"%"+")"+

               "<br>" +
              "P2P加速流量:"+
              _this.common.formatByteActive(_this.dataAry2[params[0].dataIndex])+
            
              "("+(_this.dataZb3[params[0].dataIndex])+"%"+")"
            );
            // }
          },
        },
        grid: {
          left: "3%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 100, // 默认60
        },
        xAxis: {
          data: x,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
        },
        series: [
              {
            name: "P2P加速流量",
            type: "bar",
            stack: "使用情况",
            data: a,
            barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {  color: '#D2E9FF' },
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#333333",
                fontSize: 10,
              },
            },
          },
          {
            name: "CDN无源流量",
            type: "bar",
            stack: "使用情况",
            data: z,
           barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#84C1FF',
              },
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#333333",
                fontSize: 10,
              },
            },
          },
          {
            name: "CDN有源流量",
            type: "bar",
            stack: "使用情况",
            data: y,
             barMaxWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: '#2894FF',
              },
            },
          
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#ffffff",
                fontSize: 10,
              },
            },
          },
          
         
        ],
      };
      myChart.setOption(options);
    },

    drawLine3(a, b, c, d, e) {
      // console.log(b)
      // console.log(c)
      // console.log(d)
      // console.log(e)
      var dataTime = a;
   
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartMap3"));
      window.onresize = myChart.resize;
      // 绘制图表
      let options = {
        title: {
          text: "流量监控",
          left: "12px",
          textStyle: {
            color: "#333333",
            fontSize: 16,
          },
        },
        toolbox: {
          //show: true,
          itemSize: 20,
          itemGap: 30,
          right: 50,
          feature: {
            mydow: {
              show: true,
              title: "导出",
              icon:
                "path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z",
              onclick: function() {
                _this.exoprtant_Ll();
              },
            },
          },
        },
        legend: {
          // orient: 'vertical',
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: ["IOS-P2P", "IOS-CDN", "Android-P2P", "Android-CDN"],
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            console.log(_this.flowunit)
            let str = "";
            params.forEach((item, index) => {
              if (index == 0) {
                str +=
                  item.axisValue +
                  "</br>" +
                  item.seriesName +
                  "：" +
                  item.value +
                  _this.flowunit +
                  "</br>";
              } else {
                str +=
                  item.seriesName +
                  "：" +
                  item.value +
                  _this.flowunit +
                  "</br>";
              }
            });
            return str;
          },
        },
        grid: {
          left: "4%", // 默认10%，给24就挺合适的。
          top: 60, // 默认60
          right: 35, // 默认10%
          bottom: 100, // 默认60
        },
        xAxis: {
          data: a,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          name: _this.flowunit,
        
        },
        series: [
          {
            name: "IOS-P2P",
            type: "line",
            stack: "使用情况",
            data: b,
            smooth: false,
            symbol: "star", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#E8505B" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
          {
            name: "IOS-CDN",
            type: "line",
            stack: "使用情况",
            data: c,
            smooth: false,
            symbol: "triangle", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#14B1AB" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
          {
            name: "Android-P2P",
            type: "line",
            stack: "使用情况",
            data: d,
            smooth: false,
            symbol: "pin", //拐点样式
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: { color: "#F2C33C" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
          {
            name: "Android-CDN",
            type: "line",
            stack: "使用情况",
            data: e,
            smooth: false,
            itemStyle: {
              normal: { color: "#5970CC" },
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
          },
        ],
      };
      myChart.setOption(options);
    },
  },
};
</script>

<style lang="scss">
.myself-container {
  width: 100%;
  //min-width: 1600px;

  .device_form {
    width: auto;
    height: auto;
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
    padding: 35px;
    height: auto;
    margin-top: 20px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
    border-radius: 2px;

    .el-table td,
    .el-table th {
      padding: 6px 0px;
    }
  }

  .devide_pageNation {
    width: 100%;
    height: auto;
    // overflow: hidden;
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
