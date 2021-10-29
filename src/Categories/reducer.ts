// Import Reducer type
import { Reducer } from 'redux';

import {
	QuestionActions,
	QuestionActionTypes
} from './actions';

import { IQuestion, ICategory, ICategoriesState } from './types'

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
	question: undefined,
	categoryOptions: [],
	loading: false,
	formMode: 'display',
	categoryIdEditing: -1,
	isDetail: false
};


/*
const getQuestion = (
			categories: ICategory[], 
			categoryId: number, 
			questionId: number) : IQuestion|undefined => {
	const group = categories.find(g => g.categoryId === categoryId)
	if (!group)
		return undefined;

	const question = group
							.categories
							.find(q => q.questionId === questionId);
	return question;
}
*/


const aTypesToStore = Object.keys(QuestionActionTypes)
	.filter(a => a !== QuestionActionTypes.LOAD_CATEGORIES);

export const categoriesReducer: Reducer<ICategoriesState, QuestionActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(SUPPORT_CATEGORIES, JSON.stringify(newState.categories));
	}
	return newState;
}

const myReducer: Reducer<ICategoriesState, QuestionActions> = (
	state = initialCategoriesState,
	action
) => {
	switch (action.type) {

		case QuestionActionTypes.LOAD_CATEGORIES: {
			const {categories} = action;
			// for (let section of categories)
			// 	for (let question of section.questions)
			// 		question.words = question.text.split(' ');

			const categoryOptions = categories.map(g => ({value: g.categoryId, label: g.title}))
			categoryOptions.unshift({value: 0, label: 'Unknown'})
			
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
				categoryOptions
			};
		}
		

		case QuestionActionTypes.GET_QUESTION: {
			let question = undefined;
			for (let section of state.categories) {
				question = section.questions
					.find(question => question.questionId === action.questionId);
				if (question)
					break;
			}
			return {
				...state,
				question
			};
		}

		case QuestionActionTypes.ADD_QUESTION: {
			// const questionCategory = state.categories.find(g => g.categoryId === action.categoryId);
			// const questionId = questionCategory!.categories.length === 0
			// 	? 1
			// 	: Math.max(...questionCategory!.categories.map(q => q.questionId)) + 1;
			let questionIdMax = 0;
			for (let section of state.categories) {
				for (let question of section.questions) 
					if (question.questionId > questionIdMax)
						questionIdMax = question.questionId
			}
			return {
				...state,
				formMode: 'add',
				question: { 
					...initialQuestion,
					createdBy: action.createdBy,
					categoryId: action.categoryId, 
					questionId: questionIdMax + 1,
					text: action.text
				}
			};
		}

		case QuestionActionTypes.EDIT_QUESTION: {
			const questionCategory = state.categories.find(g => g.categoryId === action.categoryId);
			const question = questionCategory!.questions
				.find(question => question.questionId === action.questionId);
			return {
				...state,
				formMode: 'edit',
				question
			};
		}

		case QuestionActionTypes.STORE_QUESTION: {
			if (state.formMode === 'add') {
				const { question } = action;
				if (question.categoryId === 0 && !state.categories.map(g => g.categoryId).includes(0)) {
					// do something
					return {
						...state,
						formMode: 'edit',
						categories: [
							...state.categories,
							{ 
								...initialCategory, 
								categoryId: 0,
								title: 'Unknown',
								questions: [question]
							}
						]
					};
				}
				return {
					...state,
					formMode: 'edit',
					categories: state.categories.map(g => g.categoryId !== question.categoryId ?
						{ ...g, questions: [...g.questions] }
						:
						{ ...g, questions: [...g.questions, { ...question }] }
					)
				};
			}
			else {
				const { categories } = state;
				const {question} = action;
				const questionId: number = question.categoryId;
				const g = categories.find(g => g.categoryId === question.categoryId);
				const q = g!.questions.find(q => q.questionId === question.questionId);
				if (q) { // change question
					return {
						...state,
						formMode: 'edit',
						categories: categories.map(g => g.categoryId !== question.categoryId
							? { ...g, questions: [...g.questions]	}
							: {
								...g, 
								questions: g.questions
									.map(q => q.questionId !== question.questionId ?
										q : { ...question }
									)
							}
						)
					};
				}
				else { // assing question to another group
					return {
						...state,
						formMode: 'edit',
						categories: categories.map(g => g.categoryId !== question.categoryId
							? { ...g, questions: [...g.questions.filter(q=> q.questionId !== question.questionId)]	}
							: {	...g, questions: [...g.questions, { ...question } ]
							}
						)
					};
				}
			}
		}

		case QuestionActionTypes.CANCEL_QUESTION: {
			return {
				...state,
				formMode: 'display',
			};
		}

		case QuestionActionTypes.REMOVE_QUESTION: {
			return {
				...state,
				formMode: 'display',
				question: undefined,
				categories: state.categories.map(g => g.categoryId !== action.categoryId ?
					{ ...g, questions: [...g.questions] }
					:
					{ ...g, questions: g.questions.filter(q => q.questionId !== action.questionId) }
				)
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
			return {
				...state,
				categoryIdEditing: -1,
				categories: state.categories.map(g => g.categoryId !== action.group.categoryId ?
					g
					:
					{ ...g, title: action.group.title }
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

