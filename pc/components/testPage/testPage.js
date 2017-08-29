/**
 * Created by panchong on 17/7/20.
 */
import React from 'react';
import { hashHistory } from 'react-router';
import { Radio, Modal } from 'antd';
import { loadQuestion } from '../common/loadQuestion';
import ChargeModal from './chargeModal';
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
            isTime: false,
            timer: null,
            timeout: null,
            time: 15,
        };
    }

    componentDidMount() {
        loadQuestion(this.props.params.subject, this.props.params.modal, this.props.params.type).then(data => {
            this.setState({
                questions: data,
                index: 0,
                isTime: this.props.params.time,
            });
            if (this.props.params.time === 'true') {
                this.setTime();
            }
        });
    }

    componentWillUnmount() {
    	this.clearTime();
    }
    setTime() {
    	let time = this.state.time;
    	this.state.timer = setInterval(() => {
        time -= 1;
        this.setState({
            time,
        });
    }, 1000);
        this.state.timeout = setTimeout(() => {
			this.clearTime();
			this.correctAnswer();
        }, 15000);
    }
    clearTime() {
    	if (this.state.timer !== null) {
        clearInterval(this.state.timer);
    }
    	if (this.state.timeout !== null) {
        clearTimeout(this.state.timeout);
    }
        this.setState({
            time: 15,
        });
    }
    onChangeChoose = e => {
        this.setState({
            choose: e.target.value,
        });
    };
    correctAnswer = () => {
        this.clearTime();
        const questions = this.state.questions;
        const index = this.state.index;
        this.ChargeModal.show(this.state.choose === questions[index].answer, questions[index].explains);
    };
    handleNext = () => {
        const questions = this.state.questions;
        const index = this.state.index;
        let score = this.state.score;
        score = this.state.choose === questions[index].answer ? score + 1 : score;
        this.setState({
            score,
            choose: '',
            index: index + 1,
        });
        this.setTime();
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
            onCancel() {
            },
        });
    };
    goBackIndex = () => {
        confirm({
            title: '你确定要返回首页吗?',
            content: '本次测试成绩将归0',
            onOk() {
                hashHistory.push('/');
            },
            onCancel() {
            },
        });
    };

    render() {
        const questions = this.state.questions;
        const index = this.state.index;
        const question = questions[index];
        const radioStyle = {
            display: 'block',
        };
        return (<div className="testPage">
            <div className="flex_row_around flex_vertical_middle">
                <button className="yellowBtn" onClick={this.goBackIndex}>返回首页</button>
				<p><span style={{fontSize: '30px', color: 'red'}}>{this.state.score}</span>分</p>
                {
					this.state.timer ? <p>倒计时：{this.state.time}秒</p> : null
				}
            </div>
            {
				questions.length === 0 ? null : <div className="questionItem">
    <p className="questionNo">{`第${index + 1}题`}</p>
    <div className="questionImg">
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
            <ChargeModal
                onNext={this.handleNext}
                ref={com => {
                    this.ChargeModal = com;
                }}
            />
        </div>);
    }
}
