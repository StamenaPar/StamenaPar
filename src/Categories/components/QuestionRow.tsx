import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IQuestion } from '../types';


interface IQuestionRowProps {
	question: IQuestion;
	onSelectQuestion: (categoryId: number, questionId: number) => IQuestion;
	edit: (categoryId: number, questionId: number) => void;
	remove: (categoryId: number, questionId: number) => void;
}

const QuestionRow: React.FC<IQuestionRowProps> = (props: IQuestionRowProps) => {

	const [hoverRef, hoverProps] = useHover();

	const { question, onSelectQuestion, edit, remove } = props;
	const { categoryId, questionId } = question;

   return (
		<div ref={hoverRef} className="name">
			<button
				className="question-button"
				onClick={() => onSelectQuestion(categoryId, questionId)}>
				{question.text}
			</button>
			{hoverProps.isHovered && 
				<button className="button-edit" title="Edit" onClick={() => edit(categoryId, questionId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered &&
				<button className="button-remove" title="Remove" onClick={() => remove(categoryId, questionId)}>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
		</div>
	)
}

export default QuestionRow

