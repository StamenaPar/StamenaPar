import * as React from 'react';
import { IQuestionAnswer } from '../../Categories/types';

import { IAnswer } from '../types';
import { ListRow } from './ListRow';

interface IProps {
	answers: IAnswer[],
	usedAnswers: IQuestionAnswer[],
	edit: (answerId: number) => void;
	remove: (answerId: number) => void;
}

const List: React.FC<IProps> = (props: IProps) => {
	const { answers, usedAnswers, edit, remove } = props;
	return (
		<table width="100%">
			<thead>
				<tr>
					<th>Id</th>
					<th>Answer</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{ answers.map(answer => 
					<ListRow
						key={answer.answerId}
						answer={answer}
						usedAnswers={usedAnswers}
						edit={edit}
						remove={remove}
					/>
				)}
			</tbody>
		</table>
	);
  }

export default List

