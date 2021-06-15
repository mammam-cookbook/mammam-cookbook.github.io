import { LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Menu, Row } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import ButtonBase from 'components/ButtonBase'
import GlobalModal from 'components/GlobalModal'
import RecipeItem from 'components/RecipeItem'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiEdit, FiPlus, FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, MODAL_TYPE } from 'ultis/functions'
import {
  DeleteCollection,
  DeleteRecipeInCollection,
  GetCollectionDetail,
  GetCollections
} from '../redux/actions'
import ModalAddNewCollection from './addCollectionModal'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function CollectionListProfile() {
  const { collections, collectionDetail } = useSelector(state => state.Profile)
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [chosenIndex, setChosenIndex] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [isShowEdit, setIsShowEdit] = useState(false)

  useEffect(() => {
    if (user) {
      dispatch(GetCollections.get())
    }
  }, [])

  useEffect(() => {
    if (collections && collections?.length > 0) {
      dispatch(GetCollectionDetail.get(collections[chosenIndex]?.id))
    }
  }, [chosenIndex, collections])

  return (
    <>
      <div className="chooseContainer" style={{ paddingTop: 0 }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ display: 'flex', flex: 2.5, flexDirection: 'column' }}>
            {collections && collections?.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Title level={4}>{collectionDetail?.name}</Title>
                <Button
                  onClick={() => setIsShowEdit(true)}
                  shape="circle"
                  type="text"
                  style={{ marginTop: -16 }}
                  icon={<FiEdit size={24} color={COLOR.primary1} />}
                />
              </div>
            ) : (
              <Title level={4}>{t('profile.noCollections')}</Title>
            )}
            {collectionDetail?.recipes &&
            collectionDetail?.recipes?.length > 0 ? (
              <Row gutter={[16, 24]} style={{ marginTop: 16 }}>
                {collectionDetail?.recipes?.map(item => (
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} >
                    <RecipeItem
                      recipe={item?.recipe}
                      showMoreBtn={true}
                      popoverList={[
                        {
                          key: 'delete_from_collection',
                          title: t('profile.deleteRecipeInCollection'),
                          onPress: recipeId => {
                            GlobalModal.alertMessage(
                              t('common.confirm'),
                              t('profile.confirmToDeleteRecipeInCollection'),
                              MODAL_TYPE.CHOICE,
                              () => {
                                dispatch(
                                  DeleteRecipeInCollection.get({
                                    collectionId: collectionDetail?.id,
                                    recipeId
                                  })
                                )
                              }
                            )
                          }
                        }
                      ]}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Text>{t('profile.noRecipeInCollection')}</Text>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              backgroundColor: '#EEE',
              borderRadius: 10,
              marginLeft: 'calc(28px + 1vmin)',
              padding: 8
            }}
          >
            <Title style={{ marginLeft: 8, marginTop: 16 }} level={5}>
              {t('profile.collection')}
            </Title>
            {collections.map((item, index) => (
              <ButtonBase
                style={{
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: index === chosenIndex ? COLOR.primary3 : null
                }}
                onClick={() => setChosenIndex(index)}
              >
                <Text style={{ fontWeight: 500, fontSize: 14 }}>
                  {item.name}
                </Text>
                <Button
                  onClick={() =>
                    GlobalModal.alertMessage(
                      t('common.confirm'),
                      t('profile.confirmToDeleteCollection'),
                      MODAL_TYPE.CHOICE,
                      () => {
                        setChosenIndex(0)
                        dispatch(DeleteCollection.get(item.id))
                      }
                    )
                  }
                  shape="circle"
                  type="text"
                  icon={<FiX size={16} color={COLOR.mainBlack} />}
                />
              </ButtonBase>
            ))}
            <Button
              onClick={() => setIsShow(true)}
              style={{ marginTop: 24 }}
              type="primary"
              icon={
                <FiPlus size={18} color="white" style={{ marginRight: 8 }} />
              }
            >
              {t('recipe.addNewCollection')}
            </Button>
          </div>
        </div>
      </div>
      <ModalAddNewCollection
        isShow={isShow}
        closeModal={() => setIsShow(false)}
      />
      <ModalAddNewCollection
        title={collectionDetail?.name}
        id={collectionDetail?.id}
        isShow={isShowEdit}
        closeModal={() => setIsShowEdit(false)}
      />
    </>
  )
}

export default CollectionListProfile
