<template>
  <div class="add_url">
    <div class="top_title" style="display: flex;margin-top:30px;">
      <span @click="goback" style="font-size: 24px;color: #202020;    margin-left: 40px;">
        <i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
        创建加速内容</span>
    </div>
    <div class="content">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
        <p>创建点播加速内容</p>
        <el-form-item label="渠道ID:" :label-width="formLabelWidth" prop="newbuser_id" :rules="[
						{
							validator: jiourlid,
							trigger: 'blur',
							required: true,
						},
					]">
          <el-input class="other_bgc" v-model="dynamicValidateForm.newbuser_id" placeholder="12位纯数字" maxlength="70" @change="onchanidChange"></el-input>
        </el-form-item>
        <el-form-item label="加速内容名称:" :label-width="formLabelWidth" prop="url_content" :rules="[
						{ required: true, validator: jiocon, trigger: 'blur' },
					]">
          <el-input class="other_bgc" v-model="dynamicValidateForm.url_content" placeholder="4-50个字符，汉字、英文、数字任意组合"></el-input>
          <span class="add_url_point">创建成功后将无法修改</span>
        </el-form-item>
        <p class="add_url_title">加速配置</p>
        <el-form-item label="源站域名" :label-width="formLabelWidth" prop="radio" :rules="{
						required: true,
						message: '源站域名不能为空',
						trigger: 'blur',
					}">

          <el-select v-model="dynamicValidateForm.labe2" placeholder="请选择" @change="onchange" :disabled="inputStatus">

            <el-option v-for="(item, index) in labelData" :key="index + item" :label="item.label" :disabled="item.disabled" :value="item.label" style="width:250px;">
            </el-option>
          </el-select>
          <el-button type="text" size="small" v-show="yewu.length < 0">去添加</el-button>
        </el-form-item>
        <el-form-item label="回源路径:" :label-width="formLabelWidth" prop="hui_path" :rules="[
						{ validator: jiolu, trigger: 'blur', required: true },
					]">
          <el-input class="other_bgc" v-model="dynamicValidateForm.hui_path" placeholder="2~1024个字符，首位字符固定为“/”" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="播放路径:" :label-width="formLabelWidth" prop="play_path" :rules="[
						{ validator: jiolu, trigger: 'blur', required: true },
					]">
          <el-input class="other_bgc" v-model="dynamicValidateForm.play_path" placeholder="2~1024个字符，首位字符固定为“/”" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频格式" :label-width="formLabelWidth" prop="radio" :rules="{
						required: true,
						message: '业务类型不能为空',
						trigger: 'blur',
					}">
          <el-select v-model="dynamicValidateForm.radio" placeholder="请选择">
            <el-option v-for="(item, index) in yewu" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <p>
        <!-- 说明：用户可以自定义标签设置，标签设置为自选项，标签设置的作用是保护源站信息隐藏不被泄露，防止黑客攻击 -->
      </p>
      <div slot="footer" class="add_urlfooter">
        <el-button type="primary" @click="dialogFormVisiblea('dynamicValidateForm')" style="width:96px;height:36px;background:rgba(41,122,255,1);border-radius:2px;">确 定</el-button>
        <el-button @click="dialogFormVisibles('dynamicValidateForm')" style="width:96px;height:36px;background:rgba(225,225,225,1);border-radius:2px;color:#666666;">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  add_url,
  getterminal,
  check_label,
  query_domain,
  query_domain_for_admin,
} from "../../servers/api";
import base from "../../components/base"
export default {
    mixins:[base],
  data() {
    return {
      inputStatus: true,
      dynamicValidateForm: {
        url_name: "",
        url_content: "",
        labe1: "",
        labe2: "",
        radio: "",
        url_a: "",
        newbuser_id: "",
        bind_id: "",
        hui_path: "",
        domain_id: "",
        play_path: "",
      },
      newActiveFrom: {
        buser_id: "",
      },
      formLabelWidth: "114px",
      domainList: [],
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
      fu: [
        {
          value: 0,
          label: "腾讯视频",
        },
        {
          value: 1,
          label: "南瓜视频",
        },
      ],
      labelData: [],
      pageActive: 0,
      nowcharId: "",
      pageActive: 0,
      domain_id_active: "",
    };
  },
  mounted: function() {
    //this.queryInfoLabel();
  },
  methods: {
    onchanidChange() {
      if (this.dynamicValidateForm.newbuser_id.length != 12) {
        return false;
      }

      if (
        this.dynamicValidateForm.newbuser_id != this.dynamicValidateForm.bind_id
      ) {
        this.inputStatus = false;
        this.labelData = [];

        this.queryInfoLabel();
      }
      return false;
    },
    onchange(val) {
      console.log(val);
      this.nowcharId = val.chanid;
      this.dynamicValidateForm.labe2 = val;
      this.domain_id_active = val;
    },
    //字符长度限制
    getStringWidth(val) {
      let len = 0;
      for (let i = 0; i < val.length; i++) {
        let length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
          len += 1;
        } else {
          len += 2;
        }
      }
      return len;
    },
    //查询副标签
    queryInfoLabel() {
      let param = new Object();

      // param.chanid = this.dynamicValidateForm.newbuser_id;
      // this.dynamicValidateForm.bind_id = this.dynamicValidateForm.newbuser_id;
      // if (param.chanid.length != 12) {
      //     return false;
      // }
      (param.buser_id = this.dynamicValidateForm.newbuser_id),
        (param.domain = ""),
        (param.state = -1),
        (param.start_time = 0),
        (param.end_time = 0),
        (param.order = 0),
        (param.page = this.pageActive);
      query_domain_for_admin(param)
        .then(res => {
          if (res.status == 0)
            res.data.result.forEach((item, index) => {
              let obj = {};
              obj.value = item.domain_id;
              // obj.label =
              //   "渠道ID（" + item.chanid + "）--" + item.name + "--" + item.type;
              // obj.chanid = item.chanid;
              // this.labelData = [];
              obj.label = item.domain;
              if (item.state == 1) {
                obj.disabled = false;
              } else {
                obj.disabled = true;
              }
              this.labelData.push(obj);
            });
          console.log(this.labelData.length);
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
    //返回
    goback() {
      this.$router.go(-1);
    },
    //添加URL
    new_btn() {
      this.dialogFormVisible = true;
    },
    //添加URL取消
    dialogFormVisibles(formName) {
      this.dynamicValidateForm.url_name = "";
      this.dynamicValidateForm.labe1 = "";
      this.dynamicValidateForm.labe1 = "";
      this.dynamicValidateForm.radio = "";
      this.dynamicValidateForm.url_a = "";
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },
    //添加URL确定
    dialogFormVisiblea(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let nowparam = new Object();
          nowparam.data_array = [];
          nowparam.data_count = 1;
          nowparam.data_array.push(this.dynamicValidateForm.labe1);
          // nowparam.label = this.dynamicValidateForm.labe1
          if (this.dynamicValidateForm.labe1 === "") {
            let parmise = new Object();
            parmise.url = this.dynamicValidateForm.play_path;
            parmise.url_type = this.dynamicValidateForm.radio;
            parmise.url_name = this.dynamicValidateForm.url_content;
            // parmise.label = this.dynamicValidateForm.labe1;
            parmise.host_url = this.dynamicValidateForm.hui_path;
            // parmise.label2 = this.dynamicValidateForm.labe2.value;
            parmise.buser_id = this.dynamicValidateForm.newbuser_id + "";
            parmise.create_time = parseInt(new Date().getTime() / 1000);
            parmise.domain = this.dynamicValidateForm.labe2;
            //parmise.domain_id = this.dynamicValidateForm.labe1;

            let newparam = new Object();
            let data_array = [];
            data_array.push(parmise);

            newparam.data_count = 1;
            newparam.data_array = data_array;
            add_url(newparam)
              .then(res => {
                if (res.status == 0) {
                  if (res.data.failed_count == 0) {
                    this.$message({
                      message: "添加成功",
                      type: "success",
                    });
                    this.dynamicValidateForm.url_name = "";
                    this.dynamicValidateForm.labe1 = "";
                    this.dynamicValidateForm.labe2 = "";
                    this.dynamicValidateForm.radio = "";
                    this.dynamicValidateForm.url_a = "";
                    this.dialogFormVisible = false;
                    setTimeout(() => {
                      this.$router.push({
                        path: "/domain_management",
                      });
                    }, 1000);
                  } else if (res.data.res_data[0][1] == 1) {
                    this.$message({
                      message: "格式错误",
                      type: "error",
                    });
                  } else if (res.data.res_data[0][1] == 2) {
                    this.$message({
                      message: "加速内容名称不可以重复",
                      type: "error",
                    });
                  } else if (res.data.res_data[0][1] == 3) {
                    this.$message({
                      message: "回源路径，播放路径不可以重复",
                      type: "error",
                    });
                  } else if (res.data.res_data[0][1] == 4) {
                    this.$message({
                      message: "渠道ID不存在,或者该渠道ID已被冻结！",
                      type: "error",
                    });
                  } else if (res.data.res_data[0][1] == 5) {
                    this.$message({
                      message: "数据库写入错误",
                      type: "error",
                    });
                  }
                } else if (res.status == -900) {
                  this.$message({
                    message: "IPFS服务器错误",
                    type: "error",
                  });
                }
              })
              .catch(error => {
                this.$message({
                  message: "IPFS服务器错误",
                  type: "error",
                });
              });
          } else {
            check_label(nowparam)
              .then(res => {
                if (res.status == 0 && res.data.res_data[0][1] == true) {
                  let parmise = new Object();
                  parmise.url = this.dynamicValidateForm.url_a;
                  parmise.url_type = this.dynamicValidateForm.radio;
                  parmise.url_name = this.dynamicValidateForm.url_name;
                  parmise.label = this.dynamicValidateForm.labe1;
                  parmise.label2 = 0;
                  // parmise.label2 = this.dynamicValidateForm.labe2.value;
                  parmise.buser_id = this.dynamicValidateForm.newbuser_id + "";
                  parmise.create_time = parseInt(new Date().getTime() / 1000);
                  let newparam = new Object();
                  let data_array = [];
                  data_array.push(parmise);
                  newparam.data_count = 1;
                  newparam.data_array = data_array;
                  add_url(newparam)
                    .then(res => {
                      if (res.status == 0) {
                        if (res.data.failed_count == 0) {
                          this.$message({
                            message: "添加成功",
                            type: "success",
                          });
                          this.dynamicValidateForm.url_name = "";
                          this.dynamicValidateForm.labe1 = "";
                          this.dynamicValidateForm.labe2 = "";
                          this.dynamicValidateForm.radio = "";
                          this.dynamicValidateForm.url_a = "";
                          this.dialogFormVisible = false;
                          setTimeout(() => {
                            this.$router.push({
                              path: "/domain_management",
                            });
                          }, 1000);
                        } else if (res.data.res_data[1] == 1) {
                          this.$message({
                            message: "格式错误",
                            type: "error",
                          });
                        } else if (res.data.res_data[1] == 2) {
                          this.$message({
                            message: "回源路径，播放路径不可以重复",
                            type: "error",
                          });
                        } else if (res.data.res_data[1] == 3) {
                          this.$message({
                            message: "回源路径，播放路径不可以重复",
                            type: "error",
                          });
                        } else if (res.data.res_data[1] == 4) {
                          this.$message({
                            message: "渠道ID不存在",
                            type: "error",
                          });
                        } else if (res.data.res_data[1] == 5) {
                          this.$message({
                            message: "数据库写人错误",
                            type: "error",
                          });
                        }
                      } else {
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                } else {
                  this.$message({
                    message: "主标签不可重复，请重新输入",
                    type: "warning",
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
            return false;
          }
        }
      });
    },
    //校验渠道ID
    jiourlid(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入渠道ID"));
      } else {
        var resyzm = /^\d{12}$/;
        // objExp = new RegExp(resyzm);
        if (resyzm.test(value) === false) {
          callback(new Error("渠道ID格式错误"));
        } else {
          callback();
        }
      }
    },
    //校验url
    jiourl(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入URL地址"));
      } else {
        var resyzm = /^http(s)?:\/\/[^\u4e00-\u9fa5]{1,1020}$/;
        // objExp = new RegExp(resyzm);
        if (resyzm.test(value) === false) {
          callback(new Error("URL格式错误"));
        } else {
          if (this.getStringWidth(value) > 1024) {
            callback(new Error("URL地址超出最大限度"));
          } else {
            callback();
          }
        }
      }
    },
    //校验视频名称
    jioshi(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入视频名称"));
      } else {
        var resyzm = /^(?!(\d+)$)[\u4e00-\u9fffa-zA-Z\d]{2,50}$/;
        if (resyzm.test(value) === false) {
          if (this.getStringWidth(value) > 70) {
            callback(new Error("视频名称格式超出最大限度"));
          } else if (this.getStringWidth(value) < 4) {
            callback(new Error("视频名称格式至少为4位字符"));
          } else {
            callback(new Error("视频名称格式错误"));
          }
        } else {
          callback();
        }
      }
    },
    //校验主标签
    jiozhu(rule, value, callback) {
      if (value === "") {
        callback();
      } else {
        var resyzm = /^[\u4e00-\u9fffa-zA-Z\d]{4,64}$/;
        if (resyzm.test(value) === false) {
          callback(new Error("主标签格式错误"));
        } else {
          callback();
        }
      }
    },
    getBLen(str) {
      if (str == null) return 0;
      if (typeof str != "string") {
        str += "";
      }
      return str.replace(/[^\x00-\xff]/g, "01").length;
    },
    //校验加速内容名称
    jiocon(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入加速内容名称"));
      } else {
        var resyzm = /^[\u4e00-\u9fa5a-zA-Z0-9]{4,50}$/;
        if (this.getBLen(value) > 50) {
          callback(new Error("加速内容名称不能超出50个字符"));
        } else if (this.getBLen(value) < 4) {
          callback(new Error("加速内容名称不能少于4个字符"));
        } else {
          // else if (resyzm.test(value) === false) {
          // //   callback(new Error("加速内容名称格式错误"));
          // // }
          callback();
        }
      }
    },
    //校验路径
    jiolu(rule, value, callback) {
      if (value === "") {
        callback(new Error("路径不能为空"));
      } else {
        var resyzm = /^\/{1}[0-9a-zA-Z/]{2,1024}$/;
        if (this.getBLen(value) > 1024) {
          callback(new Error("内容不能超出1024个字符"));
        } else if (this.getBLen(value) < 2) {
          callback(new Error("内容不能少于2个字符"));
        } else {
          //    else if (resyzm.test(value) === false) {
          //     callback(new Error("加速内容名称格式错误"));
          //  }
          callback();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  margin: 0 auto;
  // height: 538px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
  border-radius: 2px;
  margin-top: 20px;
  padding: 23px 38px;
  p {
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: #333333;
    line-height: 18px;
  }
  .add_url_title {
    display: inline-block;
    padding: 15px 0;
    border-top: 1px solid #e3e3e3;
  }
  .add_url_point {
    font-size: 12px;
    color: #9b9b9b;
  }
  .add_urlfooter {
    border-top: 1px solid #e3e3e3;
    text-align: left;
    margin-top: 24px;
    padding-top: 21px;
    padding-bottom: 21px;
  }
}
input::-webkit-input-placeholder {
  color: #c0c4cc;
  font-size: 12px;
}
input::-moz-input-placeholder {
  color: #c0c4cc;
  font-size: 12px;
}
input::-ms-input-placeholder {
  color: #c0c4cc;
  font-size: 12px;
}
</style>
