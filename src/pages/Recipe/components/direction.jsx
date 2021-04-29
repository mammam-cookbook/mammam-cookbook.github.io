import { Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { COLOR } from 'ultis/functions'

const { Text, Title } = Typography

export default function Direction({ item, index }) {
  const { t } = useTranslation()

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <div
            style={{
              width: 240,
              height: 50,
              backgroundColor: COLOR.primary1,
              borderTopRightRadius: 10
            }}
          />
          <div>
            <Title level={4} style={{ margin: 8 }}>
              {t('create.step')} {index}
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
        {item.time && (
          <Title level={4} style={{ margin: 8 }}>
            {item?.time} {t('create.min')}
          </Title>
        )}
      </div>
      <Title level={5} style={{ marginTop: 16 }}>
        {item.content}
      </Title>
      {item.images.map(item => (
        <img
          style={{ borderRadius: 10, marginRight: 16, flex: 1 }}
          width={200}
          height={200}
          src={item}
          alt=""
        />
      ))}
    </div>
  )
}
