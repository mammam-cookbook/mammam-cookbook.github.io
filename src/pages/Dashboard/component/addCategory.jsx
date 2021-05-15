import { Button, Col, Row, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import CInput from 'components/CInput'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { NAME_REGEX } from 'ultis/functions'
import * as yup from 'yup'
import { AddCategory, UpdateCategory } from '../redux/actions'

const { Option } = Select

function AddCategoryModal(props) {
  const { t } = useTranslation()
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const realList = props.category
    ? categoryList.filter(item => item.id !== props.category?.id)
    : categoryList
  const dispatch = useDispatch()
  const validationSchema = yup.object().shape({
    vi: yup
      .string()
      .trim()
      .required(t('validation.categoryRequired'))
      .matches(NAME_REGEX, {
        message: t('validation.categoryRule')
      }),
    en: yup
      .string()
      .trim()
      .required(t('validation.categoryRequired'))
      .matches(NAME_REGEX, {
        message: t('validation.categoryRule')
      }),
    parentId: yup.string().nullable()
  })

  const handleAdd = values => {
    const data = {
      vi: values?.vi || '',
      en: values?.en || '',
      parent_category_id: values?.parentId || null
    }
    if (props.category) {
      dispatch(UpdateCategory.get({ id: props.category.id, data }))
    } else {
      dispatch(AddCategory.get(data))
    }
    props?.onClose()
  }

  const onCancel = () => {
    props?.onClose()
  }

  return (
    <Modal
      title={
        props.category
          ? t('dashboard.updateCategory')
          : t('dashboard.addNewCategory')
      }
      visible={props.visible || false}
      onCancel={onCancel}
      centered
      destroyOnClose={true}
      footer={false}
    >
      <Formik
        initialValues={{
          parentId: props.category?.parentId || null,
          vi: props.category?.vi || '',
          en: props.category?.en || ''
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
                <Col span={8}>{t('common.vi')}</Col>
                <Col span={16}>
                  <CInput
                    value={values.vi}
                    onChange={handleChange('vi')}
                    onTouchStart={() => setFieldTouched('vi')}
                    onBlur={handleBlur('vi')}
                    placeholder={t('common.vi')}
                    error={errors.vi}
                  />
                </Col>
              </Row>
              <Row align="middle" style={{ marginBottom: 16 }}>
                <Col span={8}>{t('common.en')}</Col>
                <Col span={16}>
                  <CInput
                    value={values.en}
                    onChange={handleChange('en')}
                    onTouchStart={() => setFieldTouched('en')}
                    onBlur={handleBlur('en')}
                    placeholder={t('common.en')}
                    error={errors.en}
                  />
                </Col>
              </Row>
              {(!props.category || props.category?.parentId) && (
                <Row align="middle" style={{ marginBottom: 32 }}>
                  <Col span={8}>{t('dashboard.parentCategory')}</Col>
                  <Col span={16}>
                    <Select
                      style={{ width: '100%' }}
                      value={values.parentId}
                      onChange={value => setFieldValue('parentId', value)}
                    >
                      <Option value={null}>
                        {t('dashboard.notSelectParentId')}
                      </Option>
                      {realList.map(item => (
                        <Option key={`cate${item.id}`} value={item.id}>
                          {item.vi} - {item.en}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              )}
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
                  {props.category ? t('common.update') : t('common.add')}
                </Button>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default AddCategoryModal
