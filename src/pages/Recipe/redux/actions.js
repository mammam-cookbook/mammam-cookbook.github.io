import { defineAction } from 'redux-typed-actions'

export const UpdateRecipe = defineAction('UPDATE_RECIPE')
export const UpdateRecipeSuccess = defineAction('UPDATE_RECIPE_SUCCESS')
export const UpdateRecipeFailed = defineAction('UPDATE_RECIPE_FAILED')

export const GetDetailRecipe = defineAction('GET_DETAIL_RECIPE')
export const GetDetailRecipeSuccess = defineAction('GET_DETAIL_RECIPE_SUCCESS')
export const GetDetailRecipeFailed = defineAction('GET_DETAIL_RECIPE_FAILED')

export const CommentPost = defineAction('COMMENT_POST')
export const CommentPostSuccess = defineAction('COMMENT_POST_SUCCESS')
export const CommentPostFailed = defineAction('COMMENT_POST_FAILED')

export const CommentChallengePost = defineAction('COMMENT_CHALLENGE_POST')
export const CommentChallengeSuccess = defineAction(
  'COMMENT_CHALLENGE_POST_SUCCESS'
)
export const CommentChallengeFailed = defineAction(
  'COMMENT_CHALLENGE_POST_FAILED'
)

export const DeleteComment = defineAction('DELETE_COMMENT')
export const DeleteCommentSuccess = defineAction('DELETE_COMMENT_SUCCESS')
export const DeleteCommentFailed = defineAction('DELETE_COMMENT_FAILED')

export const AddToShoppingList = defineAction('ADD_TO_SHOPPING_LIST')
export const AddToShoppingListSuccess = defineAction(
  'ADD_TO_SHOPPING_LIST_SUCCESS'
)
export const AddToShoppingListFailed = defineAction(
  'ADD_TO_SHOPPING_LIST_FAILED'
)

export const AddToMenu = defineAction('ADD_TO_MENU')
export const AddToMenuListSuccess = defineAction('ADD_TO_MENU_SUCCESS')
export const AddToMenuListFailed = defineAction('ADD_TO_MENU_FAILED')

export const ReactRecipe = defineAction('REACT_RECIPE')
export const ReactRecipeSuccess = defineAction('REACT_RECIPE_SUCCESS')
export const ReactRecipeFailed = defineAction('REACT_RECIPE_FAILED')

export const UpvoteComment = defineAction('UPVOTE_COMMENT')
export const UpvoteCommentSuccess = defineAction('UPVOTE_COMMENT_SUCCESS')
export const UpvoteCommentFailed = defineAction('UPVOTE_COMMENT_FAILED')

export const UpdateIsCountdown = defineAction('UPDATE_IS_COUNTDOWN')
