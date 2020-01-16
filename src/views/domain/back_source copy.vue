<template>
<div class="content bath_m">
    <div class="top_title">
        <span @click="goback" style="font-size: 24px;color: #202020;"><i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
            配置</span>
    </div>
    <div class="bath" style="width: 1240px;margin: auto;background: #ffffff;margin-top: 25px;border-radius: 2px;padding: 15px;box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);">
        <el-tabs :tab-position="tabPosition" v-model="oneName" @tab-click="handleClick">
            <el-tab-pane name="zero">
                <p class="bath_title_btn" slot="label">
                    <i class="el-icon-arrow-left"></i>返回域名列表
                </p>
            </el-tab-pane>
            <div class="tala_title">
                <span>{{ this.nowfrom.url }}</span>
                <div>
                    <el-button v-if="isActive" style="background: red;color:#ffffff;width:76px;height:34px;line-height: 10px;" @click="onsumbitTab(0)">停用</el-button>
                    <el-button v-else style="background: green;color:#ffffff;width:76px;height:34px;line-height: 10px;" @click="onsumbitTab(1)">启用</el-button>
                    <el-button style="width:76px;height:34px;line-height: 10px;" type="primary" @click="onsubmitq">保存</el-button>
                </div>
            </div>
            <el-tab-pane label="基础配置" name="one">

                <div style="font-weight: 600;font-size: 18px;text-align: left;margin: 10px 0;">
                    基础信息
                </div>
                <ol class="tala">
                    <li>
                        <span>创建时间</span>
                        <span class="tala_con">{{ this.nowfrom.create_time }}</span>
                    </li>
                    <li>
                        <span>域名地址</span>
                        <span class="tala_con">{{this.nowfrom.url}}</span>
                    </li>
                    <li>
                        <span>主标签</span>
                        <span class="tala_con" v-if="!xas">{{ this.nowfrom.label }}</span>
                        <el-input v-model="main_tag" placeholder="请输入主标签" v-else style="width:23%;"></el-input>
                        <span class="tala_x" @click="xsho">{{
                xas == false ? "修改" : "确定"
              }}</span>
                    </li>
                    <li>
                        <span>副标签</span>
                        <el-select v-model="valueActive" placeholder="请选择" :disabled="!fas">
                            <el-option v-for="item in labelData" :key="item.value" :label="item.label" :value="item.value" class="tala_con" style="width:250px;"></el-option>
                        </el-select>
                        <span class="tala_x" @click="fsho">{{
                fas == false ? "修改" : "确定"
              }}</span>
                    </li>
                </ol>
            </el-tab-pane>
            <el-tab-pane label="回源配置" name="two">
                <div class="talb">

                    <div style="font-weight: 600;font-size: 18px;text-align: left;margin: 10px 0;">
                        回源HOST
                    </div>
                    <div class="talb_title_tio">
                        <span>回源HOST</span>
                        <div>
                            <el-switch v-model="valuek" active-color="#13ce66" inactive-color="#EEEEEE" @change="changeSwitch"></el-switch>
                            <p>自定义CDN节点回源过程中所需访问的WEB服务器域名</p>
                        </div>
                    </div>
                    <div v-if="urlno">
                        <div class="talb_title_two">
                            <span>回源域名地址</span>
                            <span>URL：{{ this.dynamicValidateForm.backUrl  }}</span>
                            <!-- <span>主标签：{{ dynamicValidateForm.region }}</span><span>副标签：{{ dynamicValidateForm.gesg }}</span> -->
                            <span class="tala_x" @click="xzurl">修改</span>
                        </div>
                        <!-- <div v-if="dynamicValidateForm.domains" class="talb_title_two" v-for="(item, index) in dynamicValidateForm.domains" v-bind:key="index">
                            <span>回源域名地址{{ index }}</span>
                            <span>URL：{{ item.email }}</span>
                            <span>主标签：{{ item.region }}</span><span>副标签：{{ item.gesg }}</span>
                            <span class="tala_x" @click="xfurl(index)">修改</span>
                        </div> -->
                    </div>

                </div>
            </el-tab-pane>

            <el-tab-pane label="缓存配置" name="there">

                <el-tabs v-model="activeName">
                    <el-tab-pane label="缓存设置" name="first">
                        <div class="talb_title_tio">
                            <span>缓存自动刷新</span>
                            <div>
                                <el-switch v-model="valueh" active-color="#13ce66" inactive-color="#EEEEEE" @change="changeSwitch"></el-switch>
                                <p>
                                    开启后，能够自动发现加速节点的同名缓存刷新，并自动同步最新缓存
                                </p>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="缓存过期时间" name="second">
                        <div>
                            <!-- <div class="seach" style="margin-top:0px;">
                                <div class="seach_top">
                                    <el-input placeholder="操作内容、渠道ID" style="width:200px" v-model="inputaddActive" maxlength="70" class="input-with-select" @keyup.enter.native="onSubmitKey">
                                        <i slot="prefix" class="el-input__icon el-icon-search" @click="seachuser()"></i>
                                    </el-input>
                                    <div class="seach_top_right" @click="option_display()">
                                        筛选
                                        <i class="el-icon-caret-bottom" :class="[rotate ? 'fa fa-arrow-down go' : 'fa fa-arrow-down aa']"></i>
                                    </div>
                                </div>
                                <div v-if="optiondisplay" class="seach_bottom">
                                    <span>操作类型：</span>
                                    <el-select v-model="valueAdd" placeholder="请选择">
                                        <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                    <span>注册时间：</span>
                                    <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                                    <div class="seach_bottom_btn">
                                        <el-button type="primary" plain size="mini" @click="seachuser()">确定</el-button>
                                        <el-button plain size="mini" @click="reset()">重置</el-button>
                                    </div>
                                </div>
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
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="自定义页面" name="four">

                <div style="text-align: left;margin: 15px 0;" class="customize">
                    <el-button type="primary" style="width:100px;" @click="dialogFormVisible = true">添加</el-button>

                </div>

                <div>
                    <el-table :data="tableData2" stripe style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
                        <el-table-column prop="errCode" label="错误码"> </el-table-column>
                        <el-table-column prop="url" label="链接"> </el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <span style="color:#E54545" v-if="scope.row.state == 0">已停止</span>
                                <span style="color:#0ABF5B" v-else>启动中</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="handleOnClick(scope.$index,scope.row)" type="text" size="small">{{
                      scope.row.state == 0 ? "启动" : "停止"
                    }}</el-button>
                                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableList)" style="color:#000000">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>

    <!--  -->
    <el-dialog title="请输入回源域名地址" :visible.sync="dialogVisible" width="630px">
        <!-- 分割 -->
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="bath_demo_dynamic">
            <el-form-item prop="backUrl" label="回源地址:" :rules="[{ validator: jiourl, trigger: 'blur' }]">
                <!-- <span style="top: 0px;left: 5px;">https://</span> -->
                <el-input v-model="dynamicValidateForm.backUrl" placeholder="请输入回源域名地址" maxlength="70" style="width:400px" class="myActive">

                </el-input>

            </el-form-item>
        </el-form>
        <div style="display: flex;justify-content: center;">
            <el-button @click="resetForm('dynamicValidateForm')">取 消</el-button>
            <el-button type="primary" @click="onSubmitBack('dynamicValidateForm')">确 定</el-button>
        </div>
        <!-- 分割 -->

    </el-dialog>
    <el-dialog title="请修改过期时间和权重" :visible.sync="dialogVisible1" width="630px">
        <!-- 分割 -->
        <el-form :model="dynamicValidateForm1" ref="dynamicValidateForm1" label-width="100px" class="bath_demo_dynamic">
            <el-form-item prop="email" label="权重" :rules="{
                    required: true,
                    message: '域名不能为空',
                    trigger: 'blur'
                  }">
                <el-input v-model="weight" placeholder="请输入权重" style="width:350px;"></el-input>
            </el-form-item>
            <el-form-item label="过期时间">

                <el-date-picker style="width:350px;" v-model="valueTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>

            </el-form-item>

        </el-form>
        <div style="display: flex;justify-content: center;">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitBack1">确 定</el-button>
        </div>
        <!-- 分割 -->

    </el-dialog>
    <!-- 添加弹窗 -->
    <el-dialog title="添加自定义页面" :visible.sync="dialogFormVisible">
        <el-form :model="dynamicValidateFormMy" ref="dynamicValidateFormMy">
            <el-form-item label="错误码" prop="errorCode" :label-width="formLabelWidth" :rules="[{ validator: jiourl2, trigger: 'blur' }]">
                <el-input v-model="dynamicValidateFormMy.errorCode"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="errorUrl" :label-width="formLabelWidth" :rules="[{ validator: jiourl1, trigger: 'blur' }]">
                <el-input v-model="dynamicValidateFormMy.errorUrl"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOwn('dynamicValidateFormMy')">确 定</el-button>
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
import {
    query_url,
    config_url,
    delete_url,
    change_state,
    add_url,
    getterminal
} from "../../servers/api";
// import { add_url,getterminal } from "../../servers/api";
export default {
    data() {
        return {
            timeType: 0,
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
            automatic_time: true,
            huanVisible: false,
            dynamicValidateFormMy: {
                errorCode: "",
                errorUrl: ""

            },
            value1: "",
            valueAdd: "",
            options: [{
                    value: -1,
                    label: "全部"
                },

                {
                    value: 0,
                    label: "URL刷新"
                },
                {
                    value: 1,
                    label: "内容预热"
                }
            ],
            rotate: false,
            inputaddActive: "",
            optiondisplay: false,
            errorCode: "",
            errorUrl: "",
            valueTime: "",
            isActive: true,
            setstate: false,
            urlname: "165165165URL",
            tabPosition: "left",
            create_time: "2019-11-05 15:30:21",
            url: "http://www.xxxxx.cn",
            main_tag: "unite-1a",
            xas: false,
            fas: false,
            dialogVisible: false,
            dialogVisible1: false,
            urlno: false,
            dialogFormVisible: false,
            oneName: "one",
            activeName: "first",
            huiinput: "",
            formLabelWidth: "120px",
            huancun: [{
                hcaddress: "http://www.360.com",
                hctime: "2018-09-03",
                hcweig: 18,
                hcstatus: "异常"
            }],
            huancunActive: [{
                hcaddress: "http://www.360.com",
                hctime: "2018-09-03",
                hcweig: 18,
                hcstatus: "异常"
            }],
            dynamicValidateForm: {
                domains: [{
                    email: "",
                    region: "",
                    gesg: ""
                }],
                backUrl: "",
                email: "1212",
                region: "45454",
                gesg: "7856786"
            },
            dynamicValidateForm1: {
                domains: [{
                    email: "",
                    region: "",
                    gesg: ""
                }],
                email: "1212",
                region: "45454",
                gesg: "7856786"
            },
            mv1: "",
            mv2: "",
            region1: "1",
            region2: "",
            form: {
                name: "",
                url: ""
            },
            options: [{
                    value: 1,
                    label: "1"
                },
                {
                    value: 2,
                    label: "2"
                }
            ],
            tableData: [],
            tableData2: [],

            value: "",
            valuek: false,
            valueh: false,
            valuet: false,
            valuez: false,
            valueActive: "",
            urlLinks: "",
            backUrl: "",
            weight: "",
            indexTab: 0,
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
                    expire_time: "",
                    data: [{
                        type: 0,
                        area: "",
                        state: 0,
                        expire: "",
                        province: "",

                    }],
                },
                custom_page: []
            },
            nowStatus: 0,
            nowUrl: "",
            labelData: [],
            pageActive: 0,
            huanfo: "",
            teampexpire: 0,
            newObj: {},
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
    mounted() {
        let tempUrl = localStorage.getItem("tempUrl");
        if (tempUrl) {
            this.urlLinks = tempUrl;
        } else {
            this.urlLinks = "";
        }
        this.urlname = this.$route.query.urlress;
        // this.geturlconfig();

        this.queryInfoLabel();
        this.queryUrlList();
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
        huanno() {
            let data = this.huanform;
            data.expire_time = data.expire_time / 1000;
            this.datalist.cache_con = [];
            this.datalist.cache_con.push(data);
            this.huanVisible = false;
        },
        //查询副标签
        queryInfoLabel() {
            let param = new Object();

            (param.chanid = "0"), (param.page = this.pageActive);
            getterminal(param)
                .then(res => {
                    if (res.status == 0)
                        res.result.cols.forEach((item, index) => {
                            let obj = {};
                            obj.value = item.id;
                            obj.label =
                                "渠道ID（" +
                                item.chanid +
                                "）--" +
                                item.name +
                                "--" +
                                item.type;
                            obj.chanid = item.chanid;
                            // obj.label= item.id+"+"+item.chanid+"+"+item.name
                            this.labelData.push(obj);
                        });
                    if (res.result.les_count == 0) {
                        return false;
                    } else {
                        this.pageActive++;
                        this.queryInfoLabel();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //回源URL取消失焦
        resetForm(formName) {
            if (this.dynamicValidateForm.backUrl == "") {
                this.valuek = false
            }
            this.dialogVisible = false;

            this.$refs[formName].resetFields();
        },
        //校验url
        jiourl(rule, value, callback) {
            console.log(value);
            if (value === "") {
                callback(new Error("请输入URL"));
            } else {
                var resyzm = /^http(s)?:\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,?^=%&:\/~\+#]*)+)?$/;
                // objExp = new RegExp(resyzm);
                if (resyzm.test(value) === false) {
                    callback(new Error("URL格式错误"));
                } else {
                    callback();
                }
            }
        },
        //校验url
        jiourl1(rule, value, callback) {
            console.log(value);
            if (value === "") {
                callback(new Error("请输入URL"));
            } else {
                var resyzm = /^http(s)?:\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,?^=%&:\/~\+#]*)+)?$/;
                // objExp = new RegExp(resyzm);
                if (resyzm.test(value) === false) {
                    callback(new Error("URL格式错误"));
                } else {
                    callback();
                }
            }
        },
        //校验CODE
        jiourl2(rule, value, callback) {
            console.log(value);
            if (value === "") {
                callback(new Error("请输入错误码"));
            } else {
                var resyzm = /^[0-9]+(.[0-9]{1,3})?$/;
                // objExp = new RegExp(resyzm);
                if (resyzm.test(value) === false) {
                    callback(new Error("错误码格式错误"));
                } else {
                    callback();
                }
            }
        },
        //筛选按钮
        option_display() {
            this.optiondisplay = !this.optiondisplay;
            this.rotate = !this.rotate;
        },
        //启用停用
        onsumbitTab(val) {
            if (val == 0) {
                this.$confirm("确定要停用操作", "提示", {
                        type: "warning"
                    })
                    .then(() => {
                        let tempArr = [];
                        let tempArr1 = [];
                        tempArr[0] = this.nowUrl;
                        tempArr[1] = 0;
                        tempArr1.push(tempArr);
                        let param = {
                            data_count: 1,
                            data_array: tempArr1
                        };
                        change_state(param)
                            .then(res => {
                                console.log(res);
                                if (res.status == 0) {
                                    this.$message({
                                        message: "停用成功",
                                        type: "success"
                                    });
                                    this.queryUrlList();
                                    this.common.monitoringLogs("修改 ", "禁用URL", 1);
                                } else {
                                    this.common.monitoringLogs("修改 ", "禁用URL", 0);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(() => {});
            } else {
                this.$confirm("确定要执启用操作", "提示", {
                        type: "warning"
                    })
                    .then(() => {
                        //启用
                        let tempArr = [];
                        let tempArr1 = [];
                        tempArr[0] = this.nowUrl;
                        tempArr[1] = 1;
                        tempArr1.push(tempArr);
                        let param = {
                            data_count: 1,
                            data_array: tempArr1
                        };
                        change_state(param)
                            .then(res => {
                                console.log(res);
                                if (res.status == 0) {
                                    this.$message({
                                        message: "启用成功",
                                        type: "success"
                                    });
                                    this.common.monitoringLogs("修改 ", "启用URL", 1);
                                    this.queryUrlList();
                                } else {
                                    this.common.monitoringLogs("修改 ", "启用URL", 0);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(() => {});
            }
        },
        //删除
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //添加自定义页面
        addOwn111() {
            this.dialogFormVisible = false;
            let obj = {
                errCode: parseInt(this.errorCode),
                url: this.errorUrl,
                state: parseInt("0")
            };
            this.tableData2.push(obj);
        },
        //回源地址域名
        onSubmitBack(forname) {
            this.$refs[forname].validate(valid => {
                if (valid) {
                    this.dialogVisible = false;
                    console.log(this.nowfrom.host_url.url);
                    this.nowUrl = this.dynamicValidateForm.backUrl;
                    this.nowfrom.host_url.url = this.dynamicValidateForm.backUrl;
                    console.log(this.nowfrom.host_url.url);
                }
            });
        },
        //自定义配置限制
        addOwn(forname) {
            this.$refs[forname].validate(valid => {
                if (valid) {
                    this.dialogFormVisible = false;
                    let obj = {
                        errCode: parseInt(this.dynamicValidateFormMy.errorCode),
                        url: this.dynamicValidateFormMy.errorUrl,
                        state: parseInt("1")
                    };
                    this.tableData2.push(obj);
                }
            });
        },
        //缓存配置提交
        onSubmitBack1() {
            this.dialogVisible1 = false;
            this.nowfrom.cache_config.weight = this.weight;
            if (this.valueTime) {
                this.nowfrom.cache_config.expire_time = Math.floor(
                    this.valueTime.getTime() / 1000
                );
            } else {
                this.nowfrom.cache_config.expire_time = "";
            }
        },
        //提交
        onsubmitq() {
            this.nowfrom.custom_page = this.tableData2;
            this.nowfrom.cache_config.weight = parseInt(
                this.nowfrom.cache_config.weight
            );
            //  let nobj = new Object();
            // nobj = JSON.stringify(this.nowfrom);
            let data_array1 = [];
            data_array1.push(this.nowfrom);
            let newparam = new Object();
            newparam.data_count = 1;
            newparam.data_array = data_array1;

            //   let  data_array=[]
            //   data_array.push(this.nowfrom)
            //   let data_count = 1
            //  let newparam={
            //    data_count:data_count,
            //    data_array:data_array
            //  }
            //params.data_count = 1;
            //let params = new Object();
            //let data_array1 = [];
            //data_array1.push(this.nowfrom);
            // params.data_array=[]

            // params.data_count = 1;
            // params.data_array.push(this.nowfrom);
            //console.log(param);
            config_url(newparam)
                .then(res => {
                    console.log(res);
                    if (res.status == 0) {
                        if (res.data.res_data[0][1] == false) {
                            this.$message({
                                message: "保存失败",
                                type: "error"
                            });
                        } else {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });

                        }

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //获取URL列表
        queryUrlList() {
            let params = new Object();
            params.page = 0;
            params.buser_id = "";
            params.url = this.urlLinks;

            //params.state=0
            // params.end_time=123456
            //  params.start_time=23456
            query_url(params)
                .then(res => {
                    console.log(res);
                    if (res.status == 0) {
                        // this.tableData = res.data.result;
                        this.total_cnt = res.data.total;
                        this.nowfrom.url = res.data.result[0].url;
                        this.main_tag = res.data.result[0].label;
                        this.nowfrom = res.data.result[0];
                        this.main_tag = res.data.result[0].label;
                        this.valueActive = res.data.result[0].label2;
                        if (res.data.result[0].host_url.valid == 0) {
                            this.valuek = false;
                            this.urlno = false;
                        } else {
                            this.valuek = true;
                            this.urlno = true;
                        }
                        if (res.data.result[0].cache_config.valid == 0) {
                            this.valueh = false;
                        } else {
                            this.valueh = true;
                        }
                        this.dynamicValidateForm.backUrl = res.data.result[0].host_url.url;
                        console.log(this.dynamicValidateForm.backUrl);
                        this.backUrl = res.data.result[0].host_url.url;
                        this.weight = res.data.result[0].cache_config.weight;
                        let obj = {
                            url: res.data.result[0].url,
                            expire_time: res.data.result[0].cache_config.expire_time,
                            weight: res.data.result[0].cache_config.weight
                        };
                        this.huancun = [];
                        this.huancunActive = res.data.result[0].cache_config.data,
                            this.huancun.push(obj);
                        this.tableData2 = res.data.result[0].custom_page;
                        if (res.data.result[0].state == 1) {
                            this.isActive = true;
                        } else {
                            this.isActive = false;
                        }
                        this.nowUrl = res.data.result[0].url;

                        // res.data.result[0].host_url.valid;
                        console.log(this.nowfrom);
                    } else {}
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //请求数据--获取配置信息
        geturlconfig() {
            let parmas = new Object();
            parmas.url = this.urlname;
            parmas.page = 0;
            parmas.buser_id = "";
            query_url(parmas)
                .then(res => {
                    console.log(res);
                    this.create_time = res.data.result[0].create_time;

                    this.value = res.data.result[0].label2;
                    this.dynamicValidateForm.email = res.data.result[0].host_url.url;
                    this.valuek = res.data.result[0].host_url.valid;
                    this.valueh = res.data.result[0].cache_config.valid;
                    let obj = {};
                    obj.expire_time = res.data.result[0].cache_config.expire_time;
                    obj.weight = res.data.result[0].cache_config.weight;
                    this.huancun.push(obj);
                    this.tableData2 = res.data.result[0].custom_page;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //请求数据--url
        setqueryurl() {},
        goback() {
            this.$router.go(-1);
        },
        //修改主标签
        xsho() {
            this.xas = !this.xas;
            if (this.xas == false) {
                this.nowfrom.label = this.main_tag;
                //this.
            }
        },
        //修改副标签
        fsho() {
            this.fas = !this.fas;
            if (this.fas == false) {
                this.nowfrom.label2 = this.valueActive;
            }
        },
        //修改回源配置-主
        xzurl() {
            this.dialogVisible = true;
        },
        //修改回源配置-副
        xfurl(data) {},
        //删除回源地址
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        //添加回源地址
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: "",
                key: Date.now()
            });
        },
        handleClick() {},
        handleOnClick(index, event) {
            console.log(event);
            console.log(this.tableData2[0].state);
            console.log(this.tableData2[index].state);
            if (event.state == 0) {
                // console.log(this.tableData[index].status+"&")
                this.tableData2[index].state = 1;
            } else {
                // console.log(this.tableData[index].status+"*")
                this.tableData2[index].state = 0;
            }

            console.log(this.tableData);
            // if (tab.name == "zero") {
            //     this.$router.push({
            //         path: "/domain_management"
            //     });
            // }
        },
        //回源配置switch
        changeSwitch() {
            if (this.valuek == true) {
                this.urlno = true;
                this.dialogVisible = true;
                this.nowfrom.host_url.valid = 1;
            } else {
                this.urlno = false;
                this.nowfrom.host_url.valid = 0;
            }
        },
        //缓switch
        changeSwitch1() {
            if (this.valueh == true) {
                // this.urlno = true;
                this.nowfrom.cache_config.valid = 1;
            } else {
                //this.urlno = false;
                this.nowfrom.cache_config.valid = 0;
            }
        },
        updatehcadd() {
            this.huanVisible = true;
        },
        //缓存删除
        updatehc(data, index) {
            console.log(index)
            this.indexTab = index
            this.newObj
            this.newObj.type = this.timeType,
                this.newObj.area = this.citylabel[0],
                this.newObj.province = this.citylabel[1],
                this.newObj.expire = this.teampexpire,
                this.newObj.state = 0,
                // let obj={
                //     type:this.timeType,
                //     area:this.citylabel[0],
                //     province:this.citylabel[1],
                //     expire:this.teampexpire,
                //     state:0,
                //   }
                this.huanVisible = true;
            // console.log(this.huancunActive[index]);
            // this.huancunActive[index] = obj
            // console.log(this.huancunActive[index]);
        },
        delhc(data) {
            console.log(data);
        },
        // 表头样式设置
        headClass() {
            return "text-align: center;background:#eef1f6;";
        },
        // 表格样式设置
        rowClass() {
            return "text-align: center;";
        }
    }
};
</script>

<style lang="scss" scoped>
.Myactive {
    background: red;
}

.class22 {
    background: green;
}

.content {

    // width: 1240px;
    // margin: auto;
    // padding: 19px;
    // margin-top: 34px;
    // background: #ffffff;
    .bath_title_btn {
        font-size: 16px;

        i {
            font-size: 16px;
            font-weight: 600;
            margin-right: 5px;
        }
    }

    .tala_title {
        height: 50px;
        line-height: 50px;
        // background: #eeeeee;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            color: #333333;
            font-size: 18px;
            font-weight: 600;
        }
    }

    .tala {
        li {
            height: 50px;
            line-height: 50px;
            text-align: left;

            span {
                margin-right: 25px;
            }

            .tala_con {
                display: inline-block;
                width: 200px;
            }
        }
    }

    .tala_x {
        margin-left: 10px;
        color: rgb(64, 158, 255);
    }

    .talb_title_tio {
        text-align: left;
        display: flex;

        span {
            margin-right: 45px;
        }
    }

    .talb_title_two {
        text-align: left;
        display: flex;
        margin: 15px 0;

        span {
            margin-right: 30px;
        }
    }
}

.myActive {
    input {
        text-indent: 35px !important;
    }
}
</style>
