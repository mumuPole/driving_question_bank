/**
 * Created by panchong on 17/7/4.
 */
import React from 'react';
import { Radio } from 'antd';
import { loadQuestion } from '../common/loadQuestion';
import './indexPage.less';

const RadioGroup = Radio.Group;
export default class IndexComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            subject: 1,
            modal: 'c1',
			type: 'rand',
        };
    }

    componentDidMount() {
        loadQuestion(1, 'c1', 'rand').then(data => {
            console.log(data);
        });
    }

    setState = (name, value) => {
        this.setState({
            [name]: value,
        });
    };
    onChangeSubject = e => {
        this.setState('subject', e.target.value);
    };
    onChangeModal = e => {
        this.setState('modal', e.target.value);
    };
    onChangeType = e => {
		this.setState('type', e.target.value);
	};

    render() {
        return (<div className="indexPage">
            <h1>驾考宝典</h1>
            <img alt="" src="image/index.jpg" />
            <div className="subject">
                <p>科目选择：</p>
                <RadioGroup onChange={this.onChangeSubject} value={this.state.subject}>
                    <Radio value={1}>科目一</Radio>
                    <Radio value={4}>科目四</Radio>
                </RadioGroup>
            </div>
            <div className="modal">
                <p>驾照类型：</p>
                <RadioGroup onChange={this.onChangeModal} value={this.state.modal}>
                    <Radio value={'c1'}>c1</Radio>
                    <Radio value={'c2'}>c2</Radio>
                    <Radio value={'a1'}>a1</Radio>
                    <Radio value={'a2'}>a2</Radio>
                    <Radio value={'b1'}>b1</Radio>
                    <Radio value={'b2'}>b2</Radio>
                </RadioGroup>
            </div>
			<div className="type">
				<p>测试类型：</p>
				<RadioGroup onChange={this.onChangeType} value={this.state.type}>
					<Radio value={'rand'}>随机测试</Radio>
					<Radio value={'order'}>顺序测试</Radio>
				</RadioGroup>
			</div>
        </div>);
    }
}

