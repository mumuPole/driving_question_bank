import React from 'react';
import { Modal, Icon } from 'antd';
import './chargeModal.less';

export default class ChargeModal extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            timer: null,
            timeout: null,
            time: 5,
            judgeStatus: true,
            explain: '',
        };
    }

    show = (status, explain) => {
        this.setState({
            visible: true,
            judgeStatus: status,
            explain,
        });
        let time = 5;
        this.state.timer = setInterval(() => {
            time -= 1;
            this.setState({
                time,
            });
        }, 1000);
        this.state.timeout = setTimeout(() => {
            if (this.state.timer !== null) {
                this.hide();
            }
        }, 5000);
    };
    hide = () => {
        this.props.onNext();
        this.setState({
            visible: false,
            time: 5,
        });
        clearInterval(this.state.timer);
        clearTimeout(this.state.timeout);
    };

    render() {
        return (<Modal
            closable={false}
            title={this.state.judgeStatus ? '回答正确' : '回答错误'}
            visible={this.state.visible}
            footer={<button type="button" className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.hide}>
                <span>知道了</span></button>}
            wrapClassName="chargeModal"
        >
			<div className="flex_row_start">
				{
					this.state.judgeStatus ? <Icon type="check-circle" className="success" style={{ fontSize: '20px' }} /> :
						<Icon type="close-circle" className="error" style={{ fontSize: '20px' }} />
				}
				<div className="content">
					<p>{this.state.explain}</p>
				</div>
			</div>
            倒计时：{this.state.time}秒后关闭
        </Modal>);
    }
}
