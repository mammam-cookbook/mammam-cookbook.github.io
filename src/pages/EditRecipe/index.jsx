import { Button, Col, Row, Select, Spin, Steps, Switch, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Paragraph from 'antd/lib/typography/Paragraph'
import CInput from 'components/CInput'
import AppFooter from 'components/Footer'
import AppHeader from 'components/Header'
import { store } from 'core/store'
import { FieldArray, Formik } from 'formik'
import ImageUpload from 'pages/CreateRecipe/components/imageUpload'
import Ingredient from 'pages/CreateRecipe/components/ingredient'
import Step from 'pages/CreateRecipe/components/step'
import { MAX_COOKING_TIME } from 'pages/CreateRecipe/constants'
import 'pages/CreateRecipe/create.css'
import { SearchIngredient } from 'pages/CreateRecipe/redux/actions'
import { GetAllCategories } from 'pages/Dashboard/redux/actions'
import { GetDetailRecipe, UpdateRecipe } from 'pages/Recipe/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory, useParams } from 'react-router-dom'
import {
  capitalizeFirstLetter,
  COLOR,
  RECIPE_STATUS,
  ROLES
} from 'ultis/functions'
import * as yup from 'yup'
import { LoadingOutlined } from '@ant-design/icons'

const { Text, Title } = Typography
const AntdStep = Steps.Step
const { Option } = Select
const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />

let timeout = null
let currentValue = ''

function search(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fetchIngredient() {
    store.dispatch(
      SearchIngredient.get({
        search: value?.toLocaleLowerCase(),
        onSuccess: data => {
          if (currentValue === value) {
            callback(data)
          }
        }
      })
    )
  }

  timeout = setTimeout(fetchIngredient, 300)
}

export default props => {
  const params = useParams()
  const { id } = params
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { user, language } = useSelector(state => state.Auth)
  const categories = useSelector(state => state.Create.categories)
  const post = useSelector(state => state.Recipe.recipeDetail)
  const history = useHistory()
  const { t } = useTranslation()
  const stepTitle = [t('create.step1'), t('create.step2'), t('create.step3')]
  const [currentStep, setCurrentStep] = useState(0)
  const [searchResult, setSearchResult] = useState([])
  const [otherIngre, setOtherIngre] = useState('')
  let listCategories = []
  categories &&
    categories.forEach(item => {
      listCategories = listCategories.concat(item?.childrenCategories)
    })
  const [isUploading, setIsUploading] = useState({})
  // let isUploading = {}

  useEffect(() => {
    if (id) {
      dispatch(GetDetailRecipe.get({ recipeId: id }))
    }
    dispatch(GetAllCategories.get())
  }, [])

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

  const handleSearch = value => {
    if (value) {
      setOtherIngre(value)
      search(value, data => setSearchResult(data))
    } else {
      setSearchResult([])
    }
  }

  const onChooseIngre = (index, values, setFieldValue) => {
    setOtherIngre('')
    let ingres = values.ingredients
    ingres.push({
      ...searchResult[index],
      selectAmount: 1,
      selectUnit: Number(searchResult[index]?.unit?.length - 1) || 0
    })
    setFieldValue('ingredients', ingres)
    setSearchResult([])
  }

  const addOtherIngre = (values, setFieldValue) => {
    if (otherIngre && otherIngre?.length > 0) {
      setSearchResult([])
      let ingres = values.ingredients
      ingres.push({
        img: null,
        id: `${user.id}-${(Math.random() * 100000).toFixed(6)}`,
        name: otherIngre,
        unit: [{ measurement_description: 'g' }],
        selectAmount: 1,
        selectUnit: 0
      })
      setFieldValue('ingredients', ingres)
      setOtherIngre('')
    }
  }

  const handleKeyPress = (event, values, setFieldValue) => {
    if (event.key === 'Enter') {
      addOtherIngre(values, setFieldValue)
    }
  }

  const submitRecipe = async values => {
    const avalink = values.avatar.map(item => {
      if (typeof item === 'string') {
        return item
      }
      return item.src.url
    })

    const steps = values.steps.map(item => {
      const images = item.images.map(itemImg => {
        if (typeof itemImg === 'string') {
          return itemImg
        }
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
          ? Math.round(
              Number(item.unit[item.selectUnit].calories) *
                (item.selectAmount /
                  Number(item.unit[item.selectUnit].number_of_units))
            )
          : 0
      }
      return tmp
    })
    dispatch(
      UpdateRecipe.get({
        recipeId: id,
        data: {
          ...values,
          avatar: avalink,
          steps,
          ingredients,
          ingredients_name
        }
      })
    )
  }

  if (!post || id !== post.id) {
    return (
      <>
        <AppHeader />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 48
          }}
        >
          <Spin indicator={loadingIcon} />
        </div>
      </>
    )
  }

  if (
    !user ||
    !id ||
    (user?.role === ROLES.USER && post?.author?.id !== user?.id)
  ) {
    return (
      <>
        <AppHeader />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ margin: 28 }}>
            {!user
              ? t('notification.loginToEditRecipe')
              : t('notification.cannotEditRecipe')}
          </Text>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              if (!user) {
                history.push({
                  pathname: '/signin',
                  state: { from: `/create` }
                })
              } else {
                history.push('/')
              }
            }}
          >
            {!user
              ? t('auth.login').toLocaleUpperCase()
              : t('notification.backToHome').toLocaleUpperCase()}
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <AppHeader />
      <Formik
        initialValues={{
          title: post?.title,
          description: post?.description,
          avatar: post?.avatar,
          ration: post?.ration,
          cooking_time: post?.cooking_time,
          level: post?.level,
          ingredients: post?.ingredients?.map(item => {
            return {
              ...item,
              unit: [item?.unit],
              selectAmount: item?.amount,
              selectUnit: 0
            }
          }),
          categories:
            post?.categories && post?.categories?.length > 0
              ? post?.categories?.map(item => item.category_id)
              : [],
          steps: post?.steps,
          status: post?.status
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
              <Title level={2}>{t('home.editRecipe')}</Title>
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
                    <div style={{ ...style.spaceBetween, marginTop: 16 }}>
                      <Title level={4}>
                        {t('create.publishThisRecipe').toLocaleUpperCase()}
                      </Title>
                      <Switch
                        defaultChecked={
                          values?.status === RECIPE_STATUS.APPROVED
                        }
                        onChange={checked => {
                          if (checked) {
                            setFieldValue('status', RECIPE_STATUS.APPROVED)
                          } else {
                            setFieldValue('status', RECIPE_STATUS.PENDING)
                          }
                        }}
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
                      style={{
                        width: '100%',
                        borderColor: COLOR.primary1
                      }}
                      placeholder={t('create.categoriesPlaceholder')}
                      defaultValue={values.categories}
                      onChange={value => setFieldValue('categories', value)}
                    >
                      {listCategories.map((item, index) => (
                        <Option value={item.id} key={`category${index}`}>
                          {item[language]}
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
                    setIsUploading={isUpload => {
                      let tmp = isUploading
                      tmp['avatar'] = isUpload
                      setIsUploading(tmp)
                    }}
                    style={{ flex: 1, paddingTop: 32 }}
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
                    <Select
                      showSearch
                      value={otherIngre}
                      style={{ width: '100%' }}
                      placeholder={t('create.ingredientsPlaceholder')}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={handleSearch}
                      onChange={value =>
                        onChooseIngre(value, values, setFieldValue)
                      }
                      onKeyDown={event =>
                        handleKeyPress(event, values, setFieldValue)
                      }
                      notFoundContent={null}
                    >
                      {searchResult && searchResult?.length > 0
                        ? searchResult?.map((item, index) => (
                            <Option value={index} key={`result-${item?.id}`}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <div style={{ width: 50, height: 50 }}>
                                  <div className="imgSquare">
                                    {item.img ? (
                                      <span
                                        className="imgSrc"
                                        style={{
                                          backgroundImage: `url("${item.img}")`,
                                          borderRadius: 10
                                        }}
                                      />
                                    ) : (
                                      <span
                                        className="imgSrcDefault"
                                        style={{ borderRadius: 10 }}
                                      />
                                    )}
                                  </div>
                                </div>

                                <Paragraph
                                  ellipsis={{
                                    rows: 1,
                                    expandable: false,
                                    suffix: ''
                                  }}
                                  style={{ marginBottom: 0, marginLeft: 12 }}
                                >
                                  <Text>
                                    {capitalizeFirstLetter(item.name)}
                                  </Text>
                                </Paragraph>
                              </div>
                            </Option>
                          ))
                        : null}
                    </Select>
                    <Button
                      disabled={!otherIngre || otherIngre.length === 0}
                      style={{ marginLeft: 24 }}
                      type="primary"
                      size="large"
                      onClick={() => addOtherIngre(values, setFieldValue)}
                    >
                      {t('create.add')}
                    </Button>
                  </div>
                  {/* <div style={style.ingres}> */}
                  <FieldArray
                    name="ingredients"
                    render={arrayHelpers => (
                      <Row gutter={[32, 40]} style={{ marginTop: 48 }}>
                        {values.ingredients.length > 0 &&
                          values.ingredients.map((item, index) => (
                            <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={24}>
                              <Ingredient
                                index={index}
                                item={item}
                                isAdd={false}
                                onChange={value => {
                                  arrayHelpers.replace(index, value)
                                }}
                                onRemove={() => {
                                  arrayHelpers.remove(index)
                                }}
                                onChangeCustomUnit={value => {
                                  let temp = values.ingredients[index]
                                  temp.unit[0].measurement_description = value
                                  arrayHelpers.replace(index, temp)
                                }}
                                error={
                                  errors.ingredients &&
                                  typeof errors.ingredients === 'object' &&
                                  errors.ingredients[index] &&
                                  errors.ingredients[index]
                                }
                              />
                            </Col>
                          ))}
                      </Row>
                    )}
                  />
                  {/* </div> */}
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
                  <FieldArray
                    name="steps"
                    render={arrayHelpers => (
                      <>
                        {values.steps.map((item, index) => (
                          <Step
                            step={item}
                            index={index}
                            setIsUploading={isUpload => {
                              let tmp = isUploading
                              tmp[`step-${index}`] = isUpload
                              setIsUploading(tmp)
                            }}
                            onChangeImage={data => {
                              arrayHelpers.replace(index, data)
                            }}
                            onChangeMaking={data => {
                              arrayHelpers.replace(index, data)
                            }}
                            onChangeTime={data => {
                              arrayHelpers.replace(index, data)
                            }}
                            onDeleteItem={index => {
                              arrayHelpers.remove(index)
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
                            arrayHelpers.push({
                              content: '',
                              images: [],
                              time: null
                            })
                          }}
                        >
                          {t('create.addNewStep')}
                        </Button>
                      </>
                    )}
                  />
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
                <Button
                  type="primary"
                  size="large"
                  style={{ flex: 1 }}
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  {t('common.save').toLocaleUpperCase()}
                </Button>
              </div>
            </div>
          )
        }}
      </Formik>
      <AppFooter />
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
  border: {
    borderColor: COLOR.primary1
  }
}
