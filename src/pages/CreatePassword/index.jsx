import { Button } from 'antd'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import { CreatePassword } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'
import '../SignIn/signin.css'
import forgotPic from 'assets/images/forgot_password.jpg'
import logo from 'assets/logo.svg'
import { useTranslation } from 'react-i18next'

function CreatePasswordPage() {
  const param = useParams()
  const { token } = param
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { t } = useTranslation()

  useEffect(() => {
    if (user || !token) {
      history.replace('/')
    }
  }, [user])

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required(t('signin.passRequired'))
      .min(8, t('signin.passMin'))
      .max(48, t('signin.passMax'))
      .matches(/(?=.{8,})/, {
        message: t('signin.passMin')
      }),
    confirm: yup
      .string()
      .required(t('signin.passRequired'))
      .min(8, t('signin.passMin'))
      .max(48, t('signin.passMax'))
      .matches(/(?=.{8,})/, {
        message: t('signin.passMin')
      })
      .oneOf([yup.ref('password'), null], t('createPass.confirmSameAsNew'))
  })

  const handleCreate = values => {
    dispatch(
      CreatePassword.get({
        password: values.password,
        token: token
      })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleCreate(values)
    }
  }

  return (
    <div id="bg">
      <div id="loginBg">
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={logo} alt="logo" width={100} />
        </a>
        <div id="loginBox">
          <Formik
            initialValues={{
              password: '',
              confirm: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => handleCreate(values)}
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
                  <span id="loginStyle">{t('createPass.title')}</span>
                  <CInput
                    className="inputBox"
                    value={values.password}
                    onChange={handleChange('password')}
                    onTouchStart={() => setFieldTouched('password')}
                    onBlur={handleBlur('password')}
                    placeholder={t('createPass.newPass')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    error={errors.password}
                    type="password"
                  />
                  <CInput
                    className="inputBox"
                    value={values.confirm}
                    onChange={handleChange('confirm')}
                    onTouchStart={() => setFieldTouched('confirm')}
                    onBlur={handleBlur('confirm')}
                    placeholder={t('createPass.confirmPass')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    error={errors.confirm}
                    type="password"
                  />
                  <Button
                    style={{ marginTop: 24 }}
                    id="loginBtn"
                    disabled={!isValid}
                    type="primary"
                    onClick={handleSubmit}
                  >
                    {t('createPass.resetPass')}
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

export default CreatePasswordPage
