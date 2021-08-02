<template>
	<div class="traffic_detil" ref="box_rHeight">
		<div class="title_text">财务管理 > 欠款详情</div>
		<div class="second_text">
			<div>
				<span>用户</span><span>{{ title_data.user_id }}</span>
			</div>
			<div>
				<span>累计欠款金额</span
				><span>￥{{ title_data.balance.toFixed(2) }}</span>
			</div>
			<div>
				<span>逾期时间</span
				><span>{{ title_data.state_change_time | secondsFormat }}</span>
			</div>
			<!-- <div>
				<span>产品类型</span><span>{{ title_data.product_type }}</span>
			</div> -->
		</div>
		<div>
			<el-table
				:data="tableData"
				:cell-style="rowClass"
				:header-cell-style="headClass"
				stripe
				style="width: 100%"
			>
				<el-table-column prop="start_time" label="加速时间">
					<template slot-scope="scope">
						{{ common.getTimes(scope.row.start_time * 1000) }}-
						{{ common.getTimes(scope.row.end_time * 1000) }}
					</template>
				</el-table-column>
				<el-table-column prop="flow" label="流量使用">
					<template slot-scope="scope">
						{{ scope.row.start_time | set_formatByteActive }}
					</template>
				</el-table-column>
				<el-table-column prop="amount" label="欠费金额">
					<template slot-scope="scope">
						{{ scope.row.amount.toFixed(2) }}
					</template>
				</el-table-column>
			</el-table>
			<div class="content_bottom">
				<pageNation
					:pager="pager"
					@handleSizeChange="handleSizeChange"
					@handleCurrentChange="handleCurrentChange"
				></pageNation>
			</div>
		</div>
	</div>
</template>

<script>
import { query_arrears_info } from '../../servers/api';
import pageNation from '@/components/pageNation';
export default {
	data() {
		return {
			clientHeight: '',
			tableData: [
				// {
				// 	date: '2016-05-02',
				// 	name: '王小虎',
				// 	address: '上海市普陀区金沙江路 1518 弄',
				// },
				// {
				// 	date: '2016-05-04',
				// 	name: '王小虎',
				// 	address: '上海市普陀区金沙江路 1517 弄',
				// },
				// {
				// 	date: '2016-05-01',
				// 	name: '王小虎',
				// 	address: '上海市普陀区金沙江路 1519 弄',
				// },
				// {
				// 	date: '2016-05-03',
				// 	name: '王小虎',
				// 	address: '上海市普陀区金沙江路 1516 弄',
				// },
			],
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			pageNo: 0,
			pageSize: 10,
			total_cnt: 0,
			title_data: {},
		};
	},
	components: {
		pageNation,
	},
	watch: {
		clientHeight() {
			//如果clientHeight 发生改变，这个函数就会运行
			this.changeFixed(this.clientHeight);
		},
	},
	filters: {
		formatTel(iphone) {
			let tel = String(iphone);
			var reg = /^(\d{3})\d{4}(\d{4})$/;
			return tel.replace(reg, '$1****$2');
		},
		secondsFormat(s) {
			var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
			var hour = Math.floor((s - day * 24 * 3600) / 3600);
			var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
			var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
			return day + '天' + hour + '时' + minute + '分' + second + '秒';
		},
		set_formatByteActive(bkb) {
			var limit = parseInt(bkb);
			var size = '';
			if (limit < 1024) {
				size = limit.toFixed(2) + 'KB';
			} else if (limit < 1024 * 1024) {
				size = (limit / 1024).toFixed(2) + 'MB';
			} else if (limit < 1024 * 1024 * 1024) {
				size = (limit / (1024 * 1024)).toFixed(2) + 'GB';
			} else if (limit < 1024 * 1024 * 1024 * 1024) {
				size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'TB';
			} else {
				size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'TB';
			}

			var sizeStr = size + ''; //转成字符串
			var index = sizeStr.indexOf('.'); //获取小数点处的索引
			var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
			return size;
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
		if (that.$refs.box_rHeight) {
			that.$refs.box_rHeight.style.height =
				that.clientHeight - 140 + 'px';
			that.$refs.box_rHeight.style.minHeight = 500 + 'px';
		}
		this.title_data = JSON.parse(this.$route.query.data);
		this.onChanges();
	},
	methods: {
		onChanges() {
			let params = {
				user_id: this.title_data.user_id,
				page: this.pager.page - 1,
			};
			query_arrears_info(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.data.data;
						this.total_cnt = res.data.total;
						this.pager.count = res.data.total;
					}
				})
				.catch((error) => {});
		},
		//获取页码
		handleCurrentChange(pages) {
			this.pager.page = pages.val;
			console.log(pages);
			this.onChanges();
		},
		handleSizeChange(pagesize) {
			this.pageSize = pagesize;
		},
		//查询屏幕高度自适应
		changeFixed(data) {
			if (this.$refs.box_rHeight) {
				this.$refs.box_rHeight.style.height = data - 140 + 'px';
				this.$refs.box_rHeight.style.minHeight = 500 + 'px';
			}
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#E8F3FF;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
};
</script>

<style lang="scss" scoped>
.traffic_detil {
	box-sizing: border-box;
	padding: 36px;
	margin: 36px;
	background-color: #fff;
	text-align: left;
	box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
	.title_text {
		margin-bottom: 40px;
	}
	.second_text {
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		padding: 20px 0;
		margin-bottom: 40px;
		div {
			span {
				margin-left: 10px;
			}
		}
	}
	.content_bottom {
		margin-top: 20px;
		text-align: right;
	}
}
</style>
