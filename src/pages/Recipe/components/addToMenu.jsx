import { Button, Col, DatePicker, Modal, Row, Select, Typography } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import i18n from 'ultis/i18n'
import { AddToMenu } from '../redux/actions'

const { Text } = Typography
const { Option } = Select

export default function ModalAddMenu({
  recipeId,
  isShow,
  closeModal = () => {}
}) {
  const [session, setSession] = useState('morning')
  const [date, setDate] = useState(moment().add(1, 'days').format())
  const dispatch = useDispatch()
  const handleOk = () => {
    dispatch(
      AddToMenu.get({
        recipe_id: recipeId,
        date,
        session
      })
    )
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  function disabledDate(current) {
    return current && current < moment().endOf('day')
  }

  return (
    <Modal
      title={i18n.t('recipe.addToMenu')}
      visible={isShow}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancelButton" onClick={handleCancel} size="large">
          {i18n.t('common.cancel')}
        </Button>,
        <Button key="okButton" size="large" type="primary" onClick={handleOk}>
          {i18n.t('common.add')}
        </Button>
      ]}
    >
      <Row align="middle" gutter={16}>
        <Col className="gutter-row" span={6}>
          <Text>{i18n.t('recipe.chooseDate')}</Text>
        </Col>
        <Col className="gutter-row" span={18}>
          <DatePicker
            style={{ width: '100%' }}
            value={moment(date)}
            disabledDate={disabledDate}
            onChange={value => setDate(value.format())}
          />
        </Col>
      </Row>
      <Row align="middle" gutter={16} style={{ marginTop: 16 }}>
        <Col className="gutter-row" span={6}>
          <Text>{i18n.t('recipe.chooseSession')}</Text>
        </Col>
        <Col className="gutter-row" span={18}>
          <Select
            value={session}
            style={{ width: '100%' }}
            onChange={value => setSession(value)}
          >
            <Option value="morning">{i18n.t('recipe.morning')}</Option>
            <Option value="noon">{i18n.t('recipe.lunch')}</Option>
            <Option value="night">{i18n.t('recipe.dinner')}</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  )
}
