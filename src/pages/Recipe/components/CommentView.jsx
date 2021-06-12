import { Avatar, Button, Comment } from 'antd'
import GlobalModal from 'components/GlobalModal'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MODAL_TYPE } from 'ultis/functions'
import CommentSend from './CommentSend'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export default function CommentView(props) {
  const { comment, canReply, postId, padding } = props
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

  const actions = [
    canReply && (
      <Button size="small" type="link" onClick={onReply}>
        {t('recipe.reply')}
      </Button>
    ),
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
    <Button size="small" type="link" onClick={() => {}}>
      {'Upvote'}
    </Button>,
    user && user.id === comment?.author?.id && (
      <Button
        size="small"
        type="link"
        onClick={() =>
          GlobalModal.alertMessage(
            t('common.confirm'),
            t('recipe.confirmDeleteComment'),
            MODAL_TYPE.CHOICE,
            () => {}
          )
        }
      >
        {t('recipe.delete')}
      </Button>
    )
  ]
  return (
    <div style={padding ? { paddingLeft: 60 } : {}}>
      <Comment
        actions={actions}
        author={<a>{comment?.author?.name}</a>}
        avatar={
          comment?.author?.avatar_url ? (
            <Avatar
              size={'large'}
              // style={{ backgroundColor: 'red' }}
              src={comment?.author?.avatar_url}
              alt={comment?.author?.name}
            />
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
