import * as React from 'react';
import { useRef } from 'react'
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICategoriesProps } from '../types'


import { AutoSuggest } from '../../components/AutoSuggest';
import ContainerQuestionForm from '../containers/ContainerQuestionForm';
import QuestionRow from './QuestionRow';
import CategoryRow from './CategoryRow';
import { useParams } from 'react-router-dom' // useRouteMatch
import { DetailView } from './DetailView';

import { COLORS } from '../../formik/theme';
import { updateCategory } from '../actions';
const color = 'blue';

const CategoryList: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {

	const { categories, categoryQuestions, question,
		formMode, categoryIdEditing, onSelectCategory, onSelectQuestion, add, edit, remove, canEdit,
		addCategory, toggleCategory, editCategory, removeCategory, storeCategory, updateCategory,
		addAndAssignNewAnswer,
		who } = props;


	const inputEl = useRef<HTMLInputElement>(null);
	setTimeout(() => {
		if (inputEl.current !== null) {
			inputEl.current!.select();
			inputEl.current!.focus()
		}
	}, 100)

	// const expandCategory = (categoryId: number): void => {
	// 	const div = document.querySelector<HTMLDivElement>("#divCategory" + categoryId);
	// 	console.log(div)
	// 	div!.style.display = 'block';
	// }

	console.log('RENDERUJEM Categories ----------->>>>>>>>>>')

	return (
		<>
			{categories.map(category => {
				const { categoryId, title, isExpanded } = category;
				const categoryState = categoryQuestions.get(categoryId);
				const { questions } = categoryState!;
				return (
					<div key={categoryId} style={{ paddingBottom: '5px' }}>
						<div style={{ textAlign: 'start' }}>
							{categoryIdEditing === categoryId &&
								<input ref={inputEl} name="groupTitle" type="text"
									onBlur={(e) => updateCategory({ ...category, title: e.target.value })}
									defaultValue={title}
								/>
							}
							{categoryIdEditing !== categoryId && (
								<CategoryRow
									key={category.categoryId}
									category={category}
									onSelectCategory={onSelectCategory}
									toggleCategory={toggleCategory}
									editCategory={editCategory}
									removeCategory={removeCategory}
								/>
							)}
						</div>
						{isExpanded &&
							<div className="group-categories" style={{ textAlign: 'start' }}>
								{questions.map(question =>
									<QuestionRow
										key={question.questionId}
										question={question}
										onSelectQuestion={onSelectQuestion}
										edit={edit}
										remove={remove}
									/>
								)}
								<div style={{ marginLeft: '0%' }}>
									<button className="button-add" title="Add a new Question" onClick={() => add(category.categoryId, '')}>
										<FontAwesomeIcon icon={faPlus} size='xs' color='lightblue' />
									</button>
								</div>
							</div>
						}
					</div>
				);
			})
			}

			<div style={{ marginLeft: '1rem', textAlign: 'start' }}>
				<button className="button-add-category" title="Add a new Category" onClick={() => addCategory()}>
					<FontAwesomeIcon icon={faPlus} size='xs' color='lightblue' />
				</button>
			</div>
		</>

	)
}

export default CategoryList

