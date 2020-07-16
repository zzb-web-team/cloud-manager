// import { get, post } from './http'
import axios from 'axios'

var href = window.location.href
if (href.indexOf('xyj.grapefruitcloud.com') >= 0) {
    var serverUrl = 'http://xyj.grapefruitcloud.com' //PHP服务域名
} else {
  // var serverUrl = 'http://zzb.onezen.net' //PHP服务域名
    var serverUrl = 'http://xyj.grapefruitcloud.com' //PHP服务域名
}

export const hostUrl = serverUrl;

//账户
/**登录 */
export const requestLoginOwn = params => {
    return axios.post(`${serverUrl}/cloud/system/login`, params).then(res => res.data);
};


//用户管理
/** 获取用户列表*/
export const userlist = params => {
    return axios.post(`${serverUrl}/cloud/system/userlist`, params).then(res => res.data)
}
//添加用户
export const userinsert = params => {
    return axios.post(`${serverUrl}/cloud/system/userinsert`, params).then(res => res.data)
};
//修改用户
export const userupdate = params => {
    return axios.post(`${serverUrl}/cloud/system/userupdate`, params).then(res => res.data)
};

//删除用户列表
export const userdelete = params => {
    return axios.post(`${serverUrl}/cloud/system/userdelete`, params).then(res => res.data)
};
//批量启用，禁用，删除，
export const userctrl = params => {
    return axios.post(`${serverUrl}/cloud/system/userctrl`, params).then(res => res.data)
};
//导出监听
export const setactionlog = params => {
    return axios.post(`${serverUrl}/cloudterminal/setactionlog`, params).then(res => res.data)
};
//二维码绑定
export const qrcode = params => { return axios.post(`${serverUrl2}/cloud/system/bind_login`, params).then(res => res.data) };
//成功登录后校验code
export const check_login = params => { return axios.post(`${serverUrl2}/cloud/system/check_login`, params).then(res => res.data) };

//URL管理
/**获取URL列表 */
//新增修改03-11
export const query_url = params => {
    return axios.post(`${serverUrl}/url_mgmt/query_url`, params).then(res => res.data)
};
//查询域名管理员端

export const query_url_for_admin = params => {
    return axios.post(`${serverUrl}/url_mgmt/query_url_for_admin`, params).then(res => res.data)
};

export const query_config = params => {

    return axios.post(`${serverUrl}/url_mgmt/query_config`, params).then(res => res.data)
};
/*新增URL */
export const add_url = params => {
    return axios.post(`${serverUrl}/url_mgmt/add_url`, params).then(res => res.data)
};
/*删除URL*/
export const delete_url = params => {
    return axios.post(`${serverUrl}/url_mgmt/delete_url`, params).then(res => res.data)
};

/*修改URL */
export const modify_label = params => {
    return axios.post(`${serverUrl}/url_mgmt/modify_label`, params).then(res => res.data)
};
/*停用*/
export const change_state = params => {
    return axios.post(`${serverUrl}/url_mgmt/change_state`, params).then(res => res.data)
};

/*URL配置 */
export const config_url = params => {
    return axios.post(`${serverUrl}/url_mgmt/config_url`, params).then(res => res.data)
};

//刷新预热
export const refresh_state = params => {
    return axios.post(`${serverUrl}/node_mgmt/refresh_state`, params).then(res => res.data)
};
//刷新预热管理员端
export const refresh_state_admin = params => {
    return axios.post(`${serverUrl}/node_mgmt/refresh_state_admin`, params).then(res => res.data)
};


//刷新
export const resource_refresh = params => {
    return axios.post(`${serverUrl}/node_mgmt/resource_refresh`, params).then(res => res.data)
};

// 批量管理标签查询URL
export const query_urllabel = params => {
    return axios.post(`${serverUrl}/url_mgmt/query_urllabel`, params).then(res => res.data)
};
//查询副标签
export const getterminal = params => {
    return axios.post(`${serverUrl}/cloudterminal/getterminal`, params).then(res => res.data)
};

//标签验证
export const check_label = params => {
    return axios.post(`${serverUrl}/url_mgmt/check_label`, params).then(res => res.data)
};

//云点播新版本改版V1.0.1 2020-4-18
//查询域名
export const query_domain = params => {
    return axios.post(`${serverUrl}/url_mgmt/query_domain`, params).then(res => res.data)
};
//查询域名管理员
export const query_domain_for_admin = params => {
    return axios.post(`${serverUrl}/url_mgmt/query_domain_for_admin`, params).then(res => res.data)
};


//新增域名
export const add_domain = params => {
    return axios.post(`${serverUrl}/url_mgmt/add_domain`, params).then(res => res.data)
};
//修改域名
export const modify_domain = params => {
    return axios.post(`${serverUrl}/url_mgmt/modify_domain`, params).then(res => res.data)
};
//删除域名
export const del_domain = params => {
    return axios.post(`${serverUrl}/url_mgmt/del_domain`, params).then(res => res.data)
};
//修改状态
export const change_domainstate = params => {
    return axios.post(`${serverUrl}/url_mgmt/change_domainstate`, params).then(res => res.data)
};

//




//点播加速
/**点播加速日志列表 */
export const query_accelerate_log = params => {
    return axios.post(`${serverUrl}/videoplay_accelerate/query_accelerate_log`, params).then(res => res.data)
};
/**视频点播日志 */
export const query_videoplay_log = params => {
    return axios.post(`${serverUrl}/videoplay_accelerate/query_videoplay_log`, params).then(res => res.data)
};

//点播加速日志下载
export const export_videoaccel_file = params => {
    return axios.post(`${serverUrl}/videoplay_accelerate/export_videoaccel_file`, params).then(res => res.data)
};

//视频点播日志下载
export const export_videoplay_file = params => {
    return axios.post(`${serverUrl}/videoplay_accelerate/export_videoplay_file`, params).then(res => res.data)
};


//数据中心
/** 加速流量加载查询条件*/
export const accelerate_flow_query_conditions = params => {
    return axios.post(`${serverUrl}/resource_manage/accelerate_flow_query_conditions`, params).then(res => res.data)
};
/** 回源查询条件*/
export const backsource_flow_query_conditions = params => {
    return axios.post(`${serverUrl}/resource_manage/backsource_flow_query_conditions`, params).then(res => res.data)
};
/**加速流量柱状图 */
export const accelerate_flow = params => {
    return axios.post(`${serverUrl}/resource_manage/accelerate_flow`, params).then(res => res.data)
};
/*回源统计柱状图 */
export const backsource_flow = params => {
    return axios.post(`${serverUrl}/resource_manage/backsource_flow`, params).then(res => res.data)
};
/**加速流量表格 */
export const accelerate_flow_table = params => {
    return axios.post(`${serverUrl}/resource_manage/accelerate_flow_table`, params).then(res => res.data)
};
/**输入渠道ID 查询视频名称 */
export const getvideo = params => {
    return axios.post(`${serverUrl}/url_mgmt/getvideo`, params).then(res => res.data)
};


//点播数据统计
/** PV/UV 查询条件*/
export const pv_uv_query_conditions = params => {
    return axios.post(`${serverUrl}/videoaccess_statistic/pv_uv_query_conditions`, params).then(res => res.data)
};
/** 地区访问次数查询条件*/
export const region_query_conditions = params => {
    return axios.post(`${serverUrl}/videoaccess_statistic/region_query_conditions`, params).then(res => res.data)
};
/**运营商访问条件查询 */
export const isp_query_conditions = params => {
    return axios.post(`${serverUrl}/videoaccess_statistic/isp_query_conditions`, params).then(res => res.data)
};
/**播放条件查询 */
export const query_playtimes_conditions = params => {
    return axios.post(`${serverUrl}/videoplay_statistic/query_playtimes_conditions`, params).then(res => res.data)
};
/*PV曲线图查询*/
export const pv_uv_curve = params => {
    return axios.post(`${serverUrl}/videoaccess_statistic/pv_uv_curve`, params).then(res => res.data)
};
/**地区访问次数曲线和表格 */
export const query_topregion_accesscnt_curve = params => {
    return axios.post(`${serverUrl}/videoaccess_statistic/query_topregion_accesscnt_curve`, params).then(res => res.data)
};
/**运营商访问次数曲线和表格 */
export const query_topisp_accesscnt_curve = params => {
    return axios.post(`${serverUrl}/videoaccess_statistic/query_topisp_accesscnt_curve`, params).then(res => res.data)
};
/** 播放次数曲线图*/
export const query_playtimes_curve = params => {
    return axios.post(`${serverUrl}/videoplay_statistic/query_playtimes_curve`, params).then(res => res.data)
};
/**播放次数表格 */
export const query_playdata_table = params => {
    return axios.post(`${serverUrl}/videoplay_statistic/query_playdata_table`, params).then(res => res.data)
};


//SDK管理
/**SDK列表 */
export const sdklist = params => {
    return axios.post(`${serverUrl}/cloud/sdklist`, params).then(res => res.data)
};
/**发布SDK*/
export const savesdk = params => {
    return axios.post(`${serverUrl}/cloud/savesdk`, params).then(res => res.data)
};
/** 修改SDK*/
export const editsdk = params => {
    return axios.post(`${serverUrl}/cloud/editsdk`, params).then(res => res.data)
};

//用户管理
/**用户列表 */
export const cloudUserList = params => {
    return axios.post(`${serverUrl}/clouduser/userlist`, params).then(res => res.data)
};

/**冻结用户 */
export const denyuser = params => {
    return axios.post(`${serverUrl}/clouduser/denyuser`, params).then(res => res.data)
};


//操作日志
/**操作日志列表 */
export const actionlog = params => {
    return axios.post(`${serverUrl}/cloudterminal/actionlog`, params).then(res => res.data)
};

/**导出汇报 */
export const setactionlogAll = params => {
    return axios.post(`${serverUrl}/cloudterminal/setactionlog`, params).then(res => res.data)
};

//下载日志
export const query_logfile_table = params => {
    return axios.post(`${serverUrl}/cloudterminal/setactionlog`, params).then(res => res.data)
};


//查询日志
export const download_logfile = params => {
    return axios.post(`${serverUrl}/cloudterminal/setactionlog`, params).then(res => res.data)
};

//导出加速内容
export const url_export_for_admin = params => {
    return axios.post(`${serverUrl}/url_mgmt/url_export_for_admin`, params).then(res => res.data)
};





//pvuv导出
export const export_pv_uv_curve_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_pv_uv_curve_file`, params).then(res => res.data)
};
//播放加速内容图表导出接口
export const export_playdata_table_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_playdata_table_file`, params).then(res => res.data)
};
//播放加速内容图表导出接口
export const export_playtimes_curve_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_playtimes_curve_file`, params).then(res => res.data)
};
//访问用户分布导出接口
export const export_topregion_accesscnt_curve_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_topregion_accesscnt_curve_file`, params).then(res => res.data)
};
//加速流量图表导出接口
export const export_accelerate_flow_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_accelerate_flow_file`, params).then(res => res.data)
};
//加速流量列表导出接口
export const export_accelerate_flow_table_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_accelerate_flow_table_file`, params).then(res => res.data)
};
//回源统计导出接口
export const export_backsource_flow_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_backsource_flow_file`, params).then(res => res.data)
};
//资源用量导出接口
export const export_dataflow_curve_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_dataflow_curve_file`, params).then(res => res.data)
};
//运营商访问次数导出
export const export_topisp_accesscnt_curve_file = (params) => {
    return axios.post(`${serverUrl}/file_download/export_topisp_accesscnt_curve_file`, params).then(res => res.data)
};

