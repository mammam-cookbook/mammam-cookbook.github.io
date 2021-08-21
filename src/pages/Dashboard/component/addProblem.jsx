import { Button, Col, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { NAME_REGEX } from 'ultis/functions'
import * as yup from 'yup'
import { AddProblem, UpdateProblem } from '../redux/actions'

function AddProblemModal(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const validationSchema = yup.object().shape({
    key: yup
      .string()
      .trim()
      .required(t('validation.problemCodeRequired'))
      .matches(NAME_REGEX, {
        message: t('validation.problemCodeRule')
      }),
    description: yup
      .string()
      .trim()
      .required(t('validation.problemRequired'))
      .matches(NAME_REGEX, {
        message: t('validation.problemRule')
      })
  })

  const handleAdd = values => {
    const data = {
      key: values?.key || '',
      description: values?.description || ''
    }
    if (props.problem) {
      dispatch(UpdateProblem.get({ id: props.problem.id, data }))
    } else {
      dispatch(AddProblem.get(data))
    }
    props?.onClose()
  }

  const onCancel = () => {
    props?.onClose()
  }

  return (
    <Modal
      title={
        props.problem
          ? t('dashboard.updateProblem')
          : t('dashboard.addNewProblem')
      }
      visible={props.visible || false}
      onCancel={onCancel}
      centered
      destroyOnClose={true}
      footer={false}
    >
      <Formik
        initialValues={{
          key: props.problem?.key || '',
          description: props.problem?.description || ''
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
              <Row align="middle" style={{ marginBottom: 16 }}>
                <Col span={8}>{t('dashboard.problemCode')}</Col>
                <Col span={16}>
                  <CInput
                    value={values.key}
                    onChange={handleChange('key')}
                    onTouchStart={() => setFieldTouched('key')}
                    onBlur={handleBlur('key')}
                    placeholder={'UNAPPROPRIATED'}
                    error={errors.key}
                  />
                </Col>
              </Row>
              <Row align="middle" style={{ marginBottom: 16 }}>
                <Col span={8}>{t('dashboard.description')}</Col>
                <Col span={16}>
                  <CInput
                    value={values.description}
                    onChange={handleChange('description')}
                    onTouchStart={() => setFieldTouched('description')}
                    onBlur={handleBlur('description')}
                    placeholder={'Không thích hợp'}
                    error={errors.description}
                  />
                </Col>
              </Row>
              <Row justify="end">
                <Button
                  style={{ marginRight: 16 }}
                  size="large"
                  onClick={onCancel}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  disabled={!isValid}
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                >
                  {props.problem ? t('common.update') : t('common.add')}
                </Button>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default AddProblemModal
