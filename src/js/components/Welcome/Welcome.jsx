import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { WelcomeFileInput } from 'containers/Welcome';
import WelcomeFileError from './WelcomeFileError';

const StyledWelcome = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
  display: flex;
`;

const StyledSpinner = styled(Spinner)`
  width: 3rem !important;
  height: 3rem !important;
`;

function Welcome({ error, loading = false }) {
  return (
    <StyledWelcome>
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1>Hello! Let&apos;s see some data.</h1>
            <p>
              Upload a timestamped series of GeoJSON files to see them visualized. Not sure what the GeoJSON files
              should look like? Grab some <a href="assets/example-geojson.zip">example files</a> to get started.
            </p>
            {!loading && <WelcomeFileInput />}
            {loading && <StyledSpinner color="secondary" />}
            {!loading && error && <WelcomeFileError error={error} />}
          </Col>
        </Row>
      </Container>
    </StyledWelcome>
  );
}

Welcome.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool
};

export default Welcome;
