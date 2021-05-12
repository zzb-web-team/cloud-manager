<template>
	<div ref="box_rHeight" class="help_edit">
		<div class="top_title">
			<span @click="go_back">帮助中心</span> > 添加帮助文档
		</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="con_ruleForm"
		>
			<el-form-item label="标题:" prop="title">
				<el-input
					v-model="ruleForm.title"
					type="text"
					maxlength="50"
					show-word-limit
				></el-input>
			</el-form-item>
			<el-form-item label="内容:" prop="content">
				<quill-editor
					ref="myTextEditor"
					v-model="ruleForm.content"
					:options="editorOption"
					@change="onEditorChange($event)"
					style="height:300px;margin-bottom:100px;"
				></quill-editor>
			</el-form-item>
			<el-form-item label="跳转链接:" prop="url">
				<el-input v-model="ruleForm.url"></el-input>
			</el-form-item>
			<el-form-item label="排序:" prop="sort">
				<el-input
					v-model="ruleForm.sort"
					style="width:220px;"
				></el-input
				><span style="font-size: 12px;margin-left: 10px;color: #8e8e8e;"
					>数值越小，排序越靠前；数值越大，排序越靠后</span
				>
			</el-form-item>
			<el-form-item label="发布时间:" prop="create_time">
				<el-radio-group v-model="ruleForm.create_time" class="my_group">
					<el-radio label="实时发布"></el-radio>
					<el-radio label="定时发布">
						<span>定时发布</span>
						<el-date-picker
							v-model="ruleForm.val_time"
							type="datetime"
							placeholder="选择日期时间"
							style="width:220px;"
						>
						</el-date-picker>
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="状态:" prop="state">
				<el-switch
					v-model="ruleForm.state"
					active-value="0"
					inactive-value="1"
					active-color="#13ce66"
				></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')"
					>确定</el-button
				>
				<el-button @click="resetForm('ruleForm')">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';
import base from '../../components/base';
export default {
	mixins: [base],
	data() {
		return {
			clientHeight: '',
			editorOption: {
				placeholder: '编辑文章内容',
			},
			ruleForm: {
				title: '',
				content: '',
				url: '',
				sort: 1,
				create_time: '实时发布',
				state: 0,
				val_time: '',
			},
			rules: {
				title: [
					{
						required: true,
						message: '请输入标题',
						trigger: 'blur',
					},
					{
						min: 2,
						max: 50,
						message: '长度在 2 到 50 个字符',
						trigger: 'blur',
					},
					{
						pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
						message: '标题不支持特殊字符',
						trigger: 'blur',
					},
				],
				content: [
					{
						required: true,
						message: '请输入内容',
						trigger: 'blur',
					},
				],
				sort: [
					{
						required: true,
						message: '请输入顺序',
						trigger: 'blur',
					},
					{
						pattern: /^([1-9][0-9]*)$/,
						message: '只能输入正整数',
						trigger: 'blur',
					},
				],
				create_time: [
					{
						required: true,
						message: '请选择发布时间',
						trigger: 'change',
					},
				],
			},
		};
	},
	components: {
		quillEditor,
	},
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

		if (this.$route.query.data) {
			let query_data = JSON.parse(this.$route.query.data);
			this.ruleForm.content = this.escapeStringHTML(query_data.content);
			this.ruleForm = query_data;
			this.ruleForm.create_time = '实时发布';
			this.ruleForm.val_time = query_data.create_time;
		}
	},
	methods: {
		go_back() {
			this.$router.go(-1);
		},
		onEditorChange({ editor, html, text }) {
			this.ruleForm.content = html;
		},
		// 转码
		escapeStringHTML(str) {
			str = str.toString().replace(/&lt;/g, '<');
			str = str.toString().replace(/&gt;/g, '>');
			return str;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// alert('submit!');
					console.log(this.ruleForm.content);
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
				this.$refs.box_rHeight.style.height = data - 120 + 'px';
				this.$refs.box_rHeight.style.minHeight = 850 + 'px';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.help_edit {
	text-align: left;
	margin: 30px 25px;
	box-sizing: border-box;
	padding: 40px;
	box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
	.top_title {
        span{
            font-size: 16px;
        }
	}
	.con_ruleForm {
		width: 1100px;
		margin: auto;
		margin-top: 40px;
		.my_group {
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			.el-radio:last-child {
				margin-top: 20px;
			}
		}
	}
}
</style>
