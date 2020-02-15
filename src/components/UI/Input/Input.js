import React from 'react';
import classes from './Input.module.scss';

function isInvalid({valid, touched, shouldValidate}) {
	return !valid && shouldValidate && touched;
}

const Input = props => {
	const inputClasses = [classes.Input];
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;
	if (isInvalid(props)) {
		inputClasses.push(classes.invalid);
	}

	return (
		<div className={inputClasses.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				id={htmlFor}
				type={inputType}
				value={props.value}
				onChange={props.onChange}
			/>
			{
				isInvalid(props) ?
					<span>{props.errorMessage || 'Введите верное значение'}</span>
					: null
			}
		</div>
	);
};

export default Input;
