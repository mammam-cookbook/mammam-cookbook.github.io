import {
  Avatar,
  Badge,
  Button,
  Col,
  Input,
  Menu,
  Pagination,
  Row,
  Select,
  Spin,
  Tabs
} from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import AppHeader from 'components/Header'
import { GetAllCategories } from 'pages/Dashboard/redux/actions'
import {
  GetFollower,
  GetFollowing,
  GetRecipeOfUser
} from 'pages/Profile/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiBookmark,
  FiCheck,
  FiFileText,
  FiFilter,
  FiLock,
  FiSearch,
  FiShoppingCart,
  FiSliders,
  FiUser,
  FiUserCheck,
  FiX
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { COLOR, LIMIT_ITEMS } from 'ultis/functions'
import i18n from 'ultis/i18n'
import { UserOutlined } from '@ant-design/icons'
import { FiBookOpen, FiGrid, FiUsers } from 'react-icons/fi'
import { PROFILE_PAGE } from './constant'
import RecipeListProfile from './component/recipeList'
import FollowingListProfile from './component/followingList'
import FollowerListProfile from './component/followerList'
import CollectionListProfile from './component/collectionList'
import { GetProfile } from 'pages/SignIn/redux/actions'
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import ChangePasswordTab from './component/changePassTab'
import UserInfoTab from './component/userInfoTab'

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
      <div className="body-container" style={{ display: 'flex', flex: 1 }}>
        <div
          id="menuContainer"
          style={{ backgroundColor: '#EEE', borderRadius: 10 }}
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
            style={{ backgroundColor: COLOR.primary1, marginTop: 24 }}
          >
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.RECIPE}
              icon={<FiFileText size={16} style={styles.icon} />}
            >
              {t('home.recipes')}
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.FOLLOWING}
              icon={<FiUserCheck size={16} style={styles.icon} />}
            >
              {t('profile.followings')}
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.FOLLOWER}
              icon={<FiUsers size={16} style={styles.icon} />}
            >
              {t('profile.followers')}
            </Menu.Item>
            {!otherUser && (
              <Menu.Item
                style={{ color: 'white' }}
                className="customItem"
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
                key={PROFILE_PAGE.CUSTOMIZE}
                icon={<FiSliders size={16} style={styles.icon} />}
              >
                {t('profile.customize')}
              </Menu.Item>
            )}
          </Menu>
        </div>
        {renderRightDashboard()}
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
