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
    <div style={styles.item} key={item.id}>
      <div className="imgSquare">
        {item.img ? (
          <span
            className="imgSrc"
            style={{ backgroundImage: `url("${item.img}")`, borderRadius: 10 }}
          />
        ) : (
          <span className="imgSrcDefault" style={{ borderRadius: 10 }} />
        )}
      </div>
      <Text style={styles.nameTxt}>{capitalizeFirstLetter(item.name)}</Text>

      <Text style={styles.amountTxt}>
        {item.amount} {item?.unit?.measurement_description}
      </Text>
      <Text style={styles.calTxt}>{item?.calories} kcal</Text>
    </div>
  )
}

export default RecipeIngredient

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
    color: COLOR.grayText,
    paddingLeft: 8,
    paddingRight: 8
  },
  nameTxt: {
    fontWeight: 600,
    fontSize: 18,
    marginTop: 16,
    paddingLeft: 8,
    paddingRight: 8
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `solid 1px #F6A13A`,
    borderRadius: 10,
    textAlign: 'center'
  }
}
