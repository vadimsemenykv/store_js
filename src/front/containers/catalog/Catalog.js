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
import CatalogItem from '../../components/catalog/CatalogItem';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import '../../styles/MyAccount.sass';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        const { header, footer, user, ordersList } = this.props;
        const ordersTpl = ordersList.map((item) => <CatalogItem key={item._id.toString()} order={item}/>);
        // const ordersTpl = "";

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
                                <h4 className={'content-title'}>OTC Order Book</h4>
                                <Card>
                                    <CardHeader>Current OTC Market Contracts</CardHeader>
                                    <CardBody>
                                        {ordersTpl}
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

Catalog.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    ordersList: PropTypes.array.isRequired,
    extraLinks: PropTypes.any
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        ordersList: state.ordersList,
        extraLinks: state.extraLinks
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)

