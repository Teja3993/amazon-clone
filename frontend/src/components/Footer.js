import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', background: '#343a40', color: 'white' }}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Amazon Clone
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;