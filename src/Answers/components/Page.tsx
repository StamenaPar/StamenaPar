import * as React from 'react';
import { useParams } from 'react-router-dom' // useRouteMatch

import { IAnswer } from '../types';
import { AnswerForm } from './Form'
import { ListRow } from './ListRow';
import List from './List';
import { COLORS } from '../../formik/theme';
import { IQuestionAnswer } from '../../Categories/types';
import { IOption } from '../../common/types';
const color = 'blue';

interface IProps {
	answers: IAnswer[],
	answer: IAnswer,
	usedAnswers: IQuestionAnswer[],

	formMode: string,
	add: () => void;
	edit: (answerId: number) => void;
	remove: (answerId: number) => void;
	cancel: () => void;
	saveForm: (answer: IAnswer, formMode: string) => void;
}

type MyParams = {
	slug: string;
  };

const Page: React.FC<IProps> = (props: IProps) => {
	let { slug } = useParams<MyParams>();
	// slug = ''
	const { answers, answer, usedAnswers, formMode, add, edit, remove, cancel, saveForm } = props;
	return (
		<div className="name-container">
			{slug}
			{ answers.length === 0 && 
				<div>
					No answers at all
				</div>
			}
			{ answers.length > 0 && 
				<div className="two-columns">
					<div className="a">
						<List answers={answers} usedAnswers={usedAnswers} edit={edit} remove={remove} />
						<button onClick={() => add()}>Add new</button>
					</div>
					<div className="b">
						{formMode === 'add' &&
							<div style={{border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5]}}>
								<h4 style={{marginTop: 0, color: 'white'}}>New Answer</h4>
								<AnswerForm 
									answer={answer}
									formMode={formMode}
									cancel={cancel}
									saveForm={(answer: IAnswer) => saveForm(answer, formMode)} 
									/>
							</div>
						}
						{formMode === 'edit' &&
							<div style={{border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5]}}>
								<h4 style={{marginTop: 0, color: 'white'}}>Edit Answer</h4>
								<AnswerForm
									answer={answer}
									formMode={formMode}
									cancel={cancel}
									saveForm={(answer: IAnswer) => saveForm(answer, formMode)}
								/>
							</div>
						}					
					</div>
				</div>
		
			}

		</div>
	);
  }

export default Page

