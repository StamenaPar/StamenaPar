import React, { useState, useEffect } from 'react'

import { IAnswer } from '../../Answers/types';
import { AnswerForm } from '../../Answers/components/Form'
import { COLORS } from '../../formik/theme';
import { IUser } from '../../user/types';
const color = 'blue';

interface IProps {
	categoryId: number,
	questionId: number,
	addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => void,
	lastAnswer?: IAnswer,
	who: IUser
}

//export default function DetailView() {
export const DetailView: React.FC<IProps> = (props: IProps) => {

	const { categoryId, questionId, addAndAssignNewAnswer, who } = props;
	useEffect(()=> {
		const divDetailView = document.getElementById('divDetailView');
		divDetailView!.addEventListener('animationend', () => {
			if (divDetailView!.classList.contains('detail-view-close')) {
				divDetailView!.style.zIndex = '0';
				divDetailView!.style.left = '100%';
				divDetailView!.classList.remove('detail-view-close');
			}
			else {
				divDetailView!.style.left = '60%';
			}
		});
	}, []);

	const close = () => {
		// dispatch({ type: 'GO_BACK', page: "LIST_PAGE" })
		const divDetailView = document.getElementById('divDetailView');
		divDetailView!.classList.remove('detail-view-open');
		divDetailView!.classList.add('detail-view-close');

		//document.body.classList.remove('hide-scroll-bar');
	}


	return (
		<div id="divDetailView" className="detail-view">
			{/* <div onClick={complete}>{todo.name}</div> */}
			<button style={{position: 'absolute', right:'10px'}} onClick={close}>X</button>
			{/* <div style={{width: '100%', border: '1px solid silver', borderRadius: '5px', padding: '0px'}}> */}
			<div style={{border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5]}}>
				<h4 style={{marginTop: 0, color: 'white'}}>Add and Assign new Answer</h4>
				<AnswerForm
					answer={{
						answerId: -1, 
						text: 'argh',
						createdBy: who.userId,
						created: new Date()
					}}
					formMode='add'
					cancel={() => {}}
					saveForm={(answer: IAnswer) => { 
						addAndAssignNewAnswer(categoryId, questionId, answer, 'add');
						close();
					}} 
				/>
			</div>				
		</div>
	)
}