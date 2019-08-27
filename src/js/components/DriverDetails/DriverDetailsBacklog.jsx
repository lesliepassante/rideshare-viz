import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DriverDetailsBacklogItem from './DriverDetailsBacklogItem';

const StyledDriverDetailsBacklog = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-left: 16px;
  position: relative;

  &:before {
    content: '';
    display: block;
    border-left: 1px dotted lightgray;
    position: absolute;
    top: 10px;
    bottom: 10px;
  }
`;

function DriverDetailsBacklog({ backlog = [], currentDriverId }) {
  return (
    <StyledDriverDetailsBacklog>
      <DriverDetailsBacklogItem
        description={'Driver ' + currentDriverId}
        key="driver"
        position={backlog.length ? 'En route' : 'Idle'}
        type="driver"
      />
      {backlog.map((feature, i) => {
        return (
          <DriverDetailsBacklogItem
            description={
              (feature.properties.type === '+' ? 'Pick up rider ' : 'Drop off rider ') + feature.properties.riderId
            }
            key={i}
            position={feature.geometry.coordinates.join(', ')}
            type={feature.properties.type}
          />
        );
      })}
    </StyledDriverDetailsBacklog>
  );
}

DriverDetailsBacklog.propTypes = {
  backlog: PropTypes.array,
  currentDriverId: PropTypes.number
};

export default DriverDetailsBacklog;
