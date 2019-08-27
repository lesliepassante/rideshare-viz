import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdLocalTaxi, MdRemove, MdAdd } from 'react-icons/md';

const StyledDriverDetailsBacklogItem = styled.li`
  margin-bottom: 1.5rem;
  position: relative;

  & svg {
    position: absolute;
    left: -15px;
    top: 6px;
    font-size: 2rem;
    color: white;
    background-color: lightgray;
    border-radius: 1em;
    padding: 5px;
  }

  & .driver svg {
    background-color: #6c757d;
  }
`;

const Paragraph = styled.p`
  margin-left: 2rem;
`;

function DriverDetailsBacklogItem({ description, position, type }) {
  return (
    <StyledDriverDetailsBacklogItem className={'type-' + type}>
      {type === 'driver' && <MdLocalTaxi />}
      {type === '+' && <MdAdd />}
      {type === '-' && <MdRemove />}
      <Paragraph>
        {description}
        <br />
        <small>{position}</small>
      </Paragraph>
    </StyledDriverDetailsBacklogItem>
  );
}

DriverDetailsBacklogItem.propTypes = {
  description: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default DriverDetailsBacklogItem;
