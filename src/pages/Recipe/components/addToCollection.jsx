import { Button, Modal, Typography } from 'antd'
import ButtonBase from 'components/ButtonBase'
import CInput from 'components/CInput'
import {
  AddRecipeToCollection,
  CreateCollection,
  GetCollections
} from 'pages/Profile/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, NAME_REGEX } from 'ultis/functions'
import i18n from 'ultis/i18n'

const { Text, Title } = Typography

export default function ModalAddCollection({
  recipeId,
  isShow,
  closeModal = () => {}
}) {
  const [isAddNewCollection, setIsAddNewCollection] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const [selected, setSelected] = useState(0)
  const collections = useSelector(state => state.Profile.collections)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const validateName =
    collectionName.length > 0 && NAME_REGEX.test(collectionName)

  useEffect(() => {
    dispatch(GetCollections.get())
  }, [])

  const handleKeyPress = event => {
    if (event.key === 'Enter' && validateName) {
      createNewCollection()
    }
  }

  const createNewCollection = () => {
    setIsAddNewCollection(false)
    dispatch(CreateCollection.get({ name: collectionName }))
  }

  const handleOk = () => {
    dispatch(
      AddRecipeToCollection.get({
        recipeId,
        collectionId: collections[selected].id
      })
    )
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <Modal
      title={t('recipe.addToCollection')}
      visible={isShow}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        isAddNewCollection
          ? [
              <Button
                key="cancelButton"
                onClick={() => setIsAddNewCollection(false)}
                size="large"
              >
                {i18n.t('common.cancel')}
              </Button>,
              <Button
                disabled={!validateName}
                key="okButton"
                size="large"
                type="primary"
                onClick={() => createNewCollection()}
              >
                {t('common.create')}
              </Button>
            ]
          : [
              <Button key="cancelButton" onClick={handleCancel} size="large">
                {i18n.t('common.cancel')}
              </Button>,
              <Button
                disabled={selected < 0 || selected >= collections.length}
                key="okButton"
                size="large"
                type="primary"
                onClick={() => handleOk()}
              >
                {t('common.add')}
              </Button>
            ]
      }
    >
      {collections && collections.length > 0 ? (
        <div>
          {collections.map((item, index) => (
            <ButtonBase
              style={{
                height: 48,
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onClick={() => setSelected(index)}
            >
              <Text style={{ fontWeight: 500, fontSize: 14 }}>{item.name}</Text>
              {index === selected ? (
                <IoMdRadioButtonOn size={20} color={COLOR.primary1} />
              ) : (
                <IoMdRadioButtonOff size={20} color={COLOR.primary1} />
              )}
            </ButtonBase>
          ))}
        </div>
      ) : (
        <Text style={{ fontWeight: 500, fontSize: 14 }}>
          {t('recipe.noCollection')}
        </Text>
      )}
      <div
        style={{
          height: 0.1,
          backgroundColor: COLOR.gray,
          marginTop: 16,
          marginBottom: 16
        }}
      />
      {isAddNewCollection ? (
        <CInput
          onKeyPress={event => handleKeyPress(event)}
          onChange={event => setCollectionName(event.target.value)}
          placeholder={t('recipe.collectionNamePlaceholder')}
          error={!validateName && t('recipe.collectionNameError')}
        />
      ) : (
        <ButtonBase
          style={{ height: 48, alignItems: 'center' }}
          onClick={() => setIsAddNewCollection(true)}
        >
          <Text style={{ fontWeight: 500, fontSize: 14 }}>
            {t('recipe.addNewCollection')}
          </Text>
        </ButtonBase>
      )}
    </Modal>
  )
}
