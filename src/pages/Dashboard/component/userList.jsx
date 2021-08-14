import {
  DeleteOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Modal, Space, Table, Tabs } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import { DeleteRecipe } from 'pages/Profile/redux/actions'
import { SearchUsers } from 'pages/SearchRecipe/redux/actions'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, LIMIT_ITEMS } from 'ultis/functions'
import '../dashboard.css'
import { BanUser, UnBanUser } from '../redux/actions'
import { getColumnSearchProps } from './searchInput'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function UserList() {
  const { userList, isLoading, currentUserOffset, canLoadMoreUser } =
    useSelector(state => state.Dashboard)
  const { user } = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const [filteredInfo, setFilterInfo] = useState(null)
  const { t } = useTranslation()

  const USER_TYPE = [
    {
      value: 'mod',
      text: 'mod'
    },
    {
      value: 'admin',
      text: 'admin'
    },
    {
      value: 'user',
      text: 'user'
    }
  ]

  const RANK_TYPE = [
    {
      value: 'bronze',
      text: t('profile.bronze')
    },
    {
      value: 'silver',
      text: t('profile.silver')
    },
    {
      value: 'gold',
      text: t('profile.gold')
    },
    {
      value: 'diamond',
      text: t('profile.diamond')
    }
  ]

  useEffect(() => {
    dispatch(SearchUsers.get({ keyword: '', limit: LIMIT_ITEMS, offset: 0 }))
  }, [])

  useEffect(() => {
    if (!isLoading && canLoadMoreUser) {
      dispatch(
        SearchUsers.get({
          keyword: '',
          limit: LIMIT_ITEMS,
          offset: currentUserOffset + LIMIT_ITEMS
        })
      )
    }
  }, [userList])

  const handleDelete = record => {
    Modal.confirm({
      title: t('common.confirm'),
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: t('profile.confirmToDeleteRecipe'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        dispatch(DeleteRecipe.get(record.id))
        Modal.destroyAll()
      }
    })
  }

  const handleBan = record => {
    Modal.confirm({
      title: t('common.confirm'),
      icon: <MinusCircleOutlined style={{ color: COLOR.primary1 }} />,
      content:
        record?.status === 1
          ? 'Xác nhận khóa tài khoản này?'
          : 'Xác nhận mở khóa tài khoản này?',
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        if (record?.status === 1) {
          dispatch(BanUser.get(record.id))
        } else {
          dispatch(UnBanUser.get(record.id))
        }
        Modal.destroyAll()
      }
    })
  }

  const handleChange = (pagination, filters, sorter) => {
    setFilterInfo(filters)
  }

  const recipeColumns = [
    {
      ...getColumnSearchProps(
        'name',
        'Enter name to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (value, record) => {
        return (
          <Space>
            {record?.avatar_url ? (
              <Avatar size={40} src={record?.avatar_url} />
            ) : (
              <Avatar size={40} icon={<UserOutlined />} />
            )}
            <span>{value}</span>
          </Space>
        )
      }
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      key: 'role',
      filters: USER_TYPE,
      filteredValue: filteredInfo ? filteredInfo.role : null,
      onFilter: (value, record) => record.role === value
    },
    {
      title: 'Số công thức',
      dataIndex: 'recipes',
      key: 'recipes',
      sorter: (a, b) => a.recipes - b.recipes
    },
    {
      title: 'Hạng',
      dataIndex: 'rank',
      key: 'rank',
      render: (value, record) => {
        return (
          <Text>{record?.role === 'user' ? t(`profile.${value}`) : ''}</Text>
        )
      },
      filters: RANK_TYPE,
      filteredValue: filteredInfo ? filteredInfo.rank : null,
      onFilter: (value, record) => record.rank === value
    },
    {
      title: 'Điểm',
      dataIndex: 'point',
      key: 'point',
      sorter: (a, b) => a.point - b.point
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (value, record) => {
        return (
          <Space>
            <MinusCircleOutlined
              style={{ fontSize: 20, color: value === 1 ? 'green' : '#FF0000' }}
              onClick={() => handleBan(record)}
            />
          </Space>
        )
      }
    },
    {
      title: t('common.action'),
      key: 'action',
      render: (value, record) => {
        return (
          <Space>
            {((user?.role === 'admin' && record?.role !== 'admin') ||
              (user?.role === 'mod' && record?.role === 'user')) && (
              <DeleteOutlined
                style={{ fontSize: 20, color: '#FF0000' }}
                onClick={() => handleDelete(record)}
              />
            )}
          </Space>
        )
      }
    }
  ]

  // if (isLoading) {
  //   return (
  //     <div className="chooseContainer">
  //       <Spin indicator={loadingIcon} />
  //     </div>
  //   )
  // }

  return (
    <div className="chooseContainer">
      <Title level={3}>Người dùng</Title>
      <Table
        style={{ marginTop: 48 }}
        columns={recipeColumns}
        dataSource={userList}
        onChange={handleChange}
        pagination={{ showSizeChanger: false }}
      />
    </div>
  )
}

export default UserList
