import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardTitle, CardText, Button, CardBody } from 'reactstrap';

import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from '../components/LoginForm';
import * as loginActions from '../actions/LoginActions';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/Login.sass';

class Login extends Component {
    render () {
        const headerLinks = this.props.header;
        const footerLinks = this.props.footer;
        const extraLinks = this.props.extraLinks;
        const loginForm = this.props.loginForm;
        return (
            <Row className="login" >
                <Col>
                    <Header topLinks={headerLinks.top} bottomLinks={headerLinks.bottom} />
                    <Container className="wrapper">
                        <Row>
                            <Col md={{ size: '7' }} sm={{ size: '12' }} className="cm-bordered cm-content form-wrapper" ><LoginForm user={loginForm} /></Col>
                            <Col md={{ size: '4', offset: 1 }} sm={{ size: '12' }} className="cm-bordered cm-content register-prop-wrapper" >
                                <Card className="cm-no-border" >
                                    <CardBody>
                                        <CardTitle>Not registered yet?</CardTitle>
                                        <CardText>Register now to sell and buy. It’s quick, easy, and free!</CardText>
                                        <Button href={extraLinks.registrationUrl} >Register Now</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Footer links={footerLinks} />
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        loginForm: state.loginForm,
        extraLinks: state.extraLinks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)