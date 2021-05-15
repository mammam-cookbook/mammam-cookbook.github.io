import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Avatar, Modal, Space, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, ROLES } from 'ultis/functions'
import '../dashboard.css'
import { DeleteCourse } from '../redux/actions'
import { getColumnSearchProps } from './searchInput'

function CoursesTab({ courseList, role }) {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = record => {
    Modal.confirm({
      title: 'Confirm',
      icon: <DeleteOutlined style={{ color: COLOR.primary1 }} />,
      content: `Do you confirm to delete ${record.name}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary1 } },
      onOk: () => {
        dispatch(DeleteCourse.get(record.id))
        Modal.destroyAll()
      }
    })
  }

  const handleView = record => {
    history.push(`/course/${record.id}`)
  }

  const handleEdit = record => {
    history.push(`/course/${record.id}/edit`)
  }

  const courseColumns = [
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
      title: 'Course',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (value, record) => {
        return (
          <Space>
            <Avatar shape="square" size={56} src={record?.thumbnail} />
            <span>{value}</span>
          </Space>
        )
      }
    },
    {
      ...getColumnSearchProps(
        'category',
        'Enter category to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    role === ROLES.TEACHER
      ? {
          title: 'Total enrollment',
          dataIndex: 'totalEnroll',
          key: 'totalEnroll',
          sorter: (a, b) => Number(a.totalEnroll) > Number(b.totalEnroll)
        }
      : {
          title: 'Status',
          dataIndex: 'currentChapter',
          key: 'currentChapter',
          sorter: (a, b) => a.currentChapter > b.currentChapter,
          render: (value, record) => {
            return (
              <span style={{ color: 'green' }}>{`${
                record.currentChapter ? record.currentChapter : 0
              }/${record.numberOfChapter}`}</span>
            )
          }
        },
    role === ROLES.TEACHER
      ? {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
          sorter: (a, b) => a.rating > b.rating
        }
      : {
          ...getColumnSearchProps(
            'teacher',
            'Enter teacher name to find',
            searchText,
            setSearchText,
            searchedColumn,
            setSearchColumn,
            refInput
          ),
          title: 'Teacher',
          dataIndex: 'teacher',
          key: 'teacher',
          sorter: (a, b) => a.teacher.localeCompare(b.teacher)
        },
    {
      title: role === ROLES.TEACHER ? 'Updated date' : 'Enroll date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) => moment(a.updatedAt).isBefore(moment(b.updatedAt)),
      render: (value, record) => {
        return <span>{moment(value).format('DD/MM/YYYY')}</span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => {
        return (
          <Space>
            <EyeOutlined
              style={{ fontSize: 20 }}
              onClick={() => handleView(record)}
            />
            {role === ROLES.TEACHER && (
              <EditOutlined
                style={{ fontSize: 20, color: COLOR.primary1 }}
                onClick={() => handleEdit(record)}
              />
            )}
            {role === ROLES.TEACHER && (
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

  return <Table columns={courseColumns} dataSource={courseList} />
}

export default CoursesTab
