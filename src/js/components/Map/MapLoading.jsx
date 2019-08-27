import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const StyledMapLoading = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.4);
  align-items: center;
  justify-content: center;
  display: flex;
`;

const StyledSpinner = styled(Spinner)`
  width: 10rem !important;
  height: 10rem !important;
`;

function MapLoading() {
  return (
    <StyledMapLoading>
      <StyledSpinner color="secondary" />
    </StyledMapLoading>
  );
}

export default MapLoading;
