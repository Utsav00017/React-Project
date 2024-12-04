import React from 'react';
import cartImage from '../cart.png';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function HeaderComponent(props){

    console.log(props.data.length)
    const uniqueProduct = [];
    props.data.obj1.forEach(element => {
        if(uniqueProduct.indexOf(element.id) === -1){
            uniqueProduct.push(element.id)
        }
    });

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        props.data.obj1.forEach(item => {
          totalPrice += item.qty * item.price;
        });
        return totalPrice;
      };
    
    
    return(
        <React.Fragment>
            <div className='add-to-cart'>
                <span className='cart-count'>{uniqueProduct.length}</span>
                <img src={cartImage}/>
            </div>

            <Table striped bordered hover variant='light' className='mt-3' style={{ width: '70%' }} cellPadding={5}>
                <tr>
                    <th className='td'>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Total Price</th>
                </tr>
                {props.data.obj1.map((item)=>
                        <tr>
                            <td>{item.title}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>{item.qty*item.price}</td>
                        </tr>
                    )}
                <tr>
            <td colSpan="3">Total:</td>
            <td>{calculateTotalPrice()}</td>
          </tr>
            </Table>
        </React.Fragment>
    )
}
export default HeaderComponent;