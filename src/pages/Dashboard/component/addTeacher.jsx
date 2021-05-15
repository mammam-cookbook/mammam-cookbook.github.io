import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, message, Row, Upload } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import { SignUpRequest } from 'pages/SignIn/redux/actions'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CoursedoFirebase from 'ultis/firebaseConfig'
import { COLOR, DEFAULT_PASSWORD, ROLES } from 'ultis/functions'
import * as yup from 'yup'

export const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}

export const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('Only JPG and PNG are allowed!')
  }
  return isJpgOrPng
}

function AddTeacherModal(props) {
  const dispatch = useDispatch()
  const [isLoadingImage, setLoadingImage] = useState(false)
  const [imgName, setImgName] = useState(null)

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .max(48, 'Email must have at most 48 characters')
      .label('Email')
      .email('Invalid email')
      .required('* Please input email'),
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
      ),
    avatar: yup.string().nullable(),
    phoneNumber: yup
      .string()
      .required('* Please input phone number')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, {
        message: 'Invalid phone number'
      })
  })

  const handleAdd = values => {
    CoursedoFirebase.storage()
      .ref('Avatar')
      .child(imgName)
      .getDownloadURL()
      .then(dwnURL => {
        dispatch(
          SignUpRequest.get({
            ...values,
            avatar: dwnURL,
            email: values.email.toLowerCase(),
            role: ROLES.TEACHER,
            password: DEFAULT_PASSWORD
          })
        )
      })
      .catch(async error => {
        try {
          const snapshot = await CoursedoFirebase.storage()
            .ref('Avatar')
            .child(imgName)
            .putString(values.avatar, 'data_url')
          const downloadUrl = await snapshot.ref.getDownloadURL()
          dispatch(
            SignUpRequest.get({
              ...values,
              avatar: downloadUrl,
              email: values.email.toLowerCase(),
              role: ROLES.TEACHER,
              password: DEFAULT_PASSWORD
            })
          )
        } catch (errorUpload) {}
      })
    props?.onClose()
  }

  const onCancel = () => {
    props?.onClose()
  }

  const handleChangeAvatar = (info, handleChange) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setImgName(info.file.name)
      getBase64(info.file.originFileObj, imageUrl => {
        handleChange('avatar')(imageUrl)
        setLoadingImage(false)
      })
    }
  }

  const uploadButton = (
    <div>
      {isLoadingImage ? (
        <LoadingOutlined style={{ color: COLOR.primary1 }} />
      ) : (
        <PlusOutlined />
      )}
      <div
        className="ant-upload-text"
        style={{ fontFamily: 'Source Sans Pro' }}
      >
        {isLoadingImage ? 'Uploading' : 'Upload'}
      </div>
    </div>
  )

  return (
    <Modal
      title={'Add new teacher'}
      visible={props.visible || false}
      onCancel={onCancel}
      centered
      destroyOnClose={true}
      footer={false}
    >
      <Formik
        initialValues={{
          email: '',
          fullName: '',
          avatar: '',
          phoneNumber: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleAdd(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
          setFieldTouched,
          setFieldValue
        }) => {
          return (
            <Form>
              <Row style={{ marginBottom: 16 }}>
                <Col span={8}>Avatar</Col>
                <Col span={16}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={dummyRequest}
                    beforeUpload={beforeUpload}
                    onChange={info => handleChangeAvatar(info, handleChange)}
                  >
                    {values.avatar ? (
                      <img
                        src={values.avatar}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col span={8}>Name</Col>
                <Col span={16}>
                  <CInput
                    value={values.fullName}
                    onChange={handleChange('fullName')}
                    onTouchStart={() => setFieldTouched('fullName')}
                    onBlur={handleBlur('fullName')}
                    placeholder="Input name"
                    error={errors.fullName}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col span={8}>Phone number</Col>
                <Col span={16}>
                  <CInput
                    value={values.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    onTouchStart={() => setFieldTouched('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    placeholder="Input phone number"
                    error={errors.phoneNumber}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col span={8}>Email</Col>
                <Col span={16}>
                  <CInput
                    value={values.email}
                    onChange={handleChange('email')}
                    onTouchStart={() => setFieldTouched('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Input email"
                    error={errors.email}
                  />
                </Col>
              </Row>
              <Row justify="end">
                <Button
                  style={{ marginRight: 16 }}
                  size="large"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!isValid}
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default AddTeacherModal
