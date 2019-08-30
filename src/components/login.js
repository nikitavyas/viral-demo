import React, {Component} from 'react';
import { Card, CardBody, CardGroup, Col, Button, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from './../axios';
import { Link } from 'react-router-dom';



class Login extends Component {
    state = {
        email: '',
        password: ''
      }
    handleValidSubmit = () => {
        // event.preventDefault();
        let data = {
          email: this.state.email,
          password: this.state.password
        }
        axios.post('/admin/login', data).then((res) => {
          localStorage.setItem('token', res.data.token);
          this.props.history.push('/');
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }
      handleEmailChange = event => {
        this.setState({ email: event.target.value });
      };
    
      handlePasswordChange = event => {
        this.setState({ password: event.target.value });
      };
    
      handleInvalidSubmit = (event, errors, values) => {
      }
  render() {
    return (
        <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted"> <Link to={'/signup'}> Sign In to your account</Link></p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <AvField type="text" name="email" value={this.state.email}
                          placeholder="Enter email" onChange={this.handleEmailChange}
                          required errorMessage="Email is required"
                          validate={{
                            pattern: { value: '/^[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,10}$/', errorMessage: 'Enter valid email' },
                          }}
                        />
                        <div className='invalid-feedback'>{this.state.emailError}</div>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <AvField type="password" name="password"
                          placeholder="Password" onChange={this.handlePasswordChange}
                          required errorMessage="Password is required"
                          validate={{
                            minLength: { value: '8', errorMessage: 'Minimum length of Password is 8' },
                          }}
                        />
                        <div className='invalid-feedback'>{this.state.passwordError}</div>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Link color={this.state.color} className={this.state.className} to="/forgot-password">
                            <Button color="link" className="px-0">Forgot password?</Button></Link>
                        </Col> */}
                      </Row>
                    </AvForm>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;