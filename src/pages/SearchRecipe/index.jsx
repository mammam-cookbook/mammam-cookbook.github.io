import { Badge, Button, Col, Input, Pagination, Row, Select, Tabs } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import AppHeader from 'components/Header'
import RecipeItem from 'components/RecipeItem'
import { GetAllCategories } from 'pages/Dashboard/redux/actions'
import { GetFollower, GetFollowing } from 'pages/Profile/redux/actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiFilter, FiSearch, FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { COLOR, LIMIT_ITEMS } from 'ultis/functions'
import i18n from 'ultis/i18n'
import UserItem from './components/userItem'
import './index.css'
import { SearchRecipes, SearchUsers } from './redux/actions'

const { TabPane } = Tabs
const { Option } = Select
const COOKING_FILTER = [15, 20, 30, 45, 60, 120, 180, 240]

export default function SearchPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const user = useSelector(state => state.Auth.user)
  const categoryList = useSelector(state => state.Dashboard.categoryList)
  const [currentTab, setCurrentTab] = useState('ingredients')
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const [categoriesFilterItem, setCategoriesFilterItem] = useState([])
  const [ingredientsFilter, setIngredientsFilter] = useState([])
  const [ingredientsText, setIngredientsText] = useState('')
  const [noIngredientsFilter, setNoIngredientsFilter] = useState([])
  const [noIngredientsText, setNoIngredientsText] = useState('')
  const [timeFilter, setTimeFilter] = useState(-1)
  const [isShowFilter, setIsShowFilter] = useState(false)
  const [sortOrder, setSortOrder] = useState(null)
  const { isLoading, result, currentPage, totalItems, resultUser } =
    useSelector(state => state.Search)
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const searchText = query.get('search')

  const SORT_BY = [
    { title: t('search.relevance'), value: null },
    { title: t('search.newest'), value: 'createdOrder' },
    { title: t('search.popular'), value: 'reactionOrder' }
  ]

  useEffect(() => {
    dispatch(GetAllCategories.get())
    if (searchText) {
      dispatch(
        SearchRecipes.get({ search: searchText, limit: LIMIT_ITEMS, offset: 0 })
      )
      dispatch(SearchUsers.get({ keyword: searchText, limit: 3, offset: 0 }))
      dispatch(GetFollowing.get(user.id))
    }
  }, [searchText])

  const onSearch = (page, pageSize) => {
    let values = {
      search: searchText,
      limit: LIMIT_ITEMS,
      offset: (page - 1) * pageSize
    }
    if (categoriesFilter && categoriesFilter?.length > 0) {
      values['categories'] = categoriesFilter
    }
    dispatch(SearchRecipes.get(values))
  }

  const onFilter = (
    categories = [],
    ingredient = [],
    noIngredient = [],
    cookingTime,
    sort
  ) => {
    let values = {
      search: searchText,
      limit: LIMIT_ITEMS,
      offset: 0
    }
    if (categories && categories?.length > 0) {
      values['categories'] = categories
    }
    if (ingredient && ingredient?.length > 0) {
      values['ingredients'] = ingredient
    }
    if (sort) {
      values[sort] = 'DESC'
    } else if (sortOrder) {
      values[sortOrder] = 'DESC'
    }
    dispatch(SearchRecipes.get(values))
  }

  const onRemoveCategory = index => {
    let temp = categoriesFilter
    temp.splice(index, 1)
    let temp2 = categoriesFilterItem
    temp2.splice(index, 1)
    onFilter(temp, ingredientsFilter, noIngredientsFilter)
    setCategoriesFilter(temp)
    setCategoriesFilterItem(temp2)
  }

  function CategoryFilter(props) {
    const { item } = props
    const index = categoriesFilter?.findIndex(itemList => item.id === itemList)
    const isCheck = index > -1

    const onClick = () => {
      if (isCheck) {
        let temp = categoriesFilter
        temp.splice(index, 1)
        let temp2 = categoriesFilterItem
        temp2.splice(index, 1)
        onFilter(temp, ingredientsFilter, noIngredientsFilter)
        setCategoriesFilter(temp)
        setCategoriesFilterItem(temp2)
      } else {
        let temp = categoriesFilter
        temp.push(item.id)
        let temp2 = categoriesFilterItem
        temp2.push(item)
        onFilter(temp, ingredientsFilter, noIngredientsFilter)
        setCategoriesFilter(temp)
        setCategoriesFilterItem(temp2)
      }
    }
    return (
      <Col md={6} lg={6} sm={8}>
        <Button
          type={isCheck ? 'link' : 'text'}
          onClick={() => onClick()}
          style={{ fontSize: 14 }}
        >
          {item[i18n.language]}
        </Button>
        {isCheck && <FiCheck size={20} color={COLOR.primary1} />}
      </Col>
    )
  }

  const renderCategoryFilter = list => {
    return (
      <Row gutter={[16, 24]}>
        {list &&
          list?.length > 0 &&
          list.map(item => <CategoryFilter item={item} />)}
      </Row>
    )
  }

  const handleKeyPressIngre = event => {
    if (event?.target?.defaultValue?.length > 0 && event.key === 'Enter') {
      let temp = ingredientsFilter
      temp.push(event?.target?.defaultValue)
      onFilter(categoriesFilter, temp, noIngredientsFilter)
      setIngredientsFilter(temp)
      setIngredientsText('')
    }
  }

  const handleKeyPressNoIngre = event => {
    if (event?.target?.defaultValue?.length > 0 && event.key === 'Enter') {
      let temp = noIngredientsFilter
      temp.push(event?.target?.defaultValue)
      onFilter(categoriesFilter, ingredientsFilter, temp)
      setNoIngredientsFilter(temp)
      setNoIngredientsText('')
    }
  }

  const onRemoveIngreFilter = index => {
    let temp = ingredientsFilter
    temp.splice(index, 1)
    onFilter(categoriesFilter, temp, noIngredientsFilter)
    setIngredientsFilter(temp)
  }

  const onRemoveNoIngreFilter = index => {
    let temp = noIngredientsFilter
    temp.splice(index, 1)
    onFilter(categoriesFilter, ingredientsFilter, temp)
    setNoIngredientsFilter(temp)
  }

  function IngredientFilter(props) {
    const { title, index, onClick } = props
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 4
        }}
      >
        <Text>{title}</Text>
        <Button
          type="link"
          onClick={() => onClick(index)}
          icon={<FiX size={20} color={COLOR.gray} />}
        />
      </div>
    )
  }

  const renderIngredientFilter = () => {
    return (
      <Row gutter={[16, 24]} style={{ width: '100%' }}>
        <Col md={12} lg={12} sm={24} style={styles.ingreCol}>
          <Input
            value={ingredientsText}
            onChange={event => setIngredientsText(event.target.value)}
            style={styles.inputStyle}
            onKeyPress={handleKeyPressIngre}
            placeholder={t('search.inputIngre')}
            suffix={<FiSearch size={20} color={COLOR.primary1} />}
          />
          {ingredientsFilter &&
            ingredientsFilter?.length > 0 &&
            ingredientsFilter.map((item, index) => (
              <IngredientFilter
                title={item}
                index={index}
                onClick={onRemoveIngreFilter}
              />
            ))}
        </Col>
        <Col md={12} lg={12} sm={24} style={styles.ingreCol}>
          <Input
            value={noIngredientsText}
            onChange={event => setNoIngredientsText(event.target.value)}
            style={styles.inputStyle}
            onKeyPress={handleKeyPressNoIngre}
            placeholder={t('search.inputWithoutIngre')}
            suffix={<FiSearch size={20} color={COLOR.primary1} />}
          />
          {noIngredientsFilter &&
            noIngredientsFilter?.length > 0 &&
            noIngredientsFilter.map((item, index) => (
              <IngredientFilter
                title={item}
                index={index}
                onClick={onRemoveNoIngreFilter}
              />
            ))}
        </Col>
      </Row>
    )
  }

  function FilterItem(props) {
    const { title, index, onClick } = props
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: 4
        }}
      >
        <Text>{title}</Text>
        <Button
          style={{ marginLeft: 4 }}
          type="link"
          onClick={() => onClick(index)}
          icon={<FiX size={20} color={COLOR.gray} />}
        />
      </div>
    )
  }

  const renderFilterBtn = () => {
    return (
      <>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 8
          }}
        >
          <div style={{ display: 'flex' }}>
            <Button
              icon={
                <FiFilter
                  size={20}
                  color={isShowFilter ? COLOR.primary1 : 'black'}
                />
              }
              type="text"
              onClick={() => setIsShowFilter(!isShowFilter)}
            >
              {t('search.filter')}
            </Button>
            <Button
              type="link"
              onClick={() => {
                setIngredientsFilter([])
                setNoIngredientsFilter([])
                setCategoriesFilter([])
                setCategoriesFilterItem([])
                setTimeFilter(-1)
              }}
            >
              {t('common.reset')}
            </Button>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                width: '100%'
              }}
            >
              {ingredientsFilter.map((item, index) => (
                <FilterItem
                  title={`${t('search.with')} ${item}`}
                  index={index}
                  onClick={index => onRemoveIngreFilter(index)}
                />
              ))}
              {noIngredientsFilter.map((item, index) => (
                <FilterItem
                  title={`${t('search.without')} ${item}`}
                  index={index}
                  onClick={index => onRemoveNoIngreFilter(index)}
                />
              ))}
              {categoriesFilterItem.map((item, index) => (
                <FilterItem
                  title={`${item[i18n.language]}`}
                  index={index}
                  onClick={index => onRemoveCategory(index)}
                />
              ))}
              {timeFilter > 0 && (
                <FilterItem
                  title={
                    timeFilter < 60
                      ? `<${timeFilter} ${t('create.min')}`
                      : `<${timeFilter / 60} ${t('search.hour')}`
                  }
                  index={0}
                  onClick={index => setTimeFilter(-1)}
                />
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text
              style={{ fontWeight: 700, color: COLOR.grayText, marginRight: 8 }}
            >
              {t('search.sortBy')}
            </Text>
            <Select
              style={{ fontWeight: 700 }}
              defaultValue={null}
              onChange={value => {
                setSortOrder(value)
                onFilter(
                  categoriesFilter,
                  ingredientsFilter,
                  noIngredientsFilter,
                  timeFilter,
                  value
                )
              }}
            >
              {SORT_BY.map(item => (
                <Option value={item.value}>{item.title}</Option>
              ))}
            </Select>
          </div>
        </div>
        <div
          style={{ width: '100%', height: 1, backgroundColor: COLOR.gray }}
        />
      </>
    )
  }

  const renderFilter = () => {
    return (
      <Tabs
        style={{ flex: 1 }}
        size="large"
        activeKey={currentTab}
        onChange={key => setCurrentTab(key)}
      >
        <TabPane
          tab={
            <Badge
              offset={[10, 0]}
              count={ingredientsFilter.length + noIngredientsFilter.length}
            >
              <Text
                style={{
                  fontWeight: currentTab === 'ingredients' ? 700 : 500,
                  color: currentTab === 'ingredients' ? COLOR.primary1 : ''
                }}
              >
                {t('create.ingredients').toLocaleUpperCase()}
              </Text>
            </Badge>
          }
          key="ingredients"
        >
          {renderIngredientFilter()}
        </TabPane>
        {categoryList &&
          categoryList?.length > 0 &&
          categoryList.map(item => (
            <TabPane
              tab={
                <Badge
                  offset={[10, 0]}
                  count={
                    categoriesFilterItem.filter(
                      filterItem => filterItem.parent_category_id === item.id
                    ).length
                  }
                >
                  <Text
                    style={{
                      fontWeight: currentTab === item.id ? 700 : 500,
                      color: currentTab === item.id ? COLOR.primary1 : ''
                    }}
                  >
                    {item[i18n.language].toLocaleUpperCase()}
                  </Text>
                </Badge>
              }
              key={item.id}
            >
              {renderCategoryFilter(item?.childrenCategories)}
            </TabPane>
          ))}

        <TabPane
          tab={
            <Badge offset={[10, 0]} count={timeFilter > 0 ? 1 : 0}>
              <Text
                style={{
                  fontWeight: currentTab === 'time' ? 700 : 500,
                  color: currentTab === 'time' ? COLOR.primary1 : ''
                }}
              >
                {t('create.time').toLocaleUpperCase()}
              </Text>
            </Badge>
          }
          key="time"
          style={{ padding: 24 }}
        >
          <Text>{t('search.cookingTimeLessThan')}</Text>
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexWrap: 'wrap',
              marginTop: 24
            }}
          >
            {COOKING_FILTER.map(item => (
              <Button
                type="default"
                style={{
                  ...styles.cookingBtn,
                  color: item === timeFilter ? COLOR.primary1 : null
                }}
                onClick={() => {
                  if (item === timeFilter) {
                    setTimeFilter(-1)
                  } else {
                    setTimeFilter(item)
                  }
                }}
              >
                {item < 60
                  ? `${item} ${t('create.min')}`
                  : `${item / 60} ${t('search.hour')}`}
              </Button>
            ))}
          </div>
        </TabPane>
      </Tabs>
    )
  }

  return (
    <>
      <AppHeader />
      <div className="search-banner">
        <div className="text-banner">
          <p className="text">Eat good</p>
          <p className="text">Feel good</p>
          {!user && (
            <Button
              className="button"
              onClick={() => {
                history.push({
                  pathname: '/signin',
                  state: { from: `/recipes?search=${searchText}` }
                })
              }}
            >
              {' '}
              Try it out
            </Button>
          )}
        </div>
      </div>
      <div className="body-container" style={{ paddingBottom: 64 }}>
        <Title level={3} style={{ marginTop: 48 }}>
          {searchText ? t('home.result') : 'BROWSE'}
        </Title>

        {resultUser && resultUser?.length > 0 && (
          <>
            <Title level={5} style={{ marginTop: 32 }}>
              {t('search.user')}
            </Title>
            <Row gutter={[16, 24]} style={{ marginTop: 16 }}>
              {resultUser.map(user => (
                <Col md={12} lg={8} sm={24}>
                  <UserItem user={user} />
                </Col>
              ))}
            </Row>
          </>
        )}

        <Title level={5} style={{ marginTop: 32, marginBottom: 16 }}>
          {t('home.recipes')}
        </Title>
        {result && result?.length > 0 && renderFilterBtn()}
        {isShowFilter && renderFilter()}

        {result && result?.length > 0 ? (
          <Row gutter={[16, 24]} style={{ marginTop: 32 }}>
            {result.map(recipe => (
              <Col md={12} lg={8} sm={24}>
                <RecipeItem recipe={recipe} />
              </Col>
            ))}
          </Row>
        ) : (
          <Text>{t('search.noResult')}</Text>
        )}
        {totalItems > 0 && (
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <Pagination
              style={{ marginTop: 48, alignSelf: 'center' }}
              defaultCurrent={currentPage}
              defaultPageSize={LIMIT_ITEMS}
              total={totalItems}
              onChange={onSearch}
            />
          </div>
        )}
      </div>
    </>
  )
}

const styles = {
  inputStyle: {
    display: 'flex',
    borderRadius: 10,
    borderColor: COLOR.primary1,
    marginBottom: 24
  },
  ingreCol: { paddingLeft: 48, paddingRight: 48 },
  cookingBtn: {
    marginRight: 16,
    boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.15)',
    borderRadius: 50,
    borderColor: 'transparent',
    marginBottom: 4
  }
}
