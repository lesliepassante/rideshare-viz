import React from 'react';
import PropTypes from 'prop-types';
import { Progress, Button } from 'reactstrap';
import styled from 'styled-components';
import { MdPause, MdPlayArrow, MdSkipNext, MdSkipPrevious } from 'react-icons/md';

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

const StyledProgress = styled(Progress)`
  width: 100%;

  & .progress-bar {
    transition-property: none;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1.4em !important;
  line-height: 1em !important;
  padding-top: 5px !important;
  margin-right: 1rem;
`;

const Timestamp = styled.span`
  white-space: nowrap;
  margin-left: 1rem;
  font-weight: bold;
`;

function PlaybackControls({
  isSelectedDriver = false,
  progress = 0,
  playing = false,
  timestamp,
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
        <StyledButton onClick={progress === 100 ? onStartOver : onPlay}>
          <MdPlayArrow />
        </StyledButton>
      )}
      <StyledButton onClick={onSkipBack}>
        <MdSkipPrevious />
      </StyledButton>
      <StyledButton onClick={onSkipForward}>
        <MdSkipNext />
      </StyledButton>
      <StyledProgress value={progress} />
      <Timestamp>{timestamp}</Timestamp>
    </StyledPlaybackControls>
  );
}

PlaybackControls.propTypes = {
  isSelectedDriver: PropTypes.bool,
  progress: PropTypes.number,
  playing: PropTypes.bool,
  timestamp: PropTypes.string,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onSkipForward: PropTypes.func.isRequired,
  onSkipBack: PropTypes.func.isRequired,
  onStartOver: PropTypes.func.isRequired
};

export default PlaybackControls;
