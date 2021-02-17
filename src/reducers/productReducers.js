import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_FOOD,
} from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_FOOD:
      return {
        ...state,
        selectedfood: action.payload.selectedfood,
        filteredItems: action.payload.items,
        page: action.payload.page
      };

    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};
