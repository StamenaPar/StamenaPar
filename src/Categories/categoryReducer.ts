// Import Reducer type
import { Reducer } from 'redux';

import {
	QuestionActions,
	QuestionActionTypes
} from './actions';

import { IQuestion, ICategory, ICategoryState, initialQuestion } from './types'

export const CATEGORY = 'CATEGORY';

// Define the initial state
export const initialCategoryState: ICategoryState = {
	questions: []
};


/*
const getQuestion = (
			category: ICategory[], 
			categoryId: number, 
			questionId: number) : IQuestion|undefined => {
	const group = category.find(g => g.categoryId === categoryId)
	if (!group)
		return undefined;

	const question = group
							.category
							.find(q => q.questionId === questionId);
	return question;
}
*/


const aTypesToStore = Object.keys(QuestionActionTypes)
	.filter(a => a !== QuestionActionTypes.LOAD_CATEGORY);

export const categoryReducer: Reducer<ICategoryState, QuestionActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(CATEGORY, JSON.stringify(newState.questions));
	}
	return newState;
}

const myReducer: Reducer<ICategoryState, QuestionActions> = (
	state = initialCategoryState,
	action
) => {
	switch (action.type) {

		case QuestionActionTypes.LOAD_CATEGORY: {
			const {questions} = action;

			for (let question of state.questions)
				question.words = question.text.split(' ');

			// if (fromData) {
			// 	category.forEach(category => {
			// 		localStorage.setItem(`CATEGORY_${category.categoryId}`, JSON.stringify(category.questions));
			// 		category.questions = [];
			// 	} )
			// 	localStorage.setItem(CATEGORY, JSON.stringify(category));
			// }
			return {
				...state,
				questions
			};
		}

		case QuestionActionTypes.GET_QUESTION: {
			const question = state.questions.find(q => q.questionId === action.questionId);
			return {
				...state,
				question
			};
		}

		case QuestionActionTypes.ADD_QUESTION: {
			// const questionCategory = state.category.find(g => g.categoryId === action.categoryId);
			// const questionId = questionCategory!.category.length === 0
			// 	? 1
			// 	: Math.max(...questionCategory!.category.map(q => q.questionId)) + 1;
			let questionIdMax = 0;
			for (let question of state.questions)
				if (question.questionId > questionIdMax)
					questionIdMax = question.questionId
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
			const question = state.questions
				.find(question => question.questionId === action.questionId);
			return {
				...state,
				formMode: 'edit',
				question
			};
		}

		/*
		case QuestionActionTypes.STORE_QUESTION: {
			if (state.formMode === 'add') {
				const { question } = action;
				if (question.categoryId === 0) { //} && !state.category.map(g => g.categoryId).includes(0)) {
					// do something
					return {
						...state,
						formMode: 'edit',
						...initialCategory,
						categoryId: 0,
						title: 'Unknown',
						questions: [question]
					};
				}
				return {
					...state,
					formMode: 'edit',
					questions: [...state.questions, { ...question }]
				};
			}
			else {
				const { question } = action;
				const questionId: number = question.categoryId;
				//const g = category.find(g => g.categoryId === question.categoryId);
				//const q = g!.questions.find(q => q.questionId === question.questionId);
				return {
					...state,
					formMode: 'edit',
					questions: state.questions
						.map(q => q.questionId !== question.questionId
							? q
							: { ...question }
						)
				};
				// else { // assing question to another group
				// 	return {
				// 		...state,
				// 		formMode: 'edit',
				// 		category: category.map(g => g.categoryId !== question.categoryId
				// 			? { ...g, questions: [...g.questions.filter(q=> q.questionId !== question.questionId)]	}
				// 			: {	...g, questions: [...g.questions, { ...question } ]
				// 			}
				// 		)
				// 	};
				// }
			}
		}
		*/

		case QuestionActionTypes.CANCEL_QUESTION: {
			return {
				...state,
				formMode: 'display'
			};
		}

		case QuestionActionTypes.REMOVE_QUESTION: {
			return {
				...state,
				formMode: 'display',
				question: undefined,
				questions: state.questions.filter(q => q.questionId !== action.questionId)
			};
		}

		// Question answers
		case QuestionActionTypes.REMOVE_QUESTION_ANSWER: {
			return {
				...state,
				questions: state.questions.map(q => q.questionId !== action.questionId
					? { ...q, answers: [...q.answers] }
					: { ...q, answers: q.answers.filter(qa => qa.answerId !== action.answerId) }
				)
			}
		}

		case QuestionActionTypes.ASSIGN_QUESTION_ANSWER: {
			const { categoryId, questionId, answerId, assignedBy } = action;

			return {
				...state,
				questions: state.questions.map(q => q.questionId !== questionId
					? { ...q, answers: [...q.answers] }
					: { ...q, answers: [...q.answers, { answerId, assignedBy, assigned: new Date() }] }
				)
			}
		}

		case QuestionActionTypes.SET_IS_DETAIL: {
			return {
				...state,
				isDetail: action.isDetail
			}
		}


		default:
			return state;
	}
};

