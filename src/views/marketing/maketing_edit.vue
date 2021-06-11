<template>
	<div class="configuration" ref="box_rHeight">
            <div class="top_title"><span @click="go_back">营销管理</span> > 添加营销</div>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="con_ruleForm"
			>
				<el-form-item label="标题:" prop="title">
					<el-input v-model="ruleForm.title" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" style="width:560px;" maxlength="150" show-word-limit></el-input>
				</el-form-item>
                <el-form-item label="跳转链接:" prop="redirect_url">
                    <el-input v-model="ruleForm.redirect_url" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width:560px;"></el-input>
				</el-form-item>
                 <el-form-item label="排序:" prop="order">
					<el-input v-model="ruleForm.order" style="width:300px;"></el-input><span style="font-size: 12px;margin-left: 10px;color: #8e8e8e;">数值越小，排序越靠前；数值越大，排序越靠后</span>
				</el-form-item>
				<el-form-item label="发布时间:" prop="valid_period">
					<el-radio-group v-model="ruleForm.valid_period" fill='#13ce66' class="my_group" @change="change_radio">
						<el-radio label="实时发布"></el-radio>
						<el-radio label="定时发布"> 
                            <span>定时发布</span>
                            <el-date-picker
                                v-model="ruleForm.create_time"
                               type="datetime"
                                placeholder="选择日期时间"
                                style="width:220px;"
                                value-format="timestamp"
                                :disabled="time_disabled">
                            </el-date-picker>
                        </el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="状态:" prop="state">
					<el-switch v-model="ruleForm.state" active-value="1" inactive-value="0"  active-color="#23E249"></el-switch>
				</el-form-item>
				<el-form-item class="foot_btn" v-show="show_btn">
					<el-button type="primary" @click="submitForm('ruleForm')"
						>确定</el-button
					>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</p>
	</div>
</template>

<script>
import base from "../../components/base"
import {add_adslot,modify_adslot} from "../../servers/api"
export default {
    mixins:[base],
	data() {
		return {
            clientHeight: '',
			ruleForm: {
                title: '',
                unit: 'GB',
                redirect_url:'',
                order:1,
                valid_period:'实时发布',
				state: "0",
                resource: '',
                create_time:''

            },
            time_disabled:true,
			rules: {
				title: [
					{
						required: true,
						message: '请输入产品名称',
						trigger: 'blur',
                    },
                    { min: 2, max: 150, message: '长度在 2 到 150 个字符', trigger: 'blur' },
                    {
                        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
                        message: '产品名称不支持特殊字符',
                        trigger: 'blur'
                    }
				],
                order:[{
                    required: true,
					message: '请输入顺序',
                    trigger: 'blur'
                },{
                    pattern:/^([1-9][0-9]*)$/,
                    message: '只能输入正整数',
                    trigger: 'blur'
                }],
                valid_period:[{
                    required: true,
					message: '请选择发布时间',
                    trigger: 'change'
                }]
            },
            show_btn:true,
		};
	},
    filters: {},
    watch: {
		clientHeight() {
			//如果clientHeight 发生改变，这个函数就会运行
			this.changeFixed(this.clientHeight);
		},
	},
	mounted() {
        let that = this;
		that.clientHeight = `${document.documentElement.clientHeight ||
			document.documentElement.offsetHeight}`; //获取浏览器可视区域高度
		window.onresize = function() {
			that.clientHeight = `${document.documentElement.clientHeight ||
				document.documentElement.offsetHeight}`;
        };
        if(this.$route.query.type==1){
            this.show_btn=true;
        }else{
            this.show_btn=false;
        }
        if(this.$route.query.data){
            let data_list=JSON.parse(this.$route.query.data);
            console.log(data_list);
            this.ruleForm=data_list;
            this.ruleForm.valid_period=data_list.pub_type==1?"实时发布":"定时发布";
            this.ruleForm.create_time=data_list.pub_type==1?'':data_list.pub_timeing*1000;
        }
    },
	methods: {
        go_back(){
            this.$router.go(-1);
        },
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
                    let params={};
                    params.title=this.ruleForm.title;
                    params.redirect_url=this.ruleForm.redirect_url;
                    params.order=Number(this.ruleForm.order);
                    params.state=Number(this.ruleForm.state);
                    params.pub_type=this.ruleForm.valid_period=='定时发布'?2:1;
                    params.create_time=parseInt(Date.parse(new Date())/1000);
                    if(this.ruleForm.valid_period=='定时发布'){
                         params.pub_timeing=parseInt(this.ruleForm.create_time/1000);
                    }else{
                        params.pub_timeing=parseInt(Date.parse(new Date())/1000);
                    }
                    if(!this.$route.query.data){
                        add_adslot(params).then(res=>{if(res.status==0){
                             this.$message({
                                    type: 'success',
                                    message: '添加成功!',
                                });
                                setTimeout(()=>{
                                    this.go_back();
                                },1500)
                        }}).catch(error=>{})
                    }else{
                        let data_list=JSON.parse(this.$route.query.data);
                        params.ad_id=data_list.ad_id;
                        modify_adslot(params).then(res=>{if(res.status==0){
                             this.$message({
                                    type: 'success',
                                    message: '修改成功!',
                                });
                                setTimeout(()=>{
                                    this.go_back();
                                },1500)
                        }}).catch(error=>{})
                    }
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
        },
        change_radio(){
            if(this.ruleForm.valid_period=="实时发布"){
                this.time_disabled=true
                this.ruleForm.create_time='';
            }else{
                this.time_disabled=false;
                this.ruleForm.create_time=new Date(new Date().toLocaleDateString()).getTime()+86400*1000;
            }
        },
        //查询屏幕高度自适应
		changeFixed(data) {
			if (this.$refs.box_rHeight) {
				this.$refs.box_rHeight.style.height = data - 110 + 'px';
				this.$refs.box_rHeight.style.minHeight = 850 + 'px';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
i{
    font-style: normal;
    margin-right: 5px;
}
.configuration{
    // width: 100%;
    text-align: left;
    margin-left: 25px;margin-right: 25px;
    box-sizing: border-box;
    padding: 40px;
    box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
    margin-top: 36px;
    .top_title{
        span{
            font-size: 16px;
        }
    }
    .con_ruleForm{
    margin: auto;
        width: 800px;
        margin-top: 40px;
        .my_group{
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            .el-radio:last-child{

               margin-top: 20px;
            }
        }
        .foot_btn{
            text-align: center;
            margin-left: -120px;
        }
    }
}
</style>
