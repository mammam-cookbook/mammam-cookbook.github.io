import { LoadingOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import Title from 'antd/lib/typography/Title'
import GlobalModal from 'components/GlobalModal'
import { GetAllCategories } from 'pages/Dashboard/redux/actions'
import { CategoryFilterItem, FilterItem } from 'pages/SearchRecipe'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiBlock } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'
import i18n from 'ultis/i18n'
import { GetCustomization, UpdateCustomization } from '../redux/actions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function RecommendOptimization(props) {
  const { user } = useSelector(state => state.Auth)
  const { allergyList, dietList, disliked_ingredients, level } = user ?? {
    allergyList: [],
    dietList: [],
    disliked_ingredients: [],
    level: null
  }
  const categories = useSelector(state => state.Create.categories)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [ingredientsText, setIngredientsText] = useState('')
  const diets = categories?.find(
    item => item?.id === '47400fb1-bad3-4920-8a99-a8a3202bad74'
  )
  const allergy = categories?.find(
    item => item?.id === '41c68538-d115-409e-aaa0-f86b5f0592fd'
  )
  const [currentDislike, setCurrentDislike] = useState(
    disliked_ingredients ?? []
  )
  const [addAllergy, setAddAllergy] = useState(
    allergyList ? allergyList?.map(item => item?.category_id) : []
  )
  const [addDiet, setAddDiet] = useState(
    dietList ? dietList?.map(item => item?.category_id) : []
  )
  const [currentLevel, setCurrentLevel] = useState(level)

  const LEVEL = {
    easy: t('create.easy'),
    medium: t('create.medium'),
    hard: t('create.hard')
  }

  useEffect(() => {
    dispatch(GetCustomization.get())
    dispatch(GetAllCategories.get())
  }, [])

  useEffect(() => {
    setAddAllergy(
      allergyList ? allergyList?.map(item => item?.category_id) : []
    )
  }, [allergyList])

  useEffect(() => {
    setAddDiet(dietList ? dietList?.map(item => item?.category_id) : [])
  }, [dietList])

  useEffect(() => {
    setCurrentDislike(disliked_ingredients ?? [])
  }, [disliked_ingredients])

  useEffect(() => {
    setCurrentLevel(level)
  }, [level])

  const handleKeyPressIngre = event => {
    if (event?.target?.defaultValue?.length > 0 && event.key === 'Enter') {
      setIngredientsText('')
      currentDislike?.push(event?.target?.defaultValue)
      setCurrentDislike([...currentDislike])
    }
  }

  const onSave = () => {
    let newAddAllergy = [...addAllergy]
    let newRemoveAllergy = []
    allergyList &&
      allergyList?.forEach(item => {
        const index = addAllergy?.findIndex(add => add === item?.category_id)
        if (index > -1) {
          newAddAllergy = newAddAllergy?.filter(id => id !== item?.category_id)
        } else {
          newRemoveAllergy?.push(item?.category_id)
        }
      })

    let newAddDiet = [...addDiet]
    let newRemoveDiet = []
    dietList &&
      dietList?.forEach(item => {
        const index = addDiet?.findIndex(add => add === item?.category_id)
        if (index > -1) {
          newAddDiet = newAddDiet?.filter(id => id !== item?.category_id)
        } else {
          newRemoveDiet?.push(item?.category_id)
        }
      })

    if (
      currentLevel === level &&
      newAddDiet?.length === 0 &&
      newAddAllergy?.length === 0 &&
      newRemoveDiet?.length === 0 &&
      newRemoveAllergy?.length === 0 &&
      currentDislike?.length === disliked_ingredients?.length &&
      currentDislike?.every(
        (item, index) => item === disliked_ingredients[index]
      )
    ) {
      GlobalModal.alertMessage(null, t('profile.notChangedCustom'))
    } else {
      const value = {
        level: currentLevel,
        disliked: currentDislike,
        dietAdded: newAddDiet,
        dietRemoved: newRemoveDiet,
        allergyAdded: newAddAllergy,
        allergyRemoved: newRemoveAllergy
      }
      dispatch(UpdateCustomization.get(value))
    }
  }

  return (
    <div className="chooseContainer">
      <Title level={4}>{t('profile.customize')}</Title>
      <Title level={5}>{t('profile.dislikeIngres')}</Title>
      <Input
        value={ingredientsText}
        onChange={event => setIngredientsText(event.target.value)}
        style={styles.inputStyle}
        onKeyPress={handleKeyPressIngre}
        placeholder={t('profile.dislikePlaceholder')}
        suffix={<BiBlock size={20} color={COLOR.primary1} />}
      />
      <div style={styles.ingreCol}>
        {currentDislike &&
          currentDislike?.length > 0 &&
          currentDislike?.map((item, index) => (
            <FilterItem
              title={item}
              index={index}
              onClick={() =>
                setCurrentDislike(prev => prev?.filter(ingre => ingre !== item))
              }
            />
          ))}
      </div>
      <Title level={5}>{t('profile.yourLevel')}</Title>
      <div style={styles.ingreCol}>
        {Object.keys(LEVEL).map(key => (
          <div style={{ minWidth: 120, marginRight: 16 }}>
            <CategoryFilterItem
              title={LEVEL[key]}
              isCheck={key === currentLevel}
              onClick={isCheck => {
                if (isCheck) {
                  setCurrentLevel(key)
                } else {
                  setCurrentLevel(null)
                }
              }}
            />
          </div>
        ))}
      </div>

      <Title level={5}>{diets[i18n.language]}</Title>
      <div style={styles.ingreCol}>
        {diets?.childrenCategories?.map(cate => (
          <div style={{ minWidth: 120, marginRight: 16, marginBottom: 8 }}>
            <CategoryFilterItem
              title={cate[i18n.language]}
              isCheck={addDiet?.findIndex(item => item === cate?.id) > -1}
              onClick={isCheck => {
                if (isCheck) {
                  addDiet?.push(cate?.id)
                  setAddDiet([...addDiet])
                } else {
                  setAddDiet(prev => prev?.filter(item => item !== cate?.id))
                }
              }}
            />
          </div>
        ))}
      </div>

      <Title level={5}>{allergy[i18n.language]}</Title>
      <div style={styles.ingreCol}>
        {allergy?.childrenCategories?.map(cate => (
          <div style={{ minWidth: 120, marginRight: 16, marginBottom: 8 }}>
            <CategoryFilterItem
              title={cate[i18n.language]}
              isCheck={addAllergy?.findIndex(item => item === cate?.id) > -1}
              onClick={isCheck => {
                if (isCheck) {
                  addAllergy?.push(cate?.id)
                  setAddAllergy([...addAllergy])
                } else {
                  setAddAllergy(prev => prev?.filter(item => item !== cate?.id))
                }
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ alignSelf: 'center' }}>
        <Button type="primary" onClick={onSave} size="large">
          {i18n.t('common.save')}
        </Button>
      </div>
    </div>
  )
}

const styles = {
  inputStyle: {
    display: 'flex',
    borderRadius: 10,
    borderColor: COLOR.primary1,
    marginBottom: 12
  },
  ingreCol: { display: 'flex', flexWrap: 'wrap', marginBottom: 32 }
}

export default RecommendOptimization
