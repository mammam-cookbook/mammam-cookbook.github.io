import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import {
  Anchor,
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Popover,
  Select
} from 'antd'
import { SignOut } from 'pages/SignIn/redux/actions'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'
import { useTranslation } from 'react-i18next'
import { FiUser, FiBell, FiSearch, FiMenu, FiX } from 'react-icons/fi'

const { Search } = Input
const { Link } = Anchor

function AppHeader(props) {
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const history = useHistory()
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="text" style={{ fontSize: 12 }}>
          VI
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" style={{ fontSize: 12 }}>
          EN
        </Button>
      </Menu.Item>
    </Menu>
  )

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const handleKeyPress = event => {
    if (searchText.trim().length > 0 && event.key === 'Enter') {
      history.push(`/recipes?search=${searchText}`)
    }
  }

  const userPopover = (
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
          <Button type="link" style={{ marginRight: 16 }}>
            {t('home.browse')}
          </Button>
          <Button type="link" style={{ marginRight: 16 }}>
            {t('home.recipes')}
          </Button>
          {user && (
            <Button type="link" style={{ marginRight: 16 }}>
              {t('home.mealPlanner')}
            </Button>
          )}
          {!(props?.from === 'create') && user && (
            <Button
              type="link"
              style={{ marginRight: 16 }}
              onClick={() => history.push('/create')}
            >
              {t('home.createRecipe')}
            </Button>
          )}
          <Input
            style={styles.inputStyle}
            onChange={event => setSearchText(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={'Search name of recipe'}
            suffix={<FiSearch size={20} color={COLOR.primary1} />}
          />
          {user && (
            <Button
              type="link"
              style={{ marginRight: 16 }}
              onClick={() => {}}
              icon={<FiBell size={20} color={COLOR.primary1} />}
            />
          )}
          {user ? (
            <Popover
              placement="bottomRight"
              content={user?.role === ROLES.USER ? userPopover : adminPopover}
              trigger="click"
            >
              <Button
                type="link"
                style={{ marginRight: 16 }}
                onClick={() => {}}
                icon={<FiUser size={20} color={COLOR.primary1} />}
              />
            </Popover>
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
          <Dropdown overlay={menu} placement="bottomRight">
            <Button type="link" style={{ fontSize: 12 }}>
              VI
            </Button>
          </Dropdown>
        </div>
        <div className="mobileVisible">
          <Button
            type="link"
            style={{ marginRight: 24 }}
            onClick={() => history.push('/recipes')}
            icon={<FiSearch size={20} color={COLOR.primary1} />}
          />
          {user && (
            <Button
              type="link"
              style={{ marginRight: 24 }}
              onClick={() => {}}
              icon={<FiBell size={20} color={COLOR.primary1} />}
            />
          )}
          <Button
            type="link"
            onClick={showDrawer}
            icon={<FiMenu size={20} color={COLOR.primary1} />}
          />
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {!(props?.from === 'create') && user && (
                  <Button
                    type="default"
                    onClick={() => history.push('/create')}
                  >
                    {t('home.createRecipe')}
                  </Button>
                )}
                <Button
                  type="link"
                  onClick={onClose}
                  icon={<FiX size={20} color={COLOR.gray} />}
                />
              </div>
              <Button type="link" style={{ marginTop: 24, padding: 0 }}>
                {t('home.browse')}
              </Button>
              <Button type="link" style={{ marginTop: 12, padding: 0 }}>
                {t('home.recipes')}
              </Button>
              {user && (
                <Button
                  type="link"
                  style={{ marginTop: 12, padding: 0, marginBottom: 24 }}
                >
                  {t('home.mealPlanner')}
                </Button>
              )}

              {user ? (
                user?.avatar ? (
                  <Popover
                    placement="bottomRight"
                    content={
                      user?.role === ROLES.USER ? userPopover : adminPopover
                    }
                    trigger="click"
                  >
                    <Avatar size={48} src={user?.avatar} />
                  </Popover>
                ) : (
                  <Popover
                    placement="bottomRight"
                    content={
                      user?.role === ROLES.USER ? userPopover : adminPopover
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
              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <Button
                  type="text"
                  style={{ marginTop: 24, padding: 0, fontSize: 12 }}
                >
                  VI
                </Button>
              </Dropdown>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

const styles = {
  inputStyle: {
    flexGrow: 1,
    display: 'flex',
    marginRight: 48,
    boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.15)',
    borderRadius: 10,
    borderColor: 'transparent'
  }
}

export default AppHeader
