import { Modal, Typography, Button, Row, Col, Select, DatePicker } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MODAL_TYPE } from 'ultis/functions'
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
      title={'Thêm vào thực đơn'}
      visible={isShow}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancelButton" onClick={handleCancel} size="large">
          {i18n.t('common.cancel')}
        </Button>,
        <Button key="okButton" size="large" type="primary" onClick={handleOk}>
          Thêm
        </Button>
      ]}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Text>Chọn ngày</Text>
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
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col className="gutter-row" span={6}>
          <Text>Chọn buổi</Text>
        </Col>
        <Col className="gutter-row" span={18}>
          <Select
            value={session}
            style={{ width: '100%' }}
            onChange={value => setSession(value)}
          >
            <Option value="morning">Bữa sáng</Option>
            <Option value="noon">Bữa trưa</Option>
            <Option value="night">Bữa tối</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  )
}
