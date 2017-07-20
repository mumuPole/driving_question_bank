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
			time: false,
        };
    }

    componentDidMount() {
        // loadQuestion(1, 'c1', 'rand').then(data => {
        //     console.log(data);
        // });
    }

    handleState = (name, value) => {
        this.setState({
            [name]: value,
        });
    };
    onChangeSubject = e => {
        this.handleState('subject', e.target.value);
    };
    onChangeModal = e => {
        this.handleState('modal', e.target.value);
    };
    onChangeType = e => {
		this.handleState('type', e.target.value);
	};
	onChangeTime = e => {
		this.handleState('time', e.target.value);
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
            <div className="time">
                <p>是否计时：</p>
                <RadioGroup onChange={this.onChangeTime} value={this.state.time}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                </RadioGroup>
            </div>
            <div className="message flex_row_start">
                <div>
                    说明：
                </div>
                <p>
                    若选择计时答题，每题倒计时15秒，倒计时结束自动判本题答错，进入下一题
                </p>
            </div>
            <button className="startTest blueBtn">开始测试</button>
        </div>);
    }
}

