const createState = ({ MAPBOX_ACCESS_TOKEN = null, MAPBOX_STYLE = null } = {}) => ({
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE
});

export default createState;
