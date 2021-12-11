import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IUser } from '../types';

import { Select } from '../../common/Select';
import { COLORS } from '../../formik/theme';
import { IFormProps } from '../types'
import UserName from '../../common/containers/UserName';

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roleId: props.user.roleId,
      userId: props.user.userId,
      userName: props.user.userName,
      pwd: props.user.pwd,
      department: props.user.department,
      createdBy: props.user.createdBy,
      created: props.user.created
    },
    validationSchema: Yup.object({
      name: Yup.string()
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
      //alert(JSON.stringify(values, null, 2));
      props.saveForm(values, props.formMode)
    }
  });

  const isEdit = () => props.formMode === 'edit';

  console.log('RENDERING user', formik.values)
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
      
        <label className="id" htmlFor="userId">UserId:</label>
        {/* <input
          id="userId"
          name="userId"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userId}
          disabled
          style={{ width: '50px' }}
        />
        {formik.touched.userId && formik.errors.userId ? (
          <div>{formik.errors.userId}</div>
        ) : null} */}
        <span id="userId">{formik.values.userId}</span>

        <label htmlFor="roleId">Role</label>
        <Select
          id="roleId"
          name="roleId"
          options={props.roleOptions}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("roleId", value);
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.roleId}
        />

        <label htmlFor="userName">Name</label>
        <textarea
          id="userName"
          name="userName"
          onChange={formik.handleChange}
          //onBlur={formik.handleBlur}
          onBlur={(e: React.FormEvent<HTMLTextAreaElement>): void => {
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.userName}
          style={{ width: '100%' }}
          rows={2}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div>{formik.errors.userName}</div>
        ) : null}

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

      {/* <label htmlFor="email">Email Address</label>
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

export const UserForm: React.FC<IFormProps> = (props: IFormProps) => {
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