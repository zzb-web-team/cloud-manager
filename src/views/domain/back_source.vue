<template>
  <div class="content bath_m">
    <div class="top_title">
      <span @click="goback" style="font-size: 24px;color: #202020;">
        <i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
        {{urlLinks}}</span>
    </div>
    <div class="bath" style="margin: auto;background: #ffffff;margin-top: 25px;border-radius: 2px;padding: 15px;box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);">
      <el-tabs v-model="oneName" @tab-click="handleClick" v-loading="loading" ref="tabs">
        <div class="tala_title" style="display:flex;justify-content:flex-end;">
          <!-- <span style="max-width: 230px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ datalist.url }}</span> -->
          <div>
            <el-button v-if="datalist.state == 1" @click="disableuser(0)" style="background:#E05050;color:#ffffff;width:76px;height:34px;line-height: 10px;">停用</el-button>
            <el-button v-else @click="disableuser(1)" style="background:#0ABF5B;color:#ffffff;width:76px;height:34px;line-height: 10px;">启用</el-button>

          </div>
        </div>

        <el-tab-pane label="基础配置" name="one">
          <!-- <div style="font-weight: 600;font-size: 18px;text-align: left;margin: 10px 0;">
                    基础信息
                </div> -->
          <ol class="tala">
            <li>
              <span>创建时间</span>
              <span class="tala_con">{{ datalist.create_time | settimes }}
              </span>
            </li>
             <li>
              <span>渠道ID&nbsp;&nbsp;&nbsp;</span>
              <span class="tala_con">{{ datalist.buser_id}}
              </span>
            </li>
            <li style="    display: flex;justify-content: flex-start;align-items: center;">
              <span>源站域名</span>
              <el-select v-model="datalist.domainId" placeholder="请选择" @change="onchange">
                <el-option v-for="(item, index) in labelData" :key="index + item" :label="item.label" :value="item.value" style="width:250px;">
                </el-option>
              </el-select>
            </li>
            <li style="    display: flex;justify-content: flex-start;align-items: center;">
              <span>回源路径</span>
              <div class="tala_con" style="width: 295px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ datalist.label2 }}</div>
              <span style="color: rgb(64, 158, 255);" @click="cleckurl(1)">修改</span>
            </li>
            <el-dialog :title="title_content" :visible.sync="zurl" width="30%">
              <el-input v-model="sleckurl"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSave(1)">确 定</el-button>
              </span>
            </el-dialog>
            <li style="    display: flex;justify-content: flex-start;align-items: center;">
              <span>播放路径</span>
              <div class="tala_con" style="width: 295px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ datalist.label2s }}</div>
              <span style="color: rgb(64, 158, 255);" @click="cleckurl(2)">修改</span>
            </li>
              <el-dialog :title="title_content" :visible.sync="zurl1" width="30%">
              <el-input v-model="sleckurl"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSave(2)">确 定</el-button>
              </span>
            </el-dialog>
            <li style="    display: flex;justify-content: flex-start;align-items: center;">
              <span>视频格式</span>

              <el-select v-model="datalist.url_type" placeholder="请选择" @change="onchangeType">
                <el-option v-for="(item, index) in yewu" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </li>

            <!-- <el-dialog title="url" :visible.sync="zurl" width="30%">
              <span>{{ sleckurl }}</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="zurl = false">确 定</el-button>
              </span>
            </el-dialog> -->

          </ol>
        </el-tab-pane>

        <el-tab-pane label="缓存配置" name="there">
          <div class="talb_title_tio">
            <div style="display: flex;"><p class="talb_title_p"></p>缓存自动刷新</div>
            <div style="display: flex">
              <p style="margin-left: 25px;margin-top: 10px;">{{valueh ? '开启' : '未开启'}}</p>
              <div style="margin-left: 25px;margin-top: 10px;">
                <el-switch v-model="valueh" active-color="#13ce66" inactive-color="#EEEEEE" @change="changeSwitch2"></el-switch>
                <p style="margin-top: 12px;">开启后，能够自动发现加速节点的同名缓存刷新，并自动同步最新缓存</p>
              </div>
            </div>
          </div>
          <div class="talb_title_tio" style="margin-top: 28px;">
            <div style="display: flex;"><p class="talb_title_p"></p>缓存过期时间</div>
            <div style="display: flex; align-items: center;">
              <p style="margin-left: 25px;">过期时间</p>
              <div style="margin-left: 25px;display: flex; align-items: center;">
                <p style="margin-right: 25px;" v-if="expireTime&&!valueh">{{expireTime | settimes}}</p>
                <p style="margin-right: 25px;" v-else>默认自动过期</p>
                <el-button type="text" :disabled="valueh" @click="huanVisible = true;">设置</el-button>
              </div>
            </div>
          </div>
          <el-dialog title="配置缓存过期时间" :visible.sync="huanVisible">
            <el-form :model="huanform">
              <el-form-item label="过期类型:" style="text-align:left;" :label-width="formLabelWidth">
                <el-radio-group v-model="radio1" @change="selecttime()" class="huandan">
                  <el-radio-button label="自动过期"></el-radio-button>
                  <el-radio-button label="自定义时间"></el-radio-button>
                </el-radio-group>

                <p v-if="automatic_time == true" style="font-size: 12px;color: #676767;height: 18px;">
                  当加速内容失去热度时缓存将自动过期
                </p>
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
          <!-- <el-tabs v-model="activeName">
            <el-tab-pane label="缓存设置" name="first">
              <div class="talb_title_tio">
                <span>缓存自动刷新</span>
                <div>
                  <el-switch v-model="valueh" active-color="#13ce66" inactive-color="#EEEEEE" @change="changeSwitch2"></el-switch>
                  <p>
                    开启后，能够自动发现加速节点的同名缓存刷新，并自动同步最新缓存
                  </p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="缓存过期时间" name="second">
              <div class="batch_huan">
                <div style="text-align:left;padding: 10px 0">
                  <el-button type="primary" style="width:100px;" @click="
                      huanVisible = true;
                      edit = 0;
                      editnum = '';
                      city_disabled = false;
                      huanform.type=0;
                      radio1 = '自动过期';
                    ">
                    <span class="el-icon-plus"></span>配置</el-button>
                </div>
                <el-dialog title="配置缓存过期时间" :visible.sync="huanVisible">
                  <el-form :model="huanform">
                    <el-form-item label="过期类型:" style="text-align:left;" :label-width="formLabelWidth">
                      <el-radio-group v-model="radio1" @change="selecttime()" class="huandan">
                        <el-radio-button label="自动过期"></el-radio-button>
                        <el-radio-button label="自定义时间"></el-radio-button>
                      </el-radio-group>

                      <p v-if="automatic_time == true" style="font-size: 12px;color: #676767;height: 18px;">
                        当URL失去热度时缓存将自动过期
                      </p>
                    </el-form-item>
                    <el-form-item label="区域:" style="text-align:left;" :label-width="formLabelWidth" class="huancunoption">
                      <el-cascader :options="citylist1" ref="cascaderAddr" v-model="citylabel" :disabled="city_disabled"></el-cascader>
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

                <el-table :data="datalist.cache_con" border :cell-style="rowClass" :header-cell-style="headClass" height="580">
                  <el-table-column prop="area" label="区域"> </el-table-column>
                  <el-table-column prop="province" label="城市">
                  </el-table-column>
                  <el-table-column prop="expire" label="过期时间">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type == 0">自动过期</span>
                      <span v-else>{{ scope.row.expire | settimes }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                      <span>{{ scope.row.state == 0 ? "缓存中" : "已过期" }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button @click="xhuanVisib(scope.row, scope.$index)" type="text" size="small">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs> -->
        </el-tab-pane>
        <el-tab-pane label="自定义页面" name="four">
          <div style="text-align: left;margin: 15px 0;" class="customize">
            <el-button type="primary" style="width:100px;" @click="dialogFormVisible = true">
              <span class="el-icon-plus"></span>添加</el-button>
            <!-- 添加弹窗 -->
            <el-dialog title="自定义错误码" :visible.sync="dialogFormVisible" @close="handleClick4">
              <el-form :model="form" ref="form">
                <el-form-item label="错误码" prop="errCode" :label-width="formLabelWidth" :rules="[{ validator: jioerrcode, trigger: 'blur' }]">
                  <el-input v-model.number="form.errCode" placeholder="请输入三位数字错误码，如（105，403）" autocomplete="off" maxlength="3"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" :label-width="formLabelWidth" prop="url" :rules="[{ validator: jiourl, trigger: 'blur' }]">
                  <el-input v-model="form.url" placeholder="请输入URL" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="zareno('form')">取 消</el-button>
                <el-button type="primary" @click="zareVisible('form')">确 定</el-button>
              </div>
            </el-dialog>
          </div>

          <div class="pei_zhi_tabel">
            <el-table :data="datalist.custom_page" stripe style="width: 100%" :cell-style="rowClass" :header-cell-style="headClass">
              <el-table-column prop="errCode" label="错误码"> </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span style="color:#E54545" v-if="scope.row.state == 1">已停止</span>
                  <span style="color:#0ABF5B" v-else>启动中</span>
                </template>
              </el-table-column>
              <el-table-column class="pei_zi_url" label="链接">
                <template slot-scope="scope">

                  <div style="width: 240px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin:0 auto;">{{scope.row.url}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="zidingyi(scope.$index)" type="text" size="small">{{ scope.row.state == 1 ? "启动" : "停止" }}</el-button>
                  <el-button type="text" size="small" style="color:#000000" @click="delzi(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  query_url,
  config_url,
  change_state,
  getterminal,
  check_label,
  query_config,
  query_domain,
} from "../../servers/api";
import { dateToMs, getymdtime, setbatime } from "../../servers/sevdate";
export default {
  // inject: ["reload"],
  data() {
    return {
      title_content: "回源路径",
      pageActive: 0,
      nowcharId: "",
      pageActive: 0,
      yewu: [
        {
          value: 0,
          label: "mp4",
        },
        {
          value: 1,
          label: "hls",
        },
        {
          value: 2,
          label: "flv",
        },
      ],
      city_disabled: false,
      loading: false,
      huiurl: {
        url: "",
      },
      setstate: false,
      sleckurl: "",
      urlname: "",
      edit: 0,
      radio1: "自动过期",
      editnum: "",
      tabPosition: "left",
      zurl: false,
      zurl1:false,
      xas: false,
      fas: false,
      dialogVisible: false,
      huanVisible: false,
      urlno: false,
      dialogFormVisible: false,
      optiondisplay: false,
      rotate: false,
      oneName: "one",
      host_input: "",
      host_state: "",
      host_time: "",
      activeName: "first",
      formLabelWidth: "100px",
      oldlabel: "",
      huancun: [],
      citylist1: [
        {
          value: "华北",
          label: "华北",
        },
        {
          value: "西北",
          label: "西北",
        },
        {
          value: "东北",
          label: "东北",
        },
        {
          value: "华东",
          label: "华东",
        },
        {
          value: "华中",
          label: "华中",
        },
        {
          value: "西南",
          label: "西南",
        },
        {
          value: "华南",
          label: "华南",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      dynamicValidateForm: {
        email: "1212",
      },
      mv1: "",
      mv2: "",
      form: {
        errCode: "",
        url: "",
        state: 0,
      },
      huanform: {
        type: 0,
        area: "",
        province: "",
        expire: 0,
        state: 0,
      },
      options: [
        {
          value: 0,
          label: "0",
        },
        {
          value: 1,
          label: "1",
        },
      ],
      label2: [],
      hostoptions: [
        {
          value: 0,
          label: "缓存中",
        },
        {
          value: 1,
          label: "已过期",
        },
      ],
      tableData: [],
      valuek: false,
      valueh: false,
      datalist: {
        url: "",
        label: "",
        create_time: "",
        label2: 0,
        label2s: "",
        url_name: "",
        url_type: "0",
        domainId: "",
        state: 0,
        host_url: {},
        cache_con: [],
        custom_page: [],
        buser_id:""
      },
      labelData: [],
      page: 0,
      chanid: "",
      huanfo: "",
      automatic_time: true,
      updatadate:false,
      expireTime: '',
      pickerOptions0: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一年后",
            onClick(picker) {
              const date = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
              picker.$emit("pick", date);
            },
          },
          {
            text: "三年后",
            onClick(picker) {
              const date = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 3);
              picker.$emit("pick", date);
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      citylabel: [],
      urlLinks: "",
      buser_ids: "",
      oneName: "",
      pageActive:0,
    };
  },
  filters: {
    settimes(data) {
      if (data) {
        var stat = String(data).length == 10 ? getymdtime(data) : getymdtime(data/1000);
        return stat;
      } else {
        return data;
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
			this.$refs.tabs.$children[0].$refs.tabs[2].style.display="none";
		})
    let tempUrl = localStorage.getItem("tempUrl");
    if (tempUrl) {
      this.urlLinks = tempUrl;
    } else {
      this.urlLinks = "";
    }
    let tempChanId = localStorage.getItem("tempChanId");
    if (tempChanId) {
      this.buser_ids = tempChanId;
    } else {
      this.buser_ids = "";
    }
    let tabIndex = this.$route.query.tabpne;
    if (tabIndex) {
      this.oneName = tabIndex;
    } else {
      this.oneName = "one";
    }

    this.citylabel = ["华北", "北京"];
    // if (this.$cookies.get("id")) {
    //   this.chanid = this.$cookies.get("id") * 1;
    // } else {
    //   this.$router.push({ path: "/" });
    // }
    this.urlname = this.$route.query.urlress;
    if (this.$route.query.tabpne) {
      if (this.$route.query.tabpne == "second") {
        this.oneName = "there";
        this.activeName = "second";
      } else {
        this.oneName = this.$route.query.tabpne;
      }
    }
    this.label2 = [];
    this.options = [];
    this.geturlconfig();
    this.getlabrl2();
    this.gettimeInfo();
    this.queryInfoLabel();
  },
  methods: {
    //保存
    onSave(type) {
      if(type==1){
         this.updateurl(1);
              this.zurl = false;
      } else if(type==2){
         this.updateurl(2);
              this.zurl1 = false;
      }
 
     
    },
    //源站域名
    queryInfoLabel() {
      let param = new Object();

      // param.chanid = this.dynamicValidateForm.newbuser_id;
      // this.dynamicValidateForm.bind_id = this.dynamicValidateForm.newbuser_id;
      // if (param.chanid.length != 12) {
      //     return false;
      // }
      (param.buser_id = this.buser_ids),
        (param.domain = ""),
        (param.state = -1),
        (param.start_time = 0),
        (param.end_time = 0),
        (param.order = 0),
        (param.page = 0);
      param.page = this.pageActive;
      query_domain(param)
        .then(res => {
          console.log(res);
          if (res.status == 0)
            res.data.result.forEach((item, index) => {
              let obj = {};
              obj.value = item.domain_id;
              // obj.label =
              //   "渠道ID（" + item.chanid + "）--" + item.name + "--" + item.type;
              // obj.chanid = item.chanid;
              // this.labelData = [];
              obj.label = item.domain;
              this.labelData.push(obj);
            });
          console.log(this.labelData);
          console.log(res.data.remaining);
          if (res.data.remaining == 0) {
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
    //获取时间
    gettimeInfo() {
      //查看url{
      let parmas = new Object();
      parmas.url = this.urlLinks;
      parmas.page = 0;
      // parmas.type= 0
      parmas.buser_id = this.buser_ids;
      query_url(parmas)
        .then(res => {
          // this.datalist.create_time = res.data.base_config.create_time;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cleckurl(type) {

      if (type == 1) {
              this.zurl = true;
        this.sleckurl = this.datalist.label2;
        this.title_content = "回源路径";
      } else if (type == 2) {
              this.zurl1 = true;
        this.sleckurl = this.datalist.label2s;
        this.title_content = "播放路径";
      }
    },
    //获取副标签
    getlabrl2() {
      let parmas = new Object();
      parmas.chanid = this.buser_ids;
      parmas.page = this.page;
      getterminal(parmas)
        .then(res => {
          res.result.cols.forEach((item, index) => {
            let obj = {};
            obj.value = item.id;
            obj.label = item.name + "--" + "(" + item.type + ")";
            this.label2.push(obj);
          });
          if (res.result.les_count == 0) {
            var obj = {};
            for (var i = 0; i < this.label2.length; i++) {
              if (!obj[this.label2[i].value]) {
                this.options.push(this.label2[i]);
                obj[this.label2[i].value] = true;
              }
            }
            return false;
          } else {
            this.page++;
            this.getlabrl2();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //选这源站域名
    onchange(val) {
      console.log(val);
      this.nowcharId = val.chanid;
      this.datalist.url = val;
      this.datalist.domainId=val
      this.updateurl(3)
    },
    //视频格式
    onchangeType(val){
      this.datalist.url_type=val
      this.updateurl(3)
    },
    //请求数据--获取配置信息
    geturlconfig() {
      let parmas = new Object();
      parmas.url_name = this.urlLinks;
      // parmas.page = 0;
      parmas.type = 0;
      parmas.buser_id = this.buser_ids;
      query_config(parmas)
        .then(res => {
          this.datalist.create_time = res.data.data.base_config.create_time;
          this.datalist.buser_id=res.data.data.base_config.buser_id;
          this.datalist.url = res.data.data.base_config.url;
          this.datalist.url_type = res.data.data.base_config.url_type;
          this.datalist.label2 = res.data.data.base_config.host_url;
          this.datalist.label2s = res.data.data.base_config.url;
          this.datalist.domainId = res.data.data.base_config.domain_id;
          this.datalist.state=res.data.data.base_config.state;
          // //回源参数
          // this.datalist.host_url.url = res.data.data.host_url.url;
          // if (res.data.data.host_url.valid == 0) {
          //   this.datalist.host_url.valid = false;
          //   //回源状态
          //   this.valuek = false;
          //   this.urlno = false;
          // } else {
          //   this.datalist.host_url.valid = true;
          //   this.valuek = true;
          //   this.urlno = true;
          // }
       
          let concash = {};
          if (res.data.data.cache_config.valid == 0) {
            //缓存状态
            this.expireTime = res.data.data.cache_config.data[0]&&res.data.data.cache_config.data[0].expire;
            concash.valid = false;
            this.valueh = false;
          } else {
            concash.valid = true;
            this.valueh = true;
          }
          this.datalist.cache_con = res.data.data.cache_config.data;

          this.datalist.custom_page = res.data.data.custom_page;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改url
    setquery_url() {
      this.loading = false;
      if (this.datalist.label) {
        if (this.oldlabel !== this.datalist.label) {
          let adminlanel = new Object();
          let labelarr = [];
          labelarr.push(this.datalist.label);
          adminlanel.data_count = 1;
          adminlanel.data_array = labelarr;
          check_label(adminlanel)
            .then(res => {
              if (res.status == 0) {
                if (res.data.success_count == 0) {
                  this.$message.error("主标签已存在");
                  return false;
                } else {
                  this.updateurl();
                }
              }
              return false;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.updateurl();
        }
      } else {
        this.updateurl();
      }
    },
    updateurl(type) {
   
      let parmas = new Object();
      let natobj = {};
      natobj.url_name = this.urlLinks;
      natobj.base_config = {
        domain_id: this.datalist.domainId,
        // url: this.datalist.label2s, //待配置url
        // host_url: this.datalist.label2,
        url_type: this.datalist.url_type,
      }
         if(type==1){
            natobj.base_config.url=this.datalist.label2s,
       natobj.base_config.host_url= this.sleckurl
      }
      else if(type==2){
            natobj.base_config.url=this.sleckurl
                 natobj.base_config.host_url= this.datalist.label2

      }
      else if(type==3){
         natobj.base_config.url=this.datalist.label2s,
        natobj.base_config.host_url= this.datalist.label2
      }
      // natobj.cache_config={
      //   valid:0,
      //   data: [
      //     {
      //       "type":0,  //0 自动过期 1 自定义过期时间
      //       "province":"湖北", //省份
      //       "expire":324234 //超时时间 单位秒
      //    }
      //    ]
      // }
      // natobj.custom_page=
      //    [
      // {
      //      "errCode":404,  //错误码
      //     "url":"www.eee.fff404.html",  //链接
      //     "state":1, //状态
      //    },
      // ]
      //natobj.label2 = this.datalist.label2;
      // natobj.host_url = new Object();
      natobj.cache_config = new Object();
      natobj.custom_page = [];
      // if (this.valuek == false) {
      //   natobj.host_url.valid = 0;
      // } else {
      //   natobj.host_url.valid = 1;
      // }
      // natobj.host_url.url = this.datalist.host_url.url;
      if (this.valueh == false) {
        natobj.cache_config.valid = 0;
      } else {
        natobj.cache_config.valid = 1;
      }
      // if (this.valueh == false) {
      //   natobj.cache_config.valid = 0;
      // } else {
      //   natobj.cache_config.valid = 1;
      // }
      natobj.cache_config.data = this.datalist.cache_con;
      natobj.custom_page = this.datalist.custom_page;
      parmas.data_array = [];
      parmas.data_array.push(natobj);
      parmas.data_count = 1;
      parmas.buser_id = this.buser_ids;

      config_url(parmas)
        .then(res => {
          this.geturlconfig();
          if (res.status == 0) {
            this.$message.success("配置成功");
            // setTimeout(() => {
            //   this.$router.push({ path: "/domain_management" });
            // }, 1000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //停用
    disableuser(state) {
      let messagetext = "";
      if (state == 0) {
        messagetext = "停用后该渠道ID与此域名相关的所有加速内容将停用，是否继续？";
      } else {
        messagetext = "是否启用该域名?";
      }
      this.$confirm(messagetext, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
             let param = {
            }
          let params = new Object();
          let urllist = [];
          urllist.push(this.urlLinks);
          params.data_array = [];
          params.data_array=urllist
          params.data_count = 0;
          params.state=state
           params.buser_id=this.buser_ids

         let tempparam = {};
            tempparam.data_count = 0;
            tempparam.data = [];

            let obj = {
              buser_id: this.buser_ids,
              data_count: 0,
              state: state,
              data_array: urllist,
            };
            tempparam.data.push(obj);

          change_state(tempparam)
            .then(res => {
              if (res.status== 0) {
                this.geturlconfig();
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }else{
                  this.$message({
                  type: "error",
                  message: "操作失败!",
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(eerr => {
          console.log(eerr);
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //返回
    goback() {
      this.$router.go(-1);
    },
    //修改主标签
    xsho() {
      this.xas = !this.xas;
      if (this.xas == false) {
        this.setquery_url();
      }
    },
    //修改副标签
    fsho() {
      this.fas = !this.fas;
      if (this.fas == false) {
        this.setquery_url();
      }
    },
    //修改回源配置-主
    xzurl() {
      this.dialogVisible = true;
      if (this.datalist.host_url.url) {
        this.huiurl.url = this.datalist.host_url.url;
      }
    },
    //修改回源配置-副
    xfurl(data) {},
    //添加回源信息
    hosturl(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.datalist.host_url.url = this.huiurl.url;
          this.dialogVisible = false;
        }
        this.setquery_url();
      });
    },
    // //添加回源信息--取消
    // nohosturl(formName) {
    //   this.dialogVisible = false;
    //   if (this.huiurl.url == "") {
    //   this.valuek = false;
    //   this.urlno = false;
    //   this.datalist.host_url.valid = false;
    //   }

    //   this.$refs[formName].resetFields();
    // },
    //添加回源信息--取消
    nohosturl(formName) {
      console.log(this.datalist.host_url.valid);
      console.log(this.valuek);
      // return false;
      this.dialogVisible = false;
      // this.valuek = false;
      // this.datalist.host_url.valid = false;
      // this.urlno = false;
      // this.$refs[formName].resetFields();
      if (this.datalist.host_url.valid == false) {
        this.urlno = false;
        this.valuek = false;
      } else {
        console.log("2");
        //this.urlno = true;
        //this.valuek = false;
        this.$refs[formName].resetFields();
      }
      // this.datalist.host_url.valid = false;
    },
    //关闭按钮
    handleClose1() {
      this.nohosturl("hosturlref");
    },
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
        key: Date.now(),
      });
    },
    handleClick(tab, event) {
      if (tab.name == "zero") {
        this.$router.push({
          path: "/domain_management",
        });
      }
    },
    //自定义停止/启动
    zidingyi(dats) {
      if (this.datalist.custom_page[dats].state == 0) {
        this.datalist.custom_page[dats].state = 1;
      } else {
        this.datalist.custom_page[dats].state = 0;
      }
      this.setquery_url();
    },
    //删除自定义状态
    delzi(dats) {
      this.datalist.custom_page.splice(dats, 1);
      this.setquery_url();
    },
    changeSwitch() {
      //this.valuek = !this.valuek;
      if (this.valuek == true) {
        this.urlno = true;
        this.dialogVisible = true;
        if (this.datalist.host_url.url) {
          this.huiurl.url = this.datalist.host_url.url;
        }
      } else {
        this.urlno = false;
        this.dialogVisible = false;
        this.setquery_url();
      }
    },
    changeSwitch2() {
      this.setquery_url();
    },
    //缓存-修改
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //修改缓存
    xhuanVisib(data, num) {
      this.city_disabled = true;
      this.citylabel = [data["area"], data["province"]];
      if (data["type"] == 1) {
        this.radio1 = "自定义时间";
        this.automatic_time = false;
        this.huanfo = new Date(parseInt(data["expire"] * 1000, 10));
      } else {
        this.radio1 = "自动过期";
        this.automatic_time = true;
      }
      this.edit = 1;
      this.editnum = num;
      this.huanform = {};
      this.huanform.type = data["type"];
      this.huanform.area = data["area"];
      this.huanform.province = data["province"];
      this.huanform.expire = data["expire"];
      this.huanform.state = data["state"];
      this.huanVisible = true;
    },
    selecttime() {
      if (this.radio1 == "自动过期") {
        this.automatic();
      } else {
        this.customize();
      }
    },
    //添加缓存--自动过期
    automatic() {
      this.automatic_time = true;
      this.huanform.type = 0;
      this.huanform.expire = 0;
      this.huanform.state = 0;
    },
    //添加缓存--自定义过期时间
    customize() {
      this.automatic_time = false;
      this.huanform.type = 1;
      this.huanform.state = 0;
      this.huanform.expire = dateToMs(this.huanfo);
    },
    //添加缓存--确定
    huanVisib() {
      // if (this.citylabel.length == 0) {
      //   this.$message({
      //     type: "error",
      //     message: "请选择地区",
      //   });
      //   return false;
      // }
      this.loading = true;
      if (this.huanform.type == 0) {
        this.huanform.expire = 0;
      } else {
        this.huanform.expire = dateToMs(this.huanfo);
        if (!this.huanform.expire) {
          this.$message({
            type: "error",
            message: "请选择时间",
          });
          return false;
        }
      }
      this.huanform.area = this.citylabel[0];
      this.huanform.province = this.citylabel[1];

      if (this.edit == 1) {
        let temp = Object.assign({}, this.huanform);
        this.datalist.cache_con[this.editnum] = temp;
      } else {
        let temp = Object.assign({}, this.huanform);
        this.datalist.cache_con.push(temp);
      }

      this.huanVisible = false;
      this.citylabel = [];
      this.huanfo = "";
      this.automatic_time = true;
      setTimeout(() => {
        this.setquery_url();

        //this.reload();
      }, 1000);
    },
    //添加缓存--取消
    huanno() {
      this.radio1 = "自动过期";
      this.huanfo = "";
      this.citylabel = [];
      this.huanVisible = false;
    },
    //删除缓存
    delhc(data, num) {
      this.datalist.cache_con.splice(num, 1);
    },
    //自定义添加状态码--确定
    zareVisible(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let errobj = {};
          errobj.errCode = this.form.errCode;
          errobj.url = this.form.url;
          errobj.state = this.form.state;
          this.datalist.custom_page.push(errobj);
          this.dialogFormVisible = false;
          this.setquery_url();
          this.form.url = "";
          this.form.errCode = "";
        }
      });
    },
    //自定义添加状态码--取消
    zareno(formName) {
      this.form.url = "";
      this.form.errCode = "";
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    //自定义添加状态码--关闭按钮
    handleClick4() {
      this.zareno("form");
    },
    //校验url
    jiourl(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入URL"));
      } else {
        var resyzm = /^http(s)?:\/\/[^\u4e00-\u9fa5]{1,1020}$/;
        if (resyzm.test(value) === false) {
          callback(new Error("URL格式错误"));
        } else {
          callback();
        }
      }
    },
    //校验错误码
    jioerrcode(rule, value, callback) {
      if (value == "") {
        callback(new Error("请输入错误码"));
      } else {
        var reserrcode = /^\d{3}$/;
        if (reserrcode.test(value) === false) {
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
    //缓存过期时间--回车搜索
    onSubmit() {},
    //缓存过期时间--搜索--确定
    seachuserhost() {},
    //缓存过期时间--搜索--重置
    hostreset() {
      this.host_input = "";
      this.host_state = "";
      this.host_time = "";
    },
    //缓存过期时间--搜索--自定义时间
    hostgettimes(val) {},
    //自定义事时间
    gettimes() {},
    // 表头样式设置
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    // 表格样式设置
    rowClass() {
      return "text-align: center;";
    },
  },
  beforeRouteLeave(to, form, next) {
    sessionStorage.removeItem("tabPosition");
    sessionStorage.removeItem("activeName");
    next();
  },
};
</script>

<style lang="scss" scoped>
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
      // line-height: 50px;
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
    margin-left: 40px;
    margin-top: 20px;
    // display: flex;
    .talb_title_p{
      width: 4px;
      height:20px;
      background-color:#297aff;
      margin-right: 8px
    }
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

.seach {
  width: 100%;
  background: #ffffff;

  // margin: 30px 0 30px 0;
  // border-radius: 2px;
  // padding: 21px 37px;
  // box-shadow: 0px 0px 7px 0px rgba(41, 108, 171, 0.1);
  .seach_top {
    width: 100%;
    height: 60px;
    line-height: 60px;

    // display: flex;
    // align-items: center;
    .input-with-select {
      width: 20%;
      float: left;
    }

    .seach_top_right {
      float: left;
      width: 80px;
      text-align: center;
      height: 40px;
      margin-top: 10px;
      line-height: 40px;
      margin-left: 10px;
    }
  }

  .seach_hui {
    background: rgba(242, 246, 250, 1);

    .seach_bottom {
      height: 72px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      padding-left: 27px;
    }
  }
}
</style>
