import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { ICategory } from '../types';


interface ICategoryRowProps {
	category: ICategory;
	toggleCategory: (categoryId: number) => void;
	editCategory: (categoryId: number) => void;
	removeCategory: (categoryId: number) => void;
	onSelectCategory: (categoryId: number) => void;
}

const CategoryRow: React.FC<ICategoryRowProps> = (props: ICategoryRowProps) => {

	const [hoverRef, hoverProps] = useHover();
	const { category, toggleCategory, editCategory, removeCategory, onSelectCategory } = props;
	const {categoryId, title, questions: categories, isExpanded} = category;

	return (
		<div ref={hoverRef} key={categoryId} className="name">
			<button
				className="button-edit"
				title="Expand"
				onClick={() => toggleCategory(categoryId)} 
				style={{ marginLeft: '5px' }}
			>
				<FontAwesomeIcon icon={isExpanded?faCaretDown:faCaretRight} color='orange' size='lg' />
			</button>
			<span className='question-group-title' onClick={() => onSelectCategory(categoryId)}>{title}</span>
			{hoverProps.isHovered &&
				<button className="button-edit" title="Edit Section" onClick={() => editCategory(categoryId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered && categories.length === 0 &&
				<button className="button-remove" title="Remove Section" onClick={() => removeCategory(categoryId)}>
					<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
				</button>
			}
		</div>
	)
}

export default CategoryRow

