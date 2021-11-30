// Define the Top State

import { IUser, IUserJson } from "../user/types";

// -----
// Auth
// -----


interface IAuth {
	who: IUser,
	authenticated?: Date,
	visited?: Date
}

export interface IAuthJson extends Omit<IAuth, 'who' | 'authenticated' | 'visited'> {
	who: IUserJson,
	authenticated: string,
	visited: string
}

// -----
// Top
// -----
export interface ITop {
	isAuthenticated: boolean;
	authError?: string,
	auth?: IAuth;
}
export interface ITopJson extends Omit<ITop, 'auth'> {
	auth: IAuthJson;
}

export interface ITopState {
	top: ITop
}


export interface IFormProps {
	isAuthenticated: boolean;
	who: ILogin,
	authError?: string,
	formMode: string;
	canEdit: boolean,
	cancel: () => void;
	saveForm: (login: ILogin, formMode: string) => void;
  }

  export interface ILogin {
	  name: string,
	  pwd: string,
  }