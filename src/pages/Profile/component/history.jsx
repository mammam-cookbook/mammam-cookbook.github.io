import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import { GetHistory } from '../redux/actions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

const HISTORY_TYPE = {
  CHALLENGE: 'Challenge',
  RECIPE: 'Recipe'
}

const calcTotalPoint = (accumulator, currentValue) =>
  accumulator + Number(currentValue?.point)

function HistoryPoint(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { historyList, isLoadingHistory } = useSelector(state => state?.Profile)
  const HISTORY_TITLE = {
    [HISTORY_TYPE.CHALLENGE]: t('profile.joinInChallenge'),
    [HISTORY_TYPE.RECIPE]: t('profile.createRecipe')
  }

  useEffect(() => {
    dispatch(GetHistory.get())
  }, [])

  if (isLoadingHistory) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <div className="chooseContainer">
      <Title level={4}>{t('profile.currentPoint')}</Title>
      <Text style={{ fontSize: 28, fontWeight: 700, color: COLOR.primary1 }}>
        {historyList && historyList?.length > 0
          ? historyList?.reduce(calcTotalPoint, 0)
          : 0}
      </Text>
      <Title level={4}>{t('profile.historyPoint')}</Title>
      {historyList && historyList?.length > 0 ? (
        historyList.map(item => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${COLOR.gray}`,
              paddingTop: 8,
              paddingBottom: 8
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: false,
                  suffix: ''
                }}
                style={{ marginBottom: 0 }}
              >
                <Text>{item?.title}</Text>
              </Paragraph>
              <Text style={{ fontSize: 12, color: COLOR.grayText }}>
                {HISTORY_TITLE[item?.type]}
              </Text>
              <Text style={{ fontSize: 12, color: COLOR.grayText }}>
                {moment(item?.createdAt).format('HH:mm DD/MM/YYYY')}
              </Text>
            </div>
            <Text style={{ fontSize: 18, fontWeight: 700 }}>{item?.point}</Text>
          </div>
        ))
      ) : (
        <Text>{t('profile.noHistory')}</Text>
      )}
    </div>
  )
}

export default HistoryPoint
