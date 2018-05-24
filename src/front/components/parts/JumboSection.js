import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container } from 'reactstrap';

import './JumboSection.sass';

export default class JumboSection extends React.Component {
    static propTypes = {
        lead: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.arrayOf(PropTypes.string),
        button: PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string,
        })
    };

    render() {
        let lead = this.props.lead;
        let leadTpl;
        let description = this.props.description;
        let descriptionTpl;
        let button = this.props.button;
        let buttonTpl;

        if (lead && lead.length > 0) {
            leadTpl = lead.map(function(item, index) {
                return	(<span key={ index }>{ item }<br/></span>)
            });
            leadTpl = (
                <Row>
                    <Col xs={{ size: 12 }}>
                        <div className="d-flex justify-content-center">
                            <p className="lead">{ leadTpl }</p>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            leadTpl = "";
        }

        if (description && description.length > 0) {
            descriptionTpl = description.map(function(item, index) {
                return (<span key={ index }>{ item }<br/></span>)
            });
            descriptionTpl = (<Row><Col xs={{ size: 8, offset: 2 }}><div className="d-flex justify-content-center"><p>{ descriptionTpl }</p></div></Col></Row>);
        } else {
            descriptionTpl = "";
        }

        if (button) {
            buttonTpl = (
                <Row>
                    <Col xs={{ size: 6, offset: 3 }}>
                        <div className="d-flex justify-content-center">
                            <Button className='cta' href={ button.link !== undefined ? button.link : "#" } size="lg" block={true} color="primary">{ button.label }</Button>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            buttonTpl = "";
        }

        return (
            <section className='section-container'>
                <Container>
                    { leadTpl }
                    { descriptionTpl }
                    { buttonTpl }
                </Container>
            </section>
        );
    }
}