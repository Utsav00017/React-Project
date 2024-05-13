import React from 'react';
import { ADD_TO_CART,REMOVE_ITEM_TO_CART} from '../Reducer/Constant';

export const addToCart = (data) => {
    console.log("Action : ",data) 
    return {
        type: ADD_TO_CART,
        data: data 
    }
}

export const removeitemToCart = (data) => {
    debugger
    return {
        type: REMOVE_ITEM_TO_CART,
        data: data
    }

}
