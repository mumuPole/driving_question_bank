/**
 * Created by panchong on 17/7/20.
 */
import React from 'react';
import { Radio, Modal } from 'antd';
import { loadQuestion } from '../common/loadQuestion';

const RadioGroup = Radio.Group;
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
			Modal.success({
				title: '回答正确',
				content: questions[index].explains,
			});
			score += 1;
		} else {
			Modal.error({
				title: '回答错误',
				content: questions[index].explains,
			});
		}
		index += 1;
		this.setState({
			score,
			index,
			choose: '',
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
			{
				questions.length === 0 ? null : <div>
						<p>{`第${this.state.index + 1}题`}</p>
						<img alt="" src={question.url}/>
						<p>{question.question}</p>
						<RadioGroup onChange={this.onChangeChoose} value={this.state.choose}>
							<Radio style={radioStyle} value="1">{`A.${question.item1}`}</Radio>
							<Radio style={radioStyle} value="2">{`B.${question.item2}`}</Radio>
							<Radio style={radioStyle} value="3">{`C.${question.item3}`}</Radio>
							<Radio style={radioStyle} value="4">{`D.${question.item4}`}</Radio>
						</RadioGroup>
						<button className="blueBtn" onClick={this.correctAnswer}>下一题</button>
					</div>
			}
		</div>);
    }
}
