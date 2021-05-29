import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import UserItem from 'pages/SearchRecipe/components/userItem'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import { GetFollower } from '../redux/actions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function FollowerListProfile(props) {
  const { followers, isLoadingRecipe } = useSelector(state => state.Profile)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const followerList = followers?.map(item => item.user)

  useEffect(() => {
    if (props?.userId) {
      dispatch(GetFollower.get(props?.userId))
    }
  }, [])

  return (
    <div className="chooseContainer" style={{ paddingTop: 0 }}>
      <Title level={4}>{t('profile.followers')}</Title>
      {followerList && followerList?.length > 0 ? (
        <Row gutter={[16, 24]} style={{ marginTop: 32 }}>
          {followerList.map(item => (
            <Col md={12} lg={12} sm={24}>
              <UserItem user={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Text>{t('profile.noFollower')}</Text>
      )}
    </div>
  )
}

export default FollowerListProfile
