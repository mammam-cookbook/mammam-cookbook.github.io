import { Modal, Typography, Button } from 'antd'
import React from 'react'
import { MODAL_TYPE } from 'ultis/functions'
import i18n from 'ultis/i18n'

const { Text } = Typography

export default class GlobalModal extends React.Component {
  static instance = null

  constructor(props) {
    super(props)
    GlobalModal.instance = this
    this.state = {
      isShow: false,
      title: '',
      content: '',
      type: MODAL_TYPE.NORMAL,
      onPress: () => {}
    }
  }

  static alertMessage = (
    iTitle = i18n.t('common.information'),
    iContent = i18n.t('common.error_message'),
    iType = MODAL_TYPE.NORMAL,
    onPress = () => {}
  ) => {
    GlobalModal.instance.setState({
      isShow: true,
      title: iTitle,
      content: iContent,
      type: iType,
      onPress
    })
  }

  closeModal = () => {
    GlobalModal.instance.setState({ isShow: false })
  }

  handleOk = () => {
    GlobalModal.instance.state.onPress()
    GlobalModal.instance.closeModal()
  }

  handleCancel = () => {
    GlobalModal.instance.closeModal()
  }

  render() {
    return (
      <Modal
        title={GlobalModal.instance.state.title}
        visible={GlobalModal.instance.state.isShow}
        centered
        onOk={GlobalModal.instance.handleOk}
        onCancel={GlobalModal.instance.handleCancel}
        footer={
          GlobalModal.instance.state.type === MODAL_TYPE.NORMAL
            ? [
                <Button
                  key="okButton"
                  type="primary"
                  onClick={GlobalModal.instance.handleOk}
                  size="large"
                >
                  {i18n.t('common.ok')}
                </Button>
              ]
            : [
                <Button
                  key="cancelButton"
                  onClick={GlobalModal.instance.handleCancel}
                  size="large"
                >
                  {i18n.t('common.cancel')}
                </Button>,
                <Button
                  key="okButton"
                  size="large"
                  type="primary"
                  onClick={GlobalModal.instance.handleOk}
                >
                  {i18n.t('common.ok')}
                </Button>
              ]
        }
      >
        <Text>{GlobalModal.instance.state.content}</Text>
      </Modal>
    )
  }
}
