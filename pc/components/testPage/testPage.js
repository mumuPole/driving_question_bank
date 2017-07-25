/**
 * Created by panchong on 17/7/20.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Radio, Modal } from 'antd';
import { loadQuestion } from '../common/loadQuestion';
import './testPage.less';

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
export default class TestPage extends React.Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            index: 0,
            choose: '',
            score: 0,
        };
    }

    componentDidMount() {
        loadQuestion(this.props.params.subject, this.props.params.modal, this.props.params.type).then(data => {
            this.setState({
                questions: data,
                index: 0,
            });
        });
    }
    onChangeChoose = e => {
    	this.setState({
            choose: e.target.value,
        });
    };
    correctAnswer = () => {
        const questions = this.state.questions;
        let index = this.state.index;
        let score = this.state.score;
        if (this.state.choose === questions[index].answer) {
			let time = 5;
            const modal = Modal.success({
				title: '回答正确',
                content: <div>
                    <p>{questions[index].explains}</p>
                    <p>{`倒计时关闭窗口：${setInterval(function () {
                        time -= 1;
						console.log(time);
                        return time;
					}, 1000)}秒`}</p>
                </div>,
				onOk() {},
			});
			setTimeout(() => modal.destroy(), 5000);
            score += 1;
        } else {
			let time = 5;
            const modal = Modal.error({
				title: '回答错误',
				content: <div>
                    <p>{questions[index].explains}</p>
                    <p>{`倒计时关闭窗口：${setInterval(function () {
						time -= 1;
						console.log(time);
						return time;
					}, 1000)}秒`}</p>
                </div>,
				onOk() {},
			});
			setTimeout(() => modal.destroy(), 5000);
        }
		index += 1;
        this.setState({
			index,
			choose: '',
            score,
        });
    };
    handleRetest = () => {
        const _this = this;
		confirm({
			title: '你确定要重新测试吗?',
			content: '本次测试成绩将归0',
			onOk() {
				_this.setState({
					index: 0,
					choose: '',
					score: 0,
				});
			},
			onCancel() {},
		});
    };
    goBackIndex = () => {
		confirm({
			title: '你确定要返回首页吗?',
			content: '本次测试成绩将归0',
			onOk() {
				hashHistory.push('/');
			},
			onCancel() {},
		});
    };
    render() {
    	const questions = this.state.questions;
        const index = this.state.index;
    	const question = questions[index];
        const radioStyle = {
            display: 'block',
        };
        return (<div className="testPage" >
         <button className="yellowBtn" onClick={this.goBackIndex}>返回首页</button>
            {
				questions.length === 0 ? null : <div className="questionItem">
    <p className="questionNo">{`第${index + 1}题`}</p>
                        <div  className="questionImg">
                            <img alt="" src={question.url} />
                        </div>
    <p className="questionStem">{question.question}</p>
    <RadioGroup onChange={this.onChangeChoose} value={this.state.choose}>
        <Radio style={radioStyle} value="1">{`A.${question.item1}`}</Radio>
        <Radio style={radioStyle} value="2">{`B.${question.item2}`}</Radio>
        <Radio style={radioStyle} value="3">{`C.${question.item3}`}</Radio>
        <Radio style={radioStyle} value="4">{`D.${question.item4}`}</Radio>
    </RadioGroup>
					</div>
			}
            <div className="bottomBtn">
                <button className="blueBtn" onClick={this.correctAnswer}>下一题</button>
                <button className="grayBtn" onClick={this.handleRetest}>重新测试</button>
            </div>
        </div>);
    }
}
