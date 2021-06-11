<template>
	<div class="unprocessed_tab">
		<div class="title">
			<p>未处理请求</p>
			<div class="title_seach">
				<div class="title_seach_left">
					<el-input
						v-model="channeld"
						placeholder="请输入渠道ID"
						@change="onChanges"
					></el-input>
					<el-input
						v-model="domain"
						placeholder="请输入加速内容名称"
						@change="onChanges"
					></el-input>
					<el-input
						v-model="urlName"
						placeholder="请输入CDN地址"
						@change="onChanges"
					></el-input>
				</div>
				<div class="title_seach_right">
					<el-radio-group
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
						v-show="show_time"
						v-model="search_time"
						type="date"
						placeholder="选择日期"
						value-format="timestamp"
					>
					</el-date-picker>
					<el-button type="primary" @click="onChanges"
						>查询</el-button
					>
					<el-button @click="reset">重置</el-button>
				</div>
			</div>
		</div>
		<div class="tab_content" ref="box_rHeight">
			<div class="content_top">
				<el-button type="text" @click="export_exc"
					><img src="../../assets/img/btn_img.png" alt=""
				/></el-button>
			</div>
			<el-table
				:data="tableData"
				stripe
				style="width: 100%"
				:cell-style="rowClass"
				:header-cell-style="headClass"
			>
				<el-table-column
					type="index"
					width="50"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="visit_cnt"
					label="访问总次数"
					width="180"
				>
				</el-table-column>
				<el-table-column prop="channelId" label="渠道ID" width="220">
				</el-table-column>
				<el-table-column prop="domain" label="加速内容名称" width="220">
				</el-table-column>
				<el-table-column prop="urlName" label="CDN地址">
				</el-table-column>
			</el-table>
			<div class="content_bottom">
				<fenye
					:currentPage="pageNo"
					@handleCurrentChange="handleCurrentChange"
					@handleSizeChange="handleSizeChange"
					:pagesa="total_cnt"
					v-show="total_cnt != 0"
				></fenye>
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
import { ipfs_unhandle_req_list, ipfs_flow_summay } from '../../servers/api';
import fenye from '@/components/fenye';
import base from '../../components/base';
export default {
	mixins: [base],
	data() {
		return {
			clientHeight: '',
			channeld: '',
			domain: '',
			urlName: '',
			radio: '今天',
			search_time: '',
			show_time: false,
			dialogVisible: false,
			starttime: '',
			endtime: '',
			pageNo: 1, //当前页码
			pageSize: 10, //每页数量
			total_cnt: 0, //数据总量
			tableData: [
				// {
				// 	f_date: '2016-05-02',
				// 	visit_cnt: 150,
				// 	domain: '我的加速1',
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
				// {
				// 	f_date: '2016-05-04',
				// 	visit_cnt: 366,
				// 	domain: '我的加速8',
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
				// {
				// 	f_date: '2016-05-01',
				// 	visit_cnt: 2,
				// 	domain: '我的加速6',
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
				// {
				// 	f_date: '2016-05-03',
				// 	visit_cnt: 32,
				// 	domain: '我的加速3',
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
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
		that.clientHeight = `${document.documentElement.clientHeight ||
			document.documentElement.offsetHeight}`; //获取浏览器可视区域高度
		window.onresize = function() {
			that.clientHeight = `${document.documentElement.clientHeight ||
				document.documentElement.offsetHeight}`;
		};
		if (that.$refs.box_rHeight) {
			that.$refs.box_rHeight.style.height =
				that.clientHeight - 210 + 'px';
			that.$refs.box_rHeight.style.minHeight = 500 + 'px';
		}

		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		this.onChanges();
	},
	methods: {
		//搜索--获取数据
		onChanges() {
			if (this.radio == '自定义') {
				this.starttime = parseInt(this.search_time / 1000);
				this.endtime = this.starttime + 86400;
			}
			let params = new Object();
			params.channeld = this.channeld ? this.channeld : '*';
			params.domain = this.domain ? this.domain : '*';
			params.urlName = this.urlName ? this.urlName : '*';
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			params.page = this.pageNo;
			params.pagesize = this.pageSize;
			ipfs_unhandle_req_list(params)
				// ipfs_flow_summay(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.data.list;
						this.total_cnt = res.data.totalCnt;
					} else {
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//重置
		reset() {
			this.channeld = '';
			this.domain = '';
			this.urlName = '';
			this.show_time = false;
			this.radio = '今天';
			this.starttime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = Date.parse(new Date()) / 1000;
			this.onChanges();
		},
		set_search_time() {
			if (this.radio == '自定义') {
				this.show_time = true;
			} else if (this.radio == '今天') {
				this.starttime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.endtime = Date.parse(new Date()) / 1000;
				this.show_time = false;
			} else {
				this.endtime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				this.starttime =
					new Date(new Date().toLocaleDateString()).getTime() / 1000 -
					86400;
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
		//获取页码
		handleCurrentChange(pages) {
			this.pageNo = pages;
			this.onChanges();
		},
		handleSizeChange(pagesize) {
			this.pageSize = pagesize;
		},
		//查询屏幕高度自适应
		changeFixed(data) {
			if (this.$refs.box_rHeight) {
				this.$refs.box_rHeight.style.height = data - 210 + 'px';
				this.$refs.box_rHeight.style.minHeight = 500 + 'px';
			}
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#E8F3FF;color:#333333;';
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
	min-width: 1170px;
	height: 100px;
	background-color: #fff;
	text-align: left;
	.title {
		// height: 184px;
		margin-top: 30px;
		margin-bottom: 15px;
		box-sizing: border-box;
		margin-left: 25px;
		margin-right: 25px;
		padding: 21px 30px 0 30px;
		display: flex;
		flex-direction: column;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		p {
			font-size: 16px;
			margin-bottom: -10px;
		}
		.title_seach {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 100px;
			white-space: nowrap;
			.title_seach_left {
				display: flex;
				align-items: center;
				.el-input {
					width: 200px;
					margin-right: 20px;
				}
			}
			.title_seach_right {
				.el-date-editor--date {
					margin: 0 10px;
				}
				.el-button {
					// border-radius: 5px;
					// padding: 9px 25px;
					margin: 0 10px;
				}
			}
		}
	}
	.tab_content {
		flex: 1;
		margin-left: 25px;
		margin-right: 25px;
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
