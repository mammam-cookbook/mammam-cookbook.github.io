import { Button } from 'antd'
import signinPic from 'assets/images/signin.png'
import logo from 'assets/logo.png'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { ROLES } from 'ultis/functions'
import * as yup from 'yup'
import { SignInRequest } from './redux/actions'
import './signin.css'

function SignIn() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      if (user.role === ROLES.ADMIN) {
        history.replace('/admin')
      } else {
        if (history.location.state) {
          history.goBack()
        } else {
          history.replace('/')
        }
      }
    }
  }, [user])

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('* Please input password')
      .min(8, 'Password must include at least 8 characters')
      .max(48, 'Password must include at most 48 characters')
      .matches(/(?=.{8,})/, {
        message: 'Password must include at least 8 characters'
      }),
    email: yup
      .string()
      .trim()
      .max(48, 'Email must have at most 48 characters')
      .label('Email')
      .email('Invalid email')
      .required('* Please input email')
  })

  const handleLogin = values => {
    dispatch(
      SignInRequest.get({ ...values, email: values.email.toLowerCase() })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleLogin(values)
    }
  }

  return (
    <div id="bg">
      <div id="loginBg">
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={logo} alt="signin" width={100} />
        </a>
        <div id="loginBox">
          <Formik
            initialValues={{
              password: '',
              email: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}
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
                  <span id="loginStyle">
                    Sign in to your account to continue
                  </span>
                  <CInput
                    className="inputBox"
                    value={values.email}
                    onChange={handleChange('email')}
                    onTouchStart={() => setFieldTouched('email')}
                    onBlur={handleBlur('email')}
                    placeholder={t('signin.email')}
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
                    placeholder={t('signin.password')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    error={errors.password}
                    type="password"
                  />
                  <div className="buttomBox">
                    <Button
                      style={{ padding: 0 }}
                      color="primary"
                      type="link"
                      onClick={() => history.push('/forgot')}
                    >
                      Forgot password?
                    </Button>
                    <div>
                      <span>Don’t have an account? </span>
                      <Button
                        style={{ padding: 0 }}
                        color="primary"
                        type="link"
                        onClick={() => history.push('/signup')}
                      >
                        Sign up
                      </Button>
                    </div>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    type="primary"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      {isDesktopOrLaptop && (
        <div id="imgBg" style={{ backgroundImage: `url(${signinPic})` }} />
      )}
    </div>
  )
}

export default SignIn
