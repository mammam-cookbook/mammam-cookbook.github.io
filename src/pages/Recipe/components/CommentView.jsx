import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Comment } from 'antd'
import GlobalModal from 'components/GlobalModal'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, MODAL_TYPE } from 'ultis/functions'
import { DeleteComment, UpvoteComment } from '../redux/actions'
import CommentSend from './CommentSend'

export default function CommentView(props) {
  const { comment, canReply, postId, padding, key } = props
  const user = useSelector(state => state.Auth.user)
  const [isShowReply, setIsShowReply] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()

  const onReply = () => {
    if (user) {
      setIsShowReply(true)
    } else {
      GlobalModal.alertMessage(
        t('common.confirm'),
        t('recipe.notSignIn'),
        MODAL_TYPE.CHOICE,
        () =>
          history.push({
            pathname: '/signin',
            state: { from: `/recipe/${postId}` }
          })
      )
    }
  }

  const onUpvoted = () => {
    if (user) {
      dispatch(
        UpvoteComment.get({ recipe_id: postId, comment_id: comment?.id })
      )
    } else {
      GlobalModal.alertMessage(
        t('common.confirm'),
        t('recipe.notSignIn'),
        MODAL_TYPE.CHOICE,
        () =>
          history.push({
            pathname: '/signin',
            state: { from: `/recipe/${postId}` }
          })
      )
    }
  }

  const actions = [
    <Button
      icon={
        comment?.isUpvoted ? (
          <IoIosHeart
            size={20}
            color={COLOR.primary1}
            style={{ marginRight: 4, marginBottom: 2 }}
          />
        ) : (
          <IoIosHeartEmpty
            size={20}
            color={COLOR.primary1}
            style={{ marginRight: 4, marginBottom: 2 }}
          />
        )
      }
      size="small"
      type={comment?.isUpvoted ? 'link' : 'text'}
      onClick={onUpvoted}
    >
      {comment?.upvoteCount}
    </Button>,
    canReply && (
      <Button
        size="small"
        type="link"
        onClick={() => setIsShowReply(!isShowReply)}
      >
        {comment.childrenComments.length}{' '}
        {comment.childrenComments.length > 1
          ? t('recipe.replies')
          : t('recipe.oneReply')}
      </Button>
    ),
    canReply && (
      <Button size="small" type="link" onClick={onReply}>
        {t('recipe.reply')}
      </Button>
    ),
    user && user.id === comment?.author?.id && (
      <Button
        size="small"
        type="link"
        onClick={() =>
          GlobalModal.alertMessage(
            t('common.confirm'),
            t('recipe.confirmDeleteComment'),
            MODAL_TYPE.CHOICE,
            () => {
              dispatch(
                DeleteComment.get({ commentId: comment?.id, recipeId: postId })
              )
            }
          )
        }
      >
        {t('recipe.delete')}
      </Button>
    )
  ]
  return (
    <div key={`comment-${key}`} style={padding ? { paddingLeft: 60 } : {}}>
      <Comment
        actions={actions}
        author={
          <a
            onClick={() =>
              history.push(
                `/profile?page=${PROFILE_PAGE.RECIPE}&user=${comment?.author?.id}`
              )
            }
          >
            {comment?.author?.name}
          </a>
        }
        avatar={
          comment?.author?.avatar_url ? (
            <Avatar size={'large'} src={comment.author.avatar_url} />
          ) : (
            <Avatar size={'large'} icon={<UserOutlined />} />
          )
        }
        content={<p>{comment?.content}</p>}
      />
      {isShowReply && user && (
        <CommentSend
          padding={true}
          owner={user}
          postId={postId}
          parentComment={comment.id}
          style={{ margin: 0 }}
        />
      )}
      {isShowReply &&
        comment.childrenComments &&
        comment.childrenComments.length > 0 &&
        comment.childrenComments.map(item => (
          <CommentView
            padding={true}
            key={item.id}
            postId={postId}
            comment={item}
            canReply={false}
          />
        ))}
    </div>
  )
}
