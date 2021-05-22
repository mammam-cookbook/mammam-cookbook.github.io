import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import UserItem from 'pages/SearchRecipe/components/userItem'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function FollowingListProfile() {
  const { following, isLoadingRecipe } = useSelector(state => state.Profile)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const followingList = following?.map(item => item.following)

  return (
    <div className="chooseContainer" style={{ paddingTop: 0 }}>
      <Title level={4}>{t('profile.followings')}</Title>
      {followingList && followingList?.length > 0 ? (
        <Row gutter={[16, 24]} style={{ marginTop: 32 }}>
          {followingList.map(item => (
            <Col md={12} lg={12} sm={24}>
              <UserItem user={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Text>Chưa theo dõi người nào</Text>
      )}
    </div>
  )
}

export default FollowingListProfile
