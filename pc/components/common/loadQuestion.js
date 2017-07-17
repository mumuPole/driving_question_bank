/**
 * Created by panchong on 17/7/5.
 */
import FetchJsonp from './fetchJson';
import * as keys from './appKey';

export const loadQuestion = async (subject, model, testType) => {
    let content = null;
    await FetchJsonp(`http://v.juhe.cn/jztk/query?subject=${subject}&model=${model}&key=${keys.appKey}&testType=${testType}`).then(data => {
        console.log('question', data);
        content = data;
    });
    return content;
};

