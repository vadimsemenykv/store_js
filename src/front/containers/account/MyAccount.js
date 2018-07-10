/** Common */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../actions/UserActions';

/** Components */
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Container, CustomInput, Form, Row} from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import AccessForm from '../../components/account/AccessForm';
import UserInfoForm from '../../components/account/UserInfoForm';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import '../../styles/MyAccount.sass';

class MyAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        const { header, footer, user} = this.props;
        const { submitUrl } = this.props.extraLinks;
        const { changeInfo } = this.props.userActions;

        return (
            <Row>
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h3 className="content-title">My account</h3>
                                <Card>
                                    <CardHeader>Website Access</CardHeader>
                                    <CardBody>
                                        <CardTitle tag="h6">Account Access</CardTitle>
                                        <AccessForm id={'access_form'} user={user} submitUrl={submitUrl}/>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Account Information</CardHeader>
                                    <CardBody>
                                        <CardTitle tag="h6">Your Contact Information</CardTitle>
                                        <UserInfoForm id={'access_form'} user={user} submitUrl={submitUrl} changeInfo={changeInfo}/>
                                    </CardBody>
                                </Card>

                                <Card className="weekly-news">
                                    <CardHeader> Weekly Newsletter </CardHeader>
                                    <CardBody>
                                        <CardTitle tag="h6">Newsletter</CardTitle>
                                        <Row>
                                            <Col className="text-secondary success">
                                                Stay informed with the most recent Order Book, completed trades, future trends, and our market analysis comments by signing up to our Weekly Newsletter, which is sent out every Tuesday.
                                            </Col>
                                        </Row>
                                        <Form>
                                            <Row >
                                                <Col xs={{ size: 7 }} ><div className="text-secondary success" >Sign up for our Newsletter</div></Col>
                                                <Col xs={{ size: 5 }} >
                                                    <CustomInput disabled id="user[weekly_mailing]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                </Col>
                                            </Row>
                                            <Row className="form-btn-group">
                                                <Col xs={{ size: 4, offset: 8 }}>
                                                    <Button color="success">Save</Button>{' '}
                                                    <Button color="warning">Cancel</Button>
                                                </Col>
                                            </Row>
                                            <Row className="form-btn-group">
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
                                        <CardTitle tag="h6">Customize My Notification Settings</CardTitle>
                                        <Row>
                                            <Col className="text-secondary success">
                                                Receive an Email Notification when a new order is posted, when you receive an offer, when your contract is created. And More!
                                            </Col>
                                        </Row>
                                        <Form>
                                            <Row className="confirms">
                                                <Col>
                                                    <Row >
                                                        <Col xs={{ size: 7 }} ><div className="text-secondary success" >Receive email confirmation when A</div></Col>
                                                        <Col xs={{ size: 5 }} >
                                                            <CustomInput disabled checked id="user[notify][when_a]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col xs={{ size: 7 }} ><div className="text-secondary success" >Receive email confirmation when B</div></Col>
                                                        <Col xs={{ size: 5 }} >
                                                            <CustomInput id="user[notify][when_b]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col xs={{ size: 7 }} ><div className="text-secondary success" >Receive email confirmation when C</div></Col>
                                                        <Col xs={{ size: 5 }} >
                                                            <CustomInput id="user[notify][when_c]" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="C" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="form-btn-group">
                                                <Col xs={{ size: 4, offset: 8 }}>
                                                    <Button color="success">Save</Button>{' '}
                                                    <Button color="warning">Cancel</Button>
                                                </Col>
                                            </Row>
                                            <Row className="form-btn-group">
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
                    <Footer links={footer} />
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        extraLinks: state.extraLinks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
