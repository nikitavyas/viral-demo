import React, { Component } from 'react';
import axios from './../axios'
import { Link } from 'react-router-dom';

import {
    Card, CardBody, Button, Col, Row, Table, Pagination, Label, InputGroup, Input,
    Form, FormGroup, PaginationItem, PaginationLink, InputGroupAddon
} from 'reactstrap';

class Info extends Component {
    state = {
        productdata: [],
        currentPage: 0,
        pageCount: '',
    }
    pageSize = 3;
    productId = ''
    componentDidMount() {
        this.productId = this.props.match.params.id;
        if (this.productId) {
            this.getProductData();
        }
    }
    getProductData = () => {
        axios.get('/product/user-getproductbyid/' + this.productId).then((res) => {
            this.setState({ productdata: res.data })
            console.log(this.state.productdata, 'dd')
        }).catch((err) => {
            console.log(err);
        });
    }
    // onGetProductList = () => {
    //     axios.get('/product/getproduct?limit=' + this.pageSize + '&&page=' + this.state.currentPage + '&sortBy=product_name:desc&&search=')
    //         .then(response => {
    //             this.setState({
    //                 product: response.data.data,
    //                 pageCount: Math.ceil(response.data.total / this.pageSize)
    //             })
    //             console.log(this.state.product, 'rrr')

    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }
    // handleClick(e, index) {
    //     e.preventDefault();
    //     this.setState({ currentPage: index }, () => {
    //         this.onGetProductList();
    //     });
    // }
  
      addToCart(id){
        if(localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') == 'null'|| localStorage.getItem('token') == null){
          this.props.history.push('/login')
        } else {
          axios.post('cart/add-cart/' + id).then(res => {
            console.log(res)
          }).catch(error => {
            console.log(error);
          });
        }
       
      }

    render() {
        const { currentPage } = this.state;
        return (
            <div className="view-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div>
                                <div className="thumbnail">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img className="img-thumbnail" src={this.state.productdata.product_pic} alt="Pic" />
                                        </div>
                                        <div className="col-md-6"><div className="column">
                                            <div className="ab-details-title">
                                                <p> CPU </p>
                                            </div>
                                            <div className="ab-details-info">
                                                <p>1.3GHz </p>
                                            </div>
                                        </div>
                                            <div className="column">
                                                <div className="ab-details-title">
                                                    <p>CEMERA</p>
                                                </div>
                                                <div className="ab-details-info">
                                                    <p>8MP (3264*2448)</p>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="ab-details-title">
                                                    <p>SIZE</p>
                                                </div>
                                                <div className="ab-details-info">
                                                    <p>
                                                    {this.state.productdata.size}
                                   </p>
                                                </div>
                                                <div className="column">
                                                    <div className="ab-details-title">
                                                        <p>
                                                        COLOR</p>
                                                    </div>
                                                    <div className="ab-details-info">
                                                        <p> {this.state.productdata.color}</p>
                                                    </div>
                                                </div>
                                                <div className="column">
                                                    <div className="ab-details-title"
                                                    ><p>WARRANTY</p>
                                                    </div>
                                                    <div className="ab-details-info"><p>{this.state.productdata.warranty}</p>
                                                    </div></div><div className="column">
                                                    <div className="ab-details-title">
                                                        <p>BATTERY</p>
                                                    </div>
                                                    <div className="ab-details-info">
                                                        <p>1480 mAh</p>
                                                    </div>
                                                </div>
                                                <div className="column">
                                                    <div className="ab-details-title">
                                                        <p>
                                                        MEMORY </p>
                                                    </div><div className="ab-details-info">
                                                        <p>16GB, 32GB and RAM 1 GB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="caption-full">
                                            <h4 className="pull-right">{this.state.productdata.price}</h4>
                                            <h4>{this.state.productdata.product_name}</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies lorem odio, at laoreet tellus sodales in. Nullam maximus eros ut tortor ultricies rutrum. Aliquam euismod lacus non est egesta</p>
                                        </div>
                            </div>

                        </div>
                        <div className="col-md-3"><div>
                            <div>
                                <p className="lead"> Quick Shop</p>
                                <div className="cart">
                                    <div className="dropdown">
                                    <Link to={'/cart'}>
                                        <a id="dLabel" className="btn btn-inverse btn-block btn-large">
                                            <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h1>{this.state.productdata.product_name}</h1>
                                    <h2>Price : {this.state.productdata.price}</h2>
                                </div>
                            </div>
                            <Link className="btn btn-info btn-block" to={'/home'}>Back to Store</Link>
                            <button onClick={() => this.addToCart(this.state.productdata._id)} type="button" className="btn btn-success btn-block">Add To Cart</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info;