import { Button, Col, Input, Pagination, Row } from 'antd'
import Title from 'antd/lib/typography/Title'
import AppHeader from 'components/Header'
import RecipeItem from 'components/RecipeItem'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { LIMIT_ITEMS } from 'ultis/functions'
import './index.css'
import { SearchRecipes } from './redux/actions'
const { Search } = Input
export default function SearchPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.Auth.user)
  const { isLoading, result, currentPage, totalItems } = useSelector(
    state => state.Search
  )
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const searchText = query.get('search')
  console.log(isLoading, result, currentPage, totalItems)

  useEffect(() => {
    if (searchText) {
      dispatch(
        SearchRecipes.get({ search: searchText, limit: LIMIT_ITEMS, offset: 0 })
      )
    }
  }, [])

  const onSearch = (page, pageSize) => {
    console.log('page', page, pageSize)
    dispatch(
      SearchRecipes.get({
        search: searchText,
        limit: LIMIT_ITEMS,
        offset: (page - 1) * pageSize
      })
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
          {searchText ? 'RESULT' : 'BROWSE'}
        </Title>
        <Row gutter={[16, 24]}>
          {result.map(recipe => (
            <Col md={12} lg={8} sm={24}>
              <RecipeItem recipe={recipe} />
            </Col>
          ))}
        </Row>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Pagination
            style={{ marginTop: 48, alignSelf: 'center' }}
            defaultCurrent={currentPage}
            defaultPageSize={LIMIT_ITEMS}
            total={totalItems}
            onChange={onSearch}
          />
        </div>
      </div>
    </>
  )
}
