import React, { Component } from 'react';
import axios from './../axios';
import Message from './Message';
import {
    Link,
    Route,
    Switch
} from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Mymessage extends Component {
  state = {
    productList: []
  }
  componentDidMount(){
    axios.get('api/v1/product/getproduct?limit=25&&page=0&sortBy=product_name:desc&&search=')
    .then(response => {
      this.setState({productList : response.data})
      console.log(this.state.productList , 'rrr')

    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      // <div>hiii</div>
      <MDBTable>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>Sr No</th>
          <th>product_name</th>
          <th>product_pic</th>
          <th>color</th>
          <th>madeby</th>
          <th>price</th>
          <th>size</th>
          <th>warranty</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr> */}
        {this.state.productList.map((product , index) => <tr key={index}>
          <td>{index + 1}</td>
          <td>{product.product_name}</td>
          <td>{product.product_pic}</td>
          <td>{product.color}</td>
          <td>{product.madeby}</td>
          <td>{product.price}</td>
          <td>{product.size}</td>
          <td>{product.warranty}</td>

        </tr>)}
      </MDBTableBody>
    </MDBTable>
     )
   }
}


export default Mymessage


























// const Messages = ({ match }) => ( 
//     <div>
//     <ul>
//     {
//         [...Array(5).keys()].map(n => {
//             return <li key={n}>
//                     <Link to={`${match.url}/${n+1}`}>
//                       Message {n+1}
//                     </Link>
//                   </li>;
//         })
//     }
//     </ul>
//     <Switch>
//       <Route path={`${match.url}/:id(\\d+)`} component={Message} />
//       <Route
//         path={match.url}
//         render={() => <h3>Please select a message</h3>}
//       />
//     </Switch>
//   </div>
//         );

//         export default Messages;