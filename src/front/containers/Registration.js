/** Common */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/** Components */
import { Container, Row, Col, Card, CardTitle, CardText, Button, CardBody } from 'reactstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

/** Actions */
import * as FormErrorsActions from '../actions/FormErrorsActions';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/Registration.sass';

class Registration extends Component {
    render () {
        const headerLinks = this.props.header;
        const footerLinks = this.props.footer;
        const extraLinks = this.props.extraLinks;

        return (
            <Row className="register" >
                <Col>
                    <Header topLinks={headerLinks.top} bottomLinks={headerLinks.bottom} />
                    <Container className="wrapper">
                        <Row>
                            <Col md={{ size: '7' }} sm={{ size: '12' }} className="cm-bordered cm-content form-wrapper" >
                                <RegisterForm id="registration-form" />
                            </Col>
                            <Col md={{ size: '4', offset: 1 }} sm={{ size: '12' }} className="cm-bordered cm-content register-prop-wrapper" >
                                <Card className="cm-no-border" >
                                    <CardBody>
                                        <CardTitle>Already Registered?</CardTitle>
                                        <CardText>Sign in to sell and buy.</CardText>
                                        <Button href={extraLinks.loginUrl} >Sign In</Button>
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
        // registrationForm: state.registrationForm,
        extraLinks: state.extraLinks,
        // formErrors: state.formErrors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formErrorsActions: bindActionCreators(FormErrorsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)