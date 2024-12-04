import React from 'react'
import HomeComponents from '../components/HomeComponents';
import { connect } from 'react-redux';
import { addToCart,removeitemToCart } from '../Services/Actions/Actions'

const mapDispatchToProps =  (dispatch) => ({
    addToCartHandler: data => dispatch(addToCart(data)), 
    removeitemToCartHandler: data => dispatch(removeitemToCart(data)),

})
const mapStateToProps = state => ({
    data:state.cartItems
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponents);