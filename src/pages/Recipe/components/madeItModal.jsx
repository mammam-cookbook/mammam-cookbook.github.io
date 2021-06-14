import { Button, Modal, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Formik } from 'formik'
import ImageUpload from 'pages/CreateRecipe/components/imageUpload'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { COLOR, RECIPE_STATUS } from 'ultis/functions'
import * as yup from 'yup'
import { CommentChallengePost } from '../redux/actions'

const { Text, Title } = Typography

export default function ModalMadeIt({
  recipeId,
  isShow,
  closeModal = () => {}
}) {
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const validationChallengeSchema = yup.object().shape({
    content: yup.string().trim().required('Vui lòng nhập trải nghiệm của bạn'),
    images: yup.array().required('Thêm hình ảnh món bạn đã làm')
  })

  const addToMadeIt = values => {
    dispatch(
      CommentChallengePost.get({
        recipe_id: recipeId,
        content: values.content,
        status: RECIPE_STATUS.APPROVED,
        images: values.images.map(itemImg => {
          return itemImg.src.url
        })
      })
    )
    closeModal()
  }

  return (
    <Formik
      initialValues={{ content: '', images: [] }}
      isInitialValid={false}
      validationSchema={validationChallengeSchema}
      onSubmit={values => addToMadeIt(values)}
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
          <Modal
            title={t('recipe.iMadeIt')}
            visible={isShow}
            centered
            footer={[
              <Button
                key="cancelButton"
                onClick={() => closeModal()}
                size="large"
              >
                {t('common.cancel')}
              </Button>,
              <Button
                disabled={!isValid}
                key="okButton"
                size="large"
                type="primary"
                onClick={() => {
                  addToMadeIt(values)
                  setFieldValue('content', '')
                  setFieldValue('images', [])
                }}
              >
                {t('common.add')}
              </Button>
            ]}
          >
            <>
              <TextArea
                rows={2}
                style={{
                  borderColor: COLOR.primary1
                }}
                value={values.content}
                onChange={handleChange('content')}
                onTouchStart={() => setFieldTouched('content')}
                onBlur={handleBlur('content')}
                placeholder={'Chia sẻ trải nghiệm của bạn khi làm món ăn này'}
              />
              {errors.content && (
                <Text style={{ color: 'red', marginTop: 16 }}>
                  {errors.content}
                </Text>
              )}
              <ImageUpload
                style={{ paddingLeft: 0, marginTop: 20 }}
                setIsUploading={isUpload => setIsUploading(isUpload)}
                value={values.images}
                onChange={data => setFieldValue('images', data)}
                error={errors.images}
              />
            </>
          </Modal>
        )
      }}
    </Formik>
  )
}
