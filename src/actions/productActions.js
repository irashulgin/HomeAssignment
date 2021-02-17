import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_FOOD } from "../types";
export const fetchProducts = (page) => async (dispatch) => {
  console.log(page);
  debugger;
  try {
    const res = await fetch(`https://api.punkapi.com/v2/beers?page=${page + 1}&per_page=12`);
    let data = [];
    if (res.status === 200) {
      data = await res.json();
    }

    console.log(data);
    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });


  } catch (error) {
    console.log(error);
  }
};

export const filterProducts = (products, selectedfood, page) => async (dispatch) => {
  let url;
  if (selectedfood !== "") {
    url = `https://api.punkapi.com/v2/beers?food=${selectedfood}&page=${page + 1}&per_page=12`
  } else {
    url = `https://api.punkapi.com/v2/beers?page=1&per_page=12`
  }
  try {
    debugger;
    const res = await fetch(url);
    // const res = await fetch(`https://api.punkapi.com/v2/beers?food=${selectedfood}&page=${page+1}&per_page=12`);
    let data = [];
    if (res.status === 200) {
      data = await res.json();
    }
    console.log(data);

    dispatch({
      type: FILTER_PRODUCTS_BY_FOOD,
      payload: {
        selectedfood: selectedfood,
        items: data,
        page: page + 1
      },
    });
  } catch (error) {
    console.log(error);
  }

};

