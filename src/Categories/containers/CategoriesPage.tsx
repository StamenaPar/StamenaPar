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
	toggleCategory,
	getCategory
} from '../actions'

import CategoriesPage from '../components/CategoriesPage'
import SupportPage from '../components/SuportPage'

interface IProps {
	canEdit: boolean
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState, tagState, topState} = store;
	
	const { 
		categories,
		categoryQuestions,
		category,
		question,
		categoryOptions,
		formMode,
		categoryIdEditing,
		isDetail
	} = categoriesState;

	return {
		categories,
		categoryQuestions,
		categoryOptions,
		category,
		question,
		formMode,
		categoryIdEditing,
		canEdit: ownProps.canEdit,
		isDetail,
		tagOptions: tagState.tags.map(f => ({ label: f.name, value: f.tagId, color: f.color })),
		who: topState.top.auth!.who,
		navbarOpen: topState.top.navbarOpen
	};
};

const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		onSelectQuestion: (categoryId: number, questionId: number) => dispatch<any>(getQuestion(categoryId, questionId)),
		add: (categoryId: number, text: string, canEdit?: boolean) => {
			dispatch<any>(addQuestion(categoryId, text, canEdit))
		},
		edit: (categoryId: number, questionId: number) => dispatch<any>(editQuestion(categoryId, questionId)),
		remove: (categoryId: number, questionId: number) => dispatch<any>(removeQuestion(categoryId, questionId)),

		// groups
		onSelectCategory: (categoryId: number) => dispatch<any>(getCategory(categoryId)),
		addCategory: () => dispatch<any>(addCategory()),
		toggleCategory: (categoryId: number) =>  dispatch<any>(toggleCategory(categoryId)),
		editCategory: (categoryId: number) =>  dispatch<any>(editCategory(categoryId)),
		removeCategory: (categoryId: number) => dispatch<any>(removeCategory(true, categoryId)),
		storeCategory: (group: ICategory) => dispatch<any>(storeCategory(true, group)),
		updateCategory: (group: ICategory) => dispatch<any>(updateCategory(true, group)),

		addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => {
			dispatch<any>(addAndAssignNewAnswer(categoryId, questionId, answer, formMode))
		}
	}
}


export default {
	categories: connect(mapStateToProps, mapDispatchToProps)(CategoriesPage),
	supporter: connect(mapStateToProps, mapDispatchToProps)(SupportPage)
};