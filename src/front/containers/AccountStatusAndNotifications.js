/** Common */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/** Components */
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    Button,
    CardBody,
    NavbarBrand,
    NavbarToggler,
    Collapse, Nav, NavLink, Navbar, CardHeader, CardLink, Badge, Progress, CustomInput, Form
} from 'reactstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/AccountStatusAndNotifications.sass';
import CompletionBar from "../components/CompletionBar";

class AccountStatusAndNotifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    };

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render () {
        const headerLinks = this.props.header;
        const footerLinks = this.props.footer;
        const extraLinks = this.props.extraLinks;

        return (
            <Row>
                <Col>
                    <Header topLinks={headerLinks.top} bottomLinks={headerLinks.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h3 className='content-title'>Account Status</h3>
                                <Card>
                                    <CardHeader> Welcome, </CardHeader>
                                    <CardBody>
                                        <div className="account-status-policy-link" >
                                            <CardLink className="sub-link text-secondary" href="/" > Please read our Website Code of Conduct Policy </CardLink>
                                        </div>
                                        <div className="text-secondary account-status-badge" >Your account is <Badge color="success" > Active </Badge></div>
                                        <Row>
                                            <Col xs={{ size: 3 }} />
                                            <Col xs={{ size: 3 }} ><div className="text-secondary success" >Status</div></Col>
                                            <Col xs={{ size: 6 }} ><div className="text-secondary success" >Type of Access Granted</div></Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                        <Row className="completion-bar">
                                            <Col xs={{ size: 3 }} ><div className="label text-secondary success" >Initial Registration</div></Col>
                                            <Col xs={{ size: 3 }} className={'bar-wrapper'}>
                                                <CompletionBar maxValue={1} doneValue={1} customValueText={'Complete'}/>
                                            </Col>
                                            <Col xs={{ size: 6 }} >You can view the OTC Order Book as well as access any informational website content.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                        <Row className="completion-bar">
                                            <Col xs={{ size: 3 }} ><div className="label text-secondary success" >My Account Information</div></Col>
                                            <Col xs={{ size: 3 }} className={'bar-wrapper'}>
                                                <CompletionBar maxValue={11} doneValue={3}/>
                                            </Col>
                                            <Col xs={{ size: 6 }} >You have full access to all functions of the website, including creating new buy/sell orders, submitting offers and entering into binding contracts.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                        <Row className="completion-bar">
                                            <Col xs={{ size: 3 }} ><div className="label text-secondary success" >KYC Verification</div></Col>
                                            <Col xs={{ size: 3 }} className={'bar-wrapper'}>
                                                <CompletionBar maxValue={3} doneValue={0}/>
                                            </Col>
                                            <Col xs={{ size: 6 }} >KYC Verification is not due until you enter into a contract, at which point you have to complete our KYC verification.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                        <Row className="completion-bar">
                                            <Col xs={{ size: 3 }} ><div className="label text-secondary success" >Bank Wire Instructions</div></Col>
                                            <Col xs={{ size: 3 }} className={'bar-wrapper'}>
                                                <CompletionBar maxValue={5} doneValue={5}/>
                                            </Col>
                                            <Col xs={{ size: 6 }} >Bank Wire Instructions are due when a Merchant - BUY order is created. AND, upon entering into a contract.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                    </CardBody>
                                </Card>

                                <Card className="weekly-news">
                                    <CardHeader> Weekly Newsletter </CardHeader>
                                    <CardBody>
                                        <CardTitle tag='h6'>Newsletter</CardTitle>
                                        <Row>
                                            <Col className="text-secondary success">
                                                Stay informed with the most recent Order Book, completed trades, future trends, and our market analysis comments by signing up to our Weekly Newsletter, which is sent out every Tuesday.
                                            </Col>
                                        </Row>
                                        <Form>
                                            <Row className="">
                                                <Col xs={{ size: 7 }} ><div className="text-secondary success" >Sign up for our Newsletter</div></Col>
                                                <Col xs={{ size: 5 }} >
                                                    <CustomInput disabled id="user[weekly_mailing]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                </Col>
                                            </Row>
                                            <Row className='form-btn-group'>
                                                <Col xs={{ size: 4, offset: 8 }}>
                                                    <Button color="success">Save</Button>{' '}
                                                    <Button color="warning">Cancel</Button>
                                                </Col>
                                            </Row>
                                            <Row className='form-btn-group'>
                                                <Col xs={{ size: 4, offset: 8 }}>
                                                    <Button color="warning">Edit</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="notification-settings">
                                    <CardHeader> Notifications Management </CardHeader>
                                    <CardBody>
                                        <CardTitle tag='h6'>Customize My Notification Settings</CardTitle>
                                        <Row>
                                            <Col className="text-secondary success">
                                                Receive an Email Notification when a new order is posted, when you receive an offer, when your contract is created. And More!
                                            </Col>
                                        </Row>
                                        <Form>
                                            <Row className='confirms'>
                                                <Col>
                                                    <Row className="">
                                                        <Col xs={{ size: 7 }} ><div className="text-secondary success" >Receive email confirmation when A</div></Col>
                                                        <Col xs={{ size: 5 }} >
                                                            <CustomInput disabled checked id="user[notify][when_a]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                        </Col>
                                                    </Row>
                                                    <Row className="">
                                                        <Col xs={{ size: 7 }} ><div className="text-secondary success" >Receive email confirmation when B</div></Col>
                                                        <Col xs={{ size: 5 }} >
                                                            <CustomInput id="user[notify][when_b]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                        </Col>
                                                    </Row>
                                                    <Row className="">
                                                        <Col xs={{ size: 7 }} ><div className="text-secondary success" >Receive email confirmation when C</div></Col>
                                                        <Col xs={{ size: 5 }} >
                                                            <CustomInput id="user[notify][when_c]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className='form-btn-group'>
                                                <Col xs={{ size: 4, offset: 8 }}>
                                                    <Button color="success">Save</Button>{' '}
                                                    <Button color="warning">Cancel</Button>
                                                </Col>
                                            </Row>
                                            <Row className='form-btn-group'>
                                                <Col xs={{ size: 4, offset: 8 }}>
                                                    <Button color="warning">Edit</Button>
                                                </Col>
                                            </Row>
                                        </Form>
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
        extraLinks: state.extraLinks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // formErrorsActions: bindActionCreators(FormErrorsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatusAndNotifications)
