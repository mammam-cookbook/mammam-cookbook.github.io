import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Menu, Popover } from 'antd'
import Text from 'antd/lib/typography/Text'
import chart from 'assets/images/bar-chart.svg'
import fire from 'assets/images/fire.svg'
import hourglass from 'assets/images/hourglass.svg'
import ButtonBase from 'components/ButtonBase'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { calcCalories, history } from 'ultis/functions'
import './index.css'

export default function RecipeItem({
  recipe,
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
    <Menu style={{ width: 200 }}>
      {popoverList &&
        popoverList?.length > 0 &&
        popoverList?.map(item => (
          <Menu.Item
            key={item?.key}
            onClick={() => {
              setIsShowPopover(false)
              item?.onPress(recipe.id)
            }}
          >
            {item?.title}
          </Menu.Item>
        ))}
    </Menu>
  )
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 10
      }}
    >
      {recipe?.avatar && recipe?.avatar.length > 0 ? (
        <Image src={recipe?.avatar[0]} style={{ borderRadius: 10 }} />
      ) : (
        <span className="imgSrcDefault" />
      )}
      {showMoreBtn && popoverList && (
        <Popover
          content={popoverContent}
          placement="rightBottom"
          trigger="click"
          visible={isShowPopover}
          onVisibleChange={visible => setIsShowPopover(visible)}
        >
          <Button
            shape="round"
            type="primary"
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 0
            }}
            onClick={() => onClickMore()}
            icon={<FiMoreHorizontal size={28} color={'white'} />}
          />
        </Popover>
      )}

      <ButtonBase onClick={() => history.push(`/recipe/${recipe.id}`)}>
        <div className="bgRecipe">
          <Text
            style={{ flex: 1, fontWeight: 600, fontSize: 18, color: 'white' }}
          >
            {recipe?.title}
          </Text>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {recipe?.author?.avatar_url ? (
              <Avatar size={20} src={recipe?.author?.avatar_url} />
            ) : (
              <Avatar size={20} icon={<UserOutlined />} />
            )}
            <Text style={{ fontSize: 16, color: 'white', marginLeft: 8 }}>
              {recipe?.author?.name}
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 8
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={hourglass} width={16} height={16} alt="" />
              <Text style={{ fontSize: 12, color: 'white', marginLeft: 4 }}>
                {recipe?.cooking_time} {t('create.min')}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={chart} width={16} height={16} alt="" />

              <Text style={{ fontSize: 12, color: 'white', marginLeft: 4 }}>
                {LEVEL[recipe?.level]}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={fire} width={16} height={16} alt="" />
              <Text style={{ fontSize: 12, color: 'white', marginLeft: 4 }}>
                {recipe?.ingredients?.reduce(calcCalories, 0).toFixed(0)} kcal
              </Text>
            </div>
          </div>
        </div>
      </ButtonBase>
    </div>
  )
}
