<template>
	<div class="myownStyle">
		<el-row class="container">
			<el-col :span="24" class="header">
				<el-col
					:span="10"
					class="logo"
					:class="collapsed ? 'logo-collapse-width' : 'logo-width'"
				>
					<div
						style="fontSize:20px;color:#000;color:#ffffff;background: #297aff;"
					>
						云点播管理平台
					</div>
				</el-col>
				<el-col :span="4">
					<el-radio-group
						v-model="menu_type"
						class="my_radio"
						@change="change_tab('lable')"
					>
						<el-radio-button label="管理中心"></el-radio-button>
						<el-radio-button label="数据中心"></el-radio-button>
					</el-radio-group>
				</el-col>
				<el-col :span="4" class="userinfo">
					<el-dropdown trigger="hover">
						<span class="el-dropdown-link userinfo-inner">
							<img src="../assets/download.jpg" />
							{{ sysUserName }}
						</span>
						<el-dropdown-menu slot="dropdown">
							<!-- <el-dropdown-item @click.native="goLinkCenter">个人中心</el-dropdown-item> -->
							<!-- <el-dropdown-item>设置</el-dropdown-item> -->
							<el-dropdown-item divided @click.native="logout"
								>退出登录</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>
			<el-col :span="24" class="main" :style="{ height: clientHeight - 60 + 'px' }">
				<aside
					:class="collapsed ? 'menu-collapsed' : 'menu-expanded'"
					
				>
					<el-menu
						:default-active="$route.path"
						class="el-menu-vertical-demo"
						@open="handleopen"
						@close="handleclose"
						@select="handleselect"
						unique-opened
						router
					>
						<!-- 一级菜单 -->
						<template v-for="item in menu_list" v-if="!item.hidden">
							<p
								v-if="
									item.mate &&
										item.mate.title != '点播管理后台'
								"
								class="menus_title"
							>
								{{ item.mate.title }}
							</p>
							<el-submenu
								v-if="item.children && item.children.length"
								:index="item.path"
								:key="item.path"
								style="text-align: left;"
							>
								<template slot="title">
									<i
										:class="item.icon"
										style="margin-right: 10px;margin-left: 10px;"
									></i>
									<span>{{ item.name }}</span>
								</template>

								<!-- 二级菜单 -->
								<template
									v-for="itemChild in item.children"
									v-if="!itemChild.hidden"
								>
									<el-submenu
										v-if="
											itemChild.children &&
												itemChild.children.length
										"
										:index="itemChild.path"
										:key="itemChild.path"
									>
										<template slot="title">
											<i :class="itemChild.icon"></i>
											<div style="margin-left:20px;">
												<div
													style="display:inline-block;width:4px;height:4px;backgroundColor:rgba(102,102,102,1);border-radius:50%;margin-right: 5px;"
												></div>
												{{ itemChild.name }}
											</div>
										</template>

										<!-- 三级菜单 -->
										<el-menu-item
											v-for="itemChild_Child in itemChild.children"
											:index="itemChild_Child.path"
											:key="itemChild_Child.path"
											v-if="!itemChild_Child.hidden"
										>
											<i
												:class="itemChild_Child.icon"
											></i>
											<span
												style="margin-left:20px;"
												slot="title"
												>{{
													itemChild_Child.name
												}}</span
											>
										</el-menu-item>
									</el-submenu>

									<el-menu-item
										v-else
										:index="itemChild.path"
										:key="itemChild.path"
									>
										<i :class="itemChild.icon"></i>
										<div
											slot="title"
											style="margin-left:20px;"
										>
											<div
												style="display: inline-block;width:4px;height:4px;backgroundColor:rgba(102,102,102,1);border-radius:50%;margin-right: 5px;"
											></div>
											{{ itemChild.name }}
										</div>
									</el-menu-item>
								</template>
							</el-submenu>

							<el-menu-item
								v-else
								:index="item.path"
								:key="item.path"
							>
								<!-- <i :class="item.icon"></i> -->
								<span
									slot="title"
									v-if="item.name == '概览'"
									style="font-weight: 600;color: #6a6a6c;margin-left: 0;"
									>概览</span
								>
								<span slot="title" v-else>{{ item.name }}</span>
							</el-menu-item>
						</template>
						<p class="last_boder"></p>
					</el-menu>
				</aside>
				<section class="content-container" :style="{ height: clientHeight - 60 + 'px' }">
					<div
						class="grid-content bg-purple-light"
						style="width: 100%;margin: 0 auto;"
					>
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import base from '../components/base';
export default {
	mixins: [base],
	data() {
		return {
			menu_type: '管理中心',
			collapsed: false,
			sysUserName: '',
			menu_list: [],
			manage_list: [],
			data_list: [],
		};
	},
	mounted() {
		if (localStorage.getItem('menu_type')) {
			this.menu_type = localStorage.getItem('menu_type');
		}
		let _this = this;
		this.manage_list = this.$router.options.routes.filter(function(elem) {
			if (elem.name == '数据中心') {
				let b = true; //判断标识--只需要执行一次
				_this.data_list = elem.children.filter(function(item) {
					if (item.hidden != true && b == true) {
						item.mate = { title: '数据中心' };
						b = false;
					}
					return item.hidden != true;
				});
			}
			if (elem.hidden != true && elem.name != '数据中心') {
				return elem;
			}
		});
		this.change_tab();
		var user = localStorage.getItem('adminuser');
		if (user) {
			this.sysUserName = user || '';
		}
	},
	methods: {
		change_tab(label) {
			if (this.menu_type == '管理中心') {
				this.menu_list = this.manage_list;
			} else {
				this.menu_list = this.data_list;
			}
			localStorage.setItem('menu_type', this.menu_type);
			if (label) {
				this.$router.push(this.menu_list[0].path);
			}
		},
		handleopen() {},
		handleclose() {},
		goLinkCenter() {
			this.$router.push({
				path: '/user_center',
			});
		},
		handleselect: function(a, b) {},
		//退出登录
		logout: function() {
			var _this = this;
			this.$confirm('确认退出吗?', '提示', {
				type: 'warning',
			})
				.then(() => {
					sessionStorage.removeItem('user');
					sessionStorage.removeItem('id');
					localStorage.removeItem('menu_type');
					_this.$cookies.remove('adminuser');
					_this.$cookies.remove('adminid');
					_this.$cookies.remove('clouduser');
					localStorage.clear();
					// _this.$cookies.set("adminuser", "", 0);
					// _this.$cookies.set("adminid", "", 0);
					_this.$router.push('/');
				})
				.catch((error) => {});
		},
		//折叠导航栏
		collapse: function() {
			this.collapsed = !this.collapsed;
		},
	},
};
</script>

<style scoped lang="scss">
// @import "../assets/css/style/newstyle";

.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0;
	right: 0;
	width: 100%;
	margin: 0 auto;
	.header {
		height: 60px;
		line-height: 60px;
		//	background: $color-primary;
		color: #000;
		background: #297aff;
		position: fixed;
		top: 0;
		left: 0;
        z-index: 1100;
        overflow: hidden;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
			border-color: #eef1924d;
			border-right-width: 1px;
			border-right-style: solid;
			background: #ffffff;
			img {
				width: auto;
				float: left;
				margin: 10px 10px 10px 18px;
			}
			.txt {
				color: #fff;
			}
		}
		.logo-width {
			width: 230px;
			background: #297aff;
		}
		.logo-collapse-width {
			width: 60px;
		}
		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	.main {
		display: flex;
		// background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		// overflow: hidden;
		// min-height: 1180px;
		aside {
			flex: 0 0 230px;
			width: 230px;
			// position: absolute;
			// top: 0px;
			// bottom: 0px;
			.el-menu {
				height: 100%;
				text-align: center;
			}
			.collapsed {
				width: 60px;
				.item {
					position: relative;
				}
				.submenu {
					position: absolute;
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
			i {
				opacity: 0;
			}
		}
		.menu-collapsed {
			flex: 0 0 60px;
			width: 60px;
		}
		.menu-expanded {
			flex: 0 0 230px;
            width: 230px;
            height: 100%;
			//margin-top: -60px;
			// height: 1200px;
			overflow-y: scroll;
			.el-menu-vertical-demo::-webkit-scrollbar {
				display: none;
			}
		}
		.menu-expanded::-webkit-scrollbar {
			display: none;
		}
		.content-container {
			background: #ffffff;
			flex: 1;
			// position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			overflow-y: scroll;
			//padding: 20px;
			.breadcrumb-container {
				//margin-bottom: 15px;
				float: none !important;
				.title {
					width: 200px;
					float: left;
					color: #ffffff;
					text-align: left;
					font-size: 22px;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				// background-color: #272731;
				box-sizing: border-box;
				// color: #ffffff;
			}
		}
		.menus_title {
			display: inline-block;
			width: 100%;
			font-size: 14px;
			font-weight: bold;
			padding-top: 25px;
			padding-bottom: 10px;
			text-align: left;
			box-sizing: border-box;
			padding-left: 40px;
			position: relative;
			color: #6a6a6c;
		}
		.menus_title::before {
			content: ''; /*CSS伪类用法*/
			position: absolute; /*定位背景横线的位置*/
			width: 65%; /*宽和高做出来的背景横线*/
			height: 0.5px;
			background: #afafaf;
			top: 0px;
			z-index: 1;
		}
		.menus_title:first-child::before {
			content: ''; /*CSS伪类用法*/
			position: absolute; /*定位背景横线的位置*/
			width: 0; /*宽和高做出来的背景横线*/
			height: 0;
			background: #f5f5f5;
			top: 0;
			z-index: -1;
		}
		.last_boder {
			position: relative;
			&:after {
				content: ''; /*CSS伪类用法*/
				position: absolute; /*定位背景横线的位置*/
				width: 65%; /*宽和高做出来的背景横线*/
				height: 0.5px;
				background: #afafaf;
				top: 10px;
				left: 40px;
				z-index: 1;
			}
		}
	}
}

el-submenu {
	text-align: center;
}
</style>
