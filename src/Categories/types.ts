import { IAnswer } from '../Answers/types'
import { IOption } from '../common/types';
import { IUser } from '../user/types';

// Define the Question type

export interface IQuestionAnswer {
	answerId: number,
	assignedBy: number,
	assigned: Date,
	text?: string
}

export interface IQuestionAnswerJson extends Omit<IQuestionAnswer, 'assigned'> {
	assigned: string
}


export interface IQuestion {
	categoryId: number,
	questionId: number,
	text: string,
	words?: string[],
	answers: IQuestionAnswer[],
	source: number,
	status: number,
	createdBy: number,
	created: Date,
	categoryIdWas?: number
}

export interface IQuestionJson extends Omit<IQuestion, 'categoryId' | 'answers' | 'created'> {
	categoryId?: number,
	answers: IQuestionAnswerJson[],
	created: string
}

export interface ICategory {
	categoryId: number,
	title: string,
	questions: IQuestion[],
	isExpanded?: boolean,
	createdBy: number,
	created: Date
}

export interface ICategoryJson extends Omit<ICategory, 'created' | 'questions'> {
	questions: IQuestionJson[],
	created: string
}

export const initialQuestion: IQuestion = {
	categoryId: 0,
	questionId: 0,
	text: '',
	words: [],
	answers: [],
	source: 0,
	status: 0,
	createdBy: 0,
	created: new Date()
 };

 export interface ICategoriesProps {
	categories: ICategory[];
	categoryQuestions: Map<number, ICategoryState>,
	categoryOptions: IOption<number>[],
	category: ICategory | undefined;
	question: IQuestion | undefined;
	lastAnswer?: IAnswer;
	formMode: string,
	categoryIdEditing: number,
	canEdit: boolean,
	who: IUser,
	navbarOpen: boolean,
	onSelectQuestion: (categoryId: number, questionId: number) => IQuestion;
	add: (categoryId: number, text: string, canEdit?: boolean) => void;
	edit: (categoryId: number, questionId: number) => void;
	remove: (categoryId: number, questionId: number) => void;
	// groups
	onSelectCategory: (categoryId: number) => ICategory;
	addCategory: () => void;
	toggleCategory: (categoryId: number) => void;
	editCategory: (categoryId: number) => void;
	removeCategory: (categoryId: number) => void;
	storeCategory: (group: ICategory) => void;
	updateCategory: (group: ICategory) => void;
	// question answer
	addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => void
}

export interface ICategoryState {
	questions: IQuestion[];
}


// Define the Question State
export interface ICategoriesState {
	readonly categories: ICategory[];
	readonly category: ICategory | undefined;
	readonly question: IQuestion | undefined;
	categoryCopy?: ICategory;
	questionCopy?: IQuestion;
	categoryQuestions: Map<number, ICategoryState>,
	categoryOptions: IOption<number>[];
	loading: boolean,
	formMode: string;
	categoryIdEditing: number;
	isDetail: boolean
}


export interface IQuestionFormProps {
	question: IQuestion;
	questionAnswers: IQuestionAnswer[];
	answers: IAnswer[];
	formMode: string;
	canEdit: boolean,
	cancel: () => void;
	saveForm: (question: IQuestion, formMode: string) => void;
	selectQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	copyQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	removeQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	assignQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	setIsDetail: (isDetail: boolean) => void;
	categoryOptions: IOption<number>[];
  }

  export interface ICategoryFormProps {
	category: ICategory | undefined;
	formMode: string;
	canEdit: boolean,
	cancel: () => void;
	saveForm: (category: ICategory, formMode: string) => void;
	setIsDetail: (isDetail: boolean) => void;
  }

