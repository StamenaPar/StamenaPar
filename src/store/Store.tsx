import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { categoriesReducer } from '../Categories/categoriesReducer';
import { answerReducer } from '../Answers/reducer';

import { IAnswerState } from '../Answers/types';
import { ICategoriesState } from '../Categories/types';
import { IUsersState } from '../user/types';
import { userReducer } from '../user/reducer';
import { ITagState } from '../roleTags/types';
import { tagReducer } from '../roleTags/reducer';
import { ITopState } from '../Top/types';
import { topReducer } from '../Top/reducer';

export interface IAppState {
  categoriesState: ICategoriesState;
  answerState: IAnswerState;
  usersState: IUsersState;
  tagState: ITagState;
  topState: ITopState
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  categoriesState: categoriesReducer,
  answerState: answerReducer,
  usersState: userReducer,
  tagState: tagReducer,
  topState: topReducer
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}