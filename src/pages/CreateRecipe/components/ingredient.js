import { Button, Input, Select, Typography } from 'antd'
import CInput from 'components/CInput'
import 'pages/CreateRecipe/create.css'
import 'pages/SignIn/signin.css'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { COLOR, debounce } from 'ultis/functions'
import _ from 'lodash'

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
  onAdd = value => {}
}) {
  const { t } = useTranslation()
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
    delayedQuery(text)
  }

  const changeUnit = unitIndex => {
    setUnitSelected(unitIndex)
    onChange({ ...item, selectUnit: unitIndex })
  }

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        width: '48%',
        maxWidth: '48%',
        flexDirection: 'row',
        marginBottom: 24
      }}
      key={`ingredient${index}`}
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
        {item?.unit &&
        item?.unit?.length > 0 &&
        item.unit[unitSelected]?.calories ? (
          <Text>{Number(item.unit[unitSelected].calories) * amount} calo</Text>
        ) : (
          <Text>0 calo</Text>
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
        />
        <Select
          style={{
            borderColor: COLOR.primary1,
            width: '100%',
            maxWidth: 190
          }}
          placeholder={t('create.categoriesPlaceholder')}
          defaultValue={unitSelected}
          onChange={value => changeUnit(value)}
        >
          {item.unit.map((unitItem, index) => (
            <Option value={index} key={`ingredient${index}`}>
              {unitItem.measurement_description}
            </Option>
          ))}
        </Select>
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
