import React, {Component} from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import {connect} from 'react-redux';
import {auth} from '../../store/actions/auth';

class Auth extends Component {
	state = {
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Enter correct email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: '',
				type: 'password',
				label: 'Password',
				errorMessage: 'Enter correct password',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
	};

	loginHandler = event => {
		event.preventDefault();
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			true,
		);
	};

	registerHandler = event => {
		event.preventDefault();
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			true,
		);
	};

	submitHandler = event => {
	};

	validateControl(value, validation) {
		if (!validation) {
			return true;
		}

		let isValid = true;

		if (validation.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (validation.email) {
			isValid = is.email(value) && isValid;
		}

		if (validation.minLength) {
			isValid = value.trim().length >= validation.minLength && isValid;
		}

		return isValid;
	}

	onChangeHandler = (event, controlName) => {
		const formControls = {...this.state.formControls};
		const control = {...formControls[controlName]};

		control.value = event.target.value;
		control.touched = true;
		control.valid = this.validateControl(control.value, control.validation);

		formControls[controlName] = control;

		let isFormValid = true;

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid;
		});

		this.setState({
			formControls, isFormValid,
		});
	};

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={event => this.onChangeHandler(event, controlName)}
				/>
			);
		});
	}

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Авторизация</h1>
					<form onSubmit={this.submitHandler} className={classes.AuthForm}>
						{this.renderInputs()}
						<Button
							type="success"
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}
						>Войти
						</Button>
						<Button
							type="success"
							onClick={this.registerHandler}
							disabled={!this.state.isFormValid}
						>Зарегистрироваться
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
	};
}

export default connect(null, mapDispatchToProps)(Auth);