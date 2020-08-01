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

//节点统计
import trafficMonitor from "@/views/statistics/node-traffic-monitoring";
import trafficUsage from "@/views/statistics/node-traffic-usage";

//播放统计
import visitStatistics from "@/views/statistics/visit-statistics";
import playTraffic from "@/views/statistics/play-traffic";
import playDetails from "@/views/statistics/play-details-statistics";




Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "登陆",
      component: log,
      hidden: true,
    },
    {
      path: "/home_two",
      name: "后台管理",
      component: index,
      icon: "iconfont icon-guanxiaobaotubiao09",
      children: [
        {
          path: "/user",
          name: "后台账户",
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
          name: "用户列表",
          component: user_center,
          hidden: true,
        },
        
      ],
    },
    {
      path: "/a",
      name: "用户管理",
      component: index,
      icon: "iconfont icon-jiankong",
      children: [
        {
          path: "/operating_user",
          name: "注册用户",
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
      path: "/b",
      name: "加速配置管理",
      component: index,
      icon: "iconfont icon-shebeijiankong",
      children: [
        {
          path: "/accelerate_management",
          name: "域名管理",
          component: accelerate_management,
          // hidden: true
        },
        {
          path: "/domain_management",
          name: "点播加速管理",
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
          name: "刷新预热管理",
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
      path: "/c",
      name: "点播 SDK管理",
      icon: "iconfont icon-jiedian1",
      component: index,
      children: [
        {
          path: "/node_information",
          name: "点播SDK发布",
          component: node_information,
        },
      ],
    },

    {
      path: "/home_fosdr",
      name: "数据中心",
      component: index,
      icon: "iconfont icon-tongji",
      children: [
        {
          path: "/gewsrg",
          name: "监控统计",
          component: home_two,
          hidden: true,
          children: [
            {
              path: "/nodeMap1",
              name: "资源监控",
              component: nodeMap1,
            },    
          ],
        },
        {
          path: "/gewsrg2",
          name: "节点流量统计",
          component: home_two,
          children: [
            {
              path: "/usageindex",
              name: "节点流量用量",
              component: usageindex,
            },
            {
              path: "/trafficMonitor",
              name: "节点流量监控",
              component: trafficMonitor,
            },
          ],
        },
        {
          path: "/gewsrg3",
          name: "播放统计",
          component: home_two,
          children: [
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
          ],
        },
        {
          path: "/gewsrg1",
          name: "加速日志",
          component: home_three,
          hidden: true,
          children: [
              {
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
        }
      ],
    },
    {
      path: "/f",
      name: "后台操作",
      component: index,
      icon: "iconfont icon-guanli",
      children: [
        {
          path: "/operation_management",
          name: "操作日志",
          component: operation_management,
        },
      ],
    },
  ],
});
