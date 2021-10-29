// Define the Answer State


export interface IAnswer {
	answerId: number, 
	text: string;
	words?: string[],
	options?: string[],
	createdBy: number,
	created: Date
}

export interface IAnswerJson extends Omit<IAnswer, 'created'> {
	created: string
}

export interface IAnswerState {
	readonly answers: IAnswer[];
	readonly answer?: IAnswer;
	loading: boolean;
	formMode: string;
}