// Define the Answer State
export interface ITag {
	tagId: number, 
	name: string;
	color?: string;
}

export interface ITagState {
	readonly tags: ITag[];
	readonly tag?: ITag;
	loading: boolean;
	formMode: string;
}