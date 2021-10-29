// Import Reducer type
import { Reducer } from 'redux';
import {
	AnswerActions,
	AnswerActionTypes,
	SUPPORT_ANSWERS
} from './actions';

import { IAnswer, IAnswerState } from './types'

const initialAnswer: IAnswer = {
	answerId: 0,
	text: '',
	words: [],
	options: [],
	createdBy: 0,
	created: new Date()
};

const initialAnswerState: IAnswerState = {
	answers: [],
	answer: undefined,
	loading: false,
	formMode: 'display'
};

const aTypesToStore = Object.keys(AnswerActionTypes).filter(a => a !== AnswerActionTypes.GET_ALL_ANSWERS);

export const answerReducer: Reducer<IAnswerState, AnswerActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(SUPPORT_ANSWERS, JSON.stringify(newState.answers));
	}
	return newState;
}

const myReducer: Reducer<IAnswerState, AnswerActions> = (
	state = initialAnswerState,
	action
) => {
	switch (action.type) {

		case AnswerActionTypes.GET_ALL_ANSWERS: {
			return {
				...state,
				answers: action.answers.map(answer => { return { 
					...answer,
					words: answer.text.split(' ') 
				} }),
			};
		}

		case AnswerActionTypes.GET_ANSWER: {
			const answer = state.answers.find(a => a.answerId === action.answerId);
			return {
				...state,
				answer
			};
		}

		case AnswerActionTypes.ADD_ANSWER: {
			return {
				...state,
				formMode: 'add',
				answer: {
					...initialAnswer,
					createdBy: action.createdBy,
					answerId: state.answers.length === 0 
						? 1
						: Math.max(...state.answers.map(a => a.answerId)) + 1
				}
			};
		}

		case AnswerActionTypes.EDIT_ANSWER: {
			const answer = state.answers.find(a => a.answerId === action.answerId);
			return {
				...state,
				formMode: 'edit',
				answer: { ...answer!, words: answer!.text.split(' ') }
			};
		}

		case AnswerActionTypes.STORE_ANSWER: {
			const { answer } = action;
			let { answerId } = answer!;
			let answers = [];
			if (state.formMode === 'add') {
				if (answerId === -1) {
					answer.answerId = state.answers.length === 0
						? 1
						: Math.max(...state.answers.map(a => a.answerId)) + 1;
				}
				answers = [...state.answers, { ...answer, words: answer.text.split(' ') }]
			}
			else {
				answers = state.answers.map(a => a.answerId === answerId
					? { ...answer, words: answer.text.split(' ') }
					: a)
			}
			return {
				...state,
				formMode: 'edit',
				answers,
				answer
			};
		}	

		case AnswerActionTypes.CANCEL_ANSWER: {
			return {
				...state,
				formMode: 'display'
			};
		}

		case AnswerActionTypes.REMOVE_ANSWER: {
			return {
				...state,
				formMode: 'display',
				answers: state.answers.filter(a => a.answerId !== action.answerId)
			};
		}

		// case AnswerActionTypes.STORE_ANSWERS_TO_LOCAL_STORAGE: {
		// 	localStorage.setItem(SUPPORT_ANSWERS, JSON.stringify(state.answers));
		// 	return state;
		// }   	
		default:
			return state;
	}
};