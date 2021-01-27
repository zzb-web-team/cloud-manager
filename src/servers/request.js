import axios from 'axios'
import { Message, Loading } from 'element-ui';
import _ from 'lodash'
var loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;
//显示loading
function showLoading(target) {
    // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
    // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
    if (needLoadingRequestCount === 0 && !loading) {
        loading = Loading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(255, 255, 255, 0.5)',
            target: target || 'body'
        });
    }
    needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
    needLoadingRequestCount--;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
    if (needLoadingRequestCount === 0) {
        //关闭loading
        toHideLoading();
    }
}
//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(() => {
    /**
     * 坑：在拦截起调用新的Loading之前检测是否有实例存在，如果有则调用close()方法关闭实例，然后再调用新的Loading！！！！！！！！！！！！
     */
    if (loading) {
        loading.close();
        loading = null;
    }
}, 300);
axios.defaults.timeout = 45000
    // axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// http request 拦截器
axios.interceptors.request.use(

    config => {

        config.data = JSON.stringify(config.data)

        if (config.headers.showLoading !== false) {
            showLoading(config.headers.loadingTarget);
        }
        return config
    },
    error => {
        if (error.config.headers.showLoading !== false) {
            hideLoading();
        }
        return Promise.reject(error)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.config.headers.showLoading !== false) {
            hideLoading();
        }
        if (response.data.errCode === 2) {
            router.push({
                path: '/',
                querry: {
                    redirect: router.currentRoute.fullPath
                } // 从哪个页面跳转
            })
        }
        return response
    },
    error => {
        if (error.config.headers.showLoading !== false) {
            hideLoading();
        }
        Message.error('请求数据超时！');
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

export function postblob(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}