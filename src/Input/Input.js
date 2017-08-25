import React, { Component } from 'react';
import './Input.css';

const classNames = require('classnames');

export class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.defaultValue,
		};
	}

	onChange(e) {
		this.setState({
			value: e.target.value
		});
		if (this.props.onChange instanceof Function)
			this.props.onChange(e);

		if (this.props.multiline === true) {
			if (this.props.autoHeight === true) {
				e.target.style.height = this.props.minHeight + 'px';

				if (e.target.scrollHeight <= this.props.maxHeight)
					e.target.style.height = e.target.scrollHeight + 'px';
				else
					e.target.style.height = this.props.maxHeight + 'px';
			}
		}
	}

	render() {
		return (
			<div className={classNames('rce-container-input', this.props.className)}>
				{
					this.props.leftButtons &&
					<div className='rce-input-buttons'>
						{this.props.leftButtons}
					</div>
				}
				{
					this.props.multiline === false ?
					<input
						type={this.props.type}
						className={classNames('rce-input')}
						placeholder={this.props.placeholder}
						value={this.state.value}
						style={this.props.inputStyle}
						onChange={this.onChange.bind(this)} />
					:
					<textarea
						type={this.props.type}
						className={classNames('rce-input', 'rce-input-textarea')}
						placeholder={this.props.placeholder}
						value={this.state.value}
						style={this.props.inputStyle}
						onChange={this.onChange.bind(this)}></textarea>
				}
				{
					this.props.rightButtons &&
					<div className='rce-input-buttons'>
						{this.props.rightButtons}
					</div>
				}
			</div>
		);
	}
}

Input.defaultProps = {
	type: 'text',
	placeholder: '',
	defaultValue: '',
	onChange: null,
	rightButtons: null,
	leftButtons: null,
	multiline: false,
	minHeight: 25,
	maxHeight: 200,
	autoHeight: true,
	inputStyle: null,
};

export default Input;
