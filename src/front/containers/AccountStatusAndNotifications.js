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
    CardText,
    Button,
    CardBody,
    NavbarBrand,
    NavbarToggler,
    Collapse, Nav, NavLink, Navbar, CardHeader, CardLink, Badge, Progress, CustomInput, FormGroup
} from 'reactstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/AccountStatusAndNotifications.sass';

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
            <Row className="account" >
                <Col>
                    <Header topLinks={headerLinks.top} bottomLinks={headerLinks.bottom} />
                    <Container className="wrapper">
                        <Row>
                            <Col lg={{ size: '3' }} md={{ size: '12' }} className="cm-bordered cm-content menu-wrapper" >
                                <Navbar className='main-menu-wrapper' light expand="lg">
                                    <NavbarBrand href="/" className="mr-auto d-lg-none">Account Menu</NavbarBrand>
                                    <NavbarToggler onClick={::this.toggleNavbar} className="mr-2" />
                                    <Collapse isOpen={this.state.isOpen} navbar>
                                        <Nav vertical >
                                            <NavLink className="sub-link text-secondary" href='/'> My Account </NavLink>
                                            <div className="dropdown-divider"/>
                                            <NavLink className="sub-link text-secondary" href='/'> Status & Notifications </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> Know Your Client (KYC) </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> Bank Wire Instructions </NavLink>
                                            <div className="dropdown-divider"/>
                                            <NavLink className="sub-link text-secondary" href='/'> View OTC Order Book </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> New Buy/Sell Contract </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> Grain Deliveries </NavLink>
                                            <div className="dropdown-divider"/>
                                            <NavLink className="sub-link text-secondary" href='/'> My Orders </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> My Offers </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> My Contracts </NavLink>
                                            <div className="dropdown-divider"/>
                                            <NavLink className="sub-link text-secondary" href='/'> ACTIONs Tracker </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> Payment History </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> Forms & Policies </NavLink>
                                            <NavLink className="sub-link text-secondary" href='/'> Social & Coffee Chats </NavLink>
                                        </Nav>
                                    </Collapse>
                                </Navbar>
                            </Col>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h3 className='content-title'>Account Status</h3>
                                <Card className="" >
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
                                        <Row>
                                            <Col xs={{ size: 3 }} ><div className="text-secondary success" >Initial Registration</div></Col>
                                            <Col xs={{ size: 3 }} >
                                                <div className="text-center text-secondary">Complete</div>
                                                <Progress multi>
                                                    <Progress bar color="success" value="100" />
                                                </Progress>
                                            </Col>
                                            <Col xs={{ size: 6 }} >You can view the OTC Order Book as well as access any informational website content.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                        <Row>
                                            <Col xs={{ size: 3 }} ><div className="text-secondary success" >My Account Information</div></Col>
                                            <Col xs={{ size: 3 }} >
                                                <div className="text-center text-secondary">3/11 Complete</div>
                                                <Progress multi>
                                                    <Progress bar color="success" value="3" max="11" />
                                                    <Progress bar color="warning" value="8" max="11" />
                                                    <Progress bar color="danger" value="0" max="11" />
                                                </Progress>
                                            </Col>
                                            <Col xs={{ size: 6 }} >You have full access to all functions of the website, including creating new buy/sell orders, submitting offers and entering into binding contracts.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                        <Row>
                                            <Col xs={{ size: 3 }} ><div className="text-secondary success" >KYC Verification</div></Col>
                                            <Col xs={{ size: 3 }} >
                                                <div className="text-center text-secondary">0/3 Complete</div>
                                                <Progress multi>
                                                    <Progress bar color="success" value="0" max="3" />
                                                    <Progress bar color="warning" value="0" max="3" />
                                                    <Progress bar color="danger" value="3" max="3" />
                                                </Progress>
                                            </Col>
                                            <Col xs={{ size: 6 }} >KYC Verification is not due until you enter into a contract, at which point you have to complete our KYC verification.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                        <Row>
                                            <Col xs={{ size: 3 }} ><div className="text-secondary success" >Bank Wire Instructions</div></Col>
                                            <Col xs={{ size: 3 }} >
                                                <div className="text-center text-secondary">5/5 Complete</div>
                                                <Progress multi>
                                                    <Progress bar color="success" value="5" max="5" />
                                                    <Progress bar color="warning" value="0" max="5" />
                                                    <Progress bar color="danger" value="0" max="5" />
                                                </Progress>
                                            </Col>
                                            <Col xs={{ size: 6 }} >Bank Wire Instructions are due when a Merchant - BUY order is created. AND, upon entering into a contract.</Col>
                                        </Row>
                                        <div className="dropdown-divider"/>
                                    </CardBody>
                                </Card>

                                <Card className="weekly-news">
                                    <CardHeader> Weekly Newsletter </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col className="text-secondary success">
                                                Stay informed with the most recent Order Book, completed trades, future trends, and our market analysis comments by signing up to our Weekly Newsletter, which is sent out every Tuesday.
                                            </Col>
                                        </Row>
                                        <Row className="">
                                            <Col xs={{ size: 7 }} ><div className="text-secondary success" >Sign up for our Newsletter</div></Col>
                                            <Col xs={{ size: 5 }} >
                                                {/*<FormGroup check disabled>*/}
                                                    <CustomInput disabled id="user[weekly_mailing]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="Sign up for our Newsletter" />
                                                {/*</FormGroup>*/}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 5, offset: 7 }} >
                                                <Button color="primary">primary</Button>{' '}
                                                <Button color="secondary">secondary</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="">
                                    <CardHeader> Notifications Management </CardHeader>
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
        extraLinks: state.extraLinks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // formErrorsActions: bindActionCreators(FormErrorsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatusAndNotifications)
