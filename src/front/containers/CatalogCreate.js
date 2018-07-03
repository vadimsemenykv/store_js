/** Common */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from "../actions/UserActions";

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
    Collapse,
    Nav,
    NavLink,
    Navbar,
    CardHeader,
    CardLink,
    Badge,
    Progress,
    CustomInput,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback, Table
} from 'reactstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';
import CompletionBar from "../components/CompletionBar";
import AccessForm from "../components/account/AccessForm";

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/MyAccount.sass';
import UserInfoForm from "../components/account/UserInfoForm";
import CatalogItem from "../components/catalog/CatalogItem";

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    };

    render () {
        const { header, footer, user} = this.props;
        const { submitUrl } = this.props.extraLinks;
        const { changeInfo } = this.props.userActions;

        return (
            <Row className="gray-container">
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h3 className='content-title'>OTC Order Book</h3>
                                <Card>
                                    <CardHeader>Select Your Filters</CardHeader>
                                    <CardBody>
                                        {/*<CardTitle tag='h6'>Account Access</CardTitle>*/}
                                        {/*<AccessForm id={'access_form'} user={user} submitUrl={submitUrl}/>*/}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Current OTC Market Contracts</CardHeader>
                                    <CardBody>
                                        <CatalogItem order={{
                                            _id: "d7ash8f7dhf87",
                                            _type: "buy",
                                            currency: {uid: "CAD"},
                                            collection: {uid: "Corn"},
                                            offerOnly: false,
                                            price: 190,
                                            quantity: 144,
                                            totalPrice: 27360,
                                            isVerified: true,
                                            availableStatus: "available"
                                        }}/>
                                        <CatalogItem order={{
                                            _id: "45976hghjdhf8",
                                            _type: "buy",
                                            currency: {uid: "CAD"},
                                            collection: {uid: "Corn"},
                                            offerOnly: true,
                                            quantity: 144,
                                            isVerified: true,
                                            availableStatus: "in_transaction"
                                        }}/>
                                        <CatalogItem order={{
                                            _id: "4fssh8f45hf8g",
                                            _type: "sell",
                                            currency: {uid: "USD"},
                                            collection: {uid: "Corn"},
                                            offerOnly: true,
                                            quantity: 144,
                                            isVerified: false,
                                            availableStatus: "available"
                                        }}/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Footer links={footer} />
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        extraLinks: state.extraLinks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
