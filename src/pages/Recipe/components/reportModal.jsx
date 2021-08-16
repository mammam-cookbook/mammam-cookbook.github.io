import { Button, Modal, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FieldArray, Formik } from 'formik'
import { AddReport, GetAllProblem } from 'pages/Dashboard/redux/actions'
import { CategoryFilterItem } from 'pages/SearchRecipe'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import * as yup from 'yup'

const { Text, Title } = Typography

export default function ModalReport({
  recipeId,
  isShow,
  closeModal = () => {}
}) {
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const problemList = useSelector(state => state?.Dashboard?.problemList)

  useEffect(() => {
    dispatch(GetAllProblem.get())
  }, [])

  const validationReport = yup.object().shape({
    note: yup.string().trim().required('Vui lòng nhập mô tả của bạn'),
    problem: yup
      .array()
      .required('Chọn ít nhất 1 mô tả với vấn đề gặp phải')
      .min(1, 'Chọn ít nhất 1 mô tả với vấn đề gặp phải')
  })

  const addToMadeIt = values => {
    dispatch(
      AddReport.get({
        recipe_id: recipeId,
        problem: values.problem,
        note: values.note
      })
    )
    closeModal()
  }

  return (
    <Formik
      initialValues={{ note: '', problem: [] }}
      isInitialValid={false}
      validationSchema={validationReport}
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
            title="Báo cáo công thức"
            visible={isShow}
            centered
            destroyOnClose
            onCancel={closeModal}
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
                  setFieldValue('note', '')
                  setFieldValue('problem', [])
                }}
              >
                {t('common.report')}
              </Button>
            ]}
          >
            <>
              {errors.problem && (
                <Text style={{ color: 'red', marginTop: 16, marginBottom: 12 }}>
                  {errors.problem}
                </Text>
              )}
              <FieldArray
                name="problem"
                render={arrayHelpers => (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      marginBottom: 24
                    }}
                  >
                    {problemList &&
                      problemList?.length > 0 &&
                      problemList?.map((item, index) => (
                        <div style={{ marginRight: 12 }}>
                          <CategoryFilterItem
                            title={item?.description}
                            isCheck={
                              values?.problem?.findIndex(
                                code => code === item?.key
                              ) > -1
                            }
                            onClick={isCheck => {
                              if (isCheck) {
                                arrayHelpers.push(item?.key)
                              } else {
                                arrayHelpers.remove(index)
                              }
                            }}
                          />
                        </div>
                      ))}
                  </div>
                )}
              />

              <TextArea
                rows={2}
                style={{
                  borderColor: COLOR.primary1
                }}
                value={values.note}
                onChange={handleChange('note')}
                onTouchStart={() => setFieldTouched('note')}
                onBlur={handleBlur('note')}
                placeholder={
                  'Mô tả rõ hơn về vấn để bạn gặp phải với công thức này'
                }
              />
              {errors.note && (
                <Text style={{ color: 'red', marginTop: 16 }}>
                  {errors.note}
                </Text>
              )}
            </>
          </Modal>
        )
      }}
    </Formik>
  )
}
