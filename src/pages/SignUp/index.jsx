import { Button } from 'antd'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import { SignUpRequest } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { NAME_REGEX, ROLES } from 'ultis/functions'
import * as yup from 'yup'
import '../SignIn/signin.css'
import signupPic from 'assets/images/signup.png'
import logo from 'assets/logo.svg'
import { useTranslation } from 'react-i18next'

function SignUp() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      history.replace('/')
    }
  }, [user])

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .max(48, t('signin.emailMax'))
      .label(t('signin.email'))
      .email(t('signin.emailInvalid'))
      .required(t('signin.emailRequired')),
    password: yup
      .string()
      .required(t('signin.passRequired'))
      .min(8, t('signin.passMin'))
      .max(48, t('signin.passMax'))
      .matches(/(?=.{8,})/, {
        message: t('signin.passMin')
      }),
    name: yup
      .string()
      .trim()
      .required(t('signin.fullnameRequired'))
      .min(3, t('signin.fullnameMin'))
      .max(64, t('signin.fullnameMax'))
      .matches(NAME_REGEX, {
        message: t('signin.fullnameInvalid')
      })
  })

  const handleSignup = values => {
    dispatch(
      SignUpRequest.get({
        ...values,
        email: values.email.toLowerCase(),
        role: ROLES.USER
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
              name: ''
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
                  <span id="loginStyle">{t('signup.title')}</span>
                  <CInput
                    className="inputBox"
                    value={values.name}
                    onChange={handleChange('name')}
                    onTouchStart={() => setFieldTouched('name')}
                    onBlur={handleBlur('name')}
                    placeholder={t('signup.fullname')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    error={errors.name}
                  />
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
                  <div style={{ alignSelf: 'flex-end', marginBottom: 34 }}>
                    <span>{t('signup.hadAccount')}</span>
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
                      {t('auth.login')}
                    </Button>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    type="primary"
                    onClick={handleSubmit}
                  >
                    {t('auth.signup')}
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
