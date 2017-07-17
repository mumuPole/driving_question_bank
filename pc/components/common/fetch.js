/**
 * Created by panchong on 17/7/5.
 */
import 'whatwg-fetch';
import 'es6-promise';
import { message } from 'antd';

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

const Fetch = (url, configs) => {
    const fetchIt = (apiUrl, config, success, error) => {
		fetch(apiUrl, config).then(res => res.json()).then(data => {
            success(data);
        }).catch(e => {
            message.error(e);
            error();
        });
    };
    return new Promise((resolve, reject) => {
        let defaultConfig = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include',
            mode: 'no-cors',
        };
        if (configs) {
            let config = configs;
            if (configs.body) {
                config = Object.assign({}, configs, { body: handleParams(configs.body) });
            }
            defaultConfig = Object.assign({}, defaultConfig, config);
        }
        fetchIt(url, defaultConfig, resolve, reject);
    });
};
export default Fetch;
