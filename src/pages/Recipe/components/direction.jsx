import { Image, Typography } from 'antd'
import ButtonBase from 'components/ButtonBase'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { COLOR } from 'ultis/functions'
import 'pages/Recipe/recipe.css'

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
              width: 120,
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
      <div style={{ display: 'flex' }}>
        <Image.PreviewGroup>
          {item.images.map((img, index) => (
            <div
              style={{
                width: '32%',
                marginRight: index < item.images.length - 1 ? 16 : 0
              }}
            >
              <Image
                src={img}
                style={{
                  borderRadius: 10,
                  height: 220,
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  )
}
