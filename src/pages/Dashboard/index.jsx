import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Menu, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import { SignOut } from 'pages/SignIn/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FiBookOpen, FiGrid, FiUsers } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'
import CategoryList from './component/categoryList'
import { PAGE } from './constant'
import './dashboard.css'
import { SetCurrentPage } from './redux/actions'
import {
  FiBookmark,
  FiFacebook,
  FiPrinter,
  FiSmile,
  FiUserPlus,
  FiX,
  FiLogOut,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function Dashboard() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const { t } = useTranslation()
  const isLoadingDashboard = useSelector(
    state => state.Dashboard.isLoadingDashboard
  )
  const [collaspe, setCollaspe] = useState(false)

  useEffect(() => {
    if (!user || user?.role === ROLES.USER) {
      history.replace('/')
    }
  }, [user])

  // useEffect(() => {
  //   return () => {
  //     if (history.action === 'POP') {
  //       dispatch(SignOut.get())
  //     }
  //   }
  // }, [history])

  const currentPage = useSelector(state => state.Dashboard.currentPage)

  const onMenuSelect = e => {
    dispatch(SetCurrentPage.get({ currentPage: e.key }))
  }

  console.log('user', user)

  const handleSignOut = () => {
    dispatch(SignOut.get())
    history.replace('/')
  }

  const renderRightDashboard = () => {
    switch (currentPage) {
      case PAGE.CATEGORY:
        return <CategoryList />
      // case PAGE.COURSE:
      //   return <CoursesList />
      // case PAGE.TEACHER:
      //   return <TeacherList />
      // case PAGE.STUDENT:
      //   return <StudentList />
      default:
        return <CategoryList />
    }
  }

  if (isLoadingDashboard || !user || user.role === ROLES.USER) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <div id="dashboardBg">
      <div id="menuContainer">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: 8
          }}
        >
          <Button
            shape="circle"
            type="text"
            onClick={() => handleSignOut()}
            icon={<FiLogOut size={24} color={'white'} />}
          />
          <Button
            shape="circle"
            type="text"
            onClick={() => setCollaspe(!collaspe)}
            icon={
              collaspe ? (
                <FiChevronRight size={24} color={'white'} />
              ) : (
                <FiChevronLeft size={24} color={'white'} />
              )
            }
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16
          }}
        >
          {user?.avatar ? (
            <Avatar size={40} src={user?.avatar} />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} />
          )}
          {!collaspe && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 8
              }}
            >
              <Text style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>
                {user?.name}
              </Text>
              <Text style={{ fontSize: 11, color: COLOR.grayText }}>
                {user?.email}
              </Text>
            </div>
          )}
        </div>
        <Menu
          defaultSelectedKeys={[PAGE.CATEGORY]}
          selectedKeys={[currentPage]}
          mode="inline"
          onClick={onMenuSelect}
          inlineCollapsed={collaspe}
          style={{ backgroundColor: COLOR.primary1, marginTop: 24 }}
        >
          <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.CATEGORY}
            icon={<FiGrid size={16} style={{ marginRight: 8 }} />}
          >
            {t('create.categories')}
          </Menu.Item>
          {/* <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.COURSE}
            icon={<FiBookOpen size={16} style={{ marginRight: 8 }} />}
          >
            Courses
          </Menu.Item>
          <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.TEACHER}
            icon={<FaChalkboardTeacher size={14} style={{ marginRight: 8 }} />}
          >
            Teachers
          </Menu.Item>
          <Menu.Item
            style={{ color: 'white' }}
            className="customItem"
            key={PAGE.STUDENT}
            icon={<FiUsers size={16} style={{ marginRight: 8 }} />}
          >
            Students
          </Menu.Item> */}
        </Menu>
      </div>
      {renderRightDashboard()}
    </div>
  )
}

export default Dashboard
