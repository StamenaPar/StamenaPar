import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit, faCopy } from '@fortawesome/free-solid-svg-icons'

import { IQuestion, IQuestionAnswer } from '../types';


interface IQuestionAnswerRowProps {
	question: IQuestion;
	questionAnswer: IQuestionAnswer;
	selectQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	copyQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	removeQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
}

const QuestionAnswerRow: React.FC<IQuestionAnswerRowProps> = (props: IQuestionAnswerRowProps) => {

	const [hoverRef, hoverProps] = useHover();

	const { question, questionAnswer, selectQuestionAnswer, copyQuestionAnswer, removeQuestionAnswer } = props;
	const { categoryId, questionId } = question;
	const { answerId, text } = questionAnswer;
	const id = `inputQuestionAnswer${answerId}`;

	return (
		<div ref={hoverRef} className="name">
			{/* <input id={id} type="hidden" value={questionAnswer.text}></input> */}
			<button
				className="question-button"
				onClick={() => {
					// selectQuestionAnswer(categoryId, questionId, answerId)}
					alert('No action for the time being')
				}}
			>
				{questionAnswer.text}
			</button>
			{hoverProps.isHovered &&
				<button className="button-edit" title="Copy Answer to Cliboard"
					onClick={(e) => {
						//const input = document.querySelector<HTMLInputElement>('#' + id);
						if (navigator.clipboard) {
							navigator.clipboard.writeText(`${questionAnswer.text}`) // input!.value)
								.then(() => {
									console.log('Copied to clipboard successfully.');
								}, (err) => {
									console.log('Failed to copy the text to clipboard.', err);
								});
						}
						e.stopPropagation();
						// copyQuestionAnswer(categoryId, questionId, answerId);
					}
					}>
					<FontAwesomeIcon icon={faCopy} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered &&
				<button 
					className="button-remove"
					title="Remove"
					onClick={(e) => {
							removeQuestionAnswer(categoryId, questionId, answerId);
							e.preventDefault();
						}
					}
				>
					<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
				</button>
			}
		</div>
	)
}

export default QuestionAnswerRow

