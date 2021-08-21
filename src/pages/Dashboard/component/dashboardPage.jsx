import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { Card, Col, Row, Spin, Statistic } from 'antd'
import Title from 'antd/lib/typography/Title'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function DashboardPage() {
  const { isLoading, recipeList, userList } = useSelector(
    state => state.Dashboard
  )
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
        <Title level={3}>
          {t('dashboard.hi')} {user?.name}. {t('dashboard.welcomeBack')}
        </Title>
        <Row gutter={32} style={{ paddingTop: 32 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title={t('dashboard.totalView')}
                value={112893}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title={t('dashboard.totalUser')}
                value={userList?.length ?? 0}
                valueStyle={{ color: '#cf1322' }}
                suffix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title={t('dashboard.totalRecipe')}
                value={recipeList?.length ?? 0}
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
