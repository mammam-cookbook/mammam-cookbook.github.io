import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { COLOR } from 'ultis/functions'
import { CommentPost } from '../redux/actions'

export default props => {
  const { owner, postId, padding } = props
  const dispatch = useDispatch()
  const [cmt, setCmt] = useState('')
  const { t } = useTranslation()
  const isValid = cmt && cmt.length > 0

  const handleKeyPress = event => {
    if (isValid && event.key === 'Enter') {
      comment()
    }
  }

  const comment = () => {
    dispatch(
      CommentPost.get({
        recipe_id: postId,
        status: 'Approved',
        images: [],
        parent_comment_id: props.parentComment ? props.parentComment : null,
        content: cmt
      })
    )
    setCmt('')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: padding ? 60 : 0
      }}
    >
      <div style={{ flex: 1 }}>
        {owner.avatar ? (
          <Avatar size={48} src={owner.avatar} />
        ) : (
          <Avatar size={48} icon={<UserOutlined />} />
        )}
      </div>

      <TextArea
        rows={2}
        style={{
          borderColor: COLOR.primary1,
          marginLeft: 12,
          marginRight: 24
        }}
        value={cmt}
        onChange={event => setCmt(event.target.value)}
        placeholder={t('recipe.commentPlaceholder')}
      />
      <Button type="primary" size="large" disabled={!isValid} onClick={comment}>
        {t('recipe.sendComment')}
      </Button>
    </div>
  )
}
