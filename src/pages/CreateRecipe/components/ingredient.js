import { Button, Input, Select, Typography } from 'antd'
import CInput from 'components/CInput'
import _ from 'lodash'
import 'pages/CreateRecipe/create.css'
import 'pages/SignIn/signin.css'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { capitalizeFirstLetter, COLOR } from 'ultis/functions'

const { Text, Title } = Typography
const { TextArea } = Input
const { Option } = Select

function Ingredient({
  isAdd = true,
  style = {},
  item,
  index,
  onChange = value => {},
  onRemove = () => {},
  onAdd = value => {},
  onChangeCustomUnit = unit => {},
  error
}) {
  const { t } = useTranslation()
  const user = useSelector(state => state.Auth.user)
  const [unitSelected, setUnitSelected] = useState(item.selectUnit || 0)
  const [amount, setAmount] = useState(item.selectAmount || 1)

  const delayedQuery = useCallback(
    _.debounce(q => {
      setAmount(Number(q))
      onChange({ ...item, selectAmount: Number(q) })
    }, 500),
    []
  )

  const changeAmount = text => {
    // delayedQuery(text)
    setAmount(Number(text))
    onChange({ ...item, selectAmount: Number(text) })
  }

  const changeUnit = unitIndex => {
    setUnitSelected(unitIndex)
    onChange({ ...item, selectUnit: unitIndex })
  }

  const delayedChangeCustomUnit = useCallback(
    _.debounce(q => {
      onChangeCustomUnit(q)
    }, 500),
    []
  )

  const changeCustomUnit = text => {
    delayedChangeCustomUnit(text)
  }

  return (
    <div
      style={{
        ...style
      }}
      className="ingredient-create"
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
          {item.img ? (
            <span
              className="imgSrc"
              style={{ backgroundImage: `url("${item.img}")` }}
            />
          ) : (
            <span className="imgSrcDefault" />
          )}
          <div className="bgName">
            <Text style={{ fontWeight: 600 }}>
              {capitalizeFirstLetter(item.name)}
            </Text>
          </div>
        </div>
        {item?.unit &&
        item?.unit?.length > 0 &&
        item.unit[unitSelected]?.calories ? (
          <Text style={{ fontWeight: 600, color: COLOR.grayText }}>
            {Number(item.unit[unitSelected].calories) * amount} calo
          </Text>
        ) : (
          <Text style={{ fontWeight: 600, color: COLOR.grayText }}>0 calo</Text>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <CInput
          style={{ borderColor: COLOR.primary1, maxWidth: '100%' }}
          className="inputBox"
          value={amount}
          onChange={event => changeAmount(event.target.value)}
          placeholder={'200'}
          type="number"
          error={error?.selectAmount}
        />
        {!item?.id?.includes(user.id) ? (
          <Select
            style={{
              borderColor: COLOR.primary1,
              width: '100%',
              maxWidth: 190
            }}
            placeholder={t('create.measurePlaceholder')}
            defaultValue={unitSelected}
            onChange={value => changeUnit(value)}
          >
            {item.unit.map((unitItem, index) => (
              <Option value={index} key={`ingredient${index}`}>
                {unitItem.measurement_description}
              </Option>
            ))}
          </Select>
        ) : (
          <CInput
            style={{
              borderColor: COLOR.primary1,
              width: '100%',
              maxWidth: 190
            }}
            defaultValue={item.unit[0].measurement_description}
            placeholder={t('create.measurePlaceholder')}
            onChange={event => onChangeCustomUnit(event.target.value)}
          />
        )}
        <Button
          type="primary"
          style={{ marginTop: 12 }}
          onClick={
            isAdd
              ? () =>
                  onAdd({
                    ...item,
                    selectAmount: amount,
                    selectUnit: unitSelected
                  })
              : () => onRemove()
          }
        >
          {isAdd ? t('create.add') : t('create.remove')}
        </Button>
      </div>
    </div>
  )
}

export default Ingredient
