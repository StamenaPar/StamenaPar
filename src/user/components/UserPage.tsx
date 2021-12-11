import * as React from 'react';
import { useRef } from 'react'

import { IRolesProps } from '../types'

import { IUser } from '../types';

import { AutoSuggest } from '../../components/AutoSuggest';
import UserForm from '../containers/UserForm'
import UserRow from './UserRow';
import RoleRow from './RoleRow';
import { useParams } from 'react-router-dom' // useRouteMatch

import { COLORS } from '../../formik/theme';
const color = 'blue';

type SupportParams = {
	tekst: string;
};

const UserPage: React.FC<IRolesProps> = (props: IRolesProps) => {

	let { tekst } = useParams<SupportParams>();
	const { roles: userRoles, user,
		formMode, roleIdEditing: roleIdEditing, 
		onSelectUser, add, edit, remove, canEdit,
		addRole: addRole, toggleRole: toggleRole, editRole: editRole, removeRole: removeRole, storeRole: storeRole,
		setIsDetail, isDetail } = props;

	const inputEl = useRef<HTMLInputElement>(null);
	setTimeout(() => {
		if (inputEl.current !== null) {
			inputEl.current!.select();
			inputEl.current!.focus()
		}
	}, 100)

	// const expandRole = (roleId: number): void => {
	// 	const div = document.querySelector<HTMLDivElement>("#divRole" + roleId);
	// 	console.log(div)
	// 	div!.style.display = 'block';
	// }
	return (
		<div className="name-container">
			<hr />
			{/* <h4 style={{ textAlign: 'center' }}>Maintenance (visible only for Admins) </h4> */}
			<div className="two-columns">
				<div className="a">
					<h3>Users by Role</h3>
					{userRoles &&
						userRoles.map(role => {
							const { roleId: roleId, title, isExpanded, users } = role;
							return (
								<div key={roleId} style={{ paddingBottom: '5px' }}>
									<div style={{textAlign: 'start'}}>
										{roleIdEditing === roleId &&
											<input ref={inputEl} name="groupTitle" type="text"
												onBlur={(e) => storeRole({ ...role, title: e.target.value })}
												defaultValue={title}
											/>
										}
										{roleIdEditing !== roleId && (
											<RoleRow
												userRole={role}
												toggleRole={toggleRole}
												editRole={editRole}
												removeRole={removeRole}
											/>
										)}
									</div>
									{isExpanded &&
										<div className="group-users" style={{marginLeft: '20px', textAlign: 'start'}}>
											{users.map(user =>
												<UserRow
													key={user.userId}
													user={user}
													onSelectUser={onSelectUser}
													edit={edit}
													remove={remove}
												/>
											)}
											<div style={{ marginLeft: '0%' }}>
												<button className="button-add" title="Add a new User" onClick={() => add(role.roleId, '')}>
													Add a new User
												</button>
											</div>
										</div>
									}
								</div>
							);
						})}
					<div style={{ marginLeft: '1%' }}>
						<button className="button-add-category" title="Add a new Section" onClick={() => addRole()}>
							Add a new Role
						</button>
					</div>
				</div>
				<div className="b">
					{userRoles && user &&
						<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5] }}>
							<h4 style={{ marginTop: 0, color: 'white' }}>User</h4>
							{formMode === 'display' ?
								<span>DisplayForm</span>
								:
								<UserForm canEdit={canEdit}	/>
							}
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default UserPage

