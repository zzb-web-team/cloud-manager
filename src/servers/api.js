import axios from 'axios'
import {get, post } from './request'
var href = window.location.href
if (href.indexOf('xyj.grapefruitcloud.com') >= 0) {
    var serverUrl = 'http://xyj.grapefruitcloud.com'; //PHP服务URL
} else if (href.indexOf('service.kclgames.com') >= 0) {
    var serverUrl = 'http://service.kclgames.com'; //PHP服务URL
} else if (href.indexOf('www.luqikang.com') >= 0) {
    var serverUrl = 'http://www.luqikang.com';
} else if (href.indexOf('service.luqikang.com') >= 0) {
    var serverUrl = 'http://service.luqikang.com';
} else if (href.indexOf('zzb.stguarantee.com') >= 0) {
    var serverUrl = 'http://zzb.stguarantee.com'; //阿里云服务URL
} else if (href.indexOf('test.zzb.com') >= 0) {
    var serverUrl = 'http://test.zzb.com'; //测试
} else {
    // var serverUrl = 'http://zzb.stguarantee.com';
    // var serverUrl = 'http://www.forteatime.com';
    // var serverUrl = 'http://xyj.grapefruitcloud.com';
    var serverUrl = 'http://service.kclgames.com';
    // var serverUrl = 'http://test.zzb.com';
    // var test_serverUrl = "http://test.zzb.com"
    var test_serverUrl = "http://service.kclgames.com"
}

export const hostUrl = serverUrl;

//账户
/**登录 */
export const requestLoginOwn = params => {
    return post(`${serverUrl}/cloud/system/login`, params);
};
//用户管理
/** 获取用户列表*/
export const userlist = params => {
        return post(`${serverUrl}/cloud/system/userlist`, params)
    }
    //添加用户
export const userinsert = params => {
    return post(`${serverUrl}/cloud/system/userinsert`, params)
};
//修改用户
export const userupdate = params => {
    return post(`${serverUrl}/cloud/system/userupdate`, params)
};

//删除用户列表
export const userdelete = params => {
    return post(`${serverUrl}/cloud/system/userdelete`, params)
};
//批量启用，禁用，删除，
export const userctrl = params => {
    return post(`${serverUrl}/cloud/system/userctrl`, params)
};
//导出监听
export const setactionlog = params => {
    return post(`${serverUrl}/cloudterminal/setactionlog`, params)
};
//二维码绑定
export const qrcode = params => { return post(`${serverUrl2}/cloud/system/bind_login`, params) };
//成功登录后校验code
export const check_login = params => { return post(`${serverUrl2}/cloud/system/check_login`, params) };

//URL管理
/**获取URL列表 */
//新增修改03-11
export const query_url = params => {
    return post(`${serverUrl}/url_mgmt/query_url`, params)
};
//查询域名管理员端

export const query_url_for_admin = params => {
    return post(`${serverUrl}/url_mgmt/query_url_for_admin`, params)
};

export const query_config = params => {

    return post(`${serverUrl}/url_mgmt/query_config`, params)
};
/*新增URL */
export const add_url = params => {
    return post(`${serverUrl}/url_mgmt/add_url`, params)
};
/*删除URL*/
export const delete_url = params => {
    return post(`${serverUrl}/url_mgmt/delete_url`, params)
};

/*修改URL */
export const modify_label = params => {
    return post(`${serverUrl}/url_mgmt/modify_label`, params)
};
/*停用*/
export const change_state = params => {
    return post(`${serverUrl}/url_mgmt/change_state`, params)
};

/*URL配置 */
export const config_url = params => {
    return post(`${serverUrl}/url_mgmt/config_url`, params)
};

//刷新预热
export const refresh_state = params => {
    return post(`${serverUrl}/node_mgmt/refresh_state`, params)
};
//刷新预热管理员端
export const refresh_state_admin = params => {
    return post(`${serverUrl}/node_mgmt/refresh_state_admin`, params)
};

//获取预热刷新列表
export const video_refresh = params => {
    return post(`${serverUrl}/accel_manage/video_refresh`, params)
};


//刷新
export const resource_refresh = params => {
    return post(`${serverUrl}/node_mgmt/resource_refresh`, params)
};

// 批量管理标签查询URL
export const query_urllabel = params => {
    return post(`${serverUrl}/url_mgmt/query_urllabel`, params)
};
//查询副标签
export const getterminal = params => {
    return post(`${serverUrl}/cloudterminal/getterminal`, params)
};

//标签验证
export const check_label = params => {
    return post(`${serverUrl}/url_mgmt/check_label`, params)
};

//云点播新版本改版V1.0.1 2020-4-18
//查询域名
export const query_domain = params => {
    return post(`${serverUrl}/url_mgmt/query_domain`, params)
};
//查询域名管理员
export const query_domain_for_admin = params => {
    return post(`${serverUrl}/url_mgmt/query_domain_for_admin`, params)
};


//新增域名
export const add_domain = params => {
    return post(`${serverUrl}/url_mgmt/add_domain`, params)
};
//修改域名
export const modify_domain = params => {
    return post(`${serverUrl}/url_mgmt/modify_domain`, params)
};
//删除域名
export const del_domain = params => {
    return post(`${serverUrl}/url_mgmt/del_domain`, params)
};
//修改状态
export const change_domainstate = params => {
    return post(`${serverUrl}/url_mgmt/change_domainstate`, params)
};

//




//点播加速
/**点播加速日志列表 */
export const query_accelerate_log = params => {
    return post(`${serverUrl}/videoplay_accelerate/query_accelerate_log`, params)
};
/**视频点播日志 */
export const query_videoplay_log = params => {
    return post(`${serverUrl}/videoplay_accelerate/query_videoplay_log`, params)
};

//点播加速日志下载
export const export_videoaccel_file = params => {
    return post(`${serverUrl}/videoplay_accelerate/export_videoaccel_file`, params)
};

//视频点播日志下载
export const export_videoplay_file = params => {
    return post(`${serverUrl}/videoplay_accelerate/export_videoplay_file`, params)
};


//数据中心
/** 加速流量加载查询条件*/
export const accelerate_flow_query_conditions = params => {
    return post(`${serverUrl}/resource_manage/accelerate_flow_query_conditions`, params)
};
/** 回源查询条件*/
export const backsource_flow_query_conditions = params => {
    return post(`${serverUrl}/resource_manage/backsource_flow_query_conditions`, params)
};
/**加速流量柱状图 */
export const accelerate_flow = params => {
    return post(`${serverUrl}/resource_manage/accelerate_flow`, params)
};
/*回源统计柱状图 */
export const backsource_flow = params => {
    return post(`${serverUrl}/resource_manage/backsource_flow`, params)
};
/**加速流量表格 */
export const accelerate_flow_table = params => {
    return post(`${serverUrl}/resource_manage/accelerate_flow_table`, params)
};
/**输入渠道ID 查询视频名称 */
export const getvideo = params => {
    return post(`${serverUrl}/url_mgmt/getvideo`, params)
};
/**流量占比图表 */
export const sdk_flow = params => {
    return post(`${serverUrl}/resource_manage/sdk_flow`, params)
        // return post(`http://10.0.0.128:8090/resource_manage/sdk_flow`, params)
};
/**流量占比列表 */
export const sdk_flow_table = params => {
    return post(`${serverUrl}/resource_manage/sdk_flow_table`, params)
};
/**流量监控图表 */
export const sdk_flow_control = params => {
    return post(`${serverUrl}/resource_manage/sdk_flow_control`, params)
};
/**流量占比导出 */
export const export_sdk_flow_table_file = params => {
    return post(`${serverUrl}/file_download/export_sdk_flow_table_file`, params)
};
/**流量监控导出 */
export const export_sdk_flow_control_file = params => {
    return post(`${serverUrl}/file_download/export_sdk_flow_control_file`, params)
};
/**渠道--用量查询图表 */
export const manage_dataflow_curve = params => {
    return post(`${serverUrl}/resource_usage/manage_dataflow_curve`, params)
};
/**节点-用量查询图表 */
export const node_manage_dataflow_curve = params => {
    return post(`${serverUrl}/resource_manage/node_manage_dataflow_curve`, params)
};
/**渠道--用量查询列表 */
export const manage_dataflow_table = params => {
    return post(`${serverUrl}/resource_usage/manage_dataflow_table`, params)
};
/**节点--用量查询列表 */
export const node_manage_dataflow_table = params => {
    return post(`${serverUrl}/resource_manage/node_manage_dataflow_table`, params)
};
/**用量图表导出 */
/**用量查询列表 */
export const export_manage_dataflow_table_file = params => {
    return post(`${serverUrl}/file_download/export_manage_dataflow_table_file`, params)
};

//渠道--节点流量图
export const node_traffic_curve = params => {
    return post(`${serverUrl}/resource_manage/ipfs_flow_curve`, params)
};
//节点--节点流量图
export const node_ipfs_flow_curve = params => {
    return post(`${serverUrl}/resource_manage/node_ipfs_flow_curve`, params)
};

//渠道流量统计表
export const node_traffic_table = params => {
    return post(`${serverUrl}/resource_manage/ipfs_flow_table`, params)
};

//节点流量统计表
export const node_ipfs_flow_table = params => {
    return post(`${serverUrl}/resource_manage/node_ipfs_flow_table`, params)
};

//节点流量监控下载
export const node_traffic_download = params => {
    return post(`${serverUrl}/file_download/export_ipfs_flow_table_file`, params)
};

//TOP加速次数排行
export const top_accelcnt_ranking = params => {
    return post(`${serverUrl}/resource_manage/query_accelcnt_ranking`, params)
};

//TOP加速流量排行
export const top_dataflow_ranking = params => {
    return post(`${serverUrl}/resource_manage/query_dataflow_ranking`, params)
};

//TOP加速次数排行下载接口
export const export_accelcnt_ranking_table_file = params => {
    return post(`${serverUrl}/file_download/export_accelcnt_ranking_table_file`, params)
};

//TOP加速流量排行下载接口
export const export_dataflow_ranking_table_file = params => {
    return post(`${serverUrl}/file_download/export_dataflow_ranking_table_file`, params)
};

//播放信息统计
export const video_info_statistics = params => {
    return post(`${serverUrl}/resource_manage/video_info_statistics`, params)
};

//播放异常统计
export const video_exception_statistics = params => {
    return post(`${serverUrl}/resource_manage/video_exception_statistics`, params)
};


//播放信息统计导出
export const export_video_info_statistics_file = params => {
    return post(`${serverUrl}/file_download/export_video_info_statistics_file`, params)
};

//播放异常统计导出
export const export_video_exception_statistics_file = params => {
    return post(`${serverUrl}/file_download/export_video_exception_statistics_file`, params)
};

//获取节点渠道node_mgmt/get_nodetype_enum
export const get_nodetype_enum = params => {
    return post(`${serverUrl}/node_mgmt/get_nodetype_enum`, params)
};

//点播数据统计
/** PV/UV 查询条件*/
export const pv_uv_query_conditions = params => {
    return post(`${serverUrl}/videoaccess_statistic/pv_uv_query_conditions`, params)
};
/** 地区访问次数查询条件*/
export const region_query_conditions = params => {
    return post(`${serverUrl}/videoaccess_statistic/region_query_conditions`, params)
};
/**运营商访问条件查询 */
export const isp_query_conditions = params => {
    return post(`${serverUrl}/videoaccess_statistic/isp_query_conditions`, params)
};
/**播放条件查询 */
export const query_playtimes_conditions = params => {
    return post(`${serverUrl}/videoplay_statistic/query_playtimes_conditions`, params)
};
/*PV曲线图查询*/
export const pv_uv_curve = params => {
    return post(`${serverUrl}/videoaccess_statistic/pv_uv_curve`, params)
};
/**地区访问次数曲线和表格 */
export const query_topregion_accesscnt_curve = params => {
    return post(`${serverUrl}/videoaccess_statistic/query_topregion_accesscnt_curve`, params)
};
/**运营商访问次数曲线和表格 */
export const query_topisp_accesscnt_curve = params => {
    return post(`${serverUrl}/videoaccess_statistic/query_topisp_accesscnt_curve`, params)
};
/** 播放次数曲线图*/
export const query_playtimes_curve = params => {
    return post(`${serverUrl}/videoplay_statistic/query_playtimes_curve`, params)
};
/**播放次数表格 */
export const query_playdata_table = params => {
    return post(`${serverUrl}/videoplay_statistic/query_playdata_table`, params)
};

/**SDK版本统计 */
export const query_sdk_version_curve = params => {
    return post(`${serverUrl}/resource_manage/query_sdk_version_curve`, params)
};

/**版本用户清单 */
export const query_sdk_version_userList = params => {
    return post(`${serverUrl}/resource_manage/query_sdk_version_userList`, params)
};

/**播放流量地区分布表*/
export const query_dataflow_location_table = params => {
    return post(`${serverUrl}/resource_manage/query_dataflow_location_table`, params)
};

/**播放流量地区分布表*/
export const query_dataflow_location_curve = params => {
    return post(`${serverUrl}/resource_manage/query_dataflow_location_curve`, params)
};

/**导出播放流量地区分布*/
export const export_dataflow_location_file = params => {
    return post(`${serverUrl}/file_download/export_dataflow_location_file`, params)
};

//SDK管理
/**SDK列表 */
export const sdklist = params => {
    return post(`${serverUrl}/cloud/sdklist`, params)
};
/**发布SDK*/
export const savesdk = params => {
    return post(`${serverUrl}/cloud/savesdk`, params)
};
/** 修改SDK*/
export const editsdk = params => {
    return post(`${serverUrl}/cloud/editsdk`, params)
};
/** 删除SDK*/
export const delsdk = params => {
    return post(`${serverUrl}/cloud/deletesdk`, params)
};

//用户管理
/**用户列表 */
export const cloudUserList = params => {
    return post(`${serverUrl}/clouduser/userlist`, params)
};

/**冻结用户 */
export const denyuser = params => {
    return post(`${serverUrl}/clouduser/denyuser`, params)
};


//操作日志
/**操作日志列表 */
export const actionlog = params => {
    return post(`${serverUrl}/cloudterminal/actionlog`, params)
};

/**导出汇报 */
export const setactionlogAll = params => {
    return post(`${serverUrl}/cloudterminal/setactionlog`, params)
};

//下载日志
export const query_logfile_table = params => {
    return post(`${serverUrl}/cloudterminal/setactionlog`, params)
};


//查询日志
export const download_logfile = params => {
    return post(`${serverUrl}/cloudterminal/setactionlog`, params)
};

//导出加速内容
export const url_export_for_admin = params => {
    return post(`${serverUrl}/url_mgmt/url_export_for_admin`, params)
};



//pvuv导出
export const export_pv_uv_curve_file = (params) => {
    return post(`${serverUrl}/file_download/export_pv_uv_curve_file`, params)
};
//播放加速内容图表导出接口
export const export_playdata_table_file = (params) => {
    return post(`${serverUrl}/file_download/export_playdata_table_file`, params)
};
//播放加速内容图表导出接口
export const export_playtimes_curve_file = (params) => {
    return post(`${serverUrl}/file_download/export_playtimes_curve_file`, params)
};
//访问用户分布导出接口
export const export_topregion_accesscnt_curve_file = (params) => {
    return post(`${serverUrl}/file_download/export_topregion_accesscnt_curve_file`, params)
};
//加速流量图表导出接口
export const export_accelerate_flow_file = (params) => {
    return post(`${serverUrl}/file_download/export_accelerate_flow_file`, params)
};
//加速流量列表导出接口
export const export_accelerate_flow_table_file = (params) => {
    return post(`${serverUrl}/file_download/export_accelerate_flow_table_file`, params)
};
//回源统计导出接口
export const export_backsource_flow_file = (params) => {
    return post(`${serverUrl}/file_download/export_backsource_flow_file`, params)
};
//资源用量导出接口
export const export_dataflow_curve_file = (params) => {
    return post(`${serverUrl}/file_download/export_dataflow_curve_file`, params)
};
//运营商访问次数导出
export const export_topisp_accesscnt_curve_file = (params) => {
    return post(`${serverUrl}/file_download/export_topisp_accesscnt_curve_file`, params)
};





//未处理播放请求
export const ipfs_unhandle_req_list = (params) => {
    return post(`${serverUrl}/resource_manage/ipfs_unhandle_req_list`, params)
};
export const ipfs_flow_summay = (params) => {
    return post(`${serverUrl}/resource_manage/ipfs_flow_summay`, params)
};
//首页概览数据
export const home_page = (params) => {
    return post(`${serverUrl}/resource_manage/home_page`, params)
};


//添加流量包产品
export const add_pktproduct = (params) => {
    return post(`${serverUrl}/pktproduct_mgmt/add_pktproduct`, params)
};

//配置流量包产品
export const config_pktproduct = (params) => {
    return post(`${test_serverUrl}/pktproduct_mgmt/config_pktproduct`, params)
};
//查询流量包产品
export const query_pktproduct = (params) => {
    return post(`${test_serverUrl}/pktproduct_mgmt/query_pktproduct`, params)
};
//删除流量包产品
export const del_pktproduct = (params) => {
    return post(`${test_serverUrl}/pktproduct_mgmt/del_pktproduct`, params)
};


//创建订单
export const create_pktorder = (params) => {
    return post(`${test_serverUrl}/pktorder_mgmt/create_pktorder`, params)
};
//查询订单
export const query_pktorder = (params) => {
    return post(`${test_serverUrl}/pktorder_mgmt/query_pktorder`, params)
};

//查询订单（admin）
export const query_pktorder_for_admin = (params) => {
    return post(`${test_serverUrl}/pktorder_mgmt/query_pktorder_for_admin`, params)
};
//通知支付结果
export const notify_payment = (params) => {
    return post(`${test_serverUrl}/pktorder_mgmt/notify_payment`, params)
};
//删除订单
export const del_pktorder = (params) => {
    return post(`${test_serverUrl}/pktorder_mgmt/del_pktorder`, params)
};
//添加营销位
export const add_adslot = (params) => {
    return post(`${test_serverUrl}/ad_mgmt/add_adslot`, params)
};
//营销查询
export const query_adslot = (params) => {
    return post(`${test_serverUrl}/ad_mgmt/query_adslot`, params)
};
//营销修改
export const modify_adslot = (params) => {
    return post(`${test_serverUrl}/ad_mgmt/modify_adslot`, params)
};
//删除营销
export const del_adslot = (params) => {
    return post(`${test_serverUrl}/ad_mgmt/del_adslot`, params)
};
//查询当前待显示营销
export const query_cur_adslot = (params) => {
    return post(`${test_serverUrl}/ad_mgmt/query_cur_adslot`, params)
};

//添加帮助信息
export const add_help = (params) => {
    return post(`${test_serverUrl}/help_mgmt/add_help`, params)
};
//帮助信息查询
export const query_help = (params) => {
    return post(`${test_serverUrl}/help_mgmt/query_help`, params)
};
//删除帮助信息
export const del_help = (params) => {
    return post(`${test_serverUrl}/help_mgmt/del_help`, params)
};
//帮助修改
export const modify_help = (params) => {
    return post(`${test_serverUrl}/help_mgmt/modify_help`, params)
};
//查询账户流水
export const query_user_sz_for_admin = (params) => {
    return post(`${test_serverUrl}/flowcharge_mgmt/query_user_sz_for_admin`, params)
};
//查询充值记录
export const query_chargeorder_for_admin = (params) => {
    return post(`${test_serverUrl}/flowcharge_mgmt/query_chargeorder_for_admin`, params)
};
//查询充值记录
export const query_unnormal_acount = (params) => {
    return post(`${test_serverUrl}/useraccount_mgmt/query_unnormal_acount`, params)
};
//通知支付结果
export const mgmt_notify_payment = (params) => {
    return post(`${test_serverUrl}/flowcharge_mgmt/notify_payment`, params)
};
//查询欠费详情
export const query_arrears_info = (params) => {
    return post(`${test_serverUrl}/flowcharge_mgmt/query_arrears_info`, params)
};