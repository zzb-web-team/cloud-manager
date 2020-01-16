<template>
<div class="add_url">
    <div class="top_title" style="display: flex;">
        <span @click="goback" style="font-size: 24px;color: #202020;"><i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;margin-right:23px;font-weight: 600;"></i>
            添加URL</span>
    </div>
    <div class="content">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
            <el-form-item label="URL:" :label-width="formLabelWidth" prop="url_a" :rules="{
            required: true,
            message: 'URL示例不能为空',
            trigger: 'blur'
          }">
                <el-input class="other_bgc" v-model="dynamicValidateForm.url_a" placeholder="URL头固定为https:// 或http://，70字符内"></el-input>
            </el-form-item>
            <el-form-item label="视频名称:" :label-width="formLabelWidth" prop="url_name" :rules="{
            required: true,
            message: '视频名称不能为空',
            trigger: 'blur'
          }">
                <el-input class="other_bgc" v-model="dynamicValidateForm.url_name" placeholder="4~50个字符，汉字、英文字母、数字组合，或纯汉字或英文，不能为纯数字" autocomplete="off"></el-input>
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
            <el-form-item label="主标签:" :label-width="formLabelWidth" prop="labe1" :rules="{
            required: true,
            message: '主标签不能为空',
            trigger: 'blur'
          }">
                <el-input class="other_bgc" v-model="dynamicValidateForm.labe1" placeholder="4~64个字符，英文字母、英文字母+数字组合" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="副标签:" :label-width="formLabelWidth" prop="labe2" :rules="{
            required: true,
            message: '副标签不能为空',
            trigger: 'blur'
          }">
                <el-select v-model="dynamicValidateForm.labe2" placeholder="请选择">
                    <el-option v-for="(item, index) in fu" :key="index + item" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <p>
            说明：用户可以自定义标签设置，标签设置为自选项，标签设置的作用是保护源站信息隐藏不被泄露，防止黑客攻击
        </p>
        <div slot="footer" class="add_urlfooter">
            <el-button type="primary" @click="dialogFormVisiblea('dynamicValidateForm')" style="width:96px;height:36px;background:rgba(41,122,255,1);border-radius:2px;">确 定</el-button>
            <el-button @click="dialogFormVisibles('dynamicValidateForm')" style="width:96px;height:36px;background:rgba(225,225,225,1);border-radius:2px;color:#666666;">重 置</el-button>
        </div>
    </div>
</div>
</template>

<script>
import {
    add_url
} from "../../servers/api";
export default {
    data() {
        return {
            dynamicValidateForm: {
                url_name: "",
                labe1: "",
                labe2: "",
                radio: "",
                url_a: ""
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
            ]
        };
    },
    methods: {
        //返回
        goback() {
            this.$router.go(-1);
        },
        //添加域名
        new_btn() {
            this.dialogFormVisible = true;
        },
        //添加域名取消
        dialogFormVisibles(formName) {
            this.dynamicValidateForm.url_name = "";
            this.dynamicValidateForm.labe1 = "";
            this.dynamicValidateForm.labe1 = "";
            this.dynamicValidateForm.radio = "";
            this.dynamicValidateForm.url_a = "";
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        //添加域名确定
        dialogFormVisiblea(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let parmise = new Object();
                    parmise.url = this.dynamicValidateForm.url_a;
                    parmise.url_type = this.dynamicValidateForm.radio;
                    parmise.url_name = this.dynamicValidateForm.url_name;
                    parmise.label = this.dynamicValidateForm.labe1;
                    parmise.label2 = this.dynamicValidateForm.labe2;
                    parmise.buser_id = "user";
                    add_url(parmise)
                        .then(res => {
                            if (res.status == 0) {
                                if (res.err_code == 750) {
                                    this.$message({
                                        message: "URL添加成功",
                                        type: "success"
                                    });
                                    this.common.monitoringLogs('新增 ', '新增URL', 1)

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
                                }
                            } else {
                                this.common.monitoringLogs('新增 ', '新增URL', 0)

                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 1240px;
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
