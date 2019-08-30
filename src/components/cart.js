import React, { Component } from 'react';
import axios from './../axios'
import { Link } from 'react-router-dom';

import {
    Card, CardBody, Button, Col, Row, Table, Pagination, Label, InputGroup, Input,
    Form, FormGroup, PaginationItem, PaginationLink, InputGroupAddon
} from 'reactstrap';

class Cart extends Component {
    state = {
        cartData: []
    }
   
    componentDidMount() {
        this.oncartList();
    }
    oncartList = () => {
        axios.get('/cart/get-cart').then((res) => {
            this.setState({ cartData: res.data.data , total : res.data.grandTotal })
        }).catch((err) => {
            console.log(err);
        });
    }
deleteproduct = (id) => {
    axios.delete('/cart/delete-cart/' + id).then((res) => {
        this.oncartList();
    }).catch((err) => {
        console.log(err);
    })
}
    render() {
        return (
            <div className="view-container">
                <div class="container">
                    <div class="row">
                        <div class="col-md-9">
                            <h4 className="text-center">Your Cart</h4>
                            <div>
                                <div class="table-responsive">
                                    <table class="table-bordered table-striped table-condensed cf">
                                        <tbody>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quntity</th>
                                                <th>Action</th>
                                            </tr>
                                            {this.state.cartData.length == 0 ? <tr><td></td><td></td><td></td><td>Your Cart Emty</td><td></td></tr> : <div></div>}
                                            {this.state.cartData.map((cart , index) => 
                                             <tr class="item-checout" key={index}>
                                             <td class="first-column-checkout">
                                                 <img class="img-thumbnail" src={cart.product_pic} alt="Samsung Galaxy S6" />
                                             </td>
                                             <td>{cart.product_name}</td>
                                             <td> {cart.price} </td>
                                             <td> {cart.qty} </td>
                                             <td><span class="delete-cart"> <button onClick={() => this.deleteproduct(cart._id)} ><i className="fa fa-trash"></i></button></span></td>
                                         </tr>
                                                )}
                                           
                                        </tbody>
                                    </table>
                                </div>
                                <div class="row">
                                    <div class="pull-right total-user-checkout">
                                        <b>Total:</b>{this.state.total}</div>
                                </div>
                            </div></div>
                        <div class="col-md-3 btn-user-checkout">
                            <div>
                                <a class="btn btn-info" href="/">
                                    <span class="glyphicon glyphicon-info-sign"></span>
                                    <span> Continue Shopping</span>
                                </a><div><button class="btn btn-danger">
                                    <span class="glyphicon glyphicon-trash">
                                    </span>
                                    Clean Cart</button>
                                    <button class="btn btn-success">
                                        <span class="glyphicon glyphicon-envelope">
                                        </span>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;