<template>
<div class="copy_configuration">
    <div class="top_title" style="display: flex;">
        <span @click="goback" style="font-size: 24px;color: #202020;"><i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
            复制配置</span>
    </div>
    <p class="copy_title">
        复制配置允许将一个域名的配置项复制到多个域名，帮助您对域名进行批量配置
    </p>
    <div class="copy_con">
        <div>
            <el-steps :active="actives" simple>
                <el-step title="选择配置项" icon="el-icon-edit"></el-step>
                <el-step title="选择域名" icon="el-icon-upload"></el-step>
                <el-step title="完成" icon="el-icon-picture"></el-step>
            </el-steps>
        </div>

        <div v-if="actives === 1">
            <el-table ref="multipleTable" :data="futableData" tooltip-effect="dark" stripe style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" @selection-change="handleSelectionChange1">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="configuration" label="配置项"></el-table-column>
                <el-table-column prop="nowconfiguration" label="当前配置" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.nowconfiguration == '已配置'" style="display: flex;justify-content: center;align-items: center;color:#333333;">
                            <i class="iconfont icon-dian" style="font-size: 36px;color:#297AFF;"></i><span> {{ scope.row.nowconfiguration }}</span>
                        </div>
                        <div v-else style="display: flex;justify-content: center;align-items: center;color:#949494;">
                            <i class="iconfont icon-dian" style="font-size: 36px;color:#828282;"></i><span> {{ scope.row.nowconfiguration }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope" label="操作">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small" style="color:#547DC0;">详情</el-button> -->
                        <el-button @click="Configuration(scope.row)" type="text" size="small" style="color:#547DC0;">{{scope.row.nowconfiguration=="已配置"?"详情":"配置"}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
            <el-button style="margin-top: 12px;" @click="fureset">取消</el-button>
        </div>
        <div v-else-if="actives === 2">
            <div style="display: flex;justify-content: flex-start;align-items: center;margin: 10px 0">
                <span style="margin-right:21px;color:#333333;font-size:14px;">URL列表</span>
                <el-input placeholder="请输入域名" v-model="keyUrl" style=" width:300px" class="input-with-select" @keyup.enter.native="onSubmitUlr"></el-input>
            </div>
            <div class="copy_prompt">
                <div class="banyuan"></div>
                <i class="el-icon-info" style="color:#6666FF;font-size:18px;margin-left:15px;"></i>
                已选择
                <span>{{ nums }}</span>个域名，最多允许50个
                <span>点击查看</span>
            </div>
            <div>
                <el-table ref="multipleTable" :data="tableDataActive" tooltip-effect="dark" stripe style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass" @selection-change="handleSelectionChange">>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="url" label="域名"></el-table-column>
                </el-table>
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>

            </div>
            <el-button style="margin-top: 12px;" type="primary" @click="last">上一步</el-button>
            <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
            <el-button style="margin-top: 12px;" @click="fureset">取消</el-button>
        </div>
    </div>
    <!--回源配置-->
    <el-dialog title="回源HOST" :visible.sync="dialogVisible1" width="30%">
        <div class="talb_title_tio" style="    display: flex;flex-direction: column;">

            <div>
                <p>自定义CDN节点回源过程中所需访问的WEB服务器域名</p>
            </div>
            <div>
                <el-form :model="nowfrom" ref="dynamicValidateForm" label-width="100px" class="bath_demo_dynamic">
                    <el-form-item prop="email" label="回源开关">
                        <el-switch v-model="valuek" active-color="#13ce66" inactive-color="#EEEEEE" @change="changeSwitch"></el-switch>
                    </el-form-item>
                    <el-form-item prop="email" label="回源地址" :rules="{
                    required: true,
                    message: '域名不能为空',
                    trigger: 'blur'
                  }">
                        <el-input v-model="backUrl" placeholder="请输入会员域名地址"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: center;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit1">确 定</el-button>
                </span>
            </div>
        </div>
    </el-dialog>
    <!--缓存设置-->
    <el-dialog title="缓存设置" :visible.sync="dialogVisible2" width="30%">
        <div class="talb_title_tio" style="    display: flex;flex-direction: column;">

            <div>
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="bath_demo_dynamic">
                    <el-form-item prop="email" label="缓存提示：">
                        开启后，能够自动发现加速节点的同名缓存刷新，并自动同步最新缓存
                    </el-form-item>

                </el-form>
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="bath_demo_dynamic">
                    <el-form-item prop="email" label="回源开关：">
                        <el-switch v-model="valueh" active-color="#13ce66" inactive-color="#EEEEEE" @change="changeSwitch1"></el-switch>
                    </el-form-item>

                </el-form>
            </div>
            <div style="text-align: center;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit2">确 定</el-button>
                </span>
            </div>
        </div>
    </el-dialog>
    <!--请修改过期时间和权重-->
    <el-dialog title="请修改过期时间和权重" :visible.sync="dialogVisible3" width="40%">
        <div class="talb_title_tio" style="    display: flex;flex-direction: column;">
            <!-- <div>
                <el-table :data="huancun" border :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column prop="url" label="地址">
                    </el-table-column>
                    <el-table-column prop="expire_time" label="过期时间">
                    </el-table-column>
                    <el-table-column prop="weight" label="权重">
                    </el-table-column>
                    <el-table-column prop="hcstatus" label="状态">
                                </el-table-column> 
                    <el-table-column prop="oper" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="updatehc(scope.row)" type="text" size="small">修改</el-button>
                             <el-button type="text" size="small" style="color:#000000" @click="delhc(scope.row)">删除</el-button> 
                        </template>
                    </el-table-column>
                </el-table>

            </div> -->
            <el-button @click="updatehcadd" type="primary">添加</el-button>
            <el-table :data="huancunActive" border :cell-style="rowClass" :header-cell-style="headClass" style="margin-top:20px;">

                <el-table-column prop="area" label="区域">
                </el-table-column>
                <el-table-column prop="province" label="城市">
                </el-table-column>
                <el-table-column prop="expire" label="过期时间">
                </el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        {{scope.row.state==0?"缓存中":"已过期"}}
                    </template>
                </el-table-column>
                <el-table-column prop="oper" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="updatehc(scope.row,scope.$index)" type="text" size="small">修改</el-button>
                        <!-- <el-button type="text" size="small" style="color:#000000" @click="delhc(scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top:20px;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit3">确 定</el-button>
                </span>
            </div>
        </div>
    </el-dialog>
    <!--自定义页面-->
    <el-dialog title="自定义页面" :visible.sync="dialogVisible4" width="40%">
        <div class="talb_title_tio" style="    display: flex;flex-direction: column;">
            <div style="text-align: left;margin: 15px 0;" class="customize">
                <el-button type="primary" style="width:100px;" @click="dialogVisibleActive = true">添加</el-button>

            </div>
            <div>
                <el-table :data="tableData" stripe style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column prop="errCode" label="错误码"> </el-table-column>
                    <el-table-column prop="url" label="链接"> </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span style="color:#E54545" v-if="scope.row.state == '已停止'">已停止</span>
                            <span style="color:#0ABF5B" v-else>启动中</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleOnClick(scope.$index,scope.row)" type="text" size="small">{{
                      scope.row.status == "0" ? "启动" : "停止"
                    }}</el-button>
                            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)" style="color:#000000">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: center;margin-top:20px;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible4 = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit4">确 定66</el-button>
                </span>
            </div>
        </div>
    </el-dialog>
    <!--自定义增加URL-->
    <el-dialog title="自定义增加URL" :visible.sync="dialogVisibleActive" width="30%">
        <div class="talb_title_tio" style="    display: flex;flex-direction: column;">

            <div>
                <el-form :model="form">
                    <el-form-item label="错误码址:">
                        <el-input v-model="errorCode" autocomplete="off" style="width:300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="链接地址:">
                        <el-input v-model="errorUrl" autocomplete="off" style="width:300px;"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: center;margin-top:20px;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleActive = false">取 消</el-button>
                    <el-button type="primary" @click="addOwn">确 定1</el-button>
                </span>
            </div>
        </div>
    </el-dialog>
    <!--修改时间和权重-->
    <el-dialog title="修改时间和权重" :visible.sync="dialogVisibleActive1" width="30%">
        <div class="talb_title_tio" style="    display: flex;flex-direction: column;">

            <div>
                <el-form :model="dynamicValidateForm" style="width:320px;" ref="dynamicValidateForm" label-width="100px" class="bath_demo_dynamic">
                    <el-form-item prop="email" label="权重" :rules="{
                    required: true,
                    message: '域名不能为空',
                    trigger: 'blur'
                  }">
                        <el-input v-model="weight" placeholder="请输入权重"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间">
                        <el-date-picker v-model="valueTime" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: center;margin-top:20px;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleActive1 = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmitActive">确 定</el-button>
                </span>
            </div>
        </div>
    </el-dialog>

    <!-- 缓存添加弹窗NEW -->
    <el-dialog title="配置缓存过期时间" :visible.sync="huanVisible">

        <el-form :model="huanform">
            <el-form-item label="过期类型:" style="text-align:left;" :label-width="formLabelWidth">
                <el-button type="primary" plain @click="automatic()">自动过期</el-button>
                <el-button type="primary" plain @click="customize()">自定义过期时间</el-button>
                <p v-if="automatic_time == true" style="font-size: 12px;color: #676767;height: 18px;">
                    当URL失去热度时缓存将自动过期
                </p>
            </el-form-item>
            <el-form-item label="区域:" style="text-align:left;" :label-width="formLabelWidth" class="huancunoption">
                <el-cascader :options="citylist1" ref="cascaderAddr" v-model="citylabel"></el-cascader>
            </el-form-item>
            <el-form-item class="huancuntime" label="过期时间:" :label-width="formLabelWidth" style="text-align:left;" v-if="automatic_time == false">
                <el-date-picker v-model="huanfo" type="datetime" style="width:100%;" align="right" placeholder="选择日期时间" :picker-options="pickerOptions0">
                </el-date-picker>
                <p style="font-size: 12px;color: #676767;height: 18px;">
                    最长过期时间为三年
                </p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="huanno">取 消</el-button>
            <el-button type="primary" @click="huanVisib()">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import pageNation from "../../comm/pageNation";

import {
    query_url,
    config_url,

} from '../../servers/api'
export default {
    data() {
        return {
            timeType: 0,
            formLabelWidth: "120px",
            pager: {
                count: 0,
                page: 1,
                rows: 100
            },
            errorCode: "",
            errorUrl: "",
            tableDataActive: [],
            form: {},
            dynamicValidateForm: {},
            backUrl: "",
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogVisibleActive: false,
            dialogVisible4: false,
            dialogVisibleActive1: false,
            huancun: [],
            huancunActive: [],

            valueTime: "",
            weight: "",

            actives: 1,
            nums: 12,
            fuinput: "",
            tableData1: [{
                "errCode": "rrrr",
                "url": "yangguodong.com",
                "state": 0,

            }],
            urllist: [{
                    url: "http://www.xxx.cn.abc"
                },
                {
                    url: "http://www.xxx.cn.abc"
                },
                {
                    url: "http://www.xxx.cn.abc"
                },
                {
                    url: "http://www.xxx.cn.abc"
                },
                {
                    url: "http://www.xxx.cn.abc"
                },
                {
                    url: "http://www.xxx.cn.abc"
                }
            ],
            futableData: [{
                    configuration: "回源HOST",
                    nowconfiguration: "已配置",
                    name: "host_url"
                },
                {
                    configuration: "缓存设置",
                    nowconfiguration: "已配置",
                    name: "cache_config"
                },
                {
                    configuration: "缓存过期时间",
                    nowconfiguration: "已配置",
                    name: "cache_config"
                },
                {
                    configuration: "自定义页面",
                    nowconfiguration: "未配置",
                    name: "custom_page"
                },
                // {
                //     configuration: "Refer防盗链",
                //     nowconfiguration: "已配置",
                //     name: "refer"
                // },
                // {
                //     configuration: "URL鉴权",
                //     nowconfiguration: "已配置",
                //     name: "deny"
                // },
                // {
                //     configuration: "IP黑/白名单",
                //     nowconfiguration: "未配置",
                //     name: "ip"
                // }
            ],
            valuek: "",
            valueh: "",
            urlLinks: "",
            buser_id: "",
            tableData: [],
            nowfrom: {
                create_time: "",
                url: "",
                label: "",
                label2: "",
                host_url: {
                    url: "",
                    valid: ""
                },
                cache_config: {
                    valid: "",
                    weight: "",
                    expire_time: ""
                },
                custom_page: []
            },
            mainform: {

            },
            newfrom: {},
            multipleSelection: [],
            multipleSelection1: [],
            nowparam: {},
            nowUrl: [],
            keyUrl: "",
            huanVisible: false,
            automatic_time: true,
            citylabel: [],
            huanform: {
                vaild: "",
                expire_time: "",
                weight: "",
                citylabel: [],
                huanfo: ""
            },
            citylist1: [{
                    value: 0,
                    label: "全部"
                },
                {
                    value: "华北",
                    label: "华北",
                    children: [{
                            value: "北京",
                            label: "北京"
                        },
                        {
                            value: "内蒙古",
                            label: "内蒙古"
                        },
                        {
                            value: "山西",
                            label: "山西"
                        },
                        {
                            value: "河北",
                            label: "河北"
                        },
                        {
                            value: "天津",
                            label: "天津"
                        }
                    ]
                },
                {
                    value: "西北",
                    label: "西北",
                    children: [{
                            value: "宁夏",
                            label: "宁夏"
                        },
                        {
                            value: "陕西",
                            label: "陕西"
                        },
                        {
                            value: "甘肃",
                            label: "甘肃"
                        },
                        {
                            value: "qinghai",
                            label: "青海"
                        },
                        {
                            value: "新疆",
                            label: "新疆"
                        }
                    ]
                },
                {
                    value: "东北",
                    label: "东北",
                    children: [{
                            value: "黑龙江",
                            label: "黑龙江"
                        },
                        {
                            value: "吉林",
                            label: "吉林"
                        },
                        {
                            value: "辽宁",
                            label: "辽宁"
                        }
                    ]
                },
                {
                    value: "华东",
                    label: "华东",
                    children: [{
                            value: "福建",
                            label: "福建"
                        },
                        {
                            value: "江苏",
                            label: "江苏"
                        },
                        {
                            value: "安徽",
                            label: "安徽"
                        },
                        {
                            value: "山东",
                            label: "山东"
                        },
                        {
                            value: "上海",
                            label: "上海"
                        },
                        {
                            value: "浙江",
                            label: "浙江"
                        }
                    ]
                },
                {
                    value: "华中",
                    label: "华中",
                    children: [{
                            value: "河南",
                            label: "河南"
                        },
                        {
                            value: "湖北",
                            label: "湖北"
                        },
                        {
                            value: "江西",
                            label: "江西"
                        },
                        {
                            value: "湖南",
                            label: "湖南"
                        }
                    ]
                },
                {
                    value: "西南",
                    label: "西南",
                    children: [{
                            value: "贵州",
                            label: "贵州"
                        },
                        {
                            value: "云南",
                            label: "云南"
                        },
                        {
                            value: "重庆",
                            label: "重庆"
                        },
                        {
                            value: "四川",
                            label: "四川"
                        },
                        {
                            value: "西藏",
                            label: "西藏"
                        }
                    ]
                },
                {
                    value: "华南",
                    label: "华南",
                    children: [{
                            value: "广东",
                            label: "广东"
                        },
                        {
                            value: "广西",
                            label: "广西"
                        },
                        {
                            value: "海南",
                            label: "海南"
                        }
                    ]
                },
                {
                    value: "其他",
                    label: "其他",
                    children: [{
                            value: "香港",
                            label: "香港"
                        },
                        {
                            value: "澳门",
                            label: "澳门"
                        },
                        {
                            value: "台湾",
                            label: "台湾"
                        }
                    ]
                }
            ],
                  linKUrl:"",
              huanfo: "",
            pickerOptions0: {
                shortcuts: [{
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "明天",
                        onClick(picker) {
                            const date = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            date.setTime(date.getTime() + 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周后",
                        onClick(picker) {
                            const date = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一年后",
                        onClick(picker) {
                            const date = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "三年后",
                        onClick(picker) {
                            const date = new Date(
                                new Date(new Date().toLocaleDateString()).getTime()
                            );
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 3);
                            picker.$emit("pick", date);
                        }
                    }
                ],
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
                }
            },

        };
  
    },
    mounted: function () {
        let tempUrl = localStorage.getItem("tempUrl");
        if (tempUrl) {
            this.urlLinks = tempUrl;
        } else {
            this.urlLinks = "";
        }
        console.log(this.$route.query)
        this.linKUrl=this.$route.query.linKUrl
        this.urlname = this.$route.query.urlress;
        // this.geturlconfig();
        this.queryUrlList()
        this.queryUrlList1()
    },
    methods: {
        //添加缓存--确定
        huanVisib() {

            let tempdata = []
            let teampexpire = 0
            if (this.huanfo == "") {
                this.teampexpire = 0
            } else {
                this.teampexpire = (this.huanfo.getTime()) / 1000

            }
            let obj = {
                type: this.timeType,
                area: this.citylabel[0],
                province: this.citylabel[1],
                expire: this.teampexpire,
                state: 0,
            }
            tempdata.push(obj)
            this.nowfrom.cache_config.data = tempdata
            this.huanVisible = false;
            this.huancunActive = []
            this.huancunActive[0] = obj

        },
        //添加缓存--自动过期
        automatic() {
            this.automatic_time = true;
            this.timeType = 0
        },
        //添加缓存--自定义过期时间
        customize() {
            this.timeType = 1
            this.automatic_time = false;
        },
        updatehcadd() {
            this.huanVisible = true;
        },
        huanno() {
            let data = this.huanform;
            data.expire_time = data.expire_time / 1000;
            this.datalist.cache_con = [];
            this.datalist.cache_con.push(data);
            this.huanVisible = false;
        },
        //下一步URL查询
        onSubmitUlr() {

            this.queryUrlList1()
        },
        handleSelectionChange1() {

        },
        //获取全部URL
        handleSelectionChange(val) {
            this.multipleSelection1 = val;
            //let temp=[]
            // temp=this.multipleSelection1
            for (let i in this.multipleSelection1) {
                this.nowUrl.push(this.multipleSelection1[i].url)
            }
            console.log(this.distinct((this.nowUrl)))
        },
        distinct(arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] === arr[j]) {
                        arr.splice(j, 1)
                        j--;
                    }
                }
            }
            return arr
        },
        handleSelectionChange1(val) {
            this.multipleSelection = val;
            //console.log(this.multipleSelection)
            var obj = ['host_url', 'cache_config', 'custom_page'];
            var copy = Object.assign({}, this.nowfrom);
            for (var i = 0; i < obj.length; i++) {
                //console.log(obj[i])
                if (copy[obj[i]])
                    delete copy[obj[i]]
            }
            for (var i = 0; i < this.multipleSelection.length; i++) {
                //console.log(this.nowfrom)
                copy[this.multipleSelection[i].name] = this.nowfrom[this.multipleSelection[i].name]
            }
            this.nowparam = copy
        },
        //单页显示数据数量
        handleSizeChange() {},
        //分页
        handleCurrentChange(val) {
            this.pager.page = val.val;
            this.queryUrlList();
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //时间权重提交
        onSubmitActive() {
            this.nowfrom.cache_config.weight = parseInt(this.weight)
            if (this.valueTime) {
                this.nowfrom.cache_config.expire_time = Math.floor(this.valueTime.getTime() / 1000)
            } else {
                this.nowfrom.cache_config.expire_time = ""
            }
            this.dialogVisibleActive1 = false
        },
        //回源配置switch
        changeSwitch() {
            if (this.valuek == true) {
                this.urlno = true;
                this.nowfrom.host_url.valid = 1
            } else {
                this.urlno = false;
                this.nowfrom.host_url.valid = 0
            }
            console.log(this.nowfrom.host_url.valid)
        },
        //缓switch
        changeSwitch1() {
            if (this.valueh == true) {
                // this.urlno = true;
                this.nowfrom.cache_config.valid = 1
            } else {
                //this.urlno = false;
                this.nowfrom.cache_config.valid = 0
            }

        },
        //关闭过期时间和权重
        onSubmit3() {
            this.dialogVisible3 = false
            console.log(this.nowfrom)
        },
        //关闭过期时间和缓存
        onSubmit4() {
            this.dialogVisible4 = false
            console.log(this.nowfrom)
        },
        //关闭回源
        onSubmit1() {

            this.dialogVisible1 = false
            this.nowfrom.host_url.url = this.backUrl

            console.log(this.nowfrom)

        },
        //关闭回源
        onSubmit2() {
            this.dialogVisible2 = false
        },
        //时间权重修改
        updatehc() {
            // this.dialogVisibleActive1 = true
            this.huanVisible = true
            //huanVisible

        },

        //增加自定义页面
        addOwn() {
            this.dialogVisibleActive = false
            let obj = {
                errCode: parseInt(this.errorCode),
                url: this.errorUrl,
                state: parseInt("0")
            }
            this.tableData.push(obj)
        },
        addUrl() {
            this.dialogVisibleActive = true
        },

        //回源确定
        onSubmit() {
            this.dialogVisible = false

        },
        //回源配置
        handleClose() {

        },

        //配置
        Configuration(val) {
            console.log(val)

            if (val.configuration == "回源HOST") {
                this.dialogVisible1 = true
            } else if (val.configuration == "缓存设置") {
                this.dialogVisible2 = true
            } else if (val.configuration == "缓存过期时间") {
                this.dialogVisible3 = true
            } else if (val.configuration == "自定义页面") {
                this.dialogVisible4 = true
            }
        },
        //获取URL列表
        queryUrlList() {
            let params = new Object();
            params.page = this.pager.page - 1
            params.buser_id = ""
            params.url = this.linKUrl;

            //params.state=0
            // params.end_time=123456
            //  params.start_time=23456
            query_url(params)
                .then(res => {
                    console.log(res);
                    if (res.status == 0) {

                        //this.pager.count = res.data.total
                        //this.tableDataActive = res.data.result

                        this.tableData = res.data.result
                        this.total_cnt = res.data.total
                        this.nowfrom.url = res.data.result[0].url;
                        this.main_tag = res.data.result[0].label;
                        this.nowfrom = res.data.result[0]
                        this.main_tag = res.data.result[0].label
                        this.valueActive = res.data.result[0].label2
                        if (res.data.result[0].host_url.valid == 0) {
                            this.valuek = false
                        } else {
                            this.valuek = true
                        }
                        if (res.data.result[0].cache_config.valid == 0) {
                            this.valueh = false
                        } else {
                            this.valueh = true
                        }
                        this.backUrl = res.data.result[0].host_url.url
                        this.weight = res.data.result[0].cache_config.weight
                        let obj = {
                            url: res.data.result[0].url,
                            expire_time: res.data.result[0].cache_config.expire_time,
                            weight: res.data.result[0].cache_config.weight
                        }
                        this.huancunActive = res.data.result[0].cache_config.data
                        //this.huancun.push(obj)
                        console.log(this.huancun)
                        this.tableData = res.data.result[0].custom_page
                        this.mainform = res.data.result[0];

                        if (res.data.result[0].host_url.valid == 1) {
                            this.futableData[0].nowconfiguration = "已配置";

                        } else {
                            this.futableData[0].nowconfiguration = "未配置";

                        }
                        if (res.data.result[0].cache_config.valid == 1) {
                            this.futableData[1].nowconfiguration = "已配置";

                        } else {
                            this.futableData[1].nowconfiguration = "未配置";

                        }
                        if (res.data.result[0].cache_config.valid == 1) {
                            this.futableData[2].nowconfiguration = "已配置";

                        } else {
                            this.futableData[2].nowconfiguration = "未配置";

                        }
                        if (res.data.result[0].custom_page.length > 0) {
                            this.futableData[3].nowconfiguration = "已配置";

                        } else {
                            this.futableData[3].nowconfiguration = "未配置";

                        }

                        // res.data.result[0].host_url.valid;
                        //console.log(this.nowfrom)

                    } else {

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取URL列表
        queryUrlList1() {
            let params = new Object();
            params.page = this.pager.page - 1
            params.buser_id = ""
            params.url = this.keyUrl;

            //params.state=0
            // params.end_time=123456
            //  params.start_time=23456
            query_url(params)
                .then(res => {
                    console.log(res);
                    if (res.status == 0) {

                        this.pager.count = res.data.total
                        this.tableDataActive = res.data.result

                    } else {

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //返回
        goback() {
            this.$router.go(-1);
        },
        //复制配置下一步
        next() {
            if (this.actives == 1) {
                console.log(this.nowparam)

                var arr = Object.keys(this.nowparam)
                if (arr.length == 0) {
                    this.$message({
                        type: "warning",
                        message: "请至少选这一项复制"
                    });
                    return false
                }

            } else if (this.actives == 2) {
                const confirmText = [
                    "您确定要批量复制配置吗？",
                    "域名配置复制后，操作不可逆，请务必确认您的域名复制选择无误零流量宽带较大的域名，请谨慎复制；若您之前有通过工单进行过后端特殊配置（非控制台功能配置），该特殊配置将无法复制。"
                ];
                const newDatas = [];
                const h = this.$createElement;
                for (const i in confirmText) {
                    newDatas.push(h("p", null, confirmText[i]));
                }

                this.$confirm("提示", {
                        title: "提示",
                        message: h("div", null, newDatas),
                        showCancelButton: true,
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {

                        var data = []
                        for (var i = 0; i < this.nowUrl.length; i++) {
                            var obj = Object.assign({}, this.nowparam);
                            obj.url = this.nowUrl[i];
                            data.push(obj)
                        }
                        let param = new Object()
                        param.data_array = data
                        param.data_count = this.nowUrl.length
                        config_url(param).then(res => {
                            console.log(res)
                            if (res.status == 0) {
                                this.$message({
                                    type: "success",
                                    message: "配置成功!"
                                });

                            }
                        }).catch(error => {
                            console.log(error)
                        })

                        // this.dialupdata = false;
                        // this.actives = 1;
                        // // 请求成功之后，调用接口
                        // this.$message({
                        //     type: "success",
                        //     message: "配置成功!"
                        // });
                    })
                    .catch(() => {
                        this.dialupdata = false;
                        this.actives = 1;
                        this.$message({
                            type: "info",
                            message: "已取消操作"
                        });
                    });
            }
            if (this.actives++ > 2) {
                if (this.active++ > 2) this.active = 0;
                return false;
            }
        },
        //复制配置上一步
        last() {
            if (this.actives-- < 1) {
                // this.actives = 0;
                return false;
            }
        },

        //复制配置取消
        fureset() {
            this.actives = 1;
            this.dialupdata = false;
        },
        // 表头样式设置
        headClass() {
            return "text-align: center;background:#eef1f6;color:#333333;font-size:16px;";
        },
        // 表格样式设置
        rowClass() {
            return "text-align: center;";
        }
    },
    components: {
        pageNation
    }
};
</script>

<style lang="scss" scoped>
.copy_configuration {
    .copy_title {
        width: 1240px;
        height: 40px;
        background: rgba(224, 240, 255, 1);
        border: 1px solid rgba(97, 157, 255, 1);
        font-size: 14px;
        color: #728abd;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
        line-height: 40px;
        text-align: left;
        padding-left: 17px;
    }

    .copy_con {
        width: 1240px;
        height: 675px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
        border-radius: 6px;
        margin: 0 auto;
        padding: 45px 37px;

        .copy_prompt {
            text-align: left;
            width: 632px;
            height: 50px;
            line-height: 50px;
            background: #f0f0ff;
            margin-bottom: 2px;
            border-radius: 2px;
            display: flex;
            align-items: center;
            border-radius: 2px;

            .banyuan {
                width: 5px;
                height: 100%;
                background: #6666ff;
                border-top-left-radius: 15px;
                border-bottom-left-radius: 15px;
            }

            span {
                font-size: 18px;
                color: #6666ff;
            }
        }
    }

    .talb_title_tio {
        text-align: left;
        display: flex;

        span {
            margin-right: 45px;
        }
    }
}
</style>
