import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { MdPause, MdPlayArrow, MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { ProgressBar, Timestamp } from 'containers/PlaybackControls';

const StyledPlaybackControls = styled.div`
  bottom: 100px;
  right: 200px;
  transition: all 200ms ease-in-out;
  position: absolute;
  left: 200px;
  right: 200px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 10px 20px;
  border-radius: 5px;
  position: fixed;
  align-items: center;
  display: flex;
  flex-direction: row;
  left: ${({ isSelectedDriver }) => (isSelectedDriver ? '500px' : '200px')};
  min-width: 400px;
`;

const StyledButton = styled(Button)`
  font-size: 1.4em !important;
  line-height: 1em !important;
  padding-top: 5px !important;
  margin-right: 1rem;
`;

function PlaybackControls({
  isSelectedDriver = false,
  isAtEnd = false,
  playing = false,
  onPause,
  onPlay,
  onSkipForward,
  onSkipBack,
  onStartOver
}) {
  return (
    <StyledPlaybackControls isSelectedDriver={isSelectedDriver}>
      {playing && (
        <StyledButton onClick={onPause}>
          <MdPause />
        </StyledButton>
      )}
      {!playing && (
        <StyledButton onClick={isAtEnd ? onStartOver : onPlay}>
          <MdPlayArrow />
        </StyledButton>
      )}
      <StyledButton onClick={onSkipBack}>
        <MdSkipPrevious />
      </StyledButton>
      <StyledButton onClick={onSkipForward}>
        <MdSkipNext />
      </StyledButton>
      <ProgressBar />
      <Timestamp />
    </StyledPlaybackControls>
  );
}

PlaybackControls.propTypes = {
  isSelectedDriver: PropTypes.bool,
  isAtEnd: PropTypes.bool,
  playing: PropTypes.bool,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onSkipForward: PropTypes.func.isRequired,
  onSkipBack: PropTypes.func.isRequired,
  onStartOver: PropTypes.func.isRequired
};

export default PlaybackControls;
