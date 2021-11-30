import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IAnswer } from '../types';
import { COLORS } from '../../formik/theme';
import { Select } from '../../common/Select';
import { IOption } from '../../common/types';
import UserName from '../../common/containers/UserName'

interface IProps {
	answer: IAnswer;
	formMode: string;
	options?: string[];
	cancel: () => void;
	saveForm: (answer: IAnswer, formMode: string) => void;
}


const Form: React.FC<IProps> = (props: IProps) => {
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			answerId: props.answer.answerId,
			text: props.answer.text,
			createdBy: props.answer.createdBy,
			created: props.answer.created,
		},
		validationSchema: Yup.object({
			text: Yup.string()
				.max(150, 'Must be 150 characters or less')
				.required('Required'),
		}),
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
			props.saveForm(values, props.formMode)
		},
	});

	const isEdit = () => props.formMode === 'edit';
	console.log('RENDERING', formik.values)

	return (
		<form onSubmit={formik.handleSubmit}>
			{props.formMode !== 'add' &&
				<>
					<label className="id" htmlFor="answerId">Answer Id: </label>
					{/* <input
						id="answerId"
						name="answerId"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.answerId}
						disabled
						style={{ width: '50px' }}
					/> */}
					<span id="answerId">{formik.values.answerId}</span>
					{/* {formik.touched.answerId && formik.errors.answerId ? (
						<div>{formik.errors.answerId}</div>
					) : null} */}
				</>
			}

			<label htmlFor="text">Answer</label>
			<textarea
				id="text"
				name="text"
				onChange={formik.handleChange}
				onBlur={(e: React.FormEvent<HTMLTextAreaElement>): void => {
					if (isEdit()) formik.submitForm();
				}}
				value={formik.values.text}
				rows={2}
				style={{ width: '100%' }}
			/>
			{formik.touched.text && formik.errors.text ? (
				<div>{formik.errors.text}</div>
			) : null}

			<label className="id" htmlFor="createdBy">Created by:</label>
			{/* <span>{formik.values.createdBy.toLocaleDateString()}</span> */}
			<UserName id={formik.values.createdBy} />
			<br/>
			{/* <Select
				id="createdBy"
				name="createdBy"
				options={props.userOptions}
				//onChange={formik.handleChange}
				onChange={(e, value) => {
					formik.setFieldValue("createdBy", value)
					if (isEdit()) formik.submitForm();
				}}
				value={formik.values.createdBy}
			// onChange={(gradeId: number) =>
			// 	dispatch({
			// 		type: StudentActionTypes.STUDENT_ASSIGN_GRADE,
			// 		studentGradeIds: {
			// 			studentId: student!.id,
			// 			gradeId: gradeId,
			// 			gradeName: gradesAll[gradeId].name
			// 		}
			// 	})
			// }
			/> */}

			<label className="id" htmlFor="created">Created:</label>
			{/* <input
				id="created"
				name="text"
				type="text"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.created.toLocaleDateString()}
				disabled={true}
			/>
			{formik.touched.created && formik.errors.created ? (
				<div>{formik.errors.created}</div>
			) : null} */}
			<span>{formik.values.created.toLocaleDateString()}</span>

			{/* 
      <label htmlFor="answers">Answers</label>
      <input
        id="answers"
        name="answers"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.answers}
      />
      {formik.touched.answers && formik.errors.answers ? (
        <div>{formik.errors.answers}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null} */}

			{!isEdit() &&
				<div className="buttons">
					<button onClick={() => props.cancel()}>Cancel</button>
					<button type="submit">Save</button>
				</div>
			}
		</form>
	);
};

const color = 'blue';

export const AnswerForm: React.FC<IProps> = (props: IProps) => {
	return (
		<div style={{ height: '100%' }} className="formik-example formik-example--blue">
			<div
				style={{
					height: '100%',
					background: COLORS[color][5],
					padding: '0.1rem 0.1rem',
				}}
			>
				<div
					style={{
						borderRadius: '4px',
						boxShadow: '0 8px 16px rgba(0,0,0,.2)',
						background: '#fff',
						maxWidth: '90%',
						margin: '0 auto',
						padding: '0.5rem',
					}}
				>
					<div className="formik-example formik-example--blue">
						<Form {...props} />
					</div>
				</div>
			</div>
		</div>
	)
}