import { UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import Text from 'antd/lib/typography/Text'
import ButtonBase from 'components/ButtonBase'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { calcCalories, history } from 'ultis/functions'
import './index.css'

export default function RecipeItem(props) {
  const { recipe } = props
  const { t } = useTranslation()

  const LEVEL = {
    easy: t('create.easy'),
    medium: t('create.medium'),
    hard: t('create.hard')
  }
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
      <ButtonBase onClick={() => history.push(`/recipe/${recipe.id}`)}>
        <div className="bgRecipe">
          <Text style={{ fontWeight: 600, fontSize: 18, color: 'white' }}>
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
            <div style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: 'white' }}>
                {recipe?.cooking_time} {t('create.min')}
              </Text>
            </div>
            <div style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: 'white' }}>
                {LEVEL[recipe?.level]}
              </Text>
            </div>
            <div style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: 'white' }}>
                {(recipe?.ingredients?.reduce(calcCalories, 0) / 1000).toFixed(
                  0
                )}{' '}
                kcal
              </Text>
            </div>
          </div>
        </div>
      </ButtonBase>
    </div>
  )
}
