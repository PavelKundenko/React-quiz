import React from 'react';
import classes from './AnswerItem.module.scss';

const AnswerItem = props => {
	const answerItem = [classes.AnswerItem];

	if (props.state) {
		answerItem.push(classes[props.state]);
	}

	return (
		<li
			className={answerItem.join(' ')}
			onClick={() => props.onAnswerClick(props.answer.id)}
		>
			{props.answer.text}
		</li>
	);
};

export default AnswerItem;