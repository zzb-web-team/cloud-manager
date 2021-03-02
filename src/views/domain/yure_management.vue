<template>
	<div class="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>刷新预热管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<!-- 搜索 -->
			<div class="seach">
				<div class="seach_top">
					<el-input
						placeholder="操作内容、渠道ID"
						v-model="input"
						style="width:200px;margin-right: 10px;"
						@keyup.enter.native="onSubmit"
					>
						<i
							slot="prefix"
							class="el-input__icon el-icon-search"
							@click="seachuser()"
						></i>
					</el-input>
					<!-- <div class="seach_top_right" @click="option_display()">
                        筛选
                        <i class="el-icon-caret-bottom" :class="[rotate ? 'fa fa-arrow-down go' : 'fa fa-arrow-down aa']"></i>
                    </div>
                </div>
                <div v-if="optiondisplay" class="seach_bottom">
                    <span>操作类型：</span> -->
					<el-select
						v-model="value"
						placeholder="请选择操作类型"
						@change="onchangeTab1"
						style="width:160px;margin-right: 10px;"
					>
						<el-option
							v-for="(item, index) in options"
							:key="index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<!-- <span>状态：</span> -->
					<el-select
						v-model="valueStatus"
						placeholder="请选择状态"
						@change="onchangeTab"
						style="width:160px;margin-right: 10px;"
					>
						<el-option
							v-for="(item, index) in optionsStatus"
							:key="index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<!-- <span>注册时间：</span> -->
					<el-date-picker
						v-model="value1"
						type="datetimerange"
						range-separator="至"
						:picker-options="pickerOptions"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						@change="gettimes"
					></el-date-picker>
					<el-button type="primary" @click="seachuser()" style="margin-left:8px;">确定</el-button>
					<el-button
						type="primary"
						@click="reset()"
						style="margin-left:10px;"
						>重置</el-button
					>
				</div>
			</div>
			<!-- 表格 -->
			<div class="con_lable">
				<div style="padding:10px 0;text-align: left;">
					<el-button type="primary" @click="toLink('first')"
						>刷新</el-button
					>
					<el-button type="primary" @click="toLink('second')"
						>预热</el-button
					>
				</div>

				<!-- 表格 -->
				<el-table
					stripe
					border
					ref="multipleTable"
					:data="tableData"
					tooltip-effect="dark"
					style="width: 100%"
					:cell-style="rowClass"
					:header-cell-style="headClass"
					:default-sort="{ prop: 'date', order: 'descending' }"
					@sort-change="changeTableSort"
					@selection-change="handleSelectionChange"
				>
					<el-table-column label="操作内容" prop="url_name">
					</el-table-column>
					<el-table-column
						prop="refresh_type"
						label="操作类型"
					></el-table-column>
					<el-table-column prop="are" label="区域"></el-table-column>
					<el-table-column
						prop="buser_id"
						label="渠道ID"
					></el-table-column>
					<el-table-column
						prop="opt_time"
						:sortable="'custom'"
						label="操作时间"
					></el-table-column>
					<el-table-column
						prop="state"
						label="状态"
					></el-table-column>
					<el-table-column label="进度">
						<template slot-scope="scope">
							<el-progress
								:percentage="scope.row.progress"
							></el-progress>
						</template>
					</el-table-column>
				</el-table>
				<!-- <el-table
					stripe
					border
					ref="multipleTable"
					:data="tableData"
					row-key="id"
					tooltip-effect="dark"
					style="width: 100%"
					:cell-style="rowClass"
					:header-cell-style="headClass"
					:default-sort="{ prop: 'date', order: 'descending' }"
					@sort-change="changeTableSort"
					@selection-change="handleSelectionChange"
					:tree-props="{
						children: 'children',
						hasChildren: 'hasChildren',
					}"
				>
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="操作内容" prop="oprateInfo">
					</el-table-column>
					<el-table-column prop="oprateType" label="操作类型">
						<template slot-scope="scope">
							<span v-if="scope.row.oprateType == 1"
								>刷新缓存</span
							>
							<span v-else>内容预热</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="region"
						label="区域"
					></el-table-column>
					<el-table-column
						prop="channelId"
						label="渠道ID"
					></el-table-column>
					<el-table-column
						prop="endTime"
						:sortable="'custom'"
						sortable
						label="操作时间"
						width="300"
					>
						<template slot-scope="scope">
							<span>{{ scope.row.oprateTime | getymd }}</span
							>--<span>{{ scope.row.endTime | getymd }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 0">进行中</span>
							<span v-if="scope.row.status == 1">成功</span>
							<span
								v-if="scope.row.status == 2"
								style="color:red;"
								>失败</span
							>
							<span
								v-if="scope.row.status == 3"
								style="color:red;"
								>资源服务器错误</span
							>
							<span
								v-if="scope.row.status == 4"
								style="color:red;"
								>服务错误</span
							>
						</template>
					</el-table-column>
					<el-table-column label="进度">
						<template slot-scope="scope">
							<el-progress
								:percentage="scope.row.progress"
							></el-progress>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								v-if="scope.row.progress != 0"
								@click.native.prevent="
									closeurl(scope.$index, tableData)
								"
								:disabled="scope.row.status == 0 ? false : true"
								type="text"
								size="small"
							>
								关闭回源
							</el-button>
							<el-button
								v-else
								@click.native.prevent="
									changeset(scope.$index, tableData)
								"
								type="text"
								size="small"
							>
								重新回源
							</el-button>
						</template>
					</el-table-column>
				</el-table> -->

				<!-- 按钮 -->
				<div
					style="margin-top: 20px;display: flex;justify-content:  flex-end;align-items: center;"
				>
					<!-- <div>
						<el-button
							type="primary"
							@click="changeset"
							:disabled="btn_disable"
							>重新回源</el-button
						>
						<el-button
							type="primary"
							@click="closeurl"
							:disabled="btn_disable"
							>关闭缓存</el-button
						>
					</div> -->

					<fenye
						style="float:right;margin:10px 0 0 0;"
						@handleCurrentChange="handleCurrentChange"
						@handleSizeChange="handleSizeChange"
						:currentPage="currentPage"
						:pagesa="total_cnt"
					></fenye>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import fenye from '@/components/fenye';
import { refresh_state_admin, video_refresh } from '../../servers/api';
import { getymdtime } from '../../servers/sevdate';
export default {
	data() {
		return {
			valueStatus: '',
			input: '', //搜索输入框
			value1: '',
			dialog: false,
			radio: '1',
			radioes: '1',
			activeName: 'first',
			sadioes: 1,
			currentPage: 1,
			pagesize: 10,
			total_cnt: 0,
			form: {
				account: '',
				nickname: '',
				pwd: '',
				conpwd: '',
				actualname: '',
				tel: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',
			},
			details: {},

			formLabelWidth: '60px',
			optiondisplay: false,
			rotate: false,
			btn_disable: true,
			tolpage: 1,

			value: '',
			options: [
				{
					value: -1,
					label: '全部',
				},

				{
					value: 0,
					label: '刷新缓存',
				},
				{
					value: 1,
					label: '内容预热',
				},
			],
			optionsStatus: [
				{
					value: -1,
					label: '全部',
				},
				{
					value: 2,
					label: '等待中',
				},

				{
					value: 0,
					label: '进行中',
				},
				{
					value: 3,
					label: '失败',
				},
				{
					value: 1,
					label: '完成',
				},
			],
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			tableData: [
				// {
				// 	id: 1,
				// 	url_name: 'http://www.baidu.com',
				// 	refresh_type: '内容预热',
				// 	are: '湖北-武汉',
				// 	buser_id: '6000053',
				// 	opt_time: '2020-01-15',
				// 	state: '成功',
				// 	progress: 60,
				// 	error_type: 1,
				// 	children: [
				// 		{
				// 			id: 101,
				// 			url_name: 'http://www.baidu.com',
				// 			refresh_type: '内容预热',
				// 			are: '湖北-武汉',
				// 			buser_id: '6000053',
				// 			opt_time: '2020-01-15',
				// 			state: '进行中',
				// 			progress: 60,
				// 			error_type: 1,
				// 		},
				// 		{
				// 			id: 102,
				// 			url_name: 'http://www.baidu.com',
				// 			refresh_type: '内容预热',
				// 			are: '湖北-武汉',
				// 			buser_id: '6000053',
				// 			opt_time: '2020-01-15',
				// 			state: '成功',
				// 			progress: 60,
				// 			error_type: 1,
				// 		},
				// 	],
				// },
				// {
				// 	id: 2,
				// 	url_name: 'http://www.3600.com',
				// 	refresh_type: '刷新缓存',
				// 	are: '湖南-长沙',
				// 	buser_id: '6000061',
				// 	opt_time: '2020-01-19',
				// 	state: '失败',
				// 	progress: 32,
				// 	error_type: 101,
				// },
			],
			multipleSelection: [],
			url: '',
			buser_id: '',
			order: 1,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
				},
			},
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		},
	},
	components: {
		fenye,
	},
	created() {},
	mounted() {
		this.queryInfo();
	},
	methods: {
		arraySpanMethod({ row, column, rowIndex, columnIndex }) {
			if (!row.children) {
				if (columnIndex === 0) {
					return [1, 3];
				} else if (columnIndex === 1) {
					return [0, 0];
				}
			}
		},
		//关闭回源
		closeurl(index, rows) {
			if (rows) {
				console.log(index, rows);
			} else {
				console.log(this.multipleSelection);
			}
		},
		//重新回源
		changeset(index, rows) {
			if (rows) {
				console.log(index, rows);
			} else {
				console.log(this.multipleSelection);
			}
		},
		//排序
		//排序
		changeTableSort(column) {
			this.currentPage = 1;
			if (column.order == 'descending') {
				this.order = 0;
			} else {
				this.order = 1;
			}
			this.queryInfo();
		},
		//状态选这改变
		onchangeTab(val) {
			this.currentPage = 1;
			this.queryInfo();
		},
		//状态选这改变
		onchangeTab1(val) {
			this.currentPage = 1;
			this.queryInfo();
		},
		//重置
		reset() {
			this.input = '';
			this.value1 = '';
			this.value = '';
			this.valueStatus = '';
			this.queryInfo();
		},
		//跳转
		toLink(linkTab) {
			this.$router.push({
				path: '/yure_management1',
				query: {
					linkTab: linkTab,
				},
			});
		},
		//查询信息
		//获取页码
		handleCurrentChange(pages) {
			this.currentPage = pages;
			this.queryInfo();
			//this.getdata();
		},
		//获取每页数量
		handleSizeChange(pagetol) {
			// this.currentPage = pagetol;
			//this.getdata();
		},
		queryInfo() {
			var rx = /^\d{12}$/;
			if (rx.test(this.input)) {
				this.buser_id = this.input;
				this.url = '';
			} else {
				this.url = this.input;
				this.buser_id = '';
			}
			let startTime = 0;
			let endTime = 0;
			if (this.value1) {
				if (this.value1 == '') {
					startTime = 0;
					endTime = 0;
				} else {
					endTime = this.value1[1].getTime() / 1000;
					startTime = this.value1[0].getTime() / 1000;
				}
			} else {
				startTime = parseInt(
					new Date(new Date().toLocaleDateString()).getTime() / 1000
				);
				endTime =
					parseInt(
						new Date(new Date().toLocaleDateString()).getTime() /
							1000
					) + 86400;
			}

			// let param = {
			// 	url_name: this.url,
			// 	buser_id: this.buser_id,
			// 	refresh_type: this.value,
			// 	state: this.valueStatus,
			// 	start_time: startTime,
			// 	end_time: endTime,
			// 	page: this.currentPage - 1,
			// 	order: this.order,
			// };
			let param = {
				startTs: startTime,
				endTs: endTime,
				urlName: '*',
				channelId: '*',
				terminalName: -1,
				ipfsChannel: '*',
				domain: '*',
				pageNo: 0,
				pageSize: 10,
				timeUnit: 120,
			};

			video_refresh(param)
				// refresh_state_admin(param)
				.then((res) => {
					if (res.status == 0) {
						// let tempArr = res.data.data;

						let tempArr = res.data.result;
						this.total_cnt = res.data.total;
						for (var i = 0; i < tempArr.length; i++) {
							tempArr[i].opt_time = this.common.getTimes(
								tempArr[i].opt_time * 1000
							);
							if (tempArr[i].refresh_type == 1) {
								tempArr[i].refresh_type = '内容预热';
							} else {
								tempArr[i].refresh_type = '刷新缓存';
							}

							if (tempArr[i].state == 0) {
								tempArr[i].state = '进行中';
							} else if (tempArr[i].state == 1) {
								tempArr[i].state = '已完成';
							} else if (tempArr[i].state == 2) {
								tempArr[i].state = '等待中';
							} else if (tempArr[i].state == 3) {
								tempArr[i].state = '失败';
							}
						}

						this.tableData = tempArr;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},

		//获取页码
		getpage(pages) {
			this.tolpage = pages;
			//this.getdata();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			//this.getdata();
		},
		//回车事件
		onSubmit() {
			this.queryInfo();
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},
		//确定搜索
		seachuser() {
			this.queryInfo();
		},
		gettimes() {
			this.queryInfo();
		},
		//表格查看
		handleClick(row) {
			if (row.radio == '启用') {
				this.sadioes = '1';
			} else {
				this.sadioes = '2';
			}
			this.details = row;
			this.dialog = true;
		},
		// 全选
		handleSelectionChange(val) {
			if (val.length <= 0) {
				this.btn_disable = true;
			} else {
				this.btn_disable = false;
			}
			console.log(val);
			this.multipleSelection = val;
		},
		// 禁用
		disableuser() {
			this.$confirm('禁用后该用户不能登陆, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '操作成功!',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消',
					});
				});
		},
		//启用
		enableuser() {},
		// 删除
		deleateuser() {
			this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		//导出的方法
		exportExcel1() {
			this.dialog = true;
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
		},

		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
};
</script>

<style lang="scss" scoped>
.seach {
	width: 100%;
	margin: 30px 0 30px 0;
	background: #ffffff;
	border-radius: 2px;
	padding: 21px 37px;
	box-shadow: 0px 0px 7px 0px rgba(41, 108, 171, 0.1);
	.seach_top {
		width: 100%;
		height: 60px;
		line-height: 60px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.input-with-select {
			width: 15%;
		}
		.seach_top_right {
			width: 80px;
			text-align: center;
			height: 36px;
			line-height: 36px;
			margin-left: 10px;
		}
	}
	.seach_bottom {
		height: 72px;
		background: rgba(242, 246, 250, 1);
		border-radius: 2px;
		display: flex;
		align-items: center;
		padding-left: 27px;
	}
}
.refresh {
	width: 100%;
	display: flex;
	flex-flow: column;

	.item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 15px;

		textarea {
			width: 700px;
			height: 300px;
			border: 1px solid #dcdfe6;
			resize: none;
		}
	}
}
</style>
