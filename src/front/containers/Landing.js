import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Header from '../components/Header';
import JumboSection from "../components/JumboSection";
import Footer from "../components/Footer";

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/Landing.sass';

let sections = [
    {
        lead: [
            "Looking to buy grains wholesale?   XYZ inc. got you covered!"
        ],
        description: [
            "When a seller wants to sell his grains, they go to our website and create a simple \"Sell Contract\"",
            "When a buyer wants to buy some grains, they go to our website and purchase grains they like from our sellers",
            "Wholesale grains, all immaginable variety, multiple categories and volumes to choose from",
            "Our \"Lot\" sales system, sellers are able to set minimum volume pruchase, allowing for High Dollar transactions and segmentation marketing",
            "Through our Contracts Clearing and Settlement Process we eliminate transactional counterparty risk",
            "",
            "We are the seller to every buyer and buyer to every seller"
        ],
        button: {
            label: "Learn more about our Contracts Process"
        }
    },
    {
        lead: [
            "You are a Food Processor, Restaurant Chain, Trader, Consumer, Collector - we have something for everyone!"
        ],
        description: [
            "Simple registration to get you started !",
            "Full access to our OTC Order Book after registration",
            "Once registered, follow simple next steps to become a Member",
            "Enjoy secure, confidential trades, and most of all - Have Fun !"
        ],
        button: {
            label: "Register - Try Our Platform for FREE"
        }
    },
    {
        lead: [
            "Members of the XYZ inc community buy and sell with confidence, security and transparency. "
        ],
        description: [
            "In order to buy or sell grains you have to register as a member.",
            "Complete the Membership Registration and become a Member to buy, sell grains wholesale"
        ],
        button: {
            label: "Learn About Membership Benefits"
        }
    },
    {
        lead: [
            "Contracts Framework with integrated Clearing and Settlement services allows for secure, ",
            "and predictable high dollar transactions"
        ],
        description: [
            "Only Members can participate in the XYZ inc Contracts Marketplace",
            "Standard Terms applicable to each contract and every Member",
            "Clearing process manages the Counterparty Risk from seller to buyer and buyer to seller",
            "Settlement process requires that all contracts are settled with verified grains ownership transfer",
            "Strong Membership Governance through active participation, transparency and communication, naturally discourages Contract defaults"
        ],
        button: {
            label: "Learn our Platform Strategies"
        }
    }
];

class Landing extends Component {
    render () {
        const headerLinks = this.props.header;
        const footerLinks = this.props.footer;
        const user = this.props.user;
        return (
            <Row className="landing">
                <Col className="wrapper">
                    <Header isFixed={true} user={user} topLinks={headerLinks.top} bottomLinks={headerLinks.bottom} />
                    <JumboSection lead={sections[0].lead} description={sections[0].description} button={sections[0].button}/>
                    <JumboSection lead={sections[1].lead} description={sections[1].description} button={sections[1].button}/>
                    <JumboSection lead={sections[2].lead} description={sections[2].description} button={sections[2].button}/>
                    <JumboSection lead={sections[3].lead} description={sections[3].description} button={sections[3].button}/>
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
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // pageActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)