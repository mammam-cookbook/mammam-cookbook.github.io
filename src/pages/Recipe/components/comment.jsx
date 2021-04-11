import { Button, Typography } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CommentSend from './CommentSend'
import CommentView from './CommentView'

export default function RecipeComments(props) {
  const { comments, postId } = props
  const user = useSelector(state => state.Auth.user)
  const [isShowAll, setIsShowAll] = useState(false)
  const { t } = useTranslation()

  return (
    <div>
      {user ? (
        <CommentSend owner={user} postId={postId} />
      ) : (
        <Typography style={{ marginBottom: 16 }}>
          <Link
            to={{ pathname: '/signin', state: { from: `/recipe/${postId}` } }}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            {t('recipe.signinToComment')}
          </Link>
        </Typography>
      )}
      {comments && comments.length > 0 && isShowAll
        ? comments.map(item => (
            <CommentView
              key={item.id}
              postId={postId}
              comment={item}
              canReply={true}
            />
          ))
        : comments
            .slice(0, 5)
            .map(item => (
              <CommentView
                key={item.id}
                postId={postId}
                comment={item}
                canReply={true}
              />
            ))}
      {comments && comments.length > 5 && (
        <Button
          size="small"
          color="primary"
          onClick={() => setIsShowAll(!isShowAll)}
        >
          {isShowAll
            ? t('recipe.showLessComment')
            : t('recipe.showMoreComment')}
        </Button>
      )}
    </div>
  )
}
