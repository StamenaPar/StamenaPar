// Define the User State
import { IOption } from '../common/types';

export interface IUser {
	roleId: number,
	userId: number,
	userName: string;
	pwd: string,
	department: string,
	createdBy: number,
	created: Date
}

export interface IUserJson extends Omit<IUser, 'created'> {
	created: string
}

export interface IRole {
	roleId: number,
	title: string,
	color: string,
	users: IUser[],
	isExpanded?: boolean,
	createdBy: number,
	created: Date
}

// Define the User State
export interface IUsersState {
	readonly roles: IRole[];
	readonly user: IUser | undefined;
	allUsers: IUser[],
	roleOptions: IOption<number>[];
	userOptions: IOption<number>[];
	loading: boolean,
	formMode: string;
	roleIdEditing: number;
	isDetail: boolean
}


export interface IRoleJson extends Omit<IRole, 'created' | 'users'> {
	users: IUserJson[],
	created: string
}

export interface IRolesProps {
	roles: IRole[];
	//groupOptions: IOption<number>[],
	user?: IUser;
	formMode: string,
	roleIdEditing: number,
	canEdit: boolean,
	onSelectUser: (userId: number) => IUser;
	add: (roleId: number, text: string, canEdit?: boolean) => void;
	edit: (roleId: number, userId: number) => void;
	remove: (roleId: number, userId: number) => void;
	// roles
	addRole: () => void;
	toggleRole: (roleId: number) => void;
	editRole: (roleId: number) => void;
	removeRole: (removeId: number) => void;
	storeRole: (role: IRole) => void;
	isDetail: boolean;
	setIsDetail: (isDetail: boolean) => void;
}

export interface IFormProps {
	user: IUser;
	formMode: string;
	canEdit: boolean,
	cancel: () => void;
	saveForm: (user: IUser, formMode: string) => void;
	setIsDetail: (isDetail: boolean) => void;
	roleOptions: IOption<number>[];
  }
 