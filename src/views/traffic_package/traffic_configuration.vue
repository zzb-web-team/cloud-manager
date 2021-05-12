<template>
<div class="con" ref="box_rHeight">
    <div class="con_title"><span @click="go_back">流量包管理</span> > 流量包配置</div>
	<div class="configuration">
            <div class="top_title">流量包配置</div>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="con_ruleForm"
			>
				<el-form-item label="产品名称:" prop="name">
					<el-input v-model="ruleForm.name" type="text" style="width:220px;" maxlength="30" show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="规格:" prop="specification">
                    <el-input v-model="ruleForm.specification" style="width:136px;"></el-input>
					<el-select
						v-model="ruleForm.unit"
                        style="width:80px;"
					>
                        <el-option label="MB" value="MB"></el-option>
						<el-option label="GB" value="GB"></el-option>
						<el-option label="TB" value="TB"></el-option>
                        <el-option label="PB" value="PB"></el-option>
                        <el-option label="EB" value="EB"></el-option>
                        <el-option label="ZB" value="ZB"></el-option>
                        <el-option label="YB" value="YB"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="数量:" prop="num">
                    <el-input v-model="ruleForm.num" style="width:220px;"></el-input>
				</el-form-item>
                 <el-form-item label="原价:" prop="original_price">
					<el-input v-model="ruleForm.original_price" style="width:220px;"><i slot="suffix">元</i></el-input>
				</el-form-item>
                 <el-form-item label="限时特惠:" prop="discount">
					<el-input v-model="ruleForm.discount" style="width:220px;"><i slot="suffix">折</i></el-input>
				</el-form-item>
                 <el-form-item label="现价:" prop="current_price">
					<el-input v-model="ruleForm.current_price" style="width:220px;" disabled><i slot="suffix">元</i></el-input>
				</el-form-item>
                 <el-form-item label="排序:" prop="sotr">
					<el-input v-model="ruleForm.sotr" style="width:220px;"></el-input><span style="font-size: 12px;margin-left: 10px;color: #8e8e8e;">数值越小，排序越靠前；数值越大，排序越靠后</span>
				</el-form-item>
				<el-form-item label="有效期:" prop="valid_period">
					<el-radio-group v-model="ruleForm.valid_period" class="my_group">
						<el-radio label="流量用完即止"></el-radio>
						<el-radio label="限时使用"> 
                            <span>限时使用</span>
                            <el-date-picker
                                v-model="ruleForm.val_time"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="width:220px;"
                                :default-time="['0:00:00']">
                            </el-date-picker>
                        </el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="设置为主图:" prop="delivery">
					<el-switch v-model="ruleForm.delivery" active-color="#13ce66"></el-switch>
				</el-form-item>
				<el-form-item v-show="show_btn">
					<el-button type="primary" @click="submitForm('ruleForm')"
						>确定</el-button
					>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</p>
	</div>
</div>
</template>

<script>
import base from "../../components/base"
export default {
    mixins:[base],
	data() {
		return {
            clientHeight: '',
			ruleForm: {
                name: '',
                specification:'',
                unit: 'GB',
                num:'9999',
                discount:0,
                original_price:0,
                current_price:'',
                sotr:1,
                valid_period:'流量用完即止',
				delivery: false,
                resource: '',
                val_time:[]

			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入产品名称',
						trigger: 'blur',
                    },
                    { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' },
                    {
                        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
                        message: '产品名称不支持特殊字符',
                        trigger: 'blur'
                    }
				],
				specification: [
					{
						required: true,
						message: '请输入产品规格',
						trigger: 'blur',
					},
                ],
                num:[
                    {
                        required: true,
						message: '请输入数量',
						trigger: 'blur',
                    },{
                        pattern: /^(0|[1-9][0-9]*)$/,
                        message: '只能输入数字且不能为小数',
                        trigger: 'blur'
                    }   
                ],
                original_price:[
                    { required: true,
						message: '请输入价格',
                        trigger: 'blur'},
                    {
                        pattern:/^([1-9]+[\d]*(.[0-9]{1,2})?)$/,
                        message: '只能输入数字',
                        trigger: 'blur'
                    }],
                discount:[{
                    pattern:/^((0{1}\.\d{1,2})|0)$/,
                    message: '只能输入不大于1的小数',
                    trigger: 'blur'
                }],
                sotr:[{
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
					message: '请选择过期方式',
                    trigger: 'change'
                }]
            },
            show_btn:true
		};
	},
    filters: {},
    watch:{
        ruleForm:{
            handler(val,oldval){
                if(val.discount==0){
                    val.current_price=Number(val.original_price);
                }else{
                     val.current_price=(Number(val.original_price)*Number(val.discount)).toFixed(2);
                }
            },
            deep:true, //true 深度监听
            immediate: true //第一次改变也监听
        },
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
        if(this.$route.query.type){
            if(this.$route.query.type==1){
                this.show_btn=false;
            }else{
                this.show_btn=true;
            }
            console.log(this.$route.query.data);
            let dat=this.$route.query.data;
            this.ruleForm=JSON.parse(JSON.stringify(dat));
            if(dat.specification!=0){
                this.ruleForm.unit=dat.specification.slice(-2);
            }else{
                this.ruleForm.unit="GB"
            }
        }
    },
	methods: {
        go_back(){
            this.$router.go(-1);
        },
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
        },
        	//查询屏幕高度自适应
		changeFixed(data) {
			if (this.$refs.box_rHeight) {
				this.$refs.box_rHeight.style.height = data -130 + 'px';
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
.con{
height: 100%;
margin-top: 30px;
margin-left: 25px;margin-right: 25px;
    box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
    .con_title{
        padding-top: 25px;
        padding-left: 25px;
        margin-bottom: 20px;
        text-align: left;
        font-size: 16px;
        span{font-size: 16px;}
    }
    .configuration{
        width: 600px;
        margin: auto;
        text-align: left;
        padding: 20px 0;
        .top_title{
            text-align: center;
            margin-left: -200px;
            font-weight: 600;
        }
        .con_ruleForm{
            width: 100%;
            margin-top: 40px;
            .my_group{
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                .el-radio:last-child{
    
                   margin-top: 20px;
                }
            }
        }
    }
}
</style>
