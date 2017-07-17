/**
 * Created by panchong on 17/7/4.
 */
import React from 'react';
import { loadQuestion } from '../common/loadQuestion';

export default class IndexComponent extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }
    componentDidMount() {
        loadQuestion(1, 'c1', 'rand').then(data => {
            console.log(data);
        });
    }
    render() {
        return <div>11111111</div>;
    }
}

