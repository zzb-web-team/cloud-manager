<template>
	<section class="myself-container content">
		<div class="top_title">播放流量</div>
		<div class="user-title" style="display: flex;flex-flow: column;">
			<div class="resources_con">
				<el-tabs
					v-model="activeName"
					@tab-click="handleClick"
					ref="tabs"
				>
					<el-tab-pane
						label="播放流量占比"
						name="threed"
						:lazy="true"
					>
						<div
							style="display: flex;justify-content: space-between;align-items: center; flex-flow: row; margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1); box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);border-radius:2px;"
						>
							<div>
								<el-input
									v-model="value1Activechanid"
									placeholder="请输入渠道ID"
									style="width: 10%;margin-right: 10px;"
									@keyup.enter.native="onChanges"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onChanges()"
									></i>
								</el-input>
								<el-input
									v-model="value1Activechanidactive"
									placeholder="请输入域名"
									style="width: 10%;margin-right: 10px;"
									@keyup.enter.native="onChanges"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onChanges()"
									></i>
								</el-input>
								<el-input
									v-model="valuea1"
									placeholder="请输入加速内容名称"
									style="width: 10%;margin-right: 10px;"
									@keyup.enter.native="onChanges"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onChanges()"
									></i>
								</el-input>
								<el-select
									v-model="value1acce1"
									placeholder="全部终端类型"
									style="width: 10%;margin-right: 10px;"
									@change="onChanges"
								>
									<el-option
										label="全部终端"
										value="-1"
									></el-option>
									<el-option
										v-for="(item, index) in hashidSets"
										:key="index"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
								<!-- <el-select
									v-model="valueChanel"
									placeholder="全部节点渠道"
									style="width: 10%;margin-right: 10px;"
									@change="onChanges"
								>
									<el-option
										label="全部"
										value="*"
									></el-option>
									<el-option
										v-for="(item, index) in hashidSets1"
										:key="index"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select> -->
								<el-radio-group
									v-model="radio"
									@change="select_time()"
									v-show="!showzdy"
									style="white-space:nowrap;"
								>
									<el-radio-button size="small" label="1"
										>今天</el-radio-button
									>
									<el-radio-button size="small" label="2"
										>昨天</el-radio-button
									>
									<!-- <el-radio-button size="small" label="3"
										>近7天</el-radio-button
									>
									<el-radio-button size="small" label="4"
										>近30天</el-radio-button
									> -->
									<el-radio-button size="small" label="5"
										>自定义</el-radio-button
									>
								</el-radio-group>
								<el-button
									type="primary"
									v-show="showzdy"
									style="background:#409EFF;border:#409EFF"
									@click="setZdy"
									>自定义</el-button
								>
								<el-date-picker
									v-show="showzdy"
									style="margin-left:10px;"
									v-model="val2"
									type="date"
									range-separator="~"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
                                     value-format="timestamp"
									align="left"
									@change="gettimes(0)"
								></el-date-picker>
								<el-button
									style="margin-left:10px;"
									type="primary"
									@click="seachtu(3)"
									>确定</el-button
								>
								<el-button
									style="margin-left:10px;"
									type="primary"
									@click="reset_one"
									>重置</el-button
								>
							</div>
							<div style="display:flex;white-space:nowrap;">
								<span style="margin-right:5px;">使用缓存</span>
								<el-switch
									v-model="useCache"
									active-color="#297AFF"
								></el-switch>
							</div>
						</div>
						<div class="user_item">
							<div class="item_left">
								<div
									class="item_count"
									style="text-align:center;"
								>
									<span>{{ totalp2p | setbytes }}</span>
								</div>
								<div
									class="item_text"
									style="text-align:center;"
								>
									P2P播放流量
								</div>
							</div>
							<div class="item_right">
								<div
									class="item_count"
									style="text-align:center;"
								>
									<span>{{ totalcdn | setbytes }}</span>
								</div>
								<div
									class="item_text"
									style="text-align:center;"
								>
									CDN播放流量
								</div>
							</div>
						</div>
						<div class="device_form" style>
							<div
								id="myChartMap2"
								:style="{ height: '607px' }"
							></div>
						</div>
						<!-- <div class="devide_table">

              <el-row type="flex" class="row_active">
                <el-col :span="24">
                  <el-table :data="tableZb" border max-height="750" style="width: 98%;margin:10px;" :cell-style="rowClass" :header-cell-style="headClass">
                    <el-table-column label="加速内容名称">
                      <template slot-scope="scope">
                        <div>{{ scope.row.urlname }}</div>
                      </template>
                    </el-table-column>

                    <el-table-column label="播放URL" width="250">
                      <template slot-scope="scope">
                        <div>{{ scope.row.playurl }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="P2P播放流量（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.p2pflow | setbytes }}</div>
                          <div>({{ scope.row.p2ppercent | percentss }})</div>
                        </div>

                      </template>
                    </el-table-column>
                    <el-table-column label="CDN播放流量（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.cdnflow | setbytes }}</div>
                          <div>({{ scope.row.cdnpercent | percentss }})</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :render-header="renderHeader" label="节点有资源时CDN播放流量（%）" >
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">
                          <div>{{ scope.row.cdnactiveflow | setbytes }}</div>
                          <div>({{ scope.row.cdnactivepercent | percentss }})</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :render-header="renderHeader" label="节点无资源时CDN播放流量（%）">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: center;">

                          <div>{{ scope.row.cdnpassiveflow | setbytes }}</div>
                          <div>({{ scope.row.cdnpassivepercent | percentss }})</div>

                        </div>

                      </template>
                    </el-table-column>
                    <el-table-column label="加速播放次数">
                      <template slot-scope="scope">
                        <div>{{ scope.row.times }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="stime" :formatter="timeFormatter">
                      <!-- <template slot-scope="scope"> -->
						<!-- <div>{{ scope.row.stime | settimes }}</div> -->
						<!-- <div>{{ common.getTimess(scope.row.etime * 1000) }}</div>
                      </template> -->
						<!-- </el-table-column>
                  </el-table>
                  <fenye style="float:right;margin:10px 0 0 0;" :currentPage="pageNo1" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt1"></fenye>
                </el-col>
              </el-row>
            </div> -->
					</el-tab-pane>
					<el-tab-pane
						label="播放流量分布"
						name="second"
						:lazy="true"
					>
						<div
							style="display: flex;align-items: center; flex-flow: row; margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1); box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);border-radius:2px;"
						>
							<el-input
								v-model="value1Activechanid"
								placeholder="请输入渠道ID"
								style="width:160px;margin-right: 10px;"
								@keyup.enter.native="onChanges"
							>
								<i
									slot="prefix"
									class="el-input__icon el-icon-search"
									@click="onChanges()"
								></i>
							</el-input>
							<el-radio-group
								v-model="radio"
								@change="select_time()"
								v-show="!showzdy"
							>
								<el-radio-button size="small" label="1"
									>今天</el-radio-button
								>
								<el-radio-button size="small" label="2"
									>昨天</el-radio-button
								>
								<!-- <el-radio-button size="small" label="3"
									>近7天</el-radio-button
								>
								<el-radio-button size="small" label="4"
									>近30天</el-radio-button
								> -->
								<el-radio-button size="small" label="5"
									>自定义</el-radio-button
								>
							</el-radio-group>
							<el-button
								type="primary"
								v-show="showzdy"
								style="background:#409EFF;border:#409EFF"
								@click="setZdy"
								>自定义</el-button
							>
							<el-date-picker
								v-show="showzdy"
								style="margin-left:10px;"
								v-model="val2"
								type="daterange"
								placeholder="选择日期"
								align="left"
								@change="gettimes(0)"
							></el-date-picker>
							<!-- <el-button style="margin-left:10px;" type="primary" @click="seachtu(3)">确定</el-button> -->
						</div>
						<div class="device_form">
							<el-row type="flex" class="row_active">
								<el-col
									:span="24"
									style="text-align:left;font-weight: bold;margin-bottom:30px;"
									>播放流量地域分布</el-col
								>
							</el-row>
							<el-radio-group
								v-model="radioPlayFlow"
								@change="handleClick1"
							>
								<el-radio-button label="1"
									>P2P播放流量</el-radio-button
								>
								<el-radio-button label="2"
									>CDN播放流量</el-radio-button
								>
							</el-radio-group>
							<div
								id="myChartMap1"
								:style="{ height: '607px' }"
							></div>
						</div>

						<div class="devide_table">
							<el-row type="flex" class="row_active">
								<el-col
									:span="24"
									style="text-align:left;font-weight: bold;margin-bottom:20px;"
									>省/市流量统计</el-col
								>
							</el-row>
							<div
								style="display: flex;flex-direction: row; justify-content: space-between"
							>
								<div style="width: 30%;">
									<div
										v-for="(item,
										index) in locationCurveList"
										:key="index"
										style="display: flex;flex-direction: row;align-items: center;margin-top:8px;"
									>
										<span style="width: 15%">{{
											item.region
										}}</span>
										<p
											:style="{
												height: 16 + 'px',
												width:
													((radioPlayFlow == 1
														? item.p2p_flow
														: item.cdn_flow) /
														locationMax) *
														70 +
													'%',
												backgroundColor: '#297aff',
												marginRight: '6px',
											}"
										></p>
										<span
											style="width: 15%"
											v-if="radioPlayFlow == 1"
											>{{
												item.p2p_flow | setbytes
											}}</span
										>
										<span style="width: 15%" v-else>{{
											item.cdn_flow | setbytes
										}}</span>
									</div>
								</div>
								<el-row
									type="flex"
									class="row_active"
									style="width: 63%;margin-top: 0;"
								>
									<el-col :span="24">
										<el-table
											:data="locationTableList"
											border
											max-height="750"
											style="margin:10px;"
											:cell-style="rowClass"
											:header-cell-style="headClass"
										>
											<el-table-column label="序号">
												<template slot-scope="scope">
													<div>
														{{ scope.row.index }}
													</div>
												</template>
											</el-table-column>
											<el-table-column label="省市">
												<template slot-scope="scope">
													<div>
														{{ scope.row.region }}
													</div>
												</template>
											</el-table-column>
											<el-table-column
												:label="
													radioPlayFlow == 1
														? 'P2P播放流量'
														: 'CDN播放流量'
												"
											>
												<template slot-scope="scope">
													<div
														v-if="
															radioPlayFlow == 1
														"
													>
														{{
															scope.row.p2p_flow
																| setbytes
														}}
													</div>
													<div v-else>
														{{
															scope.row.cdn_flow
																| setbytes
														}}
													</div>
												</template>
											</el-table-column>
											<el-table-column label="流量占比">
												<template slot-scope="scope">
													<div
														v-if="
															radioPlayFlow == 1
														"
													>
														{{
															scope.row
																.p2pPercent
																| percentss
														}}
													</div>
													<div v-else>
														{{
															scope.row
																.cdnPercent
																| percentss
														}}
													</div>
												</template>
											</el-table-column>
										</el-table>
										<!-- <fenye style="float:right;margin:10px 0 0 0;" :currentPage="pageNo1" @handleCurrentChange="handleCurrentChange1" @handleSizeChange="handleSizeChange1" :pagesa="total_cnt1"></fenye> -->
									</el-col>
								</el-row>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="播放流量终端" name="four" :lazy="true">
						<div
							style="display: flex;justify-content: space-between;align-items: center; flex-flow: row;margin-top: 20px;padding:20px 37px;background:rgba(255,255,255,1);box-shadow:0px 2px 3px 0px rgba(6,17,36,0.14);border-radius:2px;"
						>
							<div>
								<el-input
									v-model="value1Activechanid"
									placeholder="请输入渠道ID"
									@change="onChanges"
									style="width: 12%;margin-right: 10px;"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onChanges()"
									></i>
								</el-input>
								<el-input
									v-model="value1Activechanidactive"
									placeholder="请输入域名"
									style="width: 12%;margin-right: 10px;"
									@keyup.enter.native="onChanges"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onChanges()"
									></i>
								</el-input>
								<el-input
									v-model="valuea1"
									placeholder="请输入加速内容名称"
									@change="onChanges"
									style="width: 12%;margin-right: 10px;"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onChanges()"
									></i>
								</el-input>
								<!-- <el-select v-model="value1acce1" placeholder="全部终端类型" @change="onChanges" style="width: 10%;margin-right: 10px;">
                <el-option label="全部终端" value="-1"></el-option>
                <el-option v-for="(item, index) in hashidSets" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select> -->
								<!-- <el-select
									v-model="valueChanel1"
									placeholder="全部节点渠道"
									@change="onChanges"
									style="width: 10%;margin-right: 10px;"
								>
									<el-option
										label="全部"
										value="*"
									></el-option>
									<el-option
										v-for="(item, index) in hashidSets1"
										:key="index"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select> -->
								<el-radio-group
									v-model="radio"
									@change="select_time()"
									v-show="!showzdy"
								>
									<el-radio-button size="small" label="1"
										>今天</el-radio-button
									>
									<el-radio-button size="small" label="2"
										>昨天</el-radio-button
									>
									<!-- <el-radio-button size="small" label="3"
										>近7天</el-radio-button
									>
									<el-radio-button size="small" label="4"
										>近30天</el-radio-button
									> -->
									<el-radio-button size="small" label="5"
										>自定义</el-radio-button
									>
								</el-radio-group>
								<el-button
									type="primary"
									v-show="showzdy"
									style="background:#409EFF;border:#409EFF"
									@click="setZdy"
									>自定义</el-button
								>
								<el-date-picker
									v-show="showzdy"
									style="margin-left:10px;"
									v-model="val2"
									type="date"
                                    value-format="timestamp"
									placeholder="选择日期"
									align="left"
									@change="gettimes(1)"
								></el-date-picker>
								<el-button
									style="margin-left:10px;"
									type="primary"
									@click="seachtu(4)"
									>确定</el-button
								>
								<el-button
									style="margin-left:10px;"
									type="primary"
									@click="reset_two"
									>重置</el-button
								>
							</div>
							<div style="display:flex;white-space:nowrap;">
								<span style="margin-right:5px;">使用缓存</span>
								<el-switch
									v-model="useCache"
									active-color="#297AFF"
								></el-switch>
							</div>
						</div>
						<div class="device_form" style>
							<div
								id="myChartMap3"
								:style="{ height: '607px' }"
							></div>
						</div>
					</el-tab-pane>
				</el-tabs>
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
	settime,
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
	sdk_flow,
	sdk_flow_table,
	sdk_flow_control,
	export_sdk_flow_table_file,
	export_sdk_flow_control_file,
	get_nodetype_enum,
	query_dataflow_location_table,
	query_dataflow_location_curve,
	export_dataflow_location_file,
} from '../../servers/api';
import echarts from 'echarts';
import 'echarts/map/js/china.js';
import common from '../../comm/js/util';
import _ from 'lodash';

import base from "../../components/base"
export default {
    mixins:[base],
	data() {
		return {
			dataAry: [],
			dataAry1: [],
			dataAry2: [],
			dataAry3: [],
			dataAry4: [],
			dataAry5: [],
			value1acce: '-1',
			value1acce1: '',
			valueacce: '-1',
			valueChanel: '',
			valueChanel1: '',
			hashidSet: [],
			hashidSets: [
				{
					value: '1',
					label: 'iOS',
				},
				{
					value: '0',
					label: 'android',
				},
				{
					value: '2',
					label: '其他',
				},
			],
			hashidSets1: [],
			value1Activechanidactive: '',
			options2: [
				{
					value: '*',
					label: '全部地区',
				},
				{
					value: '华北',
					label: '华北',
					children: [
						{
							value: '北京',
							label: '北京',
						},
						{
							value: '内蒙古',
							label: '内蒙古',
						},
						{
							value: '山西',
							label: '山西',
						},
						{
							value: '河北',
							label: '河北',
						},
						{
							value: '天津',
							label: '天津',
						},
					],
				},
				{
					value: '西北',
					label: '西北',
					children: [
						{
							value: '宁夏',
							label: '宁夏',
						},
						{
							value: '陕西',
							label: '陕西',
						},
						{
							value: '甘肃',
							label: '甘肃',
						},
						{
							value: '青海',
							label: '青海',
						},
						{
							value: '新疆',
							label: '新疆',
						},
					],
				},
				{
					value: '东北',
					label: '东北',
					children: [
						{
							value: '黑龙江',
							label: '黑龙江',
						},
						{
							value: '吉林',
							label: '吉林',
						},
						{
							value: '辽宁',
							label: '辽宁',
						},
					],
				},
				{
					value: '华东',
					label: '华东',
					children: [
						{
							value: '福建',
							label: '福建',
						},
						{
							value: '江苏',
							label: '江苏',
						},
						{
							value: '安徽',
							label: '安徽',
						},
						{
							value: '山东',
							label: '山东',
						},
						{
							value: '上海',
							label: '上海',
						},
						{
							value: '浙江',
							label: '浙江',
						},
					],
				},
				{
					value: '华中',
					label: '华中',
					children: [
						{
							value: '河南',
							label: '河南',
						},
						{
							value: '湖北',
							label: '湖北',
						},
						{
							value: '江西',
							label: '江西',
						},
						{
							value: '湖南',
							label: '湖南',
						},
					],
				},
				{
					value: '西南',
					label: '西南',
					children: [
						{
							value: '贵州',
							label: '贵州',
						},
						{
							value: '云南',
							label: '云南',
						},
						{
							value: '重庆',
							label: '重庆',
						},
						{
							value: '四川',
							label: '四川',
						},
						{
							value: '西藏',
							label: '西藏',
						},
					],
				},
				{
					value: '华南',
					label: '华南',
					children: [
						{
							value: '广东',
							label: '广东',
						},
						{
							value: '广西',
							label: '广西',
						},
						{
							value: '海南',
							label: '海南',
						},
					],
				},
				{
					value: '其他',
					label: '其他',
					children: [
						{
							value: '香港',
							label: '香港',
						},
						{
							value: '澳门',
							label: '澳门',
						},
						{
							value: '台湾',
							label: '台湾',
						},
					],
				},
			],
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
			tableZb: [],
			activeName: 'threed',
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
			val2: "",
			rowHeader: [
				{
					prop: 'time',
					label: '节点ID',
				},
				{
					prop: 'totals',
					label: '使用流量',
				},
				{
					prop: 'online_devices',
					label: '传输次数',
				},
				{
					prop: 'average_online',
					label: '日期',
				},
			],
			rowHeader1: [
				{
					prop: 'time',
					label: '节点ID',
				},
				{
					prop: 'totals',
					label: '存储容量',
				},
				{
					prop: 'online_devices',
					label: '存储次数',
				},
				{
					prop: 'average_online',
					label: '日期',
				},
			],
			tableData: [
				{
					time: '测试数据1',
					totals: '测试数据1',
					online_devices: '测试数据1',
					average_online: '测试数据1',
					new_percent: '测试数据1',
				},
			],
			timeUnit: 5,
			starttime: '',
			endtime: '',
			dataFlowArray: [], //图1
			timeArray: [], //图1
			dataFlowArray2: [], //图2
			timeArray2: [], //图2
			pageSize: 10, //每页数量
			pageNo: 1, //当前页码
			pageSize1: 10, //每页数量
			pageNo1: 1, //当前页码
			total_cnt: 1, //数据总量
			total_cnt1: 1, //数据总量
			chanid: '',
			pageActive: 0,
			dataFlownum: 0,
			dataFlownum1: 0,
			flowunit: '',
			timeArrayZb: [],
			timeArrayZb1: [],
			dataZb1: [],
			dataZb3: [],
			dataZb2: [],
			dataZb4: [],
			dataZb5: [],
			dataZb6: [],
			totalp2p: 0,
			totalcdn: 0,
			timeArrayJk: [],
			dataJk1: [],
			dataJk2: [],
			dataJk3: [],
			dataJk4: [],
			radio: 1,
			radioPlayFlow: 1,
			locationCurveList: [],
			locationTableList: [],
			locationMax: '',
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
		percentss(data) {
			if (data == 0) {
				return 0 + '%';
			}
			return (data * 100).toFixed(2) + '%';
		},
	},
	components: {
		fenye,
	},
	mounted() {
		this.$nextTick(function() {
			this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none';
		});
		this.getNodeType();
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		this.querySdkflow();
		// this.querySdkflowTable();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
		// this.drawLine();
		// this.drawLine1();
	},
	methods: {
		timeFormatter(row) {
			console.log(row);
			if (this.timeUnit == 120) {
				return this.common.getTimess(row.stime * 1000);
			} else {
				return (
					this.common.getTimess(row.stime * 1000) +
					'~' +
					this.common.getTimess(row.etime * 1000)
				);
			}
		},
		renderHeader(h, { column }) {
			const serviceContent = [
				h(
					'div',
					{
						slot: 'content',
						style: 'margin-bottom:5px',
					},
					'节点有资源缓存时，切换至CDN加速通道所产生的CDN加速流量'
				),
			];
			const paymentContent = h(
				'div',
				{
					slot: 'content',
				},
				'节点无资源缓存时，切换至CDN加速通道所产生的的CDN加速流量'
			);
			return h('div', [
				h('span', column.label),
				h(
					'el-tooltip',
					{
						props: {
							placement: 'top',
						},
					},
					[
						column.label == '节点有资源时CDN加速流量（%）'
							? serviceContent
							: paymentContent,
						h('i', {
							class: 'el-icon-warning-outline',
							style: 'color:orange;margin-left:5px;',
						}),
					]
				),
			]);
		},
		handleCurrentChange1(pages) {
			this.pageNo1 = pages;
			//   this.querySdkflowTable();
		},
		//获取页码
		handleCurrentChange(pages) {
			this.pageNo = pages;
			this.getbot();
		},
		handleSizeChange1(pagetol) {
			//this.pagesize = pagetol;
			// this.getuserlist();
		},

		onChanges() {
			if (this.activeName == 'second') {
				this.queryDataFlowLocation();
			} else if (this.activeName == 'threed') {
				this.pageNo1 = 1;
				this.querySdkflow();
				// this.querySdkflowTable();
			} else {
				this.querySdkflowControl();
			}
		},

		select_time() {
			if (this.radio == 1) {
				this.showzdy = false;
				this.activeName == 'second'
					? this.today(2)
					: this.activeName == 'threed'
					? this.today(3)
					: this.today(4);
			} else if (this.radio == 2) {
				this.showzdy = false;
				this.activeName == 'second'
					? this.yesterday(2)
					: this.activeName == 'threed'
					? this.yesterday(3)
					: this.yesterday(4);
			} else if (this.radio == 3) {
				this.showzdy = false;
				this.activeName == 'second'
					? this.sevendat(2)
					: this.activeName == 'threed'
					? this.sevendat(3)
					: this.sevendat(4);
			} else if (this.radio == 4) {
				this.showzdy = false;
				this.activeName == 'second'
					? this.thirtyday(2)
					: this.activeName == 'threed'
					? this.thirtyday(3)
					: this.thirtyday(4);
			} else if (this.radio == 5) {
				this.showzdy = true;
				this.val2 = "";
			}
		},

		setZdy() {
			this.showzdy = !this.showzdy;
			this.radio = 1;
			this.activeName == 'threed' ? this.today(3) : this.today(4);
		},

		//获取每页数量
		handleSizeChange(pagetol) {
			//this.pagesize = pagetol;
			// this.getuserlist();
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
					this.hashidSets1 = list;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//流量占比图标
		querySdkflow() {
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			let nowtime = parseInt(new Date().getTime() / 1000);
			params.startTs = this.starttime;
			params.endTs = this.endtime < nowtime ? this.endtime : nowtime;
			// params.chanId = this.chanid + "";
			if (this.valuea1) {
				params.urlName = this.valuea1;
			} else {
				params.urlName = '*';
			}
			if (this.value1Activechanid !== '') {
				params.channelId = this.value1Activechanid;
			} else {
				params.channelId = '*';
			}
			if (this.value1acce1 !== '') {
				params.terminalName = parseInt(this.value1acce1);
			} else {
				params.terminalName = -1;
			}
			if (this.valueChanel !== '') {
				params.ipfsChannel = this.valueChanel;
			} else {
				params.ipfsChannel = '*';
			}

			if (this.value1Activechanidactive !== '') {
				params.domain = this.value1Activechanidactive;
			} else {
				params.domain = '*';
			}

			params.timeUnit = 5;

			this.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			sdk_flow(params)
				.then((res) => {
					if (res.status == 0) {
						// var num = res.data.pdataArray;
						// var num1 = res.data.cdataArray;
						// if (num !== 0) {
						//   var max = Math.max.apply(null, num);
						// } else if (num1 !== 0) {
						//   var max = Math.max.apply(null, num);
						// }
						// //  max = Math.max.apply(null, num);
						// this.flowunit = this.common.formatByteActiveunit(max);
						this.totalp2p = res.data.totalp2p;
						this.totalcdn = res.data.totalcdn;
						if (
							[
								...res.data.pdataArray,
								...res.data.cdnpassivearray,
								...res.data.cdnaactivearray,
							].length == 0
						) {
							this.flowunit = 'B';
						} else {
							var max = _.max([
								...res.data.pdataArray,
								...res.data.cdnpassivearray,
								...res.data.cdnaactivearray,
							]);
							this.flowunit = this.common.formatByteActiveunit(
								max
							);
						}
						this.timeArrayZb = [];
						this.timeArrayZb1 = [];
						this.dataZb1 = [];
						this.dataZb2 = [];
						this.dataZb3 = [];
						this.dataZb4 = [];
						this.dataZb5 = [];
						this.dataZb6 = [];
						if (
							res.data.pdataArray.length == 0 &&
							res.data.cdnpassivearray.length == 0 &&
							res.data.cdnaactivearray.length == 0
						) {
							let arr = splitTimes(
								this.starttime,
								this.endtime,
								params.timeUnit
							);
							if (params.timeUnit == 120) {
								arr.forEach((item, index) => {
									this.timeArrayZb.push(getymdtime1(item));
								});
							} else {
								arr.forEach((item, index) => {
									this.timeArrayZb.push(getymdtime1(item, 1));
								});
							}
							this.dataZb1 = _.fill(Array(arr.length), 0);
							this.dataZb2 = _.fill(Array(arr.length), 0);
							this.dataZb3 = _.fill(Array(arr.length), 0);
							this.dataZb4 = _.fill(Array(arr.length), 0);
							this.dataZb5 = _.fill(Array(arr.length), 0);
							this.dataZb6 = _.fill(Array(arr.length), 0);
							this.dataAry = _.fill(Array(arr.length), 0);
							this.dataAry1 = _.fill(Array(arr.length), 0);
							this.dataAry2 = _.fill(Array(arr.length), 0);
							this.dataAry3 = _.fill(Array(arr.length), 0);
							this.dataAry4 = _.fill(Array(arr.length), 0);
							this.dataAry5 = _.fill(Array(arr.length), 0);
						} else {
							if (params.timeUnit == 120) {
								res.data.timearray.forEach((item, index) => {
									this.timeArrayZb.push(getymdtime1(item));
								});
							} else {
								res.data.timearray.forEach((item, index) => {
									this.timeArrayZb.push(
										getymdtime1(item, 11)
									);
								});
							}

							this.dataZb1 = res.data.cdnaactivepercent;
							this.dataZb2 = res.data.cdnpassivepercent;
							this.dataZb3 = res.data.p2parray;
							this.dataZb4 = res.data.nodepercent
								? res.data.nodepercent
								: [];
							this.dataZb5 = res.data.overtimepercent
								? res.data.overtimepercent
								: [];
							this.dataZb6 = res.data.otherpercent
								? res.data.otherpercent
								: [];

							this.dataAry = res.data.cdnaactivearray;
							this.dataAry1 = res.data.cdnpassivearray;
							this.dataAry2 = res.data.pdataArray;
							this.dataAry3 = res.data.nodearray
								? res.data.nodearray
								: [];
							this.dataAry4 = res.data.overtimearray
								? res.data.overtimearray
								: [];
							this.dataAry5 = res.data.otherarray
								? res.data.otherarray
								: [];
						}
						this.drawLine2(
							this.timeArrayZb,
							this.dataZb1,
							this.dataZb2,
							this.dataZb3
						);
						//2021-01-27日之前数据格式不一样
						// if (params.startTs < 1611676800) {
						// 	this.drawLine2(
						// 		this.timeArrayZb,
						// 		this.dataZb1,
						// 		this.dataZb2,
						// 		this.dataZb3
						// 	);
						// } else {
						// 	this.drawLine2(
						// 		this.timeArrayZb,
						// 		this.dataZb1,
						// 		this.dataZb2,
						// 		this.dataZb3,
						// 		this.dataZb4,
						// 		this.dataZb5,
						// 		this.dataZb6
						// 	);
						// }
					}
				})
				.catch((error) => {});
		},
		//流量占比表
		querySdkflowTable() {
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			// params.chanId = this.chanid + "";
			if (this.valuea1) {
				params.urlName = this.valuea1;
			} else {
				params.urlName = '*';
			}
			if (this.value1Activechanid !== '') {
				params.channelId = this.value1Activechanid;
			} else {
				params.channelId = '*';
			}
			if (this.value1acce1 !== '') {
				params.terminalName = parseInt(this.value1acce1);
			} else {
				params.terminalName = -1;
			}
			if (this.valueChanel !== '') {
				params.ipfsChannel = this.valueChanel;
			} else {
				params.ipfsChannel = '*';
			}
			if (this.value1Activechanidactive !== '') {
				params.domain = this.value1Activechanidactive;
			} else {
				params.domain = '*';
			}

			(params.pageNo = this.pageNo1 - 1),
				(params.pageSize = this.pageSize1),
				// params.domain="*"
				(params.timeUnit = this.common.timeUnitActive(
					this.starttime,
					this.endtime
				));

			this.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);

			sdk_flow_table(params)
				.then((res) => {
					if (res.status == 0) {
						this.tableZb = [];
						this.tableZb = res.data.list;
						this.total_cnt1 = res.data.totalCnt;
					}
				})
				.catch((error) => {});
		},

		//流量监控图表
		querySdkflowControl() {
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			// params.chanId = this.chanid + "";
			if (this.valuea1) {
				params.urlName = this.valuea1;
			} else {
				params.urlName = '*';
			}
			if (this.value1Activechanid !== '') {
				params.channelId = this.value1Activechanid;
			} else {
				params.channelId = '*';
			}
			// if (this.value1acce1 !== "") {
			//   params.terminalName = parseInt(this.value1acce1);
			// } else {
			//   params.terminalName = -1;
			// }
			if (this.valueChanel1 !== '') {
				params.ipfsChannel = this.valueChanel1;
			} else {
				params.ipfsChannel = '*';
			}
			if (this.value1Activechanidactive !== '') {
				params.domain = this.value1Activechanidactive;
			} else {
				params.domain = '*';
			}

			// params.pageNo= 0,
			// params.pageSize= 10,
			// params.domain="*"
			params.timeUnit = 5;

			this.timeUnit = this.common.timeUnitActive1(
				this.starttime,
				this.endtime
			);

			sdk_flow_control(params)
				.then((res) => {
					if (res.status == 0) {
						if (
							[
								...res.data.iospstreamarray,
								...res.data.ioscstreamarray,
								...res.data.andriodpstreamarray,
								...res.data.andriodcstreamarray,
							].length == 0
						) {
							this.flowunit = 'B';
						} else {
							var max = _.max([
								...res.data.iospstreamarray,
								...res.data.ioscstreamarray,
								...res.data.andriodpstreamarray,
								...res.data.andriodcstreamarray,
							]);
							this.flowunit = this.common.formatByteActiveunit(
								max
							);
						}

						this.timeArrayJk = [];
						this.dataJk1 = [];
						this.dataJk2 = [];
						this.dataJk3 = [];
						this.dataJk4 = [];

						if (
							res.data.iospstreamarray.length == 0 &&
							res.data.ioscstreamarray.length == 0 &&
							res.data.andriodpstreamarray.length == 0 &&
							res.data.andriodcstreamarray.length == 0
						) {
							let arr = splitTimes(
								this.starttime,
								this.endtime,
								params.timeUnit
							);
							if (params.timeUnit == 60) {
								arr.forEach((item, index) => {
									this.timeArrayJk.push(getymdtime1(item));
								});
							} else {
								arr.forEach((item, index) => {
									this.timeArrayJk.push(getymdtime1(item, 1));
								});
							}
							this.dataJk1 = _.fill(Array(arr.length), 0);
							this.dataJk2 = _.fill(Array(arr.length), 0);
							this.dataJk3 = _.fill(Array(arr.length), 0);
							this.dataJk4 = _.fill(Array(arr.length), 0);
						} else {
							res.data.iospstreamarray.forEach((item, index) => {
								this.dataJk1.push(
									this.common.formatByteNum(
										item * 1,
										this.flowunit
									)
								);
							});
							res.data.ioscstreamarray.forEach((item, index) => {
								this.dataJk2.push(
									this.common.formatByteNum(
										item * 1,
										this.flowunit
									)
								);
							});
							res.data.andriodpstreamarray.forEach(
								(item, index) => {
									this.dataJk3.push(
										this.common.formatByteNum(
											item * 1,
											this.flowunit
										)
									);
								}
							);
							res.data.andriodcstreamarray.forEach(
								(item, index) => {
									this.dataJk4.push(
										this.common.formatByteNum(
											item * 1,
											this.flowunit
										)
									);
								}
							);

							res.data.timeArray.forEach((item, index) => {
								this.timeArrayJk.push(getymdtime1(item));
							});
						}
						// this.dataJk1 = res.data.iospstreamarray;
						// this.dataJk2 = res.data.ioscstreamarray;
						// this.dataJk3 = res.data.andriodpstreamarray;
						// this.dataJk4 = res.data.andriodcstreamarray;
						this.drawLine3(
							this.timeArrayJk,
							this.dataJk1,
							this.dataJk2,
							this.dataJk3,
							this.dataJk4
						);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},

		//播放流量分布图
		queryDataFlowLocation() {
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			params.startTs = this.starttime;
			params.endTs = this.endtime;

			if (this.value1Activechanid !== '') {
				params.channelId = this.value1Activechanid;
			} else {
				params.channelId = '*';
			}

			query_dataflow_location_curve(params)
				.then((res) => {
					if (res.status == 0) {
						this.locationCurveList = res.data.curveList; // res.data.curveList;
						this.locationMax =
							this.radioPlayFlow == 1
								? _.max(
										res.data.curveList.map(
											(v) => v.p2p_flow
										)
								  )
								: _.max(
										res.data.curveList.map(
											(v) => v.cdn_flow
										)
								  );
						this.drawLine();
					}
				})
				.catch((error) => {
					console.log(error);
				});

			query_dataflow_location_table(params)
				.then((res) => {
					if (res.status == 0) {
						this.locationTableList = res.data.tableList.map(
							(v, i) => {
								v.index = i + 1;
								return v;
							}
						);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//流量监控导出
		exoprtant_Ll() {
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			// params.chanId = this.chanid + "";
			if (this.valuea1) {
				params.urlName = this.valuea1;
			} else {
				params.urlName = '*';
			}
			if (this.value1Activechanid !== '') {
				params.channelId = this.value1Activechanid;
			} else {
				params.channelId = '*';
			}
			// if (this.value1acce1 !== "-1") {
			//   params.terminalName = parseInt(this.value1acce1);
			// } else {
			//   params.terminalName = -1;
			// }

			if (this.valueChanel1 !== '') {
				params.ipfsChannel = this.valueChanel1;
			} else {
				params.ipfsChannel = '*';
			}

			if (this.value1Activechanidactive !== '') {
				params.domain = this.value1Activechanidactive;
			} else {
				params.domain = '*';
			}

			// params.pageNo= 0,
			// params.pageSize= 10,
			// params.domain="*"
			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);

			export_sdk_flow_control_file(params)
				.then((res) => {
					if (res.status == 0) {
						window.open(res.msg, '_blank');
					}
				})
				.catch((err) => {});
		},

		//流量占比导出
		exoprtant_Zb() {
			let params = new Object();
			params.useCache = this.useCache == true ? 1 : 0;
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			// params.chanId = this.chanid + "";
			if (this.valuea1) {
				params.urlName = this.valuea1;
			} else {
				params.urlName = '*';
			}
			if (this.value1Activechanid !== '') {
				params.channelId = this.value1Activechanid;
			} else {
				params.channelId = '*';
			}
			if (this.value1acce1 !== '') {
				params.terminalName = parseInt(this.value1acce1);
			} else {
				params.terminalName = -1;
			}
			if (this.valueChanel !== '') {
				params.ipfsChannel = this.valueChanel;
			} else {
				params.ipfsChannel = '*';
			}
			if (this.value1Activechanidactive !== '') {
				params.domain = this.value1Activechanidactive;
			} else {
				params.domain = '*';
			}

			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			export_sdk_flow_table_file(params)
				.then((res) => {
					if (res.status == 0) {
						window.open(res.msg, '_blank');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},

		showzdyzs() {
			this.showzdyz = !this.showzdyz;
		},
		showzdyx() {
			this.shoudzyx = !this.shoudzyx;
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
			if (data == 2) {
				this.queryDataFlowLocation();
			} else if (data == 3) {
				this.querySdkflow();
				// this.querySdkflowTable();
			} else if (data == 4) {
				this.querySdkflowControl();
			}
		},
		//重置--播放流量占比
		reset_one() {
			this.value1Activechanid = '';
			this.value1Activechanidactive = '';
			this.valuea1 = '';
			this.value1acce1 = '';
			this.valueChanel = '';
			this.radio = 1;
			this.pageNo = 1;
			this.select_time();
		},
		//重置--播放流量占比
		reset_two() {
			this.value1Activechanid = '';
			this.value1Activechanidactive = '';
			this.valuea1 = '';
			this.valueChanel1 = '';
			this.radio = 1;
			this.pageNo = 1;
			this.select_time();
		},
		//今天
		today(data) {
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times;
			this.endtime = Date.parse(new Date()) / 1000;
			this.timeUnit = 60;
			this.pageNo = 1;
			if (data == 2) {
				this.queryDataFlowLocation();
			} else if (data == 3) {
				this.querySdkflow();
				// this.querySdkflowTable();
			} else if (data == 4) {
				this.querySdkflowControl();
			}
		},
		//昨天
		yesterday(data) {
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times - 24 * 60 * 60 * 1;
			this.endtime = times - 1;
			this.timeUnit = 60;
			this.pageNo = 1;
			if (data == 2) {
				this.queryDataFlowLocation();
			} else if (data == 3) {
				this.querySdkflow();
				// this.querySdkflowTable();
			} else if (data == 4) {
				this.querySdkflowControl();
			}
		},
		//七天
		sevendat(data) {
			let times = parseInt(
				new Date(new Date().toLocaleDateString()).getTime() / 1000
			);
			this.endtime = parseInt(new Date(new Date()).getTime() / 1000);
			this.starttime = times - 24 * 60 * 60 *6;
			this.timeUnit = 60 * 24;
			this.pageNo = 1;
			if (data == 2) {
				this.queryDataFlowLocation();
			} else if (data == 3) {
				this.querySdkflow();
				// this.querySdkflowTable();
			} else if (data == 4) {
				this.querySdkflowControl();
			}
		},
		//三十天
		thirtyday(data) {
			let times = parseInt(
				new Date(new Date().toLocaleDateString()).getTime() / 1000
			);
			this.endtime = parseInt(new Date(new Date()).getTime() / 1000);
			this.starttime = times - 24 * 60 * 60 * 29;
			this.timeUnit = 60 * 24;
			this.pageNo = 1;
			if (data == 2) {
				this.queryDataFlowLocation();
			} else if (data == 3) {
				this.querySdkflow();
				// this.querySdkflowTable();
			} else if (data == 4) {
				this.querySdkflowControl();
			}
		},
		//自定义时间
		gettimes(cal) {
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = this.val2 ? parseInt(this.val2/1000) : times;
				this.endtime = this.starttime+86399;
            this.timeUnit = 5;
			this.pageNo = 1;
			if (this.activeName == 'second') {
				this.queryDataFlowLocation();
			} else if (this.activeName == 'threed') {
				this.querySdkflow();
				// this.querySdkflowTable();
			} else {
				this.querySdkflowControl();
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
		//选项卡

		handleClick(tab, event) {
			this.useCache = true;
			this.val2 = [];
			this.radio = 1;
			this.hashidSet = [];
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times;
			this.showzdy = false;
			this.endtime = Date.parse(new Date()) / 1000;
			this.options3 = [];
			this.totalp2p = 0;
			this.totalcdn = 0;
			if (tab.index == 0) {
				this.value1Activechanid = '';
				this.valuea1 = '';
				this.value1Activechanidactive = '';
				this.valueChanel = '';
				this.value1acce1 = '';
				this.querySdkflow();
				let _this = this;
				this.$nextTick(() => {
					_this.querySdkflow();
					//   _this.querySdkflowTable();
					// console.log(this.$refs['hello']);
				});
			} else if (tab.index == 1) {
				this.queryDataFlowLocation();
				this.$nextTick(() => {
					this.drawLine();
				});
			} else if (tab.index == 2) {
				// this.getseachlabel1();
				this.value1Activechanid = '';
				this.valuea1 = '';
				this.value1Activechanidactive = '';
				this.valueChanel = '';
				this.value1acce1 = '';
				let _this = this;
				_this.querySdkflowControl();
			}
		},

		handleClick1() {
			if (this.radioPlayFlow == 1) {
				this.locationMax = _.max(
					this.locationCurveList.map((v) => v.p2p_flow)
				);
				this.drawLine();
			} else {
				this.locationMax = _.max(
					this.locationCurveList.map((v) => v.cdn_flow)
				);
				this.drawLine();
			}
		},

		drawLine() {
			let data = [];
			let curveList = this.locationCurveList.sort((a, b) => {
				return this.radioPlayFlow == 1
					? b.p2p_flow - a.p2p_flow
					: b.cdn_flow - a.cdn_flow;
			});
			curveList.forEach((v) => {
				let obj = {};
				obj.name = v.region;
				obj.value = this.radioPlayFlow == 1 ? v.p2p_flow : v.cdn_flow;
				data.push(obj);
			});
			let myChart = this.$echarts.init(
				document.getElementById('myChartMap1')
			);
			window.onresize = myChart.resize;
			let options = {
				tooltip: {
					formatter: function(params, ticket, callback) {
						let value = params.value
							? common.formatByteActive(params.value)
							: 0;
						return (
							params.name +
							'<br />' +
							params.seriesName +
							'：' +
							value
						);
					},
				},
				visualMap: {
					min: 0,
					max: 1024 * 1024 * 500,
					left: 'left',
					top: 'bottom',
					text: ['高', '低'],
					inRange: {
						color: ['#e0ffff', '#006edd'],
					},
					show: true,
				},
				geo: {
					map: 'china',
					roam: false,
					zoom: 1.23,
					label: {
						normal: {
							show: true,
							fontSize: '10',
							color: 'rgba(0,0,0,0.7)',
						},
					},
					itemStyle: {
						normal: {
							borderColor: 'rgba(0, 0, 0, 0.2)',
						},
						emphasis: {
							areaColor: '#F3B329',
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							shadowBlur: 20,
							borderWidth: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
				},
				series: [
					{
						name: '播放流量',
						type: 'map',
						geoIndex: 0,
						data: data,
					},
				],
			};
			myChart.setOption(options);
		},

		drawLine2(x, y, z, a, n, o, v) {
			for (var i = 0; i < y.length; i++) {
				y[i] = (y[i] * 100).toFixed(2);
			}
			for (var i = 0; i < z.length; i++) {
				z[i] = (z[i] * 100).toFixed(2);
			}
			for (var i = 0; i < a.length; i++) {
				a[i] = (a[i] * 100).toFixed(2);
			}
			if (n && o && v) {
				for (var i = 0; i < n.length; i++) {
					n[i] = (n[i] * 100).toFixed(2);
				}
				for (var i = 0; i < o.length; i++) {
					o[i] = (o[i] * 100).toFixed(2);
				}
				for (var i = 0; i < v.length; i++) {
					v[i] = (v[i] * 100).toFixed(2);
				}
			}

			let _this = this;
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(
				document.getElementById('myChartMap2')
			);
			myChart.off('click'); // 这里很重要！！！
			window.onresize = myChart.resize;
			// 绘制图表
			let options = {
				title: {
					text: '流量占比',
					left: '12px',
					textStyle: {
						color: '#333333',
						fontSize: 16,
					},
				},
				toolbox: {
					//show: true,
					itemSize: 20,
					itemGap: 30,
					right: 50,
					feature: {
						mydow: {
							show: true,
							title: '导出',
							icon:
								'path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z',
							onclick: function() {
								_this.exoprtant_Zb();
							},
						},
					},
				},
				legend: {
					// orient: 'vertical',
					x: 'center', //可设定图例在左、右、居中
					y: 'bottom', //可设定图例在上、下、居中
					padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
					data: [],
				},
				grid: {
					left: '3%', // 默认10%，给24就挺合适的。
					top: 60, // 默认60
					right: 35, // 默认10%
					bottom: 100, // 默认60
				},
				xAxis: {
					data: x,
					splitLine: {
						show: false,
					},
				},
				yAxis: {
					max: 100,
					splitLine: {
						show: false,
					},
				},
				series: [],
			};
			if (n && o && v) {
				options.legend.data = [
					'P2P播放流量',
					'CDN播放有源流量',
					'CDN播放无源流量(没有可用节点、打洞超时、其他)',
				];
				options.tooltip = {
					trigger: 'axis',
					formatter: function(params) {
						//  for(var i=0;i<_this.dataAry.length;i++){
						return (
							params[0].axisValue +
							'</br>' +
							params[0].marker +
							'P2P播放流量:' +
							_this.common.formatByteActive(
								_this.dataAry2[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb3[params[0].dataIndex] +
							'%' +
							')' +
							'<br>' +
							params[1].marker +
							'CDN播放有源流量:' +
							_this.common.formatByteActive(
								_this.dataAry[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb1[params[0].dataIndex] +
							'%' +
							')' +
							'</br>' +
							params[2].marker +
							'没有可用节点:' +
							_this.common.formatByteActive(
								_this.dataAry3[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb4[params[0].dataIndex] +
							'%' +
							')' +
							'</br>' +
							'&nbsp;&nbsp;&nbsp;&nbsp;' +
							'打洞超时:' +
							_this.common.formatByteActive(
								_this.dataAry4[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb5[params[0].dataIndex] +
							'%' +
							')' +
							'</br>' +
							'&nbsp;&nbsp;&nbsp;&nbsp;' +
							'其他:' +
							_this.common.formatByteActive(
								_this.dataAry5[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb6[params[0].dataIndex] +
							'%' +
							')'
						);
						// }
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
							normal: {
								color: '#D2E9FF',
								borderColor: '#fff',
								borderWidth: 1,
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
						name: 'CDN播放有源流量',
						type: 'bar',
						stack: '使用情况',
						data: y,
						barMaxWidth: 30, //柱图宽度
						itemStyle: {
							normal: {
								color: '#84C1FF',
								borderColor: '#fff',
								borderWidth: 1,
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
						name: 'CDN播放无源流量(没有可用节点、打洞超时、其他)',
						type: 'bar',
						stack: '使用情况',
						data: n,
						barMaxWidth: 30, //柱图宽度
						itemStyle: {
							normal: {
								color: '#00a1ff',
								borderColor: '#fff',
								borderWidth: 1,
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
						name: 'CDN播放无源流量(没有可用节点、打洞超时、其他)',
						type: 'bar',
						stack: '使用情况',
						data: o,
						barMaxWidth: 30, //柱图宽度
						itemStyle: {
							normal: {
								color: '#00a1ff',
								borderColor: '#fff',
								borderWidth: 1,
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
						name: 'CDN播放无源流量(没有可用节点、打洞超时、其他)',
						type: 'bar',
						stack: '使用情况',
						data: v,
						barMaxWidth: 30, //柱图宽度
						itemStyle: {
							normal: {
								color: '#00a1ff',
								borderColor: '#fff',
								borderWidth: 1,
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
			} else {
				options.legend.data = [
					'P2P播放流量',
					'CDN播放有源流量',
					'CDN播放无源流量',
				];
				options.tooltip = {
					trigger: 'axis',
					formatter: function(params) {
						//  for(var i=0;i<_this.dataAry.length;i++){
						return (
							params[0].axisValue +
							'</br>' +
							params[0].marker +
							'P2P播放流量:' +
							_this.common.formatByteActive(
								_this.dataAry2[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb3[params[0].dataIndex] +
							'%' +
							')' +
							'<br>' +
							params[1].marker +
							'CDN播放有源流量:' +
							_this.common.formatByteActive(
								_this.dataAry[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb1[params[0].dataIndex] +
							'%' +
							')' +
							'</br>' +
							params[2].marker +
							'CDN播放无源流量:' +
							_this.common.formatByteActive(
								_this.dataAry1[params[0].dataIndex]
							) +
							'(' +
							_this.dataZb2[params[0].dataIndex] +
							'%' +
							')'
						);
						// }
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
			}
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

		drawLine3(a, b, c, d, e) {
			var dataTime = a;

			let _this = this;
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(
				document.getElementById('myChartMap3')
			);
			window.onresize = myChart.resize;
			// 绘制图表
			let options = {
				title: {
					text: '流量监控',
					left: '12px',
					textStyle: {
						color: '#333333',
						fontSize: 16,
					},
				},
				toolbox: {
					//show: true,
					itemSize: 20,
					itemGap: 30,
					right: 50,
					feature: {
						mydow: {
							show: true,
							title: '导出',
							icon:
								'path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z',
							onclick: function() {
								_this.exoprtant_Ll();
							},
						},
					},
				},
				legend: {
					// orient: 'vertical',
					x: 'center', //可设定图例在左、右、居中
					y: 'bottom', //可设定图例在上、下、居中
					padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
					data: ['IOS-P2P', 'IOS-CDN', 'Android-P2P', 'Android-CDN'],
				},
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						let str = '';
						params.forEach((item, index) => {
							if (index == 0) {
								str +=
									item.axisValue +
									'</br>' +
									item.seriesName +
									'：' +
									item.value +
									_this.flowunit +
									'</br>';
							} else {
								str +=
									item.seriesName +
									'：' +
									item.value +
									_this.flowunit +
									'</br>';
							}
						});
						return str;
					},
				},
				grid: {
					left: '4%', // 默认10%，给24就挺合适的。
					top: 60, // 默认60
					right: 35, // 默认10%
					bottom: 100, // 默认60
				},
				xAxis: {
					data: a,
					splitLine: {
						show: false,
					},
				},
				yAxis: {
					name: _this.flowunit,
				},
				series: [
					{
						name: 'IOS-P2P',
						type: 'line',
						stack: '使用情况',
						data: b,
						smooth: false,
						symbol: 'star', //拐点样式
						symbolSize: 8, //拐点大小
						itemStyle: {
							normal: { color: '#E8505B' },
						},
						label: {
							normal: {
								show: false,
								position: 'insideRight',
							},
						},
					},
					{
						name: 'IOS-CDN',
						type: 'line',
						stack: '使用情况',
						data: c,
						smooth: false,
						symbol: 'triangle', //拐点样式
						symbolSize: 8, //拐点大小
						itemStyle: {
							normal: { color: '#14B1AB' },
						},
						label: {
							normal: {
								show: false,
								position: 'insideRight',
							},
						},
					},
					{
						name: 'Android-P2P',
						type: 'line',
						stack: '使用情况',
						data: d,
						smooth: false,
						symbol: 'pin', //拐点样式
						symbolSize: 8, //拐点大小
						itemStyle: {
							normal: { color: '#F2C33C' },
						},
						label: {
							normal: {
								show: false,
								position: 'insideRight',
							},
						},
					},
					{
						name: 'Android-CDN',
						type: 'line',
						stack: '使用情况',
						data: e,
						smooth: false,
						itemStyle: {
							normal: { color: '#5970CC' },
						},
						label: {
							normal: {
								show: false,
								position: 'insideRight',
							},
						},
					},
				],
			};
			myChart.setOption(options);
		},
	},
};
</script>

<style lang="scss">
.myself-container {
	// width: 100%;
	min-width: 1250px;

	.device_form {
		width: auto;
		height: auto;
		margin-top: 15px;
		background: #ffffff;
		padding: 15px 30px;
		box-sizing: border-box;
		 box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
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
	}

	.devide_table {
		padding: 35px;
		height: auto;
		margin: 15px 0;
		background: #ffffff;
		border-radius: 2px;
		 box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
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
	 box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
	border-radius: 2px;
	margin-top: 15px;

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
