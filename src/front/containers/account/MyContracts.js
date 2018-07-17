/** Common */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/** Components */
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import ContractItem from '../../components/account/ContractItem';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';

class MyContracts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        const { header, footer, user, listContracts } = this.props;

        const merchantContractsTpl = listContracts.map((contract, index) => {
            if (contract.merchant === user._id.toString()) {
                return <ContractItem key={index} contract={contract}/>;
            }
            return '';
        });
        const clientContractsTpl = listContracts.map((contract, index) => {
            if (contract.client === user._id.toString()) {
                return <ContractItem key={index} contract={contract}/>;
            }
            return '';
        });

        return (
            <Row className="gray-container">
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col
                                lg={{ size: '8', offset: 1 }} md={{ size: '12' }}
                                className="cm-bordered cm-content content"
                            >
                                <h4 className={'content-title'}>My Contracts</h4>
                                <Card>
                                    <CardHeader>Merchant</CardHeader>
                                    <CardBody>
                                        {merchantContractsTpl}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Client</CardHeader>
                                    <CardBody>
                                        {clientContractsTpl}
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

MyContracts.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    listContracts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        listContracts: state.listContracts.list
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyContracts);
