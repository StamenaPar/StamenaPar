import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { IQuestion, IQuestionAnswer } from '../types';
import { IAnswer } from '../../Answers/types';
import { AutoSuggestAnswer } from '../../components/AutoSuggestAnswer';
import QuestionAnswerRow from './QuestionAnswerRow';

interface IProps {
	question: IQuestion,
	questionAnswers: IQuestionAnswer[],
	answers?: IAnswer[],
	canEdit: boolean,
	formMode: string,
	selectQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void,
	copyQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void,
	removeQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void,
	assignQuestionAnswer?: (categoryId: number, questionId: number, answerId: number, tekst?: string) => void,
	setAnswerText?: (val: string) => void,
	setIsDetail: (isDetail: boolean) => void
}

const QuestionAnswers: React.FC<IProps> = (props: IProps) => {
	const { 
		question, 
		questionAnswers, 
		answers, 
		canEdit, 
		formMode, 
		selectQuestionAnswer, copyQuestionAnswer, removeQuestionAnswer, 
		assignQuestionAnswer, setIsDetail 
	} = props; 
	const answersUnassigned = answers?.filter(a => !question.answers.map(a=>a.answerId).includes(a.answerId))

	const [tekst, setTekst] = React.useState('');
	const setAnswerText = (val: string) => {
		setTekst(val);
	}

	const assignQuestionAnswerTekst = () => {
		if (assignQuestionAnswer) {
			//storeAnswer({ answerId: -1, text: tekst }, 'add')
			assignQuestionAnswer(
				question.categoryId,
				question.questionId, 
				-1,
				tekst
			);
		}
	}

	const goDetail = (isDetail: boolean) => {
		setIsDetail(isDetail);

		const divDetailView = document.getElementById('divDetailView');
		divDetailView!.classList.add('detail-view-open');
		divDetailView!.style.zIndex = '3';
		//document.body.classList.add('hide-scroll-bar');
  	}	


    return (
      <div className="name-container question-answers">
			{/* { questionAnswers.length === 0 && 
				<div>
					No answers yet
				</div>
			} */}
			{ questionAnswers.length > -1 && 
				<>
				<table width="100%">
					<thead>
						<tr>
							<th>{ questionAnswers.length === 0 ? 'No answers yet' : 'Answers'}</th>
							{ canEdit && formMode !== 'display' && <th></th> }
						</tr>
					</thead>
					<tbody>
						{ questionAnswers.map(qa => 
							<tr key={qa.answerId}>
								<td className="name" title={`AnswerId:${qa.answerId}\nAssigned: ${qa.assigned.toLocaleDateString()} ${qa.assigned.toLocaleTimeString()}`}>
									<QuestionAnswerRow
										key={qa.answerId}
										question={question}
										questionAnswer={qa}
										selectQuestionAnswer={selectQuestionAnswer}
										copyQuestionAnswer={copyQuestionAnswer}
										removeQuestionAnswer={removeQuestionAnswer}
									/>
								</td>
								{/* <td className="name" title={`AnswerId:${qa.answerId}\nAssigned: ${qa.assigned.toLocaleDateString()} ${qa.assigned.toLocaleTimeString()}`}>
									{qa.text}
								</td>
								{ canEdit && formMode !== 'display' &&
									<td>
										<button className="button-remove" title="Remove Answer" 
											onClick={(e) => { 
												e.stopPropagation();
												e.preventDefault();
												removeQuestionAnswer!(question.categoryId, question.questionId, qa.answerId)
												}}>
											<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
										</button>
									</td>
								} */}
							</tr>
						)}
						{canEdit && formMode !== 'display' && <tr>
							<td>
								<AutoSuggestAnswer
									question={question}
									answersUnassigned={answersUnassigned!}
									assignQuestionAnswer={assignQuestionAnswer!}
									setAnswerText={setAnswerText}
								/>
							</td>
							<td width="35px">
								<button className="button-edit" title="Add a new Answer" onClick={
									(e) => {
										goDetail(true);
										e.preventDefault()
									}
								}>
									<FontAwesomeIcon icon={faPlus} color='lightblue' />
								</button>
							</td>
							</tr>}
					</tbody>
				</table>
				</>
			}
      </div>
    );
  }

export default QuestionAnswers

