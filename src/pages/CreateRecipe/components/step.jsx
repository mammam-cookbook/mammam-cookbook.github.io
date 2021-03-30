import { Input, Typography } from 'antd'
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
  onChangeTime
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
              alignItems: 'center',
              borderColor: COLOR.primary1,
              borderWidth: 16
              // backgroundColor: 'red'
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
            <Title level={4} style={{ margin: 8 }}>
              {t('create.step')} {index + 1}
            </Title>
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
            <Input
              style={{ width: 80, borderColor: COLOR.primary1 }}
              onChange={event => onChangeTime(event.target.value)}
              placeholder="5"
            />
            <Title level={5} style={{ marginLeft: 8, marginTop: 8 }}>
              {t('create.min')}
            </Title>
          </div>
        </div>
        <TextArea
          onChange={event => onChangeMaking(event.target.value)}
          rows={5}
          placeholder={t('create.directionPlaceholder')}
        />
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
