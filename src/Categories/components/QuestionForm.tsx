import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IQuestion, IQuestionAnswer, IFormProps } from '../types';
import { IAnswer } from '../../Answers/types';

import QuestionAnswers from './QuestionAnswers'
import { Select } from '../../common/Select';
import { COLORS } from '../../formik/theme';
//import { MultiSelect } from '../../common/MultiSelect';
import { IOption } from '../../common/types';
import UserName from '../../common/containers/UserName';
//import { number } from 'yup/lib/locale';

import { sourceOptions } from '../sourceOptions'
import { statusOptions } from '../statusOptions'


const Form: React.FC<IFormProps> = (props: IFormProps) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryId: props.question.categoryId,
      questionId: props.question.questionId,
      text: props.question.text,
      source: props.question.source,
      status: props.question.status,
      answers: props.question.answers,
      createdBy: props.question.createdBy,
      created: props.question.created
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      /*answers: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),*/
    }),
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      props.saveForm(values, props.formMode)
    }
  });

  const isEdit = () => props.formMode === 'edit';

  console.log('RENDERING', formik.values)
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
      
        <label className="id" htmlFor="questionId">QuestionId:</label>
        {/* <input
          id="questionId"
          name="questionId"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.questionId}
          disabled
          style={{ width: '50px' }}
        />
        {formik.touched.questionId && formik.errors.questionId ? (
          <div>{formik.errors.questionId}</div>
        ) : null} */}
        <span id="questionId">{formik.values.questionId}</span>

        <label htmlFor="categoryId">Category</label>
        <Select
          id="categoryId"
          name="categoryId"
          options={props.categoryOptions}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("categoryId", value);
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.categoryId}
        />

        <label htmlFor="text">Name</label>
        <textarea
          id="text"
          name="text"
          onChange={formik.handleChange}
          //onBlur={formik.handleBlur}
          onBlur={(e: React.FormEvent<HTMLTextAreaElement>): void => {
            if (isEdit() && formik.initialValues.text !== formik.values.text)
              formik.submitForm();
          }}
          value={formik.values.text}
          style={{ width: '100%' }}
          rows={2}
        />
        {formik.touched.text && formik.errors.text ? (
          <div>{formik.errors.text}</div>
        ) : null}

        <label htmlFor="source">Source</label>
        <Select
          id="source"
          name="source"
          options={sourceOptions}
          // onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("source", value)
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.source}
        />

        <br />
        <QuestionAnswers
          question={props.question}
          questionAnswers={props.questionAnswers}
          answers={props.answers}
          canEdit={props.canEdit}
          formMode={props.formMode}
          selectQuestionAnswer={props.selectQuestionAnswer}
          copyQuestionAnswer={props.copyQuestionAnswer}
          removeQuestionAnswer={props.removeQuestionAnswer}
          assignQuestionAnswer={props.assignQuestionAnswer}
          setIsDetail={props.setIsDetail}
        />
        <br />

        <label htmlFor="status">Status</label>
        <Select
          id="status"
          name="status"
          options={statusOptions}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("status", value)
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.status}
        />

        <label className="id" htmlFor="createdBy">Created by:</label>
        <UserName id={formik.values.createdBy} />
			  <br/>
        {/* <Select
          id="createdBy"
          name="createdBy"
          options={props.userOptions}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("createdBy", value);
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

        {/* <button type="submit">Submit</button> */}

        {/* <label htmlFor="features">Features</label>
        <MultiSelect
          id="features"
          name="features"
          label="Select features..."
          options={props.featureOptions}
          onChange={()=>{}} 
          value={[]}
          // onChange={(e, value) => {
          //   formik.setFieldValue("status", value)
          //   if (isEdit()) formik.submitForm();
          // }}
          // value={formik.values.status}
        /> */}

        {!isEdit() &&
          <div className="buttons">
            {props.canEdit &&
              <button onClick={() => props.cancel()}>Cancel</button>}
            {props.canEdit &&
              <button type="submit">Save</button>}
          </div>
        }
      </form>

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

    </>
  );
};


const color = 'blue';

export const QuestionForm: React.FC<IFormProps> = (props: IFormProps) => {
  return (
    <div style={{ height: '100%' }} className="formik-example formik-example--blue">
      <div
        style={{
          height: '100%',
          background: COLORS[color][5],
          padding: '1rem 1rem',
        }}
      >
        <div
          style={{
            borderRadius: '4px',
            boxShadow: '0 8px 16px rgba(0,0,0,.2)',
            background: '#fff',
            maxWidth: '90%',
            margin: '0 auto',
            padding: '1rem',
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