import React from 'react'
import HeaderComponent from '../components/HeaderComponent';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
})
const mapStateToProps = (state) => ({
    data:state.cartItems
})

export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent);