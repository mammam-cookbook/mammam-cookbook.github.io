import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
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
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        border: `1px solid #828282`,
        alignItems: 'center',
        borderRadius: 10,
        padding: 16
      }}
    >
      {user.avatar_url ? (
        <Avatar size={100} src={user.avatar_url} />
      ) : (
        <Avatar size={100} icon={<UserOutlined />} />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 12,
          marginRight: 8
        }}
      >
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
        <Text
          style={{
            fontWeight: 700
          }}
        >
          {t(`profile.${user?.rank}`)}
        </Text>
        <Text
          style={{
            fontWeight: 500,
            marginBottom: 8
          }}
        >
          {user?.recipes ?? 0} {t('home.recipes').toLocaleLowerCase()}
        </Text>
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
      </div>
    </div>
  )
}

export default UserItem
