import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IAnswer } from '../types';
import { IQuestionAnswer } from '../../Categories/types';

interface IProps {
	answer: IAnswer,
	usedAnswers: IQuestionAnswer[],
	edit: (answerId: number) => void;
	remove: (answerId: number) => void;
}

export const ListRow: React.FC<IProps> = (props: IProps) => {
	const { answer, usedAnswers, edit, remove } = props;
	return (
		<tr key={answer.answerId} >
			<td className="name">
				{answer.answerId}
			</td>
			<td className="name">
				{answer.text}
			</td>
			<td>
				<button
					className="button-edit"
					title="Add a new Answer"
					onClick={() => edit(answer.answerId)}>
						<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			</td>
			<td>
				<button 
					disabled={usedAnswers.map(a=>a.answerId).includes(answer.answerId)}
					className="button-remove"
					title="Remove Answer"
					onClick={() => remove(answer.answerId)}>
						<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			</td>
		</tr>
	);
  }

