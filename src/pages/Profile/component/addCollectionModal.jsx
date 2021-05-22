import { Button, Modal } from 'antd'
import CInput from 'components/CInput'
import { CreateCollection, UpdateCollection } from 'pages/Profile/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { NAME_REGEX } from 'ultis/functions'
import i18n from 'ultis/i18n'

export default function ModalAddNewCollection({
  title = null,
  id = null,
  isShow,
  closeModal = () => {}
}) {
  const [collectionName, setCollectionName] = useState(title ? title : '')
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const validateName =
    collectionName.length > 0 && NAME_REGEX.test(collectionName)

  useEffect(() => {
    if (title) {
      setCollectionName(title)
    }
  }, [title])

  const handleKeyPress = event => {
    if (event.key === 'Enter' && validateName) {
      createNewCollection()
    }
  }

  const createNewCollection = () => {
    if (title) {
      dispatch(UpdateCollection.get({ name: collectionName, collectionId: id }))
    } else {
      dispatch(CreateCollection.get({ name: collectionName }))
    }
    setCollectionName('')
    closeModal()
  }

  const handleOk = () => {
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <Modal
      title={
        title ? t('profile.changeCollectionName') : t('recipe.addNewCollection')
      }
      visible={isShow}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancelButton" onClick={() => handleCancel()} size="large">
          {i18n.t('common.cancel')}
        </Button>,
        <Button
          disabled={!validateName}
          key="okButton"
          size="large"
          type="primary"
          onClick={() => createNewCollection()}
        >
          {title ? t('profile.changeName') : t('common.create')}
        </Button>
      ]}
    >
      <CInput
        value={collectionName}
        onKeyPress={event => handleKeyPress(event)}
        onChange={event => setCollectionName(event.target.value)}
        placeholder={
          title
            ? t('profile.changeCollectionNamePlaceholder')
            : t('recipe.collectionNamePlaceholder')
        }
        error={!validateName && t('recipe.collectionNameError')}
      />
    </Modal>
  )
}
