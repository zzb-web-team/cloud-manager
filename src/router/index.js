import Vue from "vue";
import Router from "vue-router";
import index from "@/views/index";
import log from "@/views/log";

//二级路由目录
import home from "@/views/menu/home";
import home_two from "@/views/menu/home_two";
import home_three from "@/views/menu/home_three";

//域名管理
import domain_management from "@/views/domain/domain_management.vue";
import accelerate_management from "@/views/domain/accelerate_management.vue";
import upload from "@/views/domain/upload.vue";
import add_url from "@/views/domain/add_url.vue";
import yure_management from "@/views/domain/yure_management.vue";
import yure_management1 from "@/views/domain/yure_management1.vue";
import batch_management from "@/views/domain/batch_management.vue";
import back_source from "@/views/domain/back_source.vue";
import copy from "@/views/domain/copy_configuration.vue";
//用户
import user from "@/views/account/user";
import userli from "@/views/account/userli";
import user_center from "@/views/account/user_center";


//用户管理
import operating_user from "@/views/oper_user/operating_user";
import useInfo from "@/views/oper_user/useInfo";

//ptfs节点信息
import node_information from "@/views/ipfs_node/node_information";
//ipfs节点应用
import fs_storage from "@/views/ipfs_application/fs_storage";
import ipflow from "@/views/ipfs_application/ipflow";

//操作管理
import operation_management from "@/views/operating/operation_management";

//IPFS数据统计

import nodeMap1 from "@/views/nodeApplication/nodeMap1";
import statistics from "@/views/nodeApplication/statistics";
import downloadLogs from "@/views/nodeApplication/downloadLogs";

//用量查询
import usageindex from "@/views/usage/usageindex";
import nodeindex from "@/views/usage/nodeindex";

//节点统计
import trafficMonitor from "@/views/statistics/node-traffic-monitoring";
import trafficUsage from "@/views/statistics/node-traffic-usage";

//播放统计
import visitStatistics from "@/views/statistics/visit-statistics";
import playTraffic from "@/views/statistics/play-traffic";
import playDetails from "@/views/statistics/play-details-statistics";

//sdk统计
import sdkStatistics from "@/views/statistics/sdk-statistics";


//未处理访问请求
import unprocessedVisits from "@/views/utreated/unprocessed_visits.vue";
import unprocessedTab from "@/views/utreated/unprocessed_tab.vue";

//流量包管理
import traffic_list from "@/views/traffic_package/traffic_list.vue";
import traffic_configuration from "@/views/traffic_package/traffic_configuration.vue";


//订单管理
import order_list from "@/views/order/order_list.vue";
import order_detil from "@/views/order/order_detil.vue";

//营销管理
import marketing_list from "@/views/marketing/marketing_list.vue";
import maketing_edit from "@/views/marketing/maketing_edit.vue";

//帮助中心
import help_list from "@/views/help/help_list.vue";
import help_edit from "@/views/help/help_edit.vue";

// 财务管理
import financial_management from "@/views/financial/financial_management.vue";
import arrears_management from "@/views/financial/arrears_management.vue";
import traffic_detil from "@/views/financial/traffic_detil.vue"

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "登陆",
            component: log,
            hidden: true,
        },
        {
            path: "/home_two",
            name: "点播管理后台",
            component: index,
            hidden: true,
            mate: {
                title: '点播管理后台'
            },
            children: [{
                path: "/unprocessedVisits",
                name: "未处理访问请求",
                component: unprocessedVisits,
            }]
        },
        {
            path: "/unprocessedVisits",
            name: "概览",
            component: unprocessedVisits,
            mate: {
                title: '点播管理后台'
            },
        }, {
            path: "/home_two",
            name: "后台管理",
            component: index,
            hidden: true,
            icon: "iconfont icon-guanxiaobaotubiao09",
            children: [{
                    path: "/user",
                    name: "后台账户y",
                    component: user,
                },
                {
                    path: "/userli",
                    name: "用户列表",
                    component: userli,
                    hidden: true,
                },
                {
                    path: "/user_center",
                    name: "用户中心",
                    component: user_center,
                    hidden: true,
                },

            ],
        },
        {
            path: "/a",
            name: "用户管理",
            component: index,
            icon: "iconfont icon-guanxiaobaotubiao09",
            hidden: true,
            mate: {
                title: '用户管理'
            },
            children: [{
                    path: "/operating_user",
                    name: "注册用户y",
                    component: operating_user,
                },
                {
                    path: "/useInfo",
                    name: "用户详情",
                    component: useInfo,
                    hidden: true,
                },
            ],
        },
        {
            path: "/operating_user",
            name: "注册用户",
            component: operating_user,
            mate: {
                title: '用户管理'
            },
        },
        {
            path: "/b",
            name: "加速配置管理",
            component: index,
            icon: "iconfont icon-jiankong",
            mate: {
                title: '加速配置管理'
            },
            hidden: true,
            children: [{
                    path: "/accelerate_management",
                    name: "域名管理y",
                    component: accelerate_management,
                    // hidden: true
                },
                {
                    path: "/domain_management",
                    name: "点播加速管理y",
                    component: domain_management,
                    // hidden: true
                },

                {
                    path: "/batch_management",
                    name: "批量管理",
                    component: batch_management,
                    hidden: true,
                },
                {
                    path: "/back_source",
                    name: "URL配置",
                    component: back_source,
                    hidden: true,
                },
                {
                    path: "/add_url",
                    name: "添加URL",
                    component: add_url,
                    hidden: true,
                },
                {
                    path: "/copy",
                    name: "复制配置",

                    component: copy,
                    hidden: true,
                },
                {
                    path: "/upload",
                    name: "文件上传",
                    component: upload,
                    hidden: true,
                },
                {
                    path: "/yure_management",
                    name: "刷新预热管理y",
                    component: yure_management,
                },
                {
                    path: "/yure_management1",
                    name: "预热/管理",
                    component: yure_management1,
                    hidden: true,
                },
            ],
        },
        {
            path: "/accelerate_management",
            name: "域名管理",
            component: accelerate_management,
            mate: {
                title: '加速配置管理'
            },
        },
        {
            path: "/domain_management",
            name: "点播加速管理",
            component: domain_management,
            // hidden: true
        }, {
            path: "/yure_management",
            name: "刷新预热管理",
            component: yure_management,
        },
        {
            path: "/c",
            name: "点播 SDK管理",
            icon: "iconfont icon-jiedian1",
            component: index,
            hidden: true,
            children: [{
                path: "/node_information",
                name: "点播SDK发布y",
                component: node_information,
            }, ],
        },
        {
            path: "/node_information",
            name: "点播SDK发布",
            component: node_information,
        },
        {
            path: "/home_fosdr",
            name: "数据中心",
            component: index,
            icon: "iconfont icon-tongji",
            // hidden: true,
            mate: {
                title: '数据中心'
            },
            children: [{
                    path: "/gewsrg",
                    name: "监控统计",
                    component: home_two,
                    hidden: true,
                    children: [{
                        path: "/nodeMap1",
                        name: "资源监控",
                        component: nodeMap1,
                    }, ],
                },
                {
                    path: "/gewsrg2",
                    name: "节点流量统计",
                    component: home_two,
                    hidden: true,
                    children: [{
                            path: "/usageindex",
                            name: "渠道流量用量y",
                            component: usageindex,
                        },
                        {
                            path: "/trafficMonitor",
                            name: "渠道流量监控y",
                            component: trafficMonitor,
                        },
                        {
                            path: "/nodeindex",
                            name: "节点用量y",
                            component: nodeindex,
                        },
                    ],
                },
                {
                    path: "/usageindex",
                    name: "渠道节点用量",
                    component: usageindex,
                },
                {
                    path: "/trafficMonitor",
                    name: "渠道节点监控",
                    component: trafficMonitor,
                },
                {
                    path: "/nodeindex",
                    name: "节点用量",
                    component: nodeindex,
                },

                {
                    path: "/gewsrg3",
                    name: "播放统计",
                    component: home_two,
                    hidden: true,
                    children: [{
                            path: "/playTraffic",
                            name: "播放流量y",
                            component: playTraffic,
                        },
                        {
                            path: "/statistics",
                            name: "访问统计y",
                            component: statistics,
                        },
                        {
                            path: "/playDetails",
                            name: "播放详情统计y",
                            component: playDetails,
                            // hidden: true,
                        },
                    ],
                },
                {
                    path: "/playTraffic",
                    name: "播放流量",
                    component: playTraffic,
                },
                {
                    path: "/statistics",
                    name: "访问统计",
                    component: statistics,
                },
                {
                    path: "/playDetails",
                    name: "播放详情统计",
                    component: playDetails,
                    // hidden: true,
                },
                {
                    path: "/gewsrg1",
                    name: "加速日志",
                    component: home_three,
                    hidden: true,
                    children: [{
                            path: "/ipflow",
                            name: "点播加速日志",
                            component: ipflow,
                        },
                        {
                            path: "/fs_storage",
                            name: "视频点播日志",
                            component: fs_storage,
                        },
                    ],
                },
                {
                    path: "/sdkStatistics",
                    name: "SDK统计",
                    // hidden: true,
                    component: sdkStatistics,
                },
                {
                    path: "/unprocessedTab",
                    name: "未处理访问列表",
                    component: unprocessedTab,
                }
            ],
        },
        {
            path: "/h",
            name: "管理中心",
            component: index,
            icon: "iconfont icon-guanli",
            hidden: true,
            mate: {
                title: '流量包管理'
            },
            children: [{
                path: "/traffic_list",
                name: "流量包管理y",
                component: traffic_list,
            }, {
                path: "/traffic_configuration",
                name: "流量包配置y",
                component: traffic_configuration,
                // hidden: true,
            }],
        },
        {
            path: "/traffic_list",
            name: "流量包管理",
            component: traffic_list,
            mate: {
                title: '流量包管理'
            },
        }, {
            path: "/traffic_configuration",
            name: "流量包配置",
            component: traffic_configuration,
            // hidden: true,
        },
        {
            path: "/j",
            name: "订单",
            component: index,
            icon: "iconfont icon-guanli",
            hidden: true,
            mate: {
                title: '订单管理'
            },
            children: [{
                path: "/order_list",
                name: "订单管理y",
                component: order_list,
            }, {
                path: "/order_detil",
                name: "订单详情",
                component: order_detil,
                hidden: true,
            }],
        },
        {
            path: "/order_list",
            name: "订单管理",
            component: order_list,
            mate: {
                title: '订单管理'
            },
        },
        {
            path: "/l",
            name: "营销",
            component: index,
            icon: "iconfont icon-guanli",
            hidden: true,
            mate: {
                title: '营销管理'
            },
            children: [{
                    path: "/marketing_list",
                    name: "营销管理y",
                    component: marketing_list,
                },
                {
                    path: "/maketing_edit",
                    name: "添加营销",
                    component: maketing_edit,
                    hidden: true,
                }
            ],
        },
        {
            path: "/marketing_list",
            name: "营销管理",
            component: marketing_list,
            mate: {
                title: '营销管理'
            },
        },
        {
            path: '/kfpew',
            name: '财务',
            component: index,
            icon: "iconfont icon-guanli",
            hidden: true,
            mate: {
                title: '财务管理'
            },
            children: [{
                path: '/financial_management',
                name: "财务管理y",
                component: financial_management,
            }, {
                path: '/arrears_management',
                name: "欠款管理y",
                component: arrears_management,
            }, {
                path: '/traffic_detil',
                name: "欠款详情",
                component: traffic_detil,
                hidden: true,
            }]
        },
        {
            path: "/financial_management",
            name: "财务管理",
            component: financial_management,
            mate: {
                title: '财务管理'
            },
        },
        {

            path: '/arrears_management',
            name: "欠款管理",
            component: arrears_management,

        },
        {
            path: "/m",
            name: "帮助中心z",
            component: index,
            icon: "iconfont icon-guanli",
            hidden: true,
            mate: {
                title: '帮助中心'
            },
            children: [{
                    path: "/help_list",
                    name: "帮助中心y",
                    component: help_list,
                },
                {
                    path: "/help_edit",
                    name: "添加文档y",
                    component: help_edit,
                    hidden: true,
                }
            ],
        },
        {
            path: "/help_list",
            name: "帮助中心",
            component: help_list,
            mate: {
                title: '帮助中心'
            },
        },
        {
            path: "/help_edit",
            name: "添加文档",
            component: help_edit,
            hidden: true,
        },
        {
            path: "/f",
            name: "终端管理",
            component: index,
            icon: "iconfont icon-guanli",
            hidden: true,
            mate: {
                title: '终端管理'
            },
            children: [{
                    path: "/user",
                    name: "后台账户y",
                    component: user,
                },
                {
                    path: "/operation_management",
                    name: "操作日志y",
                    component: operation_management,
                },
            ],
        },
        {
            path: "/user",
            name: "后台账户",
            component: user,
            mate: {
                title: '终端管理'
            },
        },
        {
            path: "/operation_management",
            name: "操作日志",
            component: operation_management,
        },
    ],
});