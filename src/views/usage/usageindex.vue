<template>
	<section class="myself-container content" @click="closeSel">
		<div class="top_title">节点流量用量</div>
		<div class="user-title" style="display: flex;flex-flow: column;">
			<div class="resources_con">
				<div
					style="display: flex;justify-content: space-between;align-items: center;flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;"
				>
					<div>
						<el-input
							v-model="value1Activechanid"
							placeholder="请输入渠道ID"
							style="width:160px;margin-right: 10px;margin-top: 20px;"
							@keyup.enter.native="onChanges"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-search"
								@click="onChanges()"
							></i>
						</el-input>
						<el-input
							v-model="valuedomian"
							placeholder="请输入域名"
							style="width:160px;margin-right: 10px;margin-top: 20px;"
							@keyup.enter.native="onChanges"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-search"
								@click="onChanges()"
							></i>
						</el-input>
						<el-input
							v-model="value1"
							placeholder="请输入加速内容名称"
							style="width:160px;margin-right: 10px;margin-top: 20px;"
							@keyup.enter.native="onChanges"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-search"
								@click="onChanges()"
							></i>
						</el-input>
						<!-- <el-select
							v-model="value1acce1"
							placeholder="全部节点渠道"
							style="width: 10%;margin-right: 10px;margin-top: 20px;"
							@change="onChanges"
						>
							<el-option label="全部" value="*"></el-option>
							<el-option
								v-for="(item, index) in hashidSets"
								:key="index"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select> -->
						<!-- <el-button-group>
            <el-button v-show="!shoudzyx" @click="today()" label="one">今天</el-button>
            <el-button v-show="!shoudzyx" @click="yesterday()" label="two">昨天</el-button>
            <el-button v-show="!shoudzyx" @click="sevendat()" label="three">近7天</el-button>
            <el-button v-show="!shoudzyx" @click="thirtyday()" label="four">近30天</el-button>
            <el-button @click="showzdyx">
              自定义
              <i class="el-icon-date"></i>
            </el-button>
          </el-button-group> -->
						<el-radio-group
							v-model="radio"
							@change="select_time()"
							v-show="!showzdy"
						>
							<el-radio-button label="1">今天</el-radio-button>
							<el-radio-button label="2">昨天</el-radio-button>
							<el-radio-button label="3">近7天</el-radio-button>
							<el-radio-button label="4">近30天</el-radio-button>
							<el-radio-button label="5">自定义</el-radio-button>
						</el-radio-group>
						<el-button
							type="primary"
							v-show="showzdy"
							@click="setZdy"
							tyle="margin-top: 20px;"
							>自定义</el-button
						>
						<el-date-picker
							v-show="showzdy"
							style="margin-left:10px;margin-top: 20px;"
							v-model="val2"
							type="daterange"
							range-separator="~"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="left"
							@change="gettimes"
						></el-date-picker>
						<el-button
							style="margin-left:10px;margin-top: 20px;"
							type="primary"
							@click="seachtu(1)"
							>确定</el-button
						>
						<el-button
							style="margin-left:10px;margin-top: 20px;"
							type="primary"
							@click="reset()"
							>重置</el-button
						>
					</div>
					<div
						style="display:flex;white-space:nowrap;margin-top: 20px;"
					>
						<span style="margin-right:5px;">使用缓存</span>
						<el-switch
							v-model="useCache"
							active-color="#297AFF"
						></el-switch>
					</div>
				</div>
				<div class="user_item">
					<div class="item_left" style="width:100%;border:none;">
						<div class="item_text" style="text-align:center;">
							总流量
						</div>
						<div class="item_count" style="text-align:center;">
							<span>{{ totalYl | setbytes }}</span>
						</div>
					</div>
				</div>
				<div class="device_form">
					<div id="myChartMap" :style="{ height: '607px' }"></div>
				</div>
				<div
					class="device_form"
					style="display: flex;justify-content: flex-start;position:relative;overflow:initial;"
				>
					<div
						style="width: 150px;height: 40px;border: 1px solid #C0C4CC;color: #000;text-align:center;line-height:40px;margin-right:30px;border-radius: 2px;"
					>
						用户对比
					</div>
					<!-- <el-select
						v-model="valuess"
						filterable
						placeholder="请选择对比用户"
						multiple
						:collapse-tags="true"
						@change="querychanIds"
					>
						<el-option
							v-for="item in optionssearch"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
          </el-select>-->
					<!-- <el-button
						style="margin-left:10px;"
						type="primary"
						@click="querychanIds()"
						>确定</el-button
					>
          -->
					<div
						v-show="duibi"
						style="width: 234px;position:absolute;top: -340px;left: 211px;z-index: 100;height: 350px;border-radius: 5px;box-shadow: -1px 5px 10px -3px;"
						class="shopw"
						id="shopw"
					>
						<el-table
							ref="multipleTable"
							:data="optionssearch"
							tooltip-effect="dark"
							:header-cell-class-name="cellClass"
							style="width:234px;"
							height="350"
							@selection-change="handleSelectionChange"
						>
							<el-table-column
								type="selection"
								width="30"
							></el-table-column>
							<el-table-column align="right" width="200">
								<template slot="header" slot-scope="scope">
									<el-input
										v-model="search"
										size="mini"
										placeholder="输入用户id"
										@keyup.enter.native="searchid"
									/>
								</template>
								<template slot-scope="scope">{{
									scope.row.label
								}}</template>
							</el-table-column>
						</el-table>
					</div>

					<el-button
						type="primary"
						icon="el-icon-plus"
						id="sellineName"
						@click="showduibi"
						>添加对比</el-button
					>
				</div>

				<div class="devide_table">
					<el-row type="flex" class="row_active">
						<el-col
							:span="24"
							style="text-align:left;font-weight: bold;padding-left: 10px;"
							>资源用量表</el-col
						>
					</el-row>
					<el-row type="flex" class="row_active">
						<el-col :span="24">
							<el-table
								:data="tablecdn"
								border
								style="width: 98%;margin:10px;max-height: 530px; overflow-y: auto;"
								:cell-style="rowClass"
								:header-cell-style="headClass"
							>
								<el-table-column label="总流量">
									<template slot-scope="scope">
										<div>
											{{ scope.row.dataFlow | setbytes }}
										</div>
									</template>
								</el-table-column>
								<el-table-column
									label="时间"
									prop="time"
									:formatter="timeFormatter"
								>
									<!-- <template slot-scope="scope">
                    <div>{{ scope.row.time | settimes }}</div>
                    <div>{{ scope.row.time | settimes }}</div>
                  </template> -->
								</el-table-column>
							</el-table>
							<fenye
								style="float:right;margin:10px 0 0 0;"
								@handleCurrentChange="handleCurrentChange"
								@handleSizeChange="handleSizeChange"
								:pagesa="total_cnt"
								:currentPage="pageNo"
							></fenye>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import {
	dateToMs,
	getymdtime,
	getymdtime1,
	splitTimes,
} from '../../servers/sevdate';
import fenye from '@/components/fenye';
import {
	accelerate_flow_query_conditions,
	accelerate_flow,
	accelerate_flow_table,
	backsource_flow_query_conditions,
	backsource_flow,
	getvideo,
	export_pv_uv_curve_file,
	export_backsource_flow_file,
	export_accelerate_flow_file,
	getterminal,
	cloudUserList,
	manage_dataflow_curve,
	manage_dataflow_table,
	export_manage_dataflow_table_file,
	get_nodetype_enum,
} from '../../servers/api';
import echarts from 'echarts';
import common from '../../comm/js/util';
import _ from 'lodash';

export default {
	data() {
		return {
			radio1: 'one',
			plain: '',
			search: '',
			valuedomian: '',
			value1acce1: '',
			duibi: false,
			hashidSets: [],
			chanIds: [],
			optionssearch1: [],
			optionssearch: [],
			valuess: '',
			value1acce: '*',
			valueacce: '*',
			hashidSet: [],
			value1Activechanid: '',
			value1Activechanid1: '',
			value1Active: '',
			options1Active: [],
			shoudzyx: false,
			showzdyz: false,
			showzdy: false,
			options1: [],
			options1chanid: [],

			options3: [],
			options4: [],
			optionsa1: [],
			optionsa2: [],
			valuea2chanid: '',
			optionsa2chanid: [],
			optionsa3: [],
			optionsa4: [],
			value1: '',
			value2: '*',
			value3: '*',
			value4: '',
			valuea1: '',
			valuea2: '*',
			valuea3: '*',
			valuea4: '',
			tablecdn: [],
			activeName: 'first',
			useCache: true,
			pickerOptions: {
				shortcuts: [
					{
						text: '昨天',
						onClick(picker) {
							const end = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							const start =
								new Date(
									new Date(
										new Date().toLocaleDateString()
									).getTime()
								) -
								3600 * 1000 * 24 * 1;
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '今天',
						onClick(picker) {
							const end = new Date();
							const start = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 6
							);
							picker.$emit('pick', [start, end]);
						},
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date(
								new Date(
									new Date().toLocaleDateString()
								).getTime()
							);
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 29
							);
							picker.$emit('pick', [start, end]);
						},
					},
				],
				disabledDate(time) {
					return time.getTime() > Date.now();
				},
			},
			// value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
			val2: [],

			timeUnit: 120,
			starttime: '',
			endtime: '',
			dataFlowArray: [], //图1
			timeArray: [], //图1
			dataFlowArray2: [], //图2
			timeArray2: [], //图2
			pageSize: 10, //每页数量
			pageNo: 1, //当前页码
			total_cnt: 1, //数据总量
			chanid: '',
			pageActive: 0,
			pageActive1: 0,
			dataFlownum: 0,
			dataFlownum1: 0,
			flowunit: '',
			totalYl: 0,
			radio: 1,
		};
	},
	filters: {
		settimes(data) {
			var stat = getymdtime(data);
			return stat;
		},
		setbytes(data) {
			return common.formatByteActive(data);
		},
	},
	components: {
		fenye,
	},
	mounted() {
		this.querychanId();
		this.getNodeType();

		let monitorUrlname = this.$route.query.monitorUrlname;
		if (monitorUrlname) {
			this.value1 = monitorUrlname;
		} else {
			this.value1 = '';
		}
		let monitorChanId = this.$route.query.monitorChanId;
		if (monitorChanId) {
			this.value1Activechanid = monitorChanId;
		} else {
			this.value1Activechanid = '';
		}

		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;

		this.gettable1();
		this.gettable2();

		// this.configure()
	},
	filters: {
		settimes(data) {
			var stat = getymdtime(data);
			return stat;
		},
		setbytes(data) {
			return common.formatByteActive(data);
		},
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
		this.drawLine();
		this.drawLine1();
	},
	methods: {
		//  统计时间段
		timeFormatter(row, column) {
			if (this.timeUnit == 120) {
				let startTime = row.time * 1000;
				let endTime = (row.time + 2 * 60 * 60 - 1) * 1000;
				return (
					this.common.getTimes(startTime) +
					'-' +
					this.common.getTimes(endTime)
				);
			} else {
				return this.common.getTimess(row.time * 1000);
			}
		},

		closeSel(event) {
			var currentCli = document.getElementById('sellineName');
			var shopw = document.getElementById('shopw');
			if (currentCli || shopw) {
				if (
					!currentCli.contains(event.target) &&
					!shopw.contains(event.target)
				) {
					//点击到了id为sellineName以外的区域，隐藏下拉框
					this.duibi = false;
				}
			}
		},
		showduibi() {
			this.duibi = !this.duibi;
		},
		searchid() {
			this.pageActive1 = 0;
			this.optionssearch = [];
			this.querychanId(this.search);
		},
		handleSelectionChange(val) {
			let arrlist = [];
			if (val.length > 0) {
				val.forEach((item) => {
					arrlist.push(String(item.value));
				});
				this.chanIds = arrlist;
				this.gettable1(arrlist);
				this.gettable2(arrlist);
			} else {
				this.chanIds = [];
				this.gettable1(val);
				this.gettable2(val);
			}
		},
		cellClass(row) {
			if (row.columnIndex === 0) {
				//你需要判断的条件
				return 'disabledCheck';
			}
		},
		//失去焦点事件
		// onblurs(event) {
		//   this.chanIds = event;
		// },
		// querychanIds() {
		//   console.log(this.valuess);
		//   this.gettable1(this.valuess);
		//   this.gettable2(this.valuess);
		// },
		//获取页码
		handleCurrentChange(pages) {
			this.pageNo = pages;
			this.gettable2();
		},

		//获取每页数量
		handleSizeChange(pagetol) {
			this.pageSize = pagetol;
			this.gettable2();
		},
		//图表导出
		exoprtant_Yl() {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			params.useCache = this.useCache == true ? 1 : 0;
			// params.chanId = this.chanid + "";
			if (this.value1) {
				params.urlName = this.value1;
			} else {
				params.urlName = '*';
			}
			if (this.chanIds.length == 0) {
				if (this.value1Activechanid == '') {
					params.channelId = '*';
				} else {
					params.channelId = this.value1Activechanid;
				}
			} else {
				let nowstr = this.chanIds.join(',');
				params.channelId = nowstr;
			}

			//   if (this.value1Activechanid == "" && this.chanIds.length==0) {
			//     params.channelId = "*";
			//     params.channelId.push(this.value1Activechanid);
			//   } else if(this.value1Activechanid1!=="" && this.chanIds.length==0) {
			//     params.channelId = this.value1Activechanid1;
			//   }else if(this.value1Activechanid1!=="" && this.chanIds.length>0){
			// 	  let nowstr=this.chanIds.join("")
			// 	   params.channelId = nowstr

			//   }
			if (this.valuedomian !== '') {
				params.domain = this.valuedomian;
			} else {
				params.domain = '*';
			}
			if (this.value1acce1 != '') {
				params.ipfsChannel = this.value1acce1;
			} else {
				params.ipfsChannel = '*';
			}
			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			(params.pageNo = 0),
				(params.pageSize = 10),
				export_manage_dataflow_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
						}
					})
					.catch((err) => {});
		},

		//输入渠道ID查询
		onChanges() {
			this.pageNo = 1;
			this.gettable1();
			this.gettable2();
		},

		//获取节点渠道
		getNodeType() {
			let param = {};
			get_nodetype_enum(param)
				.then((res) => {
					let data = res.data.firstchan;
					let list = data.map((item) => {
						let obj = {};
						obj.label = item.name;
						obj.value = item.value;
						return obj;
					});
					this.hashidSets = list;
				})
				.catch((err) => {
					console.log(err);
				});
		},

		//查询用户id
		querychanId(data) {
			let param = new Object();
			if (!data || data == '') {
				param.search = '';
			} else {
				param.search = data + '';
			}
			param.status = null;
			param.start_ts = '';
			param.end_ts = '';
			param.order = 'time_create desc';
			param.page = this.pageActive1;
			cloudUserList(param)
				.then((res) => {
					if (res.status == 0) {
						if (data) {
							let obj = {};
							obj.value = res.result.cols[0].id;
							obj.label = res.result.cols[0].id;
							this.optionssearch.push(obj);
						} else {
							let tempArr = [];
							res.result.cols.forEach((item, index) => {
								let obj = {};
								obj.value = item.id;
								obj.label = item.id;
								tempArr.push(obj);
							});

							this.optionssearch = this.optionssearch.concat(
								tempArr
							);
							if (res.result.les_count == 0) {
								return false;
							} else {
								this.pageActive1++;
								this.querychanId();
							}
						}
					} else {
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		// getdataActive() {},
		showzdyzs() {
			this.showzdyz = !this.showzdyz;
		},
		showzdyx() {
			this.shoudzyx = !this.shoudzyx;
		},
		setZdy() {
			this.showzdy = !this.showzdy;
			this.radio = 1;
			this.today();
		},
		select_time() {
			if (this.radio == 1) {
				this.showzdy = false;
				this.today();
			} else if (this.radio == 2) {
				this.showzdy = false;
				this.yesterday();
			} else if (this.radio == 3) {
				this.showzdy = false;
				this.sevendat();
			} else if (this.radio == 4) {
				this.showzdy = false;
				this.thirtyday();
			} else if (this.radio == 5) {
				this.showzdy = true;
			}
		},
		// getdataActive() {},
		// showzdyzs() {
		//   this.showzdyz = !this.showzdyz;
		// },
		// showzdyx() {
		//   this.shoudzyx = !this.shoudzyx;
		// },
		// //获取页码
		// getpage(pages) {
		//   this.pageNo = pages;
		//   this.getbot();
		// },
		// //获取每页数量
		// gettol(pagetol) {
		//   this.pagesize = pagetol;
		//   // this.getuserlist();
		// },
		// getdata() {
		//   this.pageNo = 1;
		//   this.gettable1();
		// },
		// getdata1() {
		//   this.gettable2();
		// },

		/** 请求数据 */

		//用量查询图表
		gettable1(data) {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			params.useCache = this.useCache == true ? 1 : 0;
			// params.chanId = this.chanid + "";
			if (this.value1) {
				params.urlName = this.value1;
			} else {
				params.urlName = '*';
			}
			if (this.chanIds.length > 0) {
				// let temparr1 = [];
				// temparr1 = data;
				// temparr1.push(parseInt(this.value1Activechanid));
				params.channelId = this.chanIds;
			} else {
				if (this.value1Activechanid !== '') {
					params.channelId = [];
					params.channelId.push(this.value1Activechanid);
				} else {
					params.channelId = [];
				}
			}

			if (this.valuedomian !== '') {
				params.domain = this.valuedomian;
			} else {
				params.domain = '*';
			}
			if (this.value1acce1 != '') {
				params.ipfsChannel = this.value1acce1;
			} else {
				params.ipfsChannel = '*';
			}
			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			this.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			(params.pageNo = 0),
				(params.pageSize = 10),
				manage_dataflow_curve(params)
					.then((res) => {
						this.totalYl = res.data.total;
						let nowlengh = res.data.data.length;
						let nowtemp = res.data.data;
						this.curveData = res.data.data;
						let nowarr = [];
						let childlist = [];

						let arrs = [];
						_(res.data.data).forEach((item) => {
							arrs.push(item.dataflowArray);
						});
						if (_.flatten(arrs).length == 0) {
							this.flowunit = 'B';
						} else {
							let max = _.max(_.flatten(arrs));
							this.flowunit = this.common.formatByteActiveunit(
								max
							);
						}

						if (res.data.data[0].dataflowArray.length == 0) {
							let arr = splitTimes(
								this.starttime,
								this.endtime,
								this.timeUnit
							);
							arr.forEach((item, index) => {
								this.timeArray.push(getymdtime1(item));
							});
							let obj = {};
							obj.type = 'bar';
							obj.barGap = '6%';
							obj.barMaxWidth = 30;
							obj.data = _.fill(Array(arr.length), 0);
							this.curveData[0].dataflowArray = _.fill(
								Array(arr.length),
								0
							);
							nowarr.push(obj);
						} else {
							for (var i = 0; i < nowlengh; i++) {
								childlist.push(res.data.data[i].channelid);
								let obj = {};
								obj.type = 'bar';
								obj.barGap = '6%';
								(obj.barMaxWidth = 30),
									(obj.name = res.data.data[i].channelid);
								let nowarr1 = [];
								nowtemp[i].dataflowArray.forEach(
									(item, index) => {
										nowarr1.push(
											this.common.formatByteNum(
												item,
												this.flowunit
											)
										);
									}
								);
								obj.data = nowarr1;
								nowarr.push(obj);
							}

							res.data.data[0].timeArray.forEach(
								(item, index) => {
									this.timeArray.push(getymdtime1(item));
								}
							);
						}

						this.drawLine(nowarr, this.timeArray, childlist);
					})
					.catch((err) => {
						console.log(err);
					});
		},

		//用量查询列表
		gettable2(data) {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			let nowtime = parseInt(new Date().getTime() / 1000);
			params.startTs = this.starttime;
			params.endTs = this.endtime < nowtime ? this.endtime : nowtime;
			params.pageNo = this.pageNo - 1;
			params.pageSize = 10;
			// params.chanId = this.chanid + "";
			if (this.value1) {
				params.urlName = this.value1;
			} else {
				params.urlName = '*';
			}

			if (this.chanIds.length > 0) {
				params.channelId = this.chanIds;
			} else {
				if (this.value1Activechanid !== '') {
					params.channelId = [];
					params.channelId.push(this.value1Activechanid);
				} else {
					params.channelId = [];
				}
			}
			if (this.valuedomian !== '') {
				params.domain = this.valuedomian;
			} else {
				params.domain = '*';
			}
			if (this.value1acce1 != '') {
				params.ipfsChannel = this.value1acce1;
			} else {
				params.ipfsChannel = '*';
			}
			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			this.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			manage_dataflow_table(params)
				.then((res) => {
					if (res.status == 0) {
						this.tablecdn = res.data.list;
						this.total_cnt = res.data.totalCnt;
					}
				})
				.catch((err) => {});
		},

		seachtu(data) {
			if (this.endtime - this.starttime > 7776000) {
				this.$message({
					message: '起始时间和结束时间最大跨度不能超过三个月',
					type: 'error',
				});
				return false;
			}
			this.pageNo = 1;
			this.gettable1();
			this.gettable2();
		},
		reset() {
			this.value1Activechanid = '';
			this.valuedomian = '';
			this.value1 = '';
			this.value1acce1 = '';
			this.radio = 1;
			this.pageNo = 1;
			this.select_time();
		},
		//今天
		today(data) {
			this.plain = 'plain';
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times;
			this.endtime = Date.parse(new Date()) / 1000;
			this.timeUnit = 60;
			this.pageNo = 1;
			this.gettable1();
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
		},
		//昨天
		yesterday(data) {
			this.plain = 'plain';
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times - 24 * 60 * 60 * 1;
			this.endtime = times - 1;
			this.timeUnit = 60;
			this.pageNo = 1;
			this.gettable1();
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
		},
		//七天
		sevendat(data) {
			this.plain = 'plain';
			let times = parseInt(
				new Date(new Date().toLocaleDateString()).getTime() / 1000
			);
			this.starttime = times - 24 * 60 * 60 * 6;
			this.endtime = parseInt(new Date(new Date()).getTime() / 1000);
			this.timeUnit = 60 * 24;
			this.pageNo = 1;
			this.gettable1();
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
		},
		//三十天
		thirtyday(data) {
			this.plain = 'plain';
			let times = parseInt(
				new Date(new Date().toLocaleDateString()).getTime() / 1000
			);
			this.endtime = parseInt(new Date(new Date()).getTime() / 1000);
			this.starttime = times - 24 * 60 * 60 * 29;
			this.timeUnit = 60 * 24;
			this.pageNo = 1;
			this.gettable1();
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
		},
		//自定义时间
		gettimes(cal) {
			this.starttime = this.val2
				? dateToMs(this.val2[0])
				: new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.endtime = this.val2
				? dateToMs(this.val2[1]) + (24 * 60 * 60 - 1)
				: Date.parse(new Date()) / 1000;
			// this.starttime = dateToMs(this.val2[0]);
			// this.endtime = dateToMs(this.val2[1]);
			if (this.endtime - this.starttime < 86400) {
				this.timeUnit = 60;
			} else if (this.endtime - this.starttime >= 86400) {
				this.timeUnit = 60 * 24;
			}
			this.$refs.multipleTable.clearSelection();
			this.pageNo = 1;
			this.gettable1();
			this.gettable2();
		},

		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		drawLine(x, y, idlist) {
			let _this = this;
			let myChart = echarts.init(document.getElementById('myChartMap')); //这里是为了获得容器所在位置
			myChart.off('click');
			window.onresize = myChart.resize;
			let list = idlist.map((v) => {
				return v + '';
			});
			var posList = [
				'left',
				'right',
				'top',
				'bottom',
				'inside',
				'insideTop',
				'insideLeft',
				'insideRight',
				'insideBottom',
				'insideTopLeft',
				'insideTopRight',
				'insideBottomLeft',
				'insideBottomRight',
			];

			app.configParameters = {
				rotate: {
					min: -90,
					max: 90,
				},
				align: {
					options: {
						left: 'left',
						center: 'center',
						right: 'right',
					},
				},
				verticalAlign: {
					options: {
						top: 'top',
						middle: 'middle',
						bottom: 'bottom',
					},
				},
				position: {
					options: echarts.util.reduce(
						posList,
						function(map, pos) {
							map[pos] = pos;
							return map;
						},
						{}
					),
				},
				distance: {
					min: 0,
					max: 100,
				},
			};

			app.config = {
				rotate: 90,
				align: 'left',
				verticalAlign: 'middle',
				position: 'insideBottom',
				distance: 15,
				onChange: function() {
					var labelOption = {
						normal: {
							rotate: app.config.rotate,
							align: app.config.align,
							verticalAlign: app.config.verticalAlign,
							position: app.config.position,
							distance: app.config.distance,
						},
					};
					myChart.setOption({
						series: [
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
						],
					});
				},
			};

			var labelOption = {
				show: true,
				position: app.config.position,
				distance: app.config.distance,
				align: app.config.align,
				verticalAlign: app.config.verticalAlign,
				rotate: app.config.rotate,
				formatter: '{c}  {name|{a}}',
				fontSize: 16,
				rich: {
					name: {
						textBorderColor: '#fff',
					},
				},
			};
			let options = {
				color: [
					'#42a6f5',
					'#ffa726',
					'#f65f54',
					'#67bb6a',
					'#42a6f5',
					'#5eb2f6',
				],
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						let str = params[0].name;
						for (var i = 0; i < params.length; i++) {
							if (params[i].seriesName.includes('series')) {
								str +=
									'<br>' +
									common.formatByteActive(
										Number(
											_this.curveData[0].dataflowArray[
												params[i].dataIndex
											]
										)
									); // + _this.flowunit;
							} else {
								// console.log(_this.curveData[i].dataflowArray[i])
								str +=
									'<br>' +
									params[i].seriesName +
									': ' +
									common.formatByteActive(
										Number(
											_this.curveData[0].dataflowArray[
												params[i].dataIndex
											]
										)
									);
							}
						}
						return str;
						// return (
						//   params[0].name +
						//   "<br>" +
						//   params[0].seriesName +
						//   ":" +
						//   params[0].data +
						//   _this.flowunit
						// );
					},
					axisPointer: {
						type: 'shadow',
					},
				},
				toolbox: {
					show: true,

					feature: {
						mydow: {
							show: true,
							title: '导出',
							icon:
								'path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z',
							onclick: function() {
								_this.exoprtant_Yl();
							},
						},
					},
				},
				legend: {
					data: list,
					bottom: 50,
				},
				grid: {
					left: '3%', // 默认10%，给24就挺合适的。
					top: 60, // 默认60
					right: 35, // 默认10%
					bottom: 150, // 默认60
				},
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: y,
					},
				],
				yAxis: [
					{
						name: _this.flowunit,
						type: 'value',
					},
				],
				dataZoom: [
					{
						type: 'slider',
						xAxisIndex: 0,
						start: 0,
						end: 50,
						throttle: 10,
						zoomLock: false,
						show: false,
					},
					{
						type: 'inside',
						realtime: true,
						start: 0,
						end: 50,
					},
				],
				series: x,
			};
			myChart.clear();
			myChart.setOption(options);
			myChart.on('click', function(params) {
				// myChart.off('click');
				// 如果不加off事件，就会叠加触发
				let happynewyear = new Date().getFullYear();
				let shold_time = params.name.split(' ')[0];
				let happynewmonth = Number(shold_time.split('-')[0]) - 1;
				let happynewday = Number(shold_time.split('-')[1]);
				_this.showzdy = true;
				_this.val2 = [
					new Date(happynewyear, happynewmonth, happynewday, 0, 0),
					new Date(happynewyear, happynewmonth, happynewday, 0, 0),
				];
				_this.gettimes(0);
			});
		},
	},
};
</script>

<style lang="scss">
.el-table /deep/.disabledCheck .cell .el-checkbox__inner {
	display: none !important;
}
.el-table /deep/.disabledCheck .cell:before {
	content: '';
	position: absolute;
	right: 11px;
}
.myself-container {
	width: 100%;
	min-width: 1250px;

	.device_form {
		width: auto;
		height: auto;
		margin-top: 20px;
		background: #ffffff;
		padding: 15px 30px;
		box-sizing: border-box;
		box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
		border-radius: 2px;

		.bottom {
			margin-top: 20px;
		}

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
		.user_item {
			width: auto;
			height: 130px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
			border-radius: 2px;
			margin-top: 20px;

			display: flex;
			justify-content: flex-start;
			align-items: center;
			text-align: left;
			padding: 36px 71px;

			.item_left {
				width: 49%;
				height: 58px;
				border-right: 1px solid #e6e9ed;

				.item_text {
					font-size: 14px;
					color: #333333;
				}

				.item_count {
					line-height: 55px;

					span {
						font-size: 34px;
					}
				}
			}

			.item_right {
				height: 48px;
				width: 49%;
				padding-left: 40px;

				.item_text {
					font-size: 14px;
					color: #333333;
				}

				.item_count {
					line-height: 55px;

					span {
						font-size: 34px;
					}
				}
			}
		}
	}

	.devide_table {
		padding: 35px;
		height: auto;
		margin-top: 20px;
		background: #ffffff;
		border-radius: 2px;
		box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
		border-radius: 2px;

		.el-table td,
		.el-table th {
			padding: 6px 0px;
		}
	}

	.devide_pageNation {
		width: 100%;
		height: auto;
		// overflow: hidden;
		margin-top: 20px;

		.devide_pageNation_active {
			float: right;
		}
	}
}

.addaccout {
	.el-form--label-left .el-form-item__label {
		text-align: right;
		width: 90px;
	}

	.el-form-item__error {
		margin-left: 80px;
	}
}
.user_item {
	width: auto;
	height: 130px;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
	border-radius: 2px;
	margin-top: 20px;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: left;
	padding: 36px 71px;

	.item_left {
		width: 49%;
		height: 58px;
		border-right: 1px solid #e6e9ed;

		.item_text {
			font-size: 14px;
			color: #333333;
		}

		.item_count {
			line-height: 55px;

			span {
				font-size: 34px;
			}
		}
	}

	.item_right {
		height: 48px;
		width: 49%;
		padding-left: 40px;

		.item_text {
			font-size: 14px;
			color: #333333;
		}

		.item_count {
			line-height: 55px;

			span {
				font-size: 34px;
			}
		}
	}
}
</style>
