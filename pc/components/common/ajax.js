/**
 * Created by panchong on 17/4/5.
 */
import $ from 'jquery';
import { message } from 'antd';

const Ajax = config => {
    return new Promise((resolve, reject) => {
		$.ajax({
			url: config.url,
			async: false,
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			success:data => {
				resolve(data);
			},
		});
    });

};
export default Ajax;
