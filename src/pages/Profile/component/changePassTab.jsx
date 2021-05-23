import { Button, Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

function ChangePasswordTab() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
    // dispatch(
    //   CreatePassword.get({
    //     password: values.password,
    //     token: token
    //   })
    // )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleCreate(values)
    }
  }

  return (
    <div className="chooseContainer" style={{ paddingTop: 0 }}>
      <Title level={4}>{t('profile.changePassword')}</Title>
      <Text>{t('profile.changePassFrequently')}</Text>
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
            <Form style={{ marginTop: 48 }}>
              <Row style={{ marginBottom: 8 }}>
                <Col sm={24} md={6} lg={6} style={{ marginTop: 12 }}>
                  {t('createPass.newPass')}
                </Col>
                <Col sm={24} md={18} lg={18}>
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
                </Col>
              </Row>

              <Row>
                <Col sm={24} md={6} lg={6} style={{ marginTop: 12 }}>
                  {t('createPass.confirmPass')}
                </Col>
                <Col sm={24} md={18} lg={18}>
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
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: 16 }}>
                <Col sm={24} md={6} lg={6} />
                <Col sm={24} md={18} lg={18}>
                  <Button
                    style={{ marginTop: 24 }}
                    disabled={!isValid}
                    type="primary"
                    onClick={handleSubmit}
                  >
                    {t('common.save')}
                  </Button>
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default ChangePasswordTab
