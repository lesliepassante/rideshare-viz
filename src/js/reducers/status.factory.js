const createState = ({ buffered = false, loading = false, loaded = false, error = null, playing = false } = {}) => ({
  buffered,
  loading,
  loaded,
  error,
  playing
});

export default createState;
