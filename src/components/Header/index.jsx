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
          {/* <div>
            {user?.role !== 1 ? (
              <Dropdown
                overlay={Categories(categoryList)}
                style={{ marginBottom: 30 }}
              >
                <a id="categoriesTxt" className="ant-dropdown-link">
                  Categories
                </a>
              </Dropdown>
            ) : (
              <div />
            )}
          </div> */}
        </div>
        <div className="mobileHidden">
          {!(props?.from === 'addCourse') && user?.role === ROLES.TEACHER && (
            <Button
              type="primary"
              style={{ borderRadius: 50, marginRight: 24 }}
              onClick={() => history.push('/create')}
            >
              Add new course
            </Button>
          )}
          {user?.role !== 1 ? (
            <div>
              <Search
                style={{ width: '30vw' }}
                placeholder="Search for Courses i.e web-development"
                enterButton="Search"
                size="large"
                onSearch={value => {
                  const keyword = value.trim()
                  if (/\S+/.test(keyword)) {
                    // dispatch(UpdateSearch.get())
                    history.push({
                      pathname: `/courses`,
                      search: `keyword=${keyword}`,
                      state: { from: `/` }
                    })
                  }
                }}
              />
              <Button
                shape="round"
                style={{ borderWidth: 0 }}
                id="btnTxt"
                onClick={() =>
                  history.push({
                    pathname: '/courses',
                    state: { from: `/` }
                  })
                }
              >
                Courses
              </Button>
              <Button
                shape="round"
                style={{ borderWidth: 0, marginRight: 30 }}
                id="btnTxt"
                onClick={() =>
                  history.push({
                    pathname: '/about',
                    state: { from: `/` }
                  })
                }
              >
                About
              </Button>
            </div>
          ) : (
            <div />
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
              {t('auth.login')}
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
                      fontFamily: 'Source Sans Pro',
                      fontWeight: 'bold',
                      paddingTop: 10
                    }}
                  >
                    {user.fullName}
                  </p>
                </Popover>
              ) : (
                <div />
              )}
              {user?.role !== 1 ? (
                <div>
                  {/* <Link href="#courses" title="Courses" /> */}
                  <Link href="#about" title="About" />
                </div>
              ) : (
                <div />
              )}
              {!(props?.from === 'addCourse') &&
                user?.role === ROLES.TEACHER && (
                  <Link href="#create" title="Add new course" />
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
                    {t('auth:login')}
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
