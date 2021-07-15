import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Menu, Row, Select, Spin, Tabs } from 'antd'
import Text from 'antd/lib/typography/Text'
import AppHeader from 'components/Header'
import { GetProfile } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiBookmark,
  FiFileText,
  FiLock,
  FiShoppingCart,
  FiSliders,
  FiUser,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { COLOR } from 'ultis/functions'
import ChangePasswordTab from './component/changePassTab'
import CollectionListProfile from './component/collectionList'
import FollowerListProfile from './component/followerList'
import FollowingListProfile from './component/followingList'
import RecipeListProfile from './component/recipeList'
import UserInfoTab from './component/userInfoTab'
import { PROFILE_PAGE } from './constant'

const { TabPane } = Tabs
const { Option } = Select

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

export default function ProfilePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const user = useSelector(state => state.Auth.user)
  const {
    collections,
    collectionDetail,
    followers,
    following,
    recipes,
    isLoadingCollections,
    isLoadingCollectionDetail,
    isLoadingProfile,
    userProfile
  } = useSelector(state => state.Profile)

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const currentPage = query.get('page')
  const otherUser = query.get('user')

  useEffect(() => {
    if (!user && !otherUser) {
      if (currentPage === PROFILE_PAGE.CHANGE_PASSWORD) {
        history.push({
          pathname: '/signin',
          state: { from: `/profile?page=${PROFILE_PAGE.RECIPE}` }
        })
      } else {
        history.replace('/')
      }
    } else if (user?.id === otherUser) {
      history.replace(`/profile?page=${PROFILE_PAGE.RECIPE}`)
    }
  }, [user, otherUser])

  const currentUser = otherUser ? otherUser : user?.id

  useEffect(() => {
    if (currentUser) {
      dispatch(GetProfile.get(currentUser))
    }
  }, [currentUser])

  const onMenuSelect = e => {
    if (otherUser) {
      history.push(`/profile?page=${e.key}&user=${otherUser}`)
    } else {
      history.push(`/profile?page=${e.key}`)
    }
  }

  const renderRightDashboard = () => {
    switch (currentPage) {
      case PROFILE_PAGE.RECIPE:
        return <RecipeListProfile userId={currentUser} />
      case PROFILE_PAGE.FOLLOWING:
        return <FollowingListProfile userId={currentUser} />
      case PROFILE_PAGE.FOLLOWER:
        return <FollowerListProfile userId={currentUser} />
      case PROFILE_PAGE.COLLECTION:
        return <CollectionListProfile />
      case PROFILE_PAGE.INFO:
        return <UserInfoTab />
      case PROFILE_PAGE.CHANGE_PASSWORD:
        return <ChangePasswordTab />
      default:
        return <RecipeListProfile userId={currentUser} />
    }
  }

  if (isLoadingProfile || !userProfile) {
    return (
      <>
        <AppHeader />
        <div
          className="body-container"
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            paddingTop: 48
          }}
        >
          <Spin indicator={loadingIcon} />
        </div>
      </>
    )
  }

  return (
    <>
      <AppHeader />

      <div className="body-container">
        <Row justify="start" gutter={{ xs: 0, sm: 0, md: 16, lg: 16 }}>
          <Col span={6} sm={24} xs={24} md={8} lg={8} xl={6} xxl={6}>
            <div
              id="menuContainer"
              style={{
                backgroundColor: '#EEE',
                borderRadius: 10
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 16
                }}
              >
                {userProfile?.avatar_url ? (
                  <Avatar size={80} src={userProfile?.avatar_url} />
                ) : (
                  <Avatar size={80} icon={<UserOutlined />} />
                )}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginTop: 24,
                    textAlign: 'center'
                  }}
                >
                  {userProfile?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOR.grayText,
                    textAlign: 'center'
                  }}
                >
                  {userProfile?.email}
                </Text>
              </div>
              <Menu
                defaultSelectedKeys={[PROFILE_PAGE.RECIPE]}
                selectedKeys={[currentPage]}
                mode="inline"
                onClick={onMenuSelect}
                style={{
                  backgroundColor: COLOR.primary1,
                  marginTop: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderRadius: 10
                }}
              >
                <Menu.Item
                  style={{ color: 'white' }}
                  className="customItem"
                  id="txtItem"
                  key={PROFILE_PAGE.RECIPE}
                  icon={<FiFileText size={16} style={styles.icon} />}
                >
                  {t('home.recipes')}
                </Menu.Item>
                <Menu.Item
                  style={{ color: 'white' }}
                  className="customItem"
                  id="txtItem"
                  key={PROFILE_PAGE.FOLLOWING}
                  icon={<FiUserCheck size={16} style={styles.icon} />}
                >
                  {t('profile.followings')}
                </Menu.Item>
                <Menu.Item
                  style={{ color: 'white' }}
                  className="customItem"
                  id="txtItem"
                  key={PROFILE_PAGE.FOLLOWER}
                  icon={<FiUsers size={16} style={styles.icon} />}
                >
                  {t('profile.followers')}
                </Menu.Item>
                {!otherUser && (
                  <Menu.Item
                    style={{ color: 'white' }}
                    className="customItem"
                    id="txtItem"
                    key={PROFILE_PAGE.COLLECTION}
                    icon={<FiBookmark size={16} style={styles.icon} />}
                  >
                    {t('profile.collection')}
                  </Menu.Item>
                )}
                {!otherUser && (
                  <Menu.Item
                    style={{ color: 'white' }}
                    className="customItem"
                    id="txtItem"
                    key={PROFILE_PAGE.SHOPPING_LIST}
                    icon={<FiShoppingCart size={16} style={styles.icon} />}
                  >
                    {t('profile.shoppingList')}
                  </Menu.Item>
                )}
                {!otherUser && (
                  <Menu.Item
                    style={{ color: 'white' }}
                    className="customItem"
                    id="txtItem"
                    key={PROFILE_PAGE.INFO}
                    icon={<FiUser size={16} style={styles.icon} />}
                  >
                    {t('profile.userInfo')}
                  </Menu.Item>
                )}
                {!otherUser && (
                  <Menu.Item
                    style={{ color: 'white' }}
                    className="customItem"
                    id="txtItem"
                    key={PROFILE_PAGE.CHANGE_PASSWORD}
                    icon={<FiLock size={16} style={styles.icon} />}
                  >
                    {t('profile.changePassword')}
                  </Menu.Item>
                )}
                {!otherUser && (
                  <Menu.Item
                    style={{ color: 'white' }}
                    className="customItem"
                    id="txtItem"
                    key={PROFILE_PAGE.CUSTOMIZE}
                    icon={<FiSliders size={16} style={styles.icon} />}
                  >
                    {t('profile.customize')}
                  </Menu.Item>
                )}
              </Menu>
            </div>
          </Col>
          <Col span={18} sm={24} xs={24} md={16} lg={16} xl={18} xxl={18}>
            {renderRightDashboard()}
          </Col>
        </Row>
      </div>
    </>
  )
}

const styles = {
  icon: {
    marginRight: 8,
    marginTop: -4
  }
}
