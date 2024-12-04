import React from 'react';
import { ADD_TO_CART,REMOVE_ITEM_TO_CART } from '../Reducer/Constant';


export default function cartItems(state = [], action) {
  
    
    console.log("Reducer : ",action) 

    var productData = [];

    switch (action.type) {
        case ADD_TO_CART:
            debugger
            var existProduct = state.obj1.some(item=>item.id === action.data.id);
            console.log(existProduct);
            if(!existProduct){
                productData = action.data.productData.map(item => item.id === action.data.id ? { ...item, stock: item.stock - 1 } : item);
                return {obj1:[...state.obj1,action.data],obj2:[productData]}

            }else{
                productData = state.obj2[0].map(item => item.id === action.data.id ? { ...item, stock: item.stock - 1 } : item);
                return {obj1:state.obj1.map(item => item.id === action.data.id ? { ...item, qty: item.qty + 1 } : item),obj2:[productData]}

            }
           
            break;
            case REMOVE_ITEM_TO_CART:
                var existProduct = state.obj1.some(item => item.id === action.data.id && item.qty > 1);
                var existSingleQty = state.obj1.some(item => item.id === action.data.id && item.qty === 1);

                if (existProduct && !action.data.flag) {
                    productData = action.data.productData.map(item => item.id === action.data.id ? { ...item, stock: item.stock + 1 } : item);
                    return { obj1: state.obj1.map(item => item.id === action.data.id ? { ...item, qty: item.qty - 1 } : item), obj2: [productData] }
                }
                else if (existSingleQty) {
                    productData = action.data.productData.map(item => item.id === action.data.id ? { ...item, stock: item.stock + 1 } : item);
                    return { obj1: state.obj1.filter(item => item.id !== action.data.id), obj2: [productData] }
                }else{
                   if(existProduct && action.data.flag == true){
                    productData = action.data.productData.map(item => item.id === action.data.id ? { ...item, stock: item.stock + state.obj1[0].qty } : item);
                   }else if(existProduct){
                    productData = action.data.productData.map(item => item.id === action.data.id ? { ...item, stock: item.stock + 1 } : item);
                   }else{
                    productData = action.data.productData.map(item => item.id === action.data.id ? { ...item, stock: item.stock } : item);
                   }
                    return { obj1: state.obj1.filter(item => item.id !== action.data.id), obj2: [productData] }
                }

                 break;

        default:
            return {obj1:state, obj2:productData};
    }
}
