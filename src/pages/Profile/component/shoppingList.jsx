import { LoadingOutlined } from '@ant-design/icons'
import { Avatar, Collapse, Spin } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { capitalizeFirstLetter, COLOR } from 'ultis/functions'
import { GetShoppingList } from '../redux/actions'

const { Panel } = Collapse

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function ShoppingListProfile(props) {
  const { isLoadingShopping, shoppingList } = useSelector(
    state => state.Profile
  )
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(GetShoppingList.get())
  }, [])

  if (isLoadingShopping) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <div className="chooseContainer">
      <Title level={4}>{t('profile.shoppingList')}</Title>
      {shoppingList && shoppingList?.length > 0 ? (
        <Collapse defaultActiveKey={[]} ghost style={{ marginTop: 2 }}>
          {shoppingList.map(item => (
            <Panel
              header={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    shape="square"
                    size={56}
                    src={item?.recipe?.avatar?.[0]}
                  />
                  <Text style={{ marginLeft: 8, fontSize: 16 }}>
                    {item?.recipe?.title}
                  </Text>
                </div>
              }
              key={item?.id}
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                marginBottom: 8,
                borderRadius: 10
              }}
            >
              {item?.recipe?.ingredients &&
              item?.recipe?.ingredients?.length > 0
                ? item?.recipe?.ingredients?.map((ingre, index) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', width: 56, height: 56 }}>
                        <div className="imgSquare">
                          {ingre.img ? (
                            <span
                              className="imgSrc"
                              style={{
                                backgroundImage: `url("${ingre.img}")`,
                                borderRadius: 10
                              }}
                            />
                          ) : (
                            <span
                              className="imgSrcDefault"
                              style={{ borderRadius: 10 }}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 3,
                          marginLeft: 8
                        }}
                      >
                        <Paragraph
                          ellipsis={{
                            rows: 2,
                            expandable: false,
                            suffix: ''
                          }}
                          style={{ marginBottom: 0 }}
                        >
                          <Text style={styles.nameTxt}>
                            {capitalizeFirstLetter(ingre.name)}
                          </Text>
                        </Paragraph>

                        <Text style={styles.amountTxt}>
                          {ingre.amount} {ingre?.unit?.measurement_description}
                        </Text>
                        <Text style={styles.calTxt}>
                          {ingre?.calories} kcal
                        </Text>
                      </div>
                    </div>
                  ))
                : null}
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Text>{t('profile.noShoppingList')}</Text>
      )}
    </div>
  )
}

export default ShoppingListProfile

const styles = {
  calTxt: {
    fontWeight: 600,
    fontSize: 14,
    color: COLOR.grayText,
    marginBottom: 8
  },
  amountTxt: {
    fontWeight: 600,
    fontSize: 14,
    color: COLOR.grayText
  },
  nameTxt: {
    fontWeight: 600,
    fontSize: 14
  }
}
