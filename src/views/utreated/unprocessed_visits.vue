<template>
	<div class="content">
		<div class="content_top">
			<div class="content_top_left">
				<p class="more" @click="go_trafficMonitor">more <i class="el-icon-arrow-right"></i></p>
				<div class="content_top_left_con_top">
					<div class="content_top_left_con_img">
						<img src="../../assets/img/un_img.png" alt="" />
						<div>
							<p>
								124.79 <span>TB</span
								><img src="../../assets/img/fall.png" alt="" />
							</p>
							<p>今日节点总流量</p>
						</div>
					</div>
					<div class="content_top_left_con_top_vertical">
						<div>
							<p>88.64 <span>TB</span></p>
							<p>P2P播放流量</p>
						</div>
						<div>
							<p>5.12 <span>TB</span></p>
							<p>CDN回源流量</p>
						</div>
					</div>
				</div>
				<div class="content_top_left_con_bottom">
					<div>
						<p>88.64 <span>TB</span></p>
						<p>P2P播放流量</p>
					</div>
					<div>
						<p>5.12 <span>TB</span></p>
						<p>CDN回源流量</p>
					</div>
					<div>
						<p>31.02 <span>TB</span></p>
						<p>下行节点扩散流量</p>
					</div>
				</div>
			</div>
			<div class="content_top_right">
				<div class="content_top_right_text">
					<div>
						<p class="all_f">
							987,284,324 <img src="../../assets/img/fall.png" alt="" /></i>
						</p>
						<p>今日访问总次数(PV)</p>
						<p>951,753,147</p>
						<p>昨日访问总次数(PV)</p>
					</div>
					<div>
						<p class="all_f">
							987,284,324 <img src="../../assets/img/xiajiang.png" alt="" /></i>
						</p>
						<p>今日独立IP访问数(UV)</p>
						<p>875,684,351</p>
						<p>昨日独立IP访问数(UV)</p>
					</div>
				</div>
				<div ref="pupvEcharts_con" class="content_top_right_echarts">
					<p class="more" @click="go_pupv">more <i class="el-icon-arrow-right"></i></p>
					<div id="pupv_echarts" :style="{ height: pvpu_e_h }"></div>
				</div>
			</div>
		</div>
		<div class="content_bottom" ref="scrollerHeight">
			<div class="content_bottom_left">
				<div class="content_bottom_left_text">
					<div>
						<img src="../../assets/img/bgc_left_one.png" alt="" />
					</div>
					<div>
						<p class="content_bottom_left_title">
							214,214,232 <img src="../../assets/img/fall.png" alt="" /></i>
						</p>
						<p>今日未处理访问总次数</p>
					</div>
					<div>
						<p>210,214,210</p>
						<p>昨日未处理访问总次数</p>
					</div>
				</div>
				<div class="content_bottom_left_echarts">
					<p class="more" @click="go_playTraffic">more <i class="el-icon-arrow-right"></i></p>
					<div id="p2p_echarts"></div>
				</div>
			</div>
			<div class="content_bottom_right">
				<p class="more" @click="go_unprocessedTab">
					more <i class="el-icon-arrow-right"></i>
				</p>
				<p class="table_text">未处理播放请求</p>
				<div>
					<el-table
						:data="tableData"
						style="width: 100%;height:100%;"
						stripe
						:cell-style="rowClass"
						:header-cell-style="headClass"
					>
						<el-table-column
                            type="index"
                            width="50"
                            label="序号"></el-table-column>
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1 } from '../../servers/sevdate';
import fenye from '@/components/fenye';
import { pv_uv_curve } from '../../servers/api';
import echarts from 'echarts';
import common from '../../comm/js/util';
export default {
	data() {
		return {
			clientHeight: '',
			pvpu_e_h: '',
			chanid: '',
			useCache: true,
			starttime: '',
			endtime: '',
			timeUnit: 60,
			value1fileName: '',
			valueDomain: '',
			value1Activechanid: '',
			valueacce: '',
			uvArray: [], //图一y1
			pvArray: [], //图一y2
			timeArray: [], //图一x
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
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
	mounted() {
		let that = this;
		this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
		window.onresize = function() {
			that.clientHeight = `${document.documentElement.clientHeight}`;
			if (that.$refs.scrollerHeight) {
				that.$refs.scrollerHeight.style.height =
					clientHeight - 575 + 'px';
				this.$refs.scrollerHeight.style.minHeight = 500 + 'px';
			}
		};
		this.pvpu_e_h = `${this.$refs.pupvEcharts_con.clientHeight - 60}px`;
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		this.get_pupv();
	},
	methods: {
		get_pupv() {
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			params.chanId = this.chanid + '';
			params.timeUnit = this.timeUnit;
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			if (this.value1fileName) {
				params.fileName = this.value1fileName;
			} else {
				params.fileName = '*';
			}
			params.region = '*';
			params.isp = '*';
			if (this.valueDomain) {
				params.domain = this.valueDomain;
			} else {
				params.domain = '*';
			}
			if (this.value1Activechanid !== '') {
				params.chanId = this.value1Activechanid;
			} else {
				params.chanId = '*';
			}
			if (this.valueacce !== '') {
				params.terminalName = parseInt(this.valueacce);
			} else {
				params.terminalName = -1;
			}

			this.uvArray = [];
			this.pvArray = [];
			this.timeArray = [];

			params.timeUnit = this.common.timeUnitActive2(
				this.starttime,
				this.endtime
			);
			pv_uv_curve(params)
				.then((res) => {
					this.totalPV = res.data.totalPV;
					this.totalUV = res.data.totalUV;
					if (
						res.data.uvArray.length == 0 &&
						res.data.pvArray.length == 0
					) {
						let arr = splitTimes(this.starttime, this.endtime, 60);
						arr.forEach((item, index) => {
							this.timeArray.push(getymdtime(item));
						});
						this.uvArray = _.fill(Array(arr.length), 0);
						this.pvArray = _.fill(Array(arr.length), 0);
					} else {
						if (res.data.uvArray) {
							res.data.uvArray.forEach((item, index) => {
								this.uvArray.push(Math.floor(item));
							});
						}
						if (res.data.pvArray) {
							res.data.pvArray.forEach((item, index) => {
								this.pvArray.push(Math.floor(item));
							});
						}
						res.data.timeArray.forEach((item, index) => {
							this.timeArray.push(getymdtime(item));
						});
					}
					this.drawLine();
				})
				.catch((err) => {});
		},
		drawLine() {
			let _this = this;
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(
				document.getElementById('pupv_echarts')
			);
			window.onresize = myChart.resize;
			// 绘制图表
			let options = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				legend: {
					left: 'center',
					data: ['pv', 'uv'],
				},
				color: ['#A7D5FF', '#BEA7FF'],
				xAxis: {
					type: 'category',
					name: '日期',
					splitLine: {
						show: false,
					},
					data: this.timeArray,
				},
				grid: {
					left: '3%',
					right: '6%',
					bottom: '3%',
					containLabel: true,
				},
				yAxis: {
					type: 'value',
					name: 'pv/uv',
					min: 0,
				},
				series: [
					{
						name: 'pv',
						type: 'line',
						smooth: true,
						lineStyle: {
							color: '#A7D5FF',
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: '#A7D5FF',
										},
										{
											offset: 0.5,
											color: '#D0E8FF',
										},
										{
											offset: 1,
											color: '#ffffff',
										},
									]
								),
							},
						}, //填充区域样式
						data: this.pvArray,
					},
					{
						name: 'uv',
						type: 'line',
						smooth: true,
						lineStyle: {
							color: '#BEA7FF',
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: '#BEA7FF',
										},
										{
											offset: 0.5,
											color: '#D2D0FF',
										},
										{
											offset: 1,
											color: '#ffffff',
										},
									]
								),
							},
						}, //填充区域样式
						data: this.uvArray,
					},
				],
			};
			myChart.setOption(options);
        },
        go_trafficMonitor(){
            this.$router.push({ path: '/trafficMonitor' });
        },
		go_unprocessedTab() {
			this.$router.push({ path: '/unprocessedTab' });
        },
        go_pupv() {
			this.$router.push({ path: '/statistics' });
        },
        go_playTraffic() {
			this.$router.push({ path: '/playTraffic' });
		},
		//查询屏幕高度自适应
		changeFixed(clientHeight) {
			if (this.$refs.scrollerHeight) {
				this.$refs.scrollerHeight.style.height =
					clientHeight - 575 + 'px';
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
.content {
	background-color: #fff;
    width: 100%;
    min-width: 1500px;
	.more {
		text-align: right;
		color: #297aff;
		// padding-right: 20px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.el-icon-arrow-right {
			font-size: 12px;
		}
	}
	.content_top {
		width: 100%;
		height: 425px;
		display: flex;
		justify-content: space-between;
		.content_top_left {
			width: 38%;
			margin-right: 30px;
			padding: 30px;
			box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
			.content_top_left_con_top {
				height: 75%;
				margin-top: 15px;
				display: flex;
				justify-content: space-between;
				.content_top_left_con_img {
					width: 68%;
					display: flex;
					box-sizing: border-box;
					padding-top: 65px;
					padding-left: 35px;
					img {
						width: 62px;
						height: 62px;
						margin-right: 10px;
					}
					div {
						p {
							color: #333333;
							font-size: 32px;
							font-weight: 600;
							display: flex;
							align-items: flex-end;
							img {
								width: 10%;
                                height: 10%;
                                margin-left: 10px;
                                margin-bottom: 10px;
							}
						}
						p:last-child {
							color: #999999;
							font-size: 14px;
							font-weight: 500;
							margin-top: 10px;
						}
					}
				}
				.content_top_left_con_top_vertical {
					width: 32%;
					div {
						text-align: center;
						position: relative;
						height: 40%;
						box-sizing: border-box;
						padding-top: 20px;
						border-radius: 8px;
						background: #f8f9fb;
						margin-top: 15px;
						p {
							font-size: 14px;
							color: #999999;
							line-height: 28px;
						}
						p:nth-child(1) {
							color: #333333;
							font-size: 20px;
							span {
								font-size: 14px;
							}
						}
					}
				}
			}
			.content_top_left_con_bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				div {
					width: 33.33%;
					text-align: center;
					position: relative;
					p {
						font-size: 14px;
						color: #999999;
						line-height: 28px;
					}
					p:nth-child(1) {
						color: #333333;
						font-size: 20px;
						span {
							font-size: 14px;
						}
					}
				}
				div::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					width: 0;
					height: 100%;
					border-right: solid #dddddd 1px;
				}
				div:first-child:after {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					width: 0;
					height: 0;
					border: none;
				}
			}
		}
		.content_top_right {
			flex: 1;
			background: #ffffff;
			display: flex;
			justify-content: space-between;

			.content_top_right_text {
				width: 250px;
				// background: #fcb2f2;
				margin-right: 30px;
				padding: 30px;
				box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
				display: flex;
				flex-direction: column;
				div {
					width: 100%;
					height: 50%;
					position: relative;
				}
				div:first-child::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					width: calc(100% - 60px);
					height: 0;
					border-bottom: solid #dddddd 1px;
				}
				div:last-child {
					padding-top: 30px;
				}
				p {
					color: #999999;
					font-size: 14px;
					line-height: 30px;
				}
				p:nth-child(3) {
					margin-top: 30px;
				}
				.all_f {
					color: #333333;
					font-size: 18px;
				}
			}
			.content_top_right_echarts {
				flex: 1;
				min-width: 495px;
				padding: 30px;
				box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
			}
		}
	}
	.content_bottom {
		width: 100%;
		margin-top: 30px;
		margin-bottom: 30px;
		display: flex;
		justify-content: space-between;
		.content_bottom_left {
          	width: 38%;
            min-width: 645px;
			margin-right: 30px;
			display: flex;
			flex-direction: column;
			.content_bottom_left_text {
				width: 100%;
				height: 160px;
				margin-bottom: 30px;
				padding: 30px;
				box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
				display: flex;
				justify-content: space-between;
				align-items: center;
				div {
					text-align: left;
					width: 33.33%;
					img {
						width: 80%;
						height: 80%;
					}
					p {
						color: #999999;
						font-size: 14px;
						line-height: 36px;
					}
					.content_bottom_left_title {
						color: #333333;
                        font-size: 20px;
                        img{
                            width: 8%;
                            height: 8%;
                        }
					}
				}
			}
			.content_bottom_left_echarts {
				width: 100%;
				flex: 1;
				padding: 30px;
				box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
			}
		}
		.content_bottom_right {
			flex: 1;
			// background: #f9fab4;
			padding: 30px;
			box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
			.table_text {
				text-align: center;
				font-weight: 600;
				margin-bottom: 20px;
			}
		}
	}
}
</style>
