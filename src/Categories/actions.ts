// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

// Import Question Typing
import { IQuestion, ICategory, ICategoryJson, ICategoriesState, IQuestionJson, ICategoryState } from './types';

import { addAnswer, AnswerActionTypes, storeAnswer } from '../Answers/actions'
import { IAnswer, IAnswerState } from '../Answers/types';

///////////////////////////////////////////////////
// localStorage
import { initialCategory, SUPPORT_CATEGORIES } from './categoriesReducer';

import data from "./data.json"
import { IAppState } from '../store/Store';
import { reduceQuestions } from './categoryReducer';

const parseFromJson = (): ICategory[] => {
	return data.map(g => parseDates(g));
}

const parseQuestionsFromLocalStorage = (questions: IQuestionJson[]): IQuestion[] => {
	return questions.map(q => ({
		...q,
		categoryId: q.categoryId!,
		answers: q.answers.map(a => ({ ...a, assigned: new Date(a.assigned) })),
		created: new Date(q.created)
	})
	)
}

const parseFromLocalStorage = (arr: ICategoryJson[]): ICategory[] => {
	return arr.map(g => parseDates(g));
}

const parseDates = (g: ICategoryJson): ICategory => {
	return {
		...g,
		questions: g.questions.map(q => ({
			...q,
			categoryId: g.categoryId,
			answers: q.answers.map(a => ({ ...a, assigned: new Date(a.assigned) })),
			created: new Date(q.created)
		})),
		created: new Date(g.created)
	}
}

// Create Action Constants
export enum QuestionActionTypes {
	LOAD_CATEGORIES = 'LOAD_CATEGORIES',
	GET_QUESTION = 'GET_QUESTION',
	ADD_QUESTION = 'ADD_QUESTION',
	EDIT_QUESTION = 'EDIT_QUESTION',
	REMOVE_QUESTION = 'REMOVE_QUESTION',
	STORE_QUESTION = 'STORE_QUESTION',
	UPDATE_QUESTION = 'UPDATE_QUESTION',
	CANCEL_QUESTION = 'CANCEL_QUESTION',
	// groups
	GET_CATEGORY = 'GET_CATEGORY',
	ADD_CATEGORY = 'ADD_CATEGORY',
	TOGGLE_CATEGORY = 'EXPAND_CATEGORY',
	EDIT_CATEGORY = 'EDIT_CATEGORY',
	REMOVE_CATEGORY = 'REMOVE_CATEGORY',
	STORE_CATEGORY = 'STORE_CATEGORY',
	UPDATE_CATEGORY = 'UPDATE_CATEGORY',
	CANCEL_CATEGORY = 'CANCEL_CATEGORY',
	// question answers
	REMOVE_QUESTION_ANSWER = 'REMOVE_QUESTION_ANSWER',
	ASSIGN_QUESTION_ANSWER = 'ASSIGN_QUESTION_ANSWER',
	// localSTorage
	SET_IS_DETAIL = 'SET_IS_DETAIL',
	SET_LAST_ANSWER_ID = 'SET_LAST_ANSWER_ID'
}


// Interface for Get All Action Type
export interface ILoad {
	type: QuestionActionTypes.LOAD_CATEGORIES;
	categories: ICategory[];
	categoryQuestions: Map<number, ICategoryState>
}


export interface IGet {
	type: QuestionActionTypes.GET_QUESTION;
	categoryId: number;
	questionId: number;
}

export interface IAdd {
	type: QuestionActionTypes.ADD_QUESTION;
	createdBy: number;
	categoryId: number;
	text: string;
}

export interface IEdit {
	type: QuestionActionTypes.EDIT_QUESTION;
	categoryId: number,
	questionId: number
}

export interface IRemove {
	type: QuestionActionTypes.REMOVE_QUESTION;
	categoryId: number,
	questionId: number
}

export interface IStore {
	type: QuestionActionTypes.STORE_QUESTION;
	question: IQuestion;
}

export interface IUpdate {
	type: QuestionActionTypes.UPDATE_QUESTION;
	question: IQuestion;
}

export interface ICancel {
	type: QuestionActionTypes.CANCEL_QUESTION;
}

// group

export interface IGetCategory {
	type: QuestionActionTypes.GET_CATEGORY;
	categoryId: number
}

export interface IAddCategory {
	type: QuestionActionTypes.ADD_CATEGORY;
	//categoryId: number
}

export interface ICancelCategory {
	type: QuestionActionTypes.CANCEL_CATEGORY;
}


export interface IToggleCategory {
	type: QuestionActionTypes.TOGGLE_CATEGORY;
	categoryId: number
}

export interface IEditCategory {
	type: QuestionActionTypes.EDIT_CATEGORY;
	categoryId: number
}

export interface IRemoveCategory {
	type: QuestionActionTypes.REMOVE_CATEGORY;
	categoryId: number
}

export interface IStoreCategory {
	type: QuestionActionTypes.STORE_CATEGORY;
	category: ICategory;
}

export interface IUpdateCategory {
	type: QuestionActionTypes.UPDATE_CATEGORY;
	category: ICategory;
}

export interface ICancelCategory {
	type: QuestionActionTypes.CANCEL_CATEGORY;
}


// question answers
export interface IRemoveQuestionAnswer {
	type: QuestionActionTypes.REMOVE_QUESTION_ANSWER;
	categoryId: number,
	questionId: number,
	answerId: number
}

export interface IAssignQuestionAnswer {
	type: QuestionActionTypes.ASSIGN_QUESTION_ANSWER;
	categoryId: number,
	questionId: number,
	answerId: number,
	assignedBy: number,
	tekst?: string
}

export interface ISetIsDetail {
	type: QuestionActionTypes.SET_IS_DETAIL;
	isDetail: boolean
}

export interface IAddAndAssignNewAnswer {
	type: AnswerActionTypes.STORE_ANSWER;
	categoryId: number,
	questionId: number,
	answer: IAnswer;
}


// Combine the action types with a union (we assume there are more)
export type QuestionActions = ILoad | IGet | IAdd | IEdit | IRemove | IStore | IUpdate | ICancel |
	IGetCategory | IAddCategory | IToggleCategory | IEditCategory | IRemoveCategory | IStoreCategory | IUpdateCategory | ICancelCategory |
	IRemoveQuestionAnswer | IAssignQuestionAnswer |
	ISetIsDetail |
	IAddAndAssignNewAnswer;

const isWebStorageSupported = () => 'localStorage' in window


// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const loadCategories: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, ILoad>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			let categories: ICategory[] = [];
			let loadedFromStorage = false;
			if (isWebStorageSupported()) {
				const sCategories = localStorage.getItem(SUPPORT_CATEGORIES);
				if (sCategories !== null) {
					// load from storage
					const categoriesJson = JSON.parse(sCategories);
					categories = parseFromLocalStorage(categoriesJson);
					categories.forEach(category => {
						const sQuestions = localStorage.getItem(`CATEGORY_${category.categoryId}`);
						if (sQuestions) {
							const json = JSON.parse(sQuestions);
							category.questions = parseQuestionsFromLocalStorage(json);
						}
					})
					loadedFromStorage = true;
				}
			}

			if (!loadedFromStorage) {
				// load from data
				categories = parseFromJson();
				for (let category of categories) {
					category.questions.forEach(q => {
						q.categoryId = category.categoryId;
						q.words = q.text.split(' ');
					})
					localStorage.setItem(`CATEGORY_${category.categoryId}`, JSON.stringify(category.questions));
				}
			}

			const categoryQuestions = new Map<number, ICategoryState>();
			for (let category of categories) {
				const categoryState: ICategoryState = {
					questions: [...category.questions]
				}
				categoryQuestions.set(category.categoryId, categoryState);
				category.questions = [];
			}

			if (!loadedFromStorage) {
				localStorage.setItem(SUPPORT_CATEGORIES, JSON.stringify(categories));
			}

			dispatch({
				type: QuestionActionTypes.LOAD_CATEGORIES,
				categories,
				categoryQuestions
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};


// Get Question <Promise<Return Type>, State Interface, Type of Param, Type of Action> 
export const getQuestion: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, string, IGet>
> = (categoryId: number, questionId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.GET_QUESTION,
				categoryId,
				questionId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

interface IMsg {
	ttype: string,
	data: object
}



export const addQuestion: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IAdd>
> = (categoryId: number, text: string, canEdit?: boolean) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			dispatch({
				type: QuestionActionTypes.ADD_QUESTION,
				createdBy: getState().topState.top!.auth!.who!.userId,
				categoryId,
				text
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const editQuestion: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IEdit>
> = (categoryId: number, questionId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.EDIT_QUESTION,
				categoryId,
				questionId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const removeQuestion: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemove>
> = (doSync: boolean, categoryId: number, questionId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION,
				categoryId,
				questionId
			});
			if (doSync)
				syncWithOthers(QuestionActionTypes.REMOVE_QUESTION, {categoryId, questionId});
		} catch (err) {
			console.error(err);
		}
	};
};

export const selectQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION_ANSWER,
				categoryId: categoryId,
				questionId: questionId,
				answerId: answerId,
			});
			//dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const copyQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION_ANSWER,
				categoryId: categoryId,
				questionId: questionId,
				answerId: answerId,
			});
			//dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const removeQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION_ANSWER,
				categoryId: categoryId,
				questionId: questionId,
				answerId: answerId,
			});
			// dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const assignQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number, tekst?: string) => {

	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			await delay();
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.ASSIGN_QUESTION_ANSWER,
				categoryId,
				questionId,
				answerId,
				assignedBy: getState().topState.top!.auth!.who!.userId,
			});
			//dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const setIsDetail: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, ISetIsDetail>
> = (isDetail: boolean) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.SET_IS_DETAIL,
				isDetail
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

const syncWithOthers = (type: string, entity: any) => {
	const btnSync = document.getElementById('btnSync');
	localStorage.setItem('syncAction', JSON.stringify({
			type,
			entity,
			sessionId: sessionStorage.getItem('sessionId')
		})
	);
	btnSync!.click();
};

export const storeQuestion: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStore>
> = (doSync: boolean, question: IQuestion) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		const { categoryId } = question;
		try {
			//await delay();
			if (categoryId === 0) {
				const res = await addCategoryUnknown(getState(), dispatch);
				dispatch({
					type: QuestionActionTypes.STORE_QUESTION,
					question
				});
			}
			else {
				dispatch({
					type: QuestionActionTypes.STORE_QUESTION,
					question
				});
			}
			if (doSync)
				syncWithOthers(QuestionActionTypes.STORE_QUESTION, question);
		}
		catch (err) {
			console.error(err);
		}
	};
};

const addCategoryUnknown = async (state: IAppState, dispatch: Dispatch) => {
	if (state.categoriesState.categories.find(c => c.categoryId === 0))
		return Promise.resolve(-1);
	const newCategory = {
		...initialCategory,
		categoryId: 0,
		title: 'Unknown',
		questions: []
	}
	return dispatch<any>(storeCategory(newCategory))
		.then((categoryId: number) => {
			return categoryId;
		});
}

export const updateQuestion: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IUpdate>
> = (doSync: boolean, question: IQuestion) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			const { categoryId } = question;
			await delay();
			if (categoryId === 0) {
				const res = await addCategoryUnknown(getState(), dispatch);
				dispatch({
					type: QuestionActionTypes.UPDATE_QUESTION,
					question
				});
			}
			else {
				dispatch({
					type: QuestionActionTypes.UPDATE_QUESTION,
					question
				});
			}
			if (doSync) {
				question.categoryIdWas = getState().categoriesState.questionCopy!.categoryId;
				syncWithOthers(QuestionActionTypes.UPDATE_QUESTION, question);
			}
		}
		catch (err) {
			console.error(err);
		}
	};
};


const delay = (): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data': {
					'results': 1
				}
			})
		}, 50)
	})
}

export const cancelQuestion: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.CANCEL_QUESTION
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const getCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, string, IGet>
> = (categoryId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.GET_CATEGORY,
				categoryId
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const addCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IAddCategory>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.ADD_CATEGORY
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const toggleCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IEditCategory>
> = (categoryId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.TOGGLE_CATEGORY,
				categoryId
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const editCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IEditCategory>
> = (categoryId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.EDIT_CATEGORY,
				categoryId
			});
		} catch (err) {
			console.error(err);
		}
	};
}

export const removeCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveCategory>
> = (doSync: boolean, categoryId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after update, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_CATEGORY,
				categoryId
			});
			if (doSync)
				syncWithOthers(QuestionActionTypes.REMOVE_CATEGORY, categoryId);
		} catch (err) {
			console.error(err);
		}
	};
};

export const storeCategory: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStoreCategory>
> = (doSync: boolean, category: ICategory) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			// await updateCategoryFromLocalStorage(group);
			dispatch({
				type: QuestionActionTypes.STORE_CATEGORY,
				category
			});
			if (doSync)
				syncWithOthers(QuestionActionTypes.STORE_CATEGORY, category);
			return Promise.resolve(category.categoryId) //getState().categoriesState.categories.length)
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const updateCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IStoreCategory>
> = (doSync: boolean, category: ICategory) => {
	return async (dispatch: Dispatch) => {
		try {
			// await updateCategoryFromLocalStorage(group);
			dispatch({
				type: QuestionActionTypes.UPDATE_CATEGORY,
				category
			});
			if (doSync)
				syncWithOthers(QuestionActionTypes.UPDATE_CATEGORY, category);
		} catch (err) {
			console.error(err);
		}
	};
};

export const cancelCategory: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.CANCEL_CATEGORY
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const addAndAssignNewAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStore>
> = (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			answer.createdBy = getState().topState.top!.auth!.who!.userId;
			dispatch<any>(addAnswer());
			dispatch<any>(storeAnswer(answer, formMode))
				.then((answerId: number) => {
					dispatch<any>(assignQuestionAnswer(categoryId, questionId, answerId))
				});
		}
		catch (err) {
			console.error(err);
		}
	};
};