import { Button } from 'antd'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import { ResetPassword } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import '../SignIn/signin.css'
import forgotPic from 'assets/images/forgot_password.jpg'
import logo from 'assets/logo.svg'
import { useTranslation } from 'react-i18next'

function ForgotPassword() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation()
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
      .max(48, t('signin.emailMax'))
      .label(t('signin.email'))
      .email(t('signin.emailInvalid'))
      .required(t('signin.emailRequired'))
  })

  const handleForgot = values => {
    dispatch(
      ResetPassword.get({
        ...values,
        email: values.email.toLowerCase()
      })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleForgot(values)
    }
  }

  return (
    <div id="bg">
      <div id="loginBg">
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={logo} alt="forgot" width={100} />
        </a>
        <div id="loginBox">
          <Formik
            initialValues={{
              email: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => handleForgot(values)}
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
                  <span id="loginStyle">{t('forgotPass.title')}</span>
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
                  <div style={{ alignSelf: 'flex-end', marginBottom: 34 }}>
                    <span>{t('signup.hadAccount')}</span>
                    <Button
                      style={{ padding: 0 }}
                      color="primary"
                      type="link"
                      onClick={() =>
                        history.push({
                          pathname: '/signin',
                          state: { from: `/forgot` }
                        })
                      }
                    >
                      {t('forgotPass.backToSignin')}
                    </Button>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    type="primary"
                    onClick={handleSubmit}
                  >
                    {t('forgotPass.proceed')}
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      {isDesktopOrLaptop && (
        <div id="imgBg" style={{ backgroundImage: `url(${forgotPic})` }} />
      )}
    </div>
  )
}

export default ForgotPassword
