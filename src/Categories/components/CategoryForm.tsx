import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ICategoryFormProps } from '../types';
import { IAnswer } from '../../Answers/types';

import { Select } from '../../common/Select';
import { COLORS } from '../../formik/theme';
//import { MultiSelect } from '../../common/MultiSelect';
import { IOption } from '../../common/types';
import UserName from '../../common/containers/UserName';
//import { number } from 'yup/lib/locale';


const Form: React.FC<ICategoryFormProps> = (props: ICategoryFormProps) => {

  const category = props.category!;
  const { categoryId, title, questions, isExpanded, createdBy, created } = category;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryId,
      title,
      questions,
      isExpanded,
      createdBy,
      created
    },
    validationSchema: Yup.object({
      title: Yup.string()
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
      
        <label className="id" htmlFor="categoryId">CategoryId:</label>
        {/* <input
          id="categoryId"
          name="categoryId"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryId}
          disabled
          style={{ width: '50px' }}
        />
        {formik.touched.categoryId && formik.errors.categoryId ? (
          <div>{formik.errors.categoryId}</div>
        ) : null} */}
        <span id="categoryId">{formik.values.categoryId}</span>
        
        <label htmlFor="title">Title</label>
        <textarea
          id="title"
          name="title"
          onChange={formik.handleChange}
          //onBlur={formik.handleBlur}
          onBlur={(e: React.FormEvent<HTMLTextAreaElement>): void => {
            if (isEdit() && formik.initialValues.title !== formik.values.title)
              formik.submitForm();
          }}
          value={formik.values.title}
          style={{ width: '100%' }}
          rows={2}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}

        <br />

   
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

export const CategoryForm: React.FC<ICategoryFormProps> = (props: ICategoryFormProps) => {
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