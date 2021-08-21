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
import { DeleteProblem, GetAllProblem } from '../redux/actions'
import AddProblemModal from './addProblem'
import { getColumnSearchProps } from './searchInput'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function ProblemList() {
  const problemList = useSelector(state => state.Dashboard.problemList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const { t } = useTranslation()
  const [edit, setEdit] = useState({ isShow: false, category: null })

  useEffect(() => {
    dispatch(GetAllProblem.get())
  }, [])

  const onAddNewProblem = () => {
    setEdit({ isShow: true, category: null })
  }

  const handleEdit = (value, record) => {
    setEdit({ isShow: true, category: record })
  }

  const handleDelete = record => {
    Modal.confirm({
      title: t('common.confirm'),
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: t('common.confirmToDeleteProblem'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        dispatch(DeleteProblem.get(record.id))
        Modal.destroyAll()
      }
    })
  }

  const categoryColumns = [
    {
      ...getColumnSearchProps(
        'key',
        t('dashboard.enterTitleToFind'),
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: t('dashboard.problemCode'),
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key.localeCompare(b.key)
    },
    {
      ...getColumnSearchProps(
        'description',
        t('dashboard.enterTitleToFind'),
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: t('dashboard.description'),
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
      title: t('common.action'),
      key: 'action',
      render: (value, record) => {
        return (
          <Space>
            {/* <EditOutlined
              style={{ fontSize: 20 }}
              onClick={() => handleEdit(value, record)}
            /> */}
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
        <Title level={3}>{t('dashboard.problem')}</Title>
        <Row style={{ marginBottom: 32 }} justify={'space-between'}>
          <Col flex={5} />
          <Col flex={1}>
            <Row justify={'end'}>
              <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined />}
                size={'large'}
                onClick={() => onAddNewProblem()}
              >
                {t('dashboard.addNewProblem')}
              </Button>
            </Row>
          </Col>
        </Row>
        <Table columns={categoryColumns} dataSource={problemList} />
      </div>
      <AddProblemModal
        visible={edit.isShow}
        onClose={() => {
          setEdit({ isShow: false, category: null })
        }}
        problem={edit.category}
      />
    </>
  )
}

export default ProblemList
