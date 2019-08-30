import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from './../axios'
import {
  Card, CardBody, Button, Col, Row, Table, Pagination, Label, InputGroup, Input,
  Form, FormGroup, PaginationItem, PaginationLink, InputGroupAddon
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {
  state = {
    product: [],
    currentPage: 0,
    pageCount: '',
    search: '',
    subscribe:'',
    brandlist: []
  }
  pageSize = 4;

  componentDidMount() {
    this.onGetProductList();
    this.ongetbrand();
  }

  onGetProductList = () => {
    axios.get('/product/user-getproduct?limit=' + this.pageSize + '&&page=' + this.state.currentPage + '&sortBy=product_name:desc&search=' + this.state.search)
      .then(response => {
        this.setState({
          product: response.data.data[0].data,
          pageCount: Math.ceil(response.data.data[0].metadata[0].total / this.pageSize)
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  ongetbrand = () => {
    axios.get('/brand/user-getbrand')
      .then(response => {
        this.setState({
          brandlist: response.data.data,
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick(e, index) {
    e.preventDefault();
    this.setState({ currentPage: index }, () => {
      this.onGetProductList();
    });
  }

  onsearch(name) {
    this.setState({ search: name });
    this.setState({ currentPage: 0 });
    setTimeout(
      function () {
        this.onGetProductList();
      }
        .bind(this),
      100
    )
  }

  submitsubscribe(){
    const data = {
      email:this.state.subscribe
    }
    axios.post('user/subscribe',data).then(res => {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      this.setState({subscribe:''})
    })
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  }

  handleSubscribeChange = (event) => {
    this.setState({subscribe:event.target.value})

  }

  addToCart(id) {
    if (localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') == 'null' || localStorage.getItem('token') == null) {
      this.props.history.push('/login')
    } else {
      axios.post('cart/add-cart/' + id).then(res => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    const { currentPage } = this.state;
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <header>

          <div id="header">
            <div class="container">
              <div class="row">
                <div class="col-md-3">
                  <div class="header-logo">
                    <a href="javascript:void(0)" class="logo">
                      <img src="/img/logo.png" alt="" />
                    </a>
                  </div>
                </div>

                {/* <div className="well blosd">
                <h3 className="lead">Quick Shop</h3>
                <div className="input-group">
                  <form>
                    <input type="text" onChange={this.handleSearchChange} value={this.state.search} className="form-control" />
                  </form>
                  <span className="input-group-btn">
                    <button onClick={() => this.onsearch(this.state.search)} className="btn btn-default">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div> */}

                <div class="col-md-6">
                  <div class="header-search">
                    <form style={{ float: "left" }}>
                      <select class="input-select">
                        <option value="0">All Categories</option>
                        <option value="1">Category 01</option>
                        <option value="1">Category 02</option>
                      </select>
                      <input class="input" type="text" onChange={this.handleSearchChange} value={this.state.search} placeholder="Search here" />

                    </form>
                    <button onClick={() => this.onsearch(this.state.search)} class="comman_form_button">Search</button>
                  </div>
                </div>
                <div class="col-md-3 clearfix">
                  <div class="header-ctn">
                    {/* <div>
                      <a href="#">
                        <i class="fa fa-heart-o"></i>
                        <span>Your Wishlist</span>
                        <div class="qty">2</div>
                      </a>
                    </div> */}
                    <div className="dropdown">
                      <a className="dropdown-toggle" data-toggle="cart-dropdown" aria-expanded="true">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span>Your Cart</span>
                        {/* <div class="qty">3</div> */}
                      </a>
                      <div className="cart-dropdown">
                        <div className="cart-list">
                          <div className="product-widget">
                            <div className="product-img">
                              <img src="./img/product01.png" alt="" />
                            </div>
                            <div className="product-body">
                              <h3 className="product-name"><a href="#">product name goes here</a></h3>
                              <h4 className="product-price"><span class="qty">1x</span>$980.00</h4>
                            </div>
                            <button class="delete"><i class="fa fa-close"></i></button>
                          </div>

                          <div class="product-widget">
                            <div class="product-img">
                              <img src="./img/product02.png" alt="" />
                            </div>
                            <div class="product-body">
                              <h3 class="product-name"><a href="#">product name goes here</a></h3>
                              <h4 class="product-price"><span class="qty">3x</span>$980.00</h4>
                            </div>
                            <button class="delete"><i class="fa fa-close"></i></button>
                          </div>
                        </div>
                        <div class="cart-summary">
                          <small>3 Item(s) selected</small>
                          <h5>SUBTOTAL: $2940.00</h5>
                        </div>
                        <div class="cart-btns">
                          <a href="#">View Cart</a>
                          <a href="#">Checkout  <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                      </div>
                    </div>
                    <div class="menu-toggle">
                      <a href="#">
                        <i class="fa fa-bars"></i>
                        <span>Menu</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <nav id="navigation">
          <div class="container">
            <div id="responsive-nav">
              <ul class="main-nav nav navbar-nav">
                <li class="active"><Link to="/">Home</Link></li>
                <li> <Link to="/cart">Cart</Link></li>
                {/* <li><a href="#">Categories</a></li>
                <li><a href="#">Laptops</a></li>
                <li><a href="#">Smartphones</a></li>
                <li><a href="#">Cameras</a></li>
                <li><a href="#">Accessories</a></li> */}
              </ul>

            </div>
          </div>
        </nav>

        <div class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-xs-6">
                <div class="shop">
                  <div class="shop-img">
                    <img src="./img/shop01.png" alt="" />
                  </div>
                  <div class="shop-body">
                    <h3>Laptop Collection</h3>
                    <a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"> </i></a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-xs-6">
                <div class="shop">
                  <div class="shop-img">
                    <img src="./img/shop03.png" alt="" />
                  </div>
                  <div class="shop-body">
                    <h3>Accessories Collection</h3>
                    <a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-xs-6">
                <div class="shop">
                  <div class="shop-img">
                    <img src="./img/shop02.png" alt="" />
                  </div>
                  <div class="shop-body">
                    <h3>CamerasCollection</h3>
                    <a href="#" class="cta-btn">Shop now <i class="fa fa-arrow-circle-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="section-title">
                  <h3 class="title">New Products</h3>
                  <div class="section-nav">
                    <ul class="section-tab-nav tab-nav">
                      <li class="active"><a onClick={() => this.onsearch('')}>All</a></li>
                      {this.state.brandlist.map((brand, index) =>
                        <li><a onClick={() => this.onsearch(brand.brand_name)}>{brand.brand_name}</a></li>)}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-12">

                <div class="products-tabs">
                  <div id="tab1" class="tab-pane active">
                    <div class="products-slick" data-nav="#slick-nav-1">
                      <div class="row">
                        {this.state.product.length == 0 ? <div style={{ textAlign: "center" }}> <h2> No Product Avalibal </h2> </div> : <div></div>}
                        {this.state.product.map((products, index) =>


                          <div class="col-md-3">
                            <div class="product" key={index}>
                              <div class="product-img">
                                <img src={products.product_pic} alt="" />
                                <div class="product-label">
                                  <span class="sale">-30%</span>
                                  <span class="new">NEW</span>
                                </div>
                              </div>
                              <div class="product-body">
                                <p class="product-category">Category</p>
                                <h3 class="product-name"><a href="#">{products.product_name}</a></h3>
                                <h4 class="product-price">${products.price} <del class="product-old-price">$990.00</del></h4>
                                <div class="product-rating">
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                </div>
                                <div class="product-btns">
                                  <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                  <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                                  <button class="quick-view"><Link to={'/info/' + products._id}><i class="fa fa-eye"></i><span class="tooltipp">quick view</span> </Link></button>

                                </div>
                              </div>
                              <div class="add-to-cart">
                                <button onClick={() => this.addToCart(products._id)} class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                              </div>
                            </div>
                          </div>

                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row"><div class="col-md-12">
                <div class="pull-right">
                  <Pagination>
                    <PaginationItem disabled={currentPage <= 0}>
                      <PaginationLink onClick={e => this.handleClick(e, currentPage - 1)} previous tag="button" />
                    </PaginationItem>

                    {[...Array(this.state.pageCount)].map((page, i) =>
                      <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => this.handleClick(e, i)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= this.state.pageCount - 1}>
                      <PaginationLink onClick={e => this.handleClick(e, currentPage + 1)} next tag="button" />
                    </PaginationItem>
                  </Pagination>
                </div>
              </div></div>
            </div>
          </div>
        </div>


        <div id="newsletter" class="section">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="newsletter">
                  <p>Sign Up for the <strong>NEWSLETTER</strong></p>
                  <form>
                    <input onChange={this.handleSubscribeChange} value={this.state.subscribe} class="input" type="email" placeholder="Enter Your Email" />
                    <button onClick={()=>{this.submitsubscribe()}} class="newsletter-btn"><i class="fa fa-envelope"></i> Subscribe</button>
                  </form>
                  <ul class="newsletter-follow">
                    <li>
                      <a href="#"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-pinterest"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div id="bottom-footer" class="section">
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <ul class="footer-payments">
                    <li><a href="#"><i class="fa fa-cc-visa"></i></a></li>
                    <li><a href="#"><i class="fa fa-credit-card"></i></a></li>
                    <li><a href="#"><i class="fa fa-cc-paypal"></i></a></li>
                    <li><a href="#"><i class="fa fa-cc-mastercard"></i></a></li>
                    <li><a href="#"><i class="fa fa-cc-discover"></i></a></li>
                    <li><a href="#"><i class="fa fa-cc-amex"></i></a></li>
                  </ul>
                  <span class="copyright">
                    Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.
								Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.
							</span>
                </div>
              </div>
            </div>
          </div>
        </footer>









        {/* <div className="row">
          <div className="col-md-3">
            <div>
              <div className="cart">
                <div className="dropdown">
                  <a id="dLabel" className="btn btn-inverse btn-block btn-large" href="/basket">
                    <i className="fa fa-fa-shopping-cart"></i>
                    <span>0 items - 0</span>
                  </a>
                </div>
              </div>
              <div className="well blosd">
                <h3 className="lead">Quick Shop</h3>
                <div className="input-group">
                  <form>
                    <input type="text" onChange={this.handleSearchChange} value={this.state.search} className="form-control" />
                  </form>
                  <span className="input-group-btn">
                    <button onClick={() => this.onsearch(this.state.search)} className="btn btn-default">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div className="well">
                <h4>Brand</h4>
                <div className="list-group">
                  <button onClick={() => this.onsearch('')} className="list-group-item" >All</button>
                  {this.state.brandlist.map((brand, index) =>

                    <button onClick={() => this.onsearch(brand.brand_name)} className="list-group-item" >{brand.brand_name}</button>
                  )}

                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9" >
            <div>
              <div className="books row">
                {this.state.product.map((products, index) =>

                  <div className="col-sm-4 col-lg-4 col-md-4 book-list" key={index}>
                    <div className="card">
                      <img src={products.product_pic} alt="Denim Jeans" style={{ 'width': '100%' }} />
                      <h1>{products.product_name}</h1>
                      <p className="price">${products.price}</p>
                      <p style={{ 'padding': '10px' }}>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
                      <p className="itemButton">
                        <button onClick={() => this.addToCart(products._id)} className="btn btn-primary">Buy Now</button>
                        <Link to={'/info/' + products._id}>
                          <Button className="btn btn-default" type="button" color="primary"> More Info </Button>
                        </Link>
                      </p>
                    </div>
                   
                  </div>


                )}
              </div>
              <div class="row"><div class="col-md-12">
                <div class="pull-right">
                  <Pagination>
                    <PaginationItem disabled={currentPage <= 0}>
                      <PaginationLink onClick={e => this.handleClick(e, currentPage - 1)} previous tag="button" />
                    </PaginationItem>

                    {[...Array(this.state.pageCount)].map((page, i) =>
                      <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => this.handleClick(e, i)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= this.state.pageCount - 1}>
                      <PaginationLink onClick={e => this.handleClick(e, currentPage + 1)} next tag="button" />
                    </PaginationItem>
                  </Pagination>
                </div>
              </div></div>

            </div>
          </div>
        </div>  */}

      </div>
    )
  }
}

export default Home;