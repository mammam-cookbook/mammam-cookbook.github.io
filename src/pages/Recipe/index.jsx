import { LoadingOutlined } from '@ant-design/icons'
import {
  Affix,
  Button,
  Image,
  Menu,
  Popover,
  Progress,
  Spin,
  Tabs,
  Typography,
  Row,
  Col
} from 'antd'
import GlobalModal from 'components/GlobalModal'
import AppHeader from 'components/Header'
import moment from 'moment'
import 'pages/Recipe/recipe.css'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiBookmark,
  FiFacebook,
  FiPrinter,
  FiSmile,
  FiUserCheck,
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
import {
  calcCalories,
  COLOR,
  MODAL_TYPE,
  REACTION,
  REACTION_IMG
} from 'ultis/functions'
import ModalAddCollection from './components/addToCollection'
import ModalAddMenu from './components/addToMenu'
import RecipeComments from './components/comment'
import Direction from './components/direction'
import RecipeIngredient from './components/ingredient'
import {
  AddToShoppingList,
  GetDetailRecipe,
  ReactRecipe
} from './redux/actions'
import { FacebookShareButton } from 'react-share'
import ButtonBase from 'components/ButtonBase'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import { FollowUser, UnFollowUser } from 'pages/Profile/redux/actions'
import ModalMadeIt from './components/madeItModal'
import Challenge from './components/challengeView'

const easyData = require('assets/lottie/easy.json')
const hardData = require('assets/lottie/hard.json')
const yuckData = require('assets/lottie/yuck.json')
const yummyData = require('assets/lottie/yummy.json')

const { TabPane } = Tabs
const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
const { Text, Title } = Typography

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
  const user = useSelector(state => state.Auth.user)
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState('0')
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const history = useHistory()
  const [isShowSaveMenu, setIsShowSaveMenu] = useState(false)
  const [isShowMadeIt, setIsShowMadeIt] = useState(false)
  const [isShowSaveCollection, setIsShowSaveCollection] = useState(false)
  const [isShowPopover, setIsShowPopover] = useState(false)

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const readMode = query.get('readMode')
  const step = Number(query.get('step'))
  const [isCountdown, setIsCountdown] = useState(false)
  const [timerTime, setTimerTime] = useState('00:00')
  const [timer, setTimer] = useState(null)
  const isFollow = user
    ? user?.following?.findIndex(item => item.following_id === user.id) > -1
    : false
  const reaction = user
    ? post?.reactions?.find(item => item.author?.id === user?.id)
    : null

  let timeLeft = 0

  const LEVEL = {
    easy: t('create.easy'),
    medium: t('create.medium'),
    hard: t('create.hard')
  }

  useEffect(() => {
    dispatch(GetDetailRecipe.get({ recipeId: id }))
  }, [user])

  const onClickSave = () => {
    if (user) {
      setIsShowPopover(!isShowPopover)
    } else {
      GlobalModal.alertMessage(null, t('signin.title'), MODAL_TYPE.CHOICE, () =>
        history.push({ pathname: '/signin', state: { from: `/recipe/${id}` } })
      )
    }
  }

  const onClickFollow = () => {
    if (user) {
      if (isFollow) {
        dispatch(UnFollowUser.get(user.id))
      } else {
        dispatch(FollowUser.get(user.id))
      }
    } else {
      GlobalModal.alertMessage(null, t('signin.title'), MODAL_TYPE.CHOICE, () =>
        history.push({ pathname: '/signin', state: { from: `/recipe/${id}` } })
      )
    }
  }

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

  const reactToRecipe = react => {
    if (user) {
      dispatch(ReactRecipe.get({ recipe_id: id, react }))
    } else {
      GlobalModal.alertMessage(null, t('signin.title'), MODAL_TYPE.CHOICE, () =>
        history.push({ pathname: '/signin', state: { from: `/recipe/${id}` } })
      )
    }
  }

  const reactContent = (
    <div style={{ display: 'flex' }}>
      {REACT_ARRAY.map((item, index) => (
        <ButtonBase onClick={() => reactToRecipe(REACTION[index])}>
          <Lottie
            options={item}
            height={48}
            width={48}
            isStopped={false}
            isPaused={false}
          />
        </ButtonBase>
      ))}
    </div>
  )

  const saveContent = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        key={'save_to_collection'}
        onClick={() => {
          setIsShowPopover(false)
          setIsShowSaveCollection(true)
        }}
      >
        {t('recipe.addToCollection')}
      </Menu.Item>
      <Menu.Item
        key={'save_to_mealPlanner'}
        onClick={() => {
          setIsShowPopover(false)
          setIsShowSaveMenu(true)
        }}
      >
        {t('recipe.addToMenu')}
      </Menu.Item>
    </Menu>
  )
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ color: COLOR.grayText }}>
                  {t('recipe.updatedBy')}
                </Text>
                <Button
                  type="link"
                  onClick={() =>
                    history.push(
                      `/profile?page=${PROFILE_PAGE.RECIPE}&user=${post?.author?.id}`
                    )
                  }
                  style={{ fontWeight: 700, paddingLeft: 2, paddingRight: 2 }}
                >
                  {post?.author?.name}
                </Button>
                <Text style={{ color: COLOR.grayText }}>
                  | {moment(post.updatedAt).format('DD-MM-YYYY')}
                </Text>
              </div>

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
                  <Text style={styles.orangeInfo}>
                    {post.cooking_time} {t('create.min').toLocaleUpperCase()}
                  </Text>
                </div>
                <div style={styles.info}>
                  <Text style={styles.grayInfo}>
                    {t('create.level').toLocaleUpperCase()}
                  </Text>
                  <Text style={styles.orangeInfo}>
                    {LEVEL[post.level].toLocaleUpperCase()}
                  </Text>
                </div>
                <div style={styles.info}>
                  <Text style={styles.grayInfo}>
                    {t('create.ration').toLocaleUpperCase()}
                  </Text>
                  <Text style={styles.orangeInfo}>{post.ration}</Text>
                </div>
                <div style={styles.info}>
                  <Text style={styles.grayInfo}>
                    {t('recipe.energy').toLocaleUpperCase()}
                  </Text>
                  <Text style={styles.orangeInfo}>
                    {post?.ingredients?.reduce(calcCalories, 0).toFixed(0)} KCAL
                  </Text>
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
                  onClick={() => {
                    setIsShowMadeIt(true)
                  }}
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
                <Image.PreviewGroup>
                  <Carousel infiniteLoop autoPlay interval={3000} swipeable>
                    {post.avatar?.map((item, index) => (
                      <div>
                        <Image
                          src={item}
                          alt=""
                          height={300}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </Carousel>
                </Image.PreviewGroup>
              )}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            {post.description && post.description?.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginBottom: 24
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 50,
                    backgroundColor: COLOR.primary1,
                    borderTopRightRadius: 10
                  }}
                />
                <div>
                  <Title level={4} style={{ margin: 8 }}>
                    {t('create.summary').toLocaleUpperCase()}
                  </Title>
                  <div
                    style={{
                      height: 4,
                      width: '100%',
                      backgroundColor: COLOR.primary1
                    }}
                  />
                </div>
              </div>
            )}
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 18,
                fontWeight: 500
              }}
            >
              {post.description}
            </Text>
          </div>

          <div style={{ marginTop: 24 }} className="row-container">
            <div className="side-col-container">
              <Popover
                content={reactContent}
                placement="topLeft"
                trigger="click"
              >
                <Button
                  style={{
                    ...styles.iconButton,
                    backgroundColor: reaction ? COLOR.primary1 : 'white'
                  }}
                  shape="circle"
                  type="text"
                  icon={
                    reaction ? (
                      <img
                        src={REACTION_IMG[reaction?.react]}
                        alt=""
                        width={28}
                        height={28}
                      />
                    ) : (
                      <FiSmile size={24} color={COLOR.primary2} />
                    )
                  }
                />
              </Popover>

              {(!user || user?.id !== post?.user_id) && (
                <Button
                  style={styles.iconButton}
                  shape="circle"
                  type="text"
                  onClick={onClickFollow}
                  icon={
                    isFollow ? (
                      <FiUserCheck size={24} color={COLOR.primary2} />
                    ) : (
                      <FiUserPlus size={24} color={COLOR.primary2} />
                    )
                  }
                />
              )}
              <Popover
                content={saveContent}
                placement="topLeft"
                trigger="click"
                visible={isShowPopover}
              >
                <Button
                  style={styles.iconButton}
                  shape="circle"
                  type="text"
                  onClick={onClickSave}
                  icon={<FiBookmark size={24} color={COLOR.primary2} />}
                />
              </Popover>

              <FacebookShareButton
                style={{
                  ...styles.iconButton
                }}
                url={window.location.href}
              >
                <FiFacebook size={24} color={COLOR.primary2} />
              </FacebookShareButton>
              <Button
                style={styles.iconButton}
                shape="circle"
                type="text"
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
                    style={{
                      ...styles.iconButton,
                      backgroundColor: reaction ? COLOR.primary1 : 'white'
                    }}
                    shape="circle"
                    type="text"
                    icon={
                      reaction ? (
                        <img
                          src={REACTION_IMG[reaction?.react]}
                          alt=""
                          width={28}
                          height={28}
                        />
                      ) : (
                        <FiSmile size={24} color={COLOR.primary2} />
                      )
                    }
                  />
                </Popover>
                {(!user || user?.id !== post?.user_id) && (
                  <Button
                    style={styles.iconButton}
                    shape="circle"
                    type="text"
                    onClick={onClickFollow}
                    icon={
                      isFollow ? (
                        <FiUserCheck size={24} color={COLOR.primary2} />
                      ) : (
                        <FiUserPlus size={24} color={COLOR.primary2} />
                      )
                    }
                  />
                )}
                <Popover
                  content={saveContent}
                  placement="right"
                  trigger="click"
                  visible={isShowPopover}
                >
                  <Button
                    style={styles.iconButton}
                    shape="circle"
                    type="text"
                    onClick={onClickSave}
                    icon={<FiBookmark size={24} color={COLOR.primary2} />}
                  />
                </Popover>

                <FacebookShareButton
                  style={{
                    ...styles.iconButton
                  }}
                  url={window.location.href}
                >
                  <FiFacebook size={24} color={COLOR.primary2} />
                </FacebookShareButton>
                <Button
                  style={styles.iconButton}
                  shape="circle"
                  type="text"
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
                <RecipeComments comments={post.comments} postId={post.id} />
              </TabPane>
              <TabPane
                tab={t('create.ingredients').toLocaleUpperCase()}
                key="1"
              >
                <>
                  <Row gutter={[16, 24]} style={{ marginTop: 20 }}>
                    {post.ingredients.map(item => (
                      <Col md={12} lg={8} sm={24}>
                        <RecipeIngredient item={item} />
                      </Col>
                    ))}
                  </Row>
                  <Button
                    size="large"
                    style={{ marginTop: 24 }}
                    type="primary"
                    onClick={() =>
                      dispatch(AddToShoppingList.get({ recipe_id: id }))
                    }
                  >
                    {t('recipe.addToShoppingList')}
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
                {post?.challenges && post?.challenges?.length > 0 ? (
                  post?.challenges?.map((item, index) => (
                    <Challenge item={item} />
                  ))
                ) : (
                  <Text>{t('recipe.noChallenges')}</Text>
                )}
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
                  <Text style={styles.orangeInfo}>
                    {post.cooking_time} {t('create.min').toLocaleUpperCase()}
                  </Text>
                </div>
                <div style={styles.info}>
                  <Text style={styles.grayInfo}>
                    {t('create.level').toLocaleUpperCase()}
                  </Text>
                  <Text style={styles.orangeInfo}>
                    {LEVEL[post.level].toLocaleUpperCase()}
                  </Text>
                </div>
                <div style={styles.info}>
                  <Text style={styles.grayInfo}>
                    {t('create.ration').toLocaleUpperCase()}
                  </Text>
                  <Text style={styles.orangeInfo}>{post.ration}</Text>
                </div>
                <div style={styles.info}>
                  <Text style={styles.grayInfo}>
                    {t('recipe.energy').toLocaleUpperCase()}
                  </Text>
                  <Text style={styles.orangeInfo}>
                    {post?.ingredients?.reduce(calcCalories, 0).toFixed(0)} KCAL
                  </Text>
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
      <ModalAddMenu
        recipeId={id}
        isShow={isShowSaveMenu}
        closeModal={() => setIsShowSaveMenu(false)}
      />
      <ModalAddCollection
        recipeId={id}
        isShow={isShowSaveCollection}
        closeModal={() => setIsShowSaveCollection(false)}
      />
      <ModalMadeIt
        recipeId={id}
        isShow={isShowMadeIt}
        closeModal={() => setIsShowMadeIt(false)}
      />
    </div>
  )
}

const styles = {
  info: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20
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
  orangeInfo: { color: COLOR.primary1, fontWeight: 700, fontSize: 18 },
  iconButton: {
    marginBottom: 24,
    marginRight: 16,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60
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
