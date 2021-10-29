// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// Import Answer Typing
import { IAnswer, IAnswerState, IAnswerJson } from './types';

import { IAppState } from '../store/Store';

import data from "./data.json"
const parseFromJson = (): IAnswer[] => {
	return data.map(a => parseDates(a))
}

const parseFromLocalStorage = (arr: IAnswerJson[]) : IAnswer[] =>  {
	return arr.map(a => parseDates(a));
}

const parseDates = (a: IAnswerJson): IAnswer => ({
	...a, 
	created: new Date(a.created)
})

// localStorage
export const SUPPORT_ANSWERS = 'SUPPORT_ANSWERS';
 
// Create Action Constants
export enum AnswerActionTypes {
  GET_ALL_ANSWERS = 'GET_ALL_ANSWERS',
  GET_ANSWER = 'GET_ANSWER',
  ADD_ANSWER = 'ADD_ANSWER',
  EDIT_ANSWER = 'EDIT_ANSWER',
  REMOVE_ANSWER = 'REMOVE_ANSWER',
  STORE_ANSWER = 'STORE_ANSWER',
  CANCEL_ANSWER = 'CANCEL_ANSWER'
}

// Interface for Get All Action Type
export interface IGetAll {
	type: AnswerActionTypes.GET_ALL_ANSWERS;
	answers: IAnswer[];
 }
 
export interface IGet {
	type: AnswerActionTypes.GET_ANSWER;
	answerId: number;
}

export interface IAdd {
	type: AnswerActionTypes.ADD_ANSWER;
	createdBy: number
}

export interface IEdit {
	type: AnswerActionTypes.EDIT_ANSWER;
	answerId: number;
}

export interface IRemove {
	type: AnswerActionTypes.REMOVE_ANSWER;
	answerId: number;
}

export interface IStore {
	type: AnswerActionTypes.STORE_ANSWER;
	answer: IAnswer;
	assignToQuestion?: boolean
}

export interface ICancel {
	type: AnswerActionTypes.CANCEL_ANSWER;
}


// Combine the action types with a union (we assume there are more)
export type AnswerActions = IGetAll | IGet | IAdd | IEdit | IRemove | IStore | ICancel;

const isWebStorageSupported = () => 'localStorage' in window

// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const getAllAnswers: ActionCreator<
	ThunkAction<Promise<any>, IAnswerState, null, IGetAll>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			// const response = await axios.get('https://swapi.co/api/people/');
			let answers: IAnswer[] = [];
			if (isWebStorageSupported()) {
				const sAnswers = localStorage.getItem(SUPPORT_ANSWERS);
				console.log('SAnswers',  sAnswers)
				if (sAnswers !== null) {
					const parsed = JSON.parse(sAnswers);
					answers = parseFromLocalStorage(parsed);
				}
				else {
					answers = parseFromJson();
				}
			}
			else {
				answers = parseFromJson();
			}

			dispatch({
				type: AnswerActionTypes.GET_ALL_ANSWERS,
				answers
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const addAnswer: ActionCreator<any> = () => {
  return (dispatch: Dispatch, getState: () => IAppState) => {
    try {
      dispatch({
        type: AnswerActionTypes.ADD_ANSWER,
		createdBy: getState().topState.top!.auth!.who!.userId,	
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAnswerState, null, IGet>
> = (answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: AnswerActionTypes.GET_ANSWER,
				answerId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const editAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAnswerState, null, IEdit>
> = (answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: AnswerActionTypes.EDIT_ANSWER,
				answerId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const removeAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAnswerState, null, IGetAll>
> = (answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: AnswerActionTypes.REMOVE_ANSWER,
				answerId
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const storeAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStore>
> = (answer: IAnswer, formMode: string) => {
	return async (dispatch: Dispatch, getState: () => IAppState ): Promise<any> => {
		try {
			if (formMode === 'add') {
				dispatch({
					type: AnswerActionTypes.STORE_ANSWER,
					answer
				});
				return Promise.resolve(getState().answerState.answer!.answerId)
			}
			else {
				dispatch({
					type: AnswerActionTypes.STORE_ANSWER,
					answer
				});
				
			}
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const cancelAnswer: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
	  try {
		 dispatch({
			type: AnswerActionTypes.CANCEL_ANSWER
		 });
	  } catch (err) {
		 console.error(err);
	  }
	};
 };
 

// const addAnswerToLocalStorage = (answer: IAnswer): Promise<any> => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve({
// 				'status': 200,
// 				'content-type': 'application/json',
// 				'data' : {
// 				'results': answer
// 				}
// 			})
// 		}, 50)
// 	})
// }

