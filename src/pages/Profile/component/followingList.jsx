import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import UserItem from 'pages/SearchRecipe/components/userItem'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import { GetFollowing } from '../redux/actions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function FollowingListProfile(props) {
  const { following, isLoadingRecipe } = useSelector(state => state.Profile)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const followingList = following?.map(item => {
    return { ...item.following, recipes: item?.recipes ?? 0 }
  })

  useEffect(() => {
    if (props?.userId) {
      dispatch(GetFollowing.get(props?.userId))
    }
  }, [])

  return (
    <div className="chooseContainer">
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
        <Text>{t('profile.noFollowing')}</Text>
      )}
    </div>
  )
}

export default FollowingListProfile
