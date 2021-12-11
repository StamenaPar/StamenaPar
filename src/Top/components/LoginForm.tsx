import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { COLORS } from '../../formik/theme';
import { IFormProps } from '../types';
//import { number } from 'yup/lib/locale';
import { useNavigate } from "react-router-dom";


const Form: React.FC<IFormProps> = (props: IFormProps) => {

  let { who, formMode, authError } = props;
  const { userName, pwd } = who;

  let navigate = useNavigate();
  if (props.isAuthenticated) {
    navigate('/questions');
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName,
      pwd
      //createdBy: props.top.createdBy,
      //created: props.top.created
    },
    validationSchema: Yup.object({
      userName: Yup
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
      props.saveForm(values, props.formMode, props.isRegister)
    }
  });

  const isEdit = () => props.formMode === 'edit';

  console.log('RENDERING LoginForm', formik.values)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>

        {/* <label htmlFor="name">User name</label> */}
        <input
          id="userName"
          name="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // onBlur={(e: React.FormEvent<HTMLInputElement>): void => {
          //   if (isEdit() && formik.initialValues.name !== formik.values.name)
          //     formik.submitForm();
          // }}
          value={formik.values.userName}
          placeholder="User name"
          maxLength={16}
          size={16}
        // style={{ width: '40%' }}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div>{formik.errors.userName}</div>
        ) : null}

        {/* <label htmlFor="username">Password</label> */}
        <br />
        <input
          id="pwd"
          name="pwd"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pwd}
          placeholder="password"
          // style={{ width: '40%' }}
          maxLength={16}
          size={16}
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

  return (
    <div style={{ height: '100%', padding: '5%', display: 'flex', alignItems: 'center', justifyContent: 'cen0ter'  }} className="formik-example formik-example--blue">
      <div
        style={{
          height: '100%',
          background: COLORS[color][5],
          padding: '1rem 1rem',
          width: '300px'
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
            width: '250px'
          }}
        >
          <div className="formik-example formik-example--blue">
            {props.isRegister ? (
              <span>Register</span>
            ) : (
              <span>Register</span>
            )}
            <Form {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}