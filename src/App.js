// src/App.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <Container fluid className="p-0 m-0 vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} className="d-flex flex-column align-items-center">
          <h1 className="app-title mb-4">Country Search App</h1>
          <SearchBar />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
