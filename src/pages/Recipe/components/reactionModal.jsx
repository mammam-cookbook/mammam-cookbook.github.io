import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Modal, Tabs, Typography } from 'antd'
import GlobalModal from 'components/GlobalModal'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import {
  FollowUser,
  GetFollowing,
  UnFollowUser
} from 'pages/Profile/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { COLOR, MODAL_TYPE, REACTION_IMG } from 'ultis/functions'

const { Text, Title } = Typography
const { TabPane } = Tabs

export default function ModalReaction({
  reactionList,
  reactionType,
  isShow,
  closeModal = () => {}
}) {
  const [currentTab, setCurrentTab] = useState('all')
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const REACT_NAME = {
    'easy peasy': t('recipe.easyPeasy'),
    yum: t('recipe.yum'),
    yuck: t('recipe.yuck'),
    'tough nut': t('recipe.toughNut')
  }

  useEffect(() => {
    if (user) {
      dispatch(GetFollowing.get(user?.id))
    }
  }, [])

  function UserItem(props) {
    const { user, react } = props
    const { t } = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()
    const mainUser = useSelector(state => state.Auth.user)
    const isFollow = mainUser
      ? mainUser?.following?.findIndex(item => item.following_id === user.id) >
        -1
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
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 4,
          paddingBottom: 4
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{ position: 'relative' }}>
            {user.avatar_url ? (
              <Avatar size={40} src={user.avatar_url} />
            ) : (
              <Avatar size={40} icon={<UserOutlined />} />
            )}
            <img
              src={REACTION_IMG[react]}
              alt=""
              width={20}
              height={20}
              style={{ position: 'absolute', bottom: -2, right: -4 }}
            />
          </div>

          <Button
            type="link"
            onClick={() =>
              history.push(
                `/profile?page=${PROFILE_PAGE.RECIPE}&user=${user.id}`
              )
            }
            style={{ fontWeight: 700, paddingLeft: 8 }}
          >
            {user.name}
          </Button>
        </div>
        {mainUser ? (
          mainUser?.id !== user.id ? (
            <Button
              type={isFollow ? 'default' : 'primary'}
              onClick={onClickFollow}
            >
              {isFollow ? t('profile.following') : t('profile.follow')}
            </Button>
          ) : null
        ) : (
          <Button
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
    )
  }

  const renderReaction = list => {
    return (
      <>
        {list &&
          list?.length > 0 &&
          list?.map(react => (
            <UserItem user={react?.author} react={react?.react} />
          ))}
      </>
    )
  }

  return (
    <Modal
      className="modal-reaction"
      onCancel={closeModal}
      footer={null}
      title={
        <Tabs
          size="large"
          activeKey={currentTab}
          onChange={key => setCurrentTab(key)}
        >
          <TabPane
            tab={
              <Text
                style={{
                  fontWeight: 700,
                  color: currentTab === 'all' ? COLOR.primary1 : ''
                }}
              >
                {t('recipe.comment')}
              </Text>
            }
            key="all"
          ></TabPane>
          {reactionType &&
            reactionType?.length > 0 &&
            reactionType?.map((item, index) => (
              <TabPane
                tab={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={REACTION_IMG[item[0]]}
                      alt=""
                      width={28}
                      height={28}
                    />
                    <Text
                      style={{
                        fontWeight: 700,
                        color: currentTab === item[0] ? COLOR.primary1 : '',
                        marginLeft: 8
                      }}
                    >
                      {REACT_NAME[item[0]]}
                    </Text>
                  </div>
                }
                key={index}
              ></TabPane>
            ))}
        </Tabs>
      }
      visible={isShow}
      centered
      style={{ width: 300 }}
    >
      {/* <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}> */}
      {currentTab === 'all'
        ? renderReaction(reactionList)
        : renderReaction(reactionType[Number(currentTab)][1])}
      {/* </div> */}
    </Modal>
  )
}
