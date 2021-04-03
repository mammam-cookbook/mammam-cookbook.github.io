import { Button, Select, Steps, Switch, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import CInput from 'components/CInput'
import AppHeader from 'components/Header'
import { Formik } from 'formik'
import 'pages/CreateRecipe/create.css'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, RECIPE_STATUS } from 'ultis/functions'
import ImageUpload from './components/imageUpload'
import Ingredient from './components/ingredient'
import Step from './components/step'
import { LEVEL, validationRecipeSchema } from './constant'
import { CreateRecipe, GetCategories, SearchIngredient } from './redux/actions'

const { Text, Title } = Typography
const AntdStep = Steps.Step
const { Option } = Select

export default props => {
  const dispatch = useDispatch()
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

  useEffect(() => {
    dispatch(GetCategories.get())
  }, [])

  const searchIngres = (text, values, setFieldValue) => {
    dispatch(
      SearchIngredient.get({
        search: text,
        onSuccess: data => {
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
    <div className="container-fluid">
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
            <div>
              <Title level={2} style={{ paddingLeft: 24 }}>
                {t('home.createRecipe')}
              </Title>
              <div
                style={{
                  ...style.spaceBetween,
                  paddingLeft: 24,
                  paddingRight: 24,
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
                    <AntdStep key={item} title={item} />
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
                <div style={{ display: 'flex' }}>
                  <div style={style.leftColumn}>
                    <div style={style.spaceBetween}>
                      <Title level={5} style={{ color: COLOR.primary1 }}>
                        {t('create.contributeToCreate')}
                      </Title>
                      <Switch
                        defaultChecked
                        onChange={data => console.log(data)}
                      />
                    </div>

                    <div style={{ ...style.spaceBetween, marginTop: 16 }}>
                      <div style={{ flex: 3 }}>
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
                            style={{ maxWidth: 100, ...style.border }}
                            className="inputBox"
                            value={values.cooking_time}
                            onChange={handleChange('cooking_time')}
                            onTouchStart={() => setFieldTouched('cooking_time')}
                            onBlur={handleBlur('cooking_time')}
                            placeholder={'200'}
                            error={errors.cooking_time}
                            type="number"
                          />
                          <Title
                            level={4}
                            style={{ marginLeft: 8, alignSelf: 'center' }}
                          >
                            {t('create.min').toLocaleUpperCase()}
                          </Title>
                        </div>
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
                    <div style={{ ...style.spaceBetween, marginTop: 24 }}>
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
                            ingres[
                              index
                            ].unit[0].measurement_description = value
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
                <div style={{ padding: 24 }}>
                  <Title level={4}>
                    {t('create.direction').toLocaleUpperCase()}
                  </Title>
                  {values.steps.map((item, index) => (
                    <Step
                      step={item}
                      index={index}
                      onChangeImage={data => {
                        let steps = values.steps
                        console.log('steps', steps)
                        steps[index].images = data
                        setFieldValue('steps', steps)
                      }}
                      onChangeMaking={data => {
                        let steps = values.steps
                        console.log('steps2', steps)
                        steps[index].content = data
                        setFieldValue('steps', steps)
                      }}
                      onChangeTime={data => {
                        let steps = values.steps
                        steps[index].time = data
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
    </div>
  )
}

const style = {
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 24
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  ingres: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    flexWrap: 'wrap'
  },
  border: {
    borderColor: COLOR.primary1
  }
}
