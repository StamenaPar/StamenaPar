import * as React from 'react';
import { useParams } from 'react-router-dom' // useRouteMatch

import { IQuestion, ICategoriesProps, initialQuestion } from '../types';

import { AutoSuggest } from '../../components/AutoSuggest';
import ContainerQuestionForm from '../containers/ContainerQuestionForm'

import { COLORS } from '../../formik/theme';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const color = 'blue';

type SupportParams = {
	tekst: string;
};

const SupportPage: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {
	let { tekst } = useParams<SupportParams>();
	const { categories, categoryQuestions, question, onSelectQuestion, add, canEdit } = props;
	console.log('tekst:', tekst)
	return (
		<div className="name-container">
			<div className="two-columns">
				<div className="a">
					<div style={{ display: 'flex' }}>
						{/* Support Page tekst: {tekst} */}
						<AutoSuggest
							categories={categories}
							categoryQuestions={categoryQuestions}
							tekst={tekst}
							onSelectQuestion={onSelectQuestion}
						/>
						<button
							className="button-edit"
							title="Create a new Question"
							onClick={() => { add(0, tekst ?? ''); }
							}>
							<FontAwesomeIcon icon={faPlus} color='lightblue' />
						</button>
					</div>
				</div>
				<div className="b">
					{categories && question &&
						<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5] }}>
							<h4 style={{ marginTop: 0, color: 'white' }}>Question</h4>
							<ContainerQuestionForm canEdit={canEdit} />
							{/* <QuestionForm 
								question={question}
								questionAnswers={questionAnswers}
								answers={answers}
								formMode={formMode}
								cancel={cancel}
								saveForm={(question: IQuestion) => saveForm(question, formMode)}
								canEdit={canEdit}
								selectQuestionAnswer={selectQuestionAnswer}
								copyQuestionAnswer={copyQuestionAnswer}
								removeQuestionAnswer={removeQuestionAnswer}
								assignQuestionAnswer={assignQuestionAnswer}
								setIsDetail={setIsDetail}
								sourceOptions={sourceOptions}
								statusOptions={statusOptions}
								groupOptions={groupOptions}
							/> */}
						</div>
					}
				</div>
			</div>

		</div>
	);
}

export default SupportPage

