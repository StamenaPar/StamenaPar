// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { ICategory } from '../types'
import { IAnswer } from '../../Answers/types'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 
import {IOption} from '../../common/types';

import {
	getCategory, 
	addCategory, 
	editCategory,
	removeCategory,
	storeCategory,
	updateCategory,
	cancelCategory,
	setIsDetail,
	QuestionActions
} from '../actions'

import { CategoryForm } from '../components/CategoryForm';



interface IProps {
	canEdit: boolean
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState } = store;
	const { category, formMode } = categoriesState; 
	return {
		category,
		formMode,
		canEdit: ownProps.canEdit
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		onSelectCategory: (categoryId: number, questionId: number) => dispatch<any>(getCategory(categoryId)),
		add: (categoryId: number, text: string, canEdit?: boolean) => dispatch<any>(addCategory(categoryId, text, canEdit)),
		edit: (categoryId: number) => dispatch<any>(editCategory(categoryId)),
		remove: (categoryId: number) => dispatch<any>(removeCategory(true, categoryId)),
		saveForm: (category: ICategory, formMode: string) => 
			dispatch<any>(formMode==='add'?storeCategory(true, category):updateCategory(true, category)),
		cancel: () => dispatch<any>(cancelCategory()),
		setIsDetail: (isDetail: boolean) => {
			dispatch<any>(setIsDetail(isDetail))
		},

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
