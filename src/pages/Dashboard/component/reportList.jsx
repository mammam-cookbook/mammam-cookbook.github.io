import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Space, Spin, Table } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import noData from 'assets/images/no_direction_img.svg'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'
import { GetAllProblem, GetAllReport } from '../redux/actions'
import AddProblemModal from './addProblem'
import { getColumnSearchProps } from './searchInput'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function ReportList() {
  const reportList = useSelector(state => state.Dashboard.reportList)
  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const problemList = useSelector(state => state.Dashboard.problemList)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')
  const refInput = useRef()
  const { t } = useTranslation()
  const [edit, setEdit] = useState({ isShow: false, category: null })
  const [filteredInfo, setFilterInfo] = useState(null)

  const PROBLEM_TYPE = problemList?.map(item => {
    return { value: item?.key, text: item?.description }
  })

  useEffect(() => {
    dispatch(GetAllReport.get())
    dispatch(GetAllProblem.get())
  }, [])

  const handleChange = (pagination, filters, sorter) => {
    setFilterInfo(filters)
  }

  const categoryColumns = [
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
      title: t('dashboard.recipe'),
      dataIndex: 'recipe',
      key: 'recipe',
      sorter: (a, b) => a.recipe.title.localeCompare(b.recipe.title),
      render: (value, record) => {
        return (
          <Space>
            {value?.avatar &&
            value?.avatar?.length > 0 &&
            value?.avatar[0] != null ? (
              <Avatar shape="square" size={40} src={value?.avatar[0]} />
            ) : (
              <Avatar shape="square" size={40} src={noData} />
            )}

            <span>{value.title}</span>
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
      title: t('dashboard.reporter'),
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
      title: t('dashboard.problemType'),
      dataIndex: 'reportProblem',
      key: 'reportProblem',
      render: (value, record) => {
        return (
          <Space>
            <Text>
              {value?.map(item => item?.problem?.description)?.join(', ')}
            </Text>
          </Space>
        )
      },
      filters: PROBLEM_TYPE,
      filteredValue: filteredInfo ? filteredInfo.reportProblem : null,
      onFilter: (value, record) =>
        record?.reportProblem?.findIndex(item => item?.problem?.key === value) >
        -1
    },
    {
      ...getColumnSearchProps(
        'note',
        t('dashboard.enterTitleToFind'),
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: t('dashboard.description'),
      dataIndex: 'note',
      key: 'note',
      sorter: (a, b) => a.note.localeCompare(b.note)
    }
    // {
    //   title: t('common.action'),
    //   key: 'action',
    //   render: (value, record) => {
    //     return (
    //       <Space>
    //         <EditOutlined
    //           style={{ fontSize: 20 }}
    //           onClick={() => handleEdit(value, record)}
    //         />
    //         <DeleteOutlined
    //           style={{ fontSize: 20, color: '#FF0000' }}
    //           onClick={() => handleDelete(record)}
    //         />
    //       </Space>
    //     )
    //   }
    // }
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
        <Title level={3}>Báo cáo</Title>
        <Table
          columns={categoryColumns}
          dataSource={reportList}
          onChange={handleChange}
          pagination={{ showSizeChanger: false }}
        />
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

export default ReportList
