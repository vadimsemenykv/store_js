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
import '../styles/CatalogCreate.sass';

import UserInfoForm from "../components/account/UserInfoForm";
import CatalogItem from "../components/catalog/CatalogItem";
import CreateOrderForm from "../components/catalog/CreateOrderForm";

class CatalogCreate extends Component {
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
                                <h3 className='content-title'>Create New Buy / Sell Order</h3>
                                <Card>
                                    <CardHeader>Create New Order</CardHeader>
                                    <CardBody>
                                        <CardTitle tag='h6'>Please follow our instructions to Create a New Market Order:</CardTitle>
                                        <Row>
                                            <Col className="text-secondary form-description">
                                                Using this form you are able to create a New Buy Sell Order,
                                                that will be posted to the OTC Order Book.
                                                Your Order will be filled by a Client agreeing to your price,
                                                or through our Offer process, where Clients have an opportunity to send you an Offer,
                                                at which point in turn,
                                                you would to accept or decline the offer.
                                                Acceptance of the Offer results in a binding Contract between the Merchant and the Client.
                                                A binding Contract also is created when a Client accepts your price outright, as is.
                                                When a Contract is created, the Order is removed from the Order Book.
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <CreateOrderForm id="create-order"/>
                                            </Col>
                                        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreate)
