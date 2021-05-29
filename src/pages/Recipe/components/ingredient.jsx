import { Typography } from 'antd'
import 'pages/CreateRecipe/create.css'
import 'pages/SignIn/signin.css'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { capitalizeFirstLetter, COLOR } from 'ultis/functions'

const { Text } = Typography

function RecipeIngredient({ style = {}, item, onAddToChecklist = () => {} }) {
  const { t } = useTranslation()

  return (
    <div
      className="ingredient-recipe"
      style={{
        ...style,
        textAlign: 'center'
      }}
      key={item.id}
    >
      <div className="imgSquare">
        {item.img ? (
          <span
            className="imgSrc"
            style={{ backgroundImage: `url("${item.img}")` }}
          />
        ) : (
          <span className="imgSrcDefault" />
        )}
      </div>
      <Text
        style={{
          fontWeight: 600,
          fontSize: 18,
          marginTop: 16,
          textAlign: 'center'
        }}
      >
        {capitalizeFirstLetter(item.name)}
      </Text>

      <Text
        style={{
          fontWeight: 600,
          fontSize: 14,
          color: COLOR.grayText,
          textAlign: 'center'
        }}
      >
        {item.amount} {item?.unit?.measurement_description}
      </Text>
      <Text style={{ fontWeight: 600, fontSize: 14, color: COLOR.grayText }}>
        {item?.calories} calo
      </Text>
    </div>
  )
}

export default RecipeIngredient
