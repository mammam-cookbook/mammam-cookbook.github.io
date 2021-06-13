import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Typography } from 'antd'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import 'pages/Recipe/recipe.css'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const { Text, Title } = Typography

export default function Challenge({ item }) {
  const { t } = useTranslation()
  const history = useHistory()

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {item?.author?.avatar_url ? (
          <Avatar
            size={'large'}
            src={item?.author?.avatar_url}
            alt={item?.author?.name}
          />
        ) : (
          <Avatar size={'large'} icon={<UserOutlined />} />
        )}
        <Button
          type="link"
          onClick={() =>
            history.push(
              `/profile?page=${PROFILE_PAGE.RECIPE}&user=${item?.author?.id}`
            )
          }
        >
          {item?.author?.name}
        </Button>
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
