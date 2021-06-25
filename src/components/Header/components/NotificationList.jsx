import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import ButtonBase from 'components/ButtonBase'
import moment from 'moment'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import { UpdateNotification } from 'pages/SignIn/redux/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { COLOR, NOTI_TYPE } from 'ultis/functions'

export default function NotificationList() {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const { notifications } = useSelector(state => state.Auth)
  const NOTI_TEXT = {
    [NOTI_TYPE.LIKE]: t('notification.liked'),
    [NOTI_TYPE.COMMENT]: t('notification.commented'),
    [NOTI_TYPE.FOLLOW]: t('notification.followed'),
    [NOTI_TYPE.REPLY]: t('notification.replied')
  }

  const getNotiContent = noti => {
    switch (noti.type) {
      case NOTI_TYPE.LIKE:
        return noti?.recipe?.title
      case NOTI_TYPE.COMMENT:
        return `"${noti?.comment?.content}"`
      case NOTI_TYPE.FOLLOW:
        return ''
      case NOTI_TYPE.REPLY:
        return `"${noti?.comment?.content}"`
      default:
        return noti?.recipe?.title
    }
  }

  const onClickNoti = noti => {
    if (
      noti.type === NOTI_TYPE.LIKE ||
      noti.type === NOTI_TYPE.COMMENT ||
      noti.type === NOTI_TYPE.REPLY
    ) {
      if (noti?.recipe) {
        history.push(`/recipe/${noti?.recipe?.id}`)
      }
    } else if (noti.type === NOTI_TYPE.FOLLOW) {
      history.push(
        `/profile?page=${PROFILE_PAGE.RECIPE}&user=${noti?.sender.id}`
      )
    }
    dispatch(UpdateNotification.get({ ...noti, read: true }))
  }
  return (
    <div
      style={{
        width: isDesktopOrLaptop ? 400 : '90vw',
        height: '90vh',
        borderRadius: 10,
        backgroundColor: 'white'
      }}
    >
      <Title level={4} style={{ marginLeft: 12, marginTop: 12 }}>
        {t('notification.notification')}
      </Title>
      {notifications && notifications?.length > 0 ? (
        notifications?.map(item => (
          <ButtonBase
            style={{ alignItems: 'center' }}
            onClick={() => {
              onClickNoti(item)
            }}
          >
            {item?.sender?.avatar_url ? (
              <Avatar size={44} src={item?.sender?.avatar_url} />
            ) : (
              <Avatar size={44} icon={<UserOutlined />} />
            )}
            <div
              style={{
                paddingLeft: 12,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Paragraph
                style={{
                  opacity: item?.read ? 0.6 : 1
                }}
                ellipsis={{
                  rows: 2,
                  expandable: false,
                  suffix: ''
                }}
              >
                <Text style={{ fontWeight: 700 }}>{item?.sender?.name}</Text>{' '}
                {NOTI_TEXT[item?.type]}{' '}
                <Text style={{ fontWeight: 700 }}>{getNotiContent(item)}</Text>
              </Paragraph>
              <Text
                style={{
                  color: item?.read ? COLOR.grayText : COLOR.primary1,
                  fontSize: 12,
                  fontWeight: 700
                }}
              >
                {moment(item?.createdAt).fromNow()}
              </Text>
            </div>

            <div
              style={{
                display: 'flex',
                width: 36,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {!item?.read && (
                <div
                  style={{
                    borderRadius: 50,
                    width: 12,
                    height: 12,
                    backgroundColor: COLOR.primary1
                  }}
                />
              )}
            </div>
          </ButtonBase>
        ))
      ) : (
        <Text style={{ marginLeft: 12, marginTop: 12 }}>
          {t('notification.noNotification')}
        </Text>
      )}
    </div>
  )
}
