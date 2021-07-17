import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Modal, Space, Spin, Table, Tabs } from 'antd'
import Title from 'antd/lib/typography/Title'
import { DeleteRecipe } from 'pages/Profile/redux/actions'
import { SearchRecipes } from 'pages/SearchRecipe/redux/actions'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { calcCalories, COLOR } from 'ultis/functions'
import '../dashboard.css'
import { getColumnSearchProps } from './searchInput'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function RecipeList() {
  const list = useSelector(state => state.Dashboard.recipeList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const [filteredInfo, setFilterInfo] = useState(null)
  const { t } = useTranslation()
  const history = useHistory()

  useEffect(() => {
    dispatch(SearchRecipes.get({}))
  }, [])

  const handleEdit = (value, record) => {
    history.push(`/edit/${record.id}`)
  }

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

  const handleChange = (pagination, filters, sorter) => {
    setFilterInfo(filters)
  }

  const recipeColumns = [
    {
      ...getColumnSearchProps(
        'title',
        'Enter name to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (value, record) => {
        return (
          <Space>
            <Avatar shape="square" size={56} src={record?.avatar?.[0]} />
            <span>{value}</span>
          </Space>
        )
      }
    },
    {
      // ...getColumnSearchProps(
      //   'author.name',
      //   'Enter name to find',
      //   searchText,
      //   setSearchText,
      //   searchedColumn,
      //   setSearchColumn,
      //   refInput
      // ),
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author.name.localeCompare(b.author.name),
      render: (value, record) => {
        return (
          <Space>
            {record?.author?.avatar_url ? (
              <Avatar size={40} src={record?.author?.avatar_url} />
            ) : (
              <Avatar size={40} icon={<UserOutlined />} />
            )}
            <span>{value.name}</span>
          </Space>
        )
      }
    },
    {
      title: t('create.ration'),
      dataIndex: 'ration',
      key: 'ration',
      sorter: (a, b) => a.ration - b.ration
    },
    {
      title: t('create.time'),
      dataIndex: 'cooking_time',
      key: 'cooking_time',
      sorter: (a, b) => a.cooking_time - b.cooking_time
    },
    {
      title: t('recipe.energy'),
      dataIndex: 'ingredients',
      key: 'ingredients',
      sorter: (a, b) =>
        a.ingredients?.reduce(calcCalories, 0) -
        b.ingredients?.reduce(calcCalories, 0),
      render: (value, record) => {
        return (
          <Space>
            <span>{value?.reduce(calcCalories, 0).toFixed(0)} kcal</span>
          </Space>
        )
      }
    },
    // {
    //   title: 'ingredients',
    //   dataIndex: 'ingredients',
    //   key: 'ingredients',
    //   sorter: (a, b) => a.ingredients?.length - b.ingredients?.length,
    //   render: (value, record) => {
    //     return (
    //       <Space>
    //         <span>{value.length}</span>
    //       </Space>
    //     )
    //   }
    // },
    // {
    //   title: 'steps',
    //   dataIndex: 'steps',
    //   key: 'steps',
    //   sorter: (a, b) => a.steps?.length - b.steps?.length,
    //   render: (value, record) => {
    //     return (
    //       <Space>
    //         <span>{value.length}</span>
    //       </Space>
    //     )
    //   }
    // },
    {
      title: 'Lượt thích',
      dataIndex: 'countReaction',
      key: 'countReaction',
      sorter: (a, b) => a.countReaction - b.countReaction
    },
    {
      title: t('common.action'),
      key: 'action',
      render: (value, record) => {
        return (
          <Space>
            <EditOutlined
              style={{ fontSize: 20 }}
              onClick={() => handleEdit(value, record)}
            />
            <DeleteOutlined
              style={{ fontSize: 20, color: '#FF0000' }}
              onClick={() => handleDelete(record)}
            />
          </Space>
        )
      }
    }
  ]

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <div className="chooseContainer">
      <Title level={3}>{t('home.recipes')}</Title>
      <Table
        columns={recipeColumns}
        dataSource={list}
        onChange={handleChange}
      />
    </div>
  )
}

export default RecipeList
