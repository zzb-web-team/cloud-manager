<template>
	<div class="content">
		<div class="content_top">
			<div class="content_top_left">
				<p class="more" @click="go_trafficMonitor">More <i class="el-icon-arrow-right"></i></p>
				<div class="content_top_left_con_top">
					<div class="content_top_left_con_img">
						<img src="../../assets/img/un_img.png" alt="" />
						<div>
							<p>
								{{todayTotal|setbytes}} <span>{{todayTotal|set_bkb}}</span
								><img src="../../assets/img/fall.png" alt="" />
							</p>
							<p>今日节点总流量</p>
						</div>
					</div>
					<div class="content_top_left_con_top_vertical">
						<div>
							<p>{{yesterdayTotal}} <span>{{yesterdayTotal|set_bkb}}</span></p>
							<p>昨日节点总流量</p>
						</div>
						<div>
							<p>{{sevenDayTotal |setbytes}} <span>{{sevenDayTotal|set_bkb}}</span></p>
							<p>近7日节点总流量</p>
						</div>
					</div>
				</div>
				<div class="content_top_left_con_bottom">
					<div>
						<p>{{sump2p |setbytes}} <span>{{sump2p|set_bkb}}</span></p>
						<p>P2P播放流量</p>
					</div>
					<div>
						<p>{{sumcdn |setbytes}} <span>{{sumcdn|set_bkb}}</span></p>
						<p>CDN回源流量</p>
					</div>
					<div>
						<p>{{sumnode|setbytes}} <span>{{sumnode|set_bkb}}</span></p>
						<p>下行节点扩散流量</p>
					</div>
				</div>
			</div>
			<div class="content_top_right">
				<div class="content_top_right_text">
					<div>
						<p class="all_f">
							{{todayPV}} <img src="../../assets/img/fall.png" alt="" /></i>
						</p>
						<p>今日访问总次数(PV)</p>
						<p>{{yesterdayPV}}</p>
						<p>昨日访问总次数(PV)</p>
					</div>
					<div>
						<p class="all_f">
							{{todayUV}} <img src="../../assets/img/xiajiang.png" alt="" /></i>
						</p>
						<p>今日独立IP访问数(UV)</p>
						<p>{{yesterdayUV}}</p>
						<p>昨日独立IP访问数(UV)</p>
					</div>
				</div>
				<div ref="pupvEcharts_con" class="content_top_right_echarts">
					<p class="more" @click="go_pupv">More <i class="el-icon-arrow-right"></i></p>
					<div id="pupv_echarts" :style="{ height: pvpu_e_h }"></div>
				</div>
			</div>
		</div>
		<div class="content_bottom" ref="scrollerHeight">
			<div class="content_bottom_left" >
				<div class="content_bottom_left_text">
					<div>
						<img src="../../assets/img/bgc_left_one.png" alt="" />
					</div>
					<div>
						<p class="content_bottom_left_title">
							{{todayUnhandleReq}} <img src="../../assets/img/fall.png" alt="" /></i>
						</p>
						<p>今日未处理访问总次数</p>
					</div>
					<div>
						<p>{{yesterdayUnhandleReq}}</p>
						<p>昨日未处理访问总次数</p>
					</div>
				</div>
				<div class="content_bottom_left_echarts">
					<p class="more" @click="go_playTraffic">More <i class="el-icon-arrow-right"></i></p>
					<div id="p2p_echarts" :style="{ height: p2p_e_h }"></div>
				</div>
			</div>
			<div class="content_bottom_right">
				<p class="more" @click="go_unprocessedTab">
					More <i class="el-icon-arrow-right"></i>
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
                        <el-table-column prop="visit_cnt" label="访问总次数" width="120">
                        </el-table-column>
                        <el-table-column prop="channelId" label="渠道ID" width="120">
                        </el-table-column>
                        <el-table-column
                            prop="domain"
                            label="加速内容名称"
                            width="120"
                        >
                        </el-table-column>
                        <el-table-column prop="urlName" label="CDN地址">
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
import { home_page } from '../../servers/api';
import echarts from 'echarts';
import common from '../../comm/js/util';
export default {
	data() {
		return {
			clientHeight: '',
            pvpu_e_h: '',
            p2p_e_h:'',
			chanid: '',
			useCache: true,
			starttime: '',
			endtime: '',
			timeUnit: 60,
			value1fileName: '',
			valueDomain: '',
            value1Activechanid: '',
            sumcdn:0,
            sump2p:0,
            sumnode:0,
            todayTotal:0,
            todayPV:'',
            todayUV:0,
            yesterdayPV:0,
            yesterdayUV:0,
            todayUnhandleReq:0,
            yesterdayUnhandleReq:0,
            yesterdayTotal:0,
            sevenDayTotal:0,
			valueacce: '',
			uvArray: [], //图一y1
			pvArray: [], //图一y2
			timeArray: [], //图一x
			tableData: [
				// {
                // 	f_date: '2016-05-02',
                //     visit_cnt:150,
                //     domain:"我的加速1",
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
				// {
                // 	f_date: '2016-05-04',
                //     visit_cnt:366,
                //     domain:"我的加速8",
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
				// {
                // 	f_date: '2016-05-01',
                //     visit_cnt:2,
                //     domain:"我的加速6",
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
				// {
                // 	f_date: '2016-05-03',
                //     visit_cnt:32,
                //     domain:"我的加速3",
				// 	channelId: '王小虎',
				// 	urlName: 'http://www.123156.nihaoya.com/ro/cdv/index.html',
				// },
            ],
            flowunit: '',
            timeArrayZb: [],
            timeArrayZb1: [],
            dataZb1: [],
			dataZb3: [],
			dataZb2: [],
			dataZb4: [],
			dataZb5: [],
            dataZb6: [],
            dataAry: [],
			dataAry1: [],
			dataAry2: [],
			dataAry3: [],
			dataAry4: [],
			dataAry5: [],
		};
    },
    filters:{
        setbytes(data) {
        let limit = parseInt(data);
        let size = 0;
        if (limit < 1024) {
            //小于0.1KB，则转化成B
            size = limit.toFixed(2);
        } else if (limit < 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2);
        } else if (limit < 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2);
        } else if (limit < 1024 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2);
        } else {
            //其他转化成TB
            size = (limit / (1024 * 1024 * 1024 * 1024)).toFixed(2);
        }

        let sizeStr = size + ""; //转成字符串
        let index = sizeStr.indexOf("."); //获取小数点处的索引
        let dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        return size;
        },
        set_bkb(data){
            let limit = parseInt(data);
            let size = "B";
            if (limit < 1024) {
                //小于0.1KB，则转化成B
                size = "B";
            } else if (limit < 1024 * 1024) {
                //小于0.1MB，则转化成KB
                size = "KB";
            } else if (limit < 1024 * 1024 * 1024) {
                //小于0.1GB，则转化成MB
                size = "MB";
            } else if (limit < 1024 * 1024 * 1024 * 1024) {
                //小于0.1GB，则转化成GB
                size = "GB";
            } else {
                //其他转化成TB
                size = "TB";
            }
            return size;
        }
    },
	watch: {
		clientHeight() {
			//如果clientHeight 发生改变，这个函数就会运行
			this.changeFixed(this.clientHeight);
		},
	},
	mounted() {
		let that = this;
		this.clientHeight = `${document.documentElement.clientHeight||document.documentElement.offsetHeight}`; //获取浏览器可视区域高度
		window.onresize = function() {
			that.clientHeight = `${document.documentElement.clientHeight||document.documentElement.offsetHeight}`;
			if (that.$refs.scrollerHeight) {
				that.$refs.scrollerHeight.style.height =
					that.clientHeight - 580 + 'px';
				that.$refs.scrollerHeight.style.minHeight = 500 + 'px';
			}
		};
        this.pvpu_e_h = `${this.$refs.pupvEcharts_con.clientHeight - 60}px`;
        this.p2p_e_h = `${this.clientHeight-835}px`;
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
        this.endtime = Date.parse(new Date()) / 1000;
        this.get_data();
        // this.querySdkflow();
	},
	methods: {
        get_data(){
            let params = new Object();
			home_page(params)
				.then((res) => {
                    console.log(res);
                    if(res.data.status==0){
                        this.sump2p=res.data.sump2p;//p2p播放流量
                        this.sumcdn=res.data.sumcdn;//cdn播放流量
                        this.sumnode=res.data.sumnode;//下行节点扩散流量
                        this.todayTotal=res.data.todayTotal;//今日节点总流量
                        this.yesterdayTotal=res.data.yesterdayTotal;//昨日节点总流量
                        this.sevenDayTotal=res.data.sevenDayTotal;//7天节点总流量
                        this.yesterdayPV=res.data.yesterdayPV;//昨日访问总次数PV
                        this.yesterdayUV=res.data.yesterdayUV;//昨日访问总次数UV
                        this.todayUV=res.data.todayUV;//今日访问总次数UV
                        this.todayPV=res.data.todayPV;//今日访问总次数PV
                        this.todayUnhandleReq=res.data.todayUnhandleReq;//今日未处理访问总数
                        this.yesterdayUnhandleReq=res.data.yesterdayUnhandleReq;//昨日未处理访问总数
                        //pu/pv图表数据
                        this.timeArray="";
                        this.uvArray =res.data.uvArray;
                        this.pvArray =res.data.pvArray;
                        this.drawLine();
                        //p2p图表数据
                        this.timeArrayZb =res.data.timeArray;
                        this.p2parray=res.data.p2parray;//每个时刻p2p播放流量
                        this.downcdnarray=res.data.downcdnarray;//每个时刻cdn回源流量
                        this.downbackarray=res.data.downbackarray;//每个时刻下行节点扩散流量

                        if (
							[
								...res.data.p2parray,
								...res.data.downcdnarray,
								...res.data.downbackarray,
							].length == 0
						) {
							this.flowunit = 'B';
						} else {
							var max = _.max([
								...res.data.p2parray,
								...res.data.downcdnarray,
								...res.data.downbackarray,
							]);
							this.flowunit = this.common.formatByteActiveunit(
								max
							);
                        }
                        this.drawLine2(res.data.timeArray,res.data.p2parray,res.data.downcdnarray.data.downbackarray);
                        //表格
                        this.tableData=res.data.unhandleReqLogs;

                    }
				})
				.catch((error) => {
					console.log(error);
				});
        },
		drawLine() {
			let _this = this;
			// 初始化echarts实例
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
								color: new echarts.graphic.LinearGradient(0,0,0,1,[
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
								color: new echarts.graphic.LinearGradient(0,0,0,1,[
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
        		drawLine2(x, y, z, a,) {
			for (var i = 0; i < y.length; i++) {
				y[i] = (y[i] * 100).toFixed(2);
			}
			for (var i = 0; i < z.length; i++) {
				z[i] = (z[i] * 100).toFixed(2);
			}
			for (var i = 0; i < a.length; i++) {
				a[i] = (a[i] * 100).toFixed(2);
			}
			
			let _this = this;
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(
				document.getElementById('p2p_echarts')
			);
			myChart.off('click'); // 这里很重要！！！
			window.onresize = myChart.resize;
			// 绘制图表
			let options = {
				legend: {
					top:10,
					data: ['P2P播放流量',
					'CDN播放有源流量',
					'CDN播放无源流量',],
				},
				grid: {
					left: '5%', // 默认10%，给24就挺合适的。
					top: 50, // 默认60
					right: "5%", // 默认10%
					bottom: "6%", // 默认60
				},
				xAxis: {
					data: x,
					splitLine: {
						show: false,
					},
				},
				yAxis: {
					splitLine: {
						show: false,
					},
				},
				series: [],
			};
				options.tooltip = {
                    trigger: 'axis',
                    axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				};
				options.series = [
					{
						name: 'P2P播放流量',
						type: 'bar',
						stack: '使用情况',
						data: a,
						barMaxWidth: 30, //柱图宽度
						itemStyle: {
							normal: { color: '#D2E9FF' },
						},
						label: {
							normal: {
								show: true,
								position: 'inside',
								color: '#333333',
								fontSize: 10,
								formatter: function(params) {
									if (params.value > 0) {
										return params.value;
									} else {
										return ' ';
									}
								},
							},
						},
					},
					{
						name: 'CDN播放有源流量',
						type: 'bar',
						stack: '使用情况',
						data: y,
						barMaxWidth: 30, //柱图宽度
						itemStyle: {
							normal: {
								color: '#84C1FF',
							},
						},

						label: {
							normal: {
								show: true,
								position: 'inside',
								color: '#333333',
								fontSize: 10,
								formatter: function(params) {
									if (params.value > 0) {
										return params.value;
									} else {
										return ' ';
									}
								},
							},
						},
					},
					{
						name: 'CDN播放无源流量',
						type: 'bar',
						stack: '使用情况',
						data: z,
						barMaxWidth: 30, //柱图宽度
						itemStyle: {
							normal: {
								color: '#2894FF',
							},
						},
						label: {
							normal: {
								show: true,
								position: 'inside',
								color: '#333333',
								fontSize: 10,
								formatter: function(params) {
									if (params.value > 0) {
										return params.value;
									} else {
										return ' ';
									}
								},
							},
						},
					},
				];
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
		changeFixed(data) {
			if (this.$refs.scrollerHeight) {
				this.$refs.scrollerHeight.style.height =
					data - 560 + 'px';
				this.$refs.scrollerHeight.style.minHeight = 500 + 'px';
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
.content {
	background-color: #fff;
    // width: 100%;
    min-width: 1250px;
    margin-left: 25px;
    margin-right: 25px;
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
			margin-right: 15px;
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
						border-radius: 5px;
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
				margin-right: 15px;
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
					width: 100%;
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
		margin-top: 15px;
		margin-bottom: 30px;
		display: flex;
		justify-content: space-between;
		.content_bottom_left {
          	width: 38%;
            min-width: 645px;
			margin-right: 15px;
			display: flex;
			flex-direction: column;
			.content_bottom_left_text {
				width: 100%;
				height: 160px;
				margin-bottom: 15px;
                padding: 30px;
                background:#F8F9FB;
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
            box-sizing: border-box;
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
