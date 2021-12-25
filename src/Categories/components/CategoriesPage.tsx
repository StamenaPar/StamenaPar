import * as React from 'react';
import { useRef } from 'react'

import { ICategoriesProps } from '../types'


import { AutoSuggest } from '../../components/AutoSuggest';
import ContainerCategoryForm from '../containers/ContainerCategoryForm';
import ContainerQuestionForm from '../containers/ContainerQuestionForm';
import QuestionRow from './QuestionRow';
import CategoryRow from './CategoryRow';
import { useParams } from 'react-router-dom' // useRouteMatch
import { DetailView } from './DetailView';

import { COLORS } from '../../formik/theme';
import { updateCategory } from '../actions';
import { Col, Container, Row } from 'react-bootstrap';
import CategoryList from './CategoryList';
const color = 'blue';

type SupportParams = {
	tekst: string;
};

const Page: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {

	let { tekst } = useParams<SupportParams>();
	const { categories, categoryQuestions, category, question,
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

	console.log('RENDERUJEM Categories ----------->>>>>>>>>>')

	return (
		<>
			<Container>
				<Row style={{ border: '0px solid silver' }}>
					<Col lg={6} md={6} style={{ padding: '10px', backgroundColor: '#eff3f6', color: '#686c71' }}>
						<div style={{ border: '0px solid silver', backgroundColor: 'white' }}>
							<AutoSuggest
								categories={categories}
								tekst={tekst}
								onSelectQuestion={onSelectQuestion}
							/>
							<hr />
							<h3>Categories</h3>
							{categories &&
								<CategoryList {...props} />
							}
						</div>
					</Col>
					<Col lg={6} md={6} style={{ backgroundColor: '#eff3f6', color: '#686c71', padding: '10px' }}>
						<div style={{ border: '0px solid silver', backgroundColor: 'white' }}>
							{categories && question &&
								<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5] }}>
									<h4 style={{ marginTop: 0, color: 'white' }}>Question</h4>
									{formMode === 'display' ?
										<ContainerQuestionForm canEdit={false} />
										:
										<ContainerQuestionForm canEdit={canEdit} />
									}
								</div>
							}
							{categories && category &&
								<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5] }}>
									<h4 style={{ marginTop: 0, color: 'white' }}>Category</h4>
									{formMode === 'display' ?
										<ContainerCategoryForm canEdit={false} />
										:
										<ContainerCategoryForm canEdit={canEdit} />
									}
								</div>
							}							
						</div>
					</Col>
				</Row>
			</Container>
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

