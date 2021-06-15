import { Button, Col, Row, Tabs } from 'antd'
import Text from 'antd/lib/typography/Text'
import AppHeader from 'components/Header'
import RecipeItem from 'components/RecipeItem'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, history } from 'ultis/functions'
import '../../components/Header/header.css'
import './home.css'
import { GetHomeRecipe } from './redux/actions'
const { TabPane } = Tabs

function Home() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const user = useSelector(state => state.Auth.user)
  const { recommend, highlight } = useSelector(state => state.Home)
  const [currentTab, setCurrentTab] = useState('1')

  useEffect(() => {
    dispatch(GetHomeRecipe.get({ type: Number(currentTab) }))
  }, [currentTab])

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
                  state: { from: `/` }
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
        <Tabs
          style={{
            flex: 1,
            marginBottom: 40,
            marginTop: 8
          }}
          size="large"
          activeKey={currentTab}
          onChange={key => setCurrentTab(key)}
        >
          <TabPane
            tab={
              <Text
                style={{
                  fontWeight: currentTab === '1' ? 700 : 500,
                  color: currentTab === '1' ? COLOR.primary1 : ''
                }}
              >
                {t('home.recommend').toLocaleUpperCase()}
              </Text>
            }
            key="1"
          >
            {recommend && recommend?.length > 0 ? (
              <Row gutter={[16, 24]} style={{ marginTop: 20 }}>
                {recommend.map(recipe => (
                  <Col xs={24} md={12} lg={8} sm={24}  xl={6} xxl={4} >
                    <RecipeItem recipe={recipe} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div style={{ marginTop: 48 }}>
                <Text style={{ fontSize: 16 }}>{t('search.noResult')}</Text>
              </div>
            )}
          </TabPane>
          <TabPane
            tab={
              <Text
                style={{
                  fontWeight: currentTab === '2' ? 700 : 500,
                  color: currentTab === '2' ? COLOR.primary1 : ''
                }}
              >
                {t('home.whatToEat').toLocaleUpperCase()}
              </Text>
            }
            key="2"
          >
            {highlight && highlight?.length > 0 ? (
              <Row gutter={[16, 24]} style={{ marginTop: 20 }}>
                {highlight.map(recipe => (
                  <Col xs={24} md={12} lg={8} sm={24}  xl={6} xxl={4} >
                    <RecipeItem recipe={recipe} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div style={{ marginTop: 48 }}>
                <Text style={{ fontSize: 16 }}>{t('search.noResult')}</Text>
              </div>
            )}
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default Home
