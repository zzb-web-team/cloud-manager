<template>
	<div class="unprocessed_tab">
		<div class="title">
			<p>未处理请求</p>
			<div class="title_seach">
				<div class="title_seach_left">
					<el-input
						v-model="Activechanid"
						placeholder="请输入渠道ID"
						size="small"
						@change="onChanges"
					></el-input>
					<el-input
						v-model="jiasu"
						placeholder="请输入加速内容名称"
						size="small"
						@change="onChanges"
					></el-input>
					<el-input
						v-model="cdnurl"
						placeholder="请输入CDN地址"
						size="small"
						@change="onChanges"
					></el-input>
				</div>
				<div class="title_seach_right">
					<el-radio-group
						size="medium"
						v-model="radio"
						@change="set_search_time"
						v-show="!show_time"
					>
						<el-radio-button label="今天"></el-radio-button>
						<el-radio-button label="昨天"></el-radio-button>
						<el-radio-button label="自定义"></el-radio-button>
					</el-radio-group>
					<el-button
						type="primary"
						size="small"
						v-show="show_time"
						@click="set_show_time"
						>自定义</el-button
					>
					<el-date-picker
						size="medium"
						v-show="show_time"
						v-model="search_time"
						type="date"
						placeholder="选择日期"
					>
					</el-date-picker>
					<el-button type="primary" size="small" @click="onChanges"
						>查询</el-button
					>
					<el-button size="small">重置</el-button>
				</div>
			</div>
		</div>
		<div class="content" ref="scrollerHeight">
			<div class="content_top">
				<el-button size="small" type="text" @click="export_exc"
					><img src="../../assets/img/btn_img.png" alt=""
				/></el-button>
			</div>
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column
					type="index"
					width="50"
					label="序号"
				></el-table-column>
				<el-table-column prop="date" label="访问总次数" width="180">
				</el-table-column>
				<el-table-column prop="name" label="渠道ID" width="220">
				</el-table-column>
				<el-table-column
					prop="address"
					label="加速内容名称"
					width="220"
				>
				</el-table-column>
				<el-table-column prop="address" label="CDN地址">
				</el-table-column>
			</el-table>
			<div class="content_bottom">
				<fenye></fenye>
			</div>
		</div>
		<!-- 弹窗 -->
		<el-dialog
			class="unprocessed_dialog"
			title=""
			:visible.sync="dialogVisible"
			width="30%"
			center
			:show-close="false"
		>
			<p>是否导出全部数据</p>
			<p slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false"
					>全部数据</el-button
				>
				<el-button @click="dialogVisible = false">今日数据</el-button>
			</p>
		</el-dialog>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
export default {
	data() {
		return {
			clientHeight: '',
			Activechanid: '',
			jiasu: '',
			cdnurl: '',
			radio: '今天',
			search_time: '',
			show_time: false,
			dialogVisible: false,
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
				},
			],
		};
	},
	watch: {
		clientHeight() {
			//如果clientHeight 发生改变，这个函数就会运行
			this.changeFixed(this.clientHeight);
		},
	},
	components: {
		fenye,
	},
	mounted() {
		let that = this;
		this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
		window.onresize = function() {
			that.clientHeight = `${document.documentElement.clientHeight}`;
			if (that.$refs.scrollerHeight) {
				that.$refs.scrollerHeight.style.height =
					clientHeight - 334 + 'px';
				this.$refs.scrollerHeight.style.minHeight = 500 + 'px';
			}
		};
	},
	methods: {
		onChanges() {},
		set_search_time() {
			if (this.radio == '自定义') {
				this.show_time = true;
			} else {
				this.show_time = false;
			}
		},
		set_show_time() {
			this.show_time = !this.show_time;
			this.radio = '今天';
		},
		export_exc() {
			this.dialogVisible = !this.dialogVisible;
		},
		//查询屏幕高度自适应
		changeFixed(clientHeight) {
			if (this.$refs.scrollerHeight) {
				this.$refs.scrollerHeight.style.height =
					clientHeight - 334 + 'px';
				this.$refs.scrollerHeight.style.minHeight = 500 + 'px';
			}
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
};
</script>

<style lang="scss" scoped>
.unprocessed_tab {
	width: 100%;
	height: 100px;
	background-color: #fff;
	text-align: left;
	.title {
		width: 100%;
		height: 184px;
		margin-top: 30px;
		margin-bottom: 30px;
		box-sizing: border-box;
		padding: 30px;
		display: flex;
		flex-direction: column;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		p {
			font-size: 16px;
			font-weight: 600;
		}
		.title_seach {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 100px;
			.title_seach_left {
				display: flex;
				align-items: center;
				.el-input--small {
					width: 200px;
					margin-right: 20px;
				}
			}
			.title_seach_right {
				.el-date-editor--date {
					margin: 0 10px;
				}
				.el-button--small {
					border-radius: 8px;
					padding: 9px 25px;
					margin: 0 10px;
				}
			}
		}
	}
	.content {
		flex: 1;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		padding: 30px;
		.content_top {
			text-align: right;
			img {
				width: 80%;
			}
		}
		.content_bottom {
			margin-top: 20px;
			text-align: right;
		}
	}
}
</style>
