import React from 'react';
import { Formik } from 'formik';
import { Button, Container, Form } from 'react-bootstrap';
import "./Login.css";
import axios from 'axios';

const initialValues = { username: '', password: '' }
const validateValues = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
  ) {
    errors.username = 'Invalid email address';
  }
  if(values.password.length < 8) {
    errors.password = 'Password at least 8 chars'
  }
  return errors;
};

const Login = ({ setUser, title, login, setLogin}) => {

  const onSubmit = (values, { setSubmitting }) => {
    localStorage.setItem(values.username, values.password);
    axios.post(`http://localhost:8080/api/v1/authenticate`, {
      username: values.username,
      password: values.password,
    }
    )
    .then(response => {
      setSubmitting(false);
      setUser({
        token: response.data.token,
        userID: response.data.userID
      })
      setLogin(login => 'Logout')
      axios.defaults.headers.common["Authorization"] = response.data.jwttoken;
      localStorage.setItem('jwttoken', "Bearer" + response.data.jwttoken);
      window.location.href = "/";
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  return (
    <Container className="justify-content-md-center">
      <Formik
       initialValues={ initialValues }
       validate={ validateValues }
       onSubmit={ onSubmit }
      >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <div className="login-form-base">
          { title && <center><h4>{ title }</h4></center> }
          <Form
            noValidate
            onSubmit={ handleSubmit }
            className="login-form"
            >
            <Form.Group className="mb-3" controlId="validationFormik01" >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email" 
                placeholder="Enter email"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback type="invalid" >{ errors.username }</Form.Control.Feedback>
              <Form.Control.Feedback type="valid" >Valid !!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationFormik02" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid" >{ errors.password }</Form.Control.Feedback>
              <Form.Control.Feedback type="valid" >Valid !!</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        
       )}
     </Formik>
    </Container>
  )
}

export default Login;