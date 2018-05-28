import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, NavbarBrand, Nav, NavLink } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/Footer.sass';

export default class Footer extends React.Component {
    static propTypes = {
        links: PropTypes.arrayOf(
            PropTypes.shape({
                toggler: PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    link: PropTypes.string,
                }).isRequired,
                links: PropTypes.arrayOf(PropTypes.oneOfType([
                    PropTypes.shape({
                        label: PropTypes.string.isRequired,
                        link: PropTypes.string.isRequired,
                    }),
                    PropTypes.shape({
                        divider: PropTypes.bool.isRequired
                    })
                ])).isRequired
            })
        )
    };

    render() {
        const links = this.props.links;

        let linksTplRender = function (links) {
            let tpl;
            if (links) {
                tpl = links.map(function (item, index) {
                    return <SubMenu key={index} toggler={item.toggler} links={item.links}/>
                });
            } else {
                tpl = <div />;
            }
            return tpl;
        };
        return (
            <footer className="footer">
                <Container>
                    <Row>
                        {linksTplRender(links)}
                    </Row>
                    <NavbarBrand href="/" className="mr-auto text-dark">GrainStore</NavbarBrand>
                </Container>
            </footer>
        );
    }
}

class SubMenu extends React.Component {
    static propTypes = {
        toggler: PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string,
        }).isRequired,
        links: PropTypes.arrayOf(PropTypes.oneOfType([
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
        let togglerLabel = this.props.toggler.label;
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
            <Col className="sub-menu"><p>{ togglerLabel }</p><Nav vertical>{ linkTpl }</Nav></Col>
        );
    }
}