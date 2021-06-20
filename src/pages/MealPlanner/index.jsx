import { LoadingOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Select, Spin, Tabs } from 'antd'
import Text from 'antd/lib/typography/Text'
import AppHeader from 'components/Header'
import RecipeItem from 'components/RecipeItem'
import moment from 'moment'
import { DeleteRecipeInMenu, GetMenu } from 'pages/SignIn/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  calcCaloriesMenu,
  COLOR,
  MENU_SESSION,
  WEEK_COUNT
} from 'ultis/functions'

const { TabPane } = Tabs
const { Option } = Select
const { Panel } = Collapse

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

export default function MealPlanner() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const { isLoadingMenu, menu, user } = useSelector(state => state.Auth)

  const [startDate, setStartDate] = useState(
    moment().weekday(0).utcOffset(0).set({ hour: 0, minute: 0, second: 0 })
  )
  const [endDate, setEndDate] = useState(
    moment().weekday(6).utcOffset(0).set({ hour: 23, minute: 59, second: 59 })
  )

  useEffect(() => {
    if (!user) {
      history.replace('/')
    }
  }, [user])

  useEffect(() => {
    getMenu(startDate, endDate)
  }, [startDate, endDate])

  const getMenu = (start, end) => {
    dispatch(
      GetMenu.get({
        startDate: start?.unix(),
        endDate: end?.unix()
      })
    )
  }

  if (!user) {
    return (
      <>
        <AppHeader />
        <div
          className="body-container"
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            paddingTop: 48
          }}
        >
          <Spin indicator={loadingIcon} />
        </div>
      </>
    )
  }

  const LabelSession = ({ name, list }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={{ fontWeight: 600, fontSize: 16 }}>
          {name === MENU_SESSION[0]
            ? t('recipe.morning')
            : name === MENU_SESSION[1]
            ? t('recipe.lunch')
            : t('recipe.dinner')}
        </Text>
        <Text style={{ fontWeight: 600, color: COLOR.grayText }}>
          {list?.length}{' '}
          {list?.length > 1 ? t('profile.dishes') : t('profile.dish')} -{' '}
          {list?.reduce(calcCaloriesMenu, 0).toFixed(0)} kcal
        </Text>
      </div>
    )
  }

  const ListRecipeSession = ({ recipes, session }) => {
    const [isAdd, setIsAdd] = useState(false)
    if (!recipes || recipes?.length < 1) {
      return <Text>Chưa có bữa ăn</Text>
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {recipes?.map(item => (
          <RecipeItem
            recipe={item?.recipe}
            style={{ marginBottom: 8 }}
            showMoreBtn
            popoverList={[
              {
                key: 'delete_meal',
                title: t('profile.deleteRecipeInMealPlanner'),
                onPress: recipeId => {
                  dispatch(
                    DeleteRecipeInMenu.get({
                      id: item?.id,
                      start: startDate,
                      end: endDate
                    })
                  )
                }
              }
            ]}
          />
        ))}
      </div>
    )
  }

  const OneDayMenu = ({ list, date }) => {
    const breakfast = list?.filter(item => item.session === MENU_SESSION[0])
    const lunch = list?.filter(item => item.session === MENU_SESSION[1])
    const dinner = list?.filter(item => item.session === MENU_SESSION[2])
    return (
      <Col
        sm={24}
        md={12}
        lg={8}
        style={{
          padding: 2
        }}
      >
        <div
          style={{
            border: '2px solid #F38B12',
            width: '100%',
            padding: 16,
            display: 'flex',
            justifyContent: 'space-between',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10
          }}
        >
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            {date.format('ddd')}
          </Text>
          <Text
            style={{ fontWeight: 600, fontSize: 18, color: COLOR.primary1 }}
          >
            {list?.reduce(calcCaloriesMenu, 0).toFixed(0)} kcal
          </Text>
        </div>
        <Collapse
          defaultActiveKey={MENU_SESSION}
          ghost
          style={{ marginTop: 2 }}
        >
          <Panel
            header={<LabelSession list={breakfast} name={MENU_SESSION[0]} />}
            key={MENU_SESSION[0]}
            style={{ border: '2px solid #F38B12' }}
          >
            <ListRecipeSession recipes={breakfast} session={MENU_SESSION[0]} />
          </Panel>
          <Panel
            header={<LabelSession list={lunch} name={MENU_SESSION[1]} />}
            key={MENU_SESSION[1]}
            style={{ border: '2px solid #F38B12' }}
          >
            <ListRecipeSession recipes={lunch} session={MENU_SESSION[1]} />
          </Panel>
          <Panel
            header={<LabelSession list={dinner} name={MENU_SESSION[2]} />}
            key={MENU_SESSION[2]}
            style={{ border: '2px solid #F38B12' }}
          >
            <ListRecipeSession recipes={dinner} session={MENU_SESSION[2]} />
          </Panel>
        </Collapse>
      </Col>
    )
  }

  return (
    <>
      <AppHeader />
      <div className="container-fluid">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 32
          }}
        >
          <div>
            <Button
              style={{ marginRight: 16 }}
              onClick={() => {
                setStartDate(
                  moment()
                    .weekday(0)
                    .utcOffset(0)
                    .set({ hour: 0, minute: 0, second: 0 })
                )
                setEndDate(
                  moment()
                    .weekday(6)
                    .utcOffset(0)
                    .set({ hour: 23, minute: 59, second: 59 })
                )
              }}
            >
              {t('profile.today')}
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Button
              type="text"
              shape="circle"
              style={{ width: 40, height: 40, padding: 0 }}
              onClick={() => {
                setStartDate(startDate.clone().subtract(1, 'weeks'))
                setEndDate(endDate.clone().subtract(1, 'weeks'))
              }}
              icon={<FiChevronLeft size={28} color={COLOR.primary1} />}
            />
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              {startDate.format('DD/MM/YYYY')} - {endDate.format('DD/MM/YYYY')}
            </Text>
            <Button
              type="text"
              shape="circle"
              style={{ width: 40, height: 40, padding: 0 }}
              onClick={() => {
                setStartDate(startDate.clone().add(1, 'weeks'))
                setEndDate(endDate.clone().add(1, 'weeks'))
              }}
              icon={<FiChevronRight size={28} color={COLOR.primary1} />}
            />
          </div>
          <Button type="primary">{t('profile.recommendPlanner')}</Button>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            overflowX: 'scroll',
            marginTop: 24,
            marginBottom: 48
          }}
        >
          {WEEK_COUNT.map(wd => {
            const date = startDate.clone().weekday(wd)
            return (
              <OneDayMenu
                date={date}
                list={menu.filter(item => {
                  return date.isSame(item?.timestamp * 1000, 'day')
                })}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

const styles = {
  icon: {
    marginRight: 8,
    marginTop: -4
  }
}
