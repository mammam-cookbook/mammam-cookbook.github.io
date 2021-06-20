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
      <div className="chooseContainer">
        <div style={{ display: 'flex', height: '100%' }}>
          <Row justify="space-between" style={{ display: 'flex', flex: 1 }}>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
              <div
                style={{ display: 'flex', flex: 2.5, flexDirection: 'column' }}
              >
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
                  <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                    {collectionDetail?.recipes?.map(item => (
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
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
                                  t(
                                    'profile.confirmToDeleteRecipeInCollection'
                                  ),
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
            </Col>

            <Col
              xs={24}
              sm={24}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              style={{
                flexDirection: 'column',
                backgroundColor: '#EEE',
                borderRadius: 10,
                padding: 8,
                width: '100%',
                height: 'auto'
              }}
            >
              <Row justify="center">
                <Col>
                  <Title style={{ marginLeft: 8, marginTop: 16 }} level={5}>
                    {t('profile.collection')}
                  </Title>
                  <Col>
                    {collections.map((item, index) => (
                      <ButtonBase
                        style={{
                          alignItems: 'center',
                          backgroundColor:
                            index === chosenIndex ? COLOR.primary3 : null,
                          width: '100%',
                          display: 'flex',
                          flex: 1,
                          whiteSpace: 'normal'
                        }}
                        onClick={() => setChosenIndex(index)}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <Text style={{ fontWeight: 500, fontSize: 14 }}>
                              {item.name}
                            </Text>
                          </div>
                          <div>
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
                          </div>
                        </div>
                      </ButtonBase>
                    ))}
                  </Col>
                  <Button
                    onClick={() => setIsShow(true)}
                    style={{
                      marginTop: 24,
                      width: '100%',
                      whiteSpace: 'normal',
                      height: 'auto',
                      marginBottom: '10px'
                    }}
                    type="primary"
                  >
                    {t('recipe.addNewCollection')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
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
