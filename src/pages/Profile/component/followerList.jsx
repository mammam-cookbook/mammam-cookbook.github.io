import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import RecipeItem from 'components/RecipeItem'
import UserItem from 'pages/SearchRecipe/components/userItem'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function FollowerListProfile() {
  const { followers, isLoadingRecipe } = useSelector(state => state.Profile)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const followerList = followers?.map(item => item.user)

  return (
    <div className="chooseContainer" style={{ paddingTop: 0 }}>
      <Title level={4}>{t('profile.followers')}</Title>
      {followerList && followerList?.length > 0 ? (
        <Row gutter={[16, 24]} style={{ marginTop: 32 }}>
          {followerList.map(item => (
            <Col md={12} lg={8} sm={24}>
              <UserItem user={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Text>Chưa có người theo dõi</Text>
      )}
    </div>
  )
}

export default FollowerListProfile
