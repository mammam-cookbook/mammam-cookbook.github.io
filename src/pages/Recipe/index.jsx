import { LoadingOutlined } from '@ant-design/icons'
import {
  Affix,
  Button,
  Menu,
  Popover,
  Progress,
  Spin,
  Tabs,
  Typography
} from 'antd'
import * as easyData from 'assets/lottie/easy.json'
import * as hardData from 'assets/lottie/hard.json'
import * as yuckData from 'assets/lottie/yuck.json'
import * as yummyData from 'assets/lottie/yummy.json'
import AppHeader from 'components/Header'
import moment from 'moment'
import { LEVEL } from 'pages/CreateRecipe/constant'
import 'pages/Recipe/recipe.css'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiBookmark,
  FiFacebook,
  FiPrinter,
  FiSmile,
  FiUserPlus,
  FiX
} from 'react-icons/fi'
import Lottie from 'react-lottie'
import MetaTags from 'react-meta-tags'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { COLOR } from 'ultis/functions'
import ModalAddMenu from './components/addToMenu'
import RecipeComments from './components/comment'
import Direction from './components/direction'
import RecipeIngredient from './components/ingredient'
import { AddToShoppingList, GetDetailRecipe } from './redux/actions'

const { TabPane } = Tabs
const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
const { Text, Title } = Typography

const images = [
  'https://imgs.vietnamnet.vn/Images/2017/09/27/16/20170927161324-mon-ngon-thit-bo-2.jpg',
  'https://imgs.vietnamnet.vn/Images/2017/09/27/16/20170927161324-mon-ngon-thit-bo-2.jpg'
]

const REACT_ARRAY = [
  {
    loop: true,
    autoplay: true,
    animationData: easyData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  },
  {
    loop: true,
    autoplay: true,
    animationData: yummyData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  },
  {
    loop: true,
    autoplay: true,
    animationData: yuckData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  },
  {
    loop: true,
    autoplay: true,
    animationData: hardData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
]

export default function RecipeDetail(props) {
  const params = useParams()
  const { id } = params // Recipe ID (The UUID was returned from API)
  const dispatch = useDispatch()
  const post = useSelector(state => state.Recipe.recipeDetail)
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState('0')
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const history = useHistory()
  const [isShowSaveMenu, setIsShowSaveMenu] = useState(false)

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const readMode = query.get('readMode')
  const step = Number(query.get('step'))
  const [isCountdown, setIsCountdown] = useState(false)
  const [random, setRandom] = useState(Math.random())
  const [timerTime, setTimerTime] = useState('00:00')
  const [timer, setTimer] = useState(null)

  let timeLeft = 0

  console.log(post)

  useEffect(() => {
    dispatch(GetDetailRecipe.get({ recipeId: id }))
  }, [])

  const startTimer = timeCount => {
    timeLeft = timeCount * 60
    setIsCountdown(true)
    setTimerTime(moment.utc(timeLeft * 1000).format('HH:mm:ss'))
    if (!timer && timeLeft > 0) {
      setTimer(setInterval(countDown, 1000))
    }
  }

  const countDown = () => {
    // Remove one second, set state so a re-render happens.
    timeLeft = timeLeft - 1
    setTimerTime(moment.utc(timeLeft * 1000).format('HH:mm:ss'))
    // Check if we're at zero.
    if (timeLeft === 0) {
      clearInterval(timer)
      setTimer(null)
      setIsCountdown(false)
    }
  }

  const reactContent = (
    <div style={{ display: 'flex' }}>
      {REACT_ARRAY.map(item => (
        // <Button
        //   shape="circle"
        //   icon={<Lottie options={item} height={48} width={48} />}
        // />
        <Lottie
          options={item}
          height={48}
          width={48}
          isStopped={false}
          isPaused={false}
        />
      ))}
    </div>
  )

  const saveContent = (
    <Menu style={{ width: 200 }}>
      <Menu.Item key={'save_to_collection'} onClick={() => {}}>
        Lưu vào bộ sưu tập
      </Menu.Item>
      <Menu.Item
        key={'save_to_mealPlanner'}
        onClick={() => setIsShowSaveMenu(true)}
      >
        Thêm vào thực đơn
      </Menu.Item>
    </Menu>
  )

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
    <div>
      {!readMode && <AppHeader />}
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

      {!readMode && (
        <div
          style={{ marginTop: 48, paddingBottom: 60 }}
          className="body-container"
        >
          <div style={styles.spaceBetween} className="info-container">
            <div style={{ display: 'flex', flexDirection: 'column', flex: 4 }}>
              <Title level={2}>{post.title}</Title>
              <Text style={{ color: COLOR.grayText }}>
                {t('recipe.updatedBy').toLocaleUpperCase()} {post?.author?.name}{' '}
                | {moment(post.updatedAt).format('DD-MM-YYYY')}
              </Text>
              {post.categories && post.categories.length > 0 && (
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', marginTop: 24 }}
                >
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
                    {(
                      post?.ingredients?.reduce(calcCalories, 0) / 1000
                    ).toFixed(0)}{' '}
                    KCAL
                  </Title>
                </div>
              </div>

              <div style={{ ...styles.spaceBetween, marginTop: 24 }}>
                <Button
                  size="large"
                  style={{ flex: 1, marginRight: 24 }}
                  type="primary"
                  onClick={() =>
                    history.push(`/recipe/${id}?readMode=true&step=1`)
                  }
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

          <div style={{ marginTop: 24 }} className="row-container">
            <div className="side-col-container">
              <Popover
                content={reactContent}
                placement="topLeft"
                trigger="click"
              >
                <Button
                  style={styles.iconButton}
                  shape="circle"
                  icon={<FiSmile size={24} color={COLOR.primary2} />}
                />
              </Popover>

              <Popover
                content={saveContent}
                placement="topLeft"
                trigger="click"
              >
                <Button
                  style={styles.iconButton}
                  shape="circle"
                  icon={<FiBookmark size={24} color={COLOR.primary2} />}
                />
              </Popover>
              <Button
                style={styles.iconButton}
                shape="circle"
                icon={<FiUserPlus size={24} color={COLOR.primary2} />}
              />
              <Button
                style={styles.iconButton}
                shape="circle"
                icon={<FiFacebook size={24} color={COLOR.primary2} />}
              />
              <Button
                style={styles.iconButton}
                shape="circle"
                icon={<FiPrinter size={24} color={COLOR.primary2} />}
              />
            </div>
            <Affix offsetTop={72}>
              <div
                className="side-container"
                style={{
                  paddingRight: 48
                }}
              >
                <Popover content={reactContent} placement="topLeft">
                  <Button
                    style={styles.iconButton}
                    shape="circle"
                    icon={<FiSmile size={24} color={COLOR.primary2} />}
                  />
                </Popover>
                <Popover
                  content={saveContent}
                  placement="right"
                  trigger="click"
                >
                  <Button
                    style={styles.iconButton}
                    shape="circle"
                    icon={<FiBookmark size={24} color={COLOR.primary2} />}
                  />
                </Popover>

                <Button
                  style={styles.iconButton}
                  shape="circle"
                  icon={<FiUserPlus size={24} color={COLOR.primary2} />}
                />
                <Button
                  style={styles.iconButton}
                  shape="circle"
                  icon={<FiFacebook size={24} color={COLOR.primary2} />}
                />
                <Button
                  style={styles.iconButton}
                  shape="circle"
                  icon={<FiPrinter size={24} color={COLOR.primary2} />}
                />
              </div>
            </Affix>
            <Tabs
              style={{ flex: 5 }}
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
              <TabPane
                tab={t('create.ingredients').toLocaleUpperCase()}
                key="1"
              >
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}
                  >
                    {post.ingredients.map(item => (
                      <RecipeIngredient item={item} />
                    ))}
                  </div>
                  <Button
                    size="large"
                    style={{ marginTop: 24 }}
                    type="primary"
                    onClick={() =>
                      dispatch(AddToShoppingList.get({ recipe_id: id }))
                    }
                  >
                    Thêm vào danh sách mua
                  </Button>
                </>
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

            <Affix offsetTop={72}>
              <div
                style={{
                  paddingLeft: 24
                }}
                className="side-container"
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
                    {(
                      post?.ingredients?.reduce(calcCalories, 0) / 1000
                    ).toFixed(0)}{' '}
                    KCAL
                  </Title>
                </div>
              </div>
            </Affix>
          </div>
        </div>
      )}
      {readMode && step > 0 && step <= post.steps.length && (
        <div style={styles.readModeStyle}>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              right: 48,
              top: 24,
              zIndex: 11,
              justifyContent: 'flex-start'
            }}
          >
            <Button
              size="large"
              style={{ marginRight: 16, borderRadius: 50 }}
              type="primary"
              onClick={() => {}}
            >
              {t('create.direction')}
            </Button>
            <Button
              size="large"
              style={{ marginRight: 16, borderRadius: 50 }}
              type="primary"
              onClick={() => {}}
            >
              {t('create.ingredients')}
            </Button>
            <Button
              size="middle"
              type="link"
              shape="circle"
              icon={<FiX size={40} color={COLOR.gray} />}
              onClick={() => history.replace(`/recipe/${id}`)}
            />
          </div>
          <div
            className="row-container"
            style={{ paddingLeft: 48, paddingRight: 48 }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {isCountdown ? (
                <Progress
                  width={300}
                  strokeColor={COLOR.primary1}
                  type="circle"
                  percent={
                    moment(timerTime, 'HH:mm:ss').diff(
                      moment().startOf('day'),
                      'seconds'
                    ) /
                    (Number(post.steps[step - 1].time) * 60)
                  }
                  format={percent => timerTime}
                />
              ) : (
                <img style={{ flex: 1 }} src={post.steps[step - 1].images[0]} />
              )}
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 24
              }}
            >
              <Title level={5}>
                {t('create.step')} {step}
              </Title>
              <Title level={3}>{post.steps[step - 1].content}</Title>
              <div style={{ marginTop: 48 }}>
                {post.steps[step - 1].time && (
                  <Button
                    size="large"
                    style={{ marginRight: 16, borderRadius: 50 }}
                    type="default"
                    onClick={
                      isCountdown
                        ? () => {
                            clearInterval(timer)
                            setTimerTime(
                              moment
                                .utc(Number(post.steps[step - 1].time) * 60000)
                                .format('HH:mm:ss')
                            )
                            setIsCountdown(false)
                            setTimer(null)
                          }
                        : () => startTimer(Number(post.steps[step - 1].time))
                    }
                  >
                    {isCountdown ? 'Dừng đếm' : 'Đếm giờ'}
                  </Button>
                )}
                {step < post.steps.length ? (
                  <Button
                    size="large"
                    style={{ marginRight: 16, borderRadius: 50 }}
                    type="primary"
                    onClick={() =>
                      history.replace(
                        `/recipe/${id}?readMode=true&step=${step + 1}`
                      )
                    }
                  >
                    {t('create.next')}
                  </Button>
                ) : (
                  <Button
                    size="large"
                    style={{ marginRight: 16, borderRadius: 50 }}
                    type="primary"
                    onClick={() => history.replace(`/recipe/${id}`)}
                  >
                    Xong
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isShowSaveMenu && (
        <ModalAddMenu
          recipeId={id}
          isShow={isShowSaveMenu}
          closeModal={() => setIsShowSaveMenu(false)}
        />
      )}
    </div>
  )
}

const styles = {
  info: {
    textAlign: 'center'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  imageSrc: {
    width: 400,
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: 100
  },
  grayInfo: { color: COLOR.grayText, fontWeight: 600 },
  iconButton: {
    marginBottom: 24,
    marginRight: 24,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: 60,
    height: 60,
    backgroundColor: 'white'
  },
  readModeStyle: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    display: 'flex'
  }
}
