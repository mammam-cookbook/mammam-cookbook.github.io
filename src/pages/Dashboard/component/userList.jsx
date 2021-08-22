import {
  DeleteOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Modal, Space, Table, Tabs } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'
import { BanUser, DeleteUser, UnBanUser } from '../redux/actions'
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

  // useEffect(() => {
  //   dispatch(SearchUsers.get({ keyword: '', limit: LIMIT_ITEMS, offset: 0 }))
  // }, [])

  // useEffect(() => {
  //   if (!isLoading && canLoadMoreUser) {
  //     dispatch(
  //       SearchUsers.get({
  //         keyword: '',
  //         limit: LIMIT_ITEMS,
  //         offset: currentUserOffset + LIMIT_ITEMS
  //       })
  //     )
  //   }
  // }, [isLoading])

  const handleDelete = record => {
    Modal.confirm({
      title: t('common.confirm'),
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: t('dashboard.confirmToDeleteUser'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        dispatch(DeleteUser.get(record.id))
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
          ? t('dashboard.confirmToBlockUser')
          : t('dashboard.confirmToUnblockUser'),
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
      title: t('dashboard.avatar'),
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      render: (value, record) => {
        return (
          <Space>
            {record?.avatar_url ? (
              <Avatar size={40} src={record?.avatar_url} />
            ) : (
              <Avatar size={40} icon={<UserOutlined />} />
            )}
          </Space>
        )
      }
    },
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
      title: t('dashboard.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    // {
    //   title: t('dashboard.role'),
    //   dataIndex: 'role',
    //   key: 'role',
    //   filters: USER_TYPE,
    //   filteredValue: filteredInfo ? filteredInfo.role : null,
    //   onFilter: (value, record) => record.role === value
    // },
    {
      title: t('dashboard.recipeCount'),
      dataIndex: 'recipes',
      key: 'recipes',
      sorter: (a, b) => a.recipes - b.recipes
    },
    {
      title: t('dashboard.rank'),
      dataIndex: 'rank',
      key: 'rank',
      sorter: (a, b) => a.rank.localeCompare(b.rank),
      render: (value, record) => {
        return (
          <Text>{record?.role === 'user' ? t(`profile.${value}`) : ''}</Text>
        )
      }
      // filters: RANK_TYPE,
      // filteredValue: filteredInfo ? filteredInfo.rank : null,
      // onFilter: (value, record) => record.rank === value
    },
    {
      title: t('dashboard.point'),
      dataIndex: 'point',
      key: 'point',
      sorter: (a, b) => a.point - b.point
    },
    {
      title: t('dashboard.status'),
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
      <Title level={3}>{t('dashboard.user')}</Title>
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
