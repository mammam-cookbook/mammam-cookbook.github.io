import { Input, Typography } from 'antd'
import CInput from 'components/CInput'
import 'pages/SignIn/signin.css'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { COLOR } from 'ultis/functions'
import ImageUpload from './imageUpload'

const { Text, Title } = Typography
const { TextArea } = Input

function Step({
  style,
  step,
  index,
  onChangeImage,
  onChangeMaking,
  onChangeTime,
  error
}) {
  const { t } = useTranslation()
  return (
    <div
      style={{
        width: '100%',
        ...style,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          paddingRight: 24
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 24
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <div
              style={{
                width: 150,
                height: 50,
                backgroundColor: COLOR.primary1,
                borderTopRightRadius: 10
              }}
            />
            <div>
              <Title level={4} style={{ margin: 8 }}>
                {t('create.step')} {index + 1}
              </Title>
              <div
                style={{
                  height: 4,
                  width: '100%',
                  backgroundColor: COLOR.primary1
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Title level={5} style={{ marginRight: 12, marginTop: 8 }}>
              {t('create.time')}
            </Title>
            <CInput
              style={{ width: 80, borderColor: COLOR.primary1 }}
              onChange={event => onChangeTime(event.target.value)}
              placeholder="5"
              value={step?.time}
              type="number"
              error={error?.time}
            />
            <Title level={5} style={{ marginLeft: 8, marginTop: 8 }}>
              {t('create.min')}
            </Title>
          </div>
        </div>
        <TextArea
          onChange={event => onChangeMaking(event.target.value)}
          rows={5}
          value={step.content}
          placeholder={t('create.directionPlaceholder')}
        />
        {error?.content && (
          <Text style={{ color: 'red' }}>{error?.content}</Text>
        )}
      </div>
      <ImageUpload
        style={{ flex: 1, marginLeft: 24 }}
        value={step.images}
        onChange={data => onChangeImage(data)}
      />
    </div>
  )
}

export default Step
