import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import ButtonBase from 'components/ButtonBase'
import GlobalModal from 'components/GlobalModal'
import 'pages/Home/home.css'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import { FollowUser, UnFollowUser } from 'pages/Profile/redux/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { COLOR, MODAL_TYPE } from 'ultis/functions'
import '../styles.css'
function UserItem(props) {
  const { user } = props
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const mainUser = useSelector(state => state.Auth.user)
  const isFollow = mainUser
    ? mainUser?.following?.findIndex(item => item.following_id === user.id) > -1
    : false

  const location = useLocation()

  const onClickFollow = () => {
    if (isFollow) {
      dispatch(UnFollowUser.get(user.id))
    } else {
      dispatch(FollowUser.get(user.id))
    }
  }

  return (
    <Col className={'card'} style={{
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 16,
      backgroundColor: 'white',
      paddingBottom: 32,

    }}>
      <Row justify={'center'}>
        {user.avatar_url ? (
          <Avatar size={100} src={user.avatar_url} />
        ) : (
          <Avatar size={100} icon={<UserOutlined />} />
        )}</Row>
      <Row justify={'center'}>
        <ButtonBase
          onClick={() =>
            history.push(`/profile?page=${PROFILE_PAGE.RECIPE}&user=${user.id}`)
          }
          style={{ padding: 0, backgroundColor: 'white' }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: COLOR.primary1
            }}
          >
            {user?.name}
          </Text>
        </ButtonBase>
      </Row>
      <Row justify={'center'}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 700,
            textAlign: 'center'
          }}
        >
          {t(`profile.${user?.rank}`)}
        </Text>
      </Row>
      <Row justify={'center'}>
        <Text
          style={{
            fontWeight: 500,
            marginBottom: 8
          }}
        >
          {user?.recipes ?? 0} {t('home.recipes').toLocaleLowerCase()}
        </Text>
      </Row>
      <Row justify={'center'}>
        {mainUser ? (
          mainUser?.id !== user.id ? (
            <Button
              style={{ justifySelf: 'flex-end' }}
              type={isFollow ? 'default' : 'primary'}
              onClick={onClickFollow}
            >
              {isFollow ? t('profile.following') : t('profile.follow')}
            </Button>
          ) : null
        ) : (
          <Button
            style={{ justifySelf: 'flex-end' }}
            type={isFollow ? 'default' : 'primary'}
            onClick={() => {
              GlobalModal.alertMessage(
                null,
                t('signin.title'),
                MODAL_TYPE.CHOICE,
                () =>
                  history.push({
                    pathname: '/signin',
                    state: { from: `${location.pathname}${location.search}` }
                  })
              )
            }}
          >
            {t('profile.follow')}
          </Button>
        )}
      </Row>
    </Col>
  )
}

export default UserItem
