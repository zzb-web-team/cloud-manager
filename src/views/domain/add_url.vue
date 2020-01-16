<template>
<div class="add_url">
    <div class="top_title" style="display: flex;margin-top:30px;">
        <span @click="goback" style="font-size: 24px;color: #202020;    margin-left: 40px;"><i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
            添加URL</span>
    </div>
    <div class="content">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
            <el-form-item label="渠道ID:" :label-width="formLabelWidth" prop="newbuser_id" :rules="[{ validator: jiourlid, trigger: 'blur', required: true, }]">
                <el-input class="other_bgc" v-model="dynamicValidateForm.newbuser_id" placeholder="12位纯数字" maxlength="70" @change="onchanidChange"></el-input>
            </el-form-item>
            <el-form-item label="URL:" :label-width="formLabelWidth" prop="url_a" :rules="[{ validator: jiourl, trigger: 'blur', required: true, }]">
                <el-input class="other_bgc" v-model="dynamicValidateForm.url_a" placeholder="URL头固定为https:// 或http://，1024字符内" maxlength="1024"></el-input>
            </el-form-item>
            <el-form-item label="视频名称:" :label-width="formLabelWidth" prop="url_name" :rules="[{ validator: jioshi, trigger: 'blur', required: true, }]">
                <el-input class="other_bgc" v-model="dynamicValidateForm.url_name" placeholder="4~50个字符，汉字、英文字母、数字组合，或纯汉字或英文，不能为纯数字" autocomplete="off" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="视频格式" :label-width="formLabelWidth" prop="radio" :rules="{
            required: true,
            message: '业务类型不能为空',
            trigger: 'blur'
          }">
                <el-select v-model="dynamicValidateForm.radio" placeholder="请选择">
                    <el-option v-for="(item, index) in yewu" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="视频终端:" :label-width="formLabelWidth" prop="labe2" :rules="{
            required: true,
            message: '视频终端不能为空',
            trigger: 'blur'
          }">
                <el-select v-model="dynamicValidateForm.labe2" placeholder="请选择" @change="onchange">
                    <el-option v-for="(item, index) in labelData" :key="index + item" :label="item.label" :value="item" style="width:250px;"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签:" :label-width="formLabelWidth" prop="labe1" :rules="[{ validator: jiozhu, trigger: 'blur' }]">
                <el-input class="other_bgc" v-model="dynamicValidateForm.labe1" placeholder="4~64个字符，英文，英文加数字组合" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <p>
            说明：用户可以自定义标签设置，标签设置为自选项，标签设置的作用是保护源站信息隐藏不被泄露，防止黑客攻击
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
    check_label
} from "../../servers/api";
export default {
    data() {
        return {
            dynamicValidateForm: {
                url_name: "",
                labe1: "",
                labe2: "",
                radio: "",
                url_a: "",
                newbuser_id: "",
                bind_id: ""
            },
            formLabelWidth: "100px",
            yewu: [{
                    value: 0,
                    label: "mp4"
                },
                {
                    value: 1,
                    label: "flv"
                },
                {
                    value: 2,
                    label: "hls"
                }
            ],
            fu: [{
                    value: 0,
                    label: "腾讯视频"
                },
                {
                    value: 1,
                    label: "南瓜视频"
                }
            ],
            labelData: [],
            pageActive: 0,
            nowcharId: "",
            pageActive: 0
        };
    },
    mounted: function () {
        //this.queryInfoLabel()
    },
    methods: {
        onchanidChange() {
            if (this.dynamicValidateForm.newbuser_id.length != 12) {
                return false;
            }

            if (this.dynamicValidateForm.newbuser_id != this.dynamicValidateForm.bind_id) {

                this.queryInfoLabel()
            }
            return false;

        },
        onchange(val) {
            this.nowcharId = val.chanid

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

            let param = new Object()

            param.chanid = this.dynamicValidateForm.newbuser_id;
            this.dynamicValidateForm.bind_id = this.dynamicValidateForm.newbuser_id;
            // if (param.chanid.length != 12) {
            //     return false;
            // }
            param.page = this.pageActive
            getterminal(param).then(res => {
                if (res.status == 0)
                    this.labelData = []
                res.result.cols.forEach((item, index) => {
                    let obj = {}
                    obj.value = item.id;
                    obj.label = "渠道ID（" + item.chanid + "）--" + item.name + "--" + item.type;
                    obj.chanid = item.chanid

                    // obj.label= item.id+"+"+item.chanid+"+"+item.name
                    this.labelData.push(obj);

                });
                if (res.result.les_count == 0) {

                    return false

                } else {
                    this.pageActive++
                    this.queryInfoLabel()
                }

            }).catch(error => {
                console.log(error)

            })

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
                    let nowparam = new Object()
                    nowparam.data_array = []
                    nowparam.data_count = 1
                    nowparam.data_array.push(this.dynamicValidateForm.labe1)
                    // nowparam.label = this.dynamicValidateForm.labe1
                    if (this.dynamicValidateForm.labe1 === "") {
                        let parmise = new Object();
                        parmise.url = this.dynamicValidateForm.url_a;
                        parmise.url_type = this.dynamicValidateForm.radio;
                        parmise.url_name = this.dynamicValidateForm.url_name;
                        parmise.label = this.dynamicValidateForm.labe1;
                        parmise.label2 = this.dynamicValidateForm.labe2.value;
                        parmise.buser_id = this.dynamicValidateForm.newbuser_id + "";
                        parmise.create_time = parseInt((new Date()).getTime() / 1000)
                        let newparam = new Object()
                        let data_array = []
                        data_array.push(parmise)

                        newparam.data_count = 1
                        newparam.data_array = data_array
                        add_url(newparam)
                            .then(res => {
                                if (res.status == 0) {

                                    if (res.data.failed_count == 0) {
                                        this.$message({
                                            message: "添加成功",
                                            type: "success"
                                        });
                                        this.dynamicValidateForm.url_name = "";
                                        this.dynamicValidateForm.labe1 = "";
                                        this.dynamicValidateForm.labe2 = "";
                                        this.dynamicValidateForm.radio = "";
                                        this.dynamicValidateForm.url_a = "";
                                        this.dialogFormVisible = false;
                                        setTimeout(() => {
                                            this.$router.push({
                                                path: "/domain_management"
                                            });
                                        }, 1000);
                                    } else if (res.data.res_data[0][1] == 1) {
                                        this.$message({
                                            message: "格式错误",
                                            type: "error"
                                        });

                                    } else if (res.data.res_data[0][1] == 2) {
                                        this.$message({
                                            message: "URl重复",
                                            type: "error"
                                        });

                                    } else if (res.data.res_data[0][1] == 3) {
                                        this.$message({
                                            message: "label重复",
                                            type: "error"
                                        });
                                    } else if (res.data.res_data[0][1] == 4) {
                                        this.$message({
                                            message: "渠道ID不存在",
                                            type: "error"
                                        });

                                    } else if (res.data.res_data[0][1] == 5) {
                                        this.$message({
                                            message: "数据库写人错误",
                                            type: "error"
                                        });

                                    }
                                } else if (res.status == -900) {
                                    this.$message({
                                        message: `${res.msg}`,
                                        type: "error"
                                    });
                                } else if (res.status == -900) {
                                    this.$message({
                                        message: "IPFS服务器错误",
                                        type: "error"
                                    });
                                }
                            })
                            .catch(error => {
                                this.$message({
                                    message: "IPFS服务器错误",
                                    type: "error"
                                });
                            });

                    } else {
                        check_label(nowparam).then(res => {
                            if (res.status == 0 && res.data.res_data[0][1] == true) {
                                let parmise = new Object();
                                parmise.url = this.dynamicValidateForm.url_a;
                                parmise.url_type = this.dynamicValidateForm.radio;
                                parmise.url_name = this.dynamicValidateForm.url_name;
                                parmise.label = this.dynamicValidateForm.labe1;
                                parmise.label2 = this.dynamicValidateForm.labe2.value;
                                parmise.buser_id = this.dynamicValidateForm.newbuser_id + "";
                                parmise.create_time = parseInt((new Date()).getTime() / 1000)
                                let newparam = new Object()
                                let data_array = []
                                data_array.push(parmise)
                                newparam.data_count = 1
                                newparam.data_array = data_array
                                add_url(newparam)
                                    .then(res => {
                                        if (res.status == 0) {
                                            if (res.data.failed_count == 0) {
                                                this.$message({
                                                    message: "添加成功",
                                                    type: "success"
                                                });
                                                this.dynamicValidateForm.url_name = "";
                                                this.dynamicValidateForm.labe1 = "";
                                                this.dynamicValidateForm.labe2 = "";
                                                this.dynamicValidateForm.radio = "";
                                                this.dynamicValidateForm.url_a = "";
                                                this.dialogFormVisible = false;
                                                setTimeout(() => {
                                                    this.$router.push({
                                                        path: "/domain_management"
                                                    });
                                                }, 1000);
                                            } else if (res.data.res_data[1] == 1) {
                                                this.$message({
                                                    message: "格式错误",
                                                    type: "error"
                                                });

                                            } else if (res.data.res_data[1] == 2) {
                                                this.$message({
                                                    message: "URl重复",
                                                    type: "error"
                                                });

                                            } else if (res.data.res_data[1] == 3) {
                                                this.$message({
                                                    message: "label重复",
                                                    type: "error"
                                                });
                                            } else if (res.data.res_data[1] == 4) {
                                                this.$message({
                                                    message: "渠道ID不存在",
                                                    type: "error"
                                                });

                                            } else if (res.data.res_data[1] == 5) {
                                                this.$message({
                                                    message: "数据库写人错误",
                                                    type: "error"
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
                                    type: "warning"
                                });
                            }
                        }).catch(error => {
                            console.log(error)

                        })
                        return false

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

                    callback(new Error('URL格式错误'));
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
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    margin: 0 auto;
    height: 538px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
    border-radius: 2px;
    margin-top: 20px;
    padding: 23px 38px;

    p {
        width: 396px;
        height: 30px;
        font-size: 12px;
        font-weight: 500;
        text-align: left;
        color: #999999;
        line-height: 18px;
    }

    .add_urlfooter {
        border-top: 1px solid #e3e3e3;
        text-align: left;
        margin-top: 24px;
        padding-top: 21px;
    }
}
</style>
