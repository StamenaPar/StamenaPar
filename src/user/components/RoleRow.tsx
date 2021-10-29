import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { IRole } from '../types';


interface IUserRowProps {
	userRole: IRole;
	toggleRole: (roleId: number) => void;
	editRole: (roleId: number) => void;
	removeRole: (roleId: number) => void;
}

const RoleRow: React.FC<IUserRowProps> = (props: IUserRowProps) => {

	const [hoverRef, hoverProps] = useHover();
	const { userRole, toggleRole, editRole, removeRole } = props;
	const {roleId: roleId, title, users, isExpanded, color} = userRole;

	return (
		<div ref={hoverRef} key={roleId} className="name" >
			<button
				className="button-edit"
				title="Expand"
				onClick={() => toggleRole(roleId)} 
				style={{ marginLeft: '5px' }}
			>
				<FontAwesomeIcon icon={isExpanded?faCaretDown:faCaretRight} color={color} size='lg' />
			</button>
			<span className='role-title' style={{color}}>{title}</span>
			{hoverProps.isHovered &&
				<button className="button-edit" title="Edit Section" onClick={() => editRole(roleId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered && users.length === 0 &&
				<button className="button-remove" title="Remove Section" onClick={() => removeRole(roleId)}>
					<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
				</button>
			}
		</div>
	)
}

export default RoleRow

