// import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IAppState } from '../../store/Store';

import { AnswerActions,  addAnswer, editAnswer, removeAnswer, storeAnswer, cancelAnswer } from '../actions' // , IAddAnswer

import { IAnswer } from '../types'

import Page from '../components/Page'
import { IQuestionAnswer, ICategory } from '../../Categories/types';

const getUsedAnswers = (categories: ICategory[]) : IQuestionAnswer[]=> {
	let questionAnswers: IQuestionAnswer[] = [];
	for (let category of categories)
		for (let question of category.questions)
		questionAnswers = questionAnswers.concat(question.answers)
	return questionAnswers;
}

const mapStateToProps = (store: IAppState) => {
  return {
	answers: store.answerState.answers,
	answer: store.answerState.answer!,
	formMode: store.answerState.formMode,
	usedAnswers: getUsedAnswers(store.categoriesState.categories),
	who: store.topState.top.auth!.who
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnswerActions>) => {
	return {
		//setFormMode: (formMode: string) => dispatch<any>(setFormMode(formMode)),
		add: () => dispatch<any>(addAnswer()),
		edit: (answerId: number) => dispatch<any>(editAnswer(answerId)),
		remove: (answerId: number) => dispatch<any>(removeAnswer(answerId)),
		saveForm: (answer: IAnswer, formMode: string) => dispatch<any>(storeAnswer(answer, formMode)),
		cancel: () => dispatch<any>(cancelAnswer()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);