import React from 'react';
import classes from './FinishedQuiz.module.scss';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === 'success') {
			total++;
		}
		return total;
	}, 0);

	const questionResult = new Map();
	questionResult.set('success', 'fa-check');
	questionResult.set('error', 'fa-times');
	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{props.quiz.map((quizItem, index) => {
					const quizResultClass = [
						'fa',
						props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
						classes[props.results[quizItem.id]],
					];

					return (
						<li
							key={index + 1}
						>
							<strong>{index + 1}</strong>. &nbsp;
							{quizItem.question}
							<i className={quizResultClass.join(' ')}/>
						</li>
					);
				})}
			</ul>

			<p>Правильно {successCount} из {props.quiz.length}</p>
			<div>
				{/*<button onClick={props.onRetry}>Повтор</button>*/}
				<Button onClick={props.onRetry} type="primary">Повторить</Button>
				<Link to="/">
					<Button type="success">Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	);
};

export default FinishedQuiz;