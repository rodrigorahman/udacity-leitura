export const UPDATE_CATEGORY_STORE = "UPDATE_CATEGORY_STORE";

export const updateCategoryStore = ({categories}) => {
  return {
    type: UPDATE_CATEGORY_STORE,
    categories
  }
}
