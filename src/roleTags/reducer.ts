// Import Reducer type
import { Reducer } from 'redux';
import {
  TagActions,
  TagActionTypes
} from './actions';

import {ITag, ITagState } from './types'

const initialTag: ITag = {
	tagId: 0,
	name: ''
};

const initialTagState: ITagState = {
	tags: [],
	loading: false,
	formMode: 'display'
};


export const tagReducer: Reducer<ITagState, TagActions> = (
  state = initialTagState,
  action
) => {
  switch (action.type) {

   case TagActionTypes.GET_ALL_TAGS: {
		return {
        ...state,
        tags: action.tags.map(tag => ({...tag}) ),
      };
	} 

 	case TagActionTypes.GET_TAG: {
      return {
		  ...state,
        tag: action.tag
      };
	}    

	default:
   		return state;
  }
};