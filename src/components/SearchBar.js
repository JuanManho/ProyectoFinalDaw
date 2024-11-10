import React from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

const SearchBar = () => (
  <Container className="my-4 text-center">
    <Row>
      <Col>
        <Button variant="primary" className="me-2">Reparto a domicilio</Button>
        <Button variant="secondary">Recoger en local</Button>
      </Col>
    </Row>
    <Row className="my-3">
      <Col md={{ span: 6, offset: 3 }}>
        <Form.Control type="text" placeholder="Pizza, hamburguesas, ..." />
        <Button variant="warning" className="mt-2">Buscar comida</Button>
      </Col>
    </Row>
  </Container>
);

export default SearchBar;