import { Button } from 'antd'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import { SignUpRequest } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { ROLES } from 'ultis/functions'
import * as yup from 'yup'
import '../SignIn/signin.css'
import signupPic from 'assets/images/signup.png'
import logo from 'assets/logo.png'

function SignUp() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  useEffect(() => {
    if (user) {
      history.replace('/')
    }
  }, [user])

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .max(48, 'Email must have at most 48 characters')
      .label('Email')
      .email('Invalid email')
      .required('* Please input email'),
    password: yup
      .string()
      .required('* Please input password')
      .min(8, 'Password must include at least 8 characters')
      .max(48, 'Password must include at most 48 characters')
      .matches(/(?=.{8,})/, {
        message: 'Password must include at least 8 characters'
      }),
    fullName: yup
      .string()
      .trim()
      .required('* Please input password')
      .min(3, 'Full name must include at least 3 characters')
      .max(64, 'Full name must include at most 48 characters')
      .matches(
        /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
        {
          message: 'Invalid full name'
        }
      )
  })

  const handleSignup = values => {
    dispatch(
      SignUpRequest.get({
        ...values,
        email: values.email.toLowerCase(),
        role: ROLES.NOT_VERIFIED
      })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleSignup(values)
    }
  }

  return (
    <div id="bg">
      <div id="loginBg">
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={logo} alt="signup" width={100} />
        </a>
        <div id="loginBox">
          <Formik
            initialValues={{
              email: '',
              password: '',
              fullName: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => handleSignup(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isValid,
              errors,
              touched,
              setFieldTouched
            }) => {
              return (
                <Form className="formStyle">
                  <span id="loginStyle">Please create a new account here</span>
                  <CInput
                    className="inputBox"
                    value={values.fullName}
                    onChange={handleChange('fullName')}
                    onTouchStart={() => setFieldTouched('fullName')}
                    onBlur={handleBlur('fullName')}
                    placeholder="Full name"
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    error={errors.fullName}
                  />
                  <CInput
                    className="inputBox"
                    value={values.email}
                    onChange={handleChange('email')}
                    onTouchStart={() => setFieldTouched('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Email"
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    error={errors.email}
                  />
                  <CInput
                    className="inputBox"
                    type="password"
                    onChange={handleChange('password')}
                    onTouchStart={() => setFieldTouched('password')}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    placeholder="Password"
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    error={errors.password}
                    type="password"
                  />
                  <div style={{ alignSelf: 'flex-end', marginBottom: 34 }}>
                    <span>Already have an account? </span>
                    <Button
                      style={{ padding: 0 }}
                      color="primary"
                      type="link"
                      onClick={() =>
                        history.push({
                          pathname: '/signin',
                          state: { from: `/signup` }
                        })
                      }
                    >
                      Sign in
                    </Button>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    type="primary"
                    onClick={handleSubmit}
                  >
                    Sign up
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      {isDesktopOrLaptop && (
        <div id="imgBg" style={{ backgroundImage: `url(${signupPic})` }} />
      )}
    </div>
  )
}

export default SignUp
