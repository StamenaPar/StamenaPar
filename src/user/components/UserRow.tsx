import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IUser } from '../types';


interface IRowProps {
	user: IUser;
	onSelectUser: (userId: number) => IUser;
	edit: (roleId: number, userId: number) => void;
	remove: (roleId: number, userId: number) => void;
}

const UserRow: React.FC<IRowProps> = (props: IRowProps) => {

	const [hoverRef, hoverProps] = useHover();

	const { user, onSelectUser, edit, remove } = props;
	const { roleId: roleId, userId } = user;

   return (
		<div ref={hoverRef} className="name">
			<button
				className="user-button"
				onClick={() => onSelectUser(userId)}>
				{user.userName}
			</button>
			{hoverProps.isHovered && 
				<button className="button-edit" title="Edit" onClick={() => edit(roleId, userId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered &&
				<button className="button-remove" title="Remove" onClick={() => remove(roleId, userId)}>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</button>
			}
		</div>
	)
}

export default UserRow

