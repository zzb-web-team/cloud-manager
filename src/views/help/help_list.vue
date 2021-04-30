<template>
	<div class="con">
		<div class="con_top">
			<div class="top_title">帮助中心</div>
			<div class="title_seach">
				<el-input
					v-model="val_name"
					placeholder="请输入标题"
					@change="onChanges"
					style="width:15%;max-width:300px;margin-right:10px;"
				></el-input>
				<el-button type="primary"  @click="onChanges"
					>查询</el-button
				>
				<el-button  @click="reset">重置</el-button>
			</div>
		</div>
		<div class="table_con" ref="box_rHeight">
			<div class="content_top">
				<el-button  type="primary" @click="go_edit"
					>添加</el-button
				>
			</div>
			<el-table
				:data="tableData"
				stripe
				border
				style="width: 100%"
				:cell-style="rowClass"
				:header-cell-style="headClass"
			>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="title" label="标题"> </el-table-column>
				<el-table-column prop="content" label="内容"> </el-table-column>
				<el-table-column prop="url" label="跳转"></el-table-column>
				<el-table-column prop="sort" label="排序" width="100">
				</el-table-column>
				<el-table-column prop="state" label="状态" width="100">
					<template slot-scope="scope">
						<el-switch
							active-color="#13ce66"
							active-value="0"
							inactive-value="1"
							v-model="scope.row.state"
						></el-switch>
					</template>
				</el-table-column>
				<el-table-column
					prop="create_time"
					label="创建时间"
					width="160"
				>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="260">
					<template slot-scope="scope">
						<el-button
							@click="handleClick(scope.row)"
							type="text"
							size="small"
							>查看详情</el-button
						>
						<el-button
							type="text"
							size="small"
							@click="handleClick(scope.row, 'update')"
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
			pageNo: 1, //当前页码
			pageSize: 10, //每页数量
			total_cnt: 0, //数据总量
			starttime: '',
			endtime: '',
			tableData: [
				{
					title: '王小虎',
					content:
						'你都弄额父母闹南方欧尼发哦您发啊您发妈妈网地方三怄气南磨房，非农你去问，放弃no，抚摸其你',
					url: 'http://www.yess.com',
					sort: 1,
					state: '0',
					create_time: '2021-08-03 11:30:00',
				},
				{
					title: '张三',
					content:
						'你都弄额父母闹南方欧尼发哦您发啊您发妈妈网地方三怄气南磨房，非农你去问，放弃no，抚摸其你',
					url: 'http://www.yess.com',
					sort: 2,
					state: '0',
					create_time: '2021-08-03 11:30:00',
				},
				{
					title: '马小跳',
					content:
						'你都弄额父母闹南方欧尼发哦您发啊您发妈妈网地方三怄气南磨房，非农你去问，放弃no，抚摸其你',
					url: 'http://www.yess.com',
					sort: 3,
					state: '1',
					create_time: '2021-08-03 11:30:00',
				},
				{
					title: '嘟嘟',
					content:
						'你都弄额父母闹南方欧尼发哦您发啊您发妈妈网地方三怄气南磨房，非农你去问，放弃no，抚摸其你',
					url: 'http://www.yess.com',
					sort: 4,
					state: '1',
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
				that.clientHeight - 290 + 'px';
			that.$refs.box_rHeight.style.minHeight = 500 + 'px';
		}
	},
	methods: {
		go_edit() {
			this.$router.push({ path: '/help_edit' });
		},
		onChanges() {},
		reset() {},
		handleClick(row, type) {
			if (type) {
				this.$router.push({
					path: '/help_edit',
					query: { data: JSON.stringify(row) },
				});
			} else {
				this.$router.push({
					path: '/help_edit',
					query: { data: JSON.stringify(row) },
				});
			}
		},
		//删除
		deleteRow(rows) {
			console.log(rows);
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
				this.$refs.box_rHeight.style.height = data - 290 + 'px';
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
.con {
	margin: 30px 25px;
	text-align: left;
	background-color: #fff;
	.con_top {
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		box-sizing: border-box;
		padding: 20px 30px 0 30px;
		.title_seach {
			display: flex;
			justify-content: start;
			align-items: center;
			line-height: 100px;
			white-space: nowrap;
		}
	}
	.table_con {
		margin-top: 15px;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		flex: 1;
		box-shadow: 0px 0px 6px 0px rgba(51, 51, 51, 0.16);
		padding: 30px;
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
