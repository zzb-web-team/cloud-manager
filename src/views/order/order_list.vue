<template>
	<div class="order_list_com">
		<div class="con_top">
			<div class="top_title">订单管理</div>
			<div class="title_seach">
				<div class="search_left">
					<el-row
						type="flex"
						justify="space-between"
						class="title_seach_item"
					>
						<el-col>
							<span class="item_title"
								>&nbsp;&nbsp;&nbsp;&nbsp;订单号</span
							>
							<el-input
								v-model="order_id"
								placeholder="请输入订单号"
								@change="onChanges"
								style="width:80%;max-width:300px;"
							></el-input>
						</el-col>
						<el-col>
							<span class="item_title">商品名称</span>
							<el-input
								v-model="val_name"
								placeholder="请输入商品名称"
								@change="onChanges"
								style="width:80%;max-width:300px;"
							></el-input>
						</el-col>
						<el-col>
							<span class="item_title">支付方式</span>
							<el-select
								v-model="pay_type"
								placeholder="请选择活动区域"
								style="width:80%;max-width:300px;height:auto;"
							>
								<el-option label="全部" value="0"></el-option>
								<el-option label="微信" value="1"></el-option>
								<el-option label="支付宝" value="2"></el-option>
							</el-select>
						</el-col>
					</el-row>
					<el-row
						type="flex"
						justify="space-between"
						class="title_seach_item"
					>
						<el-col>
							<span class="item_title">用户信息</span>
							<el-input
								v-model="user_id"
								placeholder="请输入用户信息"
								@change="onChanges"
								style="width:80%;max-width:300px;"
							></el-input>
						</el-col>
						<el-col>
							<span class="item_title">产品类型</span>
							<el-select
								v-model="product_type"
								placeholder="请选择活动区域"
								style="width:80%;max-width:300px;height:auto;"
							>
								<el-option label="全部" value="0"></el-option>
								<el-option label="流量包" value="1"></el-option>
								<el-option label="流量" value="2"></el-option>
							</el-select>
						</el-col>
						<el-col>
							<span class="item_title">创建时间</span>
							<el-date-picker
								v-model="search_time"
								type="daterange"
								placeholder="选择日期"
								range-separator="~"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								value-format="timestamp"
								style="width:80%;max-width:300px;"
							>
							</el-date-picker>
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
				stripe
				style="width: 100%"
				:cell-style="rowClass"
				:header-cell-style="headClass"
			>
				<el-table-column type="selection" width="55"> </el-table-column>
				<el-table-column prop="order_id" label="订单号" width="220">
				</el-table-column>
				<el-table-column prop="product_name" label="产品名称">
				</el-table-column>
				<el-table-column prop="size_spec" label="规格" width="120">
                    <template slot-scope="scope">{{scope.row.size_spec }}GB</template>
				</el-table-column>
				<el-table-column
					prop="product_type"
					label="产品类型"
					width="80"
				>
					<template slot-scope="scope">
						<p v-if="scope.row.product_type == 1">流量包</p>
						<p v-else>流量计费</p>
					</template>
				</el-table-column>
				<el-table-column prop="num" label="数量" width="80">
					<template slot-scope="scope"
						><span>*{{ scope.row.num }}</span></template
					>
				</el-table-column>
				<el-table-column
					prop="pay_amount"
					label="订单金额"
					width="100"
				>
				</el-table-column>
				<el-table-column label="用户信息">
					<template slot-scope="scope">
						<p>{{ scope.row.user_id }}</p>
						<!-- <p>{{ scope.row.tel | formatTel }}</p> -->
					</template>
				</el-table-column>
				<el-table-column prop="create_time" label="创建订单时间">
                    <template slot-scope="scope">{{common.getTimes(scope.row.create_time*1000)}}</template>
				</el-table-column>
				<el-table-column prop="pay_type" label="支付方式" width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.pay_type == 1">微信</span>
						<span v-else-if="scope.row.pay_type == 2">支付宝</span>
						<span v-else>{{ scope.row.pay_type }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="state" label="订单状态" width="80">
					<template slot-scope="scope">
						<p style="color:orange;" v-if="scope.row.state == 1">
							待支付
						</p>
						<p v-else-if="scope.row.state == 2">已过期</p>
                        <p v-else-if="scope.row.state == 3">完成</p>
						<p v-else>已删除</p>
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
import {
	query_pktorder,
	del_pktorder,
	query_pktorder_for_admin,
} from './../../servers/api';
export default {
	mixins: [base],
	data() {
		return {
			clientHeight: '',
			order_id: '',
			val_name: '',
			pay_type: '0',
			user_id: '',
			product_type: '0',
			search_time: [
				new Date(new Date().toLocaleDateString()).getTime() -
					86400 * 1000,
				new Date().getTime(),
			],
			pageNo:0, //当前页码
			pageSize: 10, //每页数量
			total_cnt: 0, //数据总量
			tableData: [
				// {
				// 	order_id: 15049156199,
				// 	visit_cnt: 150,
				// 	product_name: '新用户超值体验包',
				// 	user_information: '王小虎',
				// 	tel: 15913124680,
				// 	product_type: '流量包',
				// 	num: 12,
				// 	order_amount: 10,
				// 	size_spec: 3,
				// 	pay_type: 1,
				// 	create_time: '2021-08-03 11:30:00',
				// 	state: 1,
				// },
				// {
				// 	order_id: 15049156402,
				// 	visit_cnt: 366,
				// 	product_name: '流量包（冰点划算）',
				// 	user_information: '王小虎',
				// 	tel: 15913124680,
				// 	product_type: '流量包',
				// 	num: 12,
				// 	order_amount: 10,
				// 	size_spec: 3,
				// 	pay_type: 2,
				// 	create_time: '2021-08-03 11:30:00',
				// 	state: 1,
				// },
				// {
				// 	order_id: 15049156946,
				// 	visit_cnt: 2,
				// 	product_name: '流量包（冰点划算）',
				// 	user_information: '王小虎',
				// 	tel: 15913124680,
				// 	product_type: '流量包',
				// 	num: 12,
				// 	order_amount: 10,
				// 	size_spec: 3,
				// 	pay_type: 2,
				// 	create_time: '2021-08-03 11:30:00',
				// 	state: 3,
				// },
				// {
				// 	order_id: 15049156033,
				// 	visit_cnt: 32,
				// 	product_name: '国庆超值包',
				// 	user_information: '王小虎',
				// 	tel: 15913124680,
				// 	product_type: '流量包',
				// 	num: 12,
				// 	order_amount: 10,
				// 	size_spec: 3,
				// 	pay_type: 1,
				// 	create_time: '2021-08-03 11:30:00',
				// 	state: 2,
				// },
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
		let that = this;
		that.clientHeight = `${document.documentElement.clientHeight ||
			document.documentElement.offsetHeight}`; //获取浏览器可视区域高度
		window.onresize = function() {
			that.clientHeight = `${document.documentElement.clientHeight ||
				document.documentElement.offsetHeight}`;
		};
		if (that.$refs.box_rHeight) {
			that.$refs.box_rHeight.style.height =
				that.clientHeight - 280 + 'px';
			that.$refs.box_rHeight.style.minHeight = 500 + 'px';
		}
		this.onChanges();
	},
	methods: {
		onChanges() {
			let params = {
				product_name: this.val_name,
				start_time: parseInt(this.search_time[0] / 1000), //创建开始时间 单位:秒
				end_time: parseInt(this.search_time[1] / 1000),
				page: this.pageNo,
				order_id: this.order_id,
				pay_type: Number(this.pay_type), //0:全部 1:微信 2:支付宝
				user_id: this.user_id,
				product_type: Number(this.product_type), //0:全部 1:流量包 2:流量
			};
			query_pktorder_for_admin(params)
				.then((res) => {
					if (res.status == 0) {
						this.total_cnt = res.data.total;
						this.tableData = res.data.data;
					}
				})
				.catch((error) => {});
		},
		reset() {
            this.order_id="";
			this.val_name = '';
			this.pay_type = '0';
			this.user_id = '';
			this.product_type = '0';
			this.search_time = [
				new Date(new Date().toLocaleDateString()).getTime() -
					86400 * 1000,
				new Date().getTime(),
            ];
            this.pageNo=0;
            this.onChanges();
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
				`<p>是否删除订单${rows.order_id}</p><p>删除后无法查看订单信息</p>`,
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
				.then(() => {})
				.catch(() => {
					let params = {};
					params.data = [];
					params.data.push(rows.order_id);
					params.count = params.data.length;
					del_pktorder(params)
						.then((res) => {
							if (res.status == 0) {
                                this.$message({
                                    type: 'success',
									message: '删除成功!',
								});
								this.onChanges();
							}
						})
						.catch((error) => {});
				});
		},
		//获取页码
		handleCurrentChange(pages) {
			this.pageNo = pages-1;
			this.onChanges();
		},
		handleSizeChange(pagesize) {
			this.pageSize = pagesize;
		},
		//查询屏幕高度自适应
		changeFixed(data) {
			if (this.$refs.box_rHeight) {
				this.$refs.box_rHeight.style.height = data - 280 + 'px';
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
