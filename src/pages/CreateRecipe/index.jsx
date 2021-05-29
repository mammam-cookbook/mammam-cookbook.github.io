import { Button, Select, Steps, Switch, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import CInput from 'components/CInput'
import AppHeader from 'components/Header'
import { Formik } from 'formik'
import 'pages/CreateRecipe/create.css'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { COLOR, RECIPE_STATUS } from 'ultis/functions'
import ImageUpload from './components/imageUpload'
import Ingredient from './components/ingredient'
import Step from './components/step'
import { CreateRecipe, SearchIngredient } from './redux/actions'
import * as yup from 'yup'
import { MAX_COOKING_TIME } from './constants'
import { GetAllCategories } from 'pages/Dashboard/redux/actions'

const { Text, Title } = Typography
const AntdStep = Steps.Step
const { Option } = Select

export default props => {
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const user = useSelector(state => state.Auth.user)
  const categories = useSelector(state => state.Create.categories)
  const history = useHistory()
  const { t } = useTranslation()
  const stepTitle = [t('create.step1'), t('create.step2'), t('create.step3')]
  const [currentStep, setCurrentStep] = useState(0)
  const [otherIngre, setOtherIngre] = useState('')
  let listCategories = []
  categories &&
    categories.forEach(item => {
      listCategories = listCategories.concat(item?.childrenCategories)
    })

  const LEVEL = [
    {
      code: 'easy',
      title: t('create.easy')
    },
    {
      code: 'medium',
      title: t('create.medium')
    },
    {
      code: 'hard',
      title: t('create.hard')
    }
  ]

  const stepsSchema = yup.object({
    content: yup.string().trim().required(t('validation.contentRequired')),
    time: yup.number().nullable().min(1, t('validation.cookingTime'))
  })

  const ingresSchema = yup.object({
    selectAmount: yup.number().min(1, t('validation.massRequired'))
  })

  const validationRecipeSchema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required(t('validation.titleRequired'))
      .max(255, t('validation.titleMaxLength')),
    ration: yup
      .number()
      .required(t('validation.rationRequired'))
      .min(1, t('validation.rationMin')),
    cooking_time: yup
      .number()
      .required(t('validation.cookingTimeRequired'))
      .min(1, t('validation.cookingTimeMin'))
      .max(MAX_COOKING_TIME, t('validation.cookingTimeMax')),
    level: yup.string().required(t('validation.levelChoose')),
    ingredients: yup
      .array()
      .required(t('validation.ingredientRequired'))
      .of(ingresSchema),
    steps: yup.array().required(t('validation.stepRequired')).of(stepsSchema),
    avatar: yup.array().required(t('validation.thumbnailRequired'))
  })

  useEffect(() => {
    dispatch(GetAllCategories.get())
  }, [])

  const searchIngres = (text, values, setFieldValue) => {
    dispatch(
      SearchIngredient.get({
        search: text?.toLocaleLowerCase(),
        onSuccess: data => {
          setOtherIngre('')
          if (data && data.length > 0) {
            let ingres = values.ingredients
            for (let i = 0; i < data.length; i++) {
              if (ingres.filter(item => item.id === data[i].id).length > 0) {
                continue
              }
              ingres.push({ ...data[i], selectAmount: 1, selectUnit: 0 })
              setFieldValue('ingredients', ingres)
              break
            }
          } else {
            let ingres = values.ingredients
            ingres.push({
              img: null,
              id: `${user.id}-${(Math.random() * 100000).toFixed(6)}`,
              name: text,
              unit: [{ measurement_description: 'g' }],
              selectAmount: 1,
              selectUnit: 0
            })
            setFieldValue('ingredients', ingres)
          }
        }
      })
    )
  }

  const handleKeyPress = (event, values, setFieldValue) => {
    if (event.key === 'Enter') {
      searchIngres(event.target.value, values, setFieldValue)
    }
  }

  const submitRecipe = async values => {
    const avalink = values.avatar.map(item => {
      return item.src.url
    })
    const steps = values.steps.map(item => {
      const images = item.images.map(itemImg => {
        return itemImg.src.url
      })
      return { ...item, images }
    })
    let ingredients_name = []
    const ingredients = values.ingredients.map(item => {
      ingredients_name.push(item.name)
      const tmp = {
        img: item?.img,
        name: item.name,
        id: item.id,
        unit: item.unit[item.selectUnit],
        amount: item.selectAmount,
        calories: item.unit[item.selectUnit]?.calories
          ? Number(item.unit[item.selectUnit].calories) * item.selectAmount
          : 0
      }
      return tmp
    })
    dispatch(
      CreateRecipe.get({
        ...values,
        avatar: avalink,
        steps,
        ingredients,
        ingredients_name,
        status: RECIPE_STATUS.APPROVED
      })
    )
  }

  if (!user) {
    return (
      <>
        <AppHeader from="create" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ margin: 28 }}>
            Bạn chưa đăng nhập. Vui lòng đăng nhập để tạo bài viết.
          </Text>
          <Button
            size="large"
            type="primary"
            onClick={() =>
              history.push({
                pathname: '/signin',
                state: { from: `/create` }
              })
            }
          >
            {t('auth.login').toLocaleUpperCase()}
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <AppHeader from="create" />
      <Formik
        initialValues={{
          title: '',
          description: '',
          avatar: [],
          ration: 1,
          cooking_time: 20,
          level: LEVEL[0].code,
          ingredients: [],
          categories: [],
          hashtags: [],
          steps: [{ content: '', images: [], time: null }]
        }}
        isInitialValid={false}
        validationSchema={validationRecipeSchema}
        onSubmit={values => submitRecipe(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
          setFieldTouched,
          setFieldValue
        }) => {
          return (
            <div className="body-container">
              <Title level={2}>{t('home.createRecipe')}</Title>
              <div
                style={{
                  ...style.spaceBetween,
                  paddingTop: 24,
                  paddingBottom: 24
                }}
              >
                <Button
                  type="primary"
                  disabled={currentStep < 1}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  {t('create.prev')}
                </Button>
                <Steps
                  style={{ marginLeft: 24, marginRight: 24 }}
                  current={currentStep}
                >
                  {stepTitle.map(item => (
                    <AntdStep
                      key={item}
                      title={isDesktopOrLaptop ? item : null}
                    />
                  ))}
                </Steps>
                <Button
                  type="primary"
                  disabled={currentStep > 1}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  {t('create.next')}
                </Button>
              </div>

              {currentStep === 0 && (
                <div style={{ display: 'flex' }} className="row-container">
                  <div style={style.leftColumn}>
                    <div style={{ ...style.spaceBetween, marginBottom: 24 }}>
                      <Text style={{ color: COLOR.primary1, fontWeight: 600 }}>
                        {t('create.contributeToCreate')}
                      </Text>
                      <Switch
                        defaultChecked
                        onChange={data => console.log(data)}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Title level={4}>
                        {t('create.title').toLocaleUpperCase()}
                      </Title>
                      <CInput
                        style={style.border}
                        className="inputBox"
                        value={values.title}
                        onChange={handleChange('title')}
                        onTouchStart={() => setFieldTouched('title')}
                        onBlur={handleBlur('title')}
                        placeholder={t('create.titlePlaceholder')}
                        error={errors.title}
                      />
                    </div>
                    <div style={{ ...style.spaceBetween, marginTop: 16 }}>
                      <Title level={4}>
                        {t('create.categories').toLocaleUpperCase()}
                      </Title>
                    </div>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '100%', height: 48 }}
                      placeholder={t('create.categoriesPlaceholder')}
                      defaultValue={values.categories}
                      onChange={value => setFieldValue('categories', value)}
                    >
                      {listCategories.map((item, index) => (
                        <Option value={item.id} key={`category${index}`}>
                          {item.vi}
                        </Option>
                      ))}
                    </Select>

                    <div style={{ ...style.spaceBetween, marginTop: 24 }}>
                      <div style={{ flex: 1.5 }}>
                        <Title level={4}>
                          {t('create.ration').toLocaleUpperCase()}
                        </Title>
                        <CInput
                          style={style.border}
                          className="inputBox"
                          value={values.ration}
                          onChange={handleChange('ration')}
                          onTouchStart={() => setFieldTouched('ration')}
                          onBlur={handleBlur('ration')}
                          placeholder={'200'}
                          error={errors.ration}
                          type="number"
                        />
                      </div>
                      <div
                        style={{ flex: 1.5, paddingLeft: 16, paddingRight: 16 }}
                      >
                        <Title level={4}>
                          {t('create.level').toLocaleUpperCase()}
                        </Title>
                        <Select
                          style={{ width: '100%', ...style.border }}
                          defaultValue={values.level}
                          onChange={value => setFieldValue('level', value)}
                        >
                          {LEVEL.map((item, index) => (
                            <Option value={item.code} key={`level${index}`}>
                              {item.title}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div style={{ flex: 1.5 }}>
                        <Title level={4}>
                          {t('create.time').toLocaleUpperCase()}
                        </Title>
                        <div style={style.spaceBetween}>
                          <CInput
                            style={{
                              maxWidth: 120,
                              ...style.border
                            }}
                            className="inputBox"
                            value={values.cooking_time}
                            onChange={handleChange('cooking_time')}
                            onTouchStart={() => setFieldTouched('cooking_time')}
                            onBlur={handleBlur('cooking_time')}
                            placeholder={'200'}
                            type="number"
                          />
                          <Title
                            level={4}
                            style={{ marginLeft: 8, alignSelf: 'center' }}
                          >
                            {t('create.min').toLocaleUpperCase()}
                          </Title>
                        </div>
                        {errors.cooking_time && (
                          <span className="errorStyle">
                            {errors.cooking_time}
                          </span>
                        )}
                      </div>
                    </div>
                    <Title level={4} style={{ marginTop: 16 }}>
                      {t('create.summary').toLocaleUpperCase()}
                    </Title>
                    <TextArea
                      rows={6}
                      style={style.border}
                      value={values.description}
                      onChange={handleChange('description')}
                      onTouchStart={() => setFieldTouched('description')}
                      onBlur={handleBlur('description')}
                      placeholder={t('create.summaryPlaceholder')}
                      error={errors.description}
                    />
                  </div>
                  <ImageUpload
                    style={{ flex: 1, padding: 24 }}
                    value={values.avatar}
                    onChange={data => setFieldValue('avatar', data)}
                    error={errors.avatar}
                  />
                </div>
              )}
              {currentStep === 1 && (
                <div style={style.leftColumn}>
                  <Title level={4}>
                    {t('create.ingredients').toLocaleUpperCase()}
                  </Title>
                  <div style={{ ...style.spaceBetween }}>
                    <CInput
                      className="inputBox"
                      onKeyPress={event =>
                        handleKeyPress(event, values, setFieldValue)
                      }
                      value={otherIngre}
                      onChange={event => setOtherIngre(event.target.value)}
                      placeholder={t('create.ingredientsPlaceholder')}
                    />
                    <Button
                      style={{ marginLeft: 24 }}
                      type="primary"
                      size="large"
                      onClick={() =>
                        searchIngres(otherIngre, values, setFieldValue)
                      }
                    >
                      {t('create.add')}
                    </Button>
                  </div>
                  <div style={style.ingres}>
                    {values.ingredients.length > 0 &&
                      values.ingredients.map((item, index) => (
                        <Ingredient
                          index={index}
                          item={item}
                          isAdd={false}
                          onChange={value => {
                            let ingres = values.ingredients
                            ingres[index] = value
                            setFieldValue('ingredients', ingres)
                          }}
                          onRemove={() => {
                            let ingres = values.ingredients
                            ingres.splice(index, 1)
                            setFieldValue('ingredients', ingres)
                          }}
                          onChangeCustomUnit={value => {
                            let ingres = values.ingredients
                            ingres[index].unit[0].measurement_description =
                              value
                            setFieldValue('ingredients', ingres)
                          }}
                          error={
                            errors.ingredients &&
                            typeof errors.ingredients === 'object' &&
                            errors.ingredients[index] &&
                            errors.ingredients[index]
                          }
                        />
                      ))}
                  </div>
                  {errors.ingredients &&
                    typeof errors.ingredients === 'string' && (
                      <Text style={{ color: 'red' }}>{errors.ingredients}</Text>
                    )}
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <Title level={4}>
                    {t('create.direction').toLocaleUpperCase()}
                  </Title>
                  {values.steps.map((item, index) => (
                    <Step
                      step={item}
                      index={index}
                      onChangeImage={data => {
                        let steps = values.steps
                        // console.log('steps', steps)
                        steps[index].images = data
                        setFieldValue('steps', steps)
                      }}
                      onChangeMaking={data => {
                        let steps = values.steps
                        // console.log('steps2', steps)
                        steps[index].content = data
                        setFieldValue('steps', steps)
                      }}
                      onChangeTime={data => {
                        let steps = values.steps
                        steps[index].time = data
                        setFieldValue('steps', steps)
                      }}
                      onDeleteItem={index => {
                        let steps = values.steps
                        steps.splice(index, 1)
                        setFieldValue('steps', steps)
                      }}
                      error={
                        errors.steps &&
                        typeof errors.steps === 'object' &&
                        errors.steps[index] &&
                        errors.steps[index]
                      }
                    />
                  ))}
                  {errors.steps && typeof errors.steps === 'string' && (
                    <Text style={{ color: 'red' }}>{errors.steps}</Text>
                  )}
                  <Button
                    style={{ marginTop: 48 }}
                    type="primary"
                    onClick={() => {
                      setFieldValue('steps', [
                        ...values.steps,
                        {
                          content: '',
                          images: [],
                          time: null
                        }
                      ])
                    }}
                  >
                    {t('create.addNewStep')}
                  </Button>
                </div>
              )}
              <div
                style={{
                  ...style.leftColumn,
                  flexDirection: 'row',
                  marginTop: 64,
                  paddingBottom: 64
                }}
              >
                <Button size="large" style={{ flex: 1, marginRight: 16 }}>
                  {t('create.saveDraft')}
                </Button>
                <Button
                  type="primary"
                  size="large"
                  style={{ flex: 1, marginLeft: 16 }}
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  {t('create.create')}
                </Button>
              </div>
            </div>
          )
        }}
      </Formik>
    </>
  )
}

const style = {
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  ingres: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 24,
    paddingTop: 48
  },
  border: {
    borderColor: COLOR.primary1
  }
}
