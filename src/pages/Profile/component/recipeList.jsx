import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import GlobalModal from 'components/GlobalModal'
import RecipeItem from 'components/RecipeItem'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, MODAL_TYPE } from 'ultis/functions'
import { DeleteRecipe, GetRecipeOfUser } from '../redux/actions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function RecipeListProfile(props) {
  const { recipes, isLoadingRecipe, userProfile } = useSelector(
    state => state.Profile
  )
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const recipePopover = [
    {
      key: 'edit_recipe',
      title: t('profile.editRecipe'),
      onPress: recipeId => {
        console.log('edit', recipeId)
      }
    },
    {
      key: 'delete_recipe',
      title: t('profile.deleteRecipe'),
      onPress: recipeId => {
        GlobalModal.alertMessage(
          t('common.confirm'),
          t('profile.confirmToDeleteRecipe'),
          MODAL_TYPE.CHOICE,
          () => {
            dispatch(DeleteRecipe.get(recipeId))
          }
        )
      }
    }
  ]

  useEffect(() => {
    if (props?.userId) {
      dispatch(GetRecipeOfUser.get(props?.userId))
    }
  }, [])

  if (isLoadingRecipe) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    )
  }

  return (
    <div className="chooseContainer" style={{ paddingTop: 0 }}>
      <Title level={4}>{t('home.recipes')}</Title>
      {recipes && recipes?.length > 0 ? (
        <Row gutter={[16, 24]} style={{ marginTop: 32 }}>
          {recipes.map(recipe => (
            <Col md={12} lg={8} sm={24}>
              <RecipeItem
                recipe={recipe}
                showMoreBtn={user && user?.id === userProfile.id}
                popoverList={recipePopover}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Text>{t('search.noResult')}</Text>
      )}
    </div>
  )
}

export default RecipeListProfile
