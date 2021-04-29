import { Button, Input, Select, Typography } from 'antd'
import 'pages/CreateRecipe/create.css'
import 'pages/SignIn/signin.css'
import React from 'react'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

function RecipeIngredient({ style = {}, item, onAddToChecklist = () => {} }) {
  const { t } = useTranslation()

  return (
    <div
      className="ingredient-recipe"
      style={{
        ...style
      }}
      key={item.id}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 12
        }}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: 10,
            height: 100,
            width: 100
          }}
        >
          <span
            className="imgSrc"
            style={{ backgroundImage: `url("${item.img}")` }}
          />
          <div className="bgName">
            <Text>{item.name}</Text>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <Text>
          {item.amount} {item?.unit?.measurement_description}
        </Text>
        <Text>{item?.calories} calo</Text>
      </div>
    </div>
  )
}

export default RecipeIngredient
