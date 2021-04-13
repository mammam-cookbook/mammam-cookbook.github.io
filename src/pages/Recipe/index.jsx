import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Typography, Tabs } from 'antd'
import AppHeader from 'components/Header'
import moment from 'moment'
import { LEVEL } from 'pages/CreateRecipe/constant'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MetaTags from 'react-meta-tags'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useParams } from 'react-router-dom'
import { COLOR } from 'ultis/functions'
import RecipeComments from './components/comment'
import Direction from './components/direction'
import { GetDetailRecipe } from './redux/actions'

const { TabPane } = Tabs
const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
const { Text, Title } = Typography

const images = [
  'https://imgs.vietnamnet.vn/Images/2017/09/27/16/20170927161324-mon-ngon-thit-bo-2.jpg',
  'https://imgs.vietnamnet.vn/Images/2017/09/27/16/20170927161324-mon-ngon-thit-bo-2.jpg'
]

export default function RecipeDetail(props) {
  const params = useParams()
  const { id } = params // Recipe ID (The UUID was returned from API)
  const dispatch = useDispatch()
  const post = useSelector(state => state.Recipe.recipeDetail)
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState('0')
  console.log(post)

  useEffect(() => {
    dispatch(GetDetailRecipe.get({ recipeId: id }))
  }, [])

  const calcCalories = (accumulator, currentValue) =>
    accumulator + currentValue.calories

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

  return (
    <div className="container-fluid">
      <AppHeader />
      <MetaTags>
        <title>{post.title}</title>
        {post.description && (
          <meta name="description" content={post.description} />
        )}
        <meta property="og:title" content={post.title} />
        {post.avatar && post.avatar.length > 0 && (
          <meta property="og:image" content={post.avatar[0]} />
        )}
      </MetaTags>

      <div style={{ margin: 24 }}>
        <div style={styles.spaceBetween}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 4 }}>
            <Title level={2}>{post.title}</Title>
            <Text style={{ color: COLOR.grayText }}>
              {t('recipe.updatedBy').toLocaleUpperCase()} {post?.author?.name} |{' '}
              {moment(post.updatedAt).format('DD-MM-YYYY')}
            </Text>
            {post.categories && post.categories.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 24 }}>
                {post.categories.map(item => (
                  <Button
                    size="middle"
                    style={{ marginRight: 16, borderRadius: 50 }}
                    type="primary"
                    onClick={() => {}}
                  >
                    {item.category['vi']}
                  </Button>
                ))}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 24
              }}
            >
              <div style={styles.info}>
                <Text style={styles.grayInfo}>
                  {t('create.time').toLocaleUpperCase()}
                </Text>
                <Title style={{ color: COLOR.primary1 }} level={4}>
                  {post.cooking_time} {t('create.min')}
                </Title>
              </div>
              <div style={styles.info}>
                <Text style={styles.grayInfo}>
                  {t('create.level').toLocaleUpperCase()}
                </Text>
                <Title style={{ color: COLOR.primary1 }} level={4}>
                  {LEVEL.filter(
                    item => item.code === post.level
                  )[0].title.toLocaleUpperCase()}
                </Title>
              </div>
              <div style={styles.info}>
                <Text style={styles.grayInfo}>
                  {t('create.ration').toLocaleUpperCase()}
                </Text>
                <Title style={{ color: COLOR.primary1 }} level={4}>
                  {post.ration}
                </Title>
              </div>
              <div style={styles.info}>
                <Text style={styles.grayInfo}>
                  {t('recipe.energy').toLocaleUpperCase()}
                </Text>
                <Title style={{ color: COLOR.primary1 }} level={4}>
                  {(post?.ingredients?.reduce(calcCalories, 0) / 1000).toFixed(
                    0
                  )}{' '}
                  KCAL
                </Title>
              </div>
            </div>

            <div style={{ ...styles.spaceBetween, marginTop: 24 }}>
              <Button
                size="large"
                style={{ flex: 1, marginRight: 24 }}
                type="primary"
                onClick={() => {}}
              >
                {t('recipe.readDirection').toLocaleUpperCase()}
              </Button>
              <Button
                size="large"
                style={{ flex: 1, marginLeft: 24 }}
                type="primary"
                onClick={() => {}}
              >
                {t('recipe.iMadeIt').toLocaleUpperCase()}
              </Button>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flex: 3,
              marginLeft: 24
            }}
          >
            {post.avatar && post.avatar.length > 0 && (
              <Carousel>
                {images.map((item, index) => (
                  <div>
                    <img src={item} alt="" />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Text style={{ textAlign: 'justify' }}>{post.description}</Text>
        </div>

        <div style={{ marginTop: 24 }}>
          <Tabs
            centered
            size="large"
            activeKey={currentTab}
            onChange={key => setCurrentTab(key)}
          >
            <TabPane tab={t('recipe.comment').toLocaleUpperCase()} key="0">
              {post.comments && post.comments.length > 0 ? (
                <RecipeComments comments={post.comments} postId={post.id} />
              ) : (
                <Text>{t('recipe.noComments')}</Text>
              )}
            </TabPane>
            <TabPane tab={t('create.ingredients').toLocaleUpperCase()} key="1">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                {post.ingredients.map(item => (
                  <Text style={{ fontWeight: 600 }}>
                    {item.amount} {item.unit.measurement_description}{' '}
                    {item.name}
                  </Text>
                ))}
              </div>
            </TabPane>
            <TabPane tab={t('create.direction').toLocaleUpperCase()} key="2">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {post.steps.map((item, index) => (
                  <Direction item={item} index={index + 1} />
                ))}
              </div>
            </TabPane>
            <TabPane tab={t('recipe.challenge').toLocaleUpperCase()} key="3">
              {t('recipe.noChallenges')}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

const styles = {
  info: {
    textAlign: 'center'
  },
  spaceBetween: { display: 'flex', justifyContent: 'space-between' },
  imageSrc: {
    width: 400,
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: 100
  },
  grayInfo: { color: COLOR.grayText, fontWeight: 600 }
}
