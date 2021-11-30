// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion, IQuestionAnswer, ICategory } from '../types'
import { IAnswer } from '../../Answers/types'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import { QuestionActions,  
	getQuestion, 
	addQuestion, 
	editQuestion,
	removeQuestion,
	addCategory,
	editCategory,
	removeCategory,
	storeCategory,
	updateCategory,
	addAndAssignNewAnswer,
	toggleCategory
} from '../actions'

import CategoriesPage from '../components/CategoriesPage'
import SupportPage from '../components/SuportPage'

interface IProps {
	canEdit: boolean
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState, tagState} = store;
	const { 
		categories,
		categoryQuestions,
		question,
		categoryOptions,
		formMode,
		categoryIdEditing,
		isDetail
	} = categoriesState; 
	console.log('mapStateToProps', categoryQuestions)
	return {
		categories,
		categoryQuestions,
		categoryOptions,
		question: question!,
		formMode,
		categoryIdEditing,
		canEdit: ownProps.canEdit,
		isDetail,
		tagOptions: tagState.tags.map(f => ({ label: f.name, value: f.tagId, color: f.color })),
		who: store.topState.top!.auth!.who
	};
};

const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		onSelectQuestion: (categoryId: number, questionId: number) => dispatch<any>(getQuestion(categoryId, questionId)),
		add: (categoryId: number, text: string, canEdit?: boolean) => dispatch<any>(addQuestion(categoryId, text, canEdit)),
		edit: (categoryId: number, questionId: number) => dispatch<any>(editQuestion(categoryId, questionId)),
		remove: (categoryId: number, questionId: number) => dispatch<any>(removeQuestion(categoryId, questionId)),

		// groups
		addCategory: () => dispatch<any>(addCategory()),
		toggleCategory: (categoryId: number) =>  dispatch<any>(toggleCategory(categoryId)),
		editCategory: (categoryId: number) =>  dispatch<any>(editCategory(categoryId)),
		removeCategory: (categoryId: number) => dispatch<any>(removeCategory(categoryId)),
		storeCategory: (group: ICategory) => dispatch<any>(storeCategory(group)),
		updateCategory: (group: ICategory) => dispatch<any>(updateCategory(group)),

		addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => {
			dispatch<any>(addAndAssignNewAnswer(categoryId, questionId, answer, formMode))
		}
	}
}


export default {
	categories: connect(mapStateToProps, mapDispatchToProps)(CategoriesPage),
	supporter: connect(mapStateToProps, mapDispatchToProps)(SupportPage)
};