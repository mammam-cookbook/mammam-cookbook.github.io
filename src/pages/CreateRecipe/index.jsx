import { Button, Select, Steps, Switch, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import CInput from 'components/CInput'
import AppHeader from 'components/Header'
import { Formik } from 'formik'
import 'pages/CreateRecipe/create.css'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR } from 'ultis/functions'
import ImageUpload from './components/imageUpload'
import Ingredient from './components/ingredient'
import Step from './components/step'
import { CATEGORY_ITEMS, validationRecipeSchema } from './constant'
import { SearchIngredient } from './redux/actions'
import _ from 'lodash'
import upload from 'ultis/uploadImage'

const { Text, Title } = Typography
const AntdStep = Steps.Step
const { Option } = Select

export default props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const ingredients = useSelector(state => state.Create.ingredients)
  const history = useHistory()
  const { t } = useTranslation()
  const stepTitle = [t('create.step1'), t('create.step2'), t('create.step3')]
  const [currentStep, setCurrentStep] = useState(0)
  const [otherIngre, setOtherIngre] = useState('')

  const addPictureStep = (steps, index, picture, setFieldValue) => {
    steps[index].images = picture
    setFieldValue('steps', steps)
  }

  const delayedQuery = useCallback(
    _.debounce(q => dispatch(SearchIngredient.get({ search: q })), 500),
    []
  )

  const searchIngres = text => {
    delayedQuery(text)
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
    const ingredients = values.ingredients.map(item => {
      const tmp = { ...item, ...item.unit[item.selectUnit] }
      delete tmp.unit
      return tmp
    })
    console.log({ ...values, avatar: avalink, steps, ingredients })
    // dispatch(
    //   CreateRecipe.get({
    //     ...values,
    //     ingredients: values.ingredients.join('|'),
    //     categories: values.categories.join('|'),
    //     userId: user?.id,
    //     ration: values.ration.toString()
    //   })
    // )
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
          cookingTime: 20,
          difficultLevel: 1,
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
          console.log(errors)
          console.log(values)

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
                  {t('create.add')}
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
                  {t('create.add')}
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
                      <div>
                        <Title level={4}>
                          {t('create.title').toLocaleUpperCase()}
                        </Title>
                        <CInput
                          style={{
                            maxWidth: 400,
                            width: 250,
                            ...style.border
                          }}
                          className="inputBox"
                          value={values.title}
                          onChange={handleChange('title')}
                          onTouchStart={() => setFieldTouched('title')}
                          onBlur={handleBlur('title')}
                          placeholder={t('create.titlePlaceholder')}
                          error={errors.title}
                        />
                      </div>
                      <div>
                        <Title level={4}>
                          {t('create.level').toLocaleUpperCase()}
                        </Title>
                        <CInput
                          style={{ maxWidth: 160, ...style.border }}
                          className="inputBox"
                          value={values.difficultLevel}
                          onChange={handleChange('difficultLevel')}
                          onTouchStart={() => setFieldTouched('difficultLevel')}
                          onBlur={handleBlur('difficultLevel')}
                          placeholder={t('create.titlePlaceholder')}
                          error={errors.difficultLevel}
                        />
                      </div>
                      <div>
                        <Title level={4}>
                          {t('create.time').toLocaleUpperCase()}
                        </Title>
                        <div style={style.spaceBetween}>
                          <CInput
                            style={{ maxWidth: 100, ...style.border }}
                            className="inputBox"
                            value={values.cookingTime}
                            onChange={handleChange('cookingTime')}
                            onTouchStart={() => setFieldTouched('cookingTime')}
                            onBlur={handleBlur('cookingTime')}
                            placeholder={'200'}
                            error={errors.cookingTime}
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
                      {CATEGORY_ITEMS.map((item, index) => (
                        <Option value={item} key={`category${index}`}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <ImageUpload
                    style={{ flex: 1, padding: 24 }}
                    value={values.avatar}
                    onChange={data => setFieldValue('avatar', data)}
                  />
                </div>
              )}
              {currentStep === 1 && (
                <div style={{ display: 'flex' }}>
                  <div style={style.leftColumn}>
                    <Title level={4}>
                      {t('create.ingredients').toLocaleUpperCase()}
                    </Title>
                    <CInput
                      className="inputBox"
                      onChange={event => searchIngres(event.target.value)}
                      placeholder={t('create.ingredientsPlaceholder')}
                    />
                    <div style={{ ...style.ingres, padding: 0 }}>
                      {ingredients.map((item, index) => (
                        <Ingredient
                          index={index}
                          item={item}
                          isAdd={true}
                          onAdd={value => {
                            let ingres = values.ingredients
                            ingres.push(value)
                            setFieldValue('ingredients', ingres)
                          }}
                        />
                      ))}
                    </div>
                    <Title level={4}>
                      {t('create.otherIngredients').toLocaleUpperCase()}
                    </Title>
                    <CInput
                      className="inputBox"
                      onChange={event => setOtherIngre(event.target.value)}
                      placeholder={t('create.otherIngredientsPlaceholder')}
                    />
                    <Button
                      type="primary"
                      onClick={() => {
                        let ingres = values.ingredients
                        ingres.push({
                          img: null,
                          name: otherIngre,
                          unit: [{ measurement_description: 'g' }]
                        })
                        setFieldValue('ingredients', ingres)
                      }}
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
                        />
                      ))}
                  </div>
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
                      onChangeImage={data =>
                        addPictureStep(values.steps, index, data, setFieldValue)
                      }
                      onChangeMaking={data => {
                        let steps = values.steps
                        steps[index].content = data
                        setFieldValue('steps', steps)
                      }}
                      onChangeTime={data => {
                        let steps = values.steps
                        steps[index].time = data
                        setFieldValue('steps', steps)
                      }}
                    />
                  ))}

                  <Button
                    type="primary"
                    onClick={() => {
                      setFieldValue('steps', [
                        ...values.steps,
                        {
                          content: ''
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
