const createState = ({
  buffered = false,
  initialized = false,
  loading = false,
  loaded = false,
  error = null,
  playing = false
} = {}) => ({
  buffered,
  initialized,
  loading,
  loaded,
  error,
  playing
});

export default createState;
