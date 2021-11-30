// Import Reducer type
import { Reducer } from 'redux';

import {
	QuestionActions,
	QuestionActionTypes
} from './actions';

import { IQuestion, ICategory, ICategoriesState, ICategoryState } from './types'
import { reduceQuestions } from './categoryReducer'

export const SUPPORT_CATEGORIES = 'SUPPORT_CATEGORIES';

export const initialQuestion: IQuestion = {
	categoryId: 0,
	questionId: 0,
	text: '',
	words: [],
	source: 0,
	status: 0,
	answers: [],
	createdBy: 0,
	created: new Date()
};

export const initialCategory: ICategory = {
	categoryId: 0,
	title: '',
	questions: [],
	isExpanded: false,
	createdBy: 0,
	created: new Date()
};


// Define the initial state
export const initialCategoriesState: ICategoriesState = {
	categories: [],
	categoryQuestions: new Map<number, ICategoryState>(),
	question: undefined,
	categoryOptions: [],
	loading: false,
	formMode: 'display',
	categoryIdEditing: -1,
	isDetail: false
};

const storeToStorage: string[] = [
	QuestionActionTypes.ADD_CATEGORY, 
	QuestionActionTypes.TOGGLE_CATEGORY,
	QuestionActionTypes.STORE_CATEGORY,
	QuestionActionTypes.UPDATE_CATEGORY,
	QuestionActionTypes.REMOVE_CATEGORY
] 

const aTypesToStore = Object.keys(QuestionActionTypes)
	.filter(a => storeToStorage.includes(a));

export const categoriesReducer: Reducer<ICategoriesState, QuestionActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(SUPPORT_CATEGORIES, JSON.stringify(newState.categories));
	}
	return newState;
}

const getQuestions = (categoryId: number, state: ICategoriesState): IQuestion[] => {
	const { categoryQuestions } = state;
	const categoryState = categoryQuestions.get(categoryId)!;
	return categoryState.questions
}

const myReducer: Reducer<ICategoriesState, QuestionActions> = (
	state = initialCategoriesState,
	action
) => {
	switch (action.type) {

		case QuestionActionTypes.LOAD_CATEGORIES: {
			const { categories, categoryQuestions } = action;
			//
			const categoryOptions = categories.map(g => ({ value: g.categoryId, label: g.title }))
			categoryOptions.unshift({ value: 0, label: 'Unknown' })
			//
			/*const categoryQuestions = new Map<number, ICategoryState>();
			for (let category of categories) {
				const categoryState: ICategoryState = {
					questions: [...category.questions]
				}
				categoryQuestions.set(category.categoryId, categoryState);
				category.questions = [];
			}*/
			//
			// if (fromData) {
			// 	categories.forEach(category => {
			// 		category.questions.forEach(q => q.categoryId = category.categoryId);
			// 		localStorage.setItem(`CATEGORY_${category.categoryId}`, JSON.stringify(category.questions));
			// 		category.questions = [];
			// 	} )
			// 	localStorage.setItem(SUPPORT_CATEGORIES, JSON.stringify(categories));
			// }
			return {
				...state,
				categories,
				categoryQuestions,
				categoryOptions
			};
		}


		case QuestionActionTypes.GET_QUESTION: {
			const { categoryId, questionId } = action;
			const questions = getQuestions(categoryId, state)
			const question = questions.find(q => q.questionId === questionId);
			return {
				...state,
				question
			};
		}

		case QuestionActionTypes.ADD_QUESTION: {
			const { categoryId } = action;
			const questions = getQuestions(categoryId, state)
			const questionId = Math.max(...questions.map(q => q.questionId)) + 1;
			return {
				...state,
				formMode: 'add',
				question: {
					...initialQuestion,
					createdBy: action.createdBy,
					categoryId,
					questionId,
					text: action.text
				}
			};
		}

		case QuestionActionTypes.EDIT_QUESTION: {
			const { categoryId, questionId } = action;
			const questions = getQuestions(categoryId, state)
			const question = questions.find(q => q.questionId === questionId)!;
			return {
				...state,
				formMode: 'edit',
				question,
				questionCopy: { ...question }
			};
		}

		case QuestionActionTypes.STORE_QUESTION: {
			const { question } = action;
			const { categoryId, questionId } = question;
			const categoryQuestions = reduceQuestions(state.categoryQuestions, action, categoryId);
			return {
				...state,
				formMode: 'edit',
				categoryQuestions
			};
		}

		case QuestionActionTypes.UPDATE_QUESTION: {
			let { categoryQuestions, questionCopy } = state;
			const { question } = action;
			const { categoryId, questionId } = question;
			const categoryIdCopy = questionCopy!.categoryId;
			if (question.categoryId === categoryIdCopy) { 
				// category hasn't been changed
				categoryQuestions = reduceQuestions(categoryQuestions, action, categoryId);
				return {
					...state,
					categoryQuestions,
					formMode: 'edit'
				};
			}
			else {
				// assing question to another group
				// 1) remove question from old category
				categoryQuestions = reduceQuestions(categoryQuestions, {
					...action,
					type: QuestionActionTypes.REMOVE_QUESTION,
					categoryId: categoryIdCopy,
					questionId
				}, categoryIdCopy);
				// 2) add question  to new category
				categoryQuestions = reduceQuestions(categoryQuestions, {
					...action,
					type: QuestionActionTypes.STORE_QUESTION
				}, categoryId);
				//
				return {
					...state,
					categoryQuestions,
					formMode: 'edit'
				};
			}
		}

		case QuestionActionTypes.CANCEL_QUESTION: {
			return {
				...state,
				formMode: 'display'
			};
		}

		case QuestionActionTypes.REMOVE_QUESTION: {
			const { categoryId, questionId } = action;
			let { categoryQuestions } = state;
			categoryQuestions = reduceQuestions(categoryQuestions, action, categoryId);
			return {
				...state,
				categoryQuestions,
				formMode: 'display',
				question: undefined
			};
		}

		// Question answers
		case QuestionActionTypes.REMOVE_QUESTION_ANSWER: {
			return {
				...state,
				categories: state.categories.map(g => g.categoryId !== action.categoryId ?
					{ ...g, questions: [...g.questions] }
					:
					{
						...g, questions: g.questions.map(q => q.questionId !== action.questionId ?
							{ ...q, answers: [...q.answers] }
							:
							{ ...q, answers: q.answers.filter(qa => qa.answerId !== action.answerId) }
						)
					})
			}
		}

		case QuestionActionTypes.ASSIGN_QUESTION_ANSWER: {
			const { categoryId, questionId, answerId, assignedBy } = action;

			return {
				...state,
				categories: state.categories.map(c => c.categoryId !== categoryId
					? { ...c, questions: [...c.questions] }
					: {
						...c, questions: c.questions.map(q => q.questionId !== questionId
							? { ...q, answers: [...q.answers] }
							: { ...q, answers: [...q.answers, { answerId, assignedBy, assigned: new Date() }] }
						)
					})
			}
		}

		case QuestionActionTypes.SET_IS_DETAIL: {
			return {
				...state,
				isDetail: action.isDetail
			}
		}

		///////////////////////////////////////////////////////////////////////////////////
		// groups

		case QuestionActionTypes.ADD_CATEGORY: {
			// const group =  state.categories.find(g => g.categoryId === action.categoryId);
			let categoryId = Math.max(...state.categories.map(g => g.categoryId)) + 1
			return {
				...state,
				categoryIdEditing: categoryId,
				categories: [...state.categories, { ...initialCategory, title: "New Section", categoryId }]
			};
		}

		case QuestionActionTypes.TOGGLE_CATEGORY: {
			const group = state.categories.find(g => g.categoryId === action.categoryId);
			return {
				...state,
				categories: state.categories.map(g => g.categoryId !== action.categoryId
					? g
					: { ...g, isExpanded: !g.isExpanded }
				)

			};
		}

		case QuestionActionTypes.EDIT_CATEGORY: {
			const group = state.categories.find(g => g.categoryId === action.categoryId)
			return {
				...state,
				categoryIdEditing: group!.categoryId
			};
		}

		case QuestionActionTypes.STORE_CATEGORY: {
			// const group = state.categories.find(g => g.categoryId === action.question.categoryId);
			const { category } = action;
			const { categoryQuestions } = state;
			const categoryState: ICategoryState = {
				questions: [] //...category.questions]
			}
			categoryQuestions.set(category.categoryId, categoryState)
			category.questions = [];
			return {
				...state,
				categoryIdEditing: -1,
				categories: [...state.categories, category],
				categoryQuestions
			}
		}

		case QuestionActionTypes.UPDATE_CATEGORY: {
			// const group = state.categories.find(g => g.categoryId === action.question.categoryId);
			const { category } = action;
			return {
				...state,
				categoryIdEditing: -1,
				categories: state.categories.map(g => g.categoryId !== category.categoryId
					? g
					: { ...g, title: category.title }
				)
			}
		}


		case QuestionActionTypes.REMOVE_CATEGORY: {
			return {
				...state,
				categories: state.categories.reduce((acc: ICategory[], g) => {
					if (g.categoryId !== action.categoryId)
						acc.push({ ...g, questions: [...g.questions] })
					return acc
				}, [])
			};
		}


		default:
			return state;
	}
};

