const createFrame = ({ geojson = {} } = {}) => ({ geojson });

const createFile = ({
  date,
  frames = [],
  geojson = {},
  name = '',
  raw = {},
  status = { loaded: false, loading: false }
} = {}) => ({
  date,
  frames,
  geojson,
  name,
  raw,
  status
});

const createState = ({
  data = [],
  currentFileIndex = 0,
  currentFrameIndex = 0,
  previousFileIndex = 0,
  previousFrameIndex = 0
} = {}) => ({
  data,
  currentFileIndex,
  currentFrameIndex,
  previousFileIndex,
  previousFrameIndex
});

export default createState;
export { createFile, createFrame, createState };
