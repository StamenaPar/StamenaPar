import * as React from 'react';
import { useRef } from 'react'

import { IComponentProps } from '../types'


import { AutoSuggest } from '../../components/AutoSuggest';
import ContainerQuestionForm from '../containers/ContainerQuestionForm';
import QuestionRow from './QuestionRow';
import CategoryRow from './CategoryRow';
import { useParams } from 'react-router-dom' // useRouteMatch
import { DetailView } from './DetailView';

import { COLORS } from '../../formik/theme';
import { updateCategory } from '../actions';
const color = 'blue';

type SupportParams = {
	tekst: string;
};

const Page: React.FC<IComponentProps> = (props: IComponentProps) => {

	let { tekst } = useParams<SupportParams>();
	const { categories, categoryQuestions, question, 
			formMode, categoryIdEditing, onSelectQuestion, add, edit, remove, canEdit,
			addCategory, toggleCategory, editCategory, removeCategory, storeCategory, updateCategory,
			addAndAssignNewAnswer,
			who } = props;

		
	const inputEl = useRef<HTMLInputElement>(null);
	setTimeout(() => { 
		if (inputEl.current !== null)	 {
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
			<div className="name-container">
				<div className="two-columns">
					<div className="a">
						<AutoSuggest 
							categories={categories}
							tekst={tekst}
							onSelectQuestion={onSelectQuestion}
						/>
					</div>
					<div className="b">
					</div>
				</div>

				<hr />

				<div className="two-columns">
					<div className="a">
						<h3>Categories</h3>
						{categories && 
							categories.map(category => {
								const {categoryId, title, isExpanded} = category;
								const categoryState = categoryQuestions.get(categoryId);
								const { questions } = categoryState!;
								return (
									<div key={categoryId} style={{ paddingBottom: '5px'}}>
										<div style={{textAlign: 'start'}}>
											{categoryIdEditing === categoryId && 
												<input ref={inputEl} name="groupTitle" type="text" 
													onBlur={(e) => updateCategory({...category, title: e.target.value})}
													defaultValue={title}
												/>
											}
											{categoryIdEditing !== categoryId && (
												<CategoryRow 
													category={category}
													toggleCategory={toggleCategory}
													editCategory={editCategory}
													removeCategory={removeCategory}
												/>
											)}
										</div>
										{ isExpanded &&
											<div className="group-categories" style={{textAlign: 'start'}}>
												{questions.map(question => 
													<QuestionRow
														key={question.questionId}
														question={question}
														onSelectQuestion={onSelectQuestion}
														edit={edit}
														remove={remove}
													/>
												)}
												<div style={{marginLeft: '0%'}}>
													<button className="button-add" title="Add a new Question" onClick={() => add(category.categoryId, '')}>
														Add a new Question
													</button>
												</div>
											</div>
										}
									</div>
								);
						})}
						<div style={{ marginLeft: '1%' }}>
							<button className="button-add-group" title="Add a new Section" onClick={() => addCategory()}>
								Add a new Category
							</button>
						</div>
					</div>
					<div className="b">
						{categories && question &&
							<div style={{border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5]}}>
								<h4 style={{marginTop: 0, color: 'white'}}>Question</h4>
								{ formMode === 'display' ?
									<ContainerQuestionForm canEdit={false} />
									:
									<ContainerQuestionForm canEdit={canEdit} />
								}

							</div>
						}					
					</div>
				</div>
			</div>
			<DetailView 
				categoryId={question ? question!.categoryId : 0}
				questionId={question ? question!.questionId : 0}
				addAndAssignNewAnswer={addAndAssignNewAnswer}
				who={who}
			/>	{/* visible={isDetail} */}
	  </>
   );
  }

export default Page

