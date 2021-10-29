// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
// Import Tag Typing
import { ITag, ITagState } from './types';
import data from "./data.json"
const storageTagsDemo: ITag[] = data;

// Create Action Constants
export enum TagActionTypes {
	GET_ALL_TAGS = 'GET_ALL_TAGS',
  	GET_TAG = 'GET_TAG'
}

// Interface for Get All Action Type
export interface IGetAll {
	type: TagActionTypes.GET_ALL_TAGS;
	tags: ITag[];
 }
 
export interface IGet {
	type: TagActionTypes.GET_TAG;
	tag: ITag;
}

// localStorage
export const SUPPORT_TAGS = 'SUPPORT_TAGS' 
const storageTags: ITag[] = [
]


// Combine the action types with a union (we assume there are more)
export type TagActions = IGetAll | IGet;

const isWebStorageSupported = () => 'localStorage' in window

// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const getAllTags: ActionCreator<
  ThunkAction<Promise<any>, ITagState, null, IGetAll>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
		// const response = await axios.get('https://swapi.co/api/people/');
		if (isWebStorageSupported()) {
			const sTags = localStorage.getItem(SUPPORT_TAGS);
			if (sTags !== null) {
				const Tags: ITag[] = JSON.parse(sTags);
				Tags.map(g => storageTags.push(g))
			}
			else {
				storageTagsDemo.map(g => storageTags.push(g))	
			}
		}
		else {
			storageTagsDemo.map(g => storageTags.push(g))
		}

		//const response = await getTagsFromLocalStorage(); 
      dispatch({
        type: TagActionTypes.GET_ALL_TAGS,
        tags: storageTags //response.data.results,
      });
    } catch (err) {
      console.error(err);
    }
  };
};




