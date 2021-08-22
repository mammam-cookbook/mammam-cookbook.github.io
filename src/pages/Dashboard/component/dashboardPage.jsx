import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { Card, Col, Row, Spin, Statistic, DatePicker } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import '../dashboard.css'
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import moment from 'moment'

const { RangePicker } = DatePicker

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function DashboardPage() {
  const {
    isLoading,
    recipeList,
    userList,
    canLoadMoreRecipe,
    canLoadMoreUser
  } = useSelector(state => state.Dashboard)
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [statisticData, setStatisticData] = useState({
    from: moment().subtract(6, 'days').format('DD/MM/YYYY'),
    to: moment().format('DD/MM/YYYY'),
    statisticData: [],
    xtype: t('dashboard.day')
  })
  const [fromDate, setFromDate] = useState(
    moment().subtract(6, 'days').format('DD/MM/YYYY')
  )
  const [toDate, setToDate] = useState(moment().format('DD/MM/YYYY'))
  const [selectList, setSelectList] = useState(1)

  const createStatistic = (fromString, toString, listData = []) => {
    const from = moment(fromString, 'DD/MM/YYYY')
    const to = moment(toString, 'DD/MM/YYYY')
    let xtype = t('dashboard.day')
    let statData = []

    let sortedList = listData.filter(item =>
      moment(item.createdAt).isBetween(from, to, 'days', '[]')
    )
    sortedList.sort(
      (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
    )

    if (to.diff(from, 'days') < 29) {
      let prev = from
      while (!prev.isSame(moment(sortedList[0].createdAt), 'date')) {
        statData.push({ name: prev.date().toString(), amount: 0 })
        prev = prev.add(1, 'days')
      }

      let amount = 0
      for (const data of sortedList) {
        if (!prev.isSame(moment(data.createdAt), 'date')) {
          statData.push({
            name: prev.date().toString(),
            amount
          })
          prev = moment(data.createdAt)
          amount = 0
        }
        amount += 1
      }

      if (amount !== 0) {
        statData.push({
          name: prev.date().toString(),
          amount
        })
        prev = prev.add(1, 'days')
      }

      while (prev.diff(to, 'days') < 0) {
        statData.push({ name: prev.date().toString(), amount: 0 })
        prev = prev.add(1, 'days')
      }
    } else if (to.diff(from, 'weeks') < 27) {
      xtype = t('dashboard.week')
      let prev = from
      while (!prev.isSame(moment(sortedList[0].createdAt), 'week')) {
        statData.push({ name: prev.week().toString(), amount: 0 })
        prev = prev.add(1, 'week')
      }

      let amount = 0
      for (const data of sortedList) {
        if (!prev.isSame(moment(data.createdAt), 'week')) {
          statData.push({
            name: prev.week().toString(),
            amount
          })
          prev = moment(data.createdAt)
          amount = 0
        }
        amount += 1
      }

      if (amount !== 0) {
        statData.push({
          name: prev.week().toString(),
          amount
        })
        prev = prev.add(1, 'week')
      }

      while (prev.diff(to, 'weeks') < 0) {
        statData.push({ name: prev.week().toString(), amount: 0 })
        prev = prev.add(1, 'week')
      }
    } else if (to.diff(from, 'months') < 30) {
      xtype = t('dashboard.month')
      let prev = from
      while (!prev.isSame(moment(sortedList[0].createdAt), 'month')) {
        statData.push({ name: `${prev.month() + 1}`, amount: 0 })
        prev = prev.add(1, 'month')
      }

      let amount = 0
      for (const data of sortedList) {
        if (!prev.isSame(moment(data.createdAt), 'month')) {
          statData.push({
            name: `${prev.month() + 1}`,
            amount
          })
          prev = moment(data.createdAt)
          amount = 0
        }
        amount += 1
      }

      if (amount !== 0) {
        statData.push({
          name: `${prev.month() + 1}`,
          amount
        })
        prev = prev.add(1, 'month')
      }

      while (prev.diff(to, 'months') < 0) {
        statData.push({ name: `${prev.month() + 1}`, amount: 0 })
        prev = prev.add(1, 'month')
      }
    } else {
      xtype = t('dashboard.year')
      let prev = from
      while (!prev.isSame(moment(sortedList[0].createdAt), 'year')) {
        statData.push({ name: prev.year().toString(), amount: 0 })
        prev = prev.add(1, 'year')
      }

      let amount = 0
      for (const data of sortedList) {
        if (!prev.isSame(moment(data.createdAt), 'year')) {
          statData.push({
            name: prev.year().toString(),
            amount
          })
          prev = moment(data.createdAt)
          amount = 0
        }
        amount += 1
      }

      if (amount !== 0) {
        statData.push({
          name: prev.year().toString(),
          amount
        })
        prev = prev.add(1, 'year')
      }

      while (prev.diff(to, 'years') < 0) {
        statData.push({ name: prev.year().toString(), amount: 0 })
        prev = prev.add(1, 'year')
      }
    }

    return {
      statisticData: statData,
      xtype,
      from: fromString,
      to: toString
    }
  }

  const handleChangeRange = value => {
    setFromDate(value[0])
    setToDate(value[1])
  }

  useEffect(() => {
    if (selectList === 0) {
      if (!canLoadMoreUser) {
        setStatisticData(createStatistic(fromDate, toDate, userList))
      }
    } else {
      if (!canLoadMoreRecipe) {
        setStatisticData(createStatistic(fromDate, toDate, recipeList))
      }
    }
  }, [fromDate, toDate, canLoadMoreRecipe, canLoadMoreUser, selectList])

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
            <Card
              onClick={() => setSelectList(0)}
              style={selectList === 0 ? { borderColor: COLOR.primary1 } : {}}
            >
              <Statistic
                title={t('dashboard.totalUser')}
                value={userList?.length ?? 0}
                // valueStyle={{ color: '#cf1322' }}
                // suffix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              onClick={() => setSelectList(1)}
              style={selectList === 1 ? { borderColor: COLOR.primary1 } : {}}
            >
              <Statistic
                title={t('dashboard.totalRecipe')}
                value={recipeList?.length ?? 0}
                // valueStyle={{ color: '#3f8600' }}
                // suffix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={32} style={{ paddingTop: 32 }}>
          <Col span={24}>
            <Card>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                  // alignItems: 'center',
                }}
              >
                <RangePicker
                  style={{ marginBottom: 16, width: 300 }}
                  onChange={(value, dateStr) => handleChangeRange(dateStr)}
                  format="DD/MM/YYYY"
                  allowClear={false}
                  value={[
                    moment(statisticData.from, 'DD/MM/YYYY'),
                    moment(statisticData.to, 'DD/MM/YYYY')
                  ]}
                />
                <LineChart
                  width={700}
                  height={400}
                  data={statisticData.statisticData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke={COLOR.primary1}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis height={50} dataKey="name">
                    <Label
                      value={statisticData.xtype}
                      style={{ fontFamily: 'Montserrat', fontSize: 12 }}
                      offset={0}
                      position="insideBottom"
                    />
                  </XAxis>
                  <YAxis
                    label={{
                      value:
                        selectList === 0
                          ? t('dashboard.user')
                          : t('home.recipes'),
                      angle: -90,
                      position: 'insideLeft',
                      fontFamily: 'Montserrat',
                      fontSize: 12
                    }}
                    width={110}
                    tickFormatter={number => {
                      return number
                    }}
                  />
                  <Tooltip
                    formatter={(value, name, props) => {
                      return [
                        value,
                        selectList === 0
                          ? t('dashboard.user')
                          : t('home.recipes')
                      ]
                    }}
                  />
                </LineChart>
              </div>
              {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="boxCloneStyle">
              <span className="titleBox">Tổng doanh thu</span>
              <span className="amountStyle">
                {formatCurrency(statisticData.totalAmount)}
              </span>
            </div>
            <div className="boxCloneStyle">
              <span className="titleBox">Tổng đơn hàng</span>
              <span className="amountStyle">{statisticData.totalTicket}</span>
            </div>
          </div> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DashboardPage
