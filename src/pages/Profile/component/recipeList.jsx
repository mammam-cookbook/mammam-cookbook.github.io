import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import RecipeItem from 'components/RecipeItem'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR } from 'ultis/functions'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary1 }} spin />
)

function RecipeListProfile() {
  const { recipes, isLoadingRecipe } = useSelector(state => state.Profile)
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
              <RecipeItem recipe={recipe} />
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
