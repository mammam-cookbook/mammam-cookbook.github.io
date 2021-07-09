import Paragraph from 'antd/lib/typography/Paragraph'
import Text from 'antd/lib/typography/Text'
import ButtonBase from 'components/ButtonBase'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

export default function DirectionList({
  directions,
  onClickItem = step => {}
}) {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { t } = useTranslation()
  return (
    <div
      style={{
        width: isDesktopOrLaptop ? 300 : '70vw',
        maxHeight: 600,
        borderRadius: 10,
        backgroundColor: 'white',
        overflowY: 'auto'
      }}
    >
      {directions && directions?.length > 0
        ? directions?.map((item, index) => (
            <ButtonBase
              style={{ alignItems: 'center' }}
              onClick={() => {
                onClickItem(index + 1)
              }}
            >
              <Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: false,
                  suffix: ''
                }}
              >
                <Text style={{ fontWeight: 700 }}>
                  {t('create.step')} {index + 1}.
                </Text>{' '}
                {item?.content}
              </Paragraph>
            </ButtonBase>
          ))
        : null}
    </div>
  )
}
