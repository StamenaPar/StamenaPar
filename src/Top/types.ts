// Define the Top State

import { IUser, IUserJson } from "../user/types";

// -----
// Auth
// -----


export interface IAuth {
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
	navbarOpen: boolean,
	isAuthenticated: boolean | null;
	uuid: string | null;
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
	isAuthenticated: boolean | null;
	uuid: string | null;
	who: ILogin,
	authError?: string,
	formMode: string;
	canEdit: boolean,
	isRegister: boolean,
	cancel: () => void;
	saveForm: (login: ILogin, formMode: string, isRegister: boolean) => void;
  }

  export interface ILogin {
	  userName: string,
	  pwd: string,
  }