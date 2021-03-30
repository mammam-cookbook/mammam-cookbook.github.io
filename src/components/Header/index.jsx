import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Anchor, Avatar, Button, Drawer, Input, Menu, Popover } from 'antd'
import { SignOut } from 'pages/SignIn/redux/actions'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ROLES } from 'ultis/functions'
import { useTranslation } from 'react-i18next'

const { Search } = Input
const { Link } = Anchor

function AppHeader(props) {
  const [visible, setVisible] = useState(false)
  const history = useHistory()
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  const showDrawer = () => {
    console.info('show')
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const studentPopover = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        key={'profile'}
        onClick={() => {
          history.push(`/profile`)
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key={'course'}
        onClick={() => {
          history.push(`/my-courses`)
        }}
      >
        My courses
      </Menu.Item>
      <Menu.Item
        key={'logout'}
        onClick={() => {
          dispatch(SignOut.get())
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  )

  const adminPopover = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        key={'profile'}
        onClick={() => {
          history.push(`/profile`)
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key={'dashboard'}
        onClick={() => {
          history.push(`/admin`)
        }}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        key={'logout'}
        onClick={() => {
          dispatch(SignOut.get())
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="container-fluid">
      <div className="header">
        <div style={{ display: 'flex' }}>
          <div id="logo">
            <span
              id="logoText"
              onClick={() =>
                history.push({
                  pathname: '/',
                  state: { from: `/` }
                })
              }
            >
              MAM
            </span>
          </div>
        </div>
        <div className="mobileHidden">
          <Button type="link" style={{ marginRight: 24 }}>
            {t('home.browse')}
          </Button>
          <Button type="link" style={{ marginRight: 24 }}>
            {t('home.recipes')}
          </Button>
          <Button type="link" style={{ marginRight: 24 }}>
            {t('home.mealPlanner')}
          </Button>
          {!(props?.from === 'create') && (
            <Button
              type="link"
              style={{ marginRight: 24 }}
              onClick={() => history.push('/create')}
            >
              {t('home.createRecipe')}
            </Button>
          )}
          {user ? (
            user?.avatar ? (
              <Popover
                placement="bottomRight"
                content={
                  user?.role === ROLES.ADMIN ? adminPopover : studentPopover
                }
                trigger="click"
              >
                <Avatar size={48} src={user?.avatar} />
              </Popover>
            ) : (
              <Popover
                placement="bottomRight"
                content={
                  user?.role === ROLES.ADMIN ? adminPopover : studentPopover
                }
                trigger="click"
              >
                <Avatar size={48} icon={<UserOutlined />} />
              </Popover>
            )
          ) : (
            <Button
              type="primary"
              onClick={() =>
                history.push({
                  pathname: '/signin',
                  state: { from: `/` }
                })
              }
            >
              {t('auth.login').toLocaleUpperCase()}
            </Button>
          )}
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              {user?.role !== 1 ? (
                <Search
                  allowClear
                  placeholder="Search"
                  onSearch={value => props.onSearch(value)}
                  enterButton={'Search'}
                />
              ) : (
                <div />
              )}
              {user ? (
                <Popover
                  placement="bottomRight"
                  content={
                    user?.role === ROLES.ADMIN ? adminPopover : studentPopover
                  }
                  trigger="click"
                >
                  <p
                    className="ant-anchor-link"
                    style={{
                      fontWeight: 700,
                      paddingTop: 10
                    }}
                  >
                    {user.fullName}
                  </p>
                </Popover>
              ) : (
                <div />
              )}
              <Link href="#create" title={t('home:browse')} />
              <Link href="#create" title={t('home:recipes')} />
              <Link href="#create" title={t('home:mealPlanner')} />
              {!(props?.from === 'create') && (
                <Link href="#create" title={t('home:createRecipe')} />
              )}
              {!user ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    type="primary"
                    style={{ width: '80%', marginBlock: 10 }}
                    onClick={() =>
                      history.push({
                        pathname: '/signin',
                        state: { from: `/` }
                      })
                    }
                  >
                    {t('auth:login').toLocaleUpperCase()}
                  </Button>
                </div>
              ) : (
                <div />
              )}
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
