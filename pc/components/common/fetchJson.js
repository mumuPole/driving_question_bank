/**
 * Created by panchong on 17/7/17.
 */
/**
 * Created by panchong on 17/7/5.
 */
import 'whatwg-fetch';
import 'es6-promise';
import { message } from 'antd';

const fetchJsonp = require('fetch-jsonp');
const Promise = require('es6-promise').Promise;

if (!window.Promise) {
    window.Promise = Promise;
}

// 提交数据按form表单格式转换
export const handleParams = param => {
    let group = '';
    for (const par in param) {
        if (group.length !== 0) {
            group = `${group}&${par}=${param[par]}`;
        } else {
            group = `${group + par}=${param[par]}`;
        }
    }
    return group;
};

const FetchJsonp = url => {
    const fetchIt = (apiUrl, success, error) => {
        fetchJsonp(apiUrl).then(res => res.json()).then(data => {
			if (data.reason === 'ok') {
				success(data.result);
			} else {
				message.error('题目获取失败！');
			}
        }).catch(e => {
            message.error(e);
            error();
        });
    };
    return new Promise((resolve, reject) => {
        fetchIt(url, resolve, reject);
    });
};
export default FetchJsonp;
