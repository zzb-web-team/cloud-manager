<template>
	<div class="content">
		<section class="myself-container">
			<div class="device_form">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item
						>用户管理</el-breadcrumb-item
					>
				</el-breadcrumb>
				<el-form ref="form" :model="form">
					<el-row type="flex">
						<!-- <div class="search-con">
                        <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
                        <el-input class="search-input" v-model="searchText" maxlength="70" placeholder="用户ID,账号,手机号" @keyup.enter.native="searchInfo"></el-input>
                    </div> -->
						<el-input
							placeholder="用户ID,账号,手机号"
							style="width:200px;margin-right: 10px;"
							v-model="searchText"
							class="input-with-select"
							@keyup.enter.native="searchInfo"
							maxlength="70"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-search"
							></i>
						</el-input>
						<!-- <div @click="getShow()" class="div_show" style="color:#606266">
              筛选
              <i class="el-icon-caret-bottom" :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"></i>
            </div>
          </el-row>
          <el-row type="flex" class="row_activess" v-show="showState"> -->
						<!-- <el-form-item label="状态" style="display: flex;"> -->
						<el-select
							v-model="value"
							placeholder="请选择状态"
							@change="onChangeTab"
							style="width:200px;margin-right: 10px;"
						>
							<el-option
								v-for="item in options2"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
						<!-- </el-form-item> -->
						<!-- <el-form-item label="注册时间" style="display: flex;"> -->
						<el-date-picker
							style="margin-right:10px;"
							v-model="valueTime"
							type="datetimerange"
							:picker-options="pickerOptions"
							range-separator="~"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="left"
						></el-date-picker>
						<!-- </el-form-item> -->
						<!-- <el-form-item>
              <el-button type="primary" @click="searchInfo">确定</el-button>
            </el-form-item>
            <el-form-item> -->
						<el-button type="primary" @click="searchInfo"
							>确定</el-button
						>
						<el-button type="primary" @click="reset()"
							>重置</el-button
						>
						<!-- </el-form-item> -->
					</el-row>
				</el-form>
			</div>
			<div class="devide_table" :style="{ height: clientHeight - 270 + 'px' }">
				<div style="    display: flex;justify-content: flex-end;">
					<el-button type="primary" @click="toexportExcel"
						>导出</el-button
					>
				</div>
				<el-row type="flex" class="row_active">
					<el-col :span="24">
						<tableBarActive1
							id="rebateSetTable"
							ref="table1"
							tooltip-effect="dark"
							@tableSortChange="tableSortChange"
							:tableData="tableData"
							:operatingStatus="operatingStatus"
							@handleSelectionChange="handleSelectionChange"
							:clomnSelection="clomnSelection"
							:rowHeader="rowHeader"
							:tableOption="tableOption"
							@disable="disable"
							@toChange="toChange"
						></tableBarActive1>
					</el-col>
				</el-row>
				<div
					class="devide_pageNation"
					style="display: flex;justify-content: space-between;"
				>
					<el-row type="flex">
						<el-col
							:span="6"
							style="display: flex;justify-content: justify-content: flex-start;"
						>
							<el-button type="text" size="small" @click="allOn"
								>启用</el-button
							>
							<el-button
								type="text"
								size="small"
								style="margin-left:30px;"
								@click="allOff"
								>冻结</el-button
							>
						</el-col>
					</el-row>
					<el-row type="flex">
						<el-col :span="6">
							<pageNation
								:pager="pager"
								@handleSizeChange="handleSizeChange"
								@handleCurrentChange="handleCurrentChange"
							></pageNation>
						</el-col>
					</el-row>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import tableBarActive1 from '../../comm/tableBarActive1';

import pageNation from '../../comm/pageNation';
import {
	userlist,
	userinsert,
	userupdate,
	userdelete,
	userctrl,
	cloudUserList,
	denyuser,
	setactionlog,
} from '../../servers/api';
import common from '../../comm/js/util.js';
import VueCookies from 'vue-cookies';
import base from "../../components/base"
import { Stats } from 'fs';
export default {
    mixins:[base],
	data() {
		return {
			form: {},
			dialogVisible: false,
			rotate: false,
			dialogVisible2: false,
			dialogVisible3: false,
			operatingStatus: true,
			searchText: '',
			placeholder: '请输入账号',
			operatingStatus: true,
			clomnSelection: true,
			reserveselection: true,
			value1: '',
			value2: '',
			value: '',
			options2: [
				{
					value: '-1',
					label: '全部',
				},
				{
					value: '0',
					label: '正常',
				},
				{
					value: '1',
					label: '冻结',
				},
			],
			ruleForm2: {
				username: '',
				nickname: '',
				password: '',
				password2: '',
				value: '',
				radio: '0',
				name: '',
				phone: '',
			},
			ruleForm3: {
				username: '',
				nickname: '',
				password: '',
				password2: '',
				value: '',
				radio: '0',
				name: '',
				phone: '',
				id: '',
			},
			ruleForm4: {
				password: '',
				password2: '',
			},
			//重置密码校验

			rowHeader: [
				{
					prop: 'id',
					label: '用户ID',
				},

				{
					prop: 'username',
					label: '账号',
				},
				{
					prop: 'phone',
					label: '手机号',
				},
				{
					prop: 'email',
					label: '邮箱',
				},
				{
					prop: 'dataFlow',
					label: '累计消费流量',
				},

				{
					prop: 'time_create',
					label: '注册时间',
					sortable: 'custom',
				},
				{
					prop: 'status',
					label: '状态',
				},
			],
			tableData: [],
			tableOption: {
				label: '操作',
				width: '400px',
				options: [
					{
						label: '修改',
						type: 'primary',
						methods: 'checkInfo',
					},

					{
						label: '密码重置',
						type: 'danger',
						methods: 'password',
					},
					{
						label: '禁用',
						type: 'danger',
						methods: 'disable',
					},
					{
						label: '删除',
						type: 'danger',
						methods: 'delete',
					},
				],
			},
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			showState: false,
			allId: [],
			pageActive: 0,
			tableData2: [],
			valueTime: '',
			order: 'time_create desc',
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
				},
			},
			statusActive: 0,
			statusActive1: 0,
		};
	},
	mounted: function() {
		this.queryUserList();
	},
	methods: {
		//状态筛选
		onChangeTab() {
			this.pager.page = 1;
			this.queryUserList();
		},

		//排序
		tableSortChange(column) {
			this.pager.page = 1;
			if (column.order == 'descending') {
				this.order = 'time_create desc';
			} else {
				this.order = 'time_create asc';
			}
			this.queryUserList();
		},
		//导出的方法
		exportExcel() {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel');
				const tHeader = [
					'状态',
					'账号',
					'手机号',
					'邮箱',
					'累计消费流量',
					'注册时间',
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'status',
					'username',
					'phone',
					'email',
					'dataFlow',
					'time_create',
				];

				// 上面的index、nickName、name是tableData里对象的属性
				const list = this.tableData2; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '注册用户信息表');
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
		},
		//重置
		reset() {
			this.value = '';
			this.searchText = '';
			this.valueTime = '';
			this.pager.page = 1;
			this.queryUserList();
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.allId = [];
			for (var i = 0; i < val.length; i++) {
				this.allId.push(val[i].id);
			}
		},
		//批量启用
		allOn() {
			for (var i = 0; i < this.multipleSelection.length; i++) {
				if (this.multipleSelection[i].status == '正常') {
					this.statusActive++;
				}
			}
			if (this.allId.length <= 0) {
				this.$message({
					message: '请至少勾选一项',
					type: 'error',
				});
				return false;
			}

			if (this.statusActive == this.multipleSelection.length) {
				this.queryUserList();
				this.statusActive = 0;
				return false;
			}
			this.$confirm('确定要批量启用吗?', '提示', {
				type: 'warning',
			})
				.then(() => {
					let param = new Object();
					param.id = this.allId;
					param.status = 0;
					denyuser(param)
						.then((res) => {
							if (res.status == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
								});
								this.queryUserList();
								this.common.monitoringLogs(
									'修改 ',
									'批量启用用户',
									1
								);
							} else {
								this.common.monitoringLogs(
									'修改 ',
									'批量启用用户',
									0
								);
							}
						})
						.catch((error) => {});
				})
				.catch(() => {});
		},
		//批量禁用
		allOff() {
			for (var i = 0; i < this.multipleSelection.length; i++) {
				if (this.multipleSelection[i].status == '冻结') {
					this.statusActive1++;
				}
			}

			if (this.allId.length <= 0) {
				this.$message({
					message: '请至少勾选一项',
					type: 'error',
				});
				return false;
			}
			if (this.statusActive1 == this.multipleSelection.length) {
				this.queryUserList();
				this.statusActive1 = 0;
				return false;
			}
			this.$confirm('确定要批量禁用用吗?', '提示', {
				type: 'warning',
			})
				.then(() => {
					let param = new Object();
					param.id = this.allId;
					param.status = 1;
					denyuser(param)
						.then((res) => {
							if (res.status == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
								});
								this.queryUserList();
								this.common.monitoringLogs(
									'修改 ',
									'批量禁用用户',
									1
								);
							} else {
								this.common.monitoringLogs(
									'修改 ',
									'批量禁用用户',
									0
								);
							}
						})
						.catch((error) => {});
				})
				.catch(() => {});
		},

		queryUserList() {
			let startTime = 0;
			let endTime = 0;
			if (this.valueTime) {
				if (this.valueTime == '') {
					startTime = '';
					endTime = '';
				} else {
					endTime = Math.floor(this.valueTime[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime[0].getTime() / 1000);
				}
			} else {
				startTime = '';
				endTime = '';
			}
			let param = new Object();
			param.page = this.pager.page - 1;
			param.search = this.searchText;
			if (this.value == '-1') {
				param.status = null;
			} else {
				param.status = parseInt(this.value);
			}

			param.start_ts = startTime;
			param.end_ts = endTime;
			param.order = this.order;
			cloudUserList(param)
				.then((res) => {
					if (res.status != 0) {
						this.$message({
							message: `${res.err_msg}`,
							type: 'error',
						});
					} else {
						if (res.result.page == 0) {
							this.pager.count =
								res.result.cols.length * (res.result.page + 1) +
								res.result.les_count;
						} else {
							this.pager.count =
								res.result.cols.length +
								10 * res.result.page +
								res.result.les_count;
						}
						let nowArr = res.result.cols;
						for (var i = 0; i < nowArr.length; i++) {
							nowArr[i].time_create = this.common.getTimes(
								parseInt(nowArr[i].time_create * 1000)
							);
							nowArr[i].time_update = this.common.getTimes(
								parseInt(nowArr[i].time_update * 1000)
							);
							if (nowArr[i].status == 0) {
								nowArr[i].status = '正常';
							} else {
								nowArr[i].status = '冻结';
							}

							if (
								nowArr[i].dataFlow == 0 ||
								nowArr[i].dataFlow == undefined
							) {
								nowArr[i].dataFlow = 0 + 'GB';
							} else {
								nowArr[
									i
								].dataFlow = this.common.formatByteActive(
									nowArr[i].dataFlow
								);
							}
						}
						this.tableData = nowArr;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		toexportExcel() {
			let param = new Object();
			param.page = this.pageActive;
			param.search = this.searchText;
			param.status = parseInt(this.value);
			cloudUserList(param)
				.then((res) => {
					if (res.status === 0) {
						this.pageActive = res.result.page;

						let nowArr = res.result.cols;
						for (var i = 0; i < nowArr.length; i++) {
							nowArr[i].time_create = this.common.getTimes(
								parseInt(nowArr[i].time_create * 1000)
							);
							nowArr[i].time_update = this.common.getTimes(
								parseInt(nowArr[i].time_update * 1000)
							);
							if (nowArr[i].status == 0) {
								nowArr[i].status = '正常';
							} else {
								nowArr[i].status = '冻结';
							}
						}
						this.tableData2 = this.tableData2.concat(nowArr);
						if (res.result.les_count == 0) {
							this.exportExcel();
							this.common.monitoringLogs(
								'导出 ',
								'导出用户表',
								1
							);
						} else {
							this.pageActive++;
							this.toexportExcel();
						}
					} else {
						this.common.monitoringLogs('导出 ', '导出用户表', 0);
					}
				})
				.catch((error) => {});
		},
		//搜索
		searchInfo() {
			this.queryUserList();
		},
		getShow() {
			this.showState = !this.showState;
			this.rotate = !this.rotate;
		},
		//单页显示数据数量
		handleSizeChange() {},
		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.queryUserList();
		},
		//新增
		handleSubmit(ev) {
			//return false
			var _this = this;
			this.$refs.ruleForm2.validate((valid) => {
				if (valid) {
					var loginParams = {
						username: this.ruleForm2.username,
						nickname: 'aa',
						password: this.ruleForm2.password,
						password2: this.ruleForm2.password2,
						role_id: 0,
						phone: this.ruleForm2.phone,
						status: parseInt(this.ruleForm2.radio),
						name: this.ruleForm2.name,
						uid: VueCookies.get('adminid'),
						uname: VueCookies.get('adminuser'),
					};
					userinsert(loginParams).then((data) => {
						this.dialogVisible = false;
						let { msg, status, user } = data;
						if (status !== 0) {
							this.$message({
								message: msg,
								type: 'error',
							});
							this.common.monitoringLogs('新增 ', '新增用户', 0);
						} else {
							this.$message({
								message: '添加成功',
								type: 'success',
							});
							this.common.monitoringLogs('新增', '新增用户', 1);

							this.queryUserList();
						}
					});
				} else {
					return false;
				}
			});
		},
		//取消新增
		notall() {
			this.dialogVisible = false;
			this.ruleForm2.username = '';
			this.ruleForm2.password = '';
			this.ruleForm2.password2 = '';
			this.ruleForm2.phone = '';
			this.ruleForm2.name = '';
		},
		//禁用
		disable(val) {
			let nowstatus = 0;
			let tampArr = [];
			tampArr[0] = val.id;
			if (val.status == '正常') {
				nowstatus = 1;
			} else {
				nowstatus = 0;
			}
			let param = {
				id: tampArr,
				status: nowstatus,
			};
			this.$confirm('确定执行该操作麽吗', '提示', {
				type: 'warning',
			})

				.then(() => {
					denyuser(param)
						.then((res) => {
							//return false
							if (res.status !== 0) {
								this.$message({
									message: msg,
									type: 'error',
								});
								if (param.status == 1) {
									this.common.monitoringLogs(
										'修改',
										'启用用户',
										0
									);
								} else {
									this.common.monitoringLogs(
										'修改',
										'禁用用户',
										0
									);
								}
							} else {
								this.$message({
									message: '操作成功',
									type: 'success',
								});
								if (param.status == 0) {
									this.common.monitoringLogs(
										'修改',
										'启用用户',
										1
									);
								} else {
									this.common.monitoringLogs(
										'修改',
										'禁用用户',
										1
									);
								}

								this.queryUserList();
							}
						})
						.catch(() => {
							this.$message({
								message: '操作失败',
								type: 'error',
							});
							if (param.status == 1) {
								this.common.monitoringLogs(
									'修改',
									'启用用户',
									0
								);
							} else {
								this.common.monitoringLogs(
									'修改',
									'禁用用户',
									0
								);
							}
						});
				})
				.catch(() => {
					this.$message({
						message: '操作失败',
						type: 'error',
					});
					if (param.status == 1) {
						this.common.monitoringLogs('修改', '禁用用户', 0);
					} else {
						this.common.monitoringLogs('修改', '启用用户', 0);
					}
				});
		},
		//修改
		toChange(val) {
			this.$router.push({
				path: '/useInfo',
				query: {
					id: val.id,
					time_create: val.time_create,
					phone: val.phone,
					username: val.username,
					email: val.email,
					dataFlow: val.dataFlow,
				},
			});

			//this.ruleForm3.status = parseInt(this.ruleForm3.radio)
		},

		addAccout() {
			this.dialogVisible = true;
		},
	},
	components: {
		pageNation: pageNation,
		tableBarActive1: tableBarActive1,
	},
};
</script>

<style lang="less">
.search-con {
	width: 250px;
	height: 40px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #999999;

	// i {
	// }

	.search-input {
		.el-input__inner {
			border: none;
			background: none;
		}
	}
}

.myself-container {
	// width: 100%;
	// //min-width: 1600px;
	text-align: left;

	.devide_title {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 10px;
		background: #f2f2f2;
		padding: 15px 0px;
		box-sizing: border-box;

		.el-col {
			padding: 0px 20px;
		}
	}

	.device_form {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		background: #ffffff;
		padding: 25px 30px;
		box-sizing: border-box;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);

		.el-form-item__label {
			white-space: nowrap;
		}

		.el-form-item {
			margin-bottom: 0px;
			margin-left: 10px;
		}

		.row_activess {
			margin-top: 20px;
			display: flex;
			justify-content: flex-start;
		}

		.div_show {
			width: auto;
			display: flex;
			height: 40px;
			justify-content: center;
			align-items: center;
			color: #409eff;
			cursor: pointer;
			margin-left: 20px;
		}
	}

	.devide_table {
		padding: 35px;
		height: auto;
		margin: 15px 0;
		background: #fff;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		border-radius: 2px;
        overflow-y: scroll;
        padding-bottom: 25px;
		.el-table td,
		.el-table th {
			padding: 6px 0px;
		}

		.row_active {
			margin-top: 10px;
		}
	}

	.devide_pageNation {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;

		.devide_pageNation_active {
			float: right;
		}
	}
}

.addaccout {
	.title {
		width: 100%;
		text-align: center;
	}

	.el-dialog__body {
		padding: 0px;
	}

	.el-form-item {
		display: flex;
	}

	.el-form--label-left .el-form-item__label {
		text-align: right;
		width: 90px;
	}

	.el-form-item__error {
		margin-left: 80px;
	}
}

//旋转
.aa {
	transition: all 1s;
}

.go {
	transform: rotate(-180deg);
	transition: all 1s;
}
</style>
