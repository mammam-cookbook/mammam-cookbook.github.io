import { EyeOutlined, LoadingOutlined } from '@ant-design/icons'
import { Space, Spin, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, ROLES } from 'ultis/functions'
import { ACCOUNT_STATUS, PAGE } from '../constant'
import '../dashboard.css'
import { GetUserProfile, GetUsers, SetCurrentPage } from '../redux/actions'
import { getColumnSearchProps } from './searchInput'
import { Tabs } from 'antd'
import ProfileTab from './profileTab'
import CoursesTab from './coursesTab'

const { TabPane } = Tabs

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function StudentList() {
  const userList = useSelector(state => state.Dashboard.userList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const detailPage = useSelector(state => state.Dashboard.detailPage)
  const userDetail = useSelector(state => state.Dashboard.userDetail)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const [filteredInfo, setFilterInfo] = useState(null)

  useEffect(() => {
    dispatch(GetUsers.get({ role: `${ROLES.STUDENT},${ROLES.NOT_VERIFIED}` }))
  }, [])

  const handleView = record => {
    dispatch(GetUserProfile.get(record.id))
    dispatch(
      SetCurrentPage.get({
        currentPage: PAGE.STUDENT,
        detailPage: PAGE.PROFILE
      })
    )
  }

  const handleChange = (pagination, filters, sorter) => {
    setFilterInfo(filters)
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
      title: 'Status',
      dataIndex: 'role',
      render: (value, record, index) => {
        switch (value) {
          case ROLES.STUDENT:
            return <span style={{ color: 'green' }}>{'Verified'}</span>
          case ROLES.NOT_VERIFIED:
            return <span style={{ color: 'red' }}>{'Not verified'}</span>
          default:
            return <span />
        }
      },
      filters: ACCOUNT_STATUS,
      filteredValue: filteredInfo ? filteredInfo.name : null,
      onFilter: (value, record) => record.role === value
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
            <CoursesTab
              courseList={userDetail.enrollment}
              role={ROLES.STUDENT}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="chooseContainer">
      <span className="titleTopic">Students</span>
      <Table
        columns={userColumns}
        dataSource={userList}
        onChange={handleChange}
      />
    </div>
  )
}

export default StudentList
