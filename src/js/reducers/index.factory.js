const createState = ({
  driver = {
    currentId: null
  },
  files = {
    data: [],
    currentFileIndex: 0,
    currentFrameIndex: 0
  },
  status = {
    loading: false,
    loaded: false,
    error: false,
    errorMessage: null,
    playing: false
  }
} = {}) => ({
  driver,
  files,
  status
});

export default createState;
