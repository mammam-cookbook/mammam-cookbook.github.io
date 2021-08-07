import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined } from '@ant-design/icons'
import { Card, Col, Row, Spin, Statistic } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'
import { GetAllCategories } from '../redux/actions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function DashboardPage() {

  const isLoading = useSelector(state => state.Dashboard.isLoading)
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(GetAllCategories.get())
  }, [])

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
        <Title level={3}>Xin chào {user?.name}. Chào mừng bạn trở lại!</Title>
        <Row gutter={32} style={{ paddingTop: 32 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng lượt xem"
                value={112893}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng người dùng"
                value={2}
                valueStyle={{ color: '#cf1322' }}
                suffix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng bài viết"
                value={300}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DashboardPage
