import {
  GetHomeRecipe,
  GetHomeRecipeFailed,
  GetHomeRecipeSuccess
} from './actions'
const initialState = {
  isLoading: false,
  recommend: [],
  highlight: []
}

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GetHomeRecipe.type:
      return { ...state, isLoading: true }
    case GetHomeRecipeSuccess.type:
      return {
        ...state,
        recommend:
          action.payload?.type === 1 ? action.payload?.data : state.recommend,
        highlight:
          action.payload?.type === 2 ? action.payload?.data : state.highlight,
        isLoading: false
      }
    case GetHomeRecipeFailed.type:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
