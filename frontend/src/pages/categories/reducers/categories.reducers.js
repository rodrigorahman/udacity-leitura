import { UPDATE_CATEGORY_STORE } from '../actions/category.actions'


export const categories = (state = {}, action) => {
  
  switch(action.type) {
    case UPDATE_CATEGORY_STORE:
      let { categories } = action;
      return {
        ...categories
      } 
    default: 
      return state;
  }
}