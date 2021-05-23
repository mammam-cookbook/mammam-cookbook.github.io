import { Avatar, Button, Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import { NAME_REGEX } from 'ultis/functions'
import { UpdateProfile } from 'pages/SignIn/redux/actions'
import ButtonBase from 'components/ButtonBase'
import AvatarDialog from './avatarDialog'

function UserInfoTab() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { userProfile } = useSelector(state => state.Profile)
  const { isLoading } = useSelector(state => state.Auth)
  const inputRef = useRef()
  const [src, setSrc] = useState(null)

  const validationSchema = yup.object().shape({
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

  const handleCreate = values => {
    dispatch(
      UpdateProfile.get({
        data: values,
        id: userProfile?.id
      })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleCreate(values)
    }
  }

  const readSrc = picture => {
    let reader = new FileReader()
    reader.readAsDataURL(picture)
    reader.onloadend = () => {
      setSrc(reader.result)
    }
  }

  const onCloseDialog = () => {
    setSrc(null)
  }

  return (
    <div className="chooseContainer" style={{ paddingTop: 0 }}>
      <Title level={4}>{t('profile.userInfo')}</Title>
      <Formik
        initialValues={{
          name: userProfile?.name || ''
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
                <Col
                  sm={24}
                  md={8}
                  lg={8}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 16
                  }}
                >
                  <ButtonBase
                    onClick={() => inputRef.current.click()}
                    style={{ padding: 4, borderRadius: 100 }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={inputRef}
                      type="file"
                      onChange={e => readSrc(e.target.files[0])}
                    />
                    {userProfile?.avatar_url ? (
                      <Avatar size={120} src={userProfile?.avatar_url} />
                    ) : (
                      <Avatar size={120} icon={<UserOutlined />} />
                    )}
                  </ButtonBase>
                </Col>
                <Col sm={24} md={16} lg={16}>
                  <>
                    <CInput value={userProfile.email} disabled={true} />
                    <CInput
                      style={{ marginTop: 12 }}
                      value={values.name}
                      onChange={handleChange('name')}
                      onTouchStart={() => setFieldTouched('name')}
                      onBlur={handleBlur('name')}
                      placeholder={t('signup.fullname')}
                      onKeyPress={event =>
                        handleKeyPress(isValid, event, values)
                      }
                      error={errors.name}
                    />
                  </>
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: 16 }}>
                <Col sm={24} md={8} lg={8} />
                <Col sm={24} md={16} lg={16}>
                  <Button
                    style={{ marginTop: 24 }}
                    disabled={!isValid}
                    type="primary"
                    loading={isLoading}
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
      <AvatarDialog open={src != null} value={src} onClose={onCloseDialog} />
    </div>
  )
}

export default UserInfoTab
