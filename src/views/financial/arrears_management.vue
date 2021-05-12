<template>
	<div class="order_list_com">
		<div class="con_top">
			<div class="top_title">财务管理</div>
			<div class="title_seach">
				<div class="search_left">
					<el-row
						type="flex"
						justify="space-between"
						class="title_seach_item"
					>
						<el-col>
							<span class="item_title"
								>&nbsp;&nbsp;&nbsp;&nbsp;用户信息</span
							>
							<el-input
								v-model="order_id"
								placeholder="输入用户ID、账号、手机号"
								@change="onChanges"
								style="width:80%;max-width:260px;"
							></el-input>
						</el-col>
						<el-col>
							<span class="item_title">结算方式</span>
							<el-select
								v-model="pay_type"
								placeholder="请选择活动区域"
								style="width:80%;max-width:260px;height:auto;"
							>
								<el-option label="全部" value="*"></el-option>
								<el-option
									label="按日结算"
									value="shanghai"
								></el-option>
								<el-option
									label="按月结算"
									value="beijing"
								></el-option>
							</el-select>
						</el-col>
						<el-col>
							<span class="item_title">账单周期</span>
							<el-date-picker
								v-model="search_time"
								type="daterange"
								placeholder="选择日期"
								range-separator="~"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								style="width:80%;max-width:260px;"
							>
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row
						type="flex"
						justify="space-between"
						class="title_seach_item"
					>
						<el-col>
							<span class="item_title">账号状态</span>
							<el-select
								v-model="user_type"
								placeholder="请选择活动区域"
								style="width:80%;max-width:260px;height:auto;"
							>
								<el-option label="全部" value="*"></el-option>
								<el-option
									label="启用"
									value="shanghai"
								></el-option>
								<el-option
									label="禁用"
									value="beijing"
								></el-option>
							</el-select>
						</el-col>
					</el-row>
				</div>
				<div class="search_right">
					<el-button type="primary" @click="onChanges"
						>查询</el-button
					>
					<el-button @click="reset">重置</el-button>
				</div>
			</div>
		</div>
		<div class="con_table" ref="box_rHeight">
			<el-table
				:data="tableData"
				style="width: 100%"
				:cell-style="rowClass"
				:header-cell-style="headClass"
			>
				<el-table-column label="用户信息">
					<template slot-scope="scope">
						<p>{{ scope.row.user_information }}</p>
						<p>{{ scope.row.tel | formatTel }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="model" label="计费模式">
				</el-table-column>
				<el-table-column prop="charging_model" label="账单结算方式">
				</el-table-column>
				<el-table-column prop="order_id" label="交易单号">
				</el-table-column>
				<el-table-column
					prop="create_time"
					label="账单周期"
					width="320"
				>
					<template slot-scope="scope">
						{{ scope.row.create_time }} ~ {{ scope.row.end_time }}
					</template>
				</el-table-column>
				<el-table-column prop="product_type" label="按量计费使用量">
				</el-table-column>
				<el-table-column prop="num" label="总费用">
					<template slot-scope="scope">
						<span>￥{{ scope.row.num }}</span></template
					>
				</el-table-column>
				<el-table-column prop="money" label="欠费">
					<template slot-scope="scope"
						>-{{ scope.row.money }}</template
					>
				</el-table-column>

				<el-table-column prop="pay_type" label="费用逾期时间">
					<template slot-scope="scope">
						<span v-if="scope.row.pay_type > 10" style="color:red;"
							>{{ scope.row.pay_type }}天</span
						>
						<span v-else>{{ scope.row.pay_type }}天</span>
					</template>
				</el-table-column>
				<el-table-column prop="serial_number" label="账号状态">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.serial_number"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-value="2"
							inactive-value="1"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="160">
					<template slot-scope="scope">
						<el-button
							@click="handleClick(scope.row)"
							type="text"
							size="small"
							>查看详情</el-button
						>
						<el-button
							@click="deleteRow(scope.row)"
							type="text"
							size="small"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="content_bottom">
				<fenye
					:currentPage="pageNo"
					@handleCurrentChange="handleCurrentChange"
					@handleSizeChange="handleSizeChange"
					:pagesa="total_cnt"
				></fenye>
			</div>
		</div>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import base from '../../components/base';
export default {
	mixins: [base],
	data() {
		return {
			clientHeight: '',
			order_id: '',
			pay_type: '*',
			user_type: '*',
			search_time: '',
			starttime: '',
			endtime: '',
			pageNo: 1, //当前页码
			pageSize: 10, //每页数量
			total_cnt: 0, //数据总量
			tableData: [
				{
					order_id: 15049156199,
					visit_cnt: 150,
					model: '按量收费',
					charging_model: '按日结算',
					user_information: '王小虎',
					tel: 15913124680,
					product_type: '985.75MB',
					num: 11652,
					money: 10,
					specification: 3,
					pay_type: 200,
					create_time: '2021-08-03 11:30:00',
					end_time: '2021-09-03 15:53:12',
					serial_number: '1',
				},
				{
					order_id: 15049156402,
					visit_cnt: 366,
					model: '按量收费',
					charging_model: '按日结算',
					user_information: '王小虎',
					tel: 15913124680,
					product_type: '879.08MB',
					num: 12,
					money: 10,
					specification: 3,
					pay_type: 12,
					create_time: '2021-08-03 11:30:00',
					end_time: '2021-09-03 15:53:12',
					serial_number: '2',
				},
				{
					order_id: 15049156946,
					visit_cnt: 2,
					model: '按量收费',
					charging_model: '按日结算',
					user_information: '王小虎',
					tel: 15913124680,
					product_type: '879.08MB',
					num: 1561,
					money: 10,
					specification: 3,
					pay_type: 9,
					create_time: '2021-08-03 11:30:00',
					end_time: '2021-09-03 15:53:12',
					serial_number: '2',
				},
				{
					order_id: 15049156033,
					visit_cnt: 32,
					model: '按量收费',
					charging_model: '按月结算',
					user_information: '王小虎',
					tel: 15913124680,
					product_type: '750.19MB',
					num: 12,
					money: 10,
					specification: 3,
					pay_type: 4,
					create_time: '2021-08-03 11:30:00',
					end_time: '2021-09-03 15:53:12',
					serial_number: '2',
				},
			],
		};
	},
	components: {
		fenye,
	},
	filters: {
		formatTel(iphone) {
			let tel = String(iphone);
			var reg = /^(\d{3})\d{4}(\d{4})$/;
			return tel.replace(reg, '$1****$2');
		},
	},
	watch: {
		clientHeight() {
			//如果clientHeight 发生改变，这个函数就会运行
			this.changeFixed(this.clientHeight);
		},
	},
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		let that = this;
		that.clientHeight = `${document.documentElement.clientHeight ||
			document.documentElement.offsetHeight}`; //获取浏览器可视区域高度
		window.onresize = function() {
			that.clientHeight = `${document.documentElement.clientHeight ||
				document.documentElement.offsetHeight}`;
		};
		if (that.$refs.box_rHeight) {
			that.$refs.box_rHeight.style.height =
				that.clientHeight - 330 + 'px';
			that.$refs.box_rHeight.style.minHeight = 500 + 'px';
		}
	},
	methods: {
		onChanges() {},
		reset() {
			this.order_id = '';
			this.pay_type = '*';
			this.user_type = '*';
			this.search_time = '';
		},
		handleClick(row) {
			console.log(row);
			this.$router.push({
				path: '/order_detil',
				query: {
					data: JSON.stringify(row),
				},
			});
		},
		//删除
		/**
		 * 修改按钮样式，设计图左边是确定，右边是取消，
		 */
		deleteRow(rows) {
			console.log(rows);
			this.$confirm(
				`<p>是否删除欠费记录</p><p>删除后无法查看该信息</p>`,
				'提示',
				{
					cancelButtonText: '确定',
					confirmButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true,
					center: true,
					cancelButtonClass: 'no_btn',
					confirmButtonClass: 'ok_btn',
				}
			)
				.then(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				})
				.catch(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
				});
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
				this.$refs.box_rHeight.style.height = data - 330 + 'px';
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
.order_list_com {
	text-align: left;
	margin: 30px 25px;
	box-sizing: border-box;
	.con_top {
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		box-sizing: border-box;
		padding: 20px 30px;
		.top_title {
			margin-bottom: 20px;
			font-size: 16px;
		}
		.title_seach {
			display: flex;
			justify-content: start;
			align-items: center;
			white-space: nowrap;
			.search_left {
				width: 85%;
				.title_seach_item {
					margin-bottom: 20px;
					.item_title {
						margin-right: 5px;
						font-size: 14px;
						display: inline-block;
						width: 70px;
						text-align: right;
					}
				}
			}
			.search_right {
				flex: 1;
				padding-bottom: 20px;
				text-align: right;
			}
		}
	}
	.con_table {
		margin-top: 15px;
		flex: 1;

		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		padding: 40px;
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
