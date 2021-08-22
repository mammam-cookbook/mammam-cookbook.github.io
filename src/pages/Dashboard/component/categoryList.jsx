import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { Button, Col, Modal, Row, Space, Spin, Table } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'
import { DeleteCategory, GetAllCategories } from '../redux/actions'
import AddCategoryModal from './addCategory'
import { getColumnSearchProps } from './searchInput'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function CategoryList() {
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const { t } = useTranslation()
  let realList = []
  categoryList?.forEach(item => {
    realList.push({
      vi: item.vi,
      en: item.en,
      parentVi: null,
      parentEn: null,
      id: item.id,
      parentId: item.parent_category_id
    })
    item?.childrenCategories &&
      item?.childrenCategories.length > 0 &&
      item?.childrenCategories.forEach(subCat => {
        realList.push({
          vi: subCat.vi,
          en: subCat.en,
          parentVi: item.vi,
          parentEn: item.en,
          id: subCat.id,
          parentId: subCat.parent_category_id
        })
      })
  })
  const [edit, setEdit] = useState({ isShow: false, category: null })

  useEffect(() => {
    dispatch(GetAllCategories.get())
  }, [])

  const onAddNewCategory = () => {
    setEdit({ isShow: true, category: null })
  }

  const handleEdit = (value, record) => {
    setEdit({ isShow: true, category: record })
  }

  const handleDelete = record => {
    Modal.confirm({
      title: t('common.confirm'),
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: t('dashboard.confirmToDeleteCategory'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        dispatch(DeleteCategory.get(record.id))
        Modal.destroyAll()
      }
    })
  }

  const categoryColumns = [
    {
      ...getColumnSearchProps(
        'vi',
        t('dashboard.enterTitleToFind'),
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: t('common.vi'),
      dataIndex: 'vi',
      key: 'vi',
      sorter: (a, b) => a.vi.localeCompare(b.vi)
    },
    {
      ...getColumnSearchProps(
        'en',
        t('dashboard.enterTitleToFind'),
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: t('common.en'),
      dataIndex: 'en',
      key: 'en',
      sorter: (a, b) => a.en.localeCompare(b.en)
    },
    {
      ...getColumnSearchProps(
        'parentVi',
        t('dashboard.enterTitleToFind'),
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: t('dashboard.parentCategoryVi'),
      dataIndex: 'parentVi',
      key: 'parentVi',
      sorter: (a, b) =>
        a.parentVi && b.parentVi ? a.parentVi.localeCompare(b.parentVi) : -1
    },
    {
      ...getColumnSearchProps(
        'parentEn',
        t('dashboard.enterTitleToFind'),
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: t('dashboard.parentCategoryEn'),
      dataIndex: 'parentEn',
      key: 'parentEn',
      sorter: (a, b) =>
        a.parentEn && b.parentEn ? a.parentEn.localeCompare(b.parentEn) : -1
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
    <>
      <div className="chooseContainer">
        <Title level={3}>{t('create.categories')}</Title>
        <Row style={{ marginBottom: 32 }} justify={'space-between'}>
          <Col flex={5} />
          <Col flex={1}>
            <Row justify={'end'}>
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                size={'large'}
                onClick={() => onAddNewCategory()}
              >
                {t('dashboard.addNewCategory')}
              </Button>
            </Row>
          </Col>
        </Row>
        <Table columns={categoryColumns} dataSource={realList} />
      </div>
      <AddCategoryModal
        visible={edit.isShow}
        onClose={() => {
          setEdit({ isShow: false, category: null })
        }}
        category={edit.category}
      />
    </>
  )
}

export default CategoryList
