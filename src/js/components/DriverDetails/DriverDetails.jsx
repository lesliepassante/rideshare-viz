import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DriverDetailsBacklog from './DriverDetailsBacklog';

const StyledDriverDetails = styled.div`
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  transition: all 200ms ease-out;
  padding: 20px;
  width: 300px;
  overflow: scroll;
  opacity: ${({ isCurrentDriverId }) => (isCurrentDriverId ? '1' : '0')};
  left: ${({ isCurrentDriverId }) => (isCurrentDriverId ? '0px' : '-300px')};
`;

const Header = styled.div`
  margin-bottom: 1rem;

  ::after {
    display: block;
    clear: both;
    content: '';
  }
`;

const HeaderTitle = styled.h5`
  float: left;
`;

const HeaderCloseButton = styled.button`
  float: right;
`;

function DriverDetails({ backlog = [], currentDriverId, onClose }) {
  const isCurrentDriverId = typeof currentDriverId === 'number';

  if (!isCurrentDriverId) return null;

  return (
    <StyledDriverDetails isCurrentDriverId={isCurrentDriverId}>
      <Header>
        <HeaderTitle>Driver backlog</HeaderTitle>
        <HeaderCloseButton type="button" className="close" aria-label="Close" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </HeaderCloseButton>
      </Header>
      <DriverDetailsBacklog backlog={backlog} currentDriverId={currentDriverId} />
    </StyledDriverDetails>
  );
}

DriverDetails.propTypes = {
  backlog: PropTypes.array,
  currentDriverId: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

export default DriverDetails;
