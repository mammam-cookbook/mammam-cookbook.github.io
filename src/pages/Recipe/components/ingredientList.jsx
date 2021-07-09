import Paragraph from 'antd/lib/typography/Paragraph'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { capitalizeFirstLetter, COLOR } from 'ultis/functions'

export default function IngredientList({ ingredients }) {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { t } = useTranslation()
  return (
    <div
      style={{
        width: isDesktopOrLaptop ? 240 : '70vw',
        maxHeight: 600,
        borderRadius: 10,
        backgroundColor: 'white',
        overflowY: 'auto'
      }}
    >
      {ingredients && ingredients?.length > 0
        ? ingredients?.map((item, index) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flex: 1 }}>
                <div className="imgSquare">
                  {item.img ? (
                    <span
                      className="imgSrc"
                      style={{
                        backgroundImage: `url("${item.img}")`,
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
                    {capitalizeFirstLetter(item.name)}
                  </Text>
                </Paragraph>

                <Text style={styles.amountTxt}>
                  {item.amount} {item?.unit?.measurement_description}
                </Text>
                <Text style={styles.calTxt}>{item?.calories} kcal</Text>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}

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
