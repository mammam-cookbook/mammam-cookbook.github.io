import { Button, Input, Typography } from 'antd'
import 'pages/SignIn/signin.css'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { COLOR } from 'ultis/functions'
import ImageUpload from './imageUpload'

const { Text, Title } = Typography
const { TextArea } = Input

function Step({
  style,
  step,
  index,
  onChangeImage = data => {},
  onChangeMaking,
  onChangeTime,
  onDeleteItem,
  setIsUploading = isUpload => {},
  error
}) {
  const { t } = useTranslation()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const [stateStep, setStateStep] = useState(step)
  const onChangeImg = data => {
    setStateStep({ ...stateStep, images: data })
    onChangeImage({ ...stateStep, images: data })
  }
  return (
    <div
      style={{
        width: '100%',
        ...style,
        marginTop: 32
      }}
      className="row-container"
      key={`step-${index}`}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
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
                width: isDesktopOrLaptop ? 150 : 50,
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
          <Button
            type="text"
            shape="circle"
            onClick={() => onDeleteItem(index)}
            icon={<FiX size={28} color={COLOR.gray} />}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16
          }}
        >
          <Title level={5} style={{ marginRight: 12, marginTop: 8 }}>
            {t('create.time')}
          </Title>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Input
              style={{
                width: isDesktopOrLaptop ? 160 : 120,
                borderColor: COLOR.primary1
              }}
              onChange={event => {
                setStateStep({ ...stateStep, time: event.target.value })
                onChangeTime({ ...stateStep, time: event.target.value })
              }}
              placeholder="5"
              value={stateStep?.time}
              type="number"
            />
            <Title level={5} style={{ marginLeft: 8, marginTop: 8 }}>
              {t('create.min')}
            </Title>
          </div>
        </div>
        <TextArea
          onChange={event => {
            setStateStep({ ...stateStep, content: event.target.value })
            onChangeMaking({ ...stateStep, content: event.target.value })
          }}
          rows={5}
          value={stateStep.content}
          placeholder={t('create.directionPlaceholder')}
        />
        {error?.content && (
          <Text style={{ color: 'red' }}>{error?.content}</Text>
        )}
      </div>
      <ImageUpload
        style={{
          flex: 1
        }}
        setIsUploading={isUpload => setIsUploading(isUpload)}
        value={stateStep.images}
        step={step}
        onDelete={onChangeImg}
      />
    </div>
  )
}

export default Step
