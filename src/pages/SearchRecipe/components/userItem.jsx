import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import Text from 'antd/lib/typography/Text'
import 'pages/Home/home.css'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import { FollowUser, UnFollowUser } from 'pages/Profile/redux/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { history } from 'ultis/functions'

function UserItem(props) {
  const { user } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const following = useSelector(state => state.Profile.following)
  const mainUser = useSelector(state => state.Auth.user)
  const isFollow =
    following?.findIndex(item => item.following_id === user.id) > -1

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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        border: `1px solid #828282`,
        borderRadius: 10,
        padding: 16
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start'
        }}
      >
        {user.avatar_url ? (
          <Avatar size={60} src={user.avatar_url} />
        ) : (
          <Avatar size={60} icon={<UserOutlined />} />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 12,
            marginRight: 8
          }}
        >
          <Button
            type="link"
            onClick={() =>
              history.push(
                `/profile?page=${PROFILE_PAGE.RECIPE}&user=${user.id}`
              )
            }
            style={{ fontSize: 18, fontWeight: 700, padding: 0 }}
          >
            {user.name}
          </Button>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            10 {t('home.recipes').toLocaleLowerCase()}
          </Text>
        </div>
      </div>

      {mainUser.id !== user.id && (
        <Button
          style={{ justifySelf: 'flex-end' }}
          type={isFollow ? 'default' : 'primary'}
          onClick={onClickFollow}
        >
          {isFollow ? t('profile.following') : t('profile.follow')}
        </Button>
      )}
    </div>
  )
}

export default UserItem
