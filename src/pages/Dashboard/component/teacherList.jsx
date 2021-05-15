import {
  EyeOutlined,
  LoadingOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { Button, Space, Spin, Table, Tabs } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, ROLES } from 'ultis/functions'
import { PAGE } from '../constant'
import '../dashboard.css'
import { GetUserProfile, GetUsers, SetCurrentPage } from '../redux/actions'
import AddTeacherModal from './addTeacher'
import CoursesTab from './coursesTab'
import ProfileTab from './profileTab'
import { getColumnSearchProps } from './searchInput'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function TeacherList() {
  const userList = useSelector(state => state.Dashboard.userList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const detailPage = useSelector(state => state.Dashboard.detailPage)
  const userDetail = useSelector(state => state.Dashboard.userDetail)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()

  const [edit, setEdit] = useState(false)

  useEffect(() => {
    dispatch(GetUsers.get({ role: ROLES.TEACHER }))
  }, [])

  const onAddNewTeacher = () => {
    setEdit(true)
  }

  const handleView = record => {
    dispatch(GetUserProfile.get(record.id))
    dispatch(
      SetCurrentPage.get({
        currentPage: PAGE.TEACHER,
        detailPage: PAGE.PROFILE
      })
    )
  }

  const userColumns = [
    {
      ...getColumnSearchProps(
        'id',
        'Enter id to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      ...getColumnSearchProps(
        'fullName',
        'Enter name to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
      ...getColumnSearchProps(
        'email',
        'Enter email to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      ...getColumnSearchProps(
        'phoneNumber',
        'Enter email to find',
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber)
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

  if (detailPage === PAGE.PROFILE) {
    return (
      <div className="chooseContainer">
        <span className="titleTopic" style={{ alignSelf: 'center' }}>
          Profile
        </span>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Information" key="1">
            <ProfileTab user={userDetail} />
          </TabPane>
          <TabPane tab="All courses" key="2">
            <CoursesTab courseList={userDetail.courses} role={ROLES.TEACHER} />
          </TabPane>
        </Tabs>
      </div>
    )
  }

  return (
    <>
      <div className="chooseContainer">
        <span className="titleTopic">Teachers</span>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          style={{ width: 200, marginBottom: 32 }}
          onClick={() => onAddNewTeacher()}
          size="large"
        >
          Add new teacher
        </Button>
        <Table columns={userColumns} dataSource={userList} />
      </div>
      <AddTeacherModal
        visible={edit}
        onClose={() => {
          setEdit(false)
        }}
      />
    </>
  )
}

export default TeacherList
