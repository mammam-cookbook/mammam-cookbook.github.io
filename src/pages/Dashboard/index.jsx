import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Layout, Menu, Row, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import { SignOut } from 'pages/SignIn/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiAlertCircle,
  FiEdit,
  FiFlag,
  FiGrid,
  FiList,
  FiLogOut,
  FiUsers
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'
import CategoryList from './component/categoryList'
import DashboardPage from './component/dashboardPage'
import ProblemList from './component/problemList'
import RecipeList from './component/recipeList'
import ReportList from './component/reportList'
import UserList from './component/userList'
import { PAGE } from './constant'
import './dashboard.css'
import { SetCurrentPage } from './redux/actions'

const { Header, Footer, Sider, Content } = Layout

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
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelect] = useState(PAGE.DASHBOARD)

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
    if (e.key !== 'logout') {
      setSelect(e.key)
      dispatch(SetCurrentPage.get({ currentPage: e.key }))
    }
  }

  const handleSignOut = () => {
    dispatch(SignOut.get())
    history.replace('/')
  }

  const renderRightDashboard = () => {
    switch (currentPage) {
      case PAGE.DASHBOARD:
        return <DashboardPage />
      case PAGE.CATEGORY:
        return <CategoryList />
      case PAGE.USER:
        return <UserList />
      case PAGE.RECIPE:
        return <RecipeList />
      case PAGE.PROBLEM:
        return <ProblemList />
      case PAGE.REPORT:
        return <ReportList />
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
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="header-dashboard"
        style={{
          padding: 24,
          backgroundColor: 'white'
        }}
      >
        <span id="logoText">MAM</span>
      </Header>
      <Layout>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          style={{ paddingTop: 64 }}
          width={250}
        >
          <Row
            style={{ paddingTop: 36, paddingBottom: 36 }}
            align={'middle'}
            justify={'center'}
          >
            {user?.avatar_url ? (
              <Avatar size={46} src={user?.avatar_url} />
            ) : (
              <Avatar size={46} icon={<UserOutlined />} />
            )}
            {!collapsed ? (
              <Col style={{ marginLeft: 16 }}>
                <Col>
                  <Text
                    style={{ fontSize: 15, color: '#192A3E', fontWeight: 700 }}
                  >
                    {user?.name}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: 12, color: COLOR.grayText }}>
                    {user?.email}
                  </Text>
                </Col>
              </Col>
            ) : (
              <div />
            )}
          </Row>
          <Menu
            style={{ height: '90%', backgroundColor: 'white' }}
            theme="dark"
            selectedKeys={[currentPage]}
            mode="inline"
            onClick={onMenuSelect}
          >
            <Menu.Item
              style={{
                fontSize: 16,
                color: selected === PAGE.DASHBOARD ? 'white' : '#828282',
                fontWeight: selected === PAGE.DASHBOARD ? 'bold' : 'normal'
              }}
              key={PAGE.DASHBOARD}
              icon={<FiGrid size={20} style={{ marginRight: 8 }} />}
            >
              {t('auth.dashboard')}
            </Menu.Item>
            <Menu.Item
              style={{
                fontSize: 16,
                color: selected === PAGE.CATEGORY ? 'white' : '#828282',
                fontWeight: selected === PAGE.CATEGORY ? 'bold' : 'normal'
              }}
              key={PAGE.CATEGORY}
              icon={<FiList size={20} style={{ marginRight: 8 }} />}
            >
              {t('create.categories')}
            </Menu.Item>
            <Menu.Item
              style={{
                fontSize: 16,
                color: selected === PAGE.RECIPE ? 'white' : '#828282',
                fontWeight: selected === PAGE.RECIPE ? 'bold' : 'normal'
              }}
              key={PAGE.RECIPE}
              icon={<FiEdit size={20} style={{ marginRight: 8 }} />}
            >
              {t('home.recipes')}
            </Menu.Item>
            <Menu.Item
              style={{
                fontSize: 16,
                color: selected === PAGE.USER ? 'white' : '#828282',
                fontWeight: selected === PAGE.USER ? 'bold' : 'normal'
              }}
              key={PAGE.USER}
              icon={<FiUsers size={20} style={{ marginRight: 8 }} />}
            >
              Người dùng
            </Menu.Item>
            <Menu.Item
              style={{
                fontSize: 16,
                color: selected === PAGE.PROBLEM ? 'white' : '#828282',
                fontWeight: selected === PAGE.PROBLEM ? 'bold' : 'normal'
              }}
              key={PAGE.PROBLEM}
              icon={<FiAlertCircle size={20} style={{ marginRight: 8 }} />}
            >
              Vấn đề
            </Menu.Item>
            <Menu.Item
              style={{
                fontSize: 16,
                color: selected === PAGE.REPORT ? 'white' : '#828282',
                fontWeight: selected === PAGE.REPORT ? 'bold' : 'normal'
              }}
              key={PAGE.REPORT}
              icon={<FiFlag size={20} style={{ marginRight: 8 }} />}
            >
              Báo cáo
            </Menu.Item>
            <Menu.Item
              style={{ fontSize: 16, color: '#828282' }}
              key={'logout'}
              onClick={() => handleSignOut()}
              icon={<FiLogOut size={20} style={{ marginRight: 8 }} />}
            >
              {t('auth.logout')}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginTop: 48 }}>
          <Content
            style={{
              margin: 24,
              marginRight: 64,
              marginLeft: 64,
              overflow: 'initial'
            }}
          >
            {renderRightDashboard()}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyrights &copy; 2021 All Rights Reseverd by MAM.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Dashboard
