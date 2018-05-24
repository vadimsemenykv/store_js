import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, NavbarBrand, Nav, NavLink } from 'reactstrap';

import './Footer.sass';

let links = [
    {
        toggler: "Buy / Sell",
        links: [
            { link: "/learn-the-process", label: "Learn the Process" },
            { link: "/catalog", label: "Buy Grains" },
            { link: "/sell", label: "Sell Grains - New Sell Contract" },
            { divider: true },
            { link: "/terms", label: "Standard Terms - Contracts" },
            { link: "/counterparty-risk-management", label: "Clearing: Counterparty Risk Management" },
            { link: "/physical-delivery", label: "Physical Delivery" },
            { link: "/contract-defaults", label: "Contract Defaults" }
        ]
    },
    {
        toggler: "Explore",
        links: [
            { link: "/grains-overview", label: "Grains Overview" },
            { link: "/learn-about-the-market", label: "Learn about the Market" },
            { divider: true },
            { link: "/what-is-a-sell-otc-contract", label: "What is a Sell OTC Contract" },
            { link: "/learn-our-platform-strategies", label: "Learn our Platform Strategies" },
            { link: "/understand-the-risks", label: "Understand the risks" }
        ]
    },
    {
        toggler: "Community",
        links: [
            { link: "/why-use-our-platform", label: "Why use our Platform" },
            { link: "/about", label: "About XYZ inc" },
            { link: "/roadmap", label: "2020 Roadmap" },
            { divider: true },
            { link: "/membership-benefits", label: "Membership Benefits" },
            { link: "/become-a-member", label: "Become a Member" },
            { link: "/membership-events", label: "Membership Events" },
            { link: "/membership-vision", label: "Membership Vision 2020" },
            { divider: true },
            { link: "/contact-us", label: "Contact us" }
        ]
    }
];

export default class Header extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Container>
                    <Row>
                        <SubMenu key={0} toggler={links[0].toggler} links={links[0].links}/>
                        <SubMenu key={1} toggler={links[1].toggler} links={links[1].links}/>
                        <SubMenu key={2} toggler={links[2].toggler} links={links[2].links}/>
                    </Row>
                    <NavbarBrand href="/" className="mr-auto text-dark">GrainStore</NavbarBrand>
                </Container>
            </footer>
        );
    }
}

class SubMenu extends React.Component {
    static propTypes = {
        toggler: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(PropTypes.oneOf([
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired,
            }),
            PropTypes.shape({
                divider: PropTypes.bool.isRequired
            })
        ])).isRequired
    };

    render() {
        let toggler = this.props.toggler;
        let links = this.props.links;
        let linkTpl = links.map(function(item, index) {
            let tpl;
            if (item.divider !== undefined) {
                tpl = <div key={index} className="divider"/>;
            } else {
                tpl = <NavLink className="sub-link text-secondary" key={index} href={item.link}>{item.label}</NavLink>
            }
            return	tpl
        });
        return (
            <Col className="sub-menu"><p>{ toggler }</p><Nav vertical>{ linkTpl }</Nav></Col>
        );
    }
}