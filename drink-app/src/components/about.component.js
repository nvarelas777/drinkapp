import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import styled from 'styled-components';

const About = () => {
        return (
            <Container>
                <Row>
                    <Col lg={{offset:3, span: 6}}>
                        <ContainerStyled>
                            <p>As a bartender, I know how hard it can be to remember all
                                the possible cocktails and shots. Many of these have multiple
                                aliases for the sam drink. Some will make a drink one way,
                                while others will make the same drink a different way. This
                                website is a resource for the most common way cocktails and shots
                                are made.
                        </p>
                        </ContainerStyled>
                    </Col>
                </Row>
            </Container>
    )
}

export default About;

const ContainerStyled = styled(Container)`
background-color: #abeaff;
font-size:18px;
padding: 20px;
border-radius: 8px;
font-weight:bold;

@media (min-width:720px){
    
}
`