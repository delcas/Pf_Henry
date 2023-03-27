import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_SERVICES = "GET_SERVICES";
export const SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME";
export const GET_PRODUCT_QUESTION = "GET_PRODUCT_QUESTION";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";


export const getProducts = ()=>{
    return async function(dispatch){
        const productsData = await axios.get(`/product`);
        const products = productsData.data
        dispatch({type: GET_PRODUCTS, payload: products});
    };
};

export const getServices = () => {
    return async function (dispatch) {
        const json = await axios.get(`/service`);
        const services = json.data
        dispatch({type: GET_SERVICES, payload: services});
    };
};

export const searchProductByName = (search) => {
    return async (dispatch) => {
      try {
        let json = await axios.get(`http://localhost:3001/product?name=${search}`);
        dispatch({ type: SEARCH_PRODUCT_BY_NAME, payload: json.data })
      }
      catch(error) {
        alert(`El producto "${search}" no existe, intenta con otro`)
      }
    }
  };

  export const getProductById = (ID) =>{
    return async function (dispatch) {
        const res = await axios.get(`/product/${ID}`)
        const details = res.data
        dispatch({type: GET_PRODUCT_BY_ID, payload: details});        
    };
};

export const getProductQuestions = ()=>{
    return async function(dispatch){
        const productQuestionData = await axios.get(`/questprod/product`); 
        const ProductQuestions = productQuestionData.data
        dispatch({type: GET_PRODUCT_QUESTION, payload: ProductQuestions});
    };
};