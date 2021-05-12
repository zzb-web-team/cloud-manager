<template>
	<div class="con">
		<div class="con_top">
			<div class="top_title">流量包管理</div>
			<div class="title_seach">
				<div>
					<el-input
						v-model="val_name"
						placeholder="请输入渠道ID"
						@change="onChanges"
						style="width:100%;max-width:300px;margin-right:10px;"
					></el-input>
					<span>添加时间</span>
					<el-date-picker
						v-model="search_time"
						type="daterange"
						placeholder="选择日期"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="截止日期"
						suffix-icon="el-icon-date"
						style="width:100%;max-width:340px;"
					>
					</el-date-picker>
				</div>
				<div>
					<el-button type="primary"  @click="onChanges"
						>查询</el-button
					>
					<el-button  @click="reset">重置</el-button>
				</div>
			</div>
		</div>
		<div class="table_con" ref="box_rHeight">
			<div class="content_top">
				<el-button
					type="primary"
					@click="go_traffic_configuration"
					>添加</el-button
				>
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
				<el-table-column prop="name" label="产品名称" width="220">
				</el-table-column>
				<el-table-column prop="specification" label="规格" width="130">
				</el-table-column>
				<el-table-column prop="num" label="数量" width="100">
				</el-table-column>
				<el-table-column prop="original_price" label="原价" width="100">
				</el-table-column>
				<el-table-column prop="discount" label="限时特惠" width="100">
				</el-table-column>
				<el-table-column prop="current_price" label="现价" width="100">
				</el-table-column>
				<el-table-column prop="sotr" label="排序" width="100">
				</el-table-column>
				<el-table-column prop="valid_period" label="有效期">
				</el-table-column>
				<el-table-column prop="create_time" label="添加时间">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="260">
					<template slot-scope="scope">
						<el-button
							@click="handleClick(scope.row, 1)"
							type="text"
							size="small"
							>查看</el-button
						>
						<el-button
							type="text"
							size="small"
							@click="handleClick(scope.row, 2)"
							>编辑</el-button
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
import base from "../../components/base"
export default {
    mixins:[base],
	data() {
		return {
			clientHeight: '',
			val_name: '',
			search_time: [],
			pageNo: 1, //当前页码
			pageSize: 10, //每页数量
			total_cnt: 0, //数据总量
			starttime: '',
			endtime: '',
			tableData: [
				{
					f_date: '2016-05-02',
					specification: '50GB',
					name: '50GB流量包',
					original_price: 12,
					current_price: 10,
					num: 5,
					discount: 0.83,
					sotr: 1,
					valid_period: '2021-04-03 11:30:00',
					create_time: '2021-08-03 11:30:00',
				},
				{
					f_date: '2016-05-04',
					specification: '500GB',
					name: '500GB流量包',
					original_price: 100,
					current_price: 90,
					num: 3,
					discount: 0.9,
					sotr: 2,
					valid_period: '流量用完即止',
					create_time: '2021-08-03 11:30:00',
				},
				{
					f_date: '2016-05-01',
					specification: '100TB',
					name: '七日特惠包',
					original_price: 80,
					current_price: 40,
					num: 1,
					discount: 0.5,
					sotr: 3,
					valid_period: '流量用完即止',
					create_time: '2021-08-03 11:30:00',
				},
				{
					f_date: '2016-05-03',
					specification: '150GB',
					name: '新手特惠',
					original_price: 10,
					current_price: 8,
					num: 1,
					discount: 0.8,
					sotr: 4,
					valid_period: '流量用完即止',
					create_time: '2021-08-03 11:30:00',
				},
			],
		};
	},
	components: {
		fenye,
	},
	watch: {
		clientHeight() {
			//如果clientHeight 发生改变，这个函数就会运行
			this.changeFixed(this.clientHeight);
		},
	},
	filters: {},
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
				that.clientHeight - 270 + 'px';
			that.$refs.box_rHeight.style.minHeight = 500 + 'px';
		}
	},
	methods: {
		// go_list() {
		// 	this.$router.push({ path: '/traffic_configuration' });
		// },
		onChanges() {},
		reset() {},
		handleClick(row, num) {
			this.$router.push({
				path: '/traffic_configuration',
				query: { type: num, data: row },
			});
		},
		go_traffic_configuration() {
			this.$router.push({
				path: '/traffic_configuration',
			});
		},
		//删除
		deleteRow(rows) {
			this.$confirm(`删除该商品后，用户将无法购买`, '提示', {
				cancelButtonText: '确定',
				confirmButtonText: '取消',
				type: 'warning',
				dangerouslyUseHTMLString: true,
				center: true,
				cancelButtonClass: 'no_btn',
				confirmButtonClass: 'ok_btn',
			})
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
				this.$refs.box_rHeight.style.height = data - 270 + 'px';
				this.$refs.box_rHeight.style.minHeight = 500 + 'px';
			}
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#E8F3FF;color:#333333;font-weight:600';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;color:#333333;';
		},
	},
};
</script>

<style lang="scss" scoped>
.con {
	margin: 30px 25px;
	text-align: left;
	background-color: #fff;
	.con_top {
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		box-sizing: border-box;
		padding: 21px 40px 0 40px;
		.top_title {
            font-size: 16px;
            margin-bottom: -10px;
		}
		.title_seach {
			display: flex;
			justify-content: space-between;
			align-items: center;
			white-space: nowrap;
			div {
				display: flex;
				justify-content: start;
				align-items: center;
				line-height: 100px;
				// margin-bottom: 10px;
				span {
					margin-left: 20px;
					margin-right: 10px;
					font-size: 14px;
				}
			}
		}
	}
	.table_con {
		margin-top: 15px;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		flex: 1;
		padding: 40px;
		.content_top {
			margin-bottom: 20px;
		}
		.content_bottom {
			margin-top: 20px;
			text-align: right;
		}
	}
}
</style>
