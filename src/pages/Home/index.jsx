import { Button, Col, Row, Tabs } from 'antd'
import Text from 'antd/lib/typography/Text'
import AppFooter from 'components/Footer'
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
      <div>
        <div className="search-banner">
          <div className="header-fluid">
            <div className="text-banner">
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: 'white',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {t('home.title1')}
              </Text>
              <div>
                {!user && (
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginTop: 20 }}
                    onClick={() => {
                      history.push({
                        pathname: '/signin',
                        state: { from: `/` }
                      })
                    }}
                  >
                    {t('home.tryItOut')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body-container">
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
                  fontWeight: 700,
                  color: currentTab === '1' ? COLOR.primary1 : ''
                }}
              >
                {t('home.recommend').toLocaleUpperCase()}
              </Text>
            }
            key="1"
          >
            {recommend && recommend?.length > 0 ? (
              <Row gutter={[16, 16]} justify="start" style={{ marginTop: 20 }}>
                {recommend.map(recipe => (
                  <Col span={4} xs={24} md={12} lg={8} sm={24} xl={6} xxl={6}>
                    <Row justify="center">
                      <RecipeItem recipe={recipe} />
                    </Row>
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
                  fontWeight: 700,
                  color: currentTab === '2' ? COLOR.primary1 : ''
                }}
              >
                {t('home.whatToEat').toLocaleUpperCase()}
              </Text>
            }
            key="2"
          >
            {highlight && highlight?.length > 0 ? (
              <Row gutter={[16, 16]} justify="start" style={{ marginTop: 20 }}>
                {highlight.map(recipe => (
                  <Col span={4} xs={24} md={12} lg={8} sm={24} xl={6} xxl={6}>
                    <Row justify="center">
                      <RecipeItem recipe={recipe} />
                    </Row>
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
      <AppFooter />
    </>
  )
}

export default Home
