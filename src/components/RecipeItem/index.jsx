import { UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Popover } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import Text from 'antd/lib/typography/Text'
import chart from 'assets/images/bar-chart.svg'
import fire from 'assets/images/fire.svg'
import hourglass from 'assets/images/hourglass.svg'
import ButtonBase from 'components/ButtonBase'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMoreVertical } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { calcCalories, COLOR, history, RECIPE_STATUS } from 'ultis/functions'
import '../../App.less'
import './index.css'

export default function RecipeItem({
  recipe,
  style = {},
  showMoreBtn = false,
  popoverList = null
}) {
  const { t } = useTranslation()
  const [isShowPopover, setIsShowPopover] = useState(false)
  const dispatch = useDispatch()

  const LEVEL = {
    easy: t('create.easy'),
    medium: t('create.medium'),
    hard: t('create.hard')
  }

  const onClickMore = () => {
    setIsShowPopover(!isShowPopover)
  }

  const popoverContent = (
    <div style={{ width: 130 }}>
      {popoverList &&
        popoverList?.length > 0 &&
        popoverList?.map(item => (
          <ButtonBase
            key={item?.key}
            onClick={e => {
              setIsShowPopover(false)
              item?.onPress(recipe.id)
            }}
          >
            <Text>{item?.title}</Text>
          </ButtonBase>
        ))}
    </div>
  )
  return (
    <ButtonBase
      style={{ padding: 0, flex: 1, backgroundColor: 'transparent' }}
      onClick={() => history.push(`/recipe/${recipe.id}`)}
    >
      <div
        className="imgWrap"
        style={{
          position: 'relative',
          borderRadius: 10,
          ...style
        }}
      >
        {recipe?.avatar != null &&
        recipe?.avatar.length > 0 &&
        recipe?.avatar[0] ? (
          <div
            className="imgMode"
            style={{
              backgroundImage: `url("${recipe?.avatar[0]}")`
            }}
          />
        ) : (
          <div className="imgDefaultMode" />
        )}
        <div className="bgRecipe">
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: false,
              suffix: ''
            }}
            className="txt"
            style={{ marginBottom: 0, color: 'black' }}
          >
            <Text
              style={{
                flex: 1,
                fontWeight: 600,
                fontSize: 18,
                color: 'black'
              }}
            >
              {recipe?.status === RECIPE_STATUS.PENDING
                ? `[${t('recipe.draft')}] `
                : ''}
              {recipe?.title}
            </Text>
          </Paragraph>

          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {recipe?.author?.avatar_url ? (
              <Avatar size={24} src={recipe?.author?.avatar_url} />
            ) : (
              <Avatar size={24} icon={<UserOutlined />} />
            )}
            <Text
              className="author-name"
              style={{
                fontSize: 16,
                color: COLOR.primary1,
                marginLeft: 8,
                fontWeight: 'bold'
              }}
            >
              {recipe?.author?.name}
            </Text>
          </div>
        </div>

        <div className="detail">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={hourglass} width={20} height={20} alt="" />
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                marginLeft: 4,
                fontWeight: 'bold'
              }}
            >
              {recipe?.cooking_time} {t('create.min')}
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
            <img src={chart} width={20} height={20} alt="" />
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                marginLeft: 4,
                fontWeight: 'bold'
              }}
            >
              {LEVEL[recipe?.level]}
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
            <img src={fire} width={20} height={20} alt="" />
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                marginLeft: 4,
                fontWeight: 'bold'
              }}
            >
              {recipe?.ingredients?.reduce(calcCalories, 0).toFixed(0)} kcal
            </Text>
          </div>
        </div>

        {showMoreBtn && popoverList && (
          <Popover
            content={popoverContent}
            placement="rightBottom"
            trigger="click"
            visible={isShowPopover}
            onVisibleChange={visible => setIsShowPopover(visible)}
          >
            <ButtonBase
              style={{
                position: 'absolute',
                right: 6,
                top: 12,
                backgroundColor: 'transparent'
              }}
              onClick={() => onClickMore()}
            >
              <FiMoreVertical size={24} color={'white'} />
            </ButtonBase>
          </Popover>
        )}
      </div>
    </ButtonBase>
  )
}
