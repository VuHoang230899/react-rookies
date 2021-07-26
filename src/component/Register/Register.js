import React from 'react';
import { Formik } from 'formik';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import "../Login/Login.css";

const initialValues = { 
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
  city: '',
  gender: ''
}
const validateValues = values => {
  const errors = {};
  if (!values.email && !values.password) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if(values.password.length < 8) {
    errors.password = 'Password at least 8 chars'
  }
  return errors;
};
const onSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
}

const Login = () => {
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
        <Form
          noValidate
          onSubmit={ handleSubmit }
          className="login-form"
        >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback type="invalid" >{ errors.email }</Form.Control.Feedback>
            <Form.Control.Feedback type="valid" >Valid !</Form.Control.Feedback>
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter Password" 
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && errors.password}
            />
              <Form.Control.Feedback type="invalid" >{ errors.password }</Form.Control.Feedback>
              <Form.Control.Feedback type="valid" >Valid !</Form.Control.Feedback>
          </Form.Group>
        </Row>
      
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter your address"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
          />
        </Form.Group>
      
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your city"
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
            />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Control 
              as="select"
              defaultValue="Choose..."
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Control>
          </Form.Group>
        </Row>
      
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check 
            type="checkbox" 
            label="I agree all term and condition" 
          />
        </Form.Group>
      
        <Button variant="primary" type="submit" >
          Register
        </Button>
      </Form>
      )}
     </Formik>
    </Container>
  )
}

export default Login;