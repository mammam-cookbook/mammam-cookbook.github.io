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
  FiCheck,
  FiFilter,
  FiSearch,
  FiShoppingCart,
  FiUser,
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

const { TabPane } = Tabs
const { Option } = Select

export default function ProfilePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const user = useSelector(state => state.Auth.user)
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const [currentTab, setCurrentTab] = useState('ingredients')
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const [categoriesFilterItem, setCategoriesFilterItem] = useState([])
  const [ingredientsFilter, setIngredientsFilter] = useState([])
  const [ingredientsText, setIngredientsText] = useState('')
  const [noIngredientsFilter, setNoIngredientsFilter] = useState([])
  const [noIngredientsText, setNoIngredientsText] = useState('')
  const [timeFilter, setTimeFilter] = useState(-1)
  const [isShowFilter, setIsShowFilter] = useState(false)
  const [sortOrder, setSortOrder] = useState(null)
  const {
    collections,
    collectionDetail,
    followers,
    following,
    recipes,
    isLoadingCollections,
    isLoadingCollectionDetail
  } = useSelector(state => state.Profile)

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const currentPage = query.get('page')

  useEffect(() => {
    if (!user) {
      history.replace('/')
    }
    dispatch(GetRecipeOfUser.get(user.id))
    dispatch(GetFollower.get(user.id))
    dispatch(GetFollowing.get(user.id))
  }, [currentPage])

  const onMenuSelect = e => {
    history.push(`/profile?page=${e.key}`)
  }

  const renderRightDashboard = () => {
    switch (currentPage) {
      case PROFILE_PAGE.RECIPE:
        return <RecipeListProfile />
      case PROFILE_PAGE.FOLLOWING:
        return <FollowingListProfile />
      case PROFILE_PAGE.FOLLOWER:
        return <FollowerListProfile />
      // case PAGE.STUDENT:
      //   return <StudentList />
      default:
        return <RecipeListProfile />
    }
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
            {user?.avatar_url ? (
              <Avatar size={80} src={user?.avatar_url} />
            ) : (
              <Avatar size={80} icon={<UserOutlined />} />
            )}
            <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 24 }}>
              {user?.name}
            </Text>
            <Text style={{ fontSize: 14, color: COLOR.grayText }}>
              {user?.email}
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
              icon={<FiGrid size={16} style={{ marginRight: 8 }} />}
            >
              {t('home.recipes')}
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.FOLLOWING}
              icon={<FiGrid size={16} style={{ marginRight: 8 }} />}
            >
              {t('profile.followings')}
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.FOLLOWER}
              icon={<FiGrid size={16} style={{ marginRight: 8 }} />}
            >
              {t('profile.followers')}
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.COLLECTION}
              icon={<FiGrid size={16} style={{ marginRight: 8 }} />}
            >
              Bộ sưu tập
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.SHOPPING_LIST}
              icon={<FiShoppingCart size={16} style={{ marginRight: 8 }} />}
            >
              Danh sách mua
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              className="customItem"
              key={PROFILE_PAGE.INFO}
              icon={<FiUser size={16} style={{ marginRight: 8 }} />}
            >
              Thông tin tài khoản
            </Menu.Item>
          </Menu>
        </div>
        {renderRightDashboard()}
      </div>
    </>
  )
}
