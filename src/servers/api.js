
import axios from 'axios'
 import { get, post } from './request'
var href = window.location.href
if (href.indexOf('xyj.grapefruitcloud.com') >= 0) {
    var serverUrl = 'http://xyj.grapefruitcloud.com'; //PHP服务URL
} else if (href.indexOf('service.kclgames.com') >= 0) {
    var serverUrl = 'http://service.kclgames.com'; //PHP服务URL
} else {
    //var serverUrl = 'http://zzb.onezen.net';
    var serverUrl = 'http://xyj.grapefruitcloud.com';
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
/**用量查询图表 */
export const manage_dataflow_curve = params => {
    return post(`${serverUrl}/resource_usage/manage_dataflow_curve`, params)
};
/**用量查询列表 */
export const manage_dataflow_table = params => {
    return post(`${serverUrl}/resource_usage/manage_dataflow_table`, params)
};
/**用量图表导出 */
/**用量查询列表 */
export const export_manage_dataflow_table_file = params => {
    return post(`${serverUrl}/file_download/export_manage_dataflow_table_file`, params)
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

