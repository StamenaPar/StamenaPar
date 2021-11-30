import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { COLORS } from '../../formik/theme';
import { IFormProps } from '../types';
import { Redirect } from 'react-router-dom';
//import { number } from 'yup/lib/locale';


const Form: React.FC<IFormProps> = (props: IFormProps) => {

  let { who, formMode, authError } = props;
  const { name,	pwd } = who;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name,
      pwd
      //createdBy: props.top.createdBy,
      //created: props.top.created
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      pwd: Yup
        .string()
        .min(7)
        .max(16)
        //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$/)
        .required()
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

  console.log('RENDERING LoginForm', formik.values)
   
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
      
              
        {/* <label htmlFor="name">User name</label> */}
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // onBlur={(e: React.FormEvent<HTMLInputElement>): void => {
          //   if (isEdit() && formik.initialValues.name !== formik.values.name)
          //     formik.submitForm();
          // }}
          value={formik.values.name}
          placeholder="User name"
          style={{ width: '40%' }}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

      {/* <label htmlFor="username">Password</label> */}
      <br/>
      <input
        id="pwd"
        name="pwd"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.pwd}
        placeholder="password"
        style={{ width: '40%' }}
      />
      {formik.touched.pwd && formik.errors.pwd ? (
        <div>{formik.errors.pwd}</div>
      ) : null}

      {authError && 
        <div>{authError}</div>
      }


         {/* <button type="submit">Submit</button> */}

          <div className="buttons">
            {props.canEdit &&
              <button onClick={() => props.cancel()}>Cancel</button>}
            {props.canEdit &&
              <button type="submit">Save</button>}
          </div>

      </form>

      {/* <label className="id" htmlFor="created">Created:</label>
      <span>{formik.values.created.toLocaleDateString()}</span> */}

    </>
  );
};


const color = 'blue';

export const LoginForm: React.FC<IFormProps> = (props: IFormProps) => {

  if (props.isAuthenticated)
    return <Redirect exact to="/questions" />
    
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